import { test, expect } from '@playwright/test';

test.describe('Admin Panel Verification', () => {
  test('should redirect unauthenticated users to sign-in', async ({ page }) => {
    // Navigate directly to admin
    await page.goto(`/admin`);
    
    // Check if redirected to sign-in
    await expect(page).toHaveURL(/.*\/auth\/sign-in.*/);
    
    // Check for "Sign In" title or heading to confirm we are on the right page
    const heading = page.getByRole('heading', { name: /Sign In/i });
    await expect(heading).toBeVisible();
  });

  test('should show Google Sign-In option', async ({ page }) => {
    await page.goto(`/auth/sign-in`);
    
    // Look for the Google button text
    const googleButton = page.getByText(/Continue with Google/i);
    await expect(googleButton).toBeVisible();
  });
});
