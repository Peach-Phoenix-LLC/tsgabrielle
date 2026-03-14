const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/collections/*/page.tsx');
files.push('src/components/Iridescence/LunaHero/LunaHero.tsx');
files.push('src/components/Iridescence/LunaInfoPanel/LunaInfoPanel.tsx');

const LUXURY_BTN_CLASS = 'py-4 rounded-sm uppercase tracking-widest text-[11px] border border-[#121212] bg-[#121212] text-white hover:bg-transparent hover:text-[#121212] transition-colors duration-500 w-full';
const LUXURY_BTN_WRAPPER_CLASS = 'block w-full no-underline mt-4';

let updatedFiles = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Replace btn-high-vis wrapper class
  const wrapperRegex = /className=\"btn-high-vis-wrapper[^\"]*\"/g;
  if (wrapperRegex.test(content)) {
    content = content.replace(wrapperRegex, 'className=\"' + LUXURY_BTN_WRAPPER_CLASS + '\"');
    changed = true;
  }
  
  // Replace btn-high-vis class
  const btnRegex = /className=\"btn-high-vis[^\"]*\"/g;
  if (btnRegex.test(content)) {
    content = content.replace(btnRegex, 'className=\"' + LUXURY_BTN_CLASS + '\"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    updatedFiles++;
    console.log('Updated: ' + file);
  }
});

console.log('Total files updated: ' + updatedFiles);
