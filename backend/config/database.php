<?php
/**
 * Configuración de la base de datos
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

class Database {
    private $host = 'db5018339294.hosting-data.io';
    private $db_name = 'dbs14523731';
    private $username = 'dbu657963';
    private $password = 'Svernis1';
    private $charset = 'utf8mb4';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }
        
        return $this->conn;
    }

    public function createTables() {
        $sql = "
        -- Tabla de usuarios
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            rol ENUM('alumno', 'admin', 'profesor') DEFAULT 'alumno',
            telefono VARCHAR(20),
            nivel_idioma VARCHAR(10),
            zona_horaria VARCHAR(50) DEFAULT 'America/Mexico_City',
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            activo BOOLEAN DEFAULT TRUE
        );

        -- Tabla de cursos
        CREATE TABLE IF NOT EXISTS cursos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(150) NOT NULL,
            descripcion TEXT,
            idioma ENUM('ingles', 'frances', 'portugues') NOT NULL,
            nivel VARCHAR(10),
            precio DECIMAL(10,2) NOT NULL,
            tipo ENUM('conversacional', 'individual', 'certificacion') NOT NULL,
            activo BOOLEAN DEFAULT TRUE,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Tabla de clases
        CREATE TABLE IF NOT EXISTS clases (
            id INT AUTO_INCREMENT PRIMARY KEY,
            curso_id INT,
            nombre VARCHAR(150) NOT NULL,
            tipo ENUM('guiada', 'libre') NOT NULL,
            fecha_hora DATETIME NOT NULL,
            duracion INT DEFAULT 60,
            capacidad_maxima INT DEFAULT 8,
            profesor_id INT,
            enlace_sesion VARCHAR(255),
            estado ENUM('programada', 'en_curso', 'completada', 'cancelada') DEFAULT 'programada',
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (curso_id) REFERENCES cursos(id),
            FOREIGN KEY (profesor_id) REFERENCES usuarios(id)
        );

        -- Tabla de inscripciones
        CREATE TABLE IF NOT EXISTS inscripciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            alumno_id INT,
            curso_id INT,
            fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            estado ENUM('activa', 'pausada', 'completada', 'cancelada') DEFAULT 'activa',
            FOREIGN KEY (alumno_id) REFERENCES usuarios(id),
            FOREIGN KEY (curso_id) REFERENCES cursos(id),
            UNIQUE KEY unique_inscripcion (alumno_id, curso_id)
        );

        -- Tabla de asistencias a clases
        CREATE TABLE IF NOT EXISTS asistencias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            clase_id INT,
            alumno_id INT,
            estado ENUM('presente', 'ausente', 'tardanza') DEFAULT 'presente',
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (clase_id) REFERENCES clases(id),
            FOREIGN KEY (alumno_id) REFERENCES usuarios(id),
            UNIQUE KEY unique_asistencia (clase_id, alumno_id)
        );

        -- Tabla de libros
        CREATE TABLE IF NOT EXISTS libros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(200) NOT NULL,
            autor VARCHAR(150),
            idioma ENUM('ingles', 'frances', 'portugues') NOT NULL,
            nivel VARCHAR(10),
            formato ENUM('pdf', 'epub', 'audio') NOT NULL,
            archivo_url VARCHAR(255),
            stream_url VARCHAR(255),
            descripcion TEXT,
            categoria VARCHAR(100),
            activo BOOLEAN DEFAULT TRUE,
            fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Tabla de paquetes
        CREATE TABLE IF NOT EXISTS paquetes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(150) NOT NULL,
            descripcion TEXT,
            precio DECIMAL(10,2) NOT NULL,
            duracion_meses INT DEFAULT 1,
            activo BOOLEAN DEFAULT TRUE,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Tabla de relación paquetes-cursos
        CREATE TABLE IF NOT EXISTS paquete_cursos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            paquete_id INT,
            curso_id INT,
            FOREIGN KEY (paquete_id) REFERENCES paquetes(id),
            FOREIGN KEY (curso_id) REFERENCES cursos(id),
            UNIQUE KEY unique_paquete_curso (paquete_id, curso_id)
        );

        -- Tabla de relación paquetes-libros
        CREATE TABLE IF NOT EXISTS paquete_libros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            paquete_id INT,
            libro_id INT,
            FOREIGN KEY (paquete_id) REFERENCES paquetes(id),
            FOREIGN KEY (libro_id) REFERENCES libros(id),
            UNIQUE KEY unique_paquete_libro (paquete_id, libro_id)
        );

        -- Tabla de pagos
        CREATE TABLE IF NOT EXISTS pagos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            alumno_id INT,
            paquete_id INT,
            monto DECIMAL(10,2) NOT NULL,
            metodo_pago ENUM('stripe', 'clip') NOT NULL,
            id_transaccion VARCHAR(100),
            estado ENUM('pendiente', 'completado', 'fallido', 'reembolsado') DEFAULT 'pendiente',
            fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fecha_vencimiento DATE,
            FOREIGN KEY (alumno_id) REFERENCES usuarios(id),
            FOREIGN KEY (paquete_id) REFERENCES paquetes(id)
        );

        -- Tabla de biblioteca personal (libros asignados a alumnos)
        CREATE TABLE IF NOT EXISTS biblioteca_personal (
            id INT AUTO_INCREMENT PRIMARY KEY,
            alumno_id INT,
            libro_id INT,
            fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            acceso_activo BOOLEAN DEFAULT TRUE,
            FOREIGN KEY (alumno_id) REFERENCES usuarios(id),
            FOREIGN KEY (libro_id) REFERENCES libros(id),
            UNIQUE KEY unique_biblioteca_personal (alumno_id, libro_id)
        );

        -- Tabla de sesiones de conversación
        CREATE TABLE IF NOT EXISTS sesiones_conversacion (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(150) NOT NULL,
            idioma ENUM('ingles', 'frances', 'portugues') NOT NULL,
            nivel VARCHAR(10),
            tema VARCHAR(200),
            fecha_hora DATETIME NOT NULL,
            duracion INT DEFAULT 60,
            capacidad_maxima INT DEFAULT 8,
            moderador_id INT,
            enlace_sesion VARCHAR(255),
            estado ENUM('programada', 'en_curso', 'completada', 'cancelada') DEFAULT 'programada',
            tipo ENUM('guiada', 'libre') DEFAULT 'libre',
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (moderador_id) REFERENCES usuarios(id)
        );

        -- Tabla de participantes en sesiones de conversación
        CREATE TABLE IF NOT EXISTS participantes_conversacion (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sesion_id INT,
            alumno_id INT,
            fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sesion_id) REFERENCES sesiones_conversacion(id),
            FOREIGN KEY (alumno_id) REFERENCES usuarios(id),
            UNIQUE KEY unique_participante (sesion_id, alumno_id)
        );
        ";

        try {
            $this->conn->exec($sql);
            return true;
        } catch(PDOException $exception) {
            echo "Error creando tablas: " . $exception->getMessage();
            return false;
        }
    }

    public function insertSampleData() {
        $sql = "
        -- Insertar usuarios de ejemplo
        INSERT IGNORE INTO usuarios (nombre, apellido, email, username, password, rol, nivel_idioma) VALUES
        ('Demo', 'User', 'demo@idiomasavanza.mx', 'demo', '$2y$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'alumno', 'B2'),
        ('Admin', 'Sistema', 'admin@idiomasavanza.mx', 'admin', '$2y$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'C2'),
        ('Sarah', 'Johnson', 'sarah@idiomasavanza.mx', 'sarah', '$2y$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', 'C2'),
        ('Michael', 'Brown', 'michael@idiomasavanza.mx', 'michael', '$2y$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', 'C2');

        -- Insertar cursos de ejemplo
        INSERT IGNORE INTO cursos (id, nombre, descripcion, idioma, nivel, precio, tipo) VALUES
        (1, 'Grupos Conversacionales Inglés', 'Practica con hablantes nativos en sesiones guiadas y no guiadas', 'ingles', 'B1-C1', 1200.00, 'conversacional'),
        (2, 'Clases Individuales Inglés', 'Atención personalizada con profesores certificados', 'ingles', 'A1-C2', 1800.00, 'individual'),
        (3, 'Preparación TOEFL', 'Cursos especializados para certificación TOEFL', 'ingles', 'B2-C1', 2500.00, 'certificacion'),
        (4, 'Grupos Conversacionales Francés', 'Practica conversacional en francés', 'frances', 'A2-B2', 1200.00, 'conversacional'),
        (5, 'Preparación DAFL', 'Preparación para Diploma de Francés como Lengua Extranjera', 'frances', 'B1-C1', 2500.00, 'certificacion'),
        (6, 'Grupos Conversacionales Portugués', 'Practica conversacional en portugués', 'portugues', 'A1-B2', 1200.00, 'conversacional'),
        (7, 'Preparación CAPLE', 'Preparación para certificación CAPLE', 'portugues', 'B1-C1', 2500.00, 'certificacion');

        -- Insertar libros de ejemplo
        INSERT IGNORE INTO libros (id, titulo, autor, idioma, nivel, formato, descripcion, categoria) VALUES
        (1, 'English Grammar in Use', 'Raymond Murphy', 'ingles', 'B1-B2', 'pdf', 'Guía completa de gramática inglesa', 'Gramática'),
        (2, 'French Pronunciation Guide', 'Marie Dubois', 'frances', 'A1-A2', 'audio', 'Guía de pronunciación francesa', 'Pronunciación'),
        (3, 'Portuguese for Beginners', 'João Silva', 'portugues', 'A1', 'epub', 'Curso básico de portugués', 'Básico'),
        (4, 'TOEFL Preparation Manual', 'Cambridge Press', 'ingles', 'B2-C1', 'pdf', 'Manual de preparación para TOEFL', 'Certificación'),
        (5, 'Business English Vocabulary', 'Oxford University', 'ingles', 'B2-C1', 'pdf', 'Vocabulario de inglés de negocios', 'Vocabulario');

        -- Insertar paquetes de ejemplo
        INSERT IGNORE INTO paquetes (id, nombre, descripcion, precio, duracion_meses) VALUES
        (1, 'Paquete Básico Inglés', 'Acceso a grupos conversacionales y biblioteca básica', 1200.00, 1),
        (2, 'Paquete Premium Inglés', 'Grupos conversacionales + clases individuales + biblioteca completa', 2500.00, 1),
        (3, 'Paquete Certificación TOEFL', 'Preparación completa para TOEFL + materiales especializados', 3000.00, 3);

        -- Relacionar paquetes con cursos
        INSERT IGNORE INTO paquete_cursos (paquete_id, curso_id) VALUES
        (1, 1), (2, 1), (2, 2), (3, 3);

        -- Relacionar paquetes con libros
        INSERT IGNORE INTO paquete_libros (paquete_id, libro_id) VALUES
        (1, 1), (1, 2), (2, 1), (2, 2), (2, 3), (2, 5), (3, 1), (3, 4), (3, 5);

        -- Insertar clases de ejemplo
        INSERT IGNORE INTO clases (curso_id, nombre, tipo, fecha_hora, profesor_id, enlace_sesion) VALUES
        (1, 'Conversación en Inglés - Intermedio', 'guiada', '2025-01-06 14:00:00', 3, 'https://meet.google.com/abc-defg-hij'),
        (4, 'Práctica Libre de Francés', 'libre', '2025-01-07 16:00:00', NULL, 'https://meet.google.com/xyz-uvwx-yz'),
        (3, 'Preparación TOEFL - Speaking', 'guiada', '2025-01-08 18:00:00', 4, 'https://meet.google.com/toefl-speak-123');

        -- Insertar sesiones de conversación
        INSERT IGNORE INTO sesiones_conversacion (nombre, idioma, nivel, tema, fecha_hora, moderador_id, tipo) VALUES
        ('English Conversation - Intermediate', 'ingles', 'B2', 'Travel experiences', '2025-01-06 14:00:00', 3, 'guiada'),
        ('French Practice - Beginner', 'frances', 'A2', 'Daily routines', '2025-01-06 16:30:00', NULL, 'libre'),
        ('Portuguese Conversation', 'portugues', 'B1', 'Libre', '2025-01-06 19:00:00', NULL, 'libre');
        ";

        try {
            $this->conn->exec($sql);
            return true;
        } catch(PDOException $exception) {
            echo "Error insertando datos de ejemplo: " . $exception->getMessage();
            return false;
        }
    }
}
?>

