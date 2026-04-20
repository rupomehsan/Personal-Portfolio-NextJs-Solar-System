const fs = require('fs');

const path = 'components/main/navbar.tsx';
let content = fs.readFileSync(path, 'utf8');

// The exact string to replace
const oldLineRegex = /\{\/\* Continuous connecting hub line \*\/\}\s*<div className="absolute left-\[39\.5px\] group-hover\/sidebar:left-\[47\.5px\][^>]+><\/div>/;

const newLine = `{/* Professional Dynamic Connecting Hub Line */}
        <div className="absolute left-[40px] group-hover/sidebar:left-[56px] -translate-x-1/2 top-[12%] bottom-[12%] w-[2px] transition-all duration-500 ease-in-out z-0 pointer-events-none hidden md:block">
          {/* Base wire */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
          {/* Core glowing fiber */}
          <div className="absolute top-[5%] bottom-[5%] w-full bg-cyan-300/80 shadow-[0_0_12px_rgba(6,182,212,1)] blur-[0.5px]"></div>
          {/* Traveling energy pulse */}
          <div className="absolute top-[10%] w-[4px] h-[30%] -ml-[1px] bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-80 blur-[1px] mix-blend-screen shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-[scan_4s_ease-in-out_infinite]"></div>
        </div>`;

content = content.replace(oldLineRegex, newLine);

// Update gap if someone mistakenly set it to 0
content = content.replace(
  'justify-center gap-0 px-4 group-hover/sidebar:px-6 relative',
  'justify-center gap-2 px-4 group-hover/sidebar:px-6 relative'
);

fs.writeFileSync(path, content, 'utf8');
