<p align="center">
  <img src="src/assets/PNG/banneravanza.png" max-width="300">
</p>

# Idiomas Avanza - Escuela Digital de Idiomas

Una plataforma moderna para aprendizaje de idiomas con React, diseñada para ofrecer cursos online, certificaciones oficiales y una experiencia de aprendizaje completa.

## 🌐 Live Demo

**Production:** https://idiomas-avanza.pages.dev

Deployed on Cloudflare Pages with automatic HTTPS and global CDN.

## 🌟 Características Principales

### 🎓 Sistema Educativo
- **6 idiomas:** Inglés, Francés, Italiano, Alemán, Portugués, Chino Mandarín
- **Niveles CEFR:** A1, A2, B1, B2, C1, C2
- **Certificaciones oficiales:** TOEFL, DELF, CILS, Goethe-Zertifikat, CELPE-Bras, HSK
- **Modalidades:** Grupos conversacionales, clases individuales, cursos intensivos

### 📚 Biblioteca Digital
- Acceso a recursos educativos
- Múltiples formatos (PDF, EPUB, Audio)
- Organización por nivel y categoría
- Sistema de búsqueda y filtrado

### 💳 Sistema de Pagos
- **Stripe:** Pagos internacionales
- **Clip:** Mercado mexicano
- **3 paquetes:** Básico ($49/mes), Premium ($89/mes), Intensivo ($149/mes)

### 👥 Portal de Estudiantes
- Dashboard personalizado
- Seguimiento de progreso
- Acceso a clases y materiales
- Gestión de horarios

## 🏗️ Arquitectura

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router 6
- **Icons:** Lucide React
- **Styling:** Tailwind CSS (via index.css)
- **Structure:** Component-based architecture

### Backend
- **API:** PHP REST APIs
- **Database:** MySQL 8.0+ via Prisma ORM
- **Authentication:** JWT tokens
- **Architecture:** MVC pattern

## 📁 Estructura del Proyecto

```
escuela-idiomas/
├── src/
│   ├── components/          # Componentes React reutilizables
│   │   ├── ui/             # Componentes UI base (Button, Card, Modal, etc.)
│   │   ├── Header.jsx      # Navegación principal
│   │   ├── Footer.jsx      # Footer del sitio
│   │   └── AdminHeader.jsx # Header del admin
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── Library.jsx
│   │   ├── Certifications.jsx
│   │   ├── Portal.jsx
│   │   └── Admin.jsx
│   ├── layouts/            # Layouts de la aplicación
│   │   └── RootLayout.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useScroll.js
│   │   └── useMediaQuery.js
│   ├── utils/              # Utilidades y helpers
│   │   ├── api.js          # Cliente API
│   │   ├── formatters.js   # Formateo de datos
│   │   └── validators.js   # Validación de formularios
│   ├── constants/          # Constantes de la aplicación
│   │   ├── navigation.js   # Rutas y menús
│   │   └── courses.js      # Datos de cursos
│   ├── config/             # Configuración
│   │   └── env.js          # Variables de entorno
│   ├── assets/             # Recursos estáticos
│   │   ├── images/
│   │   ├── icons/
│   │   └── PNG/
│   ├── App.jsx             # Componente raíz
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globales
├── backend/
│   ├── api/                # Endpoints REST
│   ├── config/             # Configuración backend
│   ├── models/             # Modelos de datos
│   ├── middleware/         # Middleware (auth, cors, etc.)
│   └── scripts/            # Scripts de utilidad
├── prisma/
│   ├── schema.prisma       # Schema de base de datos
│   └── seed.js             # Datos iniciales
├── public/                 # Assets públicos
├── index.html              # HTML base
├── vite.config.js          # Configuración de Vite
├── package.json            # Dependencies
└── README.md               # Este archivo
```

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- **Node.js:** 18+ (se recomienda usar nvm)
- **npm:** 9+
- **MySQL:** 8.0+
- **PHP:** 7.4+ (para el backend)
- **Composer:** Para dependencias PHP

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/escuela-idiomas.git
cd escuela-idiomas
```

### 2. Instalar Dependencias
```bash
# Frontend
npm install

# Backend
cd backend && composer install && cd ..
```

### 3. Configurar Variables de Entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 4. Configurar Base de Datos
```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE idiomasavanza_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Ejecutar migraciones con Prisma
npm run prisma:migrate

