import { test, expect } from '@playwright/test';

const LOGIN_URL = 'http://localhost:6600/auth/login';

test.describe('P360 Login Page - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test.describe('Visual Design & Typography', () => {
    test('renders with correct P360 design system', async ({ page }) => {
      // Check Pipeline360 logo is visible
      await expect(page.locator('svg').first()).toBeVisible();
      
      // Check main container has correct styling
      const container = page.locator('[data-name="login"]');
      await expect(container).toHaveClass(/font-p360/);
      
      // Check gradient background is present
      const gradient = page.locator('.absolute.bottom-\\[-60\\.25px\\]');
      await expect(gradient).toBeVisible();
    });

    test('has correct typography classes applied', async ({ page }) => {
      // Check input fields have P360 typography
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      
      await expect(emailInput).toHaveClass(/p360-input/);
      await expect(passwordInput).toHaveClass(/p360-input/);
      
      // Check button has correct typography
      const loginButton = page.getByRole('button', { name: /login/i });
      await expect(loginButton).toHaveClass(/p360-button-text/);
    });

    test('displays correct placeholder images', async ({ page }) => {
      // Check right panel has background images
      const rightPanel = page.locator('[style*="background-image"]').first();
      await expect(rightPanel).toBeVisible();
    });
  });

  test.describe('Form Interaction & Validation', () => {
    test('login button starts disabled and enables with valid input', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: /login/i });
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);

      // Initially disabled
      await expect(loginButton).toBeDisabled();
      await expect(loginButton).toHaveClass(/bg-\[#f4ebff\]/);

      // Still disabled with only email
      await emailInput.fill('admin@p360.com');
      await expect(loginButton).toBeDisabled();

      // Still disabled with only password
      await emailInput.clear();
      await passwordInput.fill('admin123');
      await expect(loginButton).toBeDisabled();

      // Enabled with both valid email and password
      await emailInput.fill('admin@p360.com');
      await expect(loginButton).toBeEnabled();
      await expect(loginButton).toHaveClass(/bg-\[#841aff\]/);
    });

    test('validates email format in real-time', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: /login/i });
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);

      // Invalid email format
      await emailInput.fill('invalid-email');
      await passwordInput.fill('validpassword');
      await expect(loginButton).toBeDisabled();

      // Valid email format
      await emailInput.fill('test@example.com');
      await expect(loginButton).toBeEnabled();
    });

    test('validates password length requirement', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: /login/i });
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);

      await emailInput.fill('test@example.com');

      // Short password
      await passwordInput.fill('12345');
      await expect(loginButton).toBeDisabled();

      // Valid length password
      await passwordInput.fill('123456');
      await expect(loginButton).toBeEnabled();
    });

    test('button becomes disabled when valid email is deleted', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: /login/i });
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);

      // Fill valid credentials
      await emailInput.fill('admin@p360.com');
      await passwordInput.fill('admin123');
      await expect(loginButton).toBeEnabled();

      // Delete email
      await emailInput.clear();
      await expect(loginButton).toBeDisabled();
    });
  });

  test.describe('Login Flow - Success Cases', () => {
    test('successful login with admin credentials', async ({ page }) => {
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      const loginButton = page.getByRole('button', { name: /login/i });

      // Fill valid credentials
      await emailInput.fill('admin@p360.com');
      await passwordInput.fill('admin123');

      // Click login button
      await loginButton.click();

      // Check loading state
      await expect(loginButton).toHaveText(/logging in.../i);
      await expect(loginButton).toBeDisabled();

      // Wait for success alert
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Login successful!');
        await dialog.accept();
      });

      // Wait for form to clear
      await expect(emailInput).toHaveValue('');
      await expect(passwordInput).toHaveValue('');
    });

    test('successful login with all valid credential combinations', async ({ page }) => {
      const validCredentials = [
        { email: 'admin@p360.com', password: 'admin123' },
        { email: 'user@p360.com', password: 'user123' },
        { email: 'demo@p360.com', password: 'demo123' },
        { email: 'rico.oktanondat@gmail.com', password: 'password123' }
      ];

      for (const credentials of validCredentials) {
        await page.reload();
        
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);
        const loginButton = page.getByRole('button', { name: /login/i });

        await emailInput.fill(credentials.email);
        await passwordInput.fill(credentials.password);
        await loginButton.click();

        // Handle success dialog
        page.on('dialog', async dialog => {
          expect(dialog.message()).toContain('Login successful!');
          await dialog.accept();
        });

        // Wait for form to clear indicating success
        await expect(emailInput).toHaveValue('');
        await expect(passwordInput).toHaveValue('');
      }
    });
  });

  test.describe('Login Flow - Error Cases', () => {
    test('shows error messages for invalid credentials', async ({ page }) => {
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      const loginButton = page.getByRole('button', { name: /login/i });

      // Fill invalid credentials
      await emailInput.fill('invalid@example.com');
      await passwordInput.fill('wrongpassword');
      await loginButton.click();

      // Wait for error state
      await expect(page.getByText(/email not found/i)).toBeVisible();
      await expect(page.getByText(/password is wrong/i)).toBeVisible();

      // Check error styling
      await expect(emailInput).toHaveClass(/border-red-500/);
      await expect(passwordInput).toHaveClass(/border-red-500/);
    });

    test('clears errors when user starts typing', async ({ page }) => {
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      const loginButton = page.getByRole('button', { name: /login/i });

      // Trigger error state
      await emailInput.fill('invalid@example.com');
      await passwordInput.fill('wrongpassword');
      await loginButton.click();

      // Wait for error messages
      await expect(page.getByText(/email not found/i)).toBeVisible();

      // Start typing in email field
      await emailInput.press('Backspace');
      await emailInput.type('a');

      // Error should be cleared
      await expect(page.getByText(/email not found/i)).not.toBeVisible();
    });

    test('handles empty form submission', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: /login/i });
      
      // Button should be disabled with empty form
      await expect(loginButton).toBeDisabled();
      
      // Try to submit empty form (should not be possible due to disabled state)
      await expect(loginButton).toHaveClass(/cursor-not-allowed/);
    });
  });

  test.describe('OAuth Integration', () => {
    test('Google OAuth button is functional', async ({ page }) => {
      const googleButton = page.getByRole('button', { name: /continue with google/i });
      
      await expect(googleButton).toBeVisible();
      await expect(googleButton).toBeEnabled();
      
      // Click should trigger OAuth flow (would normally redirect)
      await googleButton.click();
      
      // For now, just verify the button is clickable
      // In real implementation, this would test OAuth redirect
    });

    test('Microsoft OAuth button is functional', async ({ page }) => {
      const microsoftButton = page.getByRole('button', { name: /continue with microsoft/i });
      
      await expect(microsoftButton).toBeVisible();
      await expect(microsoftButton).toBeEnabled();
      
      await microsoftButton.click();
      
      // For now, just verify the button is clickable
      // In real implementation, this would test OAuth redirect
    });
  });

  test.describe('Accessibility & Keyboard Navigation', () => {
    test('supports keyboard navigation', async ({ page }) => {
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      const loginButton = page.getByRole('button', { name: /login/i });

      // Tab through form elements
      await page.keyboard.press('Tab');
      await expect(emailInput).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(passwordInput).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(loginButton).toBeFocused();
    });

    test('form inputs have proper ARIA attributes', async ({ page }) => {
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);

      await expect(emailInput).toHaveAttribute('type', 'email');
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('maintains focus management during validation', async ({ page }) => {
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      const loginButton = page.getByRole('button', { name: /login/i });

      // Fill form and trigger error
      await emailInput.fill('invalid@example.com');
      await passwordInput.fill('wrong');
      await loginButton.click();

      // Form should maintain usability after error
      await expect(emailInput).toBeEditable();
      await expect(passwordInput).toBeEditable();
    });
  });

  test.describe('Responsive Design', () => {
    test('works on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check main elements are still visible and functional
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      const loginButton = page.getByRole('button', { name: /login/i });

      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(loginButton).toBeVisible();

      // Test basic functionality
      await emailInput.fill('admin@p360.com');
      await passwordInput.fill('admin123');
      await expect(loginButton).toBeEnabled();
    });

    test('works on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      const container = page.locator('[data-name="login"]');
      await expect(container).toBeVisible();
      
      // Test form functionality
      const emailInput = page.getByLabel(/email/i);
      const passwordInput = page.getByLabel(/password/i);
      
      await emailInput.fill('test@example.com');
      await passwordInput.fill('password123');
      
      const loginButton = page.getByRole('button', { name: /login/i });
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('Performance & Loading', () => {
    test('page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(LOGIN_URL);
      
      // Wait for main elements to be visible
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/password/i)).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
    });

    test('typography fonts load correctly', async ({ page }) => {
      // Check that Lexend Deca font is loaded
      const computedStyle = await page.evaluate(() => {
        const element = document.querySelector('[data-name="login"]');
        return window.getComputedStyle(element).fontFamily;
      });
      
      expect(computedStyle).toContain('Lexend Deca');
    });
  });
});
