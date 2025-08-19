<p align="center">
  <img src="assets/PNG/banneravanza.png"  max-width="300">
</p>

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

## ✅ Checklist de Pendientes

- [ ] Contenido: Completar copys y detalles en `cursos.html`, `certificaciones.html` y `biblioteca.html` (niveles, horarios, FAQs, políticas).
  - Responsable: Equipo Contenido/UX  
  - Fecha estimada: 2025-08-26
- [ ] Navegación: Marcar enlace activo en header de páginas internas (resaltado visual consistente).
  - Responsable: Frontend  
  - Fecha estimada: 2025-08-22
- [ ] Landing: Unificar experiencia de acceso (decidir entre modal de login o enlace directo al `portal.html` en todos los lugares; actualmente el header va a `portal.html` y el botón “Acceso Estudiantes” usa modal).
  - Responsable: Frontend + Producto  
  - Fecha estimada: 2025-08-21
- [ ] Pagos: Conectar botones de inscripción/preparación a flujos reales en `payment.html` (Stripe/Clip) y confirmar redirecciones post-pago.
  - Responsable: Backend/Payments  
  - Fecha estimada: 2025-08-28
- [ ] Biblioteca: Integrar listado dinámico desde backend (`/backend/api/library.php`) con filtros y paginación; reemplazar tarjetas de ejemplo.
  - Responsable: Backend + Frontend  
  - Fecha estimada: 2025-08-30
- [ ] SEO: Agregar metadatos específicos en nuevas páginas (title/description únicos, Open Graph, canonical) y actualizar `sitemap.xml`/`robots.txt`.
  - Responsable: SEO/Marketing  
  - Fecha estimada: 2025-08-24
- [ ] Accesibilidad: Pasar auditoría (contrastes, roles ARIA, focus visible, etiquetas de formularios) y resolver hallazgos.
  - Responsable: Frontend  
  - Fecha estimada: 2025-08-25
- [ ] Performance: Medir con Lighthouse (imágenes, CSS/JS crítico, lazy loading) y aplicar optimizaciones.
  - Responsable: Frontend  
  - Fecha estimada: 2025-08-25
- [ ] QA: Pruebas en navegadores y dispositivos (Chrome, Safari, Firefox; iOS/Android) y revisar navegación de enlaces.
  - Responsable: QA  
  - Fecha estimada: 2025-08-29
- [ ] Seguridad: Implementar autenticación real con JWT en `portal.html` y proteger rutas/recursos.
  - Responsable: Backend  
  - Fecha estimada: 2025-09-02

## 🗂️ Checklist Administrativo

- [ ] Clip: Crear cuenta, completar verificación, firmar contrato, habilitar MXN y métodos; generar API Key y configurar webhook en backend (`/backend/api/payments/webhook-clip`).
  - Responsable: Backend/Payments  
  - Fecha estimada: 2025-08-21
- [ ] Stripe: Crear/activar cuenta en producción, completar KYC, firmar acuerdo, habilitar payouts y MXN, 3DS; configurar claves y webhook (`/backend/api/payments/webhook-stripe`).
  - Responsable: Backend/Payments  
  - Fecha estimada: 2025-08-21
- [ ] Facturación: Definir/ publicar políticas de reembolsos y cancelaciones; alta fiscal (RFC) y emisión de CFDI cuando aplique.
  - Responsable: Administración/Legal  
  - Fecha estimada: 2025-08-28
- [ ] Legal: Revisar y enlazar Políticas de Privacidad y Términos actualizados en el sitio.
  - Responsable: Legal  
  - Fecha estimada: 2025-08-23
- [ ] Dominio y SSL: Verificar DNS, SSL activo y renovación automática. Configurar SPF/DKIM/DMARC para emails transaccionales.
  - Responsable: Infra/DevOps  
  - Fecha estimada: 2025-08-22
- [ ] Libros: Cargar catálogo a la BD (metadatos normalizados), subir archivos a almacenamiento (S3/Backblaze) y guardar URLs seguras.
  - Responsable: Contenido + Backend  
  - Fecha estimada: 2025-08-30
- [ ] Derechos de autor: Validar licencias y permisos de distribución de materiales de la biblioteca.
  - Responsable: Legal/Contenido  
  - Fecha estimada: 2025-08-27
- [ ] Bancario: Registrar cuenta para depósitos/payouts en Stripe/Clip y validar depósitos de prueba.
  - Responsable: Administración  
  - Fecha estimada: 2025-08-24
- [ ] Seguridad de datos: Política de retención y borrado, respaldos, y control de accesos (principio de mínimo privilegio).
  - Responsable: Seguridad/Backend  
  - Fecha estimada: 2025-08-29

---

## 🧩 Integración con Prisma (MySQL)

Esta sección permite gestionar la base de datos de forma dinámica y visual usando Prisma Studio.

1) Instalar dependencias (Node 18+):
```bash
npm install --save-dev prisma
npm install @prisma/client
npx prisma init --datasource-provider mysql # (ya incluido en el repo; opcional)
```

2) Configurar variables de entorno:
```env
# .env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/idiomasavanza_db?schema=public"
```

