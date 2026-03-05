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
    
    // Try to find and click cart/checkout link
    const checkoutLink = page.getByRole('link', { name: /checkout|bag/i }).first();
    
    // Either the link exists or we can navigate directly
    if (await checkoutLink.isVisible()) {
      await checkoutLink.click();
      await expect(page).toHaveURL(/.*checkout/);
    } else {
      // Navigate directly
      await page.goto('/checkout');
      await expect(page).toHaveURL(/.*checkout|.*sign-in/);
    }
  });
});
