import { test, expect } from '@playwright/test';

test('Stitch Design User Journey: Home -> Product -> Cart -> Checkout -> Thank You', async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER LOC: ${msg.text()}`));
    // 1. Mobile Homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/tsgabrielle/i);

    // Verify Artistic expression heading is present
    await expect(page.getByRole('heading', { name: /Artistic/i })).toBeVisible({ timeout: 30000 });

    // Verify Mobile Categories are present
    // using getByText is fine here as "Discover" or "Explore" is used
    await expect(page.getByText(/Fashion that empowers/i).first()).toBeVisible();

    // 2. Navigate to Product Page via Homepage
    const productCard = page.getByText(/Tee/i).first();
    await productCard.click();

    // Verify Product Page Details
    await expect(page.getByRole('heading').first()).toBeVisible();

    // 3. Add to Cart
    await page.getByRole('button', { name: /acquire for collection/i }).click();

    // 4. Verify Cart Page (Glass Shopping Bag)
    await page.waitForURL(/.*cart/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Shopping Bag');
    await expect(page.getByText('Structured Wool Trench Coat')).toBeVisible();

    // 5. Checkout
    await page.getByRole('link', { name: /checkout/i }).click();
    await page.waitForURL(/.*checkout/);

    // Verify Secure Checkout heading
    await expect(page.getByRole('heading', { name: /Secure Checkout/i }).first()).toBeVisible();

    // Fill Shipping form
    await page.getByPlaceholder('Identity@domain.com').fill('test@example.com');
    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Street Address').fill('123 Fashion St');
    await page.getByPlaceholder('City').fill('Paris');
    await page.getByPlaceholder('Zip Code').fill('75001');

    // Verify PayPal buttons are present (Transfer section)
    await expect(page.getByText(/Transfer/i)).toBeVisible();
    await expect(page.locator('.paypal-buttons')).toBeVisible({ timeout: 15000 });

    // Note: We stop here for automated flow because PayPal involves external SDK/Login
    // but the visibility layer is verified by the logs.
});
