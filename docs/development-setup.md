# Development Setup Guide

This guide will help you set up the P360 development environment on your local machine.

## Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Git**
- **PostgreSQL** 14+ (for database)
- **Redis** (for caching) - optional for initial development

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd P360

# Install all dependencies (root, frontend, and backend)
npm run install:all
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
vim .env  # or your preferred editor
```

Required environment variables for local development:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FIGMA_API_KEY` - For UI component development
- `FIGMA_FILE_KEY` - Figma file identifier
- `FIGMA_NODE_ID` - Current node: `861-20083`

### 3. Database Setup

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql
brew services start postgresql

# Create database
createdb p360
createdb p360_test

# Run migrations (once we have Prisma set up)
cd backend
npx prisma migrate dev
```

### 4. Start Development Servers

```bash
# Option 1: Start both servers simultaneously
npm run dev

# Option 2: Start servers separately
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

## Development URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Health**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/api/v1

## Project Structure

```
P360/
├── frontend/              # Next.js React application
│   ├── src/
│   │   ├── app/          # Next.js 13+ app directory
│   │   ├── components/   # Reusable UI components
│   │   └── utils/        # Frontend utilities
│   └── package.json
├── backend/               # Node.js Express API
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Backend utilities
│   └── package.json
└── docs/                  # Documentation
```

## Development Workflow

### Creating a New Feature

1. **Create Branch**
   ```bash
   git checkout -b feature/P360-XX-description
   ```

2. **Make Changes**
   - Follow TypeScript best practices
   - Write tests for new functionality
   - Update documentation if needed

3. **Test Locally**
   ```bash
   # Run all tests
   npm run test
   
   # Type checking
   npm run type-check
   
   # Linting
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(P360-XX): descriptive commit message"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/P360-XX-description
   # Create PR via GitHub UI
   ```

## Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use meaningful variable and function names

### React Components
- Use functional components with hooks
- Follow the component structure from Figma designs
- Implement responsive design principles

### API Development
- RESTful API design
- Proper error handling
- Input validation
- Authentication middleware

## Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test

# E2E tests (future)
npm run test:e2e
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3000/8000
   lsof -ti:3000 | xargs kill -9
   lsof -ti:8000 | xargs kill -9
   ```

2. **Database connection issues**
   ```bash
   # Check PostgreSQL status
   brew services list | grep postgresql
   
   # Restart PostgreSQL
   brew services restart postgresql
   ```

3. **Node modules issues**
   ```bash
   # Clean install
   npm run clean
   npm run install:all
   ```

### Getting Help

- Check existing documentation in `/docs`
- Create an issue for bugs or feature requests
- Contact the development team via Slack/Teams

## Next Steps

Once your environment is set up:

1. Review the [API Documentation](./api.md)
2. Check out [Component Guidelines](./components.md)
3. Read about [Database Schema](./database.md)
4. Explore the Figma designs for UI components
