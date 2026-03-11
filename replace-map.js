const fs = require('fs');
let content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Add import
if (!content.includes('import LiveMap')) {
    content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport LiveMap from "@/components/admin/LiveMap";');
}

// Replace the map code using regex.
// We match from <div className="space-y-6"> to the end of the DashboardOverview function
const regex = /<div className="space-y-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/;

if (regex.test(content)) {
  content = content.replace(regex, '<LiveMap />\n    </div>\n  );\n}');
  fs.writeFileSync('app/admin/page.tsx', content);
  console.log('Successfully replaced map.');
} else {
  console.log('Could not find map boundaries using Regex.');
}
