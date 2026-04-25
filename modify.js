
const fs = require("fs");

let mp = fs.readFileSync("components/main/marketplace.tsx", "utf8");
mp = mp.replace(/_MODULES\]/g, "_PRODUCTS]");
mp = mp.replace(/LOADING_MODULE/g, "LOADING_PRODUCTS");
mp = mp.replace(/VIEW_ALL_MARKETPLACE/g, "BROWSE_ALL_PRODUCTS");

const oldCardStart = `<div\n                        className="relative h-full flex flex-col bg-[#0b1426]/90 backdrop-blur-xl border border-cyan-500/30 p-4 sm:p-5 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"`;
const mpRegex = /<div\s+className="relative h-full flex flex-col bg-\[#0b1426\]\/90[^>]*>[\s\S]*?<\/div>[\s]*<\/motion.div>/;

const newCard = `<div className="relative h-full flex flex-col bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] group-hover:-translate-y-2">
                        
                        <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden bg-black/50 border-b border-slate-800/80">
                          <img
                            src={thumb(marketplace.thumbnail_image)}
                            alt={marketplace.title || marketplace.name || "Product"}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            onError={(e) => { (e.target).src = DUMMY_IMG; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />
                          {marketplace.is_featured === 1 && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-yellow-500/90 text-black font-bold font-mono text-[10px] uppercase rounded-md shadow-lg">? Featured</span>
                          )}
                          <span className="absolute top-3 right-3 tracking-widest text-[11px] font-bold text-white bg-green-500/80 px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-green-400/50 flex items-center gap-1">
                            $99.00
                          </span>
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse border border-green-200" />
                            <span className="text-[10px] uppercase font-mono tracking-widest text-green-400">Available</span>
                            {marketplace.category && (
                              <span className="text-[9px] uppercase tracking-widest font-mono text-slate-400 ml-auto border border-slate-700 px-2 py-0.5 rounded-md">
                                {marketplace.category.substring(0, 18)}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-1 font-sans">
                            {marketplace.title || marketplace.name}
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 flex-grow font-sans">
                            {marketplace.description}
                          </p>

                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {tags.slice(0, 4).map((tag, i) => (
                                <span key={i} className="text-[9px] font-mono uppercase bg-slate-800/80 text-slate-300 px-2 py-1 rounded-md border border-slate-700 group-hover:border-green-500/30 transition-colors">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-auto flex flex-row gap-3">
                            <Link href={\`/marketplace/\${marketplace.slug}\`} className="flex-1">
                              <button className="w-full px-4 py-2.5 border border-slate-600 text-slate-300 text-[10px] tracking-widest uppercase font-bold rounded-lg hover:bg-slate-800 hover:text-white transition-all font-mono">
                                Details
                              </button>
                            </Link>

                            <Link href={\`/marketplace/\${marketplace.slug}/checkout\`} className="flex-1">
                                <button className="w-full px-4 py-2.5 bg-green-500/10 border border-green-500/50 text-green-400 text-[10px] uppercase font-bold rounded-lg hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2 tracking-widest font-mono group/buy">
                                  <svg className="w-4 h-4 group-hover/buy:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Buy Now
                                </button>
                              </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>`;

mp = mp.replace(mpRegex, newCard);
fs.writeFileSync("components/main/marketplace.tsx", mp);
console.log("Updated components/main/marketplace.tsx");

