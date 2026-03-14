const { chromium } = require('playwright');

async function runCheckoutTest() {
    console.log('Starting Autonomous Checkout Test for tsgabrielle.us');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // 1. Visit Home
        await page.goto('https://tsgabrielle.us');
        console.log('✓ Homepage loaded');

        // 2. Go to a specific product
        await page.goto('https://tsgabrielle.us/Edition-Spatiale-Coffee-Mug');
        console.log('✓ Product page loaded');

        // 3. Add to Bag
        const addToBag = page.getByRole('button', { name: /Acquire for Collection/i });
        await addToBag.click();
        console.log('✓ Clicked Add to Bag');

        // 4. Verify Success
        await page.waitForSelector('text=Added to Bag!', { timeout: 10000 });
        console.log('✓ "Added to Bag" confirmation seen');

        // 5. Go to Cart
        await page.goto('https://tsgabrielle.us/cart');
        console.log('✓ Cart page loaded');

        // 6. Verify Checkout Link
        const checkoutLink = page.getByRole('link', { name: /Secure Checkout/i });
        const isVisible = await checkoutLink.isVisible();
        
        if (isVisible) {
            console.log('✓ SUCCESS: Checkout path is active and visible.');
        } else {
            throw new Error('Checkout button not found in cart.');
        }

    } catch (error) {
        console.error(`✖ TEST FAILED: ${error.message}`);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

runCheckoutTest();
