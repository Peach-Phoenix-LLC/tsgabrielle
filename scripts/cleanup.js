const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targets = [
    'node_modules',
    '.next',
    'dist',
    '.cache',
    'tsconfig.tsbuildinfo'
];

const root = process.cwd();

console.log('--- Peach Phoenix Deep Clean ---');

// 1. Remove major folders
targets.forEach(target => {
    const p = path.join(root, target);
    if (fs.existsSync(p)) {
        console.log(`Removing ${target}...`);
        try {
            if (fs.lstatSync(p).isDirectory()) {
                // Windows specific rimraf-like command
                execSync(`rmdir /s /q "${p}"`, { stdio: 'inherit' });
            } else {
                fs.unlinkSync(p);
            }
        } catch (e) {
            console.error(`Failed to remove ${target}: ${e.message}`);
        }
    }
});

// 2. Remove orphaned log/temp files in root
const rootFiles = fs.readdirSync(root);
const logExtensions = ['.txt', '.log', '.json', '.html'];
const ignoredFiles = [
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'next.config.ts',
    'tailwind.config.ts',
    'postcss.config.mjs',
    'eslint.config.mjs',
    '.env',
    '.env.local',
    '.env.example',
    '.dockerignore',
    '.gcloudignore',
    '.gitignore',
    'Dockerfile',
    'cloudbuild.yaml',
    'README.md',
    'GEMINI.md'
];

rootFiles.forEach(file => {
    const ext = path.extname(file);
    if (logExtensions.includes(ext) && !ignoredFiles.includes(file)) {
        // Extra safety: check if it's a file
        const p = path.join(root, file);
        if (fs.lstatSync(p).isFile()) {
            console.log(`Removing orphan file: ${file}`);
            fs.unlinkSync(p);
        }
    }
});

console.log('Cleanup complete.');
