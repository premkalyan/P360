# P360 - Performance Marketing Platform

P360 is a comprehensive performance marketing platform featuring advanced attribution modeling, audience management, and multi-channel campaign optimization.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd P360
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 📁 Project Structure

```
P360/
├── frontend/              # React/Next.js frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components (from Figma)
│   │   ├── pages/         # Next.js pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles and themes
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── backend/               # Node.js/Express backend API
│   ├── src/
│   │   ├── controllers/   # API route controllers
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── utils/         # Backend utilities
│   ├── tests/             # Backend tests
│   └── package.json       # Backend dependencies
├── database/              # Database migrations and seeds
├── docs/                  # Project documentation
├── .github/               # GitHub Actions workflows
└── README.md              # This file
```

## 🛠️ Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch for features
- `feature/P360-XX-description` - Individual story branches

### Creating a Feature Branch
```bash
git checkout -b feature/P360-34-development-environment
```

### Making Changes
1. Create feature branch
2. Make changes
3. Test locally
4. Commit with descriptive message
5. Push and create PR

### Pull Request Process
1. Create PR from feature branch to `develop`
2. Request review from team
3. Address review comments
4. Merge after approval

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run build` | Build both applications for production |
| `npm run test` | Run all tests |
| `npm run lint` | Lint all code |
| `npm run install:all` | Install dependencies for all packages |

## 🏗️ Architecture

P360 follows a modern full-stack architecture:

- **Frontend**: React/Next.js with TypeScript
- **Backend**: Node.js/Express with TypeScript  
- **Database**: PostgreSQL with multi-tenant support
- **Authentication**: Auth0 + Microsoft Entra ID
- **Deployment**: Docker containers with CI/CD

## 📚 Documentation

Detailed documentation is available in the `docs/` directory:

- [Development Setup](docs/development-setup.md)
- [API Documentation](docs/api.md)
- [Database Schema](docs/database.md)
- [Frontend Components](docs/components.md)
- [Deployment Guide](docs/deployment.md)

## 🔧 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/p360

# Authentication
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# External APIs
FIGMA_API_KEY=your-figma-api-key
FIGMA_FILE_KEY=your-figma-file-key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests
5. Ensure all tests pass
6. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs`
