# Docker Deployment Guide

P360 is fully containerized with Docker for consistent development and production environments.

## 🐳 Quick Start with Docker

### Development Environment
```bash
# Start all services in development mode with hot reload
npm run docker:dev

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

### Production Environment
```bash
# Build and start production containers
npm run docker:prod

# Or build first, then start
npm run docker:build
npm run docker:prod
```

## 📦 Services

The Docker setup includes:

- **Frontend** (port 3000) - Next.js application
- **Backend** (port 8000) - Express API server
- **PostgreSQL** (port 5432) - Primary database
- **Redis** (port 6379) - Caching and sessions
- **Adminer** (port 8080) - Database management (dev only)

## 🛠️ Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:dev` | Start development environment with hot reload |
| `npm run docker:prod` | Start production environment |
| `npm run docker:build` | Build all Docker images |
| `npm run docker:down` | Stop all containers |
| `npm run docker:logs` | View logs from all services |
| `npm run docker:clean` | Clean up containers, volumes, and unused images |

## 🔧 Environment Variables

Create `.env` file with:

```env
# Database
DATABASE_URL=postgresql://p360_user:p360_password@localhost:5432/p360

# JWT
JWT_SECRET=your-jwt-secret

# Figma Integration
FIGMA_API_KEY=your-figma-api-key
FIGMA_FILE_KEY=your-figma-file-key
FIGMA_NODE_ID=861-20083

# External APIs
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-client-id
```

## 🏗️ Development Workflow

1. **Start development environment:**
   ```bash
   npm run docker:dev
   ```

2. **Access services:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000/health
   - Database Admin: http://localhost:8080

3. **Make changes:** Files are mounted with hot reload

4. **View logs:** `npm run docker:logs`

5. **Stop when done:** `npm run docker:down`

## 📊 Production Deployment

The production setup uses:
- Multi-stage builds for optimized images
- Non-root users for security
- Health checks for reliability
- Volume persistence for data

```bash
# Production deployment
npm run docker:build
npm run docker:prod
```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Stop conflicting services
   npm run docker:down
   lsof -ti:3000,8000,5432 | xargs kill -9
   ```

2. **Database connection issues:**
   ```bash
   # Restart database
   docker-compose restart db
   ```

3. **Clean start:**
   ```bash
   # Clean everything and restart
   npm run docker:clean
   npm run docker:dev
   ```

### Logs and Debugging

```bash
# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Enter container shell
docker exec -it p360-backend sh
docker exec -it p360-frontend sh
```

## 🚀 CI/CD Integration

The Docker setup integrates with GitHub Actions for:
- Automated testing in containers
- Multi-environment builds
- Production deployment pipelines

See `.github/workflows/ci.yml` for CI/CD configuration.
