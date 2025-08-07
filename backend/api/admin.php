<?php
/**
 * API de Administración
 * Idiomas Avanza - Escuela Digital de Idiomas
 * Gestión de contenidos y biblioteca
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/Book.php';
include_once '../models/User.php';
include_once '../middleware/auth_middleware.php';

$database = new Database();
$db = $database->getConnection();

$book = new Book($db);
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Obtener la acción de la URL
$action = isset($path_parts[count($path_parts) - 1]) ? $path_parts[count($path_parts) - 1] : '';

// Verificar autenticación y rol de administrador
$auth_result = requireRole('admin');
$admin_id = $auth_result['user_id'];

switch($method) {
    case 'GET':
        if($action === 'books') {
            getAllBooksAdmin();
        } elseif($action === 'users') {
            getAllUsersAdmin();
        } elseif($action === 'stats') {
            getSystemStats();
        } elseif($action === 'library-stats') {
            getLibraryStats();
        } elseif($action === 'recent-activity') {
            getRecentActivity();
        } elseif(is_numeric($action)) {
            getBookDetailsAdmin($action);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint no encontrado."));
        }
        break;
    
    case 'POST':
        if($action === 'add-book') {
            addBook();
        } elseif($action === 'assign-book') {
            assignBookToUser();
        } elseif($action === 'assign-package') {
            assignPackageToUser();
        } elseif($action === 'upload-file') {
            uploadBookFile();
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint no encontrado."));
        }
        break;
    
    case 'PUT':
        if($action === 'update-book') {
            updateBook();
        } elseif($action === 'update-user') {
            updateUser();
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint no encontrado."));
        }
        break;
    
    case 'DELETE':
        if($action === 'delete-book') {
            deleteBook();
        } elseif($action === 'remove-user-book') {
            removeBookFromUser();
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

function getAllBooksAdmin() {
    global $book;
    
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 50;
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $language = isset($_GET['language']) ? $_GET['language'] : '';
    $format = isset($_GET['format']) ? $_GET['format'] : '';
    
    $offset = ($page - 1) * $limit;
    
    $stmt = $book->readWithFilters($search, $category, $language, $format, $limit, $offset);
    
    $books = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $books[] = array(
            "id" => $row['id'],
            "titulo" => $row['titulo'],
            "autor" => $row['autor'],
            "idioma" => $row['idioma'],
            "nivel" => $row['nivel'],
            "formato" => $row['formato'],
            "descripcion" => $row['descripcion'],
            "categoria" => $row['categoria'],
            "fecha_agregado" => $row['fecha_agregado'],
            "activo" => $row['activo'],
            "archivo_url" => $row['archivo_url'],
            "stream_url" => $row['stream_url']
        );
    }
    
    // Obtener total de libros para paginación
    $total_books = $book->getTotalCount($search, $category, $language, $format);
    
    http_response_code(200);
    echo json_encode(array(
        "books" => $books,
        "total" => $total_books,
        "page" => $page,
        "limit" => $limit,
        "total_pages" => ceil($total_books / $limit)
    ));
}

function getAllUsersAdmin() {
    global $user;
    
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 50;
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $role = isset($_GET['role']) ? $_GET['role'] : '';
    
    $offset = ($page - 1) * $limit;
    
    $stmt = $user->readAllWithFilters($search, $role, $limit, $offset);
    
    $users = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $users[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "apellido" => $row['apellido'],
            "email" => $row['email'],
            "username" => $row['username'],
            "rol" => $row['rol'],
            "nivel_idioma" => $row['nivel_idioma'],
            "fecha_registro" => $row['fecha_registro'],
            "activo" => $row['activo']
        );
    }
    
    // Obtener total de usuarios para paginación
    $total_users = $user->getTotalCount($search, $role);
    
    http_response_code(200);
    echo json_encode(array(
        "users" => $users,
        "total" => $total_users,
        "page" => $page,
        "limit" => $limit,
        "total_pages" => ceil($total_users / $limit)
    ));
}

function getSystemStats() {
    global $db;
    
    try {
        // Estadísticas generales
        $stats = array();
        
        // Total de usuarios
        $query = "SELECT COUNT(*) as total FROM usuarios WHERE activo = 1";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $stats['total_users'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Total de libros
        $query = "SELECT COUNT(*) as total FROM libros WHERE activo = 1";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $stats['total_books'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Total de pagos completados
        $query = "SELECT COUNT(*) as total, SUM(monto) as ingresos FROM pagos WHERE estado = 'completado'";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $payment_data = $stmt->fetch(PDO::FETCH_ASSOC);
        $stats['total_payments'] = $payment_data['total'];
        $stats['total_revenue'] = $payment_data['ingresos'] ?: 0;
        
        // Usuarios activos (con actividad en los últimos 30 días)
        $query = "SELECT COUNT(DISTINCT alumno_id) as total FROM asistencias WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $stats['active_users'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Clases programadas
        $query = "SELECT COUNT(*) as total FROM clases WHERE fecha_hora >= NOW() AND estado = 'programada'";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $stats['scheduled_classes'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Distribución por idioma
        $query = "SELECT idioma, COUNT(*) as total FROM libros WHERE activo = 1 GROUP BY idioma";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $language_distribution = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $language_distribution[] = $row;
        }
        $stats['language_distribution'] = $language_distribution;
        
        // Distribución por formato
        $query = "SELECT formato, COUNT(*) as total FROM libros WHERE activo = 1 GROUP BY formato";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $format_distribution = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $format_distribution[] = $row;
        }
        $stats['format_distribution'] = $format_distribution;
        
        // Ingresos por mes (últimos 6 meses)
        $query = "SELECT DATE_FORMAT(fecha_pago, '%Y-%m') as mes, SUM(monto) as ingresos 
                  FROM pagos 
                  WHERE estado = 'completado' AND fecha_pago >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
                  GROUP BY DATE_FORMAT(fecha_pago, '%Y-%m')
                  ORDER BY mes DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $monthly_revenue = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $monthly_revenue[] = $row;
        }
        $stats['monthly_revenue'] = $monthly_revenue;
        
        http_response_code(200);
        echo json_encode($stats);
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Error obteniendo estadísticas: " . $e->getMessage()));
    }
}

function getLibraryStats() {
    global $book;
    
    $stats = $book->getLibraryStats();
    
    http_response_code(200);
    echo json_encode($stats);
}

function getRecentActivity() {
    global $db;
    
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    
    $activities = array();
    
    // Actividad de nuevos usuarios
    $query = "SELECT 'new_user' as tipo, CONCAT(nombre, ' ', apellido) as descripcion,
                     fecha_registro as fecha, email as detalle
              FROM usuarios
              WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 7 DAY)
              ORDER BY fecha_registro DESC
              LIMIT 5";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = array(
            "tipo" => "usuario",
            "titulo" => "Nuevo usuario registrado",
            "descripcion" => $row['descripcion'] . " (" . $row['detalle'] . ")",
            "fecha" => $row['fecha'],
            "icono" => "fas fa-user-plus"
        );
    }
    
    // Actividad de nuevos libros
    $query = "SELECT 'new_book' as tipo, titulo as descripcion,
                     fecha_agregado as fecha, autor as detalle
              FROM libros
              WHERE fecha_agregado >= DATE_SUB(NOW(), INTERVAL 7 DAY)
              ORDER BY fecha_agregado DESC
              LIMIT 5";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = array(
            "tipo" => "libro",
            "titulo" => "Nuevo libro agregado",
            "descripcion" => $row['descripcion'] . " - " . $row['detalle'],
            "fecha" => $row['fecha'],
            "icono" => "fas fa-book"
        );
    }
    
    // Actividad de pagos
    $query = "SELECT 'payment' as tipo, CONCAT(u.nombre, ' ', u.apellido) as descripcion,
                     p.fecha_pago as fecha, CONCAT('$', p.monto, ' MXN') as detalle
              FROM pagos p
              INNER JOIN usuarios u ON p.alumno_id = u.id
              WHERE p.estado = 'completado' AND p.fecha_pago >= DATE_SUB(NOW(), INTERVAL 7 DAY)
              ORDER BY p.fecha_pago DESC
              LIMIT 5";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = array(
            "tipo" => "pago",
            "titulo" => "Pago procesado",
            "descripcion" => $row['descripcion'] . " - " . $row['detalle'],
            "fecha" => $row['fecha'],
            "icono" => "fas fa-credit-card"
        );
    }
    
    // Ordenar por fecha y limitar
    usort($activities, function($a, $b) {
        return strtotime($b['fecha']) - strtotime($a['fecha']);
    });
    
    $activities = array_slice($activities, 0, $limit);
    
    http_response_code(200);
    echo json_encode(array(
        "activities" => $activities,
        "total" => count($activities)
    ));
}

function addBook() {
    global $book;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->titulo) && !empty($data->autor) && !empty($data->idioma) && 
       !empty($data->nivel) && !empty($data->formato) && !empty($data->categoria)) {
        
        $book->titulo = $data->titulo;
        $book->autor = $data->autor;
        $book->idioma = $data->idioma;
        $book->nivel = $data->nivel;
        $book->formato = $data->formato;
        $book->descripcion = isset($data->descripcion) ? $data->descripcion : '';
        $book->categoria = $data->categoria;
        $book->archivo_url = isset($data->archivo_url) ? $data->archivo_url : '';
        $book->stream_url = isset($data->stream_url) ? $data->stream_url : '';
        
        if($book->create()) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "Libro agregado exitosamente.",
                "book_id" => $book->id
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "No se pudo agregar el libro."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Datos incompletos."));
    }
}

function updateBook() {
    global $book;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->id)) {
        $book->id = $data->id;
        
        if($book->readOne()) {
            // Actualizar campos si se proporcionan
            if(isset($data->titulo)) $book->titulo = $data->titulo;
            if(isset($data->autor)) $book->autor = $data->autor;
            if(isset($data->idioma)) $book->idioma = $data->idioma;
            if(isset($data->nivel)) $book->nivel = $data->nivel;
            if(isset($data->formato)) $book->formato = $data->formato;
            if(isset($data->descripcion)) $book->descripcion = $data->descripcion;
            if(isset($data->categoria)) $book->categoria = $data->categoria;
            if(isset($data->archivo_url)) $book->archivo_url = $data->archivo_url;
            if(isset($data->stream_url)) $book->stream_url = $data->stream_url;
            if(isset($data->activo)) $book->activo = $data->activo;
            
            if($book->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Libro actualizado exitosamente."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo actualizar el libro."));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Libro no encontrado."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "ID del libro requerido."));
    }
}

function deleteBook() {
    global $book;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->id)) {
        $book->id = $data->id;
        
        if($book->delete()) {
            http_response_code(200);
            echo json_encode(array("message" => "Libro eliminado exitosamente."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "No se pudo eliminar el libro."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "ID del libro requerido."));
    }
}

function assignBookToUser() {
    global $book;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->book_id) && !empty($data->user_id)) {
        $book->id = $data->book_id;
        
        if($book->assignToStudent($data->user_id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Libro asignado exitosamente al usuario."));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error al asignar el libro."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "ID del libro y usuario requeridos."));
    }
}

function uploadBookFile() {
    // Manejar subida de archivos
    if(!isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(array("message" => "No se proporcionó archivo."));
        return;
    }
    
    $file = $_FILES['file'];
    $book_id = isset($_POST['book_id']) ? $_POST['book_id'] : '';
    
    if(empty($book_id)) {
        http_response_code(400);
        echo json_encode(array("message" => "ID del libro requerido."));
        return;
    }
    
    // Validar tipo de archivo
    $allowed_types = ['application/pdf', 'application/epub+zip', 'audio/mpeg', 'audio/mp3'];
    if(!in_array($file['type'], $allowed_types)) {
        http_response_code(400);
        echo json_encode(array("message" => "Tipo de archivo no permitido."));
        return;
    }
    
    // Crear directorio si no existe
    $upload_dir = '../uploads/books/';
    if(!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Generar nombre único para el archivo
    $file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = $book_id . '_' . time() . '.' . $file_extension;
    $filepath = $upload_dir . $filename;
    
    if(move_uploaded_file($file['tmp_name'], $filepath)) {
        // Actualizar URL del archivo en la base de datos
        global $book;
        $book->id = $book_id;
        if($book->readOne()) {
            $book->archivo_url = '/uploads/books/' . $filename;
            if($book->update()) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Archivo subido exitosamente.",
                    "file_url" => $book->archivo_url
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Error actualizando la base de datos."));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Libro no encontrado."));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error subiendo el archivo."));
    }
}

function getBookDetailsAdmin($book_id) {
    global $book;
    
    $book->id = $book_id;
    
    if($book->readOne()) {
        $book_data = array(
            "id" => $book->id,
            "titulo" => $book->titulo,
            "autor" => $book->autor,
            "idioma" => $book->idioma,
            "nivel" => $book->nivel,
            "formato" => $book->formato,
            "descripcion" => $book->descripcion,
            "categoria" => $book->categoria,
            "fecha_agregado" => $book->fecha_agregado,
            "activo" => $book->activo,
            "archivo_url" => $book->archivo_url,
            "stream_url" => $book->stream_url
        );
        
        // Obtener usuarios que tienen acceso a este libro
        $users_with_access = $book->getUsersWithAccess();
        $book_data["users_with_access"] = $users_with_access;
        
        http_response_code(200);
        echo json_encode($book_data);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Libro no encontrado."));
    }
}
?>

