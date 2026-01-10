# 🎯 QWEN.md - escuela-idiomas (Idiomas Avanza)

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Nombre del Proyecto** | escuela-idiomas (Idiomas Avanza) |
| **Versión** | 2.0.0 |
| **Estado** | ✅ PRODUCCIÓN |
| **Tipo** | Plataforma Educativa Web |
| **Categoría** | E-Learning - Idiomas |
| **Fecha de Análisis** | 2026-01-09 |

---

## 🎯 Propósito del Proyecto

Plataforma educativa digital para enseñanza de idiomas con 6 idiomas disponibles, niveles CEFR, certificaciones oficiales, biblioteca digital, sistema de pagos y portal de estudiantes personalizado.

**Misión:** Democratizar el aprendizaje de idiomas con tecnología y metodología moderna.

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

**Frontend:**
- React 18
- Vite 5 (Build tool)
- TypeScript (opcional)
- Tailwind CSS
- React Router

**Backend:**
- PHP 8+
- MySQL Database
- Prisma ORM
- REST API

**Pagos:**
- Stripe Integration
- Clip (México)
- PayPal (futuro)

**Deployment:**
- Cloudflare Pages (Frontend)
- VPS/Shared Hosting (Backend PHP)
- CDN (Cloudflare)

---

## ✨ Características Principales

### 1. 6 Idiomas Disponibles
1. **Inglés** - Más popular
2. **Francés** - Cultura y negocios
3. **Italiano** - Arte y gastronomía
4. **Alemán** - Ingeniería y ciencia
5. **Portugués** - Negocios latinoamericanos
6. **Chino Mandarín** - Comercio internacional

### 2. Niveles CEFR (A1-C2)
- **A1-A2:** Básico
- **B1-B2:** Intermedio
- **C1-C2:** Avanzado

Cada nivel con:
- Objetivos claros
- Material didáctico
- Evaluaciones
- Certificación

### 3. Certificaciones Oficiales
- Certificado por nivel completado
- Reconocimiento internacional
- Descargable en PDF
- Verificación online

### 4. Biblioteca Digital
- Libros electrónicos
- Audio libros
- Videos educativos
- Ejercicios interactivos
- Material descargable

### 5. Sistema de Pagos
- **Stripe:** Tarjetas internacionales
- **Clip:** Pagos México
- Planes mensuales/anuales
- Descuentos por paquetes
- Facturación automática

### 6. Portal de Estudiantes
- Dashboard personalizado
- Progreso por idioma
- Calendario de clases
- Tareas y evaluaciones
- Certificados

### 7. Dashboard Personalizado
- Estadísticas de aprendizaje
- Tiempo de estudio
- Logros y badges
- Ranking (opcional)
- Recomendaciones personalizadas

---

## 📂 Estructura del Proyecto

```
escuela-idiomas/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── CourseCard.tsx
│   │   └── Dashboard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Courses.tsx
│   │   ├── Student.tsx
│   │   └── Checkout.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── payments.ts
│   ├── utils/
│   └── App.tsx
├── backend/
│   ├── api/
│   │   ├── auth.php
│   │   ├── courses.php
│   │   ├── students.php
│   │   └── payments.php
│   ├── models/
│   ├── config/
│   └── database/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── assets/
│   └── courses/
├── vite.config.ts
└── package.json
```

---

## 🚀 Deployment

### Frontend (Cloudflare Pages)
```bash
# Build
npm run build

# Deploy
# Conectar repositorio a Cloudflare Pages
# Build command: npm run build
# Output directory: dist
```

**URL:** https://idiomas-avanza.pages.dev

### Backend (VPS/Shared Hosting)
```bash
# Upload PHP files
# Configure database
# Set permissions
# Configure .htaccess
```

---

## 🔧 Configuración Requerida

### Variables de Entorno (Frontend)

```bash
# API
VITE_API_URL="https://api.idiomas-avanza.com"

# Stripe
VITE_STRIPE_PUBLIC_KEY="pk_live_..."

# Clip (México)
VITE_CLIP_API_KEY="..."

# Site
VITE_SITE_URL="https://idiomas-avanza.pages.dev"
```

### Variables de Entorno (Backend PHP)

