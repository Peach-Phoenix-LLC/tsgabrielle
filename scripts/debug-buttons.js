const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    console.log('Loading page...');
    await page.goto('https://tsgabrielle.us/Edition-Spatiale-Coffee-Mug', { waitUntil: 'networkidle' });
    
    // Wait for any button to appear
    await page.waitForSelector('button', { timeout: 10000 }).catch(() => console.log('No buttons appeared after 10s'));

    const buttons = await page.$$eval('button', bs => bs.map(b => b.innerText));
    console.log('Buttons found:', buttons);
    
    const links = await page.$$eval('a', as => as.map(a => ({ text: a.innerText, href: a.href })));
    console.log('Links found (first 10):', links.slice(0, 10));
    
    await browser.close();
})();
