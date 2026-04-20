const fs = require('fs');

const path = 'components/main/navbar.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace gap-6 with gap-2 or gap-3 and add the relative class and hub line
content = content.replace(
  'justify-center gap-6 px-4 group-hover/sidebar:px-6',
  'justify-center gap-3 px-4 group-hover/sidebar:px-6 relative'
);

const hubLine = '{/* Continuous connecting hub line */}\n          <div className="absolute left-[39.5px] group-hover/sidebar:left-[47.5px] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent transition-all duration-500 -z-10 shadow-[0_0_10px_rgba(6,182,212,0.8)] pointer-events-none"></div>'

content = content.replace(
  '{NAV_LINKS.map((link) => (',
  hubLine + '\n          {NAV_LINKS.map((link) => ('
);

fs.writeFileSync(path, content, 'utf8');

