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

## Code Style Guidelines

### React/JavaScript (Frontend)
- **Components**: PascalCase for component names, camelCase for variables/functions
- **Hooks**: Use React hooks properly, custom hooks start with "use"
- **State**: Use useState and useEffect appropriately, avoid unnecessary re-renders
- **Props**: Destructure props at the component level for clarity
- **Error handling**: Use error boundaries and proper error states
- **API calls**: Use fetch() or axios with proper error handling and loading states
- **Styling**: Use CSS modules or styled-components, avoid inline styles when possible

### PHP (Backend)
- **Naming**: snake_case for database fields, camelCase for class methods
- **Classes**: Follow PSR-4 autoloading, single responsibility principle
- **Database**: Always use PDO prepared statements, never raw SQL
- **API responses**: Consistent JSON format with proper HTTP status codes
- **Security**: Sanitize inputs with htmlspecialchars() and strip_tags()
- **Error handling**: Return appropriate HTTP codes (200, 400, 401, 404, 500)

### General Conventions
- **File structure**: Keep models, API endpoints, and middleware separated
- **Documentation**: Comment complex business logic, not obvious code
- **Testing**: Write tests for critical business logic and API endpoints

## Production URLs
- **Frontend**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com
- **Backend API**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com/backend/api/
- **Webhooks**: http://localhost:3001
- **Development**: http://localhost:3000

## Deployment Architecture
- **Web Server**: Apache2 serving React build from `/var/www/html/`
- **SPA Routing**: .htaccess handles React Router routes
- **API Proxy**: `/api/*` requests routed to `/backend/api/`
- **Static Assets**: Optimized with gzip compression and cache headers