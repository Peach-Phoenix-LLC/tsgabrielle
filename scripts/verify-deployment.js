/**
 * scripts/verify-deployment.js
 * Comprehensive verification of the live production environment at tsgabrielle.us.
 */

const LIVE_URL = 'https://tsgabrielle.us';

async function verify() {
  console.log(`🚀 Starting production verification for: ${LIVE_URL}`);

  try {
    const start = Date.now();
    const response = await fetch(LIVE_URL);
    const duration = Date.now() - start;

    console.log(`\n--- [Connection] ---`);
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Latency: ${duration}ms`);

    console.log(`\n--- [Security Headers] ---`);
    const headers = [
      'x-frame-options',
      'x-content-type-options',
      'referrer-policy',
      'strict-transport-security'
    ];
    headers.forEach(h => {
      console.log(`${h.padEnd(26)}: ${response.headers.get(h) || '❌ MISSING'}`);
    });

    const html = await response.text();
    console.log(`\n--- [Brand Identity] ---`);
    const markers = [
      { name: "Brand Logo (tsgabrielle®)", pattern: /tsgabrielle®/i },
      { name: "Slogan (French Trans Touch™)", pattern: /The French Trans Touch™/i },
      { name: "Framework (Next.js)", pattern: /_next/ }
    ];

    markers.forEach(m => {
      console.log(`${m.name.padEnd(26)}: ${m.pattern.test(html) ? '✅ PASS' : '❌ FAIL'}`);
    });

    console.log(`\n✨ Verification ${response.ok ? 'SUCCESS' : 'FAILED'}: Deployment is ${response.ok ? 'active and healthy' : 'unreachable or erroring'}.`);
  } catch (err) {
    console.error(`\n❌ Critical Error: ${err.message}`);
  }
}

verify();