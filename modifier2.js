
const fs = require("fs");

let dp = fs.readFileSync("app/marketplace/[slug]/page.tsx", "utf8");

// Text replacements
dp = dp.replace(/BACK_TO_MODULES/g, "BACK_TO_PRODUCTS");
dp = dp.replace(/LOADING_MODULE/g, "LOADING_PRODUCT");
dp = dp.replace(/RETURN_TO_MODULES/g, "RETURN_TO_PRODUCTS");
dp = dp.replace(/MODULE_NOT_FOUND/g, "PRODUCT_NOT_FOUND");
dp = dp.replace(/VIEW_ALL_MARKETPLACE/g, "BROWSE_ALL_PRODUCTS");

// Add Buy Now block above PRODUCT_METADATA
const targetBlock = `<div className="lg:sticky lg:top-24 space-y-5">`;
if (dp.includes(targetBlock)) {
  const buyBlock = `<div className="lg:sticky lg:top-24 space-y-5">

              {/* Purchase Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-900/40 p-[2px] rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.15)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="bg-[#030014]/95 backdrop-blur-xl rounded-[14px] p-6 relative z-10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    <span className="font-mono text-[10px] text-green-400 uppercase tracking-[0.2em] font-bold">Lifetime Access</span>
                  </div>
                  
                  <div className="mb-6 pb-6 border-b border-green-500/20">
                    <div className="flex items-end gap-2 mb-2">
                       <span className="text-4xl text-white font-black leading-none">$99.00</span>
                       <span className="text-slate-400 text-sm mb-1 font-mono">USD</span>
                    </div>
                    <p className="text-slate-400 text-xs font-mono leading-relaxed mt-3">
                      Includes full source code, comprehensive documentation, and lifetime free updates for this product.
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 font-mono text-[10px] text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Instant Digital Download
                    </li>
                    <li className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Commercial Use License
                    </li>
                    <li className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      6 Months Technical Support
                    </li>
                  </ul>

                  <Link href={\`/marketplace/\${marketplace.slug}/checkout\`}>
                    <button className="w-full relative py-4 px-6 bg-green-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl overflow-hidden group/buy shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all">
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/buy:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Secure Checkout
                      </span>
                    </button>
                  </Link>
                </div>
              </motion.div>
`;
  dp = dp.replace(targetBlock, buyBlock);
}

fs.writeFileSync("app/marketplace/[slug]/page.tsx", dp);
console.log("Updated app/marketplace/[slug]/page.tsx");

