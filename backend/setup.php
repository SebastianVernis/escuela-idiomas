<?php
/**
 * Script de Configuración Inicial
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

include_once 'config/database.php';

echo "<h1>Idiomas Avanza - Configuración Inicial</h1>";

$database = new Database();
$db = $database->getConnection();

if($db) {
    echo "<p style='color: green;'>✓ Conexión a la base de datos establecida</p>";
    
    // Crear tablas
    echo "<h2>Creando estructura de base de datos...</h2>";
    if($database->createTables()) {
        echo "<p style='color: green;'>✓ Tablas creadas exitosamente</p>";
        
        // Insertar datos de ejemplo
        echo "<h2>Insertando datos de ejemplo...</h2>";
        if($database->insertSampleData()) {
            echo "<p style='color: green;'>✓ Datos de ejemplo insertados exitosamente</p>";
            
            echo "<h2>Configuración completada</h2>";
            echo "<div style='background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
            echo "<h3>Credenciales de acceso:</h3>";
            echo "<p><strong>Usuario Demo:</strong> demo / demo123</p>";
            echo "<p><strong>Administrador:</strong> admin / password</p>";
            echo "<p><strong>Profesor Sarah:</strong> sarah / password</p>";
            echo "<p><strong>Profesor Michael:</strong> michael / password</p>";
            echo "</div>";
            
            echo "<div style='background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
            echo "<h3>Próximos pasos:</h3>";
            echo "<ol>";
            echo "<li>Configurar el servidor web para servir los archivos PHP</li>";
            echo "<li>Configurar las credenciales de base de datos en config/database.php</li>";
            echo "<li>Implementar la integración con Stripe/Clip para pagos</li>";
            echo "<li>Configurar el almacenamiento de archivos para la biblioteca</li>";
            echo "<li>Implementar la integración con plataforma de videoconferencia</li>";
            echo "</ol>";
            echo "</div>";
            
            echo "<div style='background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
            echo "<h3>Endpoints de API disponibles:</h3>";
            echo "<ul>";
            echo "<li><strong>POST</strong> /api/auth/login - Iniciar sesión</li>";
            echo "<li><strong>POST</strong> /api/auth/register - Registrar usuario</li>";
            echo "<li><strong>GET</strong> /api/dashboard - Datos del dashboard</li>";
            echo "<li><strong>GET</strong> /api/library/personal - Biblioteca personal</li>";
            echo "<li><strong>GET</strong> /api/schedule/my-schedule - Horarios del usuario</li>";
            echo "<li><strong>GET</strong> /api/schedule/conversation-rooms - Salas de conversación</li>";
            echo "</ul>";
            echo "</div>";
            
        } else {
            echo "<p style='color: red;'>✗ Error insertando datos de ejemplo</p>";
        }
    } else {
        echo "<p style='color: red;'>✗ Error creando tablas</p>";
    }
} else {
    echo "<p style='color: red;'>✗ Error de conexión a la base de datos</p>";
    echo "<p>Verifica la configuración en config/database.php</p>";
}

echo "<hr>";
echo "<p><em>Idiomas Avanza v1.0 - " . date('Y-m-d H:i:s') . "</em></p>";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Idiomas Avanza - Setup</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; }
        h2 { color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        .success { color: #10b981; }
        .error { color: #ef4444; }
        .info { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .warning { background: #fffbeb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>
</body>
</html>

