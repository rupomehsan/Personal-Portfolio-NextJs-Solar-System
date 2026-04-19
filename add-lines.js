const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const regex = /return \(\s*<div\s*key=\{i\}\s*className="absolute top-1\/2 left-1\/2 w-12 h-12 -mt-6 -ml-6"/;
const replacement = \`return (
                  <React.Fragment key={i}>
                    {/* Connecting glowing dashed line */}
                    <div
                      className="absolute top-1/2 left-1/2 w-[1px] bg-[linear-gradient(to_top,rgba(6,182,212,0.6)_50%,transparent_50%)] bg-[length:100%_8px] -translate-x-1/2"
                      style={{
                        height: "160px",
                        transformOrigin: "bottom center",
                        transform: \\\`rotate(\${angle}deg) translateY(-160px)\\\`
                      }}
                    >
                      {/* Flowing energy dot along the line */}
                      <div className="w-[3px] h-[10px] bg-cyan-300 rounded-full blur-[1px] absolute top-1/2 -translate-x-1/2 animate-[ping_2s_linear_infinite]" style={{ animationDelay: \\\`\${i * 0.2}s\\\` }}></div>
                    </div>
                    {/* Social Icon Node */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 z-20"\`;

content = content.replace(regex, replacement);

const regexTail = /<\/div>\s*\);\s*\}\)\}/;
const replacementTail = \`</div>
                  </React.Fragment>
                );
              })}\`;

content = content.replace(regexTail, replacementTail);

if (!content.includes('import React')) {
    content = 'import React from "react";\\n' + content;
}

fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
console.log("Lines added");
