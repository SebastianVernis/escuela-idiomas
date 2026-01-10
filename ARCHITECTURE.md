# Frontend Architecture - Idiomas Avanza

## Nueva Estructura Modular

```
src/
├── app/                      # Configuración y setup de la aplicación
│   ├── App.jsx              # Componente raíz con routing
│   ├── layouts/             # Layouts compartidos
│   │   ├── MainLayout.jsx   # Layout público con Header/Footer
│   │   └── AdminLayout.jsx  # Layout administrativo
│   └── styles/
│       └── index.css        # Estilos globales y variables CSS
│
├── core/                     # Funcionalidad core reutilizable
│   ├── config/              # Configuración de la app
│   │   └── env.js           # Variables de entorno
│   ├── constants/           # Constantes globales
│   │   ├── navigation.js    # Items de navegación
│   │   └── courses.js       # Datos de cursos y precios
│   ├── hooks/               # Custom hooks reutilizables
│   │   ├── useScroll.js     # Hook para detectar scroll
│   │   └── useMediaQuery.js # Hooks para responsive design
│   └── utils/               # Utilidades compartidas
│       ├── api.js           # Cliente HTTP
│       ├── formatters.js    # Formateo de datos
│       └── validators.js    # Validación de formularios
│
├── features/                 # Features organizados por dominio
│   ├── home/
│   │   └── pages/
│   │       └── HomePage.jsx
│   ├── courses/
│   │   └── pages/
│   │       └── CoursesPage.jsx
│   ├── library/
│   │   └── pages/
│   │       └── LibraryPage.jsx
│   ├── certifications/
│   │   └── pages/
│   │       └── CertificationsPage.jsx
│   ├── portal/
│   │   └── pages/
│   │       └── PortalPage.jsx
│   └── admin/
│       ├── components/
│       │   └── AdminHeader.jsx
│       └── pages/
│           └── AdminDashboard.jsx
│
├── shared/                   # Componentes compartidos
│   └── components/
│       ├── ui/              # Sistema de diseño
│       │   ├── Button.jsx
│       │   ├── Card.jsx
│       │   ├── Input.jsx
│       │   ├── Loading.jsx
│       │   ├── Modal.jsx
│       │   └── index.js
│       ├── Header.jsx       # Header principal
│       └── Footer.jsx       # Footer principal
│
└── main.jsx                 # Entry point de React
```

## Principios de Diseño

### 1. Separación por Capas
- **app/**: Setup y configuración de la aplicación
- **core/**: Lógica de negocio y utilidades reutilizables
- **features/**: Features organizados por dominio (cada uno puede crecer independientemente)
- **shared/**: Componentes UI reutilizables

### 2. Feature-Based Organization
Cada feature tiene su propia carpeta con:
- `pages/`: Páginas del feature
- `components/`: Componentes específicos del feature
- `hooks/`: Hooks específicos del feature (si los necesita)
- `utils/`: Utilidades específicas del feature (si las necesita)

### 3. Imports con Alias
Usamos `@/` como alias para `src/`:
```jsx
import { Button } from '@/shared/components/ui'
import { api } from '@/core/utils/api'
import { LANGUAGES } from '@/core/constants/courses'
```

### 4. Sistema de Diseño Consistente
Variables CSS centralizadas en `app/styles/index.css`:
- Colores: `--color-primary`, `--color-secondary`, etc.
- Espaciado: `--spacing-sm`, `--spacing-md`, etc.
- Sombras: `--shadow-sm`, `--shadow-md`, etc.
- Transiciones: `--transition-fast`, `--transition-normal`, etc.

### 5. Componentes UI Reutilizables
Sistema de diseño en `shared/components/ui/`:
- **Button**: Variantes (primary, secondary, ghost) y tamaños
- **Card**: Tarjetas con padding configurable y hover
- **Input**: Inputs con labels y manejo de errores
- **Loading**: Spinner con tamaños configurables
- **Modal**: Modales con overlay y tamaños

## Convenciones de Código

### Componentes React
```jsx
// Import order: React, libraries, local
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import { api } from '@/core/utils/api'

export function MyComponent() {
  // 1. Hooks
  const [state, setState] = useState(null)
  
  // 2. Funciones
  const handleClick = () => {
    // ...
  }
  
  // 3. Estilos (inline para estilos dinámicos)
  const style = {
    backgroundColor: 'var(--color-primary)',
    padding: 'var(--spacing-lg)',
  }
  
  // 4. Render
  return <div style={style}>Content</div>
}
```

### Estilos
- Usa variables CSS para valores repetidos
- Inline styles para estilos dinámicos o específicos del componente
- CSS global solo para reset y estilos base

### API Calls
```jsx
import { api } from '@/core/utils/api'

// GET
const data = await api.get('/endpoint')

// POST
const result = await api.post('/endpoint', { body })

// PUT
const updated = await api.put('/endpoint', { body })

// DELETE
await api.delete('/endpoint')
```

## Ventajas de esta Arquitectura

1. **Escalabilidad**: Cada feature puede crecer independientemente
2. **Mantenibilidad**: Código organizado por dominio, fácil de encontrar
3. **Reutilización**: Core y shared components disponibles para todos
4. **Consistencia**: Sistema de diseño unificado
5. **Testing**: Estructura clara facilita testing por feature
6. **Performance**: Code splitting automático por features

## Próximos Pasos

Para agregar un nuevo feature:
1. Crear carpeta en `features/nombre-feature/`
2. Agregar `pages/` para las páginas
3. Agregar `components/` para componentes específicos
4. Actualizar rutas en `app/App.jsx`
5. Actualizar navegación en `core/constants/navigation.js`

Para agregar un nuevo componente UI:
1. Crear en `shared/components/ui/ComponentName.jsx`
2. Exportar desde `shared/components/ui/index.js`
3. Usar variables CSS para consistencia
4. Documentar props y variantes
