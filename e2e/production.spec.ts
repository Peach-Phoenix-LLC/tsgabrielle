import { test, expect } from '@playwright/test';

test.describe('Production Smoke Tests', () => {

    // Use baseURL from global config (Cloud Run URL)

    test('User Flow: Homepage to Collection to Product to Cart', async ({ page }) => {
        // 1. Visit Homepage
        await page.goto('/');
        await expect(page).toHaveTitle(/tsgabrielle/i);

        // 2. Click "Shop" or go to the primary Product Details Page
        // Using real SKU from DB
        await page.goto('/product/TSG-MUG-ETB-001');

        // Wait for PDP to load and confirm we see standard PDP headers like "Add to Bag"
        await expect(page.locator('h1')).toBeVisible();

        // 4. Interaction Add to Bag
        // The Add to Bag button has "Acquire for Collection" text 
        await page.getByRole('button', { name: /Acquire for Collection/i }).click();

        // Assert it changes to Added to Bag! or Cart UI updates
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

// Verify that the Google OAuth login button redirects to Google's auth page with correct client ID
test('Google OAuth login redirects correctly', async ({ page }) => {
    await page.goto('/login');
    const googleButton = page.getByRole('button', { name: /continue with google/i });
    await expect(googleButton).toBeVisible();
    await googleButton.click();
    await page.waitForURL((url) => {
        return url.origin === 'https://accounts.google.com' && url.searchParams.get('client_id') === '357687079974-oc446rdspgome2vaeu987f9obsk18od4.apps.googleusercontent.com';
    }, { timeout: 15000 });
    await expect(page.locator('text=Sign in')).toBeVisible();
});
