<?php
/**
 * Middleware de Autenticación
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

function verifyAuth() {
    $headers = getallheaders();
    $token = null;
    
    // Buscar token en header Authorization
    if(isset($headers['Authorization'])) {
        $auth_header = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $auth_header);
    }
    
    // Si no hay token en Authorization, buscar en cookies o parámetros
    if(!$token && isset($_COOKIE['auth_token'])) {
        $token = $_COOKIE['auth_token'];
    }
    
    if(!$token && isset($_GET['token'])) {
        $token = $_GET['token'];
    }
    
    if($token) {
        try {
            $decoded = json_decode(base64_decode($token), true);
            
            if($decoded && isset($decoded['exp']) && $decoded['exp'] > time()) {
                return array(
                    "valid" => true,
                    "user_id" => $decoded['user_id'],
                    "username" => $decoded['username'],
                    "rol" => $decoded['rol']
                );
            } else {
                return array("valid" => false, "message" => "Token expirado.");
            }
        } catch(Exception $e) {
            return array("valid" => false, "message" => "Token inválido.");
        }
    } else {
        return array("valid" => false, "message" => "Token no proporcionado.");
    }
}

function requireAuth() {
    $auth_result = verifyAuth();
    if(!$auth_result['valid']) {
        http_response_code(401);
        echo json_encode(array("message" => "No autorizado: " . $auth_result['message']));
        exit();
    }
    return $auth_result;
}

function requireRole($required_role) {
    $auth_result = requireAuth();
    
    if($auth_result['rol'] !== $required_role && $auth_result['rol'] !== 'admin') {
        http_response_code(403);
        echo json_encode(array("message" => "Acceso denegado. Rol requerido: " . $required_role));
        exit();
    }
    
    return $auth_result;
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

