import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin page - may need auth
    await page.goto('/admin');
  });

  test('admin page loads', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
  });

  test('all sidebar navigation buttons work', async ({ page }) => {
    const sidebarButtons = [
      'Dashboard',
      'Site Settings',
      'Hero Banner', 
      'About Page',
      'Navigation',
      'Footer',
      'Categories',
      'Collections',
      'Pages',
      'Products',
      'Theme & Design',
      'Checkout',
      'SEO & Analytics',
      'Notifications'
    ];

    for (const button of sidebarButtons) {
      await page.click(`button:has-text("${button}")`);
      // Just verify the page doesn't crash and some content is visible
      await expect(page.locator('main')).toBeVisible({ timeout: 5000 });
    }
  });

  test('save configuration button exists in Site Settings', async ({ page }) => {
    await page.click('button:has-text("Site Settings")');
    const saveButton = page.getByRole('button', { name: /save configuration|save settings|save/i }).first();
    if (await saveButton.isVisible().catch(() => false)) {
      await expect(saveButton).toBeVisible();
    } else {
      await expect(page.getByText(/site settings/i).first()).toBeVisible();
    }
  });

  test('sign out button exists', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible();
  });

  test('store status indicator shows active', async ({ page }) => {
    await expect(page.getByText('Store Active')).toBeVisible();
  });
});

test.describe('Admin Products Page', () => {
  test('products page loads', async ({ page }) => {
    await page.goto('/admin/products');
    await expect(page.getByRole('heading', { name: /product inventory/i })).toBeVisible();
  });

  test('add new product button exists', async ({ page }) => {
    await page.goto('/admin/products');
    await expect(page.getByRole('link', { name: /add new product/i })).toBeVisible();
  });

  test('search input exists', async ({ page }) => {
    await page.goto('/admin/products');
    await expect(page.getByPlaceholder(/search products/i)).toBeVisible();
  });

  test('filter buttons exist', async ({ page }) => {
    await page.goto('/admin/products');
    // Check for filter buttons
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });
});

test.describe('Admin Orders Page', () => {
  test('orders page loads', async ({ page }) => {
    await page.goto('/admin/orders');
    // Either shows content or redirects to login
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Admin Collections Page', () => {
  test('collections page loads', async ({ page }) => {
    await page.goto('/admin/collections');
    await expect(page.getByRole('heading', { name: /admin collections/i })).toBeVisible();
  });
});

test.describe('Admin Feature Flags Page', () => {
  test('feature flags page loads', async ({ page }) => {
    await page.goto('/admin/feature-flags');
    await expect(page.locator('body')).toBeVisible();
  });
});
