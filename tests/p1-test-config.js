/**
 * P360 P1 (Priority 1) Test Configuration
 * Tests that MUST pass for every commit to CI/CD pipeline
 * 
 * P1 tests are critical path tests that ensure:
 * - Core functionality works
 * - No breaking changes to essential features
 * - Performance standards are met
 * - Security and authentication basics function
 */

const P1_INTEGRATION_TESTS = [
  // Core Campaign functionality - business critical
  'tests/integration/campaigns/CampaignsPage.test.tsx',
  
  // Authentication - security critical  
  'tests/integration/auth/LoginForm.test.tsx',
  'tests/integration/auth/SignupForm.test.tsx',
];

const P1_UNIT_TESTS = [
  // Core business logic components
  'tests/unit/campaigns/CampaignCard.test.tsx',
  'tests/unit/campaigns/CampaignFilters.test.tsx',
  
  // Critical UI components
  'tests/unit/ui/Button.test.tsx',
  'tests/unit/auth/AuthLayout.test.tsx',
];

const P1_E2E_TESTS = [
  // Core user journeys - must work for production
  'TC-040: Homepage to Login Page Navigation',
  'TC-041: Homepage to Signup Page Navigation', 
  'TC-042: Login to Dashboard Redirect (Demo Mode)',
  'TC-061: New User Registration Complete Flow',
  'TC-062: Existing User Login Complete Flow',
];

// Jest test pattern for P1 unit and integration tests
const P1_JEST_PATTERN = [
  ...P1_INTEGRATION_TESTS,
  ...P1_UNIT_TESTS
].map(testPath => testPath.replace('tests/', '')).join('|');

// Playwright test pattern for P1 E2E tests  
const P1_PLAYWRIGHT_GREP = P1_E2E_TESTS
  .map(test => test.split(': ')[0]) // Extract test codes
  .join('|');

module.exports = {
  P1_INTEGRATION_TESTS,
  P1_UNIT_TESTS, 
  P1_E2E_TESTS,
  P1_JEST_PATTERN,
  P1_PLAYWRIGHT_GREP,
  
  // Jest command for P1 tests only
  getP1JestCommand: () => `jest --testNamePattern="${P1_JEST_PATTERN}"`,
  
  // Playwright command for P1 tests only
  getP1PlaywrightCommand: () => `playwright test --grep "${P1_PLAYWRIGHT_GREP}"`,
  
  // Complete P1 test suite command
  getP1TestCommand: () => `npm run test:unit:p1 && npm run test:integration:p1 && npm run test:e2e:p1`
};
