const fs = require('fs');
const path = require('path');

const root = process.cwd();
const src = path.join(root, 'src');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

console.log('--- Cleaning console.log ---');
walk(src, (file) => {
    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('console.log(')) {
            console.log(`Cleaning ${file}`);
            // Match console.log(anything) including multi-line
            const newContent = content.replace(/console\.log\([\s\S]*?\);?/g, '');
            fs.writeFileSync(file, newContent);
        }
    }
});

console.log('--- Removing Unused Folders ---');
const foldersToDelete = [
    'src/components/Stitch',
    'src/components/Iridescence',
    'src/components/Navbar',
    'src/components/Hero',
    'src/components/Product',
    'src/components/Footer' // The folder, not the component if component is Footer.tsx
];

foldersToDelete.forEach(folder => {
    const p = path.join(root, folder);
    if (fs.existsSync(p)) {
        console.log(`Deleting ${folder}`);
        fs.rmSync(p, { recursive: true, force: true });
    }
});

const filesToDelete = [
    'src/components/HolographicHero.tsx',
    'src/components/ProductCard.tsx'
];

filesToDelete.forEach(file => {
    const p = path.join(root, file);
    if (fs.existsSync(p)) {
        console.log(`Deleting ${file}`);
        fs.unlinkSync(p);
    }
});

console.log('Source clean complete.');
