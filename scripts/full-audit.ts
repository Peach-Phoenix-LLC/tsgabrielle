import { chromium } from 'playwright';

async function checkUrl(page: any, url: string, name: string): Promise<boolean> {
  console.log(`Auditing ${name}: ${url}...`);
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const status = response?.status();
    console.log(`  - Status: ${status}`);
    if (status !== 200) {
      console.error(`  - FAILED: Expected 200, got ${status}`);
      return false;
    }
    return true;
  } catch (e: any) {
    console.error(`  - ERROR: ${e.message}`);
    return false;
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = {
    availability: true,
    redirects: true,
    redesign: true
  };

  // 1. Availability Checks
  const routes = [
    { url: 'https://tsgabrielle.us/', name: 'Homepage' },
    { url: 'https://tsgabrielle.us/categories', name: 'Categories' },
    { url: 'https://tsgabrielle.us/collections', name: 'Collections' },
    { url: 'https://tsgabrielle.us/1001', name: 'Product Page' },
    { url: 'https://tsgabrielle.us/checkout', name: 'Checkout' },
    { url: 'https://tsgabrielle.us/privacy-policy', name: 'Privacy Policy' }
  ];

  for (const route of routes) {
    const success = await checkUrl(page, route.url, route.name);
    if (!success) results.availability = false;
  }

  // 2. Redirect Verification
  console.log('Verifying Redirect: https://tsgabrielle.us/product/prism-tee');
  await page.goto('https://tsgabrielle.us/product/prism-tee');
  console.log('  - Final URL:', page.url());
  if (page.url().includes('/product/')) {
    console.error('  - FAILED: Redirect did not occur');
    results.redirects = false;
  }

  // 3. Redesign Verification (on a product page)
  console.log('Verifying Redesign on Product Page...');
  await page.goto('https://tsgabrielle.us/1001');
  const hasTabs = await page.locator('button:has-text("Premium Features")').isVisible();
  const hasGallery = await page.locator('section.relative.h-\\[85vh\\]').isVisible();
  console.log('  - Premium Tabs present:', hasTabs);
  console.log('  - Fullscreen Gallery present:', hasGallery);
  if (!hasTabs || !hasGallery) results.redesign = false;

  await browser.close();

  console.log('\n--- AUDIT SUMMARY ---');
  console.log(`Availability: ${results.availability ? 'PASS' : 'FAIL'}`);
  console.log(`Redirects:    ${results.redirects ? 'PASS' : 'FAIL'}`);
  console.log(`Redesign:     ${results.redesign ? 'PASS' : 'FAIL'}`);
  
  if (Object.values(results).every(v => v)) {
    console.log('\nDEPLOYMENT STATUS: PASS ✅');
  } else {
    console.log('\nDEPLOYMENT STATUS: FAILED ❌ (Needs repair)');
    process.exit(1);
  }
})();
