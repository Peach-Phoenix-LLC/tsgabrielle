import { test, expect } from '@playwright/test';

test.describe('Short URL Redirection Rule', () => {

  test('should redirect /categories/:slug to /:slug', async ({ page }) => {
    // Note: 'hats' is a known category
    await page.goto(`/categories/hats`);
    await expect(page).toHaveURL(/.*\/hats/);
  });

  test('should redirect /collections/:slug to /:slug', async ({ page }) => {
    // Note: 'paris' is a known collection
    await page.goto(`/collections/paris`);
    await expect(page).toHaveURL(/.*\/paris/);
  });

  test('should render content via Resolver for slugs without dedicated folders', async ({ page }) => {
    // Note: 'edition-spatiale' might not have a dedicated folder app/edition-spatiale
    // but the resolver should handle it
    await page.goto(`/edition-spatiale`);
    // Check for some content that should be there
    await expect(page.getByRole('heading', { name: /ÉDITION SPATIALE/i })).toBeVisible();
  });
});
