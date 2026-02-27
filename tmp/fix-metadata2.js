const fs = require('fs');
const path = require('path');

function fix(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            fix(full);
        } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
            let content = fs.readFileSync(full, 'utf8');

            const targetStr = "export const metadata = {\n    title: 'Page Title',\n    description: 'Page description.'\n};\n\n";

            if (content.includes(targetStr)) {
                // just remove it entirely to avoid conflicts with 'use client'
                content = content.replace(targetStr, "");
                fs.writeFileSync(full, content);
                console.log('Removed metadata from:', full);
            }
        }
    }
}

fix('./src/app/(storefront)');
