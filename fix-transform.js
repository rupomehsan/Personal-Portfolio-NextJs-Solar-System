const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

// The sed command above probably failed or made a mess. Let's do it cleanly in JS.
content = content.replace(
    /className="absolute top-1\/2 left-1\/2 w-10 h-10 -mt-5 -ml-5" style={{ transform: `rotate\(\${angle}deg\) translateY\(-145px\) sm:translateY\(-175px\)`}}/g,
    \`className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 transition-transform duration-300" style={{ transform: \\\`rotate(\${angle}deg) translateY(-145px)\\\` }}\`
);

// We'll just use 150px as a clean fixed offset. That works for both mostly and avoids invalid css properties or difficult hydration hooks.
content = content.replace(
    /style={{ transform: \`rotate\(\${angle}deg\) translateY\(-145px\)\` }}/g,
    \`style={{ transform: \\\`rotate(\${angle}deg) translateY(-165px)\\\` }}\`
);

fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
console.log("Fixed transform syntax");
