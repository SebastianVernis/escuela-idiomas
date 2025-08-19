<?php
/**
 * Script de ejemplo para crear un PaymentIntent de Stripe con metadata
 * Uso por CLI:
 *   php backend/scripts/create_stripe_intent.php '{"user_id":1,"package_id":1,"course_id":3,"amount_mxn":1200}'
 * Uso por HTTP (POST JSON):
 *   POST /backend/scripts/create_stripe_intent.php  (body JSON con los mismos campos)
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Cargar Stripe SDK (requiere composer install)
require_once __DIR__ . '/../vendor/autoload.php';

// Obtener API Key desde entorno o placeholder
$stripeSecret = getenv('STRIPE_SECRET_KEY') ?: 'sk_test_...'; // Reemplaza en producción
\Stripe\Stripe::setApiKey($stripeSecret);

// Leer payload (CLI o HTTP)
$input = null;
if (php_sapi_name() === 'cli') {
    $input = isset($argv[1]) ? json_decode($argv[1], true) : [];
} else {
    $raw = file_get_contents('php://input');
    $input = $raw ? json_decode($raw, true) : $_POST;
}

// Valores requeridos
$userId = isset($input['user_id']) ? (int)$input['user_id'] : null;
$packageId = isset($input['package_id']) ? (int)$input['package_id'] : null;
$courseId = isset($input['course_id']) ? (int)$input['course_id'] : null; // opcional pero recomendado
$amountMxn = isset($input['amount_mxn']) ? (int)$input['amount_mxn'] : null; // Entero en MXN

if (!$userId || !$packageId || !$amountMxn) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Faltan campos: user_id, package_id, amount_mxn (MXN enteros)'
    ]);
    exit();
}

try {
    $metadata = [
        'user_id' => (string)$userId,
        'package_id' => (string)$packageId,
    ];
    if ($courseId) {
        $metadata['course_id'] = (string)$courseId;
    }

    $pi = \Stripe\PaymentIntent::create([
        'amount' => $amountMxn * 100, // centavos
        'currency' => 'mxn',
        'metadata' => $metadata,
        'automatic_payment_methods' => [ 'enabled' => true ],
    ]);

    http_response_code(200);
    echo json_encode([
        'ok' => true,
        'payment_intent_id' => $pi->id,
        'client_secret' => $pi->client_secret,
        'metadata' => $metadata,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => $e->getMessage(),
    ]);
}