```php
// config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'idiomas_db');
define('DB_USER', 'idiomas_user');
define('DB_PASS', 'secure_password');

define('STRIPE_SECRET_KEY', 'sk_live_...');
define('CLIP_SECRET_KEY', '...');

define('JWT_SECRET', 'tu_secret_aqui');
```

---

## 📊 Métricas del Proyecto

### Performance
- **Lighthouse Score:** 90+
- **First Load:** <2s
- **Time to Interactive:** <3s
- **Bundle Size:** <500KB

### Contenido
- **Idiomas:** 6
- **Niveles:** 6 por idioma (A1-C2)
- **Cursos Totales:** 36+
- **Material Didáctico:** 500+ recursos

### Usuarios (Ejemplo)
- **Estudiantes Activos:** (tracking)
- **Certificados Emitidos:** (tracking)
- **Tasa de Completación:** (tracking)

---

## 🎮 Funcionalidades por Rol

### Estudiante
- Explorar cursos
- Inscribirse a cursos
- Acceder a material
- Realizar evaluaciones
- Ver progreso
- Descargar certificados
- Gestionar pagos

### Profesor (Futuro)
- Crear contenido
- Calificar evaluaciones
- Comunicarse con estudiantes
- Ver estadísticas de clase

### Administrador
- Gestionar cursos
- Gestionar estudiantes
- Ver reportes financieros
- Configurar plataforma
- Emitir certificados

---

## 📚 Documentación Disponible

### Técnica
- README.md completo
- API documentation
- Database schema
- Deployment guide

### Usuario
- Manual de estudiante
- Guía de cursos
- FAQ
- Políticas de privacidad

---

## 🔗 Enlaces y Recursos

- **Producción:** https://idiomas-avanza.pages.dev
- **Backend API:** (URL del backend)
- **Cloudflare Pages:** (Dashboard)
- **Repositorio:** (Local)

---

## ⚠️ Notas Importantes

### Dependencias Críticas
- React 18+ requerido
- PHP 8+ en servidor
- MySQL database
- Stripe account
- Clip account (México)

### Limitaciones
- Stripe fees (2.9% + $0.30)
- Clip fees (según plan)
- PHP hosting requirements
- Database storage (según plan)

### Seguridad
- JWT tokens para auth
- Passwords hasheados
- HTTPS obligatorio
- PCI compliance (Stripe)
- GDPR compliance

### Mantenimiento
- Actualizar contenido de cursos
- Revisar pagos y subscripciones
- Backup de base de datos
- Monitorear performance

---

## 🎯 Estado del Proyecto

| Aspecto | Estado | Notas |
|---------|--------|-------|
| **Desarrollo** | ✅ Completo | v2.0.0 estable |
| **Testing** | ⚠️ Básico | Requiere más tests |
| **Documentación** | ✅ Completa | README detallado |
| **Producción** | ✅ Ready | Desplegado |
| **Mantenimiento** | 🟢 Activo | Actualizaciones de contenido |

---

## 🔄 Relación con Otros Proyectos

**Proyectos Relacionados:** Ninguno (único en el portfolio)

**Tecnologías Compartidas:**
- React (con SAAS-DND, DragNDrop)
- Vite (con DragNDrop, vanilla-editor)
- Tailwind CSS (con DefiendeteMX, SAAS-DND)
- Cloudflare Pages (con DefiendeteMX, DragNDrop)
- MySQL (con edifnuev)
- Stripe (único)

**Diferenciadores:**
- Único proyecto educativo
- Único con sistema de pagos Stripe + Clip
- Único con certificaciones
- Único con 6 idiomas
- Único con niveles CEFR

---

## 📈 Próximos Pasos / Roadmap

- [ ] Clases en vivo (Zoom/Meet integration)
- [ ] App móvil nativa (iOS/Android)
- [ ] Gamificación completa
- [ ] Sistema de tutorías 1-on-1
- [ ] Más idiomas (Japonés, Coreano, Árabe)
- [ ] Reconocimiento de voz (pronunciación)
- [ ] Chatbot con IA para práctica
- [ ] Comunidad de estudiantes
- [ ] Intercambio de idiomas
- [ ] Marketplace de profesores
- [ ] Integración con universidades
- [ ] Certificaciones oficiales (TOEFL, DELE, etc.)

---

**Última Actualización:** 2026-01-09  
**Analizado por:** Blackbox AI  
**Versión QWEN:** 1.0
