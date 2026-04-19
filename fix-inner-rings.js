const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const regex = /\{\/\* Inner Circular Lines \*\/\}[\s\S]*?\{\/\* Core Image \*\/\}/;

const replacement = \`{/* Inner Circular Lines */}
            {/* Thick glowing inner core separator (solid ring) */}
            <div className="absolute inset-[-6px] sm:inset-[-10px] rounded-full border-[3px] border-cyan-700/80 shadow-[0_0_15px_rgba(6,182,212,0.4)_inset,0_0_15px_rgba(6,182,212,0.4)] pointer-events-none"></div>
            
            {/* Outer gap ring (Dark space for contrast) */}
            <div className="absolute inset-[-12px] sm:inset-[-18px] rounded-full border-[6px] border-[#020617] pointer-events-none z-0"></div>

            {/* Rotating energy current (flow of electricity animation) */}
            <div className="absolute inset-[-14px] sm:inset-[-22px] rounded-full border-[3px] border-transparent border-t-cyan-400 border-r-cyan-400 border-b-cyan-500 animate-[spin_3s_linear_infinite] shadow-[0_0_20px_rgba(34,211,238,0.6)] mix-blend-screen pointer-events-none z-10"></div>
            
            {/* Pulsing faint outer grid/dotted line */}
            <div className="absolute inset-[-24px] sm:inset-[-34px] rounded-full border-[1px] border-dotted border-cyan-400/50 animate-[spin_20s_linear_infinite_reverse] pointer-events-none"></div>

            {/* Core Image */}\`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
  console.log("Success");
} else {
  console.log("Fail regex");
}
