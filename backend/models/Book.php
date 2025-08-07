<?php
/**
 * Modelo de Libro
 * Idiomas Avanza - Escuela Digital de Idiomas
 */

class Book {
    private $conn;
    private $table_name = "libros";

    public $id;
    public $titulo;
    public $autor;
    public $idioma;
    public $nivel;
    public $formato;
    public $archivo_url;
    public $stream_url;
    public $descripcion;
    public $categoria;
    public $activo;
    public $fecha_agregado;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear libro
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET titulo=:titulo, autor=:autor, idioma=:idioma, nivel=:nivel,
                      formato=:formato, archivo_url=:archivo_url, stream_url=:stream_url,
                      descripcion=:descripcion, categoria=:categoria";

        $stmt = $this->conn->prepare($query);

        // Limpiar datos
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->autor = htmlspecialchars(strip_tags($this->autor));
        $this->idioma = htmlspecialchars(strip_tags($this->idioma));
        $this->nivel = htmlspecialchars(strip_tags($this->nivel));
        $this->formato = htmlspecialchars(strip_tags($this->formato));
        $this->archivo_url = htmlspecialchars(strip_tags($this->archivo_url));
        $this->stream_url = htmlspecialchars(strip_tags($this->stream_url));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->categoria = htmlspecialchars(strip_tags($this->categoria));

