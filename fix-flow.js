const fs = require('fs');
const cssTarget = 'app/globals.css';
let css = fs.readFileSync(cssTarget, 'utf8');

// Replace the dash-flow animation with a continuous drawing flow
css = css.replace(/@keyframes dash-flow {[\s\S]*?}\n\.animate-line-flow {[\s\S]*?}/, `@keyframes dash-flow {
  0% { stroke-dashoffset: 100; opacity: 0; }
  10% { opacity: 1; }
  90% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
.animate-line-flow {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: dash-flow 2.5s ease-out infinite;
}`);
fs.writeFileSync(cssTarget, css);
console.log('Done!');
