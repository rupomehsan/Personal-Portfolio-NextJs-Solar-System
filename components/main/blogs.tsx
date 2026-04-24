"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllBlogs, type Blog } from "@/lib/services/blog";
import { API_CONFIG } from "@/config/api";

const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

const INITIAL_VISIBLE = 3;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatReadTime(minutes: number | null): string {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min read`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m read` : `${h}h read`;
}

function resolveThumbnail(path: string | null): string {
  if (!path) return DUMMY_IMG;
  if (path.startsWith("http")) return path;
  return `${API_CONFIG.baseUrl}/storage/${path}`;
}

function resolveLink(blog: Blog): string {
  if (blog.url && blog.url.startsWith("http")) return blog.url;
  if (blog.slug) return `${API_CONFIG.baseUrl}/blog/${blog.slug}`;
  return "#";
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [visibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllBlogs()
      .then((data) => {
        setBlogs(data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


  return (
    <section
      id="blogs"
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-[800px]"
    >
      {/* ── Section heading ── */}
      <div className="absolute w-auto h-auto top-[2%] sm:top-[5%] z-[5]">
        <div className="flex flex-col items-center mb-6 md:mb-10 w-full relative">
          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mb-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[15%] h-full bg-[#f97316] relative z-10"></div>
            <div className="w-[50%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10"></div>
            <div className="w-[35%] h-full bg-teal-900/60 relative z-10"></div>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>

          <h1 className="flex flex-col sm:flex-row items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-0 sm:mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
              root@sys:~#
            </span>
            <span className="flex">
              {"B_L_O_G_S".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0 }}
                  viewport={{ once: true }}
                  className={char === "_" ? "text-transparent" : "text-white font-sans"}
                >
                  {char === "_" ? " " : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O
                      <span className="absolute w-[4px] sm:w-[6px] h-[4px] sm:h-[6px] bg-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)] animate-ping" />
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
            <div className="w-[10%] h-full bg-[#f97316] relative z-10"></div>
            <div className="w-[30%] h-full bg-teal-900/60 relative z-10"></div>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>
        </div>
      </div>

      {/* ── Blog list ── */}
      <div className="w-full max-w-[1200px] px-4 md:px-10 mt-32 sm:mt-40 z-20 relative">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20 font-mono text-cyan-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full"
            />
            <span className="text-xs tracking-widest animate-pulse">FETCHING_LOGS...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-20 font-mono text-orange-400 border border-orange-500/30 bg-orange-500/5 p-8">
            <span className="text-xs tracking-widest uppercase">[ERROR] {error}</span>
            <span className="text-slate-500 text-[10px]">Check that the backend server is running at {API_CONFIG.baseUrl}</span>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && blogs.length === 0 && (
          <div className="flex items-center justify-center py-20 font-mono text-slate-500 text-xs tracking-widest">
            NO_LOGS_FOUND
          </div>
        )}

        {/* Cards */}
        {!loading && !error && blogs.length > 0 && (
          <>
            <div className="flex flex-col gap-6 sm:gap-10">
              <AnimatePresence>
                {blogs.slice(0, visibleCount).map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group flex flex-col md:flex-row h-auto w-full"
                  >
                    <div className="w-full bg-[#0b1426]/90 backdrop-blur-xl border border-cyan-500/20 group-hover:border-orange-500/50 transition-all duration-500 flex flex-col md:flex-row shadow-[0_0_10px_rgba(6,182,212,0.05)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] relative overflow-hidden">

                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/70 group-hover:border-orange-500/70 m-2 z-10 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/70 group-hover:border-orange-500/70 m-2 z-10 transition-colors" />

                      {/* Left */}
                      <div className="md:w-[250px] lg:w-[320px] bg-black/40 border-b md:border-b-0 md:border-r border-cyan-500/20 group-hover:border-orange-500/30 p-4 sm:p-6 flex flex-row md:flex-col justify-between items-start md:items-start relative overflow-hidden group/thumb">
                        <div className="relative z-10 flex flex-col gap-1 w-full">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 group-hover:text-orange-400 transition-colors">
                            // DATALOG_ENTRY
                          </span>
                          <span className="text-xl font-bold font-mono text-white tracking-widest">
                            {formatDate(blog.publish_date || blog.created_at)}
                          </span>
                          {blog.reading_time != null && (
                            <span className="text-xs font-mono text-slate-500 mt-2">
                              TTR: {formatReadTime(blog.reading_time)}
                            </span>
                          )}
                        </div>

                        <div className="relative z-10 w-full mt-4 md:mt-8 space-y-4">
                          <div className="w-full relative h-[100px] md:h-[120px] border border-cyan-500/20 group-hover/thumb:border-orange-500/40 rounded overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-900/40 mix-blend-color z-10 group-hover/thumb:bg-orange-900/20 transition-all duration-500" />
                            <img
                              src={resolveThumbnail(blog.thumbnail_image)}
                              className="w-full h-full object-cover grayscale group-hover/thumb:grayscale-0 transition-all duration-700 scale-100 group-hover/thumb:scale-110"
                              alt={blog.title}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DUMMY_IMG;
                              }}
                            />
                          </div>
                          {blog.blog_type && (
                            <div>
                              <span className="inline-block px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-[10px] uppercase tracking-wider font-mono transform -skew-x-12 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 group-hover:text-orange-300 transition-all">
                                [{blog.blog_type.substring(0, 20)}]
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl font-bold">
                          {"0" + (index + 1).toString()}
                        </div>

                        <h3 className="text-lg sm:text-2xl font-bold font-mono text-white mb-3 group-hover:text-cyan-300 transition-colors pr-8">
                          {blog.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm font-mono leading-relaxed max-w-[800px] border-l-2 border-cyan-500/30 group-hover:border-orange-500/50 pl-4 mb-6 transition-colors">
                          {blog.description}
                        </p>

                        <div className="flex justify-start">
                          <Link href={resolveLink(blog)} target="_blank" rel="noopener noreferrer">
                            <button className="px-5 py-2 bg-transparent border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-widest hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2 group/btn relative overflow-hidden">
                              <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent group-hover/btn:w-full transition-all duration-700 z-0" />
                              <span className="relative z-10 flex items-center gap-2 font-bold">
                                <span className="text-orange-500 font-sans text-lg">&gt;</span>{" "}
                                DECRYPT_LOG
                              </span>
                              <svg
                                className="w-4 h-4 relative z-10 opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* View all blogs CTA */}
            <div className="w-full flex justify-center mt-12 relative z-20">
              <Link href="/blogs">
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
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-orange-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                    VIEW_ALL_BLOGS
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-slate-500 ml-1 text-[10px]">[ {blogs.length}_ENTRIES ]</span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
    </section>
  );
};
