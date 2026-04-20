const fs = require('fs');
const content = fs.readFileSync('components/sub/about-content.tsx', 'utf8');

const updatedEducation = `              {activeTab === "education" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="relative pl-6 border-l border-cyan-500/30 space-y-6">
                    {/* Uni */}
                    <div className="relative">
                      <div className="absolute top-1.5 -left-[29px] w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]" />
                      <div className="bg-[#020617]/50 border border-cyan-500/20 p-4 rounded backdrop-blur-md">
                        <div className="text-orange-300 text-sm font-mono mb-2">
                          2015 - 2020
                        </div>
                        <h4 className="text-cyan-100 font-bold mb-1 text-sm sm:text-base">
                          Bachelor of Science in Computer Science & Engineering
                        </h4>
                        <div className="text-cyan-300/80 text-xs sm:text-sm mb-2">
                          Bangladesh Institute of Science and Technology (BIST)
                        </div>
                        <div className="text-cyan-400/60 text-xs font-mono">
                          CGPA: 3.10 / 4.00
                        </div>
                      </div>
                    </div>

                    {/* HSC */}
                    <div className="relative">
                      <div className="absolute top-1.5 -left-[29px] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                      <div className="bg-[#020617]/50 border border-cyan-500/20 p-4 rounded backdrop-blur-md">
                        <div className="text-orange-300 text-sm font-mono mb-2">
                          2011 - 2013
                        </div>
                        <h4 className="text-cyan-100 font-bold mb-1 text-sm sm:text-base">
                          Higher Secondary Certificate (Science)
                        </h4>
                        <div className="text-cyan-300/80 text-xs sm:text-sm mb-2">
                          Tamirul Millat Kamil Madrasha, Dhaka
                        </div>
                        <div className="text-cyan-400/60 text-xs font-mono">
                          GPA: 5.00 / 5.00
                        </div>
                      </div>
                    </div>

                    {/* SSC */}
                    <div className="relative">
                      <div className="absolute top-1.5 -left-[29px] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,1)]" />
                      <div className="bg-[#020617]/50 border border-cyan-500/20 p-4 rounded backdrop-blur-md">
                        <div className="text-orange-300 text-sm font-mono mb-2">
                          2009 - 2011
                        </div>
                        <h4 className="text-cyan-100 font-bold mb-1 text-sm sm:text-base">
                          Secondary School Certificate (Science)
                        </h4>
                        <div className="text-cyan-300/80 text-xs sm:text-sm mb-2">
                          Muradpur Adarsha High School
                        </div>
                        <div className="text-cyan-400/60 text-xs font-mono">
                          GPA: 4.81 / 5.00
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}`;

let newContent = content.replace(/\{\s*activeTab === "education"\s*\&\&\s*\([\s\S]*?(?=\s*\{\s*activeTab === "services")/m, updatedEducation + "\n\n");

const dbToOSReplacement = `<div>
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
                        Operating System
                      </h3>`;

newContent = newContent.replace(/<div>\s*<h3 className="flex items-center gap-2 text-\[11px\] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500\/30 pb-2">\s*<span className="w-1\.5 h-1\.5 bg-orange-400 rounded-full animate-pulse"><\/span>\s*Operating System/m, dbToOSReplacement);

fs.writeFileSync('components/sub/about-content.tsx', newContent);
