const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
let envContent = fs.readFileSync(envPath, 'utf-8');

const newToken = process.argv[2];

if (!newToken) {
    console.error('❌ Please provide the new Printful token as an argument.');
    process.exit(1);
}

// Update PRINTFUL_API_KEY and PRINTFUL_ACCESS_TOKEN
envContent = envContent.replace(/PRINTFUL_API_KEY\s*=\s*['"]?[^'"\r\n]+['"]?/g, 'PRINTFUL_API_KEY="' + newToken + '"');
envContent = envContent.replace(/PRINTFUL_ACCESS_TOKEN\s*=\s*['"]?[^'"\r\n]+['"]?/g, 'PRINTFUL_ACCESS_TOKEN="' + newToken + '"');

fs.writeFileSync(envPath, envContent);
console.log('Updated .env.local with new Printful token.');
