const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');
content = content.replace(/\\\`/g, "\`");
fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
console.log('Fixed escape characters.');
