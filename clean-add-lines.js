const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const regex = /return \(\s*<div\s*key=\{i\}\s*className="absolute top-1\/2 left-1\/2 w-12 h-12 -mt-6 -ml-6"/;
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
                      className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 z-20"\`;

content = content.replace(regex, replacement);

const regexTail = /<\/div>\s*\);\s*\}\)\}/;
const replacementTail = \`</div>
                  </div>
                );
              })}\`;

content = content.replace(regexTail, replacementTail);

fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
console.log("Lines added smoothly");
