const fs = require('fs');

let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

// Update imports
if (content.indexOf('FaYoutube') === -1) {
    content = content.replace(/import \{ FaGithub, FaLinkedinIn, FaXTwitter, FaDiscord \} from "react-icons\/fa6";/, 'import { FaGithub, FaLinkedinIn, FaXTwitter, FaDiscord, FaYoutube, FaFacebook, FaInstagram, FaTwitch, FaDribbble } from "react-icons/fa6";');
}

// Adjust margins and alignment on the main container
content = content.replace(/mt-28 md:mt-36 w-full z-\[20\] gap-10"/g, 'mt-20 xl:mt-24 w-full z-[20] gap-10 items-start stretch"');
content = content.replace(/xl:flex-row items-center/g, 'xl:flex-row items-start');

// Update the Left Side HUD: use banner-img.png, increase width, make it professional, adjust image container, remove buttons, add socials.
const leftSideRegex = /\{\/\* LEFT SIDE: New Cyberpunk HUD \*\/\}\s*<motion\.div variants=\{slideInFromLeft\(0\.5\)\} className="w-full xl:w-1\/2 flex justify-center">[\s\S]*?\{\/\* RIGHT SIDE: Extracted Solar System Rings \*\/\}/;

const newLeftSide = `{/* LEFT SIDE: New Cyberpunk HUD */}
      <motion.div variants={slideInFromLeft(0.5)} className="w-full xl:w-1/2 flex justify-start xl:-mt-8">
        <div className="relative w-full max-w-[800px] border-[1.5px] border-cyan-500/60 bg-[#020617]/70 backdrop-blur-xl p-8 lg:p-12 shadow-[0_0_40px_rgba(6,182,212,0.15)] [clip-path:polygon(3%_0,97%_0,100%_4%,100%_96%,97%_100%,3%_100%,0_96%,0_4%)] transition-all duration-300 flex flex-col h-full items-center text-center group">
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-400 opacity-80 shadow-[-5px_-5px_20px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:border-cyan-300"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-400 opacity-80 shadow-[5px_-5px_20px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:border-cyan-300"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-400 opacity-80 shadow-[-5px_5px_20px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:border-cyan-300"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-400 opacity-80 shadow-[5px_5px_20px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:border-cyan-300"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>
          
          {/* Top: HUD Radar Profile Area (Adjusted for banner and header) */}
          <div className="relative flex justify-center items-center w-full max-w-[400px] mb-8 mt-2 mix-blend-screen">
            <svg className="absolute w-[125%] h-[125%] animate-[spin_40s_linear_infinite] opacity-60 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="95" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="10 10" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="40 20 10 20" />
              <path d="M 5 100 A 95 95 0 0 1 195 100" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
              <path d="M 10 100 L 25 100 M 190 100 L 175 100 M 100 10 L 100 25 M 100 190 L 100 175" stroke="#38bdf8" strokeWidth="4" strokeLinecap="square" />
            </svg>
            <div className="w-full aspect-video sm:aspect-square rounded-2xl overflow-hidden border-2 border-[#083344] shadow-[0_0_40px_rgba(6,182,212,0.4)] relative bg-[#000510] z-10 ring-4 ring-cyan-500/20 group-hover:ring-cyan-400/40 transition-all duration-500 group-hover:scale-[1.02]">
              <Image src="/banner-img.png" alt="MD Shefat / Profile" fill className="object-cover scale-[1.05] group-hover:scale-100 transition-all duration-700 ease-out select-none" sizes="(max-width: 768px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-cyan-500/10 to-transparent mix-blend-overlay group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Bottom: Holographic Terminal Info Data */}
          <div className="flex flex-col w-full gap-6 items-center text-center mt-4">
            
            <div className="border-b border-cyan-900/40 pb-6 w-full relative flex flex-col items-center">
              <div className="absolute top-0 w-64 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_cyan] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-3 justify-center mb-4">
                <span className="text-cyan-400 tracking-[0.3em] font-mono text-[10px] drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] hidden sm:block animate-pulse">///////////</span>
                <span className="text-gray-300 font-mono text-[11px] tracking-[0.3em] uppercase text-cyan-200">curriculum vitae</span>
                <span className="text-cyan-400 tracking-[0.3em] font-mono text-[10px] drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] hidden sm:block animate-pulse">///////////</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-500 tracking-widest uppercase mt-1 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] leading-tight">MD. ABU AHSAN</h1>
              
              <div className="flex items-center justify-center gap-4 mt-6 font-mono tracking-wider w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_cyan]"></div>
                  <span className="text-cyan-500 text-xs sm:text-sm uppercase drop-shadow-[0_0_5px_cyan] font-bold">Status:</span>
                </div>
                <span className="text-cyan-50 text-sm sm:text-base uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] tracking-widest font-semibold bg-cyan-950/40 border-l border-cyan-500/50 px-4 py-[6px] backdrop-blur-md relative overflow-hidden transition-all duration-300 group-hover:bg-cyan-900/50 group-hover:border-cyan-400">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                  Web Full Stack Developer
                </span>
              </div>
            </div>

            {/* Expansive Social Media Section */}
            <div className="flex flex-col items-center gap-6 mt-4 w-full">
               <h3 className="text-cyan-500 font-mono text-xs sm:text-sm tracking-[0.3em] font-bold drop-shadow-[0_0_5px_cyan] flex items-center justify-center gap-2 w-full uppercase">
                 <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                 Global Comm-Link Active
                 <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
               </h3>
               
               <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-2 max-w-[90%] mx-auto">
                  {[
                    { Icon: FaGithub, color: 'hover:text-white', shadow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' },
                    { Icon: FaLinkedinIn, color: 'hover:text-[#0077b5]', shadow: 'hover:shadow-[0_0_15px_rgba(0,119,181,0.5)]' },
                    { Icon: FaXTwitter, color: 'hover:text-white', shadow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' },
                    { Icon: FaDiscord, color: 'hover:text-[#5865F2]', shadow: 'hover:shadow-[0_0_15px_rgba(88,101,242,0.5)]' },
                    { Icon: FaYoutube, color: 'hover:text-[#FF0000]', shadow: 'hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]' },
                    { Icon: FaFacebook, color: 'hover:text-[#1877F2]', shadow: 'hover:shadow-[0_0_15px_rgba(24,119,242,0.5)]' },
                    { Icon: FaInstagram, color: 'hover:text-[#E1306C]', shadow: 'hover:shadow-[0_0_15px_rgba(225,48,108,0.5)]' },
                    { Icon: FaDribbble, color: 'hover:text-[#ea4c89]', shadow: 'hover:shadow-[0_0_15px_rgba(234,76,137,0.5)]' }
                  ].map((social, i) => (
                    <a key={i} href="#" className={\`relative group/icon p-3 rounded-lg border border-cyan-900/30 bg-cyan-950/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-cyan-950/50 \${social.shadow} hover:border-cyan-500/50\`}>
                       <div className="absolute inset-0 bg-cyan-500/10 blur-md rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                       <social.Icon className={\`text-cyan-600 \${social.color} scale-110 group-hover/icon:scale-[1.3] transition-all duration-300 relative z-10\`} size={28}/>
                    </a>
                  ))}
               </div>
            </div>
            
            {/* Added Bottom spacer for breathing room so it spans height nicely */}
            <div className="w-full mt-6 h-1 border-t border-dashed border-cyan-900/30"></div>

          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Extracted Solar System Rings */}`;

content = content.replace(leftSideRegex, newLeftSide);
fs.writeFileSync('components/sub/hero-content.tsx', content);
console.log('Update left side UI with banner image and new socials completed.');
