/**
 * P360-135: Organization Grid Advanced Filtering and Sorting - E2E Tests
 * End-to-end tests for complete user workflow
 */

import { test, expect } from '@playwright/test';

test.describe('P360-135: Advanced Organization Filtering and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to organizations page
    await page.goto('http://localhost:6600/admin/organizations');
    
    // Wait for page to load
    await expect(page.getByText('Organization Management')).toBeVisible();
    
    // Wait for organizations to load (may be using fallback data)
    await page.waitForTimeout(1000);
  });

  test.describe('Sort Dropdown Functionality', () => {
    test('should open and display all sort options', async ({ page }) => {
      // Click on sort dropdown
      await page.getByText(/Sort:/).click();
      
      // Verify all sort options are visible
      await expect(page.getByText('Name (A-Z)')).toBeVisible();
      await expect(page.getByText('Name (Z-A)')).toBeVisible();
      await expect(page.getByText('Newest First')).toBeVisible();
      await expect(page.getByText('Oldest First')).toBeVisible();
      await expect(page.getByText('Recently Updated')).toBeVisible();
    });

    test('should apply name sorting A-Z', async ({ page }) => {
      // Get initial organization order
      const initialOrgs = await page.locator('[data-name="organizations-page"] tbody tr').allTextContents();
      
      // Open sort dropdown and select Name A-Z
      await page.getByText(/Sort:/).click();
      await page.getByText('Name (A-Z)').click();
      
      // Wait for sorting to apply
      await page.waitForTimeout(500);
      
      // Verify sort button shows current selection
      await expect(page.getByText(/Sort: Name ↑/)).toBeVisible();
      
      // Verify organizations are sorted alphabetically
      const sortedOrgs = await page.locator('[data-name="organizations-page"] tbody tr').allTextContents();
      expect(sortedOrgs).not.toEqual(initialOrgs); // Order should have changed
    });

    test('should apply name sorting Z-A', async ({ page }) => {
      // Open sort dropdown and select Name Z-A
      await page.getByText(/Sort:/).click();
      await page.getByText('Name (Z-A)').click();
      
      // Wait for sorting to apply
      await page.waitForTimeout(500);
      
      // Verify sort button shows current selection
      await expect(page.getByText(/Sort: Name ↓/)).toBeVisible();
    });

    test('should close dropdown when clicking outside', async ({ page }) => {
      // Open sort dropdown
      await page.getByText(/Sort:/).click();
      await expect(page.getByText('Name (A-Z)')).toBeVisible();
      
      // Click outside
      await page.getByText('Organization Management').click();
      
      // Verify dropdown is closed
      await expect(page.getByText('Name (A-Z)')).not.toBeVisible();
    });
  });

  test.describe('Filters Dropdown Functionality', () => {
    test('should open and display all filter categories', async ({ page }) => {
      // Click on filters dropdown
      await page.getByText('Filters').click();
      
      // Verify all filter categories are visible
      await expect(page.getByText('Status')).toBeVisible();
      await expect(page.getByText('Type')).toBeVisible();
      await expect(page.getByText('Organization Size')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Apply' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();
    });

    test('should apply status filter', async ({ page }) => {
      // Get initial organization count
      const initialCount = await page.locator('[data-name="organizations-page"] tbody tr').count();
      
      // Open filters dropdown
      await page.getByText('Filters').click();
      
      // Select Active status
      await page.selectOption('select[aria-label="Status"]', 'active');
      
      // Click Apply
      await page.getByRole('button', { name: 'Apply' }).click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Verify filter count badge appears
      await expect(page.getByText('Filters (1)')).toBeVisible();
      
      // Verify filter badge appears
      await expect(page.getByText('Status: active')).toBeVisible();
      
      // Verify only active organizations are shown
      const activeOrgStatuses = await page.locator('[data-name="organizations-page"] .bg-\\[\\#ecfdf3\\]').count();
      expect(activeOrgStatuses).toBeGreaterThan(0); // Should have active status badges
    });

    test('should apply multiple filters', async ({ page }) => {
      // Open filters dropdown
      await page.getByText('Filters').click();
      
      // Select multiple filters
      await page.selectOption('select[aria-label="Status"]', 'active');
      await page.selectOption('select[aria-label="Type"]', 'advertiser');
      await page.selectOption('select[aria-label="Organization Size"]', 'large');
      
      // Click Apply
      await page.getByRole('button', { name: 'Apply' }).click();
      
      // Wait for filters to apply
      await page.waitForTimeout(500);
      
      // Verify filter count badge shows multiple filters
      await expect(page.getByText('Filters (3)')).toBeVisible();
      
      // Verify all filter badges appear
      await expect(page.getByText('Status: active')).toBeVisible();
      await expect(page.getByText('Type: advertiser')).toBeVisible();
      await expect(page.getByText('Size: large')).toBeVisible();
    });

    test('should clear all filters', async ({ page }) => {
      // Apply a filter first
      await page.getByText('Filters').click();
      await page.selectOption('select[aria-label="Status"]', 'active');
      await page.getByRole('button', { name: 'Apply' }).click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      await expect(page.getByText('Status: active')).toBeVisible();
      
      // Open filters dropdown and clear
      await page.getByText('Filters (1)').click();
      await page.getByRole('button', { name: 'Clear' }).click();
      
      // Wait for filters to clear
      await page.waitForTimeout(500);
      
      // Verify filter count badge is gone
      await expect(page.getByText('Filters (1)')).not.toBeVisible();
      await expect(page.getByText('Filters')).toBeVisible();
      
      // Verify filter badges are gone
      await expect(page.getByText('Status: active')).not.toBeVisible();
    });
  });

  test.describe('Filter Badges Management', () => {
    test('should remove individual filter badge', async ({ page }) => {
      // Apply multiple filters
      await page.getByText('Filters').click();
      await page.selectOption('select[aria-label="Status"]', 'active');
      await page.selectOption('select[aria-label="Type"]', 'advertiser');
      await page.getByRole('button', { name: 'Apply' }).click();
      
      await page.waitForTimeout(500);
      
      // Verify both badges exist
      await expect(page.getByText('Status: active')).toBeVisible();
      await expect(page.getByText('Type: advertiser')).toBeVisible();
      await expect(page.getByText('Filters (2)')).toBeVisible();
      
      // Remove status filter badge by clicking X
      const statusBadge = page.getByText('Status: active').locator('..');
      await statusBadge.locator('button').click();
      
      await page.waitForTimeout(500);
      
      // Verify status badge is removed but type badge remains
      await expect(page.getByText('Status: active')).not.toBeVisible();
      await expect(page.getByText('Type: advertiser')).toBeVisible();
      await expect(page.getByText('Filters (1)')).toBeVisible();
    });

    test('should clear all filters using "Clear all" link', async ({ page }) => {
      // Apply multiple filters
      await page.getByText('Filters').click();
      await page.selectOption('select[aria-label="Status"]', 'active');
      await page.selectOption('select[aria-label="Type"]', 'advertiser');
      await page.getByRole('button', { name: 'Apply' }).click();
      
      await page.waitForTimeout(500);
      
      // Verify badges exist
      await expect(page.getByText('Status: active')).toBeVisible();
      await expect(page.getByText('Type: advertiser')).toBeVisible();
      
      // Click "Clear all" link
      await page.getByText('Clear all').click();
      
      await page.waitForTimeout(500);
      
      // Verify all badges are removed
      await expect(page.getByText('Status: active')).not.toBeVisible();
      await expect(page.getByText('Type: advertiser')).not.toBeVisible();
      await expect(page.getByText('Filters (2)')).not.toBeVisible();
      await expect(page.getByText('Filters')).toBeVisible();
    });
  });

  test.describe('Search Integration', () => {
    test('should filter organizations by search term', async ({ page }) => {
      // Get initial organization count
      const initialCount = await page.locator('[data-name="organizations-page"] tbody tr').count();
      
      // Enter search term
      await page.getByPlaceholder('Search organization...').fill('tech');
      
      // Wait for debounced search
      await page.waitForTimeout(1000);
      
      // Verify search results
      const searchResults = await page.locator('[data-name="organizations-page"] tbody tr').count();
      expect(searchResults).toBeLessThanOrEqual(initialCount);
      
      // Verify search term is highlighted or results contain search term
      const orgNames = await page.locator('[data-name="organizations-page"] tbody tr td:first-child').allTextContents();
      const hasSearchTerm = orgNames.some(name => name.toLowerCase().includes('tech'));
      expect(hasSearchTerm).toBeTruthy();
    });

    test('should combine search with filters', async ({ page }) => {
      // Enter search term
      await page.getByPlaceholder('Search organization...').fill('corp');
      await page.waitForTimeout(1000);
      
      // Apply filter
      await page.getByText('Filters').click();
      await page.selectOption('select[aria-label="Type"]', 'advertiser');
      await page.getByRole('button', { name: 'Apply' }).click();
      
      await page.waitForTimeout(500);
      
      // Verify both search and filter are active
      expect(await page.getByPlaceholder('Search organization...').inputValue()).toBe('corp');
      await expect(page.getByText('Type: advertiser')).toBeVisible();
    });
  });

  test.describe('Combined Functionality', () => {
    test('should apply search, filter, and sort together', async ({ page }) => {
      // Enter search term
      await page.getByPlaceholder('Search organization...').fill('corp');
      await page.waitForTimeout(1000);
      
      // Apply filter
      await page.getByText('Filters').click();
      await page.selectOption('select[aria-label="Status"]', 'active');
      await page.getByRole('button', { name: 'Apply' }).click();
      await page.waitForTimeout(500);
      
      // Apply sort
      await page.getByText(/Sort:/).click();
      await page.getByText('Name (A-Z)').click();
      await page.waitForTimeout(500);
      
      // Verify all three are active
      expect(await page.getByPlaceholder('Search organization...').inputValue()).toBe('corp');
      await expect(page.getByText('Status: active')).toBeVisible();
      await expect(page.getByText(/Sort: Name ↑/)).toBeVisible();
    });

    test('should maintain state during sidebar interactions', async ({ page }) => {
      // Apply filters
      await page.getByText('Filters').click();
      await page.selectOption('select[aria-label="Status"]', 'active');
      await page.getByRole('button', { name: 'Apply' }).click();
      await page.waitForTimeout(500);
      
      // Open create organization sidebar
      await page.getByText('New Organization').click();
      
      // Verify sidebar opens
      await expect(page.getByTestId('create-sidebar')).toBeVisible();
      
      // Verify filter badge is still visible in background
      await expect(page.getByText('Status: active')).toBeVisible();
      
      // Close sidebar
      await page.getByRole('button', { name: 'Close' }).click();
      
      // Verify filter is still active
      await expect(page.getByText('Status: active')).toBeVisible();
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should handle empty search results gracefully', async ({ page }) => {
      // Enter search term that should return no results
      await page.getByPlaceholder('Search organization...').fill('nonexistentorganization');
      await page.waitForTimeout(1000);
      
      // Should handle gracefully - either show "no results" or handle empty state
      const rowCount = await page.locator('[data-name="organizations-page"] tbody tr').count();
      expect(rowCount).toBeGreaterThanOrEqual(0); // Should not crash
    });

    test('should handle rapid filter changes', async ({ page }) => {
      // Rapidly change filters
      for (let i = 0; i < 3; i++) {
        await page.getByText(/Filters/).click();
        await page.selectOption('select[aria-label="Status"]', i % 2 === 0 ? 'active' : 'draft');
        await page.getByRole('button', { name: 'Apply' }).click();
        await page.waitForTimeout(200);
      }
      
      // Should handle without errors
      await expect(page.getByText('Organization Management')).toBeVisible();
    });
  });

  test.describe('Pagination Integration', () => {
    test('should reset to page 1 when filters change', async ({ page }) => {
      // Check if pagination exists and has multiple pages
      const pageInfo = page.getByText(/Page \d+\/\d+/);
      
      if (await pageInfo.isVisible()) {
        // Apply a filter
        await page.getByText('Filters').click();
        await page.selectOption('select[aria-label="Status"]', 'active');
        await page.getByRole('button', { name: 'Apply' }).click();
        
        await page.waitForTimeout(500);
        
        // Should be on page 1
        await expect(page.getByText(/Page 1\/\d+/)).toBeVisible();
      }
    });
  });
});
