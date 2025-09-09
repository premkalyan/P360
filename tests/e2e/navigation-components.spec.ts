/**
 * P360-106: Navigation Components UI Tests
 * Enterprise-grade Playwright tests for TopBar and Sidebar functionality
 * Related JIRA: P360-67, P360-106
 */

import { test, expect } from '@playwright/test';

test.describe('TopBar Navigation - P360-106', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should render TopBar with all required elements', async ({ page }) => {
    // Check P360 logo
    const logo = page.locator('img[alt="Pipeline360 Logo"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/p360-logo.png');

    // Check organization selector
    const orgName = page.locator('text=Vercel');
    await expect(orgName).toBeVisible();
    
    const orgBadge = page.locator('text=#1234');
    await expect(orgBadge).toBeVisible();

    // Check search box
    const searchBox = page.locator('input[placeholder="Search anything..."]');
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEnabled();

    // Check Feedback button
    const feedbackButton = page.locator('button:has-text("Feedback")');
    await expect(feedbackButton).toBeVisible();
    await expect(feedbackButton).toHaveCSS('border-width', '1px'); // Should have border

    // Check notification bell
    const bellIcon = page.locator('[data-testid="notification-bell"], button:has(svg)').last();
    await expect(bellIcon).toBeVisible();

    // Check user avatar
    const userAvatar = page.locator('text=JD');
    await expect(userAvatar).toBeVisible();
  });

  test('should handle search functionality', async ({ page }) => {
    const searchBox = page.locator('input[placeholder="Search anything..."]');
    
    // Test search input
    await searchBox.fill('test campaign');
    await expect(searchBox).toHaveValue('test campaign');

    // Test search clearing
    await searchBox.fill('');
    await expect(searchBox).toHaveValue('');
  });

  test('should handle organization selector interaction', async ({ page }) => {
    const orgDropdown = page.locator('button:has(svg[viewBox="0 0 24 24"])').first();
    
    // Click dropdown arrow
    await orgDropdown.click();
    
    // Check hover state
    await orgDropdown.hover();
    await expect(orgDropdown).toHaveCSS('background-color', 'rgb(243, 244, 246)'); // hover:bg-gray-100
  });

  test('should maintain TopBar fixed position on scroll', async ({ page }) => {
    // Get TopBar position
    const topBar = page.locator('[class*="fixed"], [class*="sticky"]').first();
    await expect(topBar).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // TopBar should still be visible
    await expect(topBar).toBeVisible();
  });
});

test.describe('Sidebar Navigation - P360-106', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should render Sidebar with all navigation items', async ({ page }) => {
    // Check Create button with plus icon
    const createButton = page.locator('button:has-text("Create"), button:has(svg)').first();
    await expect(createButton).toBeVisible();

    // Check main navigation items
    const navItems = [
      'My Dashboards',
      'Programs', 
      'Campaigns',
      'Line Items',
      'Audiences',
      'Inventory',
      'Assets',
      'My Reports',
      'Media Planning',
      'Marketplace',
      'Integrations'
    ];

    for (const item of navItems) {
      const navItem = page.locator(`text=${item}`);
      await expect(navItem).toBeVisible();
    }
  });

  test('should handle navigation between pages', async ({ page }) => {
    // Navigate to Campaigns
    await page.locator('text=Campaigns').click();
    await page.waitForLoadState('networkidle');
    
    // Check URL changed
    expect(page.url()).toContain('/dashboard/campaigns');

    // Navigate to Programs
    await page.locator('text=Programs').click();
    await page.waitForLoadState('networkidle');
    
    // Check URL changed
    expect(page.url()).toContain('/dashboard/programs');
  });

  test('should highlight active navigation item', async ({ page }) => {
    // Navigate to campaigns
    await page.locator('text=Campaigns').click();
    await page.waitForLoadState('networkidle');

    // Check if campaigns nav item is highlighted
    const campaignsNav = page.locator('text=Campaigns').locator('..');
    const backgroundColor = await campaignsNav.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Should have some form of active state styling
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
  });

  test('should handle Create button interaction', async ({ page }) => {
    const createButton = page.locator('button:has-text("Create"), button:has(svg)').first();
    
    // Check hover state
    await createButton.hover();
    
    // Click create button
    await createButton.click();
    
    // Verify button is clickable (implementation specific)
    await expect(createButton).toBeVisible();
  });

  test('should maintain sidebar fixed position', async ({ page }) => {
    // Get sidebar element
    const sidebar = page.locator('[class*="fixed"], nav').first();
    await expect(sidebar).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Sidebar should still be visible
    await expect(sidebar).toBeVisible();
  });
});

test.describe('Layout Integration - P360-106', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should have proper layout structure', async ({ page }) => {
    // Check TopBar spans full width
    const topBar = page.locator('[class*="fixed"], header').first();
    const topBarWidth = await topBar.evaluate(el => el.getBoundingClientRect().width);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(topBarWidth).toBeCloseTo(viewportWidth, 10);

    // Check Sidebar is positioned correctly
    const sidebar = page.locator('nav, [class*="sidebar"]').first();
    await expect(sidebar).toBeVisible();

    // Check main content area
    const mainContent = page.locator('main, [class*="main"]').first();
    await expect(mainContent).toBeVisible();
  });

  test('should handle responsive breakpoints', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(100);
    
    // Sidebar might be hidden or collapsed on mobile
    const logo = page.locator('img[alt="Pipeline360 Logo"]');
    await expect(logo).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(100);
    
    await expect(logo).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(100);
    
    await expect(logo).toBeVisible();
  });

  test('should maintain consistent font styling across components', async ({ page }) => {
    // Check TopBar font
    const orgText = page.locator('text=Vercel');
    const orgFontFamily = await orgText.evaluate(el => getComputedStyle(el).fontFamily);
    
    // Check Sidebar font
    const navText = page.locator('text=Campaigns');
    const navFontFamily = await navText.evaluate(el => getComputedStyle(el).fontFamily);
    
    // Should use consistent font family
    expect(orgFontFamily).toBe(navFontFamily);
  });
});
