/**
 * CI Test Setup - Mock-only mode for containerized environments
 * Skips all database connections and uses mocks exclusively
 */

console.log('🐳 CI Test Environment - Mock Mode Only');

// Mock Prisma client completely for CI
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    organization: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    },
    tenant: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({}),
    },
    user: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({}),
    },
    activity: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
    },
    $queryRaw: jest.fn().mockResolvedValue([]),
  })),
}));

// Suppress all console output in CI to reduce noise
beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

// Force mock mode indicators
process.env.NODE_ENV = 'test';
process.env.CI = 'true';
process.env.DATABASE_URL = 'mock://ci-environment';
