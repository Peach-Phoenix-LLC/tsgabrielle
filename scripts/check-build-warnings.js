/**
 * scripts/check-build-warnings.js
 * Pulls the latest build logs from Vercel to check for warnings or errors.
 */

const { execSync } = require('child_process');

console.log('🏗️  Checking Vercel build logs for tsgabrielle.us...');

try {
  // Pulls build logs using the --build flag
  const logs = execSync('vercel logs tsgabrielle.us --build --limit 50', { encoding: 'utf8' });
  
  const warnings = logs.split('\n').filter(line => 
    /warn|warning/i.test(line) && !/node_modules/i.test(line)
  );

  if (warnings.length > 0) {
    console.log(`⚠️ Found ${warnings.length} warnings in build logs:\n`);
    warnings.forEach(w => console.log(w));
  } else {
    console.log('✅ No warnings found in the recent build logs.');
  }
} catch (error) {
  console.error('✘ Failed to fetch build logs. Ensure Vercel CLI is authenticated.');
  console.error(error.message);
}