import { beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';

// Environment setup
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';

// Database URL with fallback for CI/CD environments
process.env.DATABASE_URL = process.env.CI_DATABASE_URL || 
  process.env.DATABASE_URL || 
  'postgresql://test_user:test_password@localhost:5432/p360_test';

// Global test setup
beforeAll(async () => {
  console.log('🧪 Setting up test environment...');
  
  // Skip database setup if not available (for unit tests)
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('✅ Database connection successful');
    await prisma.$disconnect();
  } catch (error) {
    console.warn('⚠️ Database not available, running in mock mode');
  }
});

afterAll(async () => {
  console.log('🧹 Cleaning up test environment...');
});

beforeEach(async () => {
  // Reset test data before each test
});

afterEach(async () => {
  // Cleanup after each test
});

// Mock external services
jest.mock('axios');
jest.mock('jsonwebtoken');

// Extend global namespace for test utilities
declare global {
  var testUtils: {
    createMockUser: () => any;
    createMockRequest: (overrides?: any) => any;
    createMockResponse: () => any;
  };
}

// Global test utilities
(global as any).testUtils = {
  createMockUser: () => ({
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
  }),
  createMockRequest: (overrides = {}) => ({
    body: {},
    params: {},
    query: {},
    headers: {},
    user: null,
    ...overrides,
  }),
  createMockResponse: () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    return res;
  },
};
