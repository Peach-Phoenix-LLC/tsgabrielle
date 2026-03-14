const { chromium } = require('playwright');
const fs = require('fs');

async function runSeoAudit(url) {
    console.log(`Starting SEO Audit for: ${url}`);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const results = {
        url,
        timestamp: new Date().toISOString(),
        score: 0,
        checks: []
    };

    try {
        await page.goto(url, { waitUntil: 'networkidle' });

        // 1. Title Check
        const title = await page.title();
        const titleCheck = {
            name: 'Page Title',
            value: title,
            passed: title.length > 10 && title.length < 70,
            message: title.length === 0 ? 'Missing title' : (title.length < 10 ? 'Title too short' : (title.length > 70 ? 'Title too long' : 'Optimal length'))
        };
        results.checks.push(titleCheck);

        // 2. Meta Description
        const metaDescription = await page.$eval('meta[name="description"]', el => el.content).catch(() => null);
        results.checks.push({
            name: 'Meta Description',
            value: metaDescription,
            passed: !!metaDescription && metaDescription.length > 50,
            message: !metaDescription ? 'Missing meta description' : (metaDescription.length < 50 ? 'Description too short' : 'Present')
        });

        // 3. H1 Check
        const h1s = await page.$$eval('h1', els => els.map(el => el.innerText));
        results.checks.push({
            name: 'H1 Tag',
            value: h1s.length,
            passed: h1s.length === 1,
            message: h1s.length === 0 ? 'Missing H1' : (h1s.length > 1 ? 'Multiple H1s found' : 'Correct (1 H1)')
        });

        // 4. Image Alt Tags
        const images = await page.$$eval('img', els => els.map(el => ({ src: el.src, alt: el.alt })));
        const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '');
        results.checks.push({
            name: 'Image Alt Tags',
            value: `${images.length - missingAlt.length}/${images.length}`,
            passed: missingAlt.length === 0,
            message: missingAlt.length > 0 ? `${missingAlt.length} images missing alt text` : 'All images have alt text'
        });

        // Calculate score
        const passedCount = results.checks.filter(c => c.passed).length;
        results.score = Math.round((passedCount / results.checks.length) * 100);

    } catch (error) {
        console.error(`Audit failed: ${error.message}`);
        results.error = error.message;
    } finally {
        await browser.close();
    }

    const reportPath = 'scripts/seo-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`Audit complete. Report saved to ${reportPath}`);
    console.log(`SEO Score: ${results.score}%`);
    return results;
}

const targetUrl = process.argv[2] || 'https://tsgabrielle.us';
runSeoAudit(targetUrl);
