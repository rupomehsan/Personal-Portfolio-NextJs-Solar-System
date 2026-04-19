const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

// 1. Make the icons larger: w-12 h-12 (48px instead of 40px)
// Adjust margins to -mt-6 -ml-6 to keep center point perfect
// Increase the translateY rotation from -145px to -160px so they don't crash into the inner rings
content = content.replace(
  /<div key=\{i\} className="absolute top-1\/2 left-1\/2 w-10 h-10 -mt-5 -ml-5" style={{ transform: \`rotate\(\$\{angle\}deg\) translateY\(-145px\)\` }}>/g,
  '<div key={i} className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6" style={{ transform: `rotate(${angle}deg) translateY(-160px)` }}>'
);

// 2. Make the icon size bigger: size={18} -> size={24}
content = content.replace(
  /size=\{18\}/g,
  'size={24}'
);

// 3. Create the buttons
// We will look for:
//               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-cyan-900/20 to-transparent opacity-60"></div>
//             </div>
//           </div>
//           
//         </div>
//       </motion.div>
// 
// And immediately slip our action buttons just before the `</div>` that closes the left card container.

const replaceTarget = `              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-cyan-900/20 to-transparent opacity-60"></div>
            </div>
          </div>
          
        </div>`;

const newButtons = `              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-cyan-900/20 to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4 z-10 relative pb-4">
            <button className="relative w-full sm:w-auto px-8 py-3 rounded-lg overflow-hidden group/hire border border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-500/10 transition-all duration-300">
              <div className="absolute inset-0 bg-cyan-500/20 translate-y-[100%] group-hover/hire:translate-y-[0%] transition-transform duration-300 ease-in-out"></div>
              <span className="relative flex items-center justify-center gap-2 text-cyan-300 font-bold tracking-widest uppercase text-sm group-hover/hire:text-cyan-100 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/hire:animate-pulse">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Hire Me
              </span>
            </button>

            <button className="relative w-full sm:w-auto px-8 py-3 rounded-lg overflow-hidden group/cv border border-indigo-500/50 bg-indigo-950/20 hover:bg-indigo-500/10 transition-all duration-300">
              <div className="absolute inset-0 bg-indigo-500/20 translate-y-[100%] group-hover/cv:translate-y-[0%] transition-transform duration-300 ease-in-out"></div>
              <span className="relative flex items-center justify-center gap-2 text-indigo-300 font-bold tracking-widest uppercase text-sm group-hover/cv:text-indigo-100 transition-colors drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/cv:-translate-y-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download CV
              </span>
            </button>
          </div>
          
        </div>`;

content = content.replace(replaceTarget, newButtons);

fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
console.log("Successfully rebuilt layout!");
