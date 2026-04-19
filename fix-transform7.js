const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

const regex = /const zExplodeR3 = useTransform\(scrollYProgress, \[0, 1\], \[0, -150\]\);[\s\S]*?const parallaxBackground = useTransform\(scrollYProgress, \[0, 1\], \[0, 400\]\);/g;

content = content.replace(regex, '');
fs.writeFileSync('components/sub/hero-content.tsx', content);
console.log('Removed duplicates from bottom block.');
