import { beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';

// Environment setup
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DATABASE_URL = 'postgresql://test_user:test_password@localhost:5432/p360_test';

// Global test setup
beforeAll(async () => {
  // Setup test database, migrations, etc.
  console.log('🧪 Setting up test environment...');
});

afterAll(async () => {
  // Cleanup test database
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