3) Migraciones y cliente:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4) Prisma Studio (UI visual de datos):
```bash
npx prisma studio
```

5) Seed inicial (opcional):
```bash
npm run prisma:seed
```

6) Reset de base (migración desde 0):
```bash
npm run prisma:reset
npm run prisma:migrate
npm run prisma:seed
```

7) Notas:
- Si ya existe una BD con tablas, usar `prisma db pull` para introspección y alinear el `schema.prisma`.
- Revisar el archivo `prisma/schema.prisma` incluido para los modelos base (usuarios, libros, cursos, pagos, etc.).
  - Incluye modelo de `Paquete` (Básico, Premium, Certificación) y relación opcional en `Inscripcion`.
  - Relaciones M:N: `Paquete`–`Curso` (cobertura por plan) y `Paquete`–`Libro` (catálogos por plan).
  - Categorías normalizadas: modelo `Categoria` relacionado M:N con `Libro`.
  - Índices añadidos en campos de consulta frecuente (fechas, claves foráneas, estados, idioma/nivel, etc.) y `unique` en `Libro.titulo`.
  - Constraint para inscripciones activas: campo redundante `Inscripcion.activa` con `@@unique([usuarioId, cursoId, activa])` para evitar múltiples inscripciones activas del mismo usuario al mismo curso.
    - Nota: actualizar `activa=false` cuando `estado` pase a `FINALIZADA` o `CANCELADA`.

8) Helper para inscripciones (opcional):
```js
// prisma/inscripciones.js
const { crearInscripcionSegura, cerrarInscripcionesActivas } = require('./prisma/inscripciones');

// Crear nueva inscripción asegurando unicidad de activa
await crearInscripcionSegura({
  usuarioId: 1,
  cursoId: 1,
  paqueteId: 1,
  cerrarPrevias: false, // o true para cerrar automáticamente las activas previas
});

// Cerrar inscripciones activas (cuando finaliza o se cancela)
await cerrarInscripcionesActivas(1, 1);
```

9) Helpers de pagos y biblioteca (opcionales):
```js
// prisma/pagos.js
const { crearPago, actualizarEstadoPago, marcarPagoExitosoPorExternalId } = require('./prisma/pagos');

// Crear un pago pendiente (Stripe)
await crearPago({ usuarioId: 1, amountCents: 120000, proveedor: 'STRIPE', externalId: 'pi_123' });

// Actualizar estado por externalId (webhook)
await marcarPagoExitosoPorExternalId('pi_123');

// prisma/biblioteca.js
const { asignarLibrosDePaquete, asignarLibrosDeCurso } = require('./prisma/biblioteca');

// Asignar catálogo del paquete al usuario
await asignarLibrosDePaquete(1, 1); // usuarioId, paqueteId

// Asignar libros de todos los paquetes que cubren un curso
await asignarLibrosDeCurso(1, 1); // usuarioId, cursoId
```

10) Flujo post-pago (opcional):
```js
// prisma/postPago.js
const { procesarPagoExitoso } = require('./prisma/postPago');

// Al confirmar un pago PAID (p.ej., en webhook):
await procesarPagoExitoso({
  usuarioId: 1,
  cursoId: 1,
  paqueteId: 1,
  pagoExternalId: 'pi_123', // o pagoId
  cerrarPrevias: false,
});
```

11) Webhook server (Node opcional, sin dependencias):
```bash
npm run webhooks:start # expone http://localhost:8787
```
Endpoints:
- POST `/webhooks/stripe` (payload mínimo tipo `payment_intent.succeeded` con metadata `{usuarioId, cursoId, paqueteId}`)
- POST `/webhooks/clip` (payload con `data.status=COMPLETED` y metadata `{usuarioId, cursoId, paqueteId}`)

Notas importantes:
- En producción valida la firma del webhook (Stripe-Signature / Clip headers). Este servidor de ejemplo no incluye validación de firmas.
- Asegura que al crear el Payment Intent (Stripe) o el Checkout (Clip) incluyas `metadata` con `usuarioId`, `cursoId` y `paqueteId`.
- Alternativa PHP: puedes mantener `backend/api/payments.php` y consumir estos helpers desde un microservicio Node para la parte de post-proceso con Prisma.

12) Script PHP de ejemplo: Crear PaymentIntent con metadata
```bash
# Requiere: composer install en backend/ y configurar STRIPE_SECRET_KEY en el entorno
php backend/scripts/create_stripe_intent.php '{"user_id":1,"package_id":1,"course_id":3,"amount_mxn":1200}'

# Respuesta:
# {
#   "ok": true,
#   "payment_intent_id": "pi_...",
#   "client_secret": "...",
#   "metadata": {"user_id":"1","package_id":"1","course_id":"3"}
# }
```

<div align= "center">
  <a text= "font-segoeui align-center strong">🔥 Desarrollado por Sebastian Vernis | Soluciones Digitales</a>
</div>
<div align= "center">
  <a href="https://sebastianvernis.com">Sebastian Vernis 🧑🏻‍💻 </a>
</div>
<div align= "center">
  <a href="https://chispart.mx">Chispart 🎨 </a>
</div>
    
<p align="center">
  <img src="assets/PNG/LOGO2.png">
</p>
