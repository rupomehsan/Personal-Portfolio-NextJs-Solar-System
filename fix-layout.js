const fs = require('fs');

let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

const leftSideRegex = /\{\/\* LEFT SIDE: New Cyberpunk HUD \*\/\}\s*<motion\.div variants=\{slideInFromLeft\(0\.5\)\} className="w-full xl:w-1\/2 flex justify-start xl:-mt-8">[\s\S]*?\{\/\* RIGHT SIDE: Extracted Solar System Rings \*\/\}/;

const newLeftSide = `{/* LEFT SIDE: New Cyberpunk HUD */}
      <motion.div variants={slideInFromLeft(0.5)} className="w-full xl:w-1/2 flex justify-center xl:justify-start xl:mt-[-1rem] h-full sm:h-auto">
        <div className="relative w-full max-w-[450px] md:max-w-[500px] border border-cyan-500/50 bg-[#020617]/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col items-center text-center rounded-xl z-20 group">
          
          {/* Subtle neon corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-70 rounded-tl-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[-5px_-5px_15px_rgba(34,211,238,0.4)]"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-70 rounded-tr-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[5px_-5px_15px_rgba(34,211,238,0.4)]"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-70 rounded-bl-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[-5px_5px_15px_rgba(34,211,238,0.4)]"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-70 rounded-br-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[5px_5px_15px_rgba(34,211,238,0.4)]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none rounded-xl"></div>
          
          {/* Profile Image Wrapper */}
          <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] mb-6 flex-shrink-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-[spin_10s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>
            <div className="absolute inset-[-10px] rounded-full border-[1px] border-dashed border-cyan-400/40 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="relative w-[90%] h-[90%] rounded-2xl overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-[#000510] ring-2 ring-cyan-500/10 group-hover:ring-cyan-400/30 transition-all duration-300 transform group-hover:scale-105">
              <Image src="/banner-img.png" alt="MD Shefat / Profile" fill className="object-cover object-top select-none" sizes="(max-width: 768px) 250px, 300px" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-cyan-900/20 to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col w-full items-center z-10 flex-1">
            <div className="flex items-center gap-2 mb-2 w-full justify-center">
              <span className="h-[1px] w-6 bg-cyan-500/50 hidden sm:block"></span>
              <span className="text-cyan-300 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase">Curriculum Vitae</span>
              <span className="h-[1px] w-6 bg-cyan-500/50 hidden sm:block"></span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-wide uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] leading-tight">MD. ABU AHSAN</h1>
            
            {/* Status Badge */}
             <div className="mt-4 flex items-center justify-center gap-3 font-mono">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]"></div>
                <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-md shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                  Web Full Stack Developer
                </span>
             </div>

             <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-6"></div>

            {/* Expanded Social Media Comm-Link */}
            <h3 className="text-cyan-500 font-mono text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase mb-4 flex items-center gap-2">
                 Global Comm-Link
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-[90%]">
                {[
                  { Icon: FaGithub, link: "#", color: 'hover:text-white', bColor: 'hover:border-white/50', shadow: 'hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]' },
                  { Icon: FaLinkedinIn, link: "#", color: 'hover:text-[#0077b5]', bColor: 'hover:border-[#0077b5]/50', shadow: 'hover:shadow-[0_0_10px_rgba(0,119,181,0.3)]' },
                  { Icon: FaXTwitter, link: "#", color: 'hover:text-white', bColor: 'hover:border-white/50', shadow: 'hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]' },
                  { Icon: FaDiscord, link: "#", color: 'hover:text-[#5865F2]', bColor: 'hover:border-[#5865F2]/50', shadow: 'hover:shadow-[0_0_10px_rgba(88,101,242,0.3)]' },
                  { Icon: FaYoutube, link: "#", color: 'hover:text-[#FF0000]', bColor: 'hover:border-[#FF0000]/50', shadow: 'hover:shadow-[0_0_10px_rgba(255,0,0,0.3)]' },
                  { Icon: FaFacebook, link: "#", color: 'hover:text-[#1877F2]', bColor: 'hover:border-[#1877F2]/50', shadow: 'hover:shadow-[0_0_10px_rgba(24,119,242,0.3)]' },
                ].map((social, i) => (
                  <a key={i} href={social.link} className={\`p-2.5 sm:p-3 rounded border border-cyan-900/40 bg-cyan-950/30 transition-all duration-300 \${social.bColor} \${social.shadow} group/btn\`}>
                     <social.Icon className={\`text-cyan-600 transition-colors duration-300 \${social.color} scale-110 group-hover/btn:scale-125\`} size={20}/>
                  </a>
                ))}
            </div>

          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Extracted Solar System Rings */}`;

content = content.replace(leftSideRegex, newLeftSide);
fs.writeFileSync('components/sub/hero-content.tsx', content);
console.log('Fixed broken left layout.');
