const fs = require('fs');

const path = 'components/main/navbar.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the old loose hub line blocks with a precise geometric connection
const hubLineReplacement = `
          {/* PROFESSIONAL TIMELINE/HUB CONNECTOR */}
          <div className="relative flex flex-col gap-2 w-full">
            {/* The line itself - mathematically pinned to the centers of the top and bottom icons */}
            <div className="absolute left-[24px] md:left-[32px] top-[32px] bottom-[32px] w-[2px] -translate-x-1/2 transition-all duration-500 ease-in-out z-0 pointer-events-none hidden md:block">
              {/* Base wire */}
              <div className="absolute inset-0 bg-cyan-800/40"></div>
              {/* Core glowing fiber */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-teal-300 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] filter blur-[0.5px] opacity-70"></div>
              {/* Traveling energy pulse */}
              <div className="absolute top-0 w-full h-[50px] bg-white rounded-full mix-blend-screen shadow-[0_0_15px_rgba(255,255,255,1)] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>

            {NAV_LINKS.map((link) => (`;

content = content.replace(
  /\{?\/\* Professional Dynamic Connecting Hub Line \*\/\}[\s\S]*?\{NAV_LINKS\.map\(\(link\) => \(/,
  hubLineReplacement
);

// We added a wrapper <div className="relative flex flex-col gap-2 w-full">, so we need to close it after the mapping.

// We need to find the end of the NAV_LINKS.map.
// It ends with:
//             </Link>
//           ))}
//
//           {/* Source Code Tab */}
const closingReplacement = `            </Link>
          ))}
          </div>

          {/* Source Code Tab */}`;

content = content.replace(
  /<\/Link>\s*\}\)\}\s*\{\/\* Source Code Tab \*\/\}/,
  closingReplacement
);

fs.writeFileSync(path, content, 'utf8');

