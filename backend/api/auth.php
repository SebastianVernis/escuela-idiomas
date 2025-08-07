<?php
/**
 * API de Autenticación
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Obtener la acción de la URL
$action = isset($path_parts[count($path_parts) - 1]) ? $path_parts[count($path_parts) - 1] : '';

switch($method) {
    case 'POST':
        if($action === 'login') {
            login();
        } elseif($action === 'register') {
            register();
        } elseif($action === 'logout') {
            logout();
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint no encontrado."));
        }
        break;
    
    case 'GET':
        if($action === 'verify') {
            verifyToken();
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint no encontrado."));
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido."));
        break;
}

function login() {
    global $user;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->username) && !empty($data->password)) {
        if($user->login($data->username, $data->password)) {
            // Crear token simple (en producción usar JWT)
            $token = base64_encode(json_encode([
                'user_id' => $user->id,
                'username' => $user->username,
                'rol' => $user->rol,
                'exp' => time() + (24 * 60 * 60) // 24 horas
            ]));
            
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login exitoso.",
                "token" => $token,
                "user" => array(
                    "id" => $user->id,
                    "nombre" => $user->nombre,
                    "apellido" => $user->apellido,
                    "email" => $user->email,
                    "username" => $user->username,
                    "rol" => $user->rol,
                    "nivel_idioma" => $user->nivel_idioma
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Credenciales incorrectas."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Datos incompletos."));
    }
}

function register() {
    global $user;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->nombre) && !empty($data->apellido) && 
       !empty($data->email) && !empty($data->username) && 
       !empty($data->password)) {
        
        // Verificar si el email ya existe
        $user->email = $data->email;
        if($user->emailExists()) {
            http_response_code(400);
            echo json_encode(array("message" => "El email ya está registrado."));
            return;
        }
        
        // Verificar si el username ya existe
        $user->username = $data->username;
        if($user->usernameExists()) {
            http_response_code(400);
            echo json_encode(array("message" => "El nombre de usuario ya está en uso."));
            return;
        }
        
        // Asignar valores
        $user->nombre = $data->nombre;
        $user->apellido = $data->apellido;
        $user->email = $data->email;
        $user->username = $data->username;
        $user->password = $data->password;
        $user->rol = 'alumno';
        $user->telefono = isset($data->telefono) ? $data->telefono : '';
        $user->nivel_idioma = isset($data->nivel_idioma) ? $data->nivel_idioma : 'A1';
        $user->zona_horaria = isset($data->zona_horaria) ? $data->zona_horaria : 'America/Mexico_City';
        
        if($user->create()) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "Usuario registrado exitosamente.",
                "user_id" => $user->id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "No se pudo registrar el usuario."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Datos incompletos."));
    }
}

function logout() {
    // En una implementación real, invalidarías el token en el servidor
    http_response_code(200);
    echo json_encode(array("message" => "Logout exitoso."));
}

function verifyToken() {
    $headers = getallheaders();
    $token = null;
    
    if(isset($headers['Authorization'])) {
        $auth_header = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $auth_header);
    }
    
    if($token) {
        try {
            $decoded = json_decode(base64_decode($token), true);
            
            if($decoded && isset($decoded['exp']) && $decoded['exp'] > time()) {
                http_response_code(200);
                echo json_encode(array(
                    "valid" => true,
                    "user_id" => $decoded['user_id'],
                    "username" => $decoded['username'],
                    "rol" => $decoded['rol']
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("valid" => false, "message" => "Token expirado."));
            }
        } catch(Exception $e) {
            http_response_code(401);
            echo json_encode(array("valid" => false, "message" => "Token inválido."));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("valid" => false, "message" => "Token no proporcionado."));
    }
}

// Función auxiliar para obtener headers en diferentes servidores
function getallheaders() {
    if (!function_exists('getallheaders')) {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    } else {
        return getallheaders();
    }
}
?>

