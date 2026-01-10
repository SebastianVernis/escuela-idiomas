# 🎨 Reorganización del Proyecto - Idiomas Avanza

## 📅 Fecha: 6 de Diciembre 2025

## ✨ Cambios Realizados

### 1. Limpieza de la Raíz del Proyecto

**Archivos Movidos a `old-files/`:**

#### HTML Legacy → `old-files/html/`
- admin.html, admin.js, admin.css
- biblioteca.html
- certificaciones.html
- cursos.html
- payment.html, payment.js, payment.css
- portal.html, portal.js, portal.css
- privacidad.html
- Terminos.html

#### Scripts Legacy → `old-files/scripts/`
- script.js
- utils.js
- styles.css
- branding.css

#### Configuración Legacy → `old-files/config/`
- apache-react-config.conf
- server.py
- production-server.py
- wrangler.toml

#### Documentación → `old-files/docs/`
- DEPLOYMENT.md
- DEPLOYMENT-APACHE.md
- NUEVO-DISENO-FRONTEND.md
- Plan_de_estudios.md
- Branding.md
- CHANGELOG.md

### 2. Nueva Estructura de `src/`

```
src/
├── components/
│   ├── ui/                      # ✨ NUEVO: Componentes reutilizables
│   │   ├── Button.jsx          # Botón con variantes (primary, secondary, outline, ghost, danger)
│   │   ├── Card.jsx            # Tarjeta con hover y padding configurables
│   │   ├── Input.jsx           # Input con label y manejo de errores
│   │   ├── Modal.jsx           # Modal responsive con backdrop
│   │   ├── Loading.jsx         # Spinner de carga
│   │   └── index.js            # Exports centralizados
│   ├── Header.jsx              # ♻️ REFACTORIZADO: Usa hooks personalizados
│   ├── Footer.jsx
│   └── AdminHeader.jsx
│
├── pages/                       # Páginas de rutas
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── Library.jsx
│   ├── Certifications.jsx
│   ├── Portal.jsx
│   └── Admin.jsx
│
├── layouts/                     # ✨ NUEVO: Layouts de la app
│   └── RootLayout.jsx          # Layout principal con Header + Outlet + Footer
│
├── hooks/                       # ✨ NUEVO: Custom React Hooks
│   ├── useScroll.js            # Hook para detectar scroll
│   ├── useMediaQuery.js        # Hook para media queries
│   └── (exports: useIsMobile, useIsTablet, useIsDesktop)
│
├── utils/                       # ✨ NUEVO: Utilidades
│   ├── api.js                  # Cliente API con manejo de errores
│   ├── formatters.js           # Formateo de moneda, fechas, texto
│   └── validators.js           # Validación de formularios
│
├── constants/                   # ✨ NUEVO: Constantes de la app
│   ├── navigation.js           # NAV_ITEMS, ADMIN_NAV_ITEMS
│   └── courses.js              # LANGUAGES, COURSE_FEATURES, PRICING_TIERS
│
├── config/                      # ✨ NUEVO: Configuración
│   └── env.js                  # Variables de entorno
│
├── assets/                      # ✨ MOVIDO: De raíz a src
│   ├── images/
│   ├── icons/
│   ├── PNG/
│   └── Vectorizados/
│
├── App.jsx                      # ♻️ REFACTORIZADO: Usa RootLayout
├── main.jsx
└── index.css
```

### 3. Componentes UI Nuevos

#### Button Component
```jsx
import { Button } from './components/ui'

<Button variant="primary" size="lg" to="/cursos">
  Ver Cursos
</Button>

// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
// Props: to (Link), href (a), onClick (button)
```

#### Card Component
```jsx
import { Card } from './components/ui'

<Card hover padding="p-8">
  <h3>Título</h3>
  <p>Contenido</p>
</Card>
```

#### Input Component
```jsx
import { Input } from './components/ui'

<Input 
  label="Email" 
  type="email" 
  error={errors.email}
  placeholder="tu@email.com"
/>
```

#### Modal Component
```jsx
import { Modal } from './components/ui'

<Modal 
  isOpen={isOpen} 
  onClose={handleClose} 
  title="Título"
  size="md"
>
  <p>Contenido del modal</p>
</Modal>
```

#### Loading Component
```jsx
import { Loading } from './components/ui'

<Loading size="lg" text="Cargando..." />
```

### 4. Custom Hooks

#### useScroll
```jsx
import { useScroll } from '../hooks/useScroll'

const isScrolled = useScroll(10) // threshold en pixels
```

#### useMediaQuery
```jsx
import { useIsMobile, useIsTablet, useIsDesktop } from '../hooks/useMediaQuery'

const isMobile = useIsMobile()
const isTablet = useIsTablet()
const isDesktop = useIsDesktop()
```

### 5. Utilidades

#### API Client
```jsx
import { api } from '../utils/api'

// GET
const data = await api.get('/courses')

// POST
const result = await api.post('/auth', { email, password })

// PUT
await api.put('/user/1', { name: 'John' })

// DELETE
await api.delete('/user/1')
```

#### Formatters
```jsx
import { formatCurrency, formatDate, formatDateTime, truncateText, slugify } from '../utils/formatters'

formatCurrency(1200, 'MXN') // "$1,200.00 MXN"
formatDate('2025-12-06') // "6 de diciembre de 2025"
formatDateTime('2025-12-06T18:00:00') // "6 de diciembre de 2025, 18:00"
truncateText('Long text...', 50)
slugify('Hola Mundo') // "hola-mundo"
```

