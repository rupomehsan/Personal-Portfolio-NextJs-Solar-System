"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllMarketplaces, parseTags, type Marketplace } from "@/lib/services/marketplace";
import { API_CONFIG } from "@/config/api";

const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

const INITIAL_VISIBLE = 6;

function thumb(path: string | null): string {
  if (!path) return DUMMY_IMG;
  if (path.startsWith("http")) return path;
  return `${API_CONFIG.baseUrl}/storage/${path}`;
}

export const Marketplaces = () => {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    getAllMarketplaces()
      .then(setMarketplaces)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = marketplaces.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="marketplaces"
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-screen"
    >
      {/* Section heading */}
      <div className="absolute w-auto h-auto top-[2%] sm:top-[5%] z-[5]">
        <div className="flex flex-col items-center mb-6 md:mb-10 w-full relative">
          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mb-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[15%] h-full bg-[#a78bfa] relative z-10"></div>
            <div className="w-[50%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10"></div>
            <div className="w-[35%] h-full bg-teal-900/60 relative z-10"></div>
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>

          <h1 className="flex flex-col sm:flex-row items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-0 sm:mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
              root@sys:~#
            </span>
            <span className="flex">
              {"MARKETPLACE".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0 }}
                  viewport={{ once: true }}
                  className="text-white font-sans"
                >
                  {char === "E" ? "Ξ" : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O
                      <span className="absolute w-[4px] sm:w-[6px] h-[4px] sm:h-[6px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    </span>
                  ) : char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 1 }}
                className="inline-block w-[12px] sm:w-[20px] h-[30px] bg-green-500 ml-2 mt-2 sm:mt-0"
              />
            </span>
          </h1>

          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mt-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[60%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10"></div>
            <div className="w-[10%] h-full bg-[#a78bfa] relative z-10"></div>
            <div className="w-[30%] h-full bg-teal-900/60 relative z-10"></div>
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-[1400px] px-4 md:px-10 mt-32 sm:mt-40 z-20 relative">

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-[1px] rounded-2xl bg-gradient-to-br from-slate-700/20 to-slate-800/10">
                <div className="bg-[#080d19] rounded-[15px] overflow-hidden">
                  <div className="h-[200px] bg-slate-800/40 animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                  <div className="p-5 space-y-3">
                    <div className="h-2.5 w-24 bg-slate-800/50 animate-pulse rounded-full" style={{ animationDelay: `${i * 80 + 40}ms` }} />
                    <div className="h-4 w-3/4 bg-slate-700/50 animate-pulse rounded" style={{ animationDelay: `${i * 80 + 60}ms` }} />
                    <div className="space-y-2">
                      <div className="h-2.5 w-full bg-slate-800/50 animate-pulse rounded" style={{ animationDelay: `${i * 80}ms` }} />
                      <div className="h-2.5 w-5/6 bg-slate-800/50 animate-pulse rounded" style={{ animationDelay: `${i * 80 + 40}ms` }} />
                    </div>
                    <div className="flex gap-1.5">
                      {[1,2,3].map((j) => (
                        <div key={j} className="h-5 w-12 bg-slate-800/40 animate-pulse rounded-full" style={{ animationDelay: `${i * 80 + j * 30}ms` }} />
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="flex-1 h-9 bg-slate-800/40 animate-pulse rounded-lg" />
                      <div className="flex-1 h-9 bg-slate-800/40 animate-pulse rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-16 font-mono text-orange-400 border border-orange-500/30 bg-orange-500/5 p-8 rounded-xl">
            <span className="text-xs tracking-widest uppercase">[ERROR] {error}</span>
          </div>
        )}

        {/* Marketplace cards */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence>
                {visible.map((marketplace, index) => {
                  const tags = parseTags(marketplace.tags);

                  return (
                    <motion.div
                      key={marketplace.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
                      className="relative group h-full flex flex-col"
                    >
                      {/* Outer glow on hover */}
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-purple-600/0 via-cyan-500/0 to-green-500/0 group-hover:from-purple-600/40 group-hover:via-cyan-500/20 group-hover:to-green-500/30 transition-all duration-500 blur-sm pointer-events-none" />

                      {/* Gradient border wrapper */}
                      <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-slate-800/40 group-hover:from-purple-400/50 group-hover:via-cyan-400/30 group-hover:to-green-500/30 transition-all duration-500 h-full flex flex-col">
                        <div className="bg-[#080d19] rounded-[15px] overflow-hidden flex flex-col h-full group-hover:shadow-[0_20px_60px_rgba(6,182,212,0.06)] transition-shadow duration-500">

                          {/* Top rainbow accent */}
                          <div className="h-[2px] w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-green-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Thumbnail */}
                          <div className="relative w-full h-[210px] overflow-hidden">
                            <img
                              src={thumb(marketplace.thumbnail_image)}
                              alt={marketplace.title || marketplace.name || "Product"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
                            />
                            {/* Scanline */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.05)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                            {/* Bottom fade */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080d19] via-[#080d19]/20 to-transparent" />

                            {/* Price badge */}
                            <div className="absolute top-3 right-3 bg-green-500 text-black font-mono font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] z-10">
                              $99.00
                            </div>

                            {/* Featured badge */}
                            {marketplace.is_featured === 1 && (
                              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-orange-500/90 font-mono text-[9px] text-white uppercase tracking-widest rounded-full shadow-lg">
                                ★ Featured
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-1">
                            {/* Category + status */}
                            <div className="flex items-center gap-2 mb-3">
                              {marketplace.category && (
                                <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                  {marketplace.category.substring(0, 18)}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-[9px] font-mono text-green-500 ml-auto">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                Live
                              </span>
                            </div>

                            {/* Product name */}
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                              {marketplace.title || marketplace.name}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-2 flex-grow mb-4">
                              {marketplace.description}
                            </p>

                            {/* Tags */}
                            {tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {tags.slice(0, 4).map((tag, i) => (
                                  <span key={i} className="text-[9px] font-mono uppercase px-2 py-0.5 bg-slate-800/60 text-slate-400 border border-slate-700/40 rounded-full group-hover:border-cyan-500/20 group-hover:text-slate-300 transition-colors">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-4" />

                            {/* Action buttons */}
                            <div className="flex gap-2 mt-auto">
                              <Link href={`/marketplace/${marketplace.slug}`} className="flex-1">
                                <button className="w-full py-2.5 border border-purple-500/40 text-purple-300 font-mono text-[10px] uppercase tracking-widest hover:bg-purple-500/15 hover:border-purple-400/60 transition-all rounded-xl flex items-center justify-center gap-1.5">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Details
                                </button>
                              </Link>
                              <Link href={`/marketplace/${marketplace.slug}/checkout`} className="flex-1">
                                <button className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-mono font-bold text-[10px] uppercase tracking-widest transition-all rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-1.5">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Buy Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* VIEW ALL CTA */}
            {marketplaces.length > 0 && (
              <div className="w-full flex justify-center mt-12 relative z-20">
                <Link href="/marketplace">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3 bg-[#0b1426]/90 border border-cyan-500/50 backdrop-blur-md overflow-hidden text-cyan-300 font-mono text-xs uppercase tracking-widest hover:text-white cursor-pointer"
                    style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                  >
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/15 transition-colors duration-300" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      VIEW_ALL_MARKETPLACE
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="text-slate-600 ml-1 text-[10px]">[ {marketplaces.length}_MODULES ]</span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
    </section>
  );
};
