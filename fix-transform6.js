const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

const regex = /const parallaxOrbital = useTransform\(scrollYProgress, \[0, 1\], \[0, 200\]\);[\s\S]*?const zExplodeR2 = useTransform\(scrollYProgress, \[0, 1\], \[0, -?50\]\);/g;

content = content.replace(regex, '');
fs.writeFileSync('components/sub/hero-content.tsx', content);
console.log('Removed duplicates from second block.');
