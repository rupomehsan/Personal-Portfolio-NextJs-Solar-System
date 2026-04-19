const fs = require('fs');
const content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

const regex = /\n\s*\/\/ Extremely professional, subtle 3D multi-layered parallax offsets[\s\S]*?\/\/ High-end 3D Holographic "Exploded View" Scroll Effects[\s\S]*?zExplodeR2 = useTransform\(scrollYProgress, \[0, 1\], \[0, 0\]\);/g;

let matches = content.match(regex);
if (matches && matches.length > 1) {
  let newContent = content.replace(regex, '');
  
  // Re-insert once
  const scrollHook = '  const [glowClicks, setGlowClicks] = useState(0);';
  newContent = newContent.replace(scrollHook, scrollHook + Object.values(matches)[0]);
  fs.writeFileSync('components/sub/hero-content.tsx', newContent);
  console.log('Duplicates removed.');
} else {
  console.log('No duplicates found.');
}
