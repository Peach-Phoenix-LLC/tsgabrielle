const fs = require('fs');
const token = process.argv[2];

if (!token) {
    console.error('❌ Please provide the Printful token as an argument.');
    process.exit(1);
}

fs.appendFileSync('.env.local', `\nPRINTFUL_API_KEY="${token}"\nPRINTFUL_ACCESS_TOKEN="${token}"\n`);
console.log('Successfully appended Printful keys to .env.local');