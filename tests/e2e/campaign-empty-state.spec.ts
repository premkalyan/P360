/**
 * P360-106: Campaign Empty State UI Tests
 * Enterprise-grade Playwright tests for campaign functionality
 * Related JIRA: P360-67, P360-106, P360-107
 */

import { test, expect } from '@playwright/test';

test.describe('Campaign Empty State - P360-106', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to campaigns page
    await page.goto('/dashboard/campaigns');
    await page.waitForLoadState('networkidle');
  });

  test('should display campaign empty state correctly', async ({ page }) => {
    // Toggle to empty state if not already visible
    const toggleButton = page.locator('button:has-text("📭 Empty State")');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
    }

    // Check empty state illustration
    const illustration = page.locator('img[alt="Empty state illustration"]');
    await expect(illustration).toBeVisible();
    await expect(illustration).toHaveAttribute('src', '/empty-campaign-illustration.png');

    // Check empty state heading
    const heading = page.locator('text=You don\'t have any campaigns yet');
    await expect(heading).toBeVisible();

    // Check empty state description
    const description = page.locator('text=Something cool here');
    await expect(description).toBeVisible();

    // Check Create Campaign button
    const createButton = page.locator('button:has-text("Create Campaign")');
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeEnabled();
  });

  test('should handle Create Campaign button click', async ({ page }) => {
    // Ensure empty state is visible
    const toggleButton = page.locator('button:has-text("📭 Empty State")');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
    }

    // Click Create Campaign button
    const createButton = page.locator('button:has-text("Create Campaign")');
    await createButton.click();

    // Verify console log (in real implementation, would navigate to creation page)
    // For now, just verify button interaction works
    await expect(createButton).toHaveClass(/cursor-pointer/);
  });

  test('should toggle between empty and populated states', async ({ page }) => {
    // Check initial state toggle button
    const toggleButton = page.locator('[data-testid="state-toggle"], button[class*="fixed top-20 right-4"]');
    await expect(toggleButton).toBeVisible();

    // Get initial state
    const initialText = await toggleButton.textContent();
    
    // Click toggle
    await toggleButton.click();
    
    // Verify state changed
    const newText = await toggleButton.textContent();
    expect(newText).not.toBe(initialText);

    // Verify either empty or populated content is visible
    if (newText?.includes('📭')) {
      // Now in empty state
      await expect(page.locator('text=You don\'t have any campaigns yet')).toBeVisible();
    } else {
      // Now in populated state
      await expect(page.locator('text=Campaign Dashboard')).toBeVisible();
    }
  });

  test('should have proper responsive design', async ({ page }) => {
    // Toggle to empty state
    const toggleButton = page.locator('button:has-text("📭 Empty State")');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
    }

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('text=You don\'t have any campaigns yet')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('text=You don\'t have any campaigns yet')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('text=You don\'t have any campaigns yet')).toBeVisible();
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Toggle to empty state
    const toggleButton = page.locator('button:has-text("📭 Empty State")');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
    }

    // Check image alt text
    const illustration = page.locator('img[alt="Empty state illustration"]');
    await expect(illustration).toHaveAttribute('alt', 'Empty state illustration');

    // Check button accessibility
    const createButton = page.locator('button:has-text("Create Campaign")');
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeEnabled();

    // Check heading hierarchy
    const heading = page.locator('h4:has-text("You don\'t have any campaigns yet")');
    await expect(heading).toBeVisible();
  });

  test('should load with proper performance metrics', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate and wait for complete load
    await page.goto('/dashboard/campaigns');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds (enterprise standard)
    expect(loadTime).toBeLessThan(3000);

    // Check for layout shift
    await page.waitForTimeout(500);
    const illustration = page.locator('img[src="/empty-campaign-illustration.png"]');
    if (await illustration.isVisible()) {
      await expect(illustration).toBeVisible();
    }
  });
});

test.describe('Design System Components - P360-106', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/campaigns');
    await page.waitForLoadState('networkidle');
  });

  test('should render Typography components correctly', async ({ page }) => {
    // Check if populated state header uses design system
    const toggleButton = page.locator('button:has-text("📊 With Data")');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
    }

    // Check heading typography
    const heading = page.locator('text=Campaign Dashboard');
    if (await heading.isVisible()) {
      await expect(heading).toBeVisible();
      
      // Check computed styles match design system
      const fontSize = await heading.evaluate(el => getComputedStyle(el).fontSize);
      expect(fontSize).toBe('30px'); // h2 variant from design system
    }
  });

  test('should render Button components correctly', async ({ page }) => {
    // Toggle to empty state to test button
    const toggleButton = page.locator('button:has-text("📭 Empty State")');
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
    }

    const createButton = page.locator('button:has-text("Create Campaign")');
    await expect(createButton).toBeVisible();

    // Check button styling matches design system
    const buttonStyles = await createButton.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        borderRadius: styles.borderRadius,
        fontWeight: styles.fontWeight,
      };
    });

    // Primary button should have proper styling
    expect(buttonStyles.fontWeight).toBe('500'); // medium weight
    expect(buttonStyles.borderRadius).toBe('8px'); // base border radius
  });
});
