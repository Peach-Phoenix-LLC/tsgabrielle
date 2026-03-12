/**
 * scripts/check-vercel-logs.js
 * Diagnoses 500 errors by pulling the latest function logs via Vercel CLI.
 */

const { execSync } = require('child_process');

console.log('🔍 Inspecting Vercel production logs for 500 errors...');

try {
  // Pulls the last 20 lines of logs from the production deployment
  const logs = execSync('vercel logs tsgabrielle.us --limit 20', { encoding: 'utf8' });
  
  if (logs.includes('500') || logs.toLowerCase().includes('error')) {
    console.log('❌ Found potential errors in logs:\n');
    console.log(logs);
  } else {
    console.log('✅ No obvious 500 errors found in the last 20 log entries.');
    console.log('Try visiting the site and running this script again immediately.');
  }
} catch (error) {
  console.error('✘ Failed to fetch logs. Ensure Vercel CLI is authenticated.');
  console.error(error.message);
}