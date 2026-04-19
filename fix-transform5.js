const fs = require('fs');
const content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

const missingHooks = `
  // Extremely professional, subtle 3D multi-layered parallax offsets
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxOrbital = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleOrbital = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityOrbital = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  // High-end 3D Holographic "Exploded View" Scroll Effects
  const rotateXOrbital = useTransform(scrollYProgress, [0, 1], ["0deg", "70deg"]);
  const rotateZOrbital = useTransform(scrollYProgress, [0, 1], ["0deg", "-45deg"]);
  const zExplodeCore = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const zExplodeLines = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const zExplodeR1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const zExplodeR2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const zExplodeR3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const zExplodeR4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 400]);
`;

const scrollHook = '  const [glowClicks, setGlowClicks] = useState(0);';
const newContent = content.replace(scrollHook, scrollHook + '\n' + missingHooks);
fs.writeFileSync('components/sub/hero-content.tsx', newContent);
console.log('Hooks injected properly.');
