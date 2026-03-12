/**
 * scripts/setup-github-auth.js
 * Configures the local git remote to use a Personal Access Token (PAT).
 * This enables the "Immediate Push" rule in GEMINI.md for tsgabrielle®.
 * 
 * Usage: node scripts/setup-github-auth.js <your_pat>
 */

const { execSync } = require('child_process');

const pat = process.argv[2];

if (!pat) {
  console.error('❌ Please provide your GitHub PAT as an argument.');
  process.exit(1);
}

try {
  const remoteUrl = execSync('git remote get-url origin').toString().trim();
  // Convert https://github.com/owner/repo.git to https://<pat>@github.com/owner/repo.git
  const authenticatedUrl = remoteUrl.replace('https://', `https://${pat}@`);
  
  execSync(`git remote set-url origin "${authenticatedUrl}"`);
  console.log('✅ Git remote "origin" updated for tsgabrielle® with PAT. You can now push seamlessly.');
} catch (error) {
  console.error('❌ Failed to update git remote:', error.message);
  process.exit(1);
}