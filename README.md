# Idiomas Avanza - Escuela Digital de Idiomas

Una aplicación web completa para una escuela digital especializada en inglés, francés y portugués, con grupos conversacionales, preparación para certificaciones internacionales y biblioteca digital.

## 🌟 Características Principales

### 🎓 Sistema Educativo
- **3 idiomas:** Inglés, Francés, Portugués
- **6 niveles:** A1, A2, B1, B2, C1, C2 (Marco Común Europeo)
- **Certificaciones:** TOEFL, CAPLE, DAFL
- **Modalidades:** Grupos conversacionales guiados y libres, clases individuales

### 📚 Biblioteca Digital
- **1000+ libros** en múltiples formatos
- **Formatos:** PDF, EPUB, Audio
- **12 categorías:** Gramática, Vocabulario, Conversación, Lectura, etc.
- **Streaming y descarga** disponibles
- **Asignación automática** por paquete contratado

### 💳 Sistema de Pagos
- **Stripe:** Tarjetas internacionales
- **Clip:** Mercado mexicano (SPEI, tarjetas locales)
- **Webhooks:** Confirmación automática de pagos
- **Paquetes:** Básico ($1,200), Premium ($2,500), Certificación ($3,000)

### 👥 Gestión de Usuarios
- **Roles:** Alumno, Profesor, Administrador
- **Portal personalizado** para cada tipo de usuario
- **Dashboard con métricas** de progreso
- **Horarios y asistencias** automatizados

## 🏗️ Arquitectura Técnica

### Frontend
- **Tecnología:** JavaScript Vanilla, HTML5, CSS3
- **Diseño:** Responsive, mobile-first
- **Librerías:** Chart.js, Font Awesome
- **Tipografía:** Inter (Google Fonts)

### Backend
- **Tecnología:** PHP 7.4+
- **Base de datos:** MySQL 8.0+
- **Arquitectura:** MVC con APIs RESTful
- **Autenticación:** JWT con middleware

### Base de Datos
```sql
- usuarios (gestión de cuentas)
- libros (biblioteca digital)
- cursos (programas educativos)
- clases (horarios y sesiones)
- pagos (transacciones)
- asistencias (seguimiento)
- conversacion_salas (grupos de práctica)
- usuario_libros (asignaciones)
- inscripciones (matrículas)
- profesores (staff educativo)
- horarios (programación)
- certificaciones (exámenes)
```

## 📁 Estructura del Proyecto

```
escuela-idiomas/
├── index.html              # Página principal
├── portal.html             # Portal de alumnos
├── admin.html              # Panel de administración
├── payment.html            # Sistema de pagos
├── styles.css              # Estilos principales
├── portal.css              # Estilos del portal
├── admin.css               # Estilos del admin
├── payment.css             # Estilos de pagos
├── script.js               # JavaScript principal
├── portal.js               # JavaScript del portal
├── admin.js                # JavaScript del admin
├── payment.js              # JavaScript de pagos
├── backend/
│   ├── config/
│   │   └── database.php    # Configuración de BD
│   ├── models/
│   │   ├── User.php        # Modelo de usuario
│   │   └── Book.php        # Modelo de libro
│   ├── api/
│   │   ├── auth.php        # API de autenticación
│   │   ├── dashboard.php   # API del dashboard
│   │   ├── library.php     # API de biblioteca
│   │   ├── schedule.php    # API de horarios
│   │   ├── payments.php    # API de pagos
│   │   ├── admin.php       # API de administración
│   │   ├── courses.php     # API de cursos
│   │   ├── attendance.php  # API de asistencias
│   │   ├── rooms.php       # API de salas de conversación
│   │   ├── enrollment.php  # API de inscripciones
│   │   ├── teachers.php    # API de profesores
│   │   └── certifications.php # API de certificaciones
│   ├── middleware/
│   │   └── auth_middleware.php # Middleware de auth
│   ├── scripts/
│   │   └── populate_library.php # Población de datos
│   ├── setup.php           # Configuración inicial
│   ├── composer.json       # Dependencias PHP
│   └── .htaccess           # Configuración Apache
└── README.md               # Esta documentación
```

## 🚀 Instalación y Configuración

### Requisitos del Sistema
- **Servidor web:** Apache 2.4+ o Nginx 1.18+
- **PHP:** 7.4 o superior
- **MySQL:** 8.0 o superior
- **Composer:** Para dependencias PHP
- **SSL:** Certificado para HTTPS

### 1. Configuración del Servidor Web

#### Apache (.htaccess incluido)
```apache
<VirtualHost *:80>
    ServerName idiomasavanza.mx
    DocumentRoot /var/www/html/escuela-idiomas
    
    <Directory /var/www/html/escuela-idiomas>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Redirección a HTTPS
    Redirect permanent / https://idiomasavanza.mx/
</VirtualHost>

<VirtualHost *:443>
    ServerName idiomasavanza.mx
    DocumentRoot /var/www/html/escuela-idiomas
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    <Directory /var/www/html/escuela-idiomas>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name idiomasavanza.mx;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name idiomasavanza.mx;
    root /var/www/html/escuela-idiomas;
    index index.html;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
    
    location /backend/ {
        try_files $uri $uri/ /backend/index.php?$query_string;
    }
}
```

### 2. Configuración de Base de Datos

```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE idiomasavanza_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'idiomasavanza_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON idiomasavanza_db.* TO 'idiomasavanza_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Configuración de PHP

Editar `/backend/config/database.php`:
```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "idiomasavanza_db";
    private $username = "idiomasavanza_user";
    private $password = "secure_password";
    private $conn;
    
    // ... resto del código
}
?>
```

### 4. Instalación de Dependencias

```bash
cd /var/www/html/escuela-idiomas/backend
composer install
```

### 5. Configuración Inicial

```bash
# Ejecutar script de configuración
php setup.php

# Poblar biblioteca con 1000 libros
php scripts/populate_library.php
```

### 6. Configuración de Pagos

#### Stripe
1. Crear cuenta en [Stripe](https://stripe.com)
2. Obtener claves API (Publishable Key y Secret Key)
3. Configurar en `payment.js`:
```javascript
const stripe = Stripe('pk_live_your_publishable_key');
```
4. Configurar webhook endpoint: `https://idiomasavanza.mx/backend/api/payments/webhook-stripe`

#### Clip
1. Crear cuenta en [Clip](https://clip.mx)
2. Obtener credenciales API
3. Configurar en `backend/api/payments.php`
4. Configurar webhook endpoint: `https://idiomasavanza.mx/backend/api/payments/webhook-clip`

## 🔐 Configuración de Seguridad

### Variables de Entorno
Crear archivo `.env` en `/backend/`:
```env
DB_HOST=localhost
DB_NAME=idiomasavanza_db
DB_USER=idiomasavanza_user
DB_PASS=secure_password
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
CLIP_API_KEY=your_clip_api_key
ENVIRONMENT=production
```

### Permisos de Archivos
```bash
# Permisos del proyecto
chown -R www-data:www-data /var/www/html/escuela-idiomas
chmod -R 755 /var/www/html/escuela-idiomas
chmod -R 644 /var/www/html/escuela-idiomas/backend/config/
chmod 600 /var/www/html/escuela-idiomas/backend/.env
```

### Configuración SSL
```bash
# Instalar Certbot para Let's Encrypt
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d idiomasavanza.mx
```

## 👤 Usuarios de Prueba

### Administrador
- **Usuario:** admin
- **Contraseña:** password
- **Acceso:** Panel completo de administración

### Alumno Demo
- **Usuario:** demo
- **Contraseña:** demo123
- **Acceso:** Portal de alumnos con datos de ejemplo

### Profesor Demo
- **Usuario:** profesor
- **Contraseña:** profesor123
- **Acceso:** Portal de profesores (en desarrollo)

## 📊 Monitoreo y Mantenimiento

### Logs del Sistema
```bash
# Logs de Apache
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log

# Logs de PHP
tail -f /var/log/php7.4-fpm.log

# Logs de MySQL
tail -f /var/log/mysql/error.log
```

### Backup de Base de Datos
```bash
# Backup diario
mysqldump -u idiomasavanza_user -p idiomasavanza_db > backup_$(date +%Y%m%d).sql

# Restauración
mysql -u idiomasavanza_user -p idiomasavanza_db < backup_20250803.sql
```

### Actualizaciones
```bash
# Actualizar dependencias PHP
composer update

# Actualizar base de datos
php backend/scripts/migrate.php
```

## 🔧 Solución de Problemas

### Error de Conexión a Base de Datos
1. Verificar credenciales en `database.php`
2. Comprobar que MySQL esté ejecutándose
3. Verificar permisos del usuario de BD

### Error 500 en APIs
1. Revisar logs de PHP
2. Verificar permisos de archivos
3. Comprobar configuración de .htaccess

### Problemas de Pagos
1. Verificar claves API de Stripe/Clip
2. Comprobar configuración de webhooks
3. Revisar logs de transacciones

## 📈 Escalabilidad

### Para Alto Tráfico
1. **CDN:** Cloudflare para archivos estáticos
2. **Cache:** Redis para sesiones y datos
3. **Load Balancer:** Nginx para múltiples servidores
4. **Base de datos:** MySQL Master-Slave replication

### Mejoras Futuras
1. **API Gateway:** Para microservicios
2. **Containerización:** Docker para despliegue
3. **CI/CD:** Pipeline automatizado
4. **Monitoring:** Prometheus + Grafana

## 📞 Soporte

### Contacto Técnico
- **Email:** soporte@idiomasavanza.mx
- **Teléfono:** +52 55 1234 5678
- **Horario:** Lunes a Viernes, 9:00 - 18:00 CST

### Documentación Adicional
- **API Documentation:** `/backend/docs/api.md`
- **Database Schema:** `/backend/docs/schema.sql`
- **Deployment Guide:** `/docs/deployment.md`

---

## 📄 Licencia

Copyright © 2025 Idiomas Avanza. Todos los derechos reservados.

**Versión:** 1.0.0  
**Fecha:** Agosto 2025  
**Estado:** Producción Ready

# Avanza
# Avanza
