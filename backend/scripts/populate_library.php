<?php
/**
 * Script para poblar la biblioteca digital con 1000 libros
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

include_once '../config/database.php';

echo "<h1>Idiomas Avanza - Poblando Biblioteca Digital</h1>";

$database = new Database();
$db = $database->getConnection();

if(!$db) {
    die("Error de conexión a la base de datos");
}

// Datos base para generar libros
$idiomas = ['inglés', 'francés', 'portugués'];
$niveles = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
$formatos = ['PDF', 'EPUB', 'Audio'];
$categorias = [
    'Gramática', 'Vocabulario', 'Conversación', 'Lectura', 
    'Escritura', 'Pronunciación', 'Cultura', 'Negocios',
    'Preparación de Exámenes', 'Literatura', 'Historia', 'Ciencias'
];

$autores_ingles = [
    'John Smith', 'Mary Johnson', 'David Brown', 'Sarah Wilson',
    'Michael Davis', 'Jennifer Garcia', 'Robert Miller', 'Lisa Anderson',
    'William Taylor', 'Elizabeth Moore', 'James Jackson', 'Patricia White'
];

$autores_frances = [
    'Pierre Dubois', 'Marie Leroy', 'Jean Martin', 'Sophie Bernard',
    'Michel Thomas', 'Catherine Petit', 'Philippe Robert', 'Isabelle Durand',
    'François Moreau', 'Sylvie Laurent', 'Antoine Simon', 'Nathalie Michel'
];

$autores_portugues = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa',
    'Carlos Pereira', 'Lucia Ferreira', 'Manuel Rodrigues', 'Teresa Alves',
    'António Gomes', 'Isabel Martins', 'José Carvalho', 'Cristina Sousa'
];

// Plantillas de títulos por categoría
$titulos_templates = [
    'Gramática' => [
        'Gramática Esencial de {idioma}',
        'Guía Completa de Gramática {nivel}',
        'Ejercicios de Gramática {idioma} {nivel}',
        'Gramática Práctica para {nivel}',
        'Fundamentos Gramaticales {idioma}'
    ],
    'Vocabulario' => [
        'Vocabulario Esencial {idioma} {nivel}',
        '1000 Palabras Clave en {idioma}',
        'Diccionario Visual {idioma}',
        'Vocabulario Temático {nivel}',
        'Palabras y Expresiones {idioma}'
    ],
    'Conversación' => [
        'Conversación Práctica {idioma} {nivel}',
        'Diálogos Cotidianos en {idioma}',
        'Hablando {idioma} con Confianza',
        'Conversación Fluida {nivel}',
        'Expresiones Coloquiales {idioma}'
    ],
    'Lectura' => [
        'Lecturas Graduadas {idioma} {nivel}',
        'Cuentos Cortos en {idioma}',
        'Comprensión Lectora {nivel}',
        'Textos Auténticos {idioma}',
        'Antología Literaria {nivel}'
    ],
    'Escritura' => [
        'Escritura Creativa en {idioma}',
        'Redacción {idioma} {nivel}',
        'Técnicas de Escritura {nivel}',
        'Composición en {idioma}',
        'Escritura Académica {idioma}'
    ],
    'Pronunciación' => [
        'Fonética {idioma} {nivel}',
        'Pronunciación Perfecta {idioma}',
        'Sonidos del {idioma}',
        'Entrenamiento Fonético {nivel}',
        'Acento y Entonación {idioma}'
    ],
    'Cultura' => [
        'Cultura y Sociedad {idioma}',
        'Tradiciones de países de habla {idioma}',
        'Historia Cultural {idioma}',
        'Costumbres y Tradiciones',
        'Civilización {idioma}'
    ],
    'Negocios' => [
        '{idioma} para Negocios {nivel}',
        'Comunicación Empresarial {idioma}',
        'Correspondencia Comercial {idioma}',
        'Presentaciones en {idioma}',
        'Negociación en {idioma}'
    ],
    'Preparación de Exámenes' => [
        'Preparación TOEFL {nivel}',
        'Examen DELE {nivel}',
        'Certificación {idioma} {nivel}',
        'Tests de Nivel {idioma}',
        'Simulacros de Examen {nivel}'
    ],
    'Literatura' => [
        'Clásicos de la Literatura {idioma}',
        'Poesía {idioma} {nivel}',
        'Teatro Contemporáneo {idioma}',
        'Novela Moderna {idioma}',
        'Antología Poética {nivel}'
    ]
];

// Función para generar descripción
function generarDescripcion($titulo, $categoria, $idioma, $nivel) {
    $descripciones = [
        "Un completo manual de $categoria en $idioma diseñado específicamente para estudiantes de nivel $nivel. Incluye ejercicios prácticos y ejemplos reales.",
        "Guía exhaustiva de $categoria que abarca todos los aspectos fundamentales del $idioma para nivel $nivel. Ideal para autodidactas y estudiantes en clase.",
        "Recurso esencial para dominar la $categoria en $idioma. Metodología probada con miles de estudiantes de nivel $nivel en todo el mundo.",
        "Material didáctico innovador que combina teoría y práctica para el aprendizaje efectivo de $categoria en $idioma nivel $nivel.",
        "Herramienta indispensable para estudiantes de $idioma que buscan perfeccionar su $categoria. Adaptado al nivel $nivel del Marco Común Europeo."
    ];
    
    return $descripciones[array_rand($descripciones)];
}

// Función para generar URL de archivo
function generarArchivoUrl($titulo, $formato) {
    $filename = strtolower(str_replace([' ', 'á', 'é', 'í', 'ó', 'ú', 'ñ'], ['_', 'a', 'e', 'i', 'o', 'u', 'n'], $titulo));
    $extension = strtolower($formato);
    return "/biblioteca/archivos/{$filename}.{$extension}";
}

// Función para generar URL de streaming
function generarStreamUrl($titulo, $formato) {
    if ($formato === 'Audio') {
        $filename = strtolower(str_replace([' ', 'á', 'é', 'í', 'ó', 'ú', 'ñ'], ['_', 'a', 'e', 'i', 'o', 'u', 'n'], $titulo));
        return "/biblioteca/stream/audio/{$filename}.mp3";
    } elseif ($formato === 'PDF') {
        $filename = strtolower(str_replace([' ', 'á', 'é', 'í', 'ó', 'ú', 'ñ'], ['_', 'a', 'e', 'i', 'o', 'u', 'n'], $titulo));
        return "/biblioteca/stream/pdf/{$filename}";
    }
    return null;
}

echo "<h2>Generando 1000 libros para la biblioteca digital...</h2>";

$libros_insertados = 0;
$errores = 0;

// Preparar statement
$query = "INSERT INTO libros (titulo, autor, idioma, nivel, formato, descripcion, categoria, archivo_url, stream_url, activo) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)";
$stmt = $db->prepare($query);

for ($i = 1; $i <= 1000; $i++) {
    try {
        // Seleccionar datos aleatorios
        $idioma = $idiomas[array_rand($idiomas)];
        $nivel = $niveles[array_rand($niveles)];
        $formato = $formatos[array_rand($formatos)];
        $categoria = $categorias[array_rand($categorias)];
        
        // Seleccionar autor según idioma
        switch($idioma) {
            case 'inglés':
                $autor = $autores_ingles[array_rand($autores_ingles)];
                break;
            case 'francés':
                $autor = $autores_frances[array_rand($autores_frances)];
                break;
            case 'portugués':
                $autor = $autores_portugues[array_rand($autores_portugues)];
                break;
        }
        
        // Generar título
        if (isset($titulos_templates[$categoria])) {
            $template = $titulos_templates[$categoria][array_rand($titulos_templates[$categoria])];
            $titulo = str_replace(['{idioma}', '{nivel}'], [$idioma, $nivel], $template);
        } else {
            $titulo = "Manual de $categoria $idioma $nivel";
        }
        
        // Agregar número si es necesario para evitar duplicados
        if ($i % 50 == 0) {
            $titulo .= " - Volumen " . ceil($i / 50);
        }
        
        // Generar descripción
        $descripcion = generarDescripcion($titulo, $categoria, $idioma, $nivel);
        
        // Generar URLs
        $archivo_url = generarArchivoUrl($titulo, $formato);
        $stream_url = generarStreamUrl($titulo, $formato);
        
        // Insertar en base de datos
        $stmt->bindParam(1, $titulo);
        $stmt->bindParam(2, $autor);
        $stmt->bindParam(3, $idioma);
        $stmt->bindParam(4, $nivel);
        $stmt->bindParam(5, $formato);
        $stmt->bindParam(6, $descripcion);
        $stmt->bindParam(7, $categoria);
        $stmt->bindParam(8, $archivo_url);
        $stmt->bindParam(9, $stream_url);
        
        if ($stmt->execute()) {
            $libros_insertados++;
            if ($i % 100 == 0) {
                echo "<p>✓ Insertados $i libros...</p>";
                flush();
            }
        } else {
            $errores++;
        }
        
    } catch (Exception $e) {
        $errores++;
        echo "<p style='color: red;'>Error insertando libro $i: " . $e->getMessage() . "</p>";
    }
}

echo "<h2>Proceso completado</h2>";
echo "<div style='background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
echo "<h3>Estadísticas:</h3>";
echo "<p><strong>Libros insertados exitosamente:</strong> $libros_insertados</p>";
echo "<p><strong>Errores:</strong> $errores</p>";
echo "<p><strong>Total procesado:</strong> 1000</p>";
echo "</div>";

// Mostrar estadísticas por categoría
echo "<h3>Distribución por categoría:</h3>";
$stats_query = "SELECT categoria, COUNT(*) as total FROM libros GROUP BY categoria ORDER BY total DESC";
$stats_stmt = $db->prepare($stats_query);
$stats_stmt->execute();

echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
echo "<tr><th>Categoría</th><th>Total de Libros</th></tr>";
while ($row = $stats_stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr><td>{$row['categoria']}</td><td>{$row['total']}</td></tr>";
}
echo "</table>";

// Mostrar estadísticas por idioma
echo "<h3>Distribución por idioma:</h3>";
$lang_query = "SELECT idioma, COUNT(*) as total FROM libros GROUP BY idioma ORDER BY total DESC";
$lang_stmt = $db->prepare($lang_query);
$lang_stmt->execute();

echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
echo "<tr><th>Idioma</th><th>Total de Libros</th></tr>";
while ($row = $lang_stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr><td>{$row['idioma']}</td><td>{$row['total']}</td></tr>";
}
echo "</table>";

// Mostrar estadísticas por formato
echo "<h3>Distribución por formato:</h3>";
$format_query = "SELECT formato, COUNT(*) as total FROM libros GROUP BY formato ORDER BY total DESC";
$format_stmt = $db->prepare($format_query);
$format_stmt->execute();

echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
echo "<tr><th>Formato</th><th>Total de Libros</th></tr>";
while ($row = $format_stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr><td>{$row['formato']}</td><td>{$row['total']}</td></tr>";
}
echo "</table>";

echo "<div style='background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
echo "<h3>Próximos pasos:</h3>";
echo "<ol>";
echo "<li>Configurar el almacenamiento de archivos reales</li>";
echo "<li>Implementar sistema de subida de archivos</li>";
echo "<li>Configurar servidor de streaming para audio</li>";
echo "<li>Optimizar búsqueda y filtros</li>";
echo "<li>Implementar sistema de recomendaciones</li>";
echo "</ol>";
echo "</div>";

echo "<hr>";
echo "<p><em>Biblioteca Digital Idiomas Avanza - " . date('Y-m-d H:i:s') . "</em></p>";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Idiomas Avanza - Biblioteca Digital Setup</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; }
        h2, h3 { color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        table { margin: 20px 0; }
        th { background: #f3f4f6; padding: 10px; }
        td { padding: 8px; }
        .success { color: #10b981; }
        .error { color: #ef4444; }
    </style>
</head>
<body>
</body>
</html>

