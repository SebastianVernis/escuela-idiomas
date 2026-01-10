<?php
/**
 * Modelo de Usuario
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

class User {
    private $conn;
    private $table_name = "usuarios";

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $username;
    public $password;
    public $rol;
    public $telefono;
    public $nivel_idioma;
    public $zona_horaria;
    public $fecha_registro;
    public $activo;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear usuario
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET nombre=:nombre, apellido=:apellido, email=:email, 
                      username=:username, password=:password, rol=:rol, 
                      telefono=:telefono, nivel_idioma=:nivel_idioma, 
                      zona_horaria=:zona_horaria";

        $stmt = $this->conn->prepare($query);

        // Limpiar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        $this->rol = htmlspecialchars(strip_tags($this->rol));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->nivel_idioma = htmlspecialchars(strip_tags($this->nivel_idioma));
        $this->zona_horaria = htmlspecialchars(strip_tags($this->zona_horaria));

        // Bind valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":rol", $this->rol);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":nivel_idioma", $this->nivel_idioma);
        $stmt->bindParam(":zona_horaria", $this->zona_horaria);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    // Leer todos los usuarios
    public function read() {
        $query = "SELECT id, nombre, apellido, email, username, rol, telefono, 
                         nivel_idioma, zona_horaria, fecha_registro, activo 
                  FROM " . $this->table_name . " 
                  WHERE activo = 1 
                  ORDER BY fecha_registro DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Leer un usuario por ID
    public function readOne() {
        $query = "SELECT id, nombre, apellido, email, username, rol, telefono, 
                         nivel_idioma, zona_horaria, fecha_registro, activo 
                  FROM " . $this->table_name . " 
                  WHERE id = ? AND activo = 1 
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->nombre = $row['nombre'];
            $this->apellido = $row['apellido'];
            $this->email = $row['email'];
            $this->username = $row['username'];
            $this->rol = $row['rol'];
            $this->telefono = $row['telefono'];
            $this->nivel_idioma = $row['nivel_idioma'];
            $this->zona_horaria = $row['zona_horaria'];
            $this->fecha_registro = $row['fecha_registro'];
            $this->activo = $row['activo'];
            return true;
        }

        return false;
    }

    // Actualizar usuario
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre=:nombre, apellido=:apellido, email=:email, 
                      telefono=:telefono, nivel_idioma=:nivel_idioma, 
                      zona_horaria=:zona_horaria 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Limpiar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->nivel_idioma = htmlspecialchars(strip_tags($this->nivel_idioma));
        $this->zona_horaria = htmlspecialchars(strip_tags($this->zona_horaria));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":nivel_idioma", $this->nivel_idioma);
        $stmt->bindParam(":zona_horaria", $this->zona_horaria);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar usuario (soft delete)
    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET activo = 0 WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Login
    public function login($username, $password) {
        $query = "SELECT id, nombre, apellido, email, username, password, rol, 
                         telefono, nivel_idioma, zona_horaria 
                  FROM " . $this->table_name . " 
                  WHERE (username = :username OR email = :username) AND activo = 1 
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row && password_verify($password, $row['password'])) {
            $this->id = $row['id'];
            $this->nombre = $row['nombre'];
            $this->apellido = $row['apellido'];
            $this->email = $row['email'];
            $this->username = $row['username'];
            $this->rol = $row['rol'];
            $this->telefono = $row['telefono'];
            $this->nivel_idioma = $row['nivel_idioma'];
            $this->zona_horaria = $row['zona_horaria'];
            return true;
        }

        return false;
    }

    // Verificar si el email existe
    public function emailExists() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = ? AND activo = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Verificar si el username existe
    public function usernameExists() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE username = ? AND activo = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Obtener cursos del alumno
    public function getCourses() {
        $query = "SELECT c.id, c.nombre, c.descripcion, c.idioma, c.nivel, c.precio, c.tipo,
                         i.fecha_inscripcion, i.estado as estado_inscripcion
                  FROM cursos c
                  INNER JOIN inscripciones i ON c.id = i.curso_id
                  WHERE i.alumno_id = ? AND i.estado = 'activa' AND c.activo = 1
                  ORDER BY i.fecha_inscripcion DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        return $stmt;
    }

    // Obtener horarios del alumno
    public function getSchedule() {
        $query = "SELECT cl.id, cl.nombre, cl.tipo, cl.fecha_hora, cl.duracion,
                         cl.enlace_sesion, cl.estado, c.nombre as curso_nombre,
                         u.nombre as profesor_nombre, u.apellido as profesor_apellido
                  FROM clases cl
                  INNER JOIN cursos c ON cl.curso_id = c.id
                  INNER JOIN inscripciones i ON c.id = i.curso_id
                  LEFT JOIN usuarios u ON cl.profesor_id = u.id
                  WHERE i.alumno_id = ? AND i.estado = 'activa' 
                        AND cl.fecha_hora >= NOW()
                        AND cl.estado IN ('programada', 'en_curso')
                  ORDER BY cl.fecha_hora ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        return $stmt;
    }

    // Obtener biblioteca personal
    public function getPersonalLibrary() {
        $query = "SELECT l.id, l.titulo, l.autor, l.idioma, l.nivel, l.formato,
                         l.archivo_url, l.stream_url, l.descripcion, l.categoria,
                         bp.fecha_asignacion
                  FROM libros l
                  INNER JOIN biblioteca_personal bp ON l.id = bp.libro_id
                  WHERE bp.alumno_id = ? AND bp.acceso_activo = 1 AND l.activo = 1
                  ORDER BY bp.fecha_asignacion DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        return $stmt;
    }

    // Obtener historial de pagos
    public function getPaymentHistory() {
        $query = "SELECT p.id, p.monto, p.metodo_pago, p.estado, p.fecha_pago,
                         p.fecha_vencimiento, paq.nombre as paquete_nombre
                  FROM pagos p
                  INNER JOIN paquetes paq ON p.paquete_id = paq.id
                  WHERE p.alumno_id = ?
                  ORDER BY p.fecha_pago DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        return $stmt;
    }

    // Obtener próximo pago pendiente
    public function getNextPayment() {
        $query = "SELECT p.id, p.monto, p.fecha_vencimiento, paq.nombre as paquete_nombre
                  FROM pagos p
                  INNER JOIN paquetes paq ON p.paquete_id = paq.id
                  WHERE p.alumno_id = ? AND p.estado = 'pendiente'
                        AND p.fecha_vencimiento >= CURDATE()
                  ORDER BY p.fecha_vencimiento ASC
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Obtener estadísticas del dashboard
    public function getDashboardStats() {
        $stats = [];

        // Cursos activos
        $query = "SELECT COUNT(*) as total FROM inscripciones WHERE alumno_id = ? AND estado = 'activa'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $stats['cursos_activos'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Libros disponibles
        $query = "SELECT COUNT(*) as total FROM biblioteca_personal WHERE alumno_id = ? AND acceso_activo = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $stats['libros_disponibles'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Próxima clase
        $query = "SELECT cl.nombre, cl.fecha_hora, 
                         TIMESTAMPDIFF(HOUR, NOW(), cl.fecha_hora) as horas_restantes
                  FROM clases cl
                  INNER JOIN cursos c ON cl.curso_id = c.id
                  INNER JOIN inscripciones i ON c.id = i.curso_id
                  WHERE i.alumno_id = ? AND i.estado = 'activa' 
                        AND cl.fecha_hora > NOW()
                        AND cl.estado = 'programada'
                  ORDER BY cl.fecha_hora ASC
                  LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $proxima_clase = $stmt->fetch(PDO::FETCH_ASSOC);
        $stats['proxima_clase'] = $proxima_clase;

        return $stats;
    }
}
?>

