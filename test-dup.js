const fs = require('fs');
const code = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const matches = code.match(/Decorative HUD Connecting Lines/g);
console.log("Number of Decorative HUD Connecting matches: ", matches ? matches.length : 0);
