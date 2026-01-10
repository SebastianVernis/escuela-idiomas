<?php
/**
 * API del Dashboard
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

// Verificar autenticación
$auth_result = verifyAuth();
if(!$auth_result['valid']) {
    http_response_code(401);
    echo json_encode(array("message" => "No autorizado."));
    exit();
}

$user_id = $auth_result['user_id'];
$user->id = $user_id;

switch($method) {
    case 'GET':
        getDashboardData();
        break;
    
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido."));
        break;
}

function getDashboardData() {
    global $user;
    
    try {
        // Obtener estadísticas del dashboard
        $stats = $user->getDashboardStats();
        
        // Obtener actividad reciente (últimas 5 actividades)
        $recent_activity = getRecentActivity($user->id);
        
        // Obtener próximas clases (próximas 3)
        $upcoming_classes = getUpcomingClasses($user->id);
        
        http_response_code(200);
        echo json_encode(array(
            "stats" => $stats,
            "recent_activity" => $recent_activity,
            "upcoming_classes" => $upcoming_classes
        ));
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Error interno del servidor."));
    }
}

function getRecentActivity($user_id) {
    global $db;
    
    $activities = [];
    
    // Actividad de libros agregados recientemente
    $query = "SELECT 'libro_agregado' as tipo, l.titulo as descripcion, 
                     bp.fecha_asignacion as fecha, l.autor as detalle
              FROM biblioteca_personal bp
              INNER JOIN libros l ON bp.libro_id = l.id
              WHERE bp.alumno_id = ? AND bp.acceso_activo = 1
              ORDER BY bp.fecha_asignacion DESC
              LIMIT 3";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $user_id);
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
    
    // Actividad de clases completadas
    $query = "SELECT 'clase_completada' as tipo, cl.nombre as descripcion,
                     a.fecha_registro as fecha, c.nombre as detalle
              FROM asistencias a
              INNER JOIN clases cl ON a.clase_id = cl.id
              INNER JOIN cursos c ON cl.curso_id = c.id
              WHERE a.alumno_id = ? AND a.estado = 'presente'
              ORDER BY a.fecha_registro DESC
              LIMIT 2";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $user_id);
    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = array(
            "tipo" => "clase",
            "titulo" => "Clase completada",
            "descripcion" => $row['descripcion'],
            "fecha" => $row['fecha'],
            "icono" => "fas fa-calendar-check"
        );
    }
    
    // Actividad de pagos
    $query = "SELECT 'pago_procesado' as tipo, paq.nombre as descripcion,
                     p.fecha_pago as fecha, CONCAT('$', p.monto, ' MXN') as detalle
              FROM pagos p
              INNER JOIN paquetes paq ON p.paquete_id = paq.id
              WHERE p.alumno_id = ? AND p.estado = 'completado'
              ORDER BY p.fecha_pago DESC
              LIMIT 2";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $user_id);
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
    
    // Ordenar por fecha y limitar a 5
    usort($activities, function($a, $b) {
        return strtotime($b['fecha']) - strtotime($a['fecha']);
    });
    
    return array_slice($activities, 0, 5);
}

function getUpcomingClasses($user_id) {
    global $db;
    
    $query = "SELECT cl.id, cl.nombre, cl.tipo, cl.fecha_hora, cl.duracion,
                     cl.enlace_sesion, c.nombre as curso_nombre,
                     u.nombre as profesor_nombre, u.apellido as profesor_apellido
              FROM clases cl
              INNER JOIN cursos c ON cl.curso_id = c.id
              INNER JOIN inscripciones i ON c.id = i.curso_id
              LEFT JOIN usuarios u ON cl.profesor_id = u.id
              WHERE i.alumno_id = ? AND i.estado = 'activa' 
                    AND cl.fecha_hora >= NOW()
                    AND cl.estado IN ('programada', 'en_curso')
              ORDER BY cl.fecha_hora ASC
              LIMIT 3";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $user_id);
    $stmt->execute();
    
    $classes = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $classes[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "tipo" => $row['tipo'],
            "fecha_hora" => $row['fecha_hora'],
            "duracion" => $row['duracion'],
            "enlace_sesion" => $row['enlace_sesion'],
            "curso_nombre" => $row['curso_nombre'],
            "profesor" => $row['profesor_nombre'] ? $row['profesor_nombre'] . " " . $row['profesor_apellido'] : null
        );
    }
    
    return $classes;
}
?>

