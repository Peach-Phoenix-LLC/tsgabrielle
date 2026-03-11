import * as fs from 'fs';
import * as path from 'path';

function replaceInFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('tsgabrielle™')) {
      const newContent = content.replace(/tsgabrielle™/g, 'tsgabrielle®');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    // Skip common ignored directories
    if (['node_modules', '.git', '.next', '.vercel'].includes(file)) continue;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (stat.isFile()) {
      // Only process text files
      const ext = path.extname(file);
      if (['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json', '.md', '.toml', '.sql'].includes(ext)) {
        replaceInFile(filePath);
      }
    }
  }
}

console.log('Starting global replacement of tsgabrielle™ to tsgabrielle®...');
walkDir('C:\\Users\\ChrisWork\\Documents\\tsgabrielle');
console.log('Replacement complete.');
