const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

// The easiest way is to just find `<div key={i} className="absolute` down to `>` and wipe it out.
const startStr = `<div key={i} className="absolute`;
const parts = content.split(startStr);
if (parts.length === 2) {
    const afterGT = parts[1].substring(parts[1].indexOf('>') + 1);
    content = parts[0] + `<div key={i} className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5" style={{ transform: \\\`rotate(\${angle}deg) translateY(-145px)\\\` }}>` + afterGT;
    fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
    console.log('Fixed DOM successfully.');
}
