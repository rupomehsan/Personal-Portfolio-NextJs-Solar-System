"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const DUMMY_IMG = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

const blogList = [
  {
    title: "Architecting Scalable Systems with Laravel & Vue",
    desc: "A deep dive into monolithic vs microservices using Laravel APIs and Inertia-driven Vue.js frontend for high-traffic platforms.",
    date: "14 Oct 2024",
    readTime: "8 min read",
    category: "Architecture",
    link: "#"
  },
  {
    title: "Mastering Database Optimization in MySQL",
    desc: "Techniques for query indexing, managing millions of rows without locking, and caching strategies for Next.js applications.",
    date: "02 Sep 2024",
    readTime: "12 min read",
    category: "Database",
    link: "#"
  },
  {
    title: "Framer Motion: Cybernetic UI Design",
    desc: "How to use mathematical easing and keyframes to build Iron Man / Hacker terminal aesthetics natively in the browser.",
    date: "25 Aug 2024",
    readTime: "6 min read",
    category: "Frontend",
    link: "#"
  },
  {
    title: "Headless eCommerce architectures in 2024",
    desc: "Uncoupling monolithic Magento and shifting towards Laravel backend with Next.js frontends to decrease load times drastically.",
    date: "11 Jul 2024",
    readTime: "10 min read",
    category: "Full-Stack",
    link: "#"
  },
  {
    title: "The Ultimate Guide to API Security",
    desc: "Protecting your endpoints against scraping, DDoS, and parameter pollution using robust middlewares and rate limiting.",
    date: "19 May 2024",
    readTime: "9 min read",
    category: "Security",
    link: "#"
  }
];

export const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, blogList.length));
  };

  return (
    <section
      id="blogs"
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-[800px]"
    >
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
            ></motion.div>
          </div>

          <h1 className="flex flex-col sm:flex-row items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-0 sm:mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
              root@sys:~#
            </span>
            <span className="flex">
              {"B_L_O_G_S".split("").map((char, index) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0 }}
                  viewport={{ once: true }}
                  key={index}
                  className={char === "_" ? "text-transparent" : "text-white font-sans"}
                >
                  {char === "_" ? "\u00A0" : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O<span className="absolute w-[4px] sm:w-[6px] h-[4px] sm:h-[6px] bg-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)] animate-ping"></span>
                    </span>
                  ) : char}
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

          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mt-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[60%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10"></div>
            <div className="w-[10%] h-full bg-[#f97316] relative z-10"></div>
            <div className="w-[30%] h-full bg-teal-900/60 relative z-10"></div>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            ></motion.div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] px-4 md:px-10 mt-32 sm:mt-40 z-20 relative">
        <div className="flex flex-col gap-6 sm:gap-10">
          <AnimatePresence>
            {blogList.slice(0, visibleCount).map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group flex flex-col md:flex-row h-auto w-full"
              >
                {/* Horizontal Cyber Layout */}
                <div className="w-full bg-[#0b1426]/90 backdrop-blur-xl border border-cyan-500/20 group-hover:border-orange-500/50 transition-all duration-500 flex flex-col md:flex-row shadow-[0_0_10px_rgba(6,182,212,0.05)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] relative overflow-hidden">
                  
                  {/* Cyber Accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/70 group-hover:border-orange-500/70 m-2 z-10 transition-colors"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/70 group-hover:border-orange-500/70 m-2 z-10 transition-colors"></div>
                  
                                    {/* Left Side: Date & Category & Image */}
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
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl font-bold">
                       {"0" + (index+1).toString()}
                    </div>
                    
                    <h3 className="text-lg sm:text-2xl font-bold font-mono text-white mb-3 group-hover:text-cyan-300 transition-colors pr-8">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono leading-relaxed max-w-[800px] border-l-2 border-cyan-500/30 group-hover:border-orange-500/50 pl-4 mb-6 transition-colors">
                      {blog.desc}
                    </p>

                    <div className="flex justify-start">
                      <Link href={blog.link} target="_blank" rel="noopener noreferrer">
                        <button className="px-5 py-2 bg-transparent border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-widest hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2 group/btn relative overflow-hidden">
                          <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent group-hover/btn:w-full transition-all duration-700 z-0"></div>
                          <span className="relative z-10 flex items-center gap-2 font-bold">
                             <span className="text-orange-500 font-sans text-lg">&gt;</span> DECRYPT_LOG
                          </span>
                          <svg className="w-4 h-4 relative z-10 opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < blogList.length && (
          <div className="w-full flex justify-center mt-12 relative z-20">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="group relative px-6 py-3 bg-[#0b1426]/90 border border-orange-500/50 backdrop-blur-md overflow-hidden text-orange-300 font-mono text-xs uppercase tracking-widest hover:text-white"
              style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
            >
              <div className="absolute inset-0 bg-orange-500/10 group-hover:bg-orange-500/30 transition-colors duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="flex items-center gap-3 relative z-10">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                FETCH_OLDER_LOGS
                <svg className="w-3 h-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </motion.button>
          </div>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </section>
  );
};
