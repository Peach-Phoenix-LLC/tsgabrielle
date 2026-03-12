// scripts/perform-cleanup.js
// Executable script for the File Audit plan (2026-03-10)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

// Files to remove from git
const FILES_TO_GIT_RM = [
  'src/components/Header.jsx',
  'src/components/Footer.jsx',
  'content/legal-hub.md',
  'tsconfig.tsbuildinfo',
];

// Files to delete (untracked or generated)
const FILES_TO_DELETE = [
  'refresh_printful.js',
  'test_printful.js',
  'out.txt',
  'page_content.txt',
  'playwright_output.txt',
  'users.txt',
  'gateway_restart.log',
  'gateway_startup.log',
  'pw_err.log',
  'vercel_domain_fix.log',
];

// Directories to attempt to remove (if empty)
const DIRS_TO_REMOVE = [
  'src/components',
  'src',
  'content',
];

console.log('⚡ Running Gemini File Audit Cleanup...');

// 1. git rm
FILES_TO_GIT_RM.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  if (fs.existsSync(fullPath)) {
    try {
      console.log(`git rm: ${file}`);
      execSync(`git rm -f "${file}"`, { cwd: ROOT_DIR, stdio: 'inherit' });
    } catch (e) {
      console.warn(`Could not git rm ${file}, attempting file deletion.`);
      try { fs.unlinkSync(fullPath); } catch (err) {}
    }
  }
});

// 2. Delete patterns (tmp_*.js) and specific files
const rootFiles = fs.readdirSync(ROOT_DIR);
const tmpFiles = rootFiles.filter(f => f.startsWith('tmp_') && f.endsWith('.js'));

[...FILES_TO_DELETE, ...tmpFiles].forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  if (fs.existsSync(fullPath)) {
    console.log(`Deleting: ${file}`);
    fs.unlinkSync(fullPath);
  }
});

// 3. Remove weird directory artifact from the plan
const weirdDir = path.join(ROOT_DIR, 'C:UsersChrisWorkDocumentstsgabrielledocsplans');
if (fs.existsSync(weirdDir)) {
  console.log('Removing accidental directory artifact...');
  fs.rmSync(weirdDir, { recursive: true, force: true });
}

// 4. Remove legacy directories if empty
DIRS_TO_REMOVE.forEach(dir => {
  const fullPath = path.join(ROOT_DIR, dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmdirSync(fullPath);
      console.log(`Removed empty dir: ${dir}`);
    } catch (e) {
      // Directory not empty or not found
    }
  }
});

console.log('✅ Cleanup complete.');