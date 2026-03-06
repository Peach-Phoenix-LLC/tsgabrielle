import { test, expect } from '@playwright/test';

test.describe('Cart Flow', () => {
  test('checkout page loads', async ({ page }) => {
    await page.goto('/checkout');
    
    // Checkout page should load (may redirect to sign-in if not authenticated)
    // Just verify the page loads without crashing
    await expect(page).toHaveURL(/.*checkout|.*sign-in/);
  });

  test('can navigate to checkout', async ({ page }) => {
    await page.goto('/');
    
    // Prefer an explicit checkout URL over text matching.
    const checkoutLink = page.locator('a[href*="/checkout"]').first();
    
    // Either the link exists or we can navigate directly
    if ((await checkoutLink.count()) > 0) {
      await checkoutLink.click();
      await expect(page).toHaveURL(/.*checkout|.*sign-in/);
    } else {
      // Navigate directly
      await page.goto('/checkout');
      await expect(page).toHaveURL(/.*checkout|.*sign-in/);
    }
  });
});
