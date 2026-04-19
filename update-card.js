const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const replacement = `{/* LEFT SIDE: New Cyberpunk HUD */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="w-full flex justify-center xl:justify-center xl:pr-0 xl:mt-24 h-full sm:h-auto"
      >
        <div className="relative w-full max-w-[450px] md:max-w-[500px] border border-cyan-500/50 bg-[#020617]/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col items-center text-center rounded-xl z-20 group">
          {/* Subtle neon corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-70 rounded-tl-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[-5px_-5px_15px_rgba(34,211,238,0.4)]"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-70 rounded-tr-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[5px_-5px_15px_rgba(34,211,238,0.4)]"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-70 rounded-bl-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[-5px_5px_15px_rgba(34,211,238,0.4)]"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-70 rounded-br-xl transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[5px_5px_15px_rgba(34,211,238,0.4)]"></div>

          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none rounded-xl"></div>

          {/* Details Section / Name at the Top */}
          <div className="flex flex-col w-full items-center z-10 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-2 w-full justify-center">
              <span className="h-[1px] w-6 bg-cyan-500/50 hidden sm:block"></span>
              <span className="text-cyan-300 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase">
                Curriculum Vitae
              </span>
              <span className="h-[1px] w-6 bg-cyan-500/50 hidden sm:block"></span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-wide uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] leading-tight">
              MD. ABU AHSAN
            </h1>

            {/* Status Badge */}
            <div className="mt-4 flex items-center justify-center gap-3 font-mono">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]"></div>
              <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-md shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                Web Full Stack Developer
              </span>
            </div>
            
            <div className="w-full max-w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-6 mb-2"></div>
          </div>

          {/* Profile Image Wrapper with Orbiting Socials */}
          <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] flex-shrink-0 z-10 flex items-center justify-center my-8 md:my-10">
            
            {/* Social Orbit Rings Array */}
            <div className="absolute inset-[-60px] sm:inset-[-70px] rounded-full border-[1px] border-dashed border-cyan-900/40 animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute inset-[-60px] sm:inset-[-70px] rounded-full animate-[spin_40s_linear_infinite]">
              {[
                { Icon: 7.5, obj: { Icon: FaGithub, link: "#", color: "hover:text-white", bColor: "hover:border-white/50", shadow: "hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]" }},
                { Icon: 52.5, obj: { Icon: FaLinkedinIn, link: "#", color: "hover:text-[#0077b5]", bColor: "hover:border-[#0077b5]/50", shadow: "hover:shadow-[0_0_10px_rgba(0,119,181,0.3)]" }},
                { Icon: 97.5, obj: { Icon: FaXTwitter, link: "#", color: "hover:text-white", bColor: "hover:border-white/50", shadow: "hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]" }},
                { Icon: 142.5, obj: { Icon: FaDiscord, link: "#", color: "hover:text-[#5865F2]", bColor: "hover:border-[#5865F2]/50", shadow: "hover:shadow-[0_0_10px_rgba(88,101,242,0.3)]" }},
                { Icon: 187.5, obj: { Icon: FaYoutube, link: "#", color: "hover:text-[#FF0000]", bColor: "hover:border-[#FF0000]/50", shadow: "hover:shadow-[0_0_10px_rgba(255,0,0,0.3)]" }},
                { Icon: 232.5, obj: { Icon: FaFacebook, link: "#", color: "hover:text-[#1877F2]", bColor: "hover:border-[#1877F2]/50", shadow: "hover:shadow-[0_0_10px_rgba(24,119,242,0.3)]" }},
                { Icon: 277.5, obj: { Icon: FaInstagram, link: "#", color: "hover:text-[#E1306C]", bColor: "hover:border-[#E1306C]/50", shadow: "hover:shadow-[0_0_10px_rgba(225,48,108,0.3)]" }},
                { Icon: 322.5, obj: { Icon: FaDribbble, link: "#", color: "hover:text-[#ea4c89]", bColor: "hover:border-[#ea4c89]/50", shadow: "hover:shadow-[0_0_10px_rgba(234,76,137,0.3)]" }},
              ].map((item, i) => {
                const angle = i * 45;
                // radius in px approximately: half of wrapper (w-220 + 2*70 = 360 => r=180) 
                // Wait, if it\'s positioned via transform we can use 50% translation.
                // An easier way: rotate container by \`angle\` deg, translate Y by -100%, then reverse rotate inside the child
                return (
                  <div key={i} className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5" style={{ transform: \`rotate(\${angle}deg) translateY(-145px) sm:translateY(-175px)\`}}>
                    <div className="w-full h-full animate-[spin_40s_linear_infinite_reverse]">
                      <a
                        href={item.obj.link}
                        style={{ transform: \`rotate(-\${angle}deg)\` }}
                        className={\`flex items-center justify-center w-full h-full rounded-full border border-cyan-800/40 bg-[#020617] transition-all duration-300 \${item.obj.bColor} \${item.obj.shadow} group/btn\`}
                      >
                        <item.obj.Icon
                          className={\`text-cyan-500/80 transition-colors duration-300 \${item.obj.color} scale-110 group-hover/btn:scale-125\`}
                          size={18}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inner Circular Lines */}
            <div className="absolute inset-[-10px] sm:inset-[-20px] rounded-full border-2 border-cyan-500/10 animate-[spin_10s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.1)]"></div>
            <div className="absolute inset-[-20px] sm:inset-[-30px] rounded-full border-[1px] border-dashed border-cyan-400/40 animate-[spin_15s_linear_infinite_reverse]"></div>

            {/* Core Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-[#000510] ring-2 ring-cyan-500/10 group-hover:ring-cyan-400/30 transition-all duration-300 transform group-hover:scale-105">
              <Image
                src="/banner-img.png"
                alt="MD Shefat / Profile"
                fill
                className="object-cover select-none object-top scale-110"
                sizes="(max-width: 768px) 250px, 300px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-cyan-900/20 to-transparent opacity-60"></div>
            </div>
          </div>
          
        </div>
      </motion.div>

      {/* RIGHT SIDE: Extracted Solar System Rings */}`;

// Let's replace the block using regex
const regex = /\{\/\* LEFT SIDE: New Cyberpunk HUD \*\/\}[\s\S]*?\{\/\* RIGHT SIDE: Extracted Solar System Rings \*\/\}/g;

const matched = content.match(regex);
if (matched) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('components/sub/hero-content.tsx', content, 'utf8');
    console.log("Successfully replaced left side panel.");
} else {
    console.log("Could not match the block!");
}

