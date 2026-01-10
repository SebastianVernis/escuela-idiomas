<?php
/**
 * API de Horarios y Clases
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';
include_once '../models/User.php';
include_once '../middleware/auth_middleware.php';

$database = new Database();
$db = $database->getConnection();

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
        if($action === 'my-schedule') {
            getMySchedule();
        } elseif($action === 'conversation-rooms') {
            getConversationRooms();
        } elseif($action === 'upcoming') {
            getUpcomingClasses();
        } else {
            getAllClasses();
        }
        break;
    
    case 'POST':
        if($action === 'join-class') {
            joinClass();
        } elseif($action === 'join-conversation') {
            joinConversationRoom();
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

function getMySchedule() {
    global $user, $user_id;
    
    $user->id = $user_id;
    $stmt = $user->getSchedule();
    
    $classes = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $classes[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "tipo" => $row['tipo'],
            "fecha_hora" => $row['fecha_hora'],
            "duracion" => $row['duracion'],
            "enlace_sesion" => $row['enlace_sesion'],
            "estado" => $row['estado'],
            "curso_nombre" => $row['curso_nombre'],
            "profesor" => $row['profesor_nombre'] ? $row['profesor_nombre'] . " " . $row['profesor_apellido'] : null
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "classes" => $classes,
        "total" => count($classes)
    ));
}

function getAllClasses() {
    global $db;
    
    $filter = isset($_GET['filter']) ? $_GET['filter'] : 'all';
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    
    $where_clause = "WHERE cl.fecha_hora >= NOW() AND cl.estado IN ('programada', 'en_curso')";
    
    if($filter === 'guiadas') {
        $where_clause .= " AND cl.tipo = 'guiada'";
    } elseif($filter === 'libres') {
        $where_clause .= " AND cl.tipo = 'libre'";
    }
    
    $query = "SELECT cl.id, cl.nombre, cl.tipo, cl.fecha_hora, cl.duracion,
                     cl.capacidad_maxima, cl.estado, c.nombre as curso_nombre,
                     c.idioma, c.nivel, u.nombre as profesor_nombre, 
                     u.apellido as profesor_apellido,
                     COUNT(a.id) as participantes_actuales
              FROM clases cl
              INNER JOIN cursos c ON cl.curso_id = c.id
              LEFT JOIN usuarios u ON cl.profesor_id = u.id
              LEFT JOIN asistencias a ON cl.id = a.clase_id
              $where_clause
              GROUP BY cl.id
              ORDER BY cl.fecha_hora ASC
              LIMIT ?";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $limit, PDO::PARAM_INT);
    $stmt->execute();
    
    $classes = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $classes[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "tipo" => $row['tipo'],
            "fecha_hora" => $row['fecha_hora'],
            "duracion" => $row['duracion'],
            "capacidad_maxima" => $row['capacidad_maxima'],
            "participantes_actuales" => $row['participantes_actuales'],
            "estado" => $row['estado'],
            "curso_nombre" => $row['curso_nombre'],
            "idioma" => $row['idioma'],
            "nivel" => $row['nivel'],
            "profesor" => $row['profesor_nombre'] ? $row['profesor_nombre'] . " " . $row['profesor_apellido'] : null
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "classes" => $classes,
        "total" => count($classes),
        "filter" => $filter
    ));
}

function getConversationRooms() {
    global $db;
    
    $query = "SELECT sc.id, sc.nombre, sc.idioma, sc.nivel, sc.tema,
                     sc.fecha_hora, sc.duracion, sc.capacidad_maxima,
                     sc.estado, sc.tipo, sc.enlace_sesion,
                     u.nombre as moderador_nombre, u.apellido as moderador_apellido,
                     COUNT(pc.id) as participantes_actuales
              FROM sesiones_conversacion sc
              LEFT JOIN usuarios u ON sc.moderador_id = u.id
              LEFT JOIN participantes_conversacion pc ON sc.id = pc.sesion_id
              WHERE sc.fecha_hora >= NOW() - INTERVAL 2 HOUR
              GROUP BY sc.id
              ORDER BY sc.fecha_hora ASC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $rooms = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $status = 'available';
        $current_time = time();
        $session_time = strtotime($row['fecha_hora']);
        $end_time = $session_time + ($row['duracion'] * 60);
        
        if($current_time >= $session_time && $current_time <= $end_time) {
            $status = 'active';
        } elseif($current_time < $session_time) {
            $status = 'scheduled';
        }
        
        $rooms[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "idioma" => $row['idioma'],
            "nivel" => $row['nivel'],
            "tema" => $row['tema'],
            "fecha_hora" => $row['fecha_hora'],
            "duracion" => $row['duracion'],
            "capacidad_maxima" => $row['capacidad_maxima'],
            "participantes_actuales" => $row['participantes_actuales'],
            "estado" => $row['estado'],
            "status" => $status,
            "tipo" => $row['tipo'],
            "enlace_sesion" => $row['enlace_sesion'],
            "moderador" => $row['moderador_nombre'] ? $row['moderador_nombre'] . " " . $row['moderador_apellido'] : null
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "rooms" => $rooms,
        "total" => count($rooms)
    ));
}

function getUpcomingClasses() {
    global $user, $user_id;
    
    $user->id = $user_id;
    $stmt = $user->getSchedule();
    
    $classes = array();
    $count = 0;
    while($row = $stmt->fetch(PDO::FETCH_ASSOC) && $count < 5) {
        $classes[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "tipo" => $row['tipo'],
            "fecha_hora" => $row['fecha_hora'],
            "duracion" => $row['duracion'],
            "enlace_sesion" => $row['enlace_sesion'],
            "estado" => $row['estado'],
            "curso_nombre" => $row['curso_nombre'],
            "profesor" => $row['profesor_nombre'] ? $row['profesor_nombre'] . " " . $row['profesor_apellido'] : null
        );
        $count++;
    }
    
    http_response_code(200);
    echo json_encode(array(
        "classes" => $classes,
        "total" => count($classes)
    ));
}

function joinClass() {
    global $db, $user_id;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->class_id)) {
        $class_id = $data->class_id;
        
        // Verificar que el alumno esté inscrito en el curso de la clase
        $query = "SELECT cl.id, cl.enlace_sesion, cl.capacidad_maxima,
                         COUNT(a.id) as participantes_actuales
                  FROM clases cl
                  INNER JOIN cursos c ON cl.curso_id = c.id
                  INNER JOIN inscripciones i ON c.id = i.curso_id
                  LEFT JOIN asistencias a ON cl.id = a.clase_id
                  WHERE cl.id = ? AND i.alumno_id = ? AND i.estado = 'activa'
                        AND cl.estado IN ('programada', 'en_curso')
                  GROUP BY cl.id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(1, $class_id);
        $stmt->bindParam(2, $user_id);
        $stmt->execute();
        
        $class_info = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($class_info) {
            // Verificar capacidad
            if($class_info['participantes_actuales'] < $class_info['capacidad_maxima']) {
                // Registrar asistencia
                $insert_query = "INSERT IGNORE INTO asistencias (clase_id, alumno_id, estado) VALUES (?, ?, 'presente')";
                $insert_stmt = $db->prepare($insert_query);
                $insert_stmt->bindParam(1, $class_id);
                $insert_stmt->bindParam(2, $user_id);
                
                if($insert_stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array(
                        "message" => "Te has unido a la clase exitosamente.",
                        "enlace_sesion" => $class_info['enlace_sesion']
                    ));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error al registrar asistencia."));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "La clase ha alcanzado su capacidad máxima."));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Clase no encontrada o no tienes acceso."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "ID de clase requerido."));
    }
}

function joinConversationRoom() {
    global $db, $user_id;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->room_id)) {
        $room_id = $data->room_id;
        
        // Verificar que la sesión esté disponible
        $query = "SELECT id, enlace_sesion, capacidad_maxima,
                         (SELECT COUNT(*) FROM participantes_conversacion WHERE sesion_id = ?) as participantes_actuales
                  FROM sesiones_conversacion
                  WHERE id = ? AND estado IN ('programada', 'en_curso')";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(1, $room_id);
        $stmt->bindParam(2, $room_id);
        $stmt->execute();
        
        $room_info = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($room_info) {
            // Verificar capacidad
            if($room_info['participantes_actuales'] < $room_info['capacidad_maxima']) {
                // Registrar participación
                $insert_query = "INSERT IGNORE INTO participantes_conversacion (sesion_id, alumno_id) VALUES (?, ?)";
                $insert_stmt = $db->prepare($insert_query);
                $insert_stmt->bindParam(1, $room_id);
                $insert_stmt->bindParam(2, $user_id);
                
                if($insert_stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array(
                        "message" => "Te has unido a la sesión de conversación exitosamente.",
                        "enlace_sesion" => $room_info['enlace_sesion']
                    ));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error al registrar participación."));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "La sesión ha alcanzado su capacidad máxima."));
            }
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Sesión de conversación no encontrada."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "ID de sesión requerido."));
    }
}
?>

