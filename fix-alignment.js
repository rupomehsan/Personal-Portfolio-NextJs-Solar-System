const fs = require('fs');

let code = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

// Replace inset-0 with explicit top-0 left-0 origin-center
const regex = /className="absolute inset-[0] w-full h-full z-20 animate-\[spin_(.*?)\]"/g;

let count = 0;
code = code.replace(regex, (match, timing) => {
    count++;
    return `className="absolute top-0 left-0 w-full h-full z-20 origin-center animate-[spin_${timing}]"`;
});

// Also fix the SVG wrappers just in case
const svgRegex = /className="absolute inset-[0] pointer-events-none hidden md:block"/g;
code = code.replace(svgRegex, 'className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"');

fs.writeFileSync('components/sub/hero-content.tsx', code);
console.log(`Replaced ${count} tracking wrappers to fix centering offsets!`);
