const baseConfig = require('./jest.config.js');

module.exports = {
  ...baseConfig,
  // Skip database tests in CI environment
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/database/', // Skip all database tests
    '<rootDir>/src/__tests__/.*\\.integration\\.test\\.[jt]s$', // Skip integration tests
    '<rootDir>/src/__tests__/.*\\.e2e\\.test\\.[jt]s$', // Skip E2E tests
  ],
  // Only run unit tests and controller tests with mocks
  testMatch: [
    '<rootDir>/src/__tests__/*.controller.test.[jt]s',
    '<rootDir>/src/index.test.[jt]s',
  ],
  // Force all tests to run in mock mode
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ci.ts'],
  // Faster test execution for CI
  maxWorkers: 2,
  forceExit: true,
  detectOpenHandles: false,
};
