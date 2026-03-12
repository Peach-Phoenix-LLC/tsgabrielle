import { test, expect } from '@playwright/test';

test('verify paris collection update', async ({ page }) => {
  await page.goto(`/collections/paris`);
  
  // Wait for the description to be visible
  const description = page.locator('p:has-text("The PARIS collection embodies the soul of tsgabrielle®")');
  await expect(description).toBeVisible();
  
  // Verify short description
  const shortDescription = page.getByText('Parisian elegance meets modern luxury streetwear — refined, bold, and unmistakably tsgabrielle®.');
  await expect(shortDescription).toBeVisible();
});
