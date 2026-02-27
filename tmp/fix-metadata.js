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

            const regexStr = /export const metadata = \{\\n    title: 'Page Title',\\n    description: 'Page description.'\\n\};\\n\\n/g;
            const targetStr = "export const metadata = {\\n    title: 'Page Title',\\n    description: 'Page description.'\\n};\\n\\n";

            let modified = false;
            if (content.includes(targetStr)) {
                content = content.split(targetStr).join("export const metadata = {\n    title: 'Page Title',\n    description: 'Page description.'\n};\n\n");
                modified = true;
            } else if (content.match(regexStr)) {
                content = content.replace(regexStr, "export const metadata = {\n    title: 'Page Title',\n    description: 'Page description.'\n};\n\n");
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(full, content);
                console.log('Fixed:', full);
            }
        }
    }
}

fix('./src/app/(storefront)');
