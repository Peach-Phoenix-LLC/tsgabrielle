import { test, expect } from '@playwright/test';

test('verify paris collection update', async ({ page }) => {
  const PREVIEW_URL = 'https://tsgabrielle-live-ine7rro8n-tsg3.vercel.app';
  
  await page.goto(`${PREVIEW_URL}/collections/paris`);
  
  // Wait for the description to be visible
  const description = page.locator('p:has-text("The PARIS collection embodies the soul of tsgabrielle®")');
  await expect(description).toBeVisible();
  
  // Verify short description
  const shortDescription = page.getByText('Parisian elegance meets modern luxury streetwear — refined, bold, and unmistakably tsgabrielle®.');
  await expect(shortDescription).toBeVisible();
});
