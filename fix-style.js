const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const styleBlock = \`
      <style>{\\\`
        @keyframes flowUp {
          0% { top: 100%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }
      \\\`}</style>
      <motion.div\`;

content = content.replace('<motion.div', styleBlock);
fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
