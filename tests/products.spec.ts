import { test, expect } from '@playwright/test';

test.describe('Product Discovery & Details', () => {
  test('product page loads with details', async ({ page }) => {
    // Navigate directly to a known product
    await page.goto('/product/sample-luxury-handbag');
    
    // Check that product title is visible - use heading role
    await expect(page.getByRole('heading').first()).toBeVisible();
    
    // Check for any button on the page (Add to Cart, Buy Now, etc.)
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('categories page shows categories', async ({ page }) => {
    await page.goto('/categories');
    
    // Check that categories page loads with heading
    await expect(page.getByRole('heading', { name: /categories/i }).first()).toBeVisible();
  });
});
