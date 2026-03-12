const fs = require('fs');
const path = require('path');

const footerPath = path.resolve(__dirname, '../components/Footer.tsx');

if (!fs.existsSync(footerPath)) {
    console.error("Footer component not found at components/Footer.tsx");
    process.exit(1);
}

let content = fs.readFileSync(footerPath, 'utf8');

console.log("🎨 Enhancing Footer visuals for tsgabrielle®...");

// 1. Increase vertical padding for the primary color section (#a932bd / bg-primary)
// This makes the colored "space" significantly larger.
const bgRegex = /(bg-(?:\[#a932bd\]|primary))\s+py-(\d+)/g;
if (bgRegex.test(content)) {
    content = content.replace(bgRegex, '$1 py-24'); // Set to py-24 (96px) for a luxury feel
    console.log("✅ Increased footer background section padding.");
}

// 2. Increase spacing for the brand icon (BrandLogo)
// We ensure the brand icon has a substantial margin-bottom to command more space.
const logoRegex = /<BrandLogo([^>]*?)className="([^"]*?)"/g;
if (logoRegex.test(content)) {
    content = content.replace(logoRegex, (match, p1, p2) => {
        const newClasses = p2.includes('mb-') ? p2.replace(/mb-\d+/, 'mb-16') : `${p2} mb-16`;
        return `<BrandLogo${p1}className="${newClasses}"`;
    });
    console.log("✅ Increased brand icon spacing (mb-16).");
}

// 3. Increase spacing between social media icons
// We increase the gap to 40px (gap-10), which is more than standard but less than the brand icon's 64px.
const socialRegex = /(gap-)(\d+)([^>]*?social)/g;
if (socialRegex.test(content)) {
    content = content.replace(socialRegex, '$1 10 $3'); 
    console.log("✅ Increased social media icon spacing (gap-10).");
}

fs.writeFileSync(footerPath, content);
console.log("✨ Footer visual updates applied successfully.");