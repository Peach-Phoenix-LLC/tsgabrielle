import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('sign-in page loads', async ({ page }) => {
    await page.goto('/auth/sign-in');
    
    // Check that sign-in page loads - just verify we have some content
    await expect(page.locator('body')).toBeVisible();
    
    // Check for any form or input elements
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('sign-up page loads', async ({ page }) => {
    await page.goto('/auth/sign-up');
    
    // Check that sign-up page loads
    await expect(page.locator('body')).toBeVisible();
    
    // Check for any input elements
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('account page redirects to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/account');
    
    // Should redirect to sign-in when not authenticated
    await expect(page).toHaveURL(/.*sign-in|.*auth/);
  });
});
