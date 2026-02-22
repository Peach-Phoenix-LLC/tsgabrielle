import { test, expect } from '@playwright/test';

test.describe('Production Smoke Tests', () => {

    test.use({ baseURL: 'https://tsgabrielle.us' });

    test('User Flow: Homepage to Collection to Product to Cart', async ({ page }) => {
        // 1. Visit Homepage
        await page.goto('/');
        await expect(page).toHaveTitle(/tsgabrielle/i);

        // 2. Click "Shop" or go to the primary Product Details Page
        await page.goto('/product/tsg-acc-001');

        // Wait for PDP to load and confirm we see standard PDP headers like "Add to Bag"
        await expect(page.locator('h1')).toBeVisible();

        // 4. Interaction Add to Bag
        // The Add to Bag button could have a "Add to Bag" text 
        await page.getByRole('button', { name: /Add to Bag/i }).click();

        // Assert it changes to Added to Bag! or Cart UI updates (since we use a Cart Store)
        await expect(page.getByRole('button', { name: /Added to Bag/i })).toBeVisible({ timeout: 5000 });

        // Go to Cart
        await page.goto('/cart');

        // Assert we have a Checkout button
        await expect(page.getByRole('link', { name: /Secure Checkout/i })).toBeVisible();
    });

    test('Admin Route is Protected', async ({ page }) => {
        // Go to admin page
        await page.goto('/admin');

        // Assert that because no session exists, it redirect to /login or /
        // Just verify we aren't seeing an Admin Dashboard h1
        await page.waitForLoadState('networkidle');
        const adminText = page.locator('text=Admin Dashboard');
        await expect(adminText).toBeHidden();

        // We should be redirected since the middleware protects it
        expect(page.url()).not.toContain('/admin');
    });

});
