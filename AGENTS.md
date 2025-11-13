# Agent Guidelines for Idiomas Avanza

## Build Commands
- `npm run build` - Build production bundle with Vite
- `npm run dev` - Start development server with Vite
- `npm run lint` - Lint JavaScript/React files with ESLint

## Database Commands
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database with initial data

## Code Style Guidelines

### JavaScript/React
- Use ES6+ syntax with arrow functions and const/let
- PascalCase for components, camelCase for variables/functions
- Single quotes for strings, no semicolons
- Group imports: React, third-party libraries, then local imports
- Use destructuring for props and imports
- Use Tailwind CSS classes for styling
- Use lucide-react icons with consistent naming

### PHP
- Procedural style with snake_case function names
- camelCase for variables and properties
- Double quotes for strings, proper error handling
- Use json_encode for API responses
- Include CORS headers in API endpoints

### Database/Prisma
- PascalCase for model names, camelCase for fields
- UPPER_CASE for enum values
- Use proper relationships and database indexes
- Follow existing naming conventions for tables/columns

### General
- Use meaningful, descriptive variable names
- Handle errors appropriately with proper HTTP status codes
- Follow existing patterns for API structure and routing