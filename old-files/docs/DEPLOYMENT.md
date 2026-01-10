# Guía de Despliegue - Idiomas Avanza

## 🚀 Despliegue Rápido (15 minutos)

### Opción 1: Servidor VPS/Dedicado

#### 1. Preparación del Servidor
```bash
# Ubuntu 20.04/22.04
sudo apt update && sudo apt upgrade -y
sudo apt install apache2 mysql-server php7.4 php7.4-mysql php7.4-curl php7.4-json php7.4-mbstring composer -y

# Habilitar módulos Apache
sudo a2enmod rewrite ssl
sudo systemctl restart apache2
```

#### 2. Configuración MySQL
```bash
sudo mysql_secure_installation
sudo mysql -u root -p

# En MySQL:
CREATE DATABASE idiomasavanza_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'idiomasavanza_user'@'localhost' IDENTIFIED BY 'TuPasswordSegura123!';
GRANT ALL PRIVILEGES ON idiomasavanza_db.* TO 'idiomasavanza_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Subir Archivos
```bash
# Copiar archivos al servidor
sudo mkdir -p /var/www/html/idiomasavanza
sudo chown -R $USER:$USER /var/www/html/idiomasavanza

# Subir todos los archivos del proyecto
scp -r escuela-idiomas/* usuario@servidor:/var/www/html/idiomasavanza/
```

#### 4. Configurar Base de Datos
```bash
cd /var/www/html/idiomasavanza/backend
sudo nano config/database.php

# Editar credenciales:
private $host = "localhost";
private $db_name = "idiomasavanza_db";
private $username = "idiomasavanza_user";
private $password = "TuPasswordSegura123!";
```

#### 5. Instalar Dependencias
```bash
cd /var/www/html/idiomasavanza/backend
composer install --no-dev --optimize-autoloader
```

#### 6. Configurar Apache
```bash
sudo nano /etc/apache2/sites-available/idiomasavanza.conf

# Contenido:
<VirtualHost *:80>
    ServerName tu-dominio.com
    DocumentRoot /var/www/html/idiomasavanza
    
    <Directory /var/www/html/idiomasavanza>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/idiomasavanza_error.log
    CustomLog ${APACHE_LOG_DIR}/idiomasavanza_access.log combined
</VirtualHost>

# Habilitar sitio
sudo a2ensite idiomasavanza.conf
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

#### 7. Configurar SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache -d tu-dominio.com
```

#### 8. Inicializar Sistema
```bash
cd /var/www/html/idiomasavanza/backend
php setup.php
php scripts/populate_library.php
```

#### 9. Configurar Permisos
```bash
sudo chown -R www-data:www-data /var/www/html/idiomasavanza
sudo chmod -R 755 /var/www/html/idiomasavanza
sudo chmod -R 644 /var/www/html/idiomasavanza/backend/config/
```

### Opción 2: Hosting Compartido (cPanel)

#### 1. Subir Archivos
1. Comprimir el proyecto: `zip -r idiomasavanza.zip escuela-idiomas/`
2. Subir via File Manager de cPanel
3. Extraer en `public_html/`

#### 2. Crear Base de Datos
1. Ir a "MySQL Databases" en cPanel
2. Crear base de datos: `cpanel_idiomasavanza`
3. Crear usuario con todos los privilegios
4. Anotar credenciales

#### 3. Configurar Base de Datos
```php
// En backend/config/database.php
private $host = "localhost";
private $db_name = "cpanel_idiomasavanza";
private $username = "cpanel_usuario";
private $password = "password_generado";
```

#### 4. Ejecutar Setup
1. Ir a `tu-dominio.com/backend/setup.php`
2. Ir a `tu-dominio.com/backend/scripts/populate_library.php`

### Opción 3: Servicios Cloud

#### AWS EC2
```bash
# Instancia t3.micro (Free Tier)
# AMI: Ubuntu Server 20.04 LTS
# Security Group: HTTP (80), HTTPS (443), SSH (22)

# Conectar via SSH
ssh -i tu-key.pem ubuntu@ip-publica

# Seguir pasos de "Servidor VPS/Dedicado"
```

#### Google Cloud Platform
```bash
# Compute Engine VM
# Machine type: e2-micro (Free Tier)
# OS: Ubuntu 20.04 LTS

gcloud compute ssh tu-instancia --zone=us-central1-a
# Seguir pasos de "Servidor VPS/Dedicado"
```

#### DigitalOcean
```bash
# Droplet $5/mes
# Ubuntu 20.04 LTS
# Seguir pasos de "Servidor VPS/Dedicado"
```

## 🔧 Configuración de Pagos

### Stripe (Producción)
1. Crear cuenta en [Stripe Dashboard](https://dashboard.stripe.com)
2. Activar cuenta para pagos en vivo
3. Obtener claves API:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

```javascript
// En payment.js (línea 2)
const stripe = Stripe('pk_live_tu_clave_publica');
```

```php
// En backend/api/payments.php (línea 15)
$stripe_secret = 'sk_live_tu_clave_secreta';
```

4. Configurar webhook:
   - URL: `https://tu-dominio.com/backend/api/payments/webhook-stripe`
   - Eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Clip (México)
1. Crear cuenta en [Clip Business](https://clip.mx/business)
2. Solicitar API access
3. Obtener credenciales:
   - API Key
   - Secret Key

```php
// En backend/api/payments.php (línea 20)
$clip_api_key = 'tu_clip_api_key';
$clip_secret = 'tu_clip_secret';
```

4. Configurar webhook:
   - URL: `https://tu-dominio.com/backend/api/payments/webhook-clip`

## 📧 Configuración de Email

### SMTP (Recomendado)
```php
// En backend/config/email.php
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_user = 'noreply@tu-dominio.com';
$smtp_pass = 'tu_password_app';
```

### SendGrid
```php
$sendgrid_api_key = 'SG.tu_api_key';
```

## 🔒 Configuración de Seguridad

### Variables de Entorno
```bash
# Crear archivo .env en /backend/
nano /var/www/html/idiomasavanza/backend/.env

# Contenido:
DB_HOST=localhost
DB_NAME=idiomasavanza_db
DB_USER=idiomasavanza_user
DB_PASS=TuPasswordSegura123!
JWT_SECRET=tu_jwt_secret_muy_largo_y_seguro
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta
CLIP_API_KEY=tu_clip_api_key
ENVIRONMENT=production
ADMIN_EMAIL=admin@tu-dominio.com
```

### Firewall
```bash
# UFW (Ubuntu)
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3306/tcp  # MySQL solo local
```

### Fail2Ban
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 📊 Monitoreo

### Logs
```bash
# Crear directorio de logs
sudo mkdir -p /var/log/idiomasavanza
sudo chown www-data:www-data /var/log/idiomasavanza

# Configurar logrotate
sudo nano /etc/logrotate.d/idiomasavanza

# Contenido:
/var/log/idiomasavanza/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### Backup Automático
```bash
# Crear script de backup
sudo nano /usr/local/bin/backup-idiomasavanza.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/idiomasavanza"
mkdir -p $BACKUP_DIR

# Backup base de datos
mysqldump -u idiomasavanza_user -p'TuPasswordSegura123!' idiomasavanza_db > $BACKUP_DIR/db_$DATE.sql

# Backup archivos
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/html/idiomasavanza

# Limpiar backups antiguos (30 días)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

# Hacer ejecutable
sudo chmod +x /usr/local/bin/backup-idiomasavanza.sh

# Programar en crontab
sudo crontab -e
# Agregar: 0 2 * * * /usr/local/bin/backup-idiomasavanza.sh
```

## 🚀 Optimización de Rendimiento

### Apache
```apache
# En /etc/apache2/apache2.conf
LoadModule deflate_module modules/mod_deflate.so
LoadModule expires_module modules/mod_expires.so

<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### MySQL
```sql
-- En /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
innodb_buffer_pool_size = 256M
query_cache_type = 1
query_cache_size = 64M
max_connections = 100
```

### PHP
```ini
; En /etc/php/7.4/apache2/php.ini
memory_limit = 256M
max_execution_time = 60
upload_max_filesize = 50M
post_max_size = 50M
opcache.enable = 1
opcache.memory_consumption = 128
```

## ✅ Checklist de Despliegue

### Pre-Despliegue
- [ ] Servidor configurado (Apache/Nginx + PHP + MySQL)
- [ ] Dominio apuntando al servidor
- [ ] Certificado SSL instalado
- [ ] Base de datos creada con usuario
- [ ] Credenciales de pago configuradas (Stripe/Clip)

### Despliegue
- [ ] Archivos subidos al servidor
- [ ] Dependencias PHP instaladas
- [ ] Base de datos configurada
- [ ] Setup ejecutado correctamente
- [ ] Biblioteca poblada con 1000 libros
- [ ] Permisos de archivos configurados

### Post-Despliegue
- [ ] Sitio accesible via HTTPS
- [ ] Login de administrador funcional
- [ ] Portal de alumnos operativo
- [ ] Sistema de pagos probado
- [ ] Emails de notificación funcionando
- [ ] Backup automático configurado
- [ ] Monitoreo activo

### Testing Final
- [ ] Registro de nuevo usuario
- [ ] Login/logout funcional
- [ ] Navegación entre secciones
- [ ] Biblioteca digital accesible
- [ ] Proceso de pago completo
- [ ] Panel de administración operativo
- [ ] Responsive design en móviles

## 🆘 Solución de Problemas

### Error 500 - Internal Server Error
```bash
# Revisar logs
sudo tail -f /var/log/apache2/error.log
sudo tail -f /var/log/php7.4-fpm.log

# Verificar permisos
sudo chown -R www-data:www-data /var/www/html/idiomasavanza
sudo chmod -R 755 /var/www/html/idiomasavanza
```

### Error de Conexión a Base de Datos
```bash
# Verificar MySQL
sudo systemctl status mysql
sudo mysql -u idiomasavanza_user -p

# Verificar configuración
nano /var/www/html/idiomasavanza/backend/config/database.php
```

### Problemas con SSL
```bash
# Renovar certificado
sudo certbot renew --dry-run
sudo certbot renew

# Verificar configuración
sudo apache2ctl configtest
```

### Pagos no Funcionan
1. Verificar claves API en modo producción
2. Comprobar webhooks configurados
3. Revisar logs de transacciones
4. Verificar SSL del dominio

## 📞 Soporte Post-Despliegue

### Contacto
- **Email:** soporte@idiomasavanza.mx
- **Documentación:** [GitHub Repository]
- **Horario:** Lunes a Viernes, 9:00 - 18:00 CST

### Mantenimiento Recomendado
- **Diario:** Revisar logs de errores
- **Semanal:** Verificar backups
- **Mensual:** Actualizar dependencias
- **Trimestral:** Auditoría de seguridad

---

**¡Despliegue completado exitosamente!** 🎉

Tu escuela digital Idiomas Avanza está lista para recibir estudiantes.

