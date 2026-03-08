const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  console.log("Navigating to http://localhost:3000/auth/sign-in...");
  await page.goto('http://localhost:3000/auth/sign-in');
  
  console.log("Filling form...");
  await page.fill('input[type="email"]', 'contact@tsgabrielle.us');
  await page.fill('input[type="password"]', 'wrongpassword123');
  
  console.log("Clicking Sign In...");
  await page.click('button:has-text("Sign In")');
  
  await page.waitForTimeout(3000);
  
  const loadingText = await page.locator('button:has-text("Signing in...")').count();
  console.log('Still loading?', loadingText > 0);
  
  const errorText = await page.locator('.text-red-600').textContent().catch(() => 'No error shown');
  console.log(`Error on page: ${errorText}`);
  
  console.log("Current URL after click:", page.url());
  
  await browser.close();
})();
