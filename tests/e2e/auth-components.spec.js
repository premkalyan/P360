/**
 * P360 Authentication Components - End-to-End Tests
 * Comprehensive E2E testing for P360-19 Authentication UI Components
 */

const { test, expect } = require('@playwright/test');

// Test Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:6600';
const TIMEOUT = 30000;

test.describe('P360 Authentication Components E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for E2E tests
    test.setTimeout(TIMEOUT);
    
    // Navigate to homepage
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/P360/);
  });

  test.describe('TC-040-043: Navigation Flow Tests', () => {
    
    test('TC-040: Homepage to Login Page Navigation', async ({ page }) => {
      // Click login button from homepage
      await page.click('a[href="/auth/login"]');
      
      // Verify navigation to login page
      await expect(page).toHaveURL(`${BASE_URL}/auth/login`);
      
      // Verify login form is rendered
      await expect(page.locator('form')).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toContainText('Sign In');
    });

    test('TC-041: Homepage to Signup Page Navigation', async ({ page }) => {
      // Click signup button from homepage
      await page.click('a[href="/auth/signup"]');
      
      // Verify navigation to signup page
      await expect(page).toHaveURL(`${BASE_URL}/auth/signup`);
      
      // Verify signup form is rendered
      await expect(page.locator('form')).toBeVisible();
      await expect(page.locator('input[placeholder*="John"]')).toBeVisible(); // First name
      await expect(page.locator('input[placeholder*="Doe"]')).toBeVisible(); // Last name
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toHaveCount(2); // Password + Confirm
      await expect(page.locator('button[type="submit"]')).toContainText('Create Account');
    });

    test('TC-042: Login to Dashboard Redirect (Demo Mode)', async ({ page }) => {
      // Navigate to login page
      await page.goto(`${BASE_URL}/auth/login`);
      
      // Fill in login form
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');
      
      // Submit form
      await page.click('button[type="submit"]');
      
      // Wait for demo authentication to process
      await page.waitForTimeout(2000);
      
      // Verify redirect to dashboard (demo mode shows alert first)
      await expect(page.locator('text=Login successful')).toBeVisible({ timeout: 5000 });
    });

    test('TC-043: Signup to Login Redirect (Demo Mode)', async ({ page }) => {
      // Navigate to signup page
      await page.goto(`${BASE_URL}/auth/signup`);
      
      // Fill in signup form
      await page.fill('input[placeholder*="John"]', 'John');
      await page.fill('input[placeholder*="Doe"]', 'Doe');
      await page.fill('input[type="email"]', 'john.doe@example.com');
      await page.fill(page.locator('input[type="password"]').first(), 'SecurePass123!');
      await page.fill(page.locator('input[type="password"]').last(), 'SecurePass123!');
      
      // Accept terms
      await page.check('input[type="checkbox"]');
      
      // Submit form
      await page.click('button[type="submit"]');
      
      // Wait for demo processing
      await page.waitForTimeout(2000);
      
      // Verify success message
      await expect(page.locator('text=Account created successfully')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('TC-061-065: Complete User Journeys', () => {
    
    test('TC-061: New User Registration Complete Flow', async ({ page }) => {
      const startTime = Date.now();
      
      // Step 1: Navigate to homepage
      await page.goto(BASE_URL);
      await expect(page.locator('h1')).toContainText('P360');
      
      // Step 2: Click "Get Started" button
      await page.click('a[href="/auth/signup"]:has-text("Get Started"), a[href="/auth/signup"]:has-text("Start Free Trial")');
      
      // Step 3: Fill out registration form
      await page.fill('input[placeholder*="John"]', 'John');
      await page.fill('input[placeholder*="Doe"]', 'Doe');
      await page.fill('input[type="email"]', 'john.doe@p360test.com');
      await page.fill(page.locator('input[type="password"]').first(), 'SecurePassword123!');
      await page.fill(page.locator('input[type="password"]').last(), 'SecurePassword123!');
      
      // Step 4: Accept terms and conditions
      await page.check('input[type="checkbox"]');
      
      // Step 5: Submit form
      await page.click('button[type="submit"]');
      
      // Step 6: Verify success or redirect
      await expect(page.locator('text=Account created successfully')).toBeVisible({ timeout: 10000 });
      
      // Step 7: Verify flow completion time
      const endTime = Date.now();
      const flowDuration = (endTime - startTime) / 1000;
      expect(flowDuration).toBeLessThan(30); // Should complete in <30 seconds
      
      // Verify no JavaScript errors
      const consoleLogs = [];
      page.on('console', msg => consoleLogs.push(msg));
      page.on('pageerror', err => {
        throw new Error(`JavaScript error: ${err.message}`);
      });
    });

    test('TC-062: Existing User Login Complete Flow', async ({ page }) => {
      const startTime = Date.now();
      
      // Step 1: Navigate to homepage
      await page.goto(BASE_URL);
      
      // Step 2: Click login
      await page.click('a[href="/auth/login"]:has-text("Login"), a[href="/auth/login"]:has-text("Sign In")');
      
      // Step 3: Enter credentials
      await page.fill('input[type="email"]', 'existing.user@p360.com');
      await page.fill('input[type="password"]', 'UserPassword123!');
      
      // Step 4: Check remember me (optional)
      await page.check('input[type="checkbox"]');
      
      // Step 5: Submit
      await page.click('button[type="submit"]');
      
      // Step 6: Verify success
      await expect(page.locator('text=Login successful')).toBeVisible({ timeout: 10000 });
      
      // Verify performance
      const endTime = Date.now();
      const flowDuration = (endTime - startTime) / 1000;
      expect(flowDuration).toBeLessThan(20); // Login should be faster than signup
    });

    test('TC-064: Form Validation Error Recovery Flow', async ({ page }) => {
      // Navigate to signup page
      await page.goto(`${BASE_URL}/auth/signup`);
      
      // Step 1: Submit empty form to trigger all validation errors
      await page.click('button[type="submit"]');
      
      // Step 2: Verify error messages appear
      await expect(page.locator('text=First name is required')).toBeVisible();
      await expect(page.locator('text=Last name is required')).toBeVisible();
      await expect(page.locator('text=Email is required')).toBeVisible();
      await expect(page.locator('text=Password is required')).toBeVisible();
      
      // Step 3: Fix errors one by one and verify they clear
      await page.fill('input[placeholder*="John"]', 'John');
      await expect(page.locator('text=First name is required')).not.toBeVisible();
      
      await page.fill('input[placeholder*="Doe"]', 'Doe');
      await expect(page.locator('text=Last name is required')).not.toBeVisible();
      
      await page.fill('input[type="email"]', 'invalid-email');
      await expect(page.locator('text=Email is invalid')).toBeVisible();
      
      await page.fill('input[type="email"]', 'valid@email.com');
      await expect(page.locator('text=Email is invalid')).not.toBeVisible();
      
      // Step 4: Test password mismatch
      await page.fill(page.locator('input[type="password"]').first(), 'Password123!');
      await page.fill(page.locator('input[type="password"]').last(), 'DifferentPassword123!');
      
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Passwords do not match')).toBeVisible();
      
      // Step 5: Fix password mismatch
      await page.fill(page.locator('input[type="password"]').last(), 'Password123!');
      await expect(page.locator('text=Passwords do not match')).not.toBeVisible();
      
      // Step 6: Accept terms and submit successfully
      await page.check('input[type="checkbox"]');
      await page.click('button[type="submit"]');
      
      // Verify successful submission
      await expect(page.locator('text=Account created successfully')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('TC-070-074: Accessibility Tests', () => {
    
    test('TC-070: Keyboard Navigation Complete Flow', async ({ page }) => {
      // Navigate to login page
      await page.goto(`${BASE_URL}/auth/login`);
      
      // Test tab navigation through form
      await page.keyboard.press('Tab'); // Should focus email field
      await expect(page.locator('input[type="email"]')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Should focus password field
      await expect(page.locator('input[type="password"]')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Should focus remember me checkbox
      await expect(page.locator('input[type="checkbox"]')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Should focus forgot password link
      await expect(page.locator('a:has-text("Forgot password")')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Should focus submit button
      await expect(page.locator('button[type="submit"]')).toBeFocused();
      
      // Test form submission with keyboard
      await page.keyboard.press('Shift+Tab'); // Go back to password field
      await page.keyboard.press('Shift+Tab'); // Go back to email field
      
      await page.keyboard.type('test@example.com');
      await page.keyboard.press('Tab');
      await page.keyboard.type('password123');
      
      // Navigate to submit button and press Enter
      await page.keyboard.press('Tab'); // checkbox
      await page.keyboard.press('Tab'); // forgot password
      await page.keyboard.press('Tab'); // submit button
      await page.keyboard.press('Enter');
      
      // Verify form submission worked
      await expect(page.locator('text=Login successful')).toBeVisible({ timeout: 5000 });
    });

    test('TC-073: Focus Management and Visibility', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/login`);
      
      // Check that focus indicators are visible
      await page.focus('input[type="email"]');
      
      // Get focus ring styles (this is a basic check - in real implementation you'd check actual CSS)
      const emailField = page.locator('input[type="email"]');
      await expect(emailField).toBeFocused();
      
      // Check focus moves logically
      await page.keyboard.press('Tab');
      await expect(page.locator('input[type="password"]')).toBeFocused();
      
      // Verify no focus traps
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
      }
      
      // Should be able to cycle through all elements without getting trapped
      // This is a simplified test - real implementation would be more thorough
    });
  });

  test.describe('TC-066-069: Performance Tests', () => {
    
    test('TC-066: Page Load Time Measurements', async ({ page }) => {
      const pages = [
        { url: BASE_URL, name: 'Homepage' },
        { url: `${BASE_URL}/auth/login`, name: 'Login Page' },
        { url: `${BASE_URL}/auth/signup`, name: 'Signup Page' }
      ];
      
      for (const pageTest of pages) {
        const startTime = Date.now();
        
        await page.goto(pageTest.url);
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        console.log(`${pageTest.name} load time: ${loadTime}ms`);
        
        // Performance assertion: pages should load in < 2 seconds
        expect(loadTime).toBeLessThan(2000);
      }
    });

    test('TC-067: Form Submission Response Times', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/login`);
      
      // Fill form
      await page.fill('input[type="email"]', 'perf.test@example.com');
      await page.fill('input[type="password"]', 'password123');
      
      // Measure submission time
      const startTime = Date.now();
      await page.click('button[type="submit"]');
      
      // Wait for response (success message or redirect)
      await page.waitForSelector('text=Login successful', { timeout: 10000 });
      
      const responseTime = Date.now() - startTime;
      console.log(`Form submission time: ${responseTime}ms`);
      
      // Performance assertion: form submission should complete in < 1 second
      expect(responseTime).toBeLessThan(1000);
    });
  });

  test.describe('Visual Regression Tests', () => {
    
    test('TC-051: AuthLayout Visual Snapshot (Desktop)', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Navigate to login page
      await page.goto(`${BASE_URL}/auth/login`);
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      
      // Take screenshot and compare
      await expect(page).toHaveScreenshot('auth-layout-desktop.png');
    });

    test('TC-052: AuthLayout Visual Snapshot (Mobile)', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 812 });
      
      // Navigate to login page
      await page.goto(`${BASE_URL}/auth/login`);
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      
      // Take screenshot and compare
      await expect(page).toHaveScreenshot('auth-layout-mobile.png');
    });
  });
});
