const fs = require('fs');

let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

// Inject the icons import if not there
if (content.indexOf('import { FaGithub, FaLinkedinIn, FaXTwitter, FaDiscord }') === -1) {
    content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport { FaGithub, FaLinkedinIn, FaXTwitter, FaDiscord } from "react-icons/fa6";');
}

// Find the Left Side block and replace it
const leftSideRegex = /\{\/\* LEFT SIDE: New Cyberpunk HUD \*\/\}\s*<motion\.div variants=\{slideInFromLeft\(0\.5\)\} className="w-full xl:w-1\/2 flex justify-center">[\s\S]*?\{\/\* RIGHT SIDE: Extracted Solar System Rings \*\/\}/;

const newLeftSide = `{/* LEFT SIDE: New Cyberpunk HUD */}
      <motion.div variants={slideInFromLeft(0.5)} className="w-full xl:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[500px] border-[1.5px] border-cyan-500/60 bg-[#020617]/70 backdrop-blur-xl p-8 lg:p-10 shadow-[0_0_40px_rgba(6,182,212,0.15)] [clip-path:polygon(4%_0,96%_0,100%_6%,100%_94%,96%_100%,4%_100%,0_94%,0_6%)] transition-all duration-300">
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-400 opacity-80 shadow-[-5px_-5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400 opacity-80 shadow-[5px_-5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-400 opacity-80 shadow-[-5px_5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-400 opacity-80 shadow-[5px_5px_20px_rgba(34,211,238,0.5)]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col items-center gap-10 relative z-10 w-full pt-4">
            
            {/* Top: HUD Radar Profile Area */}
            <div className="relative flex justify-center items-center w-[220px] sm:w-[280px] aspect-square flex-shrink-0">
              <svg className="absolute w-[125%] h-[125%] animate-[spin_30s_linear_infinite] opacity-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="10 10" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="40 20 10 20" />
                <path d="M 5 100 A 95 95 0 0 1 195 100" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                <path d="M 10 100 L 25 100 M 190 100 L 175 100 M 100 10 L 100 25 M 100 190 L 100 175" stroke="#38bdf8" strokeWidth="4" strokeLinecap="square" />
              </svg>
              <svg className="absolute w-[110%] h-[110%] animate-[spin_20s_linear_infinite_reverse] opacity-80" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="1 10" />
                <circle cx="100" cy="100" r="82" fill="none" stroke="#22d3ee" strokeWidth="5" strokeDasharray="80 150" />
                <path d="M 15 100 L 30 100 M 185 100 L 170 100 M 100 15 L 100 30 M 100 185 L 100 170" stroke="#06b6d4" strokeWidth="2" />
              </svg>
              <div className="w-[82%] h-[82%] rounded-full overflow-hidden border-4 border-[#083344] shadow-[0_0_40px_rgba(6,182,212,0.4)] relative bg-[#000510] z-10 ring-4 ring-cyan-500/20">
                <Image src="/nayeem.png" alt="MD Shefat / Profile" fill className="object-cover scale-[1.1] translate-y-2 select-none" sizes="250px" />
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
              </div>
            </div>

            {/* Bottom: Holographic Terminal Info Data */}
            <div className="flex flex-col w-full gap-5 items-center text-center">
              
              <div className="border-b border-cyan-900/40 pb-5 w-full relative flex flex-col items-center">
                <div className="absolute top-0 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_cyan]"></div>
                
                <div className="flex items-center gap-3 justify-center mb-3">
                  <span className="text-cyan-400 tracking-[0.3em] font-mono text-[10px] drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] hidden sm:block">///////////</span>
                  <span className="text-gray-300 font-mono text-[10px] tracking-[0.2em] uppercase">curriculum vitae</span>
                  <span className="text-cyan-400 tracking-[0.3em] font-mono text-[10px] drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] hidden sm:block">///////////</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-widest uppercase mt-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">MD. ABU AHSAN</h1>
                
                <div className="flex items-center justify-center gap-3 mt-4 font-mono tracking-wider w-full">
                  <span className="text-cyan-500 text-sm uppercase drop-shadow-[0_0_5px_cyan] font-bold">Status:</span>
                  <span className="text-cyan-100 text-sm sm:text-base uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] tracking-widest font-semibold bg-cyan-950/30 px-3 py-1 rounded border border-cyan-800/30">Web Full Stack Developer</span>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="flex flex-col items-center gap-4 mt-2 w-full">
                 <h3 className="text-cyan-500 font-mono text-sm tracking-[0.2em] font-bold drop-shadow-[0_0_5px_cyan]">COMM-LINK</h3>
                 <div className="flex items-center justify-center gap-6">
                    <a href="#" className="relative group p-2">
                       <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <FaGithub className="text-gray-400 group-hover:text-white group-hover:scale-125 transition-all duration-300 relative z-10" size={26}/>
                    </a>
                    <a href="#" className="relative group p-2">
                       <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <FaLinkedinIn className="text-gray-400 group-hover:text-[#0077b5] group-hover:scale-125 transition-all duration-300 relative z-10" size={26}/>
                    </a>
                    <a href="#" className="relative group p-2">
                       <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <FaXTwitter className="text-gray-400 group-hover:text-white group-hover:scale-125 transition-all duration-300 relative z-10" size={26}/>
                    </a>
                    <a href="#" className="relative group p-2">
                       <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <FaDiscord className="text-gray-400 group-hover:text-[#5865F2] group-hover:scale-125 transition-all duration-300 relative z-10" size={26}/>
                    </a>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {['Hire Me', 'About Me', 'Contact Me'].map((btn, i) => (
                  <button key={i} className="group relative px-6 py-2 bg-transparent border border-cyan-800 hover:border-cyan-400 overflow-hidden rounded-[2px] transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <div className="absolute inset-0 bg-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-cyan-300 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-cyan-300 transition-colors duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                    <span className="relative z-10 block text-center font-bold tracking-[0.1em] text-cyan-500 group-hover:text-cyan-200 uppercase text-xs transition-colors duration-300">{btn}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Extracted Solar System Rings */}`;

content = content.replace(leftSideRegex, newLeftSide);

// Find and delete the Skills array above the return statement so it's fully cleaned up
const skillsArrayRegex = /\s*const skills = \[\s*\{ name: "html", level: "95%" \},\s*\{ name: "css", level: "90%" \},\s*\{ name: "java script", level: "85%" \},\s*\{ name: "jquery", level: "75%" \},\s*\{ name: "PHP", level: "80%" \},\s*\{ name: "Larraval", level: "70%" \},\s*\{ name: "Wordpress", level: "85%" \},\s*\];/g;
content = content.replace(skillsArrayRegex, '');

fs.writeFileSync('components/sub/hero-content.tsx', content);
console.log('Done replacement.');
