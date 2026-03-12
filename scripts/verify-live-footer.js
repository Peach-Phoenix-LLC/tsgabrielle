/**
 * scripts/verify-live-footer.js
 * Verification script for footer visual enhancements (py-24, mb-16, gap-10).
 */

const LIVE_URL = 'https://tsgabrielle.us';

async function verifyFooter() {
  console.log(`🌐 Fetching live site for verification: ${LIVE_URL}...`);

  try {
    const response = await fetch(LIVE_URL);
    const html = await response.text();

    console.log("🔍 Checking for enhanced visual patterns...");

    const checks = [
      { name: "Luxury Vertical Padding (py-24)", pattern: /py-24/ },
      { name: "Brand Logo Margin (mb-16)", pattern: /mb-16/ },
      { name: "Social Icon Spacing (gap-10)", pattern: /gap-10/ }
    ];

    let allPassed = true;
    checks.forEach(check => {
      if (check.pattern.test(html)) {
        console.log(`✅ ${check.name}: FOUND`);
      } else {
        console.log(`❌ ${check.name}: NOT FOUND`);
        allPassed = false;
      }
    });

    if (allPassed) console.log("\n✨ Verification Successful: Footer is live with enhanced visuals.");
    else console.warn("\n⚠️ Verification Incomplete: Some changes may not be deployed yet.");
  } catch (error) {
    console.error("✘ Verification Failed: Could not reach live site.", error.message);
  }
}

verifyFooter();