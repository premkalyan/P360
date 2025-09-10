import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes and middleware
import organizationRoutes from './routes/organization.routes';
import { setupSwagger } from './config/swagger.config';
import { sanitizeInput } from './middleware/validation.middleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6601; // Use 6601 for development
const prisma = new PrismaClient();

// Global middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow Swagger UI to work
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:6600',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// Setup Swagger documentation
setupSwagger(app);

// Health check route
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'OK',
      message: 'P360 Backend Server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      version: '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'disconnected'
    });
  }
});

// API v1 routes
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'P360 API v1 - Organization Management',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      health: '/health',
      organizations: '/api/v1/organizations',
      swagger: '/api-docs',
      openapi: '/api-docs.json'
    },
    features: [
      'Organization CRUD operations',
      'JWT Authentication',
      'Role-based authorization',
      'Tenant isolation',
      'Input validation',
      'Swagger documentation',
      'Rate limiting',
      'Error handling'
    ]
  });
});

// Mount API routes
app.use('/api/v1/organizations', organizationRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 P360 Backend Server started on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API base: http://localhost:${PORT}/api/v1`);
  console.log(`📚 API documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'configured' : 'using default'}`);
  console.log('✅ Server ready for requests');
});

export default app;
