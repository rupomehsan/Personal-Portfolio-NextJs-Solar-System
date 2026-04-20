const fs = require('fs');
let content = fs.readFileSync('components/sub/about-content.tsx', 'utf8');

let newContent = content.replace(
  /\{\s*activeTab === "education"\s*\&\&\s*\([\s\S]*?(?=\s*\{\s*activeTab === "services"\s*\&\&)/m,
  \`              {activeTab === "education" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="relative pl-6 border-l border-cyan-500/30 space-y-6">
                    {/* Uni */}
                    <div className="border-l-[3px] border-cyan-500/50 pl-6 relative">
                      <div className="absolute w-[14px] h-[14px] bg-cyan-950 border-2 border-cyan-400 rounded-full -left-[9px] top-0 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute w-6 h-[2px] bg-cyan-500/50 -left-[2px] top-1.5"></div>
                      <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2 font-mono">
                        <span className="text-orange-400">&gt;</span> 2015 - 2020
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-wider mb-1 font-mono group-hover:text-cyan-300 transition-colors">
                        B.Sc in Computer Science & Engineering
                      </h3>
                      <p className="text-orange-300 text-sm font-mono mb-2">
                        Bangladesh Institute of Science and Technology (BIST)
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        CGPA: 3.10 / 4.00
                      </p>
                    </div>

                    {/* HSC */}
                    <div className="border-l-[3px] border-cyan-500/50 pl-6 relative">
                      <div className="absolute w-[14px] h-[14px] bg-cyan-950 border-2 border-cyan-400 rounded-full -left-[9px] top-0 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute w-6 h-[2px] bg-cyan-500/50 -left-[2px] top-1.5"></div>
                      <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2 font-mono">
                        <span className="text-orange-400">&gt;</span> 2011 - 2013
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-wider mb-1 font-mono group-hover:text-cyan-300 transition-colors">
                        Higher Secondary Certificate (Science)
                      </h3>
                      <p className="text-orange-300 text-sm font-mono mb-2">
                        Tamirul Millat Kamil Madrasha, Dhaka
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        GPA: 5.00 / 5.00
                      </p>
                    </div>

                    {/* SSC */}
                    <div className="border-l-[3px] border-cyan-500/50 pl-6 relative">
                      <div className="absolute w-[14px] h-[14px] bg-cyan-950 border-2 border-cyan-400 rounded-full -left-[9px] top-0 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute w-6 h-[2px] bg-cyan-500/50 -left-[2px] top-1.5"></div>
                      <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2 font-mono">
                        <span className="text-orange-400">&gt;</span> 2009 - 2011
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-wider mb-1 font-mono group-hover:text-cyan-300 transition-colors">
                        Secondary School Certificate (Science)
                      </h3>
                      <p className="text-orange-300 text-sm font-mono mb-2">
                        Muradpur Adarsha High School
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        GPA: 4.81 / 5.00
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
\`
);

newContent = newContent.replace(
  /<div>\s*<h3 className="flex items-center gap-2 text-\[11px\] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500\/30 pb-2">\s*<span className="w-1\.5 h-1\.5 bg-orange-400 rounded-full animate-pulse"><\/span>\s*Operating System/m,
  \`<div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Working Exp.
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {["Cpanel", "VPS", "DevOps", "CI/CD"].map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            key={tech}
                            className="px-3 py-1.5 bg-blue-950/30 border border-blue-500/20 text-blue-100 text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:border-blue-400 hover:bg-blue-500/20 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Operating System\`
);

fs.writeFileSync('components/sub/about-content.tsx', newContent);
