const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const regex = /return \(\s+<div\s+key=\{i\}\s+className="absolute top-1\/2 left-1\/2 w-12 h-12 -mt-6 -ml-6"\s+style=\{\{\s+transform: \`rotate\(\$\{angle\}deg\) translateY\(-160px\)\`,\s+\}\}\s+>/m;

// actually let's just find "return (\n                  <div\n                    key={i}"
// and replace up to "                  >"

const targetCodeStart = content.indexOf('const angle = i * 45;');
if(targetCodeStart > -1) {
    const returnStart = content.indexOf('return (', targetCodeStart);
    const innerDivStart = content.indexOf('<div className="w-full h-full animate-[spin_40s_linear_infinite_reverse]">', returnStart);
    
    if(innerDivStart > -1) {
        const replacement = \`return (
                  <div key={i} className="absolute top-1/2 left-1/2 w-0 h-0">
                    {/* Connecting line */}
                    <div
                      className="absolute top-1/2 left-1/2 w-[1px] border-l-[2px] border-dashed border-cyan-400/40 -translate-x-1/2 -translate-y-full origin-bottom"
                      style={{
                        height: "160px",
                        transform: \\\`rotate(\${angle}deg)\\\`
                      }}
                    ></div>
                    {/* The Icon Node */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 z-20"
                      style={{
                        transform: \\\`rotate(\${angle}deg) translateY(-160px)\\\`
                      }}
                    >
\`;
        
        content = content.substring(0, returnStart) + replacement + content.substring(innerDivStart);
        
        // Also fix the bottom brace
        const tailTarget = '                        </a>\\n                    </div>\\n                  </div>\\n                );\\n              })}';
        
        const newTailTarget = \`                        </a>
                    </div>
                  </div>
                  </div>
                );
              })}\`;
              
        content = content.replace(tailTarget, newTailTarget);
        fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
        console.log("Replaced perfectly via substring");
    }
}
