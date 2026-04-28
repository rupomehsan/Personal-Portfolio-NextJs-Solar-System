"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAllProjects,
  parseTags,
  type Project,
} from "@/lib/services/project";
import { API_CONFIG } from "@/config/api";

const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

const INITIAL_VISIBLE = 6;

function thumb(path: string | null): string {
  if (!path) return DUMMY_IMG;
  if (path.startsWith("http")) return path;
  return `${API_CONFIG.baseUrl}/${path}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = projects.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-screen w-full max-w-[1400px] mx-auto"
    >
      {/* HUD Frame Borders */}
      <div className="absolute inset-4 pointer-events-none hidden md:block z-10">
        <svg
          width="80"
          height="80"
          className="absolute top-0 left-0 opacity-60"
        >
          <path
            d="M 80 2 L 20 2 L 2 20 L 2 80"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <path
            d="M 80 8 L 25 8 L 8 25 L 8 80"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
        <svg
          width="80"
          height="80"
          className="absolute top-0 right-0 opacity-60"
        >
          <path
            d="M 0 2 L 60 2 L 78 20 L 78 80"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <path
            d="M 0 8 L 55 8 L 72 25 L 72 80"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
        <svg
          width="80"
          height="80"
          className="absolute bottom-0 left-0 opacity-60"
        >
          <path
            d="M 80 78 L 20 78 L 2 60 L 2 0"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <path
            d="M 80 72 L 25 72 L 8 55 L 8 0"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
        <svg
          width="80"
          height="80"
          className="absolute bottom-0 right-0 opacity-60"
        >
          <path
            d="M 0 78 L 60 78 L 78 60 L 78 0"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <path
            d="M 0 72 L 55 72 L 72 55 L 72 0"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
        <div className="absolute top-[1px] left-[80px] right-[80px] h-[1px] bg-cyan-500/20" />
        <div className="absolute bottom-[1px] left-[80px] right-[80px] h-[1px] bg-cyan-500/20" />
        <div className="absolute left-[1px] top-[80px] bottom-[80px] w-[1px] bg-cyan-500/20" />
        <div className="absolute right-[1px] top-[80px] bottom-[80px] w-[1px] bg-cyan-500/20" />
      </div>
      {/* ── Section heading ── */}
      <div className="absolute w-auto h-auto top-[2%] sm:top-[5%] z-[5]">
        <div className="flex flex-col items-center mb-6 md:mb-10 w-full relative">
          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mb-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[15%] h-full bg-[#a78bfa] relative z-10"></div>
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
              {"PROJECTS".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0 }}
                  viewport={{ once: true }}
                  className="text-white font-sans"
                >
                  {char === "E" ? (
                    "Ξ"
                  ) : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O
                      <span className="absolute w-[4px] sm:w-[6px] h-[4px] sm:h-[6px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    </span>
                  ) : (
                    char
                  )}
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
              initial={{ x: "-100%" }}
              animate={{ x: "600%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1,
              }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="w-full max-w-[1400px] px-4 md:px-10 mt-32 sm:mt-40 z-20 relative">
        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="relative h-full flex flex-col">
                <div
                  className="relative h-full flex flex-col bg-[#0b1426]/90 border border-cyan-500/10 p-4 sm:p-5"
                  style={{
                    clipPath:
                      "polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px))",
                  }}
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/20 m-2" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/20 m-2" />

                  {/* header row */}
                  <div className="flex items-center justify-between mb-3 border-b border-cyan-500/10 pb-2">
                    <div
                      className="h-2.5 w-16 bg-slate-700/50 animate-pulse rounded-sm"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                    <div
                      className="h-2.5 w-12 bg-slate-700/30 animate-pulse rounded-sm"
                      style={{ animationDelay: `${i * 80 + 40}ms` }}
                    />
                  </div>

                  {/* thumbnail */}
                  <div
                    className="w-full h-[150px] sm:h-[180px] mb-4 bg-slate-800/50 animate-pulse"
                    style={{ animationDelay: `${i * 80}ms` }}
                  />

                  {/* title */}
                  <div
                    className="h-4 w-3/4 bg-slate-700/50 animate-pulse rounded-sm mb-2"
                    style={{ animationDelay: `${i * 80 + 40}ms` }}
                  />

                  {/* description lines */}
                  <div className="space-y-2 mb-4 border-l-2 border-cyan-500/10 pl-3 flex-grow">
                    <div
                      className="h-2.5 w-full bg-slate-800/50 animate-pulse rounded-sm"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                    <div
                      className="h-2.5 w-5/6 bg-slate-800/50 animate-pulse rounded-sm"
                      style={{ animationDelay: `${i * 80 + 60}ms` }}
                    />
                    <div
                      className="h-2.5 w-2/3 bg-slate-800/50 animate-pulse rounded-sm"
                      style={{ animationDelay: `${i * 80 + 120}ms` }}
                    />
                  </div>

                  {/* tags */}
                  <div className="flex gap-1.5 mb-3">
                    {[10, 14, 10].map((w, j) => (
                      <div
                        key={j}
                        className={`h-4 w-${w} bg-slate-800/50 animate-pulse`}
                        style={{ animationDelay: `${i * 80 + j * 30}ms` }}
                      />
                    ))}
                  </div>

                  {/* buttons */}
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-8 bg-slate-800/40 animate-pulse border border-slate-700/30"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                    <div
                      className="flex-1 h-8 bg-slate-800/40 animate-pulse border border-slate-700/30"
                      style={{ animationDelay: `${i * 80 + 40}ms` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-16 font-mono text-orange-400 border border-orange-500/30 bg-orange-500/5 p-8">
            <span className="text-xs tracking-widest uppercase">
              [ERROR] {error}
            </span>
          </div>
        )}

        {/* Project cards */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence>
                {visible.map((project, index) => {
                  const tags = parseTags(project.tags);
                  const liveUrl =
                    project.link ?? project.project_url ?? project.github_url ?? "";

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
                      className="relative group h-full flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-400/40 group-hover:to-purple-400/40 blur-md transition-all duration-500 rounded-sm" />

                      <div
                        className="relative h-full flex flex-col bg-[#0b1426]/90 backdrop-blur-xl border border-cyan-500/30 p-4 sm:p-5 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        style={{
                          clipPath:
                            "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                        }}
                      >
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/70 m-2 z-10" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/70 m-2 z-10" />

                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2 relative z-10">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            sys_init
                          </span>
                          {project.category && (
                            <span className="text-[9px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 border border-slate-700/50">
                              {project.category.substring(0, 18)}
                            </span>
                          )}
                        </div>

                        {/* Thumbnail */}
                        <div className="relative w-full h-[150px] sm:h-[180px] mb-4 overflow-hidden border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors z-10">
                          <img
                            src={thumb(project.thumb_image)}
                            alt={project.title || project.name || "Project"}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DUMMY_IMG;
                            }}
                          />
                          <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.1)_51%)] bg-[length:100%_4px] pointer-events-none" />
                          {project.is_featured === 1 && (
                            <span className="absolute top-2 right-2 z-10 px-2 py-0.5 bg-orange-500/85 font-mono text-[8px] text-white uppercase tracking-widest">
                              ★ FEATURED
                            </span>
                          )}
                        </div>

                        {/* Title + desc */}
                        <h3 className="text-base sm:text-lg font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors relative z-10">
                          {project.title || project.name}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm font-mono leading-relaxed mb-4 flex-grow border-l-2 border-cyan-500/30 pl-3 line-clamp-3">
                          {stripHtml(project.description)}
                        </p>

                        {/* Footer */}
                        <div className="mt-auto flex flex-col gap-3">
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {tags.slice(0, 5).map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] font-mono uppercase bg-cyan-950/40 text-cyan-200 px-2 py-0.5 border border-cyan-500/20 group-hover:border-cyan-500/50"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-row items-center gap-2">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="flex-1"
                            >
                              <button className="w-full px-3 py-1.5 border border-purple-500/40 text-purple-300 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all flex items-center gap-1.5 justify-center relative overflow-hidden group/btn2">
                                <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent group-hover/btn2:w-full transition-all duration-500 z-0" />
                                <span className="relative z-10">
                                  View Details
                                </span>
                                <svg
                                  className="w-2.5 h-2.5 relative z-10"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            </Link>

                            {liveUrl ? (
                              <Link
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1"
                              >
                                <button className="w-full px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1.5 justify-center relative overflow-hidden group/btn">
                                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover/btn:w-full transition-all duration-500 z-0" />
                                  <span className="relative z-10">
                                    &gt; Execute
                                  </span>
                                  <svg
                                    className="w-2.5 h-2.5 relative z-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </button>
                              </Link>
                            ) : (
                              <div className="flex-1 px-3 py-1.5 border border-slate-700 bg-slate-800/30 text-slate-500 font-mono text-[9px] uppercase tracking-widest cursor-not-allowed flex items-center gap-1.5 justify-center">
                                <span>Offline</span>
                                <span className="w-1 h-1 rounded-full bg-red-900" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* VIEW ALL PROJECTS CTA */}
            {projects.length > 0 && (
              <div className="w-full flex justify-center mt-12 relative z-20">
                <Link href="/projects">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3 bg-[#0b1426]/90 border border-cyan-500/50 backdrop-blur-md overflow-hidden text-cyan-300 font-mono text-xs uppercase tracking-widest hover:text-white cursor-pointer"
                    style={{
                      clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                  >
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/15 transition-colors duration-300" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      VIEW_ALL_PROJECTS
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                      <span className="text-slate-600 ml-1 text-[10px]">
                        [ {projects.length}_MODULES ]
                      </span>
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