        // Bind valores
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":autor", $this->autor);
        $stmt->bindParam(":idioma", $this->idioma);
        $stmt->bindParam(":nivel", $this->nivel);
        $stmt->bindParam(":formato", $this->formato);
        $stmt->bindParam(":archivo_url", $this->archivo_url);
        $stmt->bindParam(":stream_url", $this->stream_url);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":categoria", $this->categoria);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    // Leer todos los libros
    public function read() {
        $query = "SELECT id, titulo, autor, idioma, nivel, formato, archivo_url,
                         stream_url, descripcion, categoria, fecha_agregado
                  FROM " . $this->table_name . " 
                  WHERE activo = 1 
                  ORDER BY fecha_agregado DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Leer libros por idioma
    public function readByLanguage($idioma) {
        $query = "SELECT id, titulo, autor, idioma, nivel, formato, archivo_url,
                         stream_url, descripcion, categoria, fecha_agregado
                  FROM " . $this->table_name . " 
                  WHERE activo = 1 AND idioma = ?
                  ORDER BY fecha_agregado DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $idioma);
        $stmt->execute();

        return $stmt;
    }

    // Leer libros por formato
    public function readByFormat($formato) {
        $query = "SELECT id, titulo, autor, idioma, nivel, formato, archivo_url,
                         stream_url, descripcion, categoria, fecha_agregado
                  FROM " . $this->table_name . " 
                  WHERE activo = 1 AND formato = ?
                  ORDER BY fecha_agregado DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $formato);
        $stmt->execute();

        return $stmt;
    }

    // Buscar libros
    public function search($search_term) {
        $query = "SELECT id, titulo, autor, idioma, nivel, formato, archivo_url,
                         stream_url, descripcion, categoria, fecha_agregado
                  FROM " . $this->table_name . " 
                  WHERE activo = 1 AND (
                      titulo LIKE :search OR 
                      autor LIKE :search OR 
                      descripcion LIKE :search OR
                      categoria LIKE :search
                  )
                  ORDER BY fecha_agregado DESC";

        $stmt = $this->conn->prepare($query);
        $search_term = "%{$search_term}%";
        $stmt->bindParam(":search", $search_term);
        $stmt->execute();

        return $stmt;
    }

    // Leer un libro por ID
    public function readOne() {
        $query = "SELECT id, titulo, autor, idioma, nivel, formato, archivo_url,
                         stream_url, descripcion, categoria, fecha_agregado
                  FROM " . $this->table_name . " 
                  WHERE id = ? AND activo = 1 
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->titulo = $row['titulo'];
            $this->autor = $row['autor'];
            $this->idioma = $row['idioma'];
            $this->nivel = $row['nivel'];
            $this->formato = $row['formato'];
            $this->archivo_url = $row['archivo_url'];
            $this->stream_url = $row['stream_url'];
            $this->descripcion = $row['descripcion'];
            $this->categoria = $row['categoria'];
            $this->fecha_agregado = $row['fecha_agregado'];
            return true;
        }

        return false;
    }

    // Actualizar libro
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET titulo=:titulo, autor=:autor, idioma=:idioma, nivel=:nivel,
                      formato=:formato, archivo_url=:archivo_url, stream_url=:stream_url,
                      descripcion=:descripcion, categoria=:categoria
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Limpiar datos
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->autor = htmlspecialchars(strip_tags($this->autor));
        $this->idioma = htmlspecialchars(strip_tags($this->idioma));
        $this->nivel = htmlspecialchars(strip_tags($this->nivel));
        $this->formato = htmlspecialchars(strip_tags($this->formato));
        $this->archivo_url = htmlspecialchars(strip_tags($this->archivo_url));
        $this->stream_url = htmlspecialchars(strip_tags($this->stream_url));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->categoria = htmlspecialchars(strip_tags($this->categoria));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind valores
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":autor", $this->autor);
        $stmt->bindParam(":idioma", $this->idioma);
        $stmt->bindParam(":nivel", $this->nivel);
        $stmt->bindParam(":formato", $this->formato);
        $stmt->bindParam(":archivo_url", $this->archivo_url);
        $stmt->bindParam(":stream_url", $this->stream_url);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":categoria", $this->categoria);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar libro (soft delete)
    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET activo = 0 WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Asignar libro a alumno
    public function assignToStudent($alumno_id) {
        $query = "INSERT IGNORE INTO biblioteca_personal (alumno_id, libro_id) VALUES (?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $alumno_id);
        $stmt->bindParam(2, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Verificar si el alumno tiene acceso al libro
    public function hasAccess($alumno_id) {
        $query = "SELECT id FROM biblioteca_personal 
                  WHERE alumno_id = ? AND libro_id = ? AND acceso_activo = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $alumno_id);
        $stmt->bindParam(2, $this->id);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Obtener libros por paquete
    public function getBooksByPackage($paquete_id) {
        $query = "SELECT l.id, l.titulo, l.autor, l.idioma, l.nivel, l.formato,
                         l.archivo_url, l.stream_url, l.descripcion, l.categoria
                  FROM libros l
                  INNER JOIN paquete_libros pl ON l.id = pl.libro_id
                  WHERE pl.paquete_id = ? AND l.activo = 1
                  ORDER BY l.titulo ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $paquete_id);
        $stmt->execute();

        return $stmt;
    }

    // Asignar libros de paquete a alumno
    public function assignPackageBooksToStudent($paquete_id, $alumno_id) {
        $query = "INSERT IGNORE INTO biblioteca_personal (alumno_id, libro_id)
                  SELECT ?, pl.libro_id
                  FROM paquete_libros pl
                  INNER JOIN libros l ON pl.libro_id = l.id
                  WHERE pl.paquete_id = ? AND l.activo = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $alumno_id);
        $stmt->bindParam(2, $paquete_id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Obtener estadísticas de la biblioteca
    public function getLibraryStats() {
        $stats = [];

        // Total de libros por idioma
        $query = "SELECT idioma, COUNT(*) as total FROM " . $this->table_name . " 
                  WHERE activo = 1 GROUP BY idioma";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['por_idioma'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Total de libros por formato
        $query = "SELECT formato, COUNT(*) as total FROM " . $this->table_name . " 
                  WHERE activo = 1 GROUP BY formato";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['por_formato'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Total general
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name . " WHERE activo = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $stats['total'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        return $stats;
    }

    // Obtener libros más populares
    public function getPopularBooks($limit = 10) {
        $query = "SELECT l.id, l.titulo, l.autor, l.idioma, l.formato,
                         COUNT(bp.id) as asignaciones
                  FROM libros l
                  LEFT JOIN biblioteca_personal bp ON l.id = bp.libro_id
                  WHERE l.activo = 1
                  GROUP BY l.id
                  ORDER BY asignaciones DESC, l.fecha_agregado DESC
                  LIMIT ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $limit, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }
}
?>