# Seed data (opcional)
npm run prisma:seed
```

### 5. Iniciar Desarrollo
```bash
# Frontend (puerto 3000)
npm run dev

# Prisma Studio (opcional, puerto 5555)
npm run prisma:studio

# Webhook server (opcional, puerto 3001)
npm run webhooks:start
```

## 📜 Scripts Disponibles

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
```

### Prisma/Database
```bash
npm run prisma:generate  # Generar Prisma Client
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio
npm run prisma:seed      # Seed de datos
npm run prisma:format    # Formatear schema
npm run prisma:reset     # Reset completo
```

### Deployment
```bash
./deploy-to-apache.sh    # Deploy a Apache
./update-frontend.sh     # Actualizar frontend
./start-frontend.sh      # Iniciar servidor local
```

## 🔐 Configuración de Seguridad

### Variables de Entorno (.env)
```env
# Frontend
VITE_API_URL=http://localhost/backend/api
VITE_WEBHOOK_URL=http://localhost:3001

# Database
DATABASE_URL="mysql://user:password@localhost:3306/idiomasavanza_db"

# Payment Services
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
CLIP_API_KEY="clip_test_..."

# JWT
JWT_SECRET="your_jwt_secret_here"
```

### Usuarios de Prueba
```
Administrador:
  - Usuario: admin
  - Contraseña: password

Estudiante Demo:
  - Usuario: demo
  - Contraseña: demo123
```

## 🎨 Componentes UI Reutilizables

```jsx
import { Button, Card, Input, Modal, Loading } from './components/ui'

// Button
<Button variant="primary" size="lg" to="/cursos">
  Ver Cursos
</Button>

// Card
<Card hover padding="p-8">
  <h3>Título</h3>
  <p>Contenido</p>
</Card>

// Input
<Input 
  label="Email" 
  type="email" 
  error={errors.email}
/>

// Modal
<Modal isOpen={isOpen} onClose={handleClose} title="Título">
  <p>Contenido del modal</p>
</Modal>

// Loading
<Loading size="lg" text="Cargando..." />
```

## 🔗 API Endpoints

### Autenticación
- `POST /backend/api/auth.php` - Login
- `POST /backend/api/auth.php?action=register` - Registro

### Cursos
- `GET /backend/api/courses.php` - Listar cursos
- `GET /backend/api/courses.php?id={id}` - Detalle de curso

### Biblioteca
- `GET /backend/api/library.php` - Listar libros
- `GET /backend/api/library.php?user_id={id}` - Libros del usuario

### Pagos
- `POST /backend/api/payments.php` - Crear pago
- `POST /backend/api/payments/webhook-stripe` - Webhook Stripe
- `POST /backend/api/payments/webhook-clip` - Webhook Clip

## 📊 Deployment

### Production (Apache)
```bash
# Build frontend
npm run build

# Deploy a Apache
./deploy-to-apache.sh

# Configurar Apache virtual host
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Production (Cloudflare Pages)
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
VITE_API_URL=https://tu-api.com/backend/api
```

## 🧪 Testing

```bash
# Lint
npm run lint

# Type checking (si usas TypeScript)
npm run type-check

# Tests unitarios (cuando se implementen)
npm test
```

## 📈 Roadmap

### Fase 1 - Completado ✅
- [x] Migración a React
- [x] Estructura modular de componentes
- [x] Sistema de routing
- [x] Hooks personalizados
- [x] Utilidades y helpers

### Fase 2 - En Progreso 🚧
- [ ] Sistema de autenticación completo
- [ ] Integración API backend
- [ ] Dashboard de estudiante funcional
- [ ] Sistema de pagos completo

### Fase 3 - Planeado 📋
- [ ] Tests unitarios y e2e
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Notificaciones push
- [ ] Chat en vivo

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

- **Email:** soporte@idiomasavanza.mx
- **Website:** https://idiomas-avanza.pages.dev
- **Documentación:** Ver `/old-files/docs/`

## 📄 Licencia

Copyright © 2025 Idiomas Avanza. Todos los derechos reservados.

---

<div align="center">
  <p>🔥 Desarrollado por Sebastian Vernis | Soluciones Digitales</p>
  <a href="https://sebastianvernis.com">Sebastian Vernis 🧑🏻‍💻</a> •
  <a href="https://chispart.mx">Chispart 🎨</a>
</div>

<p align="center">
  <img src="src/assets/PNG/LOGO2.png" width="200">
</p>
