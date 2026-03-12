const fs = require('fs');
fs.appendFileSync('.env.local', '\nPRINTFUL_API_KEY="0qAeEkQ0PayIrBiGyGTl3gI0hzFQqgwGpAj51Ldt"\nPRINTFUL_ACCESS_TOKEN="0qAeEkQ0PayIrBiGyGTl3gI0hzFQqgwGpAj51Ldt"\n');
console.log('Successfully appended Printful keys to .env.local');
