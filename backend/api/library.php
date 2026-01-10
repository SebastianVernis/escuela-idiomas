<?php
/**
 * API de Biblioteca Digital
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

// Verificar autenticación
$auth_result = verifyAuth();
if(!$auth_result['valid']) {
    http_response_code(401);
    echo json_encode(array("message" => "No autorizado."));
    exit();
}

$user_id = $auth_result['user_id'];

switch($method) {
    case 'GET':
        if($action === 'personal') {
            getPersonalLibrary();
        } elseif($action === 'search') {
            searchBooks();
        } elseif($action === 'stats') {
            getLibraryStats();
        } elseif($action === 'download') {
            downloadBook();
        } elseif($action === 'stream') {
            streamBook();
        } elseif(is_numeric($action)) {
            getBookDetails($action);
        } else {
            getAllBooks();
        }
        break;
    
    case 'POST':
        if($action === 'assign') {
            assignBookToUser();
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

function getPersonalLibrary() {
    global $user, $user_id;
    
    $user->id = $user_id;
    $stmt = $user->getPersonalLibrary();
    
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
            "fecha_asignacion" => $row['fecha_asignacion'],
            "puede_descargar" => !empty($row['archivo_url']),
            "puede_stream" => !empty($row['stream_url'])
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "books" => $books,
        "total" => count($books)
    ));
}

function getAllBooks() {
    global $book;
    
    $stmt = $book->read();
    
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
            "fecha_agregado" => $row['fecha_agregado']
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "books" => $books,
        "total" => count($books)
    ));
}

function searchBooks() {
    global $book;
    
    $search_term = isset($_GET['q']) ? $_GET['q'] : '';
    $format = isset($_GET['format']) ? $_GET['format'] : '';
    $language = isset($_GET['language']) ? $_GET['language'] : '';
    
    if($search_term) {
        $stmt = $book->search($search_term);
    } elseif($format) {
        $stmt = $book->readByFormat($format);
    } elseif($language) {
        $stmt = $book->readByLanguage($language);
    } else {
        $stmt = $book->read();
    }
    
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
            "fecha_agregado" => $row['fecha_agregado']
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "books" => $books,
        "total" => count($books),
        "search_term" => $search_term,
        "filters" => array(
            "format" => $format,
            "language" => $language
        )
    ));
}

function getBookDetails($book_id) {
    global $book, $user_id;
    
    $book->id = $book_id;
    
    if($book->readOne()) {
        // Verificar si el usuario tiene acceso
        $has_access = $book->hasAccess($user_id);
        
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
            "has_access" => $has_access
        );
        
        if($has_access) {
            $book_data["archivo_url"] = $book->archivo_url;
            $book_data["stream_url"] = $book->stream_url;
        }
        
        http_response_code(200);
        echo json_encode($book_data);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Libro no encontrado."));
    }
}

function downloadBook() {
    global $book, $user_id;
    
    $book_id = isset($_GET['book_id']) ? $_GET['book_id'] : '';
    
    if(!$book_id) {
        http_response_code(400);
        echo json_encode(array("message" => "ID del libro requerido."));
        return;
    }
    
    $book->id = $book_id;
    
    if($book->readOne() && $book->hasAccess($user_id)) {
        if($book->archivo_url) {
            // En una implementación real, aquí generarías una URL firmada o servirías el archivo
            http_response_code(200);
            echo json_encode(array(
                "download_url" => $book->archivo_url,
                "filename" => $book->titulo . "." . strtolower($book->formato),
                "message" => "Descarga iniciada."
            ));
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Archivo no disponible para descarga."));
        }
    } else {
        http_response_code(403);
        echo json_encode(array("message" => "No tienes acceso a este libro."));
    }
}

function streamBook() {
    global $book, $user_id;
    
    $book_id = isset($_GET['book_id']) ? $_GET['book_id'] : '';
    
    if(!$book_id) {
        http_response_code(400);
        echo json_encode(array("message" => "ID del libro requerido."));
        return;
    }
    
    $book->id = $book_id;
    
    if($book->readOne() && $book->hasAccess($user_id)) {
        if($book->stream_url) {
            http_response_code(200);
            echo json_encode(array(
                "stream_url" => $book->stream_url,
                "titulo" => $book->titulo,
                "formato" => $book->formato,
                "message" => "Streaming disponible."
            ));
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Streaming no disponible para este libro."));
        }
    } else {
        http_response_code(403);
        echo json_encode(array("message" => "No tienes acceso a este libro."));
    }
}

function getLibraryStats() {
    global $book;
    
    $stats = $book->getLibraryStats();
    
    http_response_code(200);
    echo json_encode($stats);
}

function assignBookToUser() {
    global $book, $auth_result;
    
    // Solo administradores pueden asignar libros
    if($auth_result['rol'] !== 'admin') {
        http_response_code(403);
        echo json_encode(array("message" => "Acceso denegado."));
        return;
    }
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->book_id) && !empty($data->user_id)) {
        $book->id = $data->book_id;
        
        if($book->assignToStudent($data->user_id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Libro asignado exitosamente."));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error al asignar el libro."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Datos incompletos."));
    }
}
?>

