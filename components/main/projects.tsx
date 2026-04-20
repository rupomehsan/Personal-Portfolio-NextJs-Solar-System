"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

const projectList = [
  {
    title: "Real Estate Website",
    desc: "A full-featured real estate platform.",
    link: "https://stcdhaka.com/",
    tags: ["Web App", "Real Estate"],
  },
  {
    title: "Ecommerce with Laravel & Vue",
    desc: "Modern ecommerce solution utilizing Laravel, Vue.js, and Inertia.",
    link: "https://etek.com.bd",
    tags: ["Laravel", "Vue.js", "Inertia", "Ecommerce"],
  },
  {
    title: "MLM Ecommerce System",
    desc: "Multi Level Marketing based ecommerce architecture.",
    link: "https://yninetwork.com/",
    tags: ["MLM", "Ecommerce", "System"],
  },
  {
    title: "School Management System",
    desc: "Comprehensive management system for educational institutions.",
    link: "https://miamjuraindhaka.edu.bd",
    tags: ["Management", "Education"],
  },
  {
    title: "Cooking Website",
    desc: "Interactive cooking platform.",
    link: "https://mca-edu.com",
    tags: ["Web Platform"],
  },
  {
    title: "Radio App API & Admin",
    desc: "Backend API and admin panel built for CodeCanyon.",
    link: "",
    tags: ["API", "Admin Panel", "CodeCanyon"],
  },
  {
    title: "Newspaper App API & Admin",
    desc: "Backend API and admin panel built for CodeCanyon.",
    link: "",
    tags: ["API", "Admin Panel", "CodeCanyon"],
  },
  {
    title: "Weather App API & Admin",
    desc: "Backend API and admin panel built for CodeCanyon.",
    link: "",
    tags: ["API", "Admin Panel", "CodeCanyon"],
  },
  {
    title: "Motivational App API & Admin",
    desc: "Backend API and admin panel built for CodeCanyon.",
    link: "",
    tags: ["API", "Admin Panel", "CodeCanyon"],
  },
  {
    title: "Live Streaming Sports Site",
    desc: "Platform for streaming live sports events, developed for CodeCanyon.",
    link: "",
    tags: ["Streaming", "Sports", "CodeCanyon"],
  },
  {
    title: "Online Insurance Application",
    desc: "Digital platform for processing insurance applications.",
    link: "",
    tags: ["Insurance", "Web App"],
  },
  {
    title: "Blood Management System",
    desc: "System for tracking and managing blood donations and inventory.",
    link: "",
    tags: ["Healthcare", "Management"],
  },
  {
    title: "Ecommerce Website",
    desc: "Custom ecommerce platform for retail businesses.",
    link: "",
    tags: ["Ecommerce", "Web App"],
  },
  {
    title: "Blog Website",
    desc: "Dynamic and responsive blogging platform.",
    link: "",
    tags: ["Blog", "CMS"],
  },
  {
    title: "Account Software",
    desc: "Financial accounting and tracking software.",
    link: "",
    tags: ["Finance", "Software"],
  },
  {
    title: "Planning Software",
    desc: "Strategic planning and task management application.",
    link: "",
    tags: ["Management", "Software"],
  },
];

export const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, projectList.length));
  };

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-screen"
    >
      <div className="absolute w-auto h-auto top-[2%] sm:top-[5%] z-[5]">
        <div className="flex flex-col items-center mb-6 md:mb-10 w-full relative">
          {/* Top Animated Line */}
          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mb-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[15%] h-full bg-[#a78bfa] relative z-10"></div>
            <div className="w-[50%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10"></div>
            <div className="w-[35%] h-full bg-teal-900/60 relative z-10"></div>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            ></motion.div>
          </div>

          {/* Title Text - Coder Vibe */}
          <h1 className="flex flex-col sm:flex-row items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-0 sm:mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
              root@sys:~#
            </span>
            <span className="flex">
              {"PROJECTS".split("").map((char, index) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0 }}
                  viewport={{ once: true }}
                  key={index}
                  className="text-white font-sans"
                >
                  {char === "E" ? (
                    "Ξ"
                  ) : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O
                      <span className="absolute w-[4px] sm:w-[6px] h-[4px] sm:h-[6px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"></span>
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
              ></motion.span>
            </span>
          </h1>

          {/* Bottom Animated Line */}
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
            ></motion.div>
          </div>
        </div>
      </div>

      {/* Grid Layout for Projects */}
      <div className="w-full max-w-[1400px] px-4 md:px-10 mt-32 sm:mt-40 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {projectList.slice(0, visibleCount).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
                className="relative group h-full flex flex-col"
              >
                {/* Outer stroke/glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-400/40 group-hover:to-purple-400/40 blur-md transition-all duration-500 rounded-sm"></div>

                <div
                  className="relative h-full flex flex-col bg-[#0b1426]/90 backdrop-blur-xl border border-cyan-500/30 p-4 sm:p-5 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                  }}
                >
                  {/* Tech Corners */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/70 m-2 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/70 m-2 z-10"></div>

                  {/* Header status */}
                  <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2 relative z-10">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>{" "}
                      sys_init
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-300/50 transition-colors">
                      {"[ 0x" +
                        Math.floor(Math.random() * 10000)
                          .toString(16)
                          .padStart(4, "0") +
                        " ]"}
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative w-full h-[150px] sm:h-[180px] mb-4 overflow-hidden border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors z-10">
                    <img
                      src={DUMMY_IMG}
                      alt={project.title}
                      className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>

                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.1)_51%)] bg-[length:100%_4px] pointer-events-none"></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors relative z-10">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-mono leading-relaxed mb-6 flex-grow border-l-2 border-cyan-500/30 pl-3">
                    {project.desc}
                  </p>

                  {/* Footer mapping */}
                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono uppercase bg-cyan-950/40 text-cyan-200 px-2 py-0.5 border border-cyan-500/20 group-hover:border-cyan-500/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-row items-center justify-between w-full mt-2 gap-2">
                      <button className="px-3 py-1.5 border border-purple-500/40 text-purple-300 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all flex items-center gap-1.5 group/btn2 relative overflow-hidden flex-1 justify-center z-10">
                        <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent group-hover/btn2:w-full transition-all duration-500 z-0"></div>
                        <span className="relative z-10">View Details</span>
                        <svg
                          className="w-2.5 h-2.5 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
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

                      {project.link ? (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex"
                        >
                          <button className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1.5 group/btn relative overflow-hidden w-full justify-center z-10">
                            <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover/btn:w-full transition-all duration-500 z-0"></div>
                            <span className="relative z-10">&gt; Execute</span>
                            <svg
                              className="w-2.5 h-2.5 relative z-10"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              ></path>
                            </svg>
                          </button>
                        </Link>
                      ) : (
                        <div className="flex-1 px-3 py-1.5 border border-slate-700 bg-slate-800/30 text-slate-500 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest cursor-not-allowed flex items-center gap-1.5 justify-center z-10">
                          <span>Offline</span>
                          <span className="w-1 h-1 rounded-full bg-red-900"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < projectList.length && (
          <div className="w-full flex justify-center mt-12 relative z-20">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="group relative px-6 py-3 bg-[#0b1426]/90 border border-cyan-500/50 backdrop-blur-md overflow-hidden text-cyan-300 font-mono text-xs uppercase tracking-widest hover:text-white"
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/30 transition-colors duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="flex items-center gap-3 relative z-10">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                Load More Modules
                <svg
                  className="w-3 h-3 group-hover:translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </motion.button>
          </div>
        )}
      </div>

      {/* Background Cybernetic Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </section>
  );
};
