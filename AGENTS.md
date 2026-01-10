# Agent Guidelines for Idiomas Avanza

## Build Commands
- `npm run build` - Build production bundle with Vite
- `npm run dev` - Start development server with Vite (port 3000)
- `npm run preview` - Preview production build
- `npm run lint` - Lint JavaScript/React files with ESLint

## Database Commands
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (port 5555)
- `npm run prisma:seed` - Seed database with initial data
- `npm run prisma:format` - Format schema.prisma
- `npm run prisma:reset` - Reset database

## Deployment Commands
- `./deploy-to-apache.sh` - Deploy to Apache production
- `./update-frontend.sh` - Update frontend on Apache
- `./start-frontend.sh` - Start local frontend server
- `npm run webhooks:start` - Start webhook server (port 3001)

## Project Structure

### Frontend Architecture
```
src/
├── components/ui/      # Reusable UI: Button, Card, Input, Modal, Loading
├── components/         # Feature components: Header, Footer, AdminHeader
├── pages/             # Route pages: Home, Courses, Library, Portal, Admin, Certifications
├── layouts/           # Layout wrappers: RootLayout
├── hooks/             # Custom hooks: useScroll, useMediaQuery, useIsMobile
├── utils/             # Utilities: api, formatters, validators
├── constants/         # App constants: navigation, courses, pricing
├── config/            # Configuration: env
└── assets/            # Static resources: images, icons, PNG, Vectorizados
```

### Key Files to Know
- `src/constants/navigation.js` - NAV_ITEMS, ADMIN_NAV_ITEMS
- `src/constants/courses.js` - LANGUAGES, COURSE_FEATURES, PRICING_TIERS
- `src/utils/api.js` - API client with error handling
- `src/utils/formatters.js` - formatCurrency, formatDate, formatDateTime
- `src/utils/validators.js` - Form validation helpers
- `src/hooks/useMediaQuery.js` - useIsMobile, useIsTablet, useIsDesktop
- `src/components/ui/index.js` - Export all UI components

## Code Style Guidelines

### JavaScript/React
- Use ES6+ syntax with arrow functions and const/let
- PascalCase for components, camelCase for variables/functions
- Import constants from `src/constants/` instead of hardcoding
- Import custom hooks from `src/hooks/`
- Use API utility from `src/utils/api.js`
- Import UI components from `src/components/ui`
- Use Tailwind CSS classes via index.css, inline styles for dynamic values
- Use lucide-react icons consistently
- Keep components focused and single-responsibility

### Component Patterns
```jsx
// Import order: React, libraries, local
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { NAV_ITEMS } from '../constants/navigation'
import { useScroll } from '../hooks/useScroll'
import { Button, Card } from '../components/ui'

// Use custom hooks
const isScrolled = useScroll(10)
const isMobile = useIsMobile()

// Use constants
NAV_ITEMS.map(item => ...)

// Use UI components
<Button variant="primary" size="lg" to="/cursos">
  Ver Cursos
</Button>
```

### PHP Backend
- Procedural style with snake_case function names
- camelCase for variables and properties
- Double quotes for strings, proper error handling
- Use json_encode for API responses
- Include CORS headers in API endpoints
- Follow PSR-4 for classes

### Database/Prisma
- PascalCase for model names, camelCase for fields
- UPPER_CASE for enum values
- Use proper relationships and database indexes
- Follow existing naming conventions for tables/columns

### File Organization
- **New UI components** → `src/components/ui/`
- **New feature components** → `src/components/`
- **New pages** → `src/pages/`
- **New hooks** → `src/hooks/`
- **New utilities** → `src/utils/`
- **New constants** → `src/constants/`
- **Old/legacy files** → `old-files/` (already moved)

### General
- Use meaningful, descriptive variable names
- Handle errors appropriately with proper HTTP status codes
- Follow existing patterns for API structure and routing
- Keep root directory clean (config files only)
- Extract reusable logic to hooks or utils
- Extract hardcoded data to constants
