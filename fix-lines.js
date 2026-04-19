const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const regex = /\{\/\* Connecting line \*\/\}[\s\S]*?\{\/\* The Icon Node \*\/\}/g;

const replacement = \`{/* Connecting line with current flow */}
                    <div
                      className="absolute origin-bottom z-0 flex justify-center"
                      style={{
                        bottom: "85px", // Starts from the edge of the inner profile circle
                        left: "-1px", 
                        height: "55px", // Spaced so it stops right before hitting the icon
                        transform: \\\`rotate(\${angle}deg)\\\`
                      }}
                    >
                      <div className="w-[2px] h-full border-l-[2px] border-dashed border-cyan-500/40 relative">
                        {/* Flowing energy particle */}
                        <div 
                          className="absolute left-[-2px] w-[2px] h-[12px] bg-cyan-300 shadow-[0_0_10px_#22d3ee] rounded-full"
                          style={{
                            animation: \\\`flowUp 3s linear infinite \${i * 0.4}s\\\`
                          }}
                        ></div>
                      </div>
                    </div>
                    {/* The Icon Node */}\`;

content = content.replace(regex, replacement);

// Add the keyframes just after the initial <motion.div>
const styleBlock = \`
      <style>{\\\`
        @keyframes flowUp {
          0% { top: 100%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }
      \\\`}</style>
\`;

if (!content.includes('@keyframes flowUp')) {
  content = content.replace('<motion.div\\n      ref={containerRef}', styleBlock + '      <motion.div\\n      ref={containerRef}');
}

fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
console.log("Lines updated.");
