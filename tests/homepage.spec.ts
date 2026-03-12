import { test, expect } from '@playwright/test';

test.describe('Homepage & Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/tsgabrielle/i);
    
    // Check for main content area to ensure page rendered
    await expect(page.locator('main')).toBeVisible();
  });

  test('navigation to categories works', async ({ page }) => {
    await page.goto('/categories/beaute-beauty');
    
    // Verify we navigated to the category page
    await expect(page).toHaveURL(/.*beaute-beauty/);
  });

  test('collections page loads', async ({ page }) => {
    await page.goto('/collections');
    
    // Check that collections page has content - use heading
    await expect(page.getByRole('heading', { name: 'All Collections' })).toBeVisible();
  });
});
