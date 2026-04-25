const fs = require("fs");
let mc = fs.readFileSync("app/marketplace/[slug]/page.tsx", "utf8");

mc = mc.replace(/\{\/\* Marketplace links \*\/\}[\s\S]*?\{\(marketplace\.marketplace_url[^]*?<\/motion\.div>\n\s*\)/, 
`{/* Marketplace links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-slate-800/40"
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex flex-1 items-center gap-3 w-full">
                    <span className="font-mono text-[9px] text-green-500 uppercase tracking-[0.2em]">// PURCHASE_ACCESS</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500/15 to-transparent" />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b1426]/60 border border-green-500/20 p-5 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                <div>
                   <h4 className="text-green-300 font-bold uppercase tracking-widest text-lg">Lifetime License</h4>
                   <p className="text-[10px] text-slate-500 font-mono mt-1">Includes full source code and updates</p>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                   <span className="text-2xl text-green-400 font-bold">$99.00</span>
                   <Link
                     href={"/marketplace/" + marketplace.slug + "/checkout"}
                     className="flex items-center gap-2 px-8 py-3 bg-green-500/10 border border-green-500/40 text-green-400 font-mono text-sm uppercase tracking-widest hover:bg-green-500/20 hover:border-green-400/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all rounded-lg"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                     BUY NOW
                   </Link>
                </div>
              </div>
            </motion.div>`);
fs.writeFileSync("app/marketplace/[slug]/page.tsx", mc);

