# CRUSH.md - Idiomas Avanza Development Guide

## Build/Test Commands

### Frontend (React + Vite)
```bash
npm run dev                # Start development server on port 3000
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint
./deploy-to-apache.sh      # Deploy to Apache (production)
./update-frontend.sh       # Update Apache deployment
./start-frontend.sh        # Start local development server
```

### Node.js/Prisma
```bash
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:seed        # Seed database with sample data
npm run webhooks:start     # Start webhook server
```

### PHP Backend
```bash
cd backend && composer install    # Install PHP dependencies
cd backend && composer test       # Run PHPUnit tests
cd backend && php setup.php       # Initialize backend setup
```

## Project Structure

### Modern React Architecture
```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components (Button, Card, Input, Modal, Loading)
│   ├── Header.jsx     # Main navigation
│   ├── Footer.jsx     # Site footer
│   └── AdminHeader.jsx
├── pages/             # Page components (Home, Courses, Library, etc.)
├── layouts/           # Layout wrappers (RootLayout)
├── hooks/             # Custom React hooks (useScroll, useMediaQuery, etc.)
├── utils/             # Utility functions (api, formatters, validators)
├── constants/         # App constants (navigation, courses, pricing)
├── config/            # Configuration (env)
├── assets/            # Static resources (images, icons)
├── App.jsx            # Root component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Code Style Guidelines

### React/JavaScript (Frontend)
- **Components**: PascalCase for component names, camelCase for variables/functions
- **Hooks**: Use custom hooks from `src/hooks/` (useScroll, useMediaQuery, etc.)
- **Constants**: Import from `src/constants/` (NAV_ITEMS, LANGUAGES, etc.)
- **API calls**: Use `api` utility from `src/utils/api.js`
- **Props**: Destructure props at the component level
- **Styling**: Use Tailwind CSS classes via index.css, inline styles for dynamic values
- **UI Components**: Import from `src/components/ui` (Button, Card, Input, Modal, Loading)

### File Organization
- **New Components**: Create in `src/components/` or `src/components/ui/` for reusable UI
- **New Pages**: Create in `src/pages/`
- **New Hooks**: Create in `src/hooks/`
- **New Utils**: Create in `src/utils/`
- **Constants**: Add to appropriate file in `src/constants/`

### PHP (Backend)
- **Naming**: snake_case for database fields, camelCase for class methods
- **Classes**: Follow PSR-4 autoloading, single responsibility principle
- **Database**: Always use PDO prepared statements, never raw SQL
- **API responses**: Consistent JSON format with proper HTTP status codes
- **Security**: Sanitize inputs with htmlspecialchars() and strip_tags()
- **Error handling**: Return appropriate HTTP codes (200, 400, 401, 404, 500)

### General Conventions
- **File structure**: Keep code organized in proper directories (components, utils, hooks, etc.)
- **Documentation**: Comment complex business logic, not obvious code
- **Testing**: Write tests for critical business logic and API endpoints
- **Old files**: Legacy files moved to `old-files/` directory

## Production URLs
- **Frontend**: https://idiomas-avanza.pages.dev (Cloudflare Pages)
- **Backend API**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com/backend/api/
- **Webhooks**: http://localhost:3001
- **Development**: http://localhost:3000

## Deployment Architecture
- **Web Server**: Apache2 serving React build from `/var/www/html/`
- **SPA Routing**: .htaccess handles React Router routes
- **API Proxy**: `/api/*` requests routed to `/backend/api/`
- **Static Assets**: Optimized with gzip compression and cache headers
- **CDN**: Cloudflare for static assets and global distribution
