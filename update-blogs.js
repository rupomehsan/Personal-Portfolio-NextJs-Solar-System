const fs = require('fs');

const path = 'components/main/blogs.tsx';
let content = fs.readFileSync(path, 'utf8');

const updatedLeftSide = `                  {/* Left Side: Date & Category & Image */}
                  <div className="md:w-[250px] lg:w-[320px] bg-black/40 border-b md:border-b-0 md:border-r border-cyan-500/20 group-hover:border-orange-500/30 p-4 sm:p-6 flex flex-row md:flex-col justify-between items-start md:items-start relative overflow-hidden group/thumb">
                    {/* Timestamp overlay graphic */}
                    
                    
                    <div className="relative z-10 flex flex-col gap-1 w-full">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 group-hover:text-orange-400 transition-colors">
                        // DATALOG_ENTRY
                      </span>
                      <span className="text-xl font-bold font-mono text-white tracking-widest">
                        {blog.date}
                      </span>
                      <span className="text-xs font-mono text-slate-500 mt-2">
                        TTR: {blog.readTime}
                      </span>
                    </div>

                    <div className="relative z-10 w-full mt-4 md:mt-8 space-y-4">
                       <div className="w-full relative h-[100px] md:h-[120px] border border-cyan-500/20 group-hover/thumb:border-orange-500/40 rounded overflow-hidden">
                           <div className="absolute inset-0 bg-cyan-900/40 mix-blend-color z-10 group-hover/thumb:bg-orange-900/20 transition-all duration-500"></div>
                           <img src={DUMMY_IMG} className="w-full h-full object-cover grayscale group-hover/thumb:grayscale-0 transition-all duration-700 scale-100 group-hover/thumb:scale-110" alt="Blog Thumbnail"/>
                       </div>
                       <div>
                         <span className="inline-block px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-[10px] uppercase tracking-wider font-mono transform -skew-x-12 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 group-hover:text-orange-300 transition-all">
                           [{blog.category}]
                         </span>
                       </div>
                    </div>
                  </div>`;

content = content.replace(/\{\/\* Left Side: Date & Category & Image \*\/\}[\s\S]*?(?=\{\/\* Right Side: Content \*\/})/g, updatedLeftSide + "\n\n                  ");

fs.writeFileSync(path, content, 'utf8');

