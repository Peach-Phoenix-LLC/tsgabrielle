import { test, expect } from '@playwright/test';

test.describe('Short URL Redirection Rule', () => {
  const PREVIEW_URL = 'https://tsgabrielle-live-axudmi474-tsg3.vercel.app'; // Existing preview URL or will be updated after deployment

  test('should redirect /categories/:slug to /:slug', async ({ page }) => {
    // Note: 'hats' is a known category
    await page.goto(`${PREVIEW_URL}/categories/hats`);
    await expect(page).toHaveURL(`${PREVIEW_URL}/hats`);
  });

  test('should redirect /collections/:slug to /:slug', async ({ page }) => {
    // Note: 'paris' is a known collection
    await page.goto(`${PREVIEW_URL}/collections/paris`);
    await expect(page).toHaveURL(`${PREVIEW_URL}/paris`);
  });

  test('should render content via Resolver for slugs without dedicated folders', async ({ page }) => {
    // Note: 'edition-spatiale' might not have a dedicated folder app/edition-spatiale
    // but the resolver should handle it
    await page.goto(`${PREVIEW_URL}/edition-spatiale`);
    // Check for some content that should be there
    await expect(page.getByRole('heading', { name: /ÉDITION SPATIALE/i })).toBeVisible();
  });
});
