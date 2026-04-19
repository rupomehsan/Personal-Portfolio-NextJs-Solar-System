const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

// Uh oh, the previous sed command actually executed and duplicated 'className' and 'style'. Let's clean it up perfectly.
const badRegex = /<div key=\{i\} className="absolute top-1\/2 left-1\/2 w-10 h-10 -mt-5 -ml-5" style=\{\{\s*transform:\s*\`rotate\(\$\{angle\}deg\)\s*translateY\(-145px\)\`\s*\}\}\s*className="absolute top-1\/2 left-1\/2 w-10 h-10 -mt-5 -ml-5 sm:\[transform:rotate\(var\(--angle\)\)_translateY\(-175px\)\]"\s*style=\{\{"--angle":\s*\`\$\{angle\}deg\`\}\s*as\s*React\.CSSProperties\}>/g;

content = content.replace(badRegex, \`<div key={i} className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5" style={{ transform: \\\`rotate(\${angle}deg) translateY(-145px)\\\` }}>\`);

// Also fix if it was just broken in a slightly different way. Let's just find the whole <div> block and replace it using string split if needed
