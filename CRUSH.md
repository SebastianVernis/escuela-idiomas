# CRUSH.md - Idiomas Avanza Development Guide

## Build/Test Commands

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

### JavaScript (Frontend)
- **Naming**: camelCase for variables/functions, UPPER_CASE for constants
- **Error handling**: Always use try-catch for async operations, provide fallbacks
- **Functions**: Descriptive names, DOMContentLoaded for initialization
- **Globals**: Export functions to window object for cross-file access
- **API calls**: Use fetch() with proper error handling and status code checks

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