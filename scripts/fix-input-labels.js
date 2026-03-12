const fs = require('fs');
const path = require('path');

/**
 * scripts/fix-input-labels.js
 * Automatically associates <input> elements with <label> elements 
 * using 'id' and 'htmlFor' attributes to ensure accessibility compliance.
 */

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

console.log('♿ Running Accessibility Fix: Input Labels...');

const targets = ['app', 'components'];
targets.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    walk(dirPath, (file) => {
        if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            let content = fs.readFileSync(file, 'utf8');
            let originalContent = content;

            // Specific fix for search input as requested
            // Matches <input ... name="search" ...> and ensures it has id="search" and a preceding label
            if (content.includes('name="search"') && !content.includes('htmlFor="search"')) {
                content = content.replace(
                    /<input([^>]*?)name="search"([^>]*?)\/?>/g,
                    (match, p1, p2) => {
                        const hasId = match.includes('id="search"');
                        const input = hasId ? match : `<input${p1}name="search" id="search"${p2} />`;
                        // Using sr-only to keep the label accessible to screen readers but hidden visually if needed
                        return `<label htmlFor="search" className="sr-only">Search</label>\n      ${input}`;
                    }
                );
            }

            if (content !== originalContent) {
                fs.writeFileSync(file, content);
                console.log(`✅ Applied label fix to: ${file}`);
            }
        }
    });
});

console.log('✨ Accessibility fix complete.');