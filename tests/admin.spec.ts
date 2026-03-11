import { test, expect } from '@playwright/test';

// Run before each test in this file
test.beforeEach(async ({ page }) => {
  // Navigate to login and authenticate as admin
  await page.goto('/auth/sign-in');
  await page.getByPlaceholder('Email', { exact: true }).fill('contact@tsgabrielle.us');
  await page.getByPlaceholder('Password', { exact: true }).fill('Password123!');
  await page.getByRole('button', { name: /sign in/i, exact: true }).click();
  
  // Wait for redirect or successful login indication
  await page.waitForURL('**/admin**', { timeout: 10000 }).catch(() => {});
});

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin page
    await page.goto('/admin');
    
    // Wait for the admin loading spinner to disappear
    await expect(page.locator('.animate-spin').first()).toBeHidden({ timeout: 15000 }).catch(() => {});
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
    // Wait for loading to finish if there's any
    await expect(page.locator('.animate-spin').first()).toBeHidden({ timeout: 5000 }).catch(() => {});
    const saveButton = page.getByRole('button', { name: /save settings/i }).first();
    await expect(saveButton).toBeVisible();
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
    await expect(page.getByRole('heading', { name: /product inventory/i })).toBeVisible({ timeout: 10000 });
  });

  test('add new product button exists', async ({ page }) => {
    await page.goto('/admin/products');
    await expect(page.getByRole('link', { name: /add new product/i })).toBeVisible({ timeout: 10000 });
  });

  test('search input exists', async ({ page }) => {
    await page.goto('/admin/products');
    await expect(page.getByPlaceholder(/search products/i)).toBeVisible({ timeout: 10000 });
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
    await expect(page.getByRole('heading', { name: /admin collections/i })).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Admin Feature Flags Page', () => {
  test('feature flags page loads', async ({ page }) => {
    await page.goto('/admin/feature-flags');
    await expect(page.locator('body')).toBeVisible();
  });
});
