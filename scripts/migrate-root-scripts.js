// scripts/migrate-root-scripts.js
// Moves remaining root scripts to the scripts/ directory to satisfy GEMINI.md rules.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'scripts');

const SCRIPTS_TO_MOVE = [
  'update-env.js',
  'update_buttons.js',
  'push_schema.js',
  'env-patch-v2.js',
  'append-env.js',
  'generate-collections.js',
  'replace-map.js',
  'env-patch.js',
  'test-formats.js',
  'final-verification.js',
  'debug-prisma.js',
  'test_db.js',
  'check_tables.js',
  'test-variants.js',
  'seed-collections.js',
  'seed-update.js',
  'seed-beautiful-config.js'
];

console.log('📦 Migrating root scripts to /scripts...');

if (!fs.existsSync(SCRIPTS_DIR)) {
  fs.mkdirSync(SCRIPTS_DIR);
}

SCRIPTS_TO_MOVE.forEach(file => {
  const oldPath = path.join(ROOT_DIR, file);
  const newPath = path.join(SCRIPTS_DIR, file);

  if (fs.existsSync(oldPath)) {
    try {
      console.log(`Moving: ${file}`);
      // Use git mv to preserve history if the file is tracked
      try {
        execSync(`git mv "${oldPath}" "${newPath}"`, { cwd: ROOT_DIR, stdio: 'ignore' });
      } catch (e) {
        // Fallback to standard rename if not tracked by git
        fs.renameSync(oldPath, newPath);
      }
    } catch (err) {
      console.error(`Error moving ${file}:`, err.message);
    }
  } else {
    console.log(`Skipping: ${file} (not found)`);
  }
});

console.log('✅ Migration complete. Root is now clean.');