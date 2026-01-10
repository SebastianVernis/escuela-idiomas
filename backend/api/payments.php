<?php
/**
 * API de Pagos
 * Idiomas Avanza - Escuela Digital de Idiomas
 * Integración con Stripe y Clip
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

// Verificar autenticación para la mayoría de endpoints
if($action !== 'webhook-stripe' && $action !== 'webhook-clip') {
    $auth_result = verifyAuth();
    if(!$auth_result['valid']) {
        http_response_code(401);
        echo json_encode(array("message" => "No autorizado."));
        exit();
    }
    $user_id = $auth_result['user_id'];
}

switch($method) {
    case 'GET':
        if($action === 'history') {
            getPaymentHistory();
        } elseif($action === 'next-payment') {
            getNextPayment();
        } elseif($action === 'packages') {
            getAvailablePackages();
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint no encontrado."));
        }
        break;
    
    case 'POST':
        if($action === 'create-stripe-intent') {
            createStripePaymentIntent();
        } elseif($action === 'create-clip-payment') {
            createClipPayment();
        } elseif($action === 'confirm-payment') {
            confirmPayment();
        } elseif($action === 'webhook-stripe') {
            handleStripeWebhook();
        } elseif($action === 'webhook-clip') {
            handleClipWebhook();
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

function getPaymentHistory() {
    global $user, $user_id;
    
    $user->id = $user_id;
    $stmt = $user->getPaymentHistory();
    
    $payments = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $payments[] = array(
            "id" => $row['id'],
            "monto" => $row['monto'],
            "metodo_pago" => $row['metodo_pago'],
            "estado" => $row['estado'],
            "fecha_pago" => $row['fecha_pago'],
            "fecha_vencimiento" => $row['fecha_vencimiento'],
            "paquete_nombre" => $row['paquete_nombre']
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "payments" => $payments,
        "total" => count($payments)
    ));
}

function getNextPayment() {
    global $user, $user_id;
    
    $user->id = $user_id;
    $next_payment = $user->getNextPayment();
    
    if($next_payment) {
        http_response_code(200);
        echo json_encode($next_payment);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No hay pagos pendientes."));
    }
}

function getAvailablePackages() {
    global $db;
    
    $query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.duracion_meses,
                     GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ', ') as cursos,
                     COUNT(DISTINCT pl.libro_id) as total_libros
              FROM paquetes p
              LEFT JOIN paquete_cursos pc ON p.id = pc.paquete_id
              LEFT JOIN cursos c ON pc.curso_id = c.id
              LEFT JOIN paquete_libros pl ON p.id = pl.paquete_id
              WHERE p.activo = 1
              GROUP BY p.id
              ORDER BY p.precio ASC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $packages = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $packages[] = array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "descripcion" => $row['descripcion'],
            "precio" => $row['precio'],
            "duracion_meses" => $row['duracion_meses'],
            "cursos" => $row['cursos'],
            "total_libros" => $row['total_libros']
        );
    }
    
    http_response_code(200);
    echo json_encode(array(
        "packages" => $packages,
        "total" => count($packages)
    ));
}

function createStripePaymentIntent() {
    global $db, $user_id;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->package_id) && !empty($data->amount)) {
        // Configuración de Stripe (en producción usar variables de entorno)
        $stripe_secret_key = 'sk_test_...'; // Reemplazar con tu clave secreta de Stripe
        
        try {
            // Inicializar Stripe (requiere composer install stripe/stripe-php)
            require_once '../vendor/autoload.php';
            \Stripe\Stripe::setApiKey($stripe_secret_key);
            
            // Crear PaymentIntent
            $metadata = [
                'user_id' => $user_id,
                'package_id' => $data->package_id
            ];
            if (!empty($data->metadata) && is_object($data->metadata)) {
                // Propagar metadata desde el frontend (e.g., cursoId)
                foreach ($data->metadata as $k => $v) {
                    $metadata[$k] = $v;
                }
            }
            $payment_intent = \Stripe\PaymentIntent::create([
                'amount' => $data->amount * 100, // Stripe usa centavos
                'currency' => 'mxn',
                'metadata' => $metadata,
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);
            
            // Guardar el pago pendiente en la base de datos
            $query = "INSERT INTO pagos (alumno_id, paquete_id, monto, metodo_pago, id_transaccion, estado, fecha_vencimiento)
                      VALUES (?, ?, ?, 'stripe', ?, 'pendiente', DATE_ADD(NOW(), INTERVAL 30 DAY))";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(1, $user_id);
            $stmt->bindParam(2, $data->package_id);
            $stmt->bindParam(3, $data->amount);
            $stmt->bindParam(4, $payment_intent->id);
            $stmt->execute();
            
            http_response_code(200);
            echo json_encode(array(
                "client_secret" => $payment_intent->client_secret,
                "payment_intent_id" => $payment_intent->id,
                "message" => "PaymentIntent creado exitosamente."
            ));
            
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Error creando PaymentIntent: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Datos incompletos."));
    }
}

function createClipPayment() {
    global $db, $user_id;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->package_id) && !empty($data->amount)) {
        // Configuración de Clip (en producción usar variables de entorno)
        $clip_api_key = 'your_clip_api_key'; // Reemplazar con tu API key de Clip
        $clip_base_url = 'https://api-gw.payclip.com/checkout';
        
        try {
            // Obtener información del paquete
            $package_query = "SELECT nombre, descripcion FROM paquetes WHERE id = ?";
            $package_stmt = $db->prepare($package_query);
            $package_stmt->bindParam(1, $data->package_id);
            $package_stmt->execute();
            $package = $package_stmt->fetch(PDO::FETCH_ASSOC);
            
            // Crear payload para Clip
            $clip_payload = array(
                "amount" => $data->amount,
                "currency" => "MXN",
                "purchase_description" => $package['nombre'] . " - " . $package['descripcion'],
                "redirect_url" => "https://tu-dominio.com/payment-success",
                "webhook_url" => "https://tu-dominio.com/api/payments/webhook-clip",
                "metadata" => array(
                    "user_id" => $user_id,
                    "package_id" => $data->package_id,
                    "course_id" => isset($data->course_id) ? $data->course_id : null
                )
            );
            
            // Realizar solicitud a Clip API
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $clip_base_url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($clip_payload));
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'x-api-key: ' . $clip_api_key
            ));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            $response = curl_exec($ch);
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if($http_code === 200) {
                $clip_response = json_decode($response, true);
                
                // Guardar el pago pendiente en la base de datos
                $query = "INSERT INTO pagos (alumno_id, paquete_id, monto, metodo_pago, id_transaccion, estado, fecha_vencimiento)
                          VALUES (?, ?, ?, 'clip', ?, 'pendiente', DATE_ADD(NOW(), INTERVAL 30 DAY))";
                
                $stmt = $db->prepare($query);
                $stmt->bindParam(1, $user_id);
                $stmt->bindParam(2, $data->package_id);
                $stmt->bindParam(3, $data->amount);
                $stmt->bindParam(4, $clip_response['id']);
                $stmt->execute();
                
                http_response_code(200);
                echo json_encode(array(
                    "payment_url" => $clip_response['payment_url'],
                    "payment_id" => $clip_response['id'],
                    "message" => "Pago con Clip creado exitosamente."
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Error creando pago con Clip."));
            }
            
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Error creando pago con Clip: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Datos incompletos."));
    }
}

function confirmPayment() {
    global $db, $user_id;
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->payment_id)) {
        try {
            // Buscar el pago en la base de datos
            $query = "SELECT * FROM pagos WHERE id_transaccion = ? AND alumno_id = ?";
            $stmt = $db->prepare($query);
            $stmt->bindParam(1, $data->payment_id);
            $stmt->bindParam(2, $user_id);
            $stmt->execute();
            
            $payment = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if($payment) {
                // Actualizar estado del pago
                $update_query = "UPDATE pagos SET estado = 'completado', fecha_pago = NOW() WHERE id = ?";
                $update_stmt = $db->prepare($update_query);
                $update_stmt->bindParam(1, $payment['id']);
                
                if($update_stmt->execute()) {
                    // Asignar libros del paquete al alumno
                    assignPackageToUser($payment['paquete_id'], $user_id);
                    
                    http_response_code(200);
                    echo json_encode(array("message" => "Pago confirmado exitosamente."));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error actualizando el pago."));
                }
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Pago no encontrado."));
            }
            
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Error confirmando pago: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "ID de pago requerido."));
    }
}

function handleStripeWebhook() {
    // Manejar webhooks de Stripe para confirmación automática de pagos
    $payload = @file_get_contents('php://input');
    $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
    $endpoint_secret = 'whsec_...'; // Tu webhook secret de Stripe
    
    try {
        require_once '../vendor/autoload.php';
        $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        
        if($event['type'] === 'payment_intent.succeeded') {
            $payment_intent = $event['data']['object'];
            
            // Actualizar el pago en la base de datos
            updatePaymentStatus($payment_intent['id'], 'completado');
            
            // Asignar paquete al usuario
            $user_id = $payment_intent['metadata']['user_id'];
            $package_id = $payment_intent['metadata']['package_id'];
            assignPackageToUser($package_id, $user_id);
        }
        
        http_response_code(200);
        echo json_encode(array("status" => "success"));
        
    } catch(Exception $e) {
        http_response_code(400);
        echo json_encode(array("error" => $e->getMessage()));
    }
}

function handleClipWebhook() {
    // Manejar webhooks de Clip para confirmación automática de pagos
    $payload = json_decode(file_get_contents('php://input'), true);
    
    if($payload && isset($payload['status']) && $payload['status'] === 'completed') {
        $payment_id = $payload['id'];
        
        // Actualizar el pago en la base de datos
        updatePaymentStatus($payment_id, 'completado');
        
        // Asignar paquete al usuario
        if(isset($payload['metadata'])) {
            $user_id = $payload['metadata']['user_id'];
            $package_id = $payload['metadata']['package_id'];
            assignPackageToUser($package_id, $user_id);
        }
        
        http_response_code(200);
        echo json_encode(array("status" => "success"));
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid webhook payload"));
    }
}

function updatePaymentStatus($transaction_id, $status) {
    global $db;
    
    $query = "UPDATE pagos SET estado = ?, fecha_pago = NOW() WHERE id_transaccion = ?";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $status);
    $stmt->bindParam(2, $transaction_id);
    $stmt->execute();
}

function assignPackageToUser($package_id, $user_id) {
    global $db;
    
    try {
        // Inscribir al usuario en los cursos del paquete
        $course_query = "INSERT IGNORE INTO inscripciones (alumno_id, curso_id, estado)
                         SELECT ?, pc.curso_id, 'activa'
                         FROM paquete_cursos pc
                         WHERE pc.paquete_id = ?";
        
        $course_stmt = $db->prepare($course_query);
        $course_stmt->bindParam(1, $user_id);
        $course_stmt->bindParam(2, $package_id);
        $course_stmt->execute();
        
        // Asignar libros del paquete al usuario
        $book_query = "INSERT IGNORE INTO biblioteca_personal (alumno_id, libro_id, acceso_activo)
                       SELECT ?, pl.libro_id, 1
                       FROM paquete_libros pl
                       INNER JOIN libros l ON pl.libro_id = l.id
                       WHERE pl.paquete_id = ? AND l.activo = 1";
        
        $book_stmt = $db->prepare($book_query);
        $book_stmt->bindParam(1, $user_id);
        $book_stmt->bindParam(2, $package_id);
        $book_stmt->execute();
        
        return true;
        
    } catch(Exception $e) {
        error_log("Error asignando paquete: " . $e->getMessage());
        return false;
    }
}
?>
