import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tenantId: string;
        email: string;
        role: string;
        isActive: boolean;
      };
    }
  }
}

export interface JWTPayload {
  userId: string;
  tenantId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * JWT Authentication Middleware
 * Validates JWT token and attaches user info to request
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication token required'
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'p360-dev-secret-key';
    
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Validate user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        tenantId: true,
        email: true,
        role: true,
        isActive: true,
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or inactive user'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid authentication token'
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication token expired'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication failed'
    });
  }
};

/**
 * Role-based Authorization Middleware
 * Checks if user has required role
 */
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions for this operation'
      });
    }

    next();
  };
};

/**
 * Admin-only Authorization Middleware
 */
export const requireAdmin = requireRole(['admin']);

/**
 * Manager or Admin Authorization Middleware
 */
export const requireManagerOrAdmin = requireRole(['admin', 'manager']);

/**
 * Tenant Isolation Middleware
 * Ensures user can only access resources from their tenant
 */
export const validateTenantAccess = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
  }

  // Store tenant ID for use in controllers
  req.headers['x-tenant-id'] = req.user.tenantId;
  next();
};

/**
 * Generate JWT Token for user
 */
export const generateJWT = (user: { id: string; tenantId: string; email: string; role: string }) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'p360-dev-secret-key';
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

  const payload: JWTPayload = {
    userId: user.id,
    tenantId: user.tenantId,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);
};

/**
 * Demo Authentication Middleware for Development
 * Creates a demo admin user for testing purposes
 */
export const demoAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }

  // Demo admin user for development
  req.user = {
    id: 'demo-admin-id',
    tenantId: 'demo-tenant-id',
    email: 'admin@p360.com',
    role: 'admin',
    isActive: true,
  };

  next();
};