#### Validators
```jsx
import { validateEmail, validatePhone, validateForm } from '../utils/validators'

validateEmail('test@example.com') // true
validatePhone('+52 55 1234 5678') // true

const { isValid, errors } = validateForm(data, {
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  password: { required: true, min: 8 }
})
```

### 6. Constantes

#### Navigation
```jsx
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '../constants/navigation'

NAV_ITEMS.map(item => (
  <Link to={item.path}>{item.label}</Link>
))
```

#### Courses
```jsx
import { LANGUAGES, COURSE_FEATURES, PRICING_TIERS } from '../constants/courses'

LANGUAGES.map(lang => (
  <div>{lang.flag} {lang.name}</div>
))
```

### 7. Refactorizaciones

#### Header.jsx
**Antes:**
- Lógica de scroll y responsive inline
- Estado duplicado para mobile
- Items de navegación hardcodeados

**Después:**
- Usa `useScroll()` hook
- Usa `useIsMobile()` hook
- Usa `NAV_ITEMS` de constants
- Código más limpio y mantenible

#### App.jsx
**Antes:**
```jsx
<div className="min-h-screen flex flex-col">
  <Header />
  <main className="flex-1">
    <Routes>
      <Route path="/" element={<Home />} />
      ...
    </Routes>
  </main>
  <Footer />
</div>
```

**Después:**
```jsx
<Routes>
  <Route element={<RootLayout />}>
    <Route path="/" element={<Home />} />
    ...
  </Route>
</Routes>
```

## 📊 Métricas de Mejora

### Antes
```
escuela-idiomas/
├── 15+ archivos HTML en raíz
├── 10+ archivos CSS en raíz
├── 8+ archivos JS en raíz
├── assets/ en raíz
├── src/ (solo 3 subcarpetas)
└── Total: ~35 archivos en raíz
```

### Después
```
escuela-idiomas/
├── 8 archivos config en raíz (package.json, vite.config.js, etc.)
├── old-files/ (legacy code organizado)
├── src/ (10 subcarpetas organizadas)
│   ├── components/ (3 componentes + ui/)
│   ├── pages/ (6 páginas)
│   ├── layouts/ (1 layout)
│   ├── hooks/ (2 hooks)
│   ├── utils/ (3 utilidades)
│   ├── constants/ (2 archivos)
│   ├── config/ (1 archivo)
│   └── assets/ (recursos movidos)
└── Total: ~8 archivos en raíz (77% reducción)
```

### Beneficios del Build
```
Build Time: 1.81s
Bundle Sizes:
  - CSS: 19.87 kB (gzip: 4.96 kB)
  - JS: 269.71 kB (gzip: 76.96 kB)
  - Total: ~290 kB (~82 kB gzipped)
```

## 🎯 Próximos Pasos Recomendados

### Corto Plazo (1-2 semanas)
1. [ ] Migrar páginas para usar nuevos componentes UI
2. [ ] Implementar sistema de autenticación con context
3. [ ] Conectar API real a componentes
4. [ ] Agregar validación de formularios con validators
5. [ ] Implementar manejo de errores global

### Medio Plazo (1 mes)
1. [ ] Tests unitarios para componentes UI
2. [ ] Tests de integración para hooks
3. [ ] Documentación de componentes (Storybook)
4. [ ] Optimización de imágenes en assets
5. [ ] Implementar lazy loading de páginas

### Largo Plazo (2-3 meses)
1. [ ] PWA (Progressive Web App)
2. [ ] Internacionalización (i18n)
3. [ ] Modo offline
4. [ ] Notificaciones push
5. [ ] Analytics y tracking

## 📚 Recursos de Referencia

### Documentación Actualizada
- `README.md` - Guía completa del proyecto
- `CRUSH.md` - Guidelines para desarrollo
- `AGENTS.md` - Guidelines para AI agents
- `REORGANIZATION.md` - Este documento

### Archivos Legacy
- `old-files/html/` - HTML antiguo (referencia)
- `old-files/docs/` - Documentación antigua
- `old-files/scripts/` - Scripts legacy
- `old-files/config/` - Configuraciones antiguas

## 🎓 Convenciones de Código

### Imports
```jsx
// 1. React
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

// 3. Constants
import { NAV_ITEMS } from '../constants/navigation'

// 4. Hooks
import { useScroll } from '../hooks/useScroll'

// 5. Components
import { Button, Card } from '../components/ui'
```

### Component Pattern
```jsx
const ComponentName = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState()
  const customValue = useCustomHook()
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies])
  
  // 3. Handlers
  const handleClick = () => {
    // Handler logic
  }
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

export default ComponentName
```

## 🔄 Migración de Código Legacy

### Si necesitas código del HTML antiguo:
1. Busca en `old-files/html/[nombre].html`
2. Extrae la lógica necesaria
3. Conviértela a componente React
4. Usa los nuevos hooks y utilidades
5. Integra con las constantes

### Ejemplo de Migración:
**Antes (portal.html):**
```html
<script>
  function login() {
    fetch('/backend/api/auth.php', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }
</script>
```

**Después (Portal.jsx):**
```jsx
import { api } from '../utils/api'

const handleLogin = async () => {
  try {
    const data = await api.post('/auth', { email, password })
    // Handle success
  } catch (error) {
    // Handle error
  }
}
```

---

**✅ Reorganización Completada**

El proyecto ahora tiene una estructura moderna, escalable y fácil de mantener. Todos los archivos legacy están preservados en `old-files/` para referencia futura.
