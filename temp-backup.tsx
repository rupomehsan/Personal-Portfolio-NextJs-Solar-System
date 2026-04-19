
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export const HeroContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [glowClicks, setGlowClicks] = useState(0);

  // Extremely professional, subtle 3D multi-layered parallax offsets
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const parallaxOrbital = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleOrbital = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityOrbital = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  // High-end 3D Holographic "Exploded View" Scroll Effects
  const rotateXOrbital = useTransform(scrollYProgress, [0, 1], ["0deg", "70deg"]);
  const rotateZOrbital = useTransform(scrollYProgress, [0, 1], ["0deg", "-45deg"]);
  const zExplodeCore = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const zExplodeLines = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const zExplodeR1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const zExplodeR2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const zExplodeR3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const zExplodeR4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 400]);

  
  


  const glowIntensity = 10 - Math.abs((glowClicks % 20) - 10);

  
  

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-14 lg:px-20 mt-28 md:mt-40 w-full z-[20] gap-10"
    >
      <motion.div 
        style={{ y: parallaxText }}
        className="h-full w-full max-w-[700px] flex flex-col gap-6 justify-center m-auto text-start"
      >
        <motion.div
          variants={slideInFromTop}
          className="flex items-center gap-3 opacity-[0.9]"
        >
          <div className="w-8 h-[2px] bg-cyan-400"></div>
          <h1 className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            Full Stack Development
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-2 mt-2 max-w-[640px] w-auto h-auto relative z-20"
        >
          {/* Hello, I am */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-cyan-400 font-mono text-xl sm:text-2xl md:text-3xl font-bold animate-pulse">~/$</span>
            <div className="relative w-max">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono text-gray-300 opacity-0 pointer-events-none tracking-wide">
                Hello! I am
              </h2>
              <motion.div 
                animate={{ width: ["0%", "100%", "100%", "0%"] }} 
                transition={{ duration: 8, repeat: Infinity, ease: "linear", times: [0, 0.2, 0.9, 1] }}
                className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap border-r-[3px] border-cyan-400/50 pr-2"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] tracking-wide">
                  Hello! I am
                </h2>
              </motion.div>
            </div>
          </div>

          {/* MD ABU AHSAN */}
          <div className="relative w-max mt-2">
            <h1 className="text-5xl sm:text-7xl md:text-[80px] leading-[0.9] font-black uppercase opacity-0 pointer-events-none tracking-wide">
              Md Abu Ahsan
            </h1>
            <motion.div 
              animate={{ width: ["0%", "100%", "100%", "0%"] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1.6, times: [0, 0.2, 0.9, 1] }}
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap border-r-[4px] border-pink-500/50 pr-2"
            >
              <h1 className="text-5xl sm:text-7xl md:text-[80px] leading-[0.9] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-pink-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] tracking-wide">
                Md Abu Ahsan
              </h1>
            </motion.div>
          </div>

          {/* SOFTWARE ENGINEER */}
          <div className="relative w-max mt-2">
            <h1 className="text-3xl sm:text-5xl md:text-[60px] leading-[0.9] font-bold uppercase opacity-0 pointer-events-none tracking-wide">
              Software Engineer
            </h1>
            <motion.div 
              animate={{ width: ["0%", "100%", "100%", "0%"] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 3.2, times: [0, 0.2, 0.9, 1] }}
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap border-r-[4px] border-indigo-400/50 pr-2"
            >
              <h1 className="text-3xl sm:text-5xl md:text-[60px] leading-[0.9] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] tracking-wide">
                Software Engineer
              </h1>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-slate-400 max-w-[600px] leading-relaxed mt-2"
        >
          Building next-generation web applications with precision-crafted code,
          immersive interfaces, and blazing performance across all platforms. <span className="inline-block w-3 h-5 bg-green-500 animate-pulse align-middle ml-1"></span>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.9)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-[640px] w-full mt-4"
        >
          {/* Skill 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>HTML5</span>
              <span className="text-cyan-400">95%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 2 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>CSS3 / SASS</span>
              <span className="text-cyan-400">92%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, delay: 1.1 }} className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 3 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>JavaScript</span>
              <span className="text-cyan-400">88%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} transition={{ duration: 1.5, delay: 1.2 }} className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 4 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>React / Next</span>
              <span className="text-cyan-400">85%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 1.3 }} className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 5 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>PHP / Laravel</span>
              <span className="text-cyan-400">80%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 1.5, delay: 1.4 }} className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 6 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>Node.js</span>
              <span className="text-cyan-400">78%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.5, delay: 1.5 }} className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-wrap gap-4 pt-6"
        >
          <a
            href="#projects"
            className="py-3 px-8 text-center text-cyan-400 font-bold tracking-[0.1em] uppercase cursor-pointer rounded-md border border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="py-3 px-8 text-center text-purple-400 font-bold tracking-[0.1em] uppercase cursor-pointer rounded-md border border-purple-500/50 bg-purple-950/20 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
          >
            Hire Me
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.8)}
        style={{ 
          y: parallaxOrbital, 
          scale: scaleOrbital, 
          opacity: opacityOrbital,
          rotateX: rotateXOrbital,
          rotateZ: rotateZOrbital,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="w-full h-full flex justify-center items-center relative z-0 origin-center"
      >
        <motion.div style={{ y: parallaxBackground, transform: "translateZ(-100px)" }} className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-cyan-500/20 blur-[80px] rounded-full point-events-none"></div>
        </motion.div>
        <div style={{ transformStyle: "preserve-3d" }} className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center">
          {/* Waving Background Circles - Smooth pulsating effect to fix blipping */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px]">
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut" }}
              className="top-0 left-0 w-full h-full border border-cyan-500/50 rounded-full absolute"
            ></motion.div>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 2 }}
              className="top-0 left-0 w-full h-full border border-purple-500/50 rounded-full absolute"
            ></motion.div>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 4 }}
              className="top-0 left-0 w-full h-full border border-cyan-500/50 rounded-full absolute"
            ></motion.div>
          </div>

          {/* Decorative spinning rings (Orbit Path) - Added 4th outer ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-indigo-400/50 shadow-[0_0_15px_rgba(129,140,248,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-teal-400/50 shadow-[0_0_15px_rgba(45,212,191,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>

          {/* Central Processor Image - Perfectly centered with absolute placement wrapper */}
          {/* Enhanced Sun-like Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[250px] md:h-[250px] bg-cyan-400/40 blur-[80px] rounded-full animate-pulse z-20 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-[#000000e8] backdrop-blur-xl border-4 border-cyan-500/50 shadow-[0_0_80px_rgba(34,211,238,0.8)] border-cyan-400 overflow-hidden flex items-center justify-center relative"
            >
              {/* Decorative inner rings for HUD effect */}
              <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/50 animate-[spin_15s_linear_infinite_reverse]" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 md:w-20 md:h-20 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
              </svg>
            </motion.div>
          </div>
          









                    {/* --- Ring 1 (Inner, 60% Width -> 30% Radius) - 5 Databases --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r1" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r1)">
{/* 11. Ring 1 Top: MySQL */}
                <g className="animate-[pulse_4.2s_ease-in-out_infinite_0.1s]">
                  <path d="M 50 50 L 48 48 L 48 20 L 50 20" fill="none" stroke="#22d3ee" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="48" cy="20" r="0.4" fill="#22d3ee" />
                </g>

                
{/* 12. Ring 1 Top Right: PostgreSQL */}
                <g className="animate-[pulse_3.2s_ease-in-out_infinite_0.6s]">
                  <path d="M 50 50 L 60 40 L 78.5 40 L 78.5 41" fill="none" stroke="#60a5fa" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="60" cy="40" r="0.4" fill="#60a5fa" />
                </g>

                
{/* 13. Ring 1 Bottom Right: MongoDB */}
                <g className="animate-[pulse_5.2s_ease-in-out_infinite_1.1s]">
                  <path d="M 50 50 L 60 60 L 67.6 67.6 L 67.6 74" fill="none" stroke="#4ade80" strokeWidth="0.2" className="animate-line-flow" />
                  <path d="M 67.6 73 L 68.6 74 L 67.6 75 Z" fill="#4ade80" />
                </g>

                
{/* 14. Ring 1 Bottom Left: Redis */}
                <g className="animate-[pulse_4.6s_ease-in-out_infinite_0.3s]">
                  <path d="M 50 50 L 40 60 L 32.4 67.6 L 32.4 74" fill="none" stroke="#f87171" strokeWidth="0.2" className="animate-line-flow" />
                  <path d="M 32.4 73 L 31.4 74 L 32.4 75 Z" fill="#f87171" />
                </g>

                
{/* 15. Ring 1 Top Left: Firebase */}
                <g className="animate-[pulse_3.8s_ease-in-out_infinite_0.7s]">
                  <path d="M 50 50 L 40 40 L 21.5 40 L 21.5 41" fill="none" stroke="#fbbf24" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="40" cy="40" r="0.4" fill="#fbbf24" />
                </g>

                
                </g>
              </svg>
            </div>
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-cyan-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-cyan-300 whitespace-nowrap shadow-lg">MySQL</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[41%] left-[78.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-emerald-500/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-emerald-400 whitespace-nowrap shadow-lg">MongoDB</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[74%] left-[67.6%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-sky-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-sky-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-sky-400 whitespace-nowrap shadow-lg">PostgreSQL</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[74%] left-[32.4%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" alt="Redis" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-red-500/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-red-500 whitespace-nowrap shadow-lg">Redis</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[41%] left-[21.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/firebase.png" width={24} height={24} alt="Firebase" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-yellow-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-yellow-400 whitespace-nowrap shadow-lg">Firebase</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 2 (Middle, 80% Width -> 40% Radius) - 5 Frontend Frameworks --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r2" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r2)">
{/* 16. Ring 2 Top Right: React */}
                <g className="animate-[pulse_4.8s_ease-in-out_infinite_1.3s]">
                  <path d="M 50 50 L 65 35 L 65 17.6 L 73.5 17.6" fill="none" stroke="#38bdf8" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="65" cy="35" r="0.4" fill="#38bdf8" />
                  <circle cx="65" cy="17.6" r="0.4" fill="#38bdf8" />
                </g>

                
{/* 17. Ring 2 Bottom Right: Vue */}
                <g className="animate-[pulse_3.6s_ease-in-out_infinite_0.4s]">
                  <path d="M 50 50 L 65 65 L 88 65 L 88 62.3" fill="none" stroke="#34d399" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="65" cy="65" r="0.4" fill="#34d399" />
                  <rect x="87" y="61.3" width="2" height="2" fill="none" stroke="#34d399" strokeWidth="0.3" />
                </g>

                
{/* 18. Ring 2 Bottom: Angular */}
                <g className="animate-[pulse_5.8s_ease-in-out_infinite_0.9s]">
                  <path d="M 50 50 L 52 52 L 52 90 L 50 90" fill="none" stroke="#fb7185" strokeWidth="0.2" className="animate-line-flow" />
                  <rect x="49" y="89" width="2" height="2" fill="none" stroke="#fb7185" strokeWidth="0.3" />
                </g>

                
{/* 19. Ring 2 Bottom Left: Tailwind */}
                <g className="animate-[pulse_4.4s_ease-in-out_infinite_1.4s]">
                  <path d="M 50 50 L 35 65 L 12 65 L 12 62.3" fill="none" stroke="#38bdf8" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="35" cy="65" r="0.4" fill="#38bdf8" />
                  <rect x="11" y="61.3" width="2" height="2" fill="none" stroke="#38bdf8" strokeWidth="0.3" />
                </g>

                
{/* 20. Ring 2 Top Left: Next.js */}
                <g className="animate-[pulse_3.4s_ease-in-out_infinite_0.5s]">
                  <path d="M 50 50 L 35 35 L 35 17.6 L 26.5 17.6" fill="none" stroke="#a1a1aa" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="35" cy="35" r="0.4" fill="#a1a1aa" />
                  <circle cx="35" cy="17.6" r="0.4" fill="#a1a1aa" />
                </g>
              
                </g>
              </svg>
            </div>
            <div className="absolute top-[17.6%] left-[73.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 0.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/react.png" width={28} height={28} alt="React" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-cyan-400/50 pointer-events-none text-[10px] font-bold text-cyan-400 whitespace-nowrap shadow-lg">React</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[62.3%] left-[88%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 1.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" alt="Vue" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-emerald-400/50 pointer-events-none text-[10px] font-bold text-emerald-400 whitespace-nowrap shadow-lg">Vue.js</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 2.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-orange-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/html.png" width={28} height={28} alt="HTML" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-orange-500/50 pointer-events-none text-[10px] font-bold text-orange-500 whitespace-nowrap shadow-lg">HTML</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[62.3%] left-[12%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 1.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/css.png" width={28} height={28} alt="CSS" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-blue-500/50 pointer-events-none text-[10px] font-bold text-blue-400 whitespace-nowrap shadow-lg">CSS</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[17.6%] left-[26.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-white/50 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/next.png" width={28} height={28} alt="Next.js" className="w-7 h-7 object-contain invert" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-white/50 pointer-events-none text-[10px] font-bold text-white whitespace-nowrap shadow-lg">Next.js</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 3 (Outer, 100% Width -> 50% Radius) - 5 Backends --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r3" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r3)">
{/* 1. Ring 3 Top: PHP */}
                <g className="animate-[pulse_4s_ease-in-out_infinite]">
                  <path d="M 50 50 L 45 45 L 45 15 L 50 10 L 50 5" fill="none" stroke="#818cf8" strokeWidth="0.2" className="animate-line-flow" />
                  <path d="M 50 50 L 45 45 L 45 15" fill="none" className="animate-line-flow" stroke="#818cf8" strokeWidth="0.4" />
                  <circle cx="45" cy="45" r="0.8" fill="#818cf8" />
                  <circle cx="50" cy="5" r="1.5" fill="none" stroke="#818cf8" strokeWidth="0.4" />
                  <circle cx="50" cy="5" r="0.5" fill="#818cf8" />
                </g>

                
{/* 2. Ring 3 Top Right: JavaScript */}
                <g className="animate-[pulse_3s_ease-in-out_infinite_0.5s]">
                  <path d="M 50 50 L 65 50 L 80.5 34.5 L 94 34.5" fill="none" stroke="#facc15" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="65" cy="50" r="0.6" fill="#facc15" />
                  <circle cx="80.5" cy="34.5" r="0.6" fill="#facc15" />
                  <rect x="93" y="33.5" width="2" height="2" fill="none" stroke="#facc15" strokeWidth="0.5" />
                </g>

                
{/* 3. Ring 3 Bottom Right: Node.js */}
                <g className="animate-[pulse_5s_ease-in-out_infinite_1s]">
                  <path d="M 50 50 L 50 65 L 75.4 90.4 L 76 90.4" fill="none" stroke="#4ade80" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="50" cy="65" r="0.6" fill="#4ade80" />
                  <circle cx="75.4" cy="90.4" r="0.6" fill="#4ade80" />
                  <path d="M 76 89.4 L 77 90.4 L 76 91.4 Z" fill="#4ade80" />
                </g>

                
{/* 4. Ring 3 Bottom Left: Laravel */}
                <g className="animate-[pulse_4s_ease-in-out_infinite_0.2s]">
                  <path d="M 50 50 L 50 65 L 24.6 90.4 L 24 90.4" fill="none" stroke="#f87171" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="50" cy="65" r="0.6" fill="#f87171" />
                  <circle cx="24.6" cy="90.4" r="0.6" fill="#f87171" />
                  <path d="M 24 89.4 L 23 90.4 L 24 91.4 Z" fill="#f87171" />
                </g>

                
{/* 5. Ring 3 Top Left: Kotlin */}
                <g className="animate-[pulse_3s_ease-in-out_infinite_0.8s]">
                  <path d="M 50 50 L 35 50 L 19.5 34.5 L 6 34.5" fill="none" stroke="#c084fc" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="35" cy="50" r="0.6" fill="#c084fc" />
                  <rect x="5" y="33.5" width="2" height="2" fill="#c084fc" />
                </g>

                
                </g>
              </svg>
            </div>
            <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-indigo-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(129,140,248,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" alt="PHP" className="w-8 h-8 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-indigo-400/50 pointer-events-none text-[11px] font-bold text-indigo-400 whitespace-nowrap shadow-lg">PHP</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[34.5%] left-[97.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <Image src="/skills/js.png" width={32} height={32} alt="JavaScript" className="w-8 h-8 object-contain rounded-sm" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-yellow-400/50 pointer-events-none text-[11px] font-bold text-yellow-400 whitespace-nowrap shadow-lg">JavaScript</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90.4%] left-[79.3%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <Image src="/skills/node.png" width={32} height={32} alt="Node.js" className="w-8 h-8 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-green-500/50 pointer-events-none text-[11px] font-bold text-green-400 whitespace-nowrap shadow-lg">Node.js</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90.4%] left-[20.7%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 0.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-8 h-8 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-red-500/50 pointer-events-none text-[11px] font-bold text-red-500 whitespace-nowrap shadow-lg">Laravel</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[34.5%] left-[2.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 2.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" alt="Kotlin" className="w-8 h-8 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-purple-500/50 pointer-events-none text-[11px] font-bold text-purple-400 whitespace-nowrap shadow-lg">Kotlin</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 4 (Outermost, 120% Width -> 60% Radius) - 5 Languages - MUCH BIGGER --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r4" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r4)">
{/* 6. Ring 4 Top Right: C */}
                <g className="animate-[pulse_5s_ease-in-out_infinite_1.5s]">
                  <path d="M 50 50 L 60 40 L 60 25 L 83.6 1.4" fill="none" stroke="#60a5fa" strokeWidth="0.25" className="animate-line-flow" />
                  <circle cx="60" cy="40" r="0.6" fill="#60a5fa" />
                  <circle cx="60" cy="25" r="0.6" fill="#60a5fa" />
                  <circle cx="83.6" cy="1.4" r="1.2" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
                  <circle cx="83.6" cy="1.4" r="0.4" fill="#60a5fa" />
                </g>

                
{/* 7. Ring 4 Bottom Right: C++ */}
                <g className="animate-[pulse_4s_ease-in-out_infinite_0.6s]">
                  <path d="M 50 50 L 75 50 L 93.5 68.5 L 102 68.5" fill="none" stroke="#3b82f6" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="75" cy="50" r="0.8" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
                  <circle cx="93.5" cy="68.5" r="0.6" fill="#3b82f6" />
                  <polygon points="102,67.5 104,68.5 102,69.5" fill="#3b82f6" />
                </g>

                
{/* 8. Ring 4 Bottom: C# */}
                <g className="animate-[pulse_4.5s_ease-in-out_infinite_0.4s]">
                  <path d="M 50 50 L 55 55 L 55 85 L 50 90 L 50 105" fill="none" stroke="#a855f7" strokeWidth="0.3" className="animate-line-flow" />
                  <path d="M 50 50 L 55 55 L 55 85" fill="none" className="animate-line-flow" stroke="#a855f7" strokeWidth="0.5" />
                  <circle cx="55" cy="55" r="0.6" fill="#a855f7" />
                  <circle cx="50" cy="105" r="1.5" fill="none" stroke="#a855f7" strokeWidth="0.5" />
                  <circle cx="50" cy="105" r="0.5" fill="#a855f7" />
                </g>

                
{/* 9. Ring 4 Bottom Left: Python */}
                <g className="animate-[pulse_3.5s_ease-in-out_infinite_1.2s]">
                  <path d="M 50 50 L 25 50 L 6.5 68.5 L -2 68.5" fill="none" stroke="#eab308" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="25" cy="50" r="0.8" fill="none" stroke="#eab308" strokeWidth="0.3" />
                  <circle cx="6.5" cy="68.5" r="0.6" fill="#eab308" />
                  <polygon points="-2,67.5 -4,68.5 -2,69.5" fill="#eab308" />
                </g>

                
{/* 10. Ring 4 Top Left: Java */}
                <g className="animate-[pulse_5.5s_ease-in-out_infinite_0.9s]">
                  <path d="M 50 50 L 40 40 L 40 25 L 16.4 1.4" fill="none" stroke="#f97316" strokeWidth="0.25" className="animate-line-flow" />
                  <circle cx="40" cy="40" r="0.6" fill="#f97316" />
                  <circle cx="40" cy="25" r="0.6" fill="#f97316" />
                  <circle cx="16.4" cy="1.4" r="1.2" fill="none" stroke="#f97316" strokeWidth="0.5" />
                  <circle cx="16.4" cy="1.4" r="0.4" fill="#f97316" />
                </g>

                
                </g>
              </svg>
            </div>
            <div className="absolute top-[1.4%] left-[85.2%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-blue-500/50 pointer-events-none text-xs font-bold text-blue-400 whitespace-nowrap shadow-lg">C</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[68.5%] left-[107%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [12, -12, 12] }} transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 1.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-600/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-blue-600/50 pointer-events-none text-xs font-bold text-blue-500 whitespace-nowrap shadow-lg">C++</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[110%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [12, -12, 12] }} transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 2.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-purple-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" alt="C#" className="w-16 h-16 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-purple-500/50 pointer-events-none text-xs font-bold text-purple-500 whitespace-nowrap shadow-lg">C#</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[68.5%] left-[-7%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-orange-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-orange-500/50 pointer-events-none text-xs font-bold text-orange-500 whitespace-nowrap shadow-lg">Java</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[1.4%] left-[14.8%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [12, -12, 12] }} transition={{ repeat: Infinity, duration: 8.2, ease: "easeInOut", delay: 1.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-yellow-500/50 pointer-events-none text-xs font-bold text-yellow-500 whitespace-nowrap shadow-lg">Python</span>
                </div>
              </motion.div>
            </div>
          </div>
</div>
      </motion.div>
    </motion.div>
  );

  const skills = [
    { name: "html", level: "95%" },
    { name: "css", level: "90%" },
    { name: "java script", level: "85%" },
    { name: "jquery", level: "75%" },
    { name: "PHP", level: "80%" },
    { name: "Larraval", level: "70%" },
    { name: "Wordpress", level: "85%" },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      className="flex flex-col xl:flex-row items-center justify-between px-4 md:px-10 mt-28 md:mt-36 w-full z-[20] gap-10"
    >
      
      {/* LEFT SIDE: New Cyberpunk HUD */}
      <motion.div variants={slideInFromLeft(0.5)} className="w-full xl:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[650px] border-[1.5px] border-cyan-500/60 bg-[#020617]/70 backdrop-blur-xl p-6 lg:p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] [clip-path:polygon(4%_0,96%_0,100%_6%,100%_94%,96%_100%,4%_100%,0_94%,0_6%)] transition-all duration-300">
          
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-400 opacity-80 shadow-[-5px_-5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400 opacity-80 shadow-[5px_-5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-400 opacity-80 shadow-[-5px_5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-400 opacity-80 shadow-[5px_5px_20px_rgba(34,211,238,0.5)]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-transparent pointer-events-none"></div>

          <div className="flex flex-col items-center gap-8 relative z-10 w-full pt-4">
            
            {/* Left: HUD Radar Profile Area */}
            <div className="relative flex justify-center items-center w-[200px] sm:w-[250px] aspect-square flex-shrink-0">
              <svg className="absolute w-[125%] h-[125%] animate-[spin_30s_linear_infinite] opacity-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="10 10" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="40 20 10 20" />
                <path d="M 5 100 A 95 95 0 0 1 195 100" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                <path d="M 10 100 L 25 100 M 190 100 L 175 100 M 100 10 L 100 25 M 100 190 L 100 175" stroke="#38bdf8" strokeWidth="4" strokeLinecap="square" />
              </svg>
              <svg className="absolute w-[110%] h-[110%] animate-[spin_20s_linear_infinite_reverse] opacity-80" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="1 10" />
                <circle cx="100" cy="100" r="82" fill="none" stroke="#22d3ee" strokeWidth="5" strokeDasharray="80 150" />
                <path d="M 15 100 L 30 100 M 185 100 L 170 100 M 100 15 L 100 30 M 100 185 L 100 170" stroke="#06b6d4" strokeWidth="2" />
              </svg>
              <div className="w-[82%] h-[82%] rounded-full overflow-hidden border-4 border-[#083344] shadow-[0_0_40px_rgba(6,182,212,0.4)] relative bg-[#000510] z-10 ring-4 ring-cyan-500/20">
                <Image src="/nayeem.png" alt="MD Shefat / Profile" fill className="object-cover scale-[1.1] translate-y-2 select-none" sizes="250px" />
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
              </div>
            </div>

            {/* Right: Holographic Terminal Info Data */}
            <div className="flex flex-col w-full gap-5">
              <div className="border-b border-cyan-900/40 pb-4 relative">
                <div className="absolute right-0 top-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-cyan-400 shadow-[0_0_10px_cyan]"></div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 tracking-[0.3em] font-mono text-xs drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]">///////////</span>
                  <span className="text-gray-300 font-mono text-xs tracking-widest lowercase">curriculum vitae</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-widest uppercase mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">MD. ABU AHSAN</h1>
                <div className="flex flex-col gap-1 mt-4 font-mono tracking-wider">
                  <span className="text-cyan-500 text-sm uppercase drop-shadow-[0_0_5px_cyan] font-bold">Status</span>
                  <span className="text-white text-base uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] tracking-widest">Web Full Stack Developer</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-cyan-500 mb-2 font-mono text-sm tracking-[0.2em] font-bold drop-shadow-[0_0_5px_cyan]">Skills</h3>
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between gap-4 w-full group">
                    <div className="flex-1 bg-[#020617] h-2 rounded-r-md overflow-hidden border-y border-r border-cyan-900/50 relative shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-white rounded-r-md shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                      >
                        <div className="absolute right-0 top-0 w-2 h-full bg-cyan-300 shadow-[0_0_15px_cyan]"></div>
                      </motion.div>
                    </div>
                    <span className="w-20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] text-right drop-shadow-[0_0_5px_cyan] group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Hire Me', 'About Me', 'Contact Me'].map((btn, i) => (
                  <button key={i} className="flex-1 min-w-[100px] bg-cyan-950/20 border border-cyan-600/40 py-2 px-2 rounded-sm text-cyan-50 font-mono uppercase tracking-widest text-[10px] hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                    <span className="relative z-10 block text-center font-bold tracking-[0.1em]">{btn}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Extracted Solar System Rings */}
      <motion.div
        variants={slideInFromRight(0.8)}
        style={{ 
          y: parallaxOrbital, 
          scale: scaleOrbital, 
          opacity: opacityOrbital,
          rotateX: rotateXOrbital,
          rotateZ: rotateZOrbital,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="w-full h-full flex justify-center items-center relative z-0 origin-center"
      >
        <motion.div style={{ y: parallaxBackground, transform: "translateZ(-100px)" }} className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-cyan-500/20 blur-[80px] rounded-full point-events-none"></div>
        </motion.div>
        <div style={{ transformStyle: "preserve-3d" }} className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center">
          {/* Waving Background Circles - Smooth pulsating effect to fix blipping */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px]">
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut" }}
              className="top-0 left-0 w-full h-full border border-cyan-500/50 rounded-full absolute"
            ></motion.div>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 2 }}
              className="top-0 left-0 w-full h-full border border-purple-500/50 rounded-full absolute"
            ></motion.div>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 4 }}
              className="top-0 left-0 w-full h-full border border-cyan-500/50 rounded-full absolute"
            ></motion.div>
          </div>

          {/* Decorative spinning rings (Orbit Path) - Added 4th outer ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-indigo-400/50 shadow-[0_0_15px_rgba(129,140,248,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]">
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-teal-400/50 shadow-[0_0_15px_rgba(45,212,191,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>

          {/* Central Processor Image - Perfectly centered with absolute placement wrapper */}
          {/* Enhanced Sun-like Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[250px] md:h-[250px] bg-cyan-400/40 blur-[80px] rounded-full animate-pulse z-20 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-[#000000e8] backdrop-blur-xl border-4 border-cyan-500/50 shadow-[0_0_80px_rgba(34,211,238,0.8)] border-cyan-400 overflow-hidden flex items-center justify-center relative"
            >
              {/* Decorative inner rings for HUD effect */}
              <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/50 animate-[spin_15s_linear_infinite_reverse]" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 md:w-20 md:h-20 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
              </svg>
            </motion.div>
          </div>
          









                    {/* --- Ring 1 (Inner, 60% Width -> 30% Radius) - 5 Databases --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r1" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r1)">
{/* 11. Ring 1 Top: MySQL */}
                <g className="animate-[pulse_4.2s_ease-in-out_infinite_0.1s]">
                  <path d="M 50 50 L 48 48 L 48 20 L 50 20" fill="none" stroke="#22d3ee" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="48" cy="20" r="0.4" fill="#22d3ee" />
                </g>

                
{/* 12. Ring 1 Top Right: PostgreSQL */}
                <g className="animate-[pulse_3.2s_ease-in-out_infinite_0.6s]">
                  <path d="M 50 50 L 60 40 L 78.5 40 L 78.5 41" fill="none" stroke="#60a5fa" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="60" cy="40" r="0.4" fill="#60a5fa" />
                </g>

                
{/* 13. Ring 1 Bottom Right: MongoDB */}
                <g className="animate-[pulse_5.2s_ease-in-out_infinite_1.1s]">
                  <path d="M 50 50 L 60 60 L 67.6 67.6 L 67.6 74" fill="none" stroke="#4ade80" strokeWidth="0.2" className="animate-line-flow" />
                  <path d="M 67.6 73 L 68.6 74 L 67.6 75 Z" fill="#4ade80" />
                </g>

                
{/* 14. Ring 1 Bottom Left: Redis */}
                <g className="animate-[pulse_4.6s_ease-in-out_infinite_0.3s]">
                  <path d="M 50 50 L 40 60 L 32.4 67.6 L 32.4 74" fill="none" stroke="#f87171" strokeWidth="0.2" className="animate-line-flow" />
                  <path d="M 32.4 73 L 31.4 74 L 32.4 75 Z" fill="#f87171" />
                </g>

                
{/* 15. Ring 1 Top Left: Firebase */}
                <g className="animate-[pulse_3.8s_ease-in-out_infinite_0.7s]">
                  <path d="M 50 50 L 40 40 L 21.5 40 L 21.5 41" fill="none" stroke="#fbbf24" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="40" cy="40" r="0.4" fill="#fbbf24" />
                </g>

                
                </g>
              </svg>
            </div>
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-cyan-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-cyan-300 whitespace-nowrap shadow-lg">MySQL</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[41%] left-[78.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-emerald-500/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-emerald-400 whitespace-nowrap shadow-lg">MongoDB</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[74%] left-[67.6%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-sky-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-sky-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-sky-400 whitespace-nowrap shadow-lg">PostgreSQL</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[74%] left-[32.4%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" alt="Redis" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-red-500/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-red-500 whitespace-nowrap shadow-lg">Redis</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[41%] left-[21.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/firebase.png" width={24} height={24} alt="Firebase" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-yellow-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-yellow-400 whitespace-nowrap shadow-lg">Firebase</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 2 (Middle, 80% Width -> 40% Radius) - 5 Frontend Frameworks --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r2" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r2)">
{/* 16. Ring 2 Top Right: React */}
                <g className="animate-[pulse_4.8s_ease-in-out_infinite_1.3s]">
                  <path d="M 50 50 L 65 35 L 65 17.6 L 73.5 17.6" fill="none" stroke="#38bdf8" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="65" cy="35" r="0.4" fill="#38bdf8" />
                  <circle cx="65" cy="17.6" r="0.4" fill="#38bdf8" />
                </g>

                
{/* 17. Ring 2 Bottom Right: Vue */}
                <g className="animate-[pulse_3.6s_ease-in-out_infinite_0.4s]">
                  <path d="M 50 50 L 65 65 L 88 65 L 88 62.3" fill="none" stroke="#34d399" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="65" cy="65" r="0.4" fill="#34d399" />
                  <rect x="87" y="61.3" width="2" height="2" fill="none" stroke="#34d399" strokeWidth="0.3" />
                </g>

                
{/* 18. Ring 2 Bottom: Angular */}
                <g className="animate-[pulse_5.8s_ease-in-out_infinite_0.9s]">
                  <path d="M 50 50 L 52 52 L 52 90 L 50 90" fill="none" stroke="#fb7185" strokeWidth="0.2" className="animate-line-flow" />
                  <rect x="49" y="89" width="2" height="2" fill="none" stroke="#fb7185" strokeWidth="0.3" />
                </g>

                
{/* 19. Ring 2 Bottom Left: Tailwind */}
                <g className="animate-[pulse_4.4s_ease-in-out_infinite_1.4s]">
                  <path d="M 50 50 L 35 65 L 12 65 L 12 62.3" fill="none" stroke="#38bdf8" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="35" cy="65" r="0.4" fill="#38bdf8" />
                  <rect x="11" y="61.3" width="2" height="2" fill="none" stroke="#38bdf8" strokeWidth="0.3" />
                </g>

                
{/* 20. Ring 2 Top Left: Next.js */}
                <g className="animate-[pulse_3.4s_ease-in-out_infinite_0.5s]">
                  <path d="M 50 50 L 35 35 L 35 17.6 L 26.5 17.6" fill="none" stroke="#a1a1aa" strokeWidth="0.2" className="animate-line-flow" />
                  <circle cx="35" cy="35" r="0.4" fill="#a1a1aa" />
                  <circle cx="35" cy="17.6" r="0.4" fill="#a1a1aa" />
                </g>
              
                </g>
              </svg>
            </div>
            <div className="absolute top-[17.6%] left-[73.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 0.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/react.png" width={28} height={28} alt="React" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-cyan-400/50 pointer-events-none text-[10px] font-bold text-cyan-400 whitespace-nowrap shadow-lg">React</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[62.3%] left-[88%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 1.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" alt="Vue" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-emerald-400/50 pointer-events-none text-[10px] font-bold text-emerald-400 whitespace-nowrap shadow-lg">Vue.js</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 2.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-orange-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/html.png" width={28} height={28} alt="HTML" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-orange-500/50 pointer-events-none text-[10px] font-bold text-orange-500 whitespace-nowrap shadow-lg">HTML</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[62.3%] left-[12%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 1.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/css.png" width={28} height={28} alt="CSS" className="w-7 h-7 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-blue-500/50 pointer-events-none text-[10px] font-bold text-blue-400 whitespace-nowrap shadow-lg">CSS</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[17.6%] left-[26.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-white/50 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <Image src="/skills/next.png" width={28} height={28} alt="Next.js" className="w-7 h-7 object-contain invert" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-white/50 pointer-events-none text-[10px] font-bold text-white whitespace-nowrap shadow-lg">Next.js</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 3 (Outer, 100% Width -> 50% Radius) - 5 Backends --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r3" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r3)">
{/* 1. Ring 3 Top: PHP */}
                <g className="animate-[pulse_4s_ease-in-out_infinite]">
                  <path d="M 50 50 L 45 45 L 45 15 L 50 10 L 50 5" fill="none" stroke="#818cf8" strokeWidth="0.2" className="animate-line-flow" />
                  <path d="M 50 50 L 45 45 L 45 15" fill="none" className="animate-line-flow" stroke="#818cf8" strokeWidth="0.4" />
                  <circle cx="45" cy="45" r="0.8" fill="#818cf8" />
                  <circle cx="50" cy="5" r="1.5" fill="none" stroke="#818cf8" strokeWidth="0.4" />
                  <circle cx="50" cy="5" r="0.5" fill="#818cf8" />
                </g>

                
{/* 2. Ring 3 Top Right: JavaScript */}
                <g className="animate-[pulse_3s_ease-in-out_infinite_0.5s]">
                  <path d="M 50 50 L 65 50 L 80.5 34.5 L 94 34.5" fill="none" stroke="#facc15" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="65" cy="50" r="0.6" fill="#facc15" />
                  <circle cx="80.5" cy="34.5" r="0.6" fill="#facc15" />
                  <rect x="93" y="33.5" width="2" height="2" fill="none" stroke="#facc15" strokeWidth="0.5" />
                </g>

                
{/* 3. Ring 3 Bottom Right: Node.js */}
                <g className="animate-[pulse_5s_ease-in-out_infinite_1s]">
                  <path d="M 50 50 L 50 65 L 75.4 90.4 L 76 90.4" fill="none" stroke="#4ade80" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="50" cy="65" r="0.6" fill="#4ade80" />
                  <circle cx="75.4" cy="90.4" r="0.6" fill="#4ade80" />
                  <path d="M 76 89.4 L 77 90.4 L 76 91.4 Z" fill="#4ade80" />
                </g>

                
{/* 4. Ring 3 Bottom Left: Laravel */}
                <g className="animate-[pulse_4s_ease-in-out_infinite_0.2s]">
                  <path d="M 50 50 L 50 65 L 24.6 90.4 L 24 90.4" fill="none" stroke="#f87171" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="50" cy="65" r="0.6" fill="#f87171" />
                  <circle cx="24.6" cy="90.4" r="0.6" fill="#f87171" />
                  <path d="M 24 89.4 L 23 90.4 L 24 91.4 Z" fill="#f87171" />
                </g>

                
{/* 5. Ring 3 Top Left: Kotlin */}
                <g className="animate-[pulse_3s_ease-in-out_infinite_0.8s]">
                  <path d="M 50 50 L 35 50 L 19.5 34.5 L 6 34.5" fill="none" stroke="#c084fc" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="35" cy="50" r="0.6" fill="#c084fc" />
                  <rect x="5" y="33.5" width="2" height="2" fill="#c084fc" />
                </g>

                
                </g>
              </svg>
            </div>
            <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-indigo-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(129,140,248,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" alt="PHP" className="w-8 h-8 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-indigo-400/50 pointer-events-none text-[11px] font-bold text-indigo-400 whitespace-nowrap shadow-lg">PHP</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[34.5%] left-[97.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <Image src="/skills/js.png" width={32} height={32} alt="JavaScript" className="w-8 h-8 object-contain rounded-sm" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-yellow-400/50 pointer-events-none text-[11px] font-bold text-yellow-400 whitespace-nowrap shadow-lg">JavaScript</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90.4%] left-[79.3%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <Image src="/skills/node.png" width={32} height={32} alt="Node.js" className="w-8 h-8 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-green-500/50 pointer-events-none text-[11px] font-bold text-green-400 whitespace-nowrap shadow-lg">Node.js</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90.4%] left-[20.7%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 0.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-8 h-8 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-red-500/50 pointer-events-none text-[11px] font-bold text-red-500 whitespace-nowrap shadow-lg">Laravel</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[34.5%] left-[2.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 2.5 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" alt="Kotlin" className="w-8 h-8 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-purple-500/50 pointer-events-none text-[11px] font-bold text-purple-400 whitespace-nowrap shadow-lg">Kotlin</span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 4 (Outermost, 120% Width -> 60% Radius) - 5 Languages - MUCH BIGGER --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
<div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-80">
                <defs>
                  <filter id="neon-glow-r4" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#neon-glow-r4)">
{/* 6. Ring 4 Top Right: C */}
                <g className="animate-[pulse_5s_ease-in-out_infinite_1.5s]">
                  <path d="M 50 50 L 60 40 L 60 25 L 83.6 1.4" fill="none" stroke="#60a5fa" strokeWidth="0.25" className="animate-line-flow" />
                  <circle cx="60" cy="40" r="0.6" fill="#60a5fa" />
                  <circle cx="60" cy="25" r="0.6" fill="#60a5fa" />
                  <circle cx="83.6" cy="1.4" r="1.2" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
                  <circle cx="83.6" cy="1.4" r="0.4" fill="#60a5fa" />
                </g>

                
{/* 7. Ring 4 Bottom Right: C++ */}
                <g className="animate-[pulse_4s_ease-in-out_infinite_0.6s]">
                  <path d="M 50 50 L 75 50 L 93.5 68.5 L 102 68.5" fill="none" stroke="#3b82f6" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="75" cy="50" r="0.8" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
                  <circle cx="93.5" cy="68.5" r="0.6" fill="#3b82f6" />
                  <polygon points="102,67.5 104,68.5 102,69.5" fill="#3b82f6" />
                </g>

                
{/* 8. Ring 4 Bottom: C# */}
                <g className="animate-[pulse_4.5s_ease-in-out_infinite_0.4s]">
                  <path d="M 50 50 L 55 55 L 55 85 L 50 90 L 50 105" fill="none" stroke="#a855f7" strokeWidth="0.3" className="animate-line-flow" />
                  <path d="M 50 50 L 55 55 L 55 85" fill="none" className="animate-line-flow" stroke="#a855f7" strokeWidth="0.5" />
                  <circle cx="55" cy="55" r="0.6" fill="#a855f7" />
                  <circle cx="50" cy="105" r="1.5" fill="none" stroke="#a855f7" strokeWidth="0.5" />
                  <circle cx="50" cy="105" r="0.5" fill="#a855f7" />
                </g>

                
{/* 9. Ring 4 Bottom Left: Python */}
                <g className="animate-[pulse_3.5s_ease-in-out_infinite_1.2s]">
                  <path d="M 50 50 L 25 50 L 6.5 68.5 L -2 68.5" fill="none" stroke="#eab308" strokeWidth="0.3" className="animate-line-flow" />
                  <circle cx="25" cy="50" r="0.8" fill="none" stroke="#eab308" strokeWidth="0.3" />
                  <circle cx="6.5" cy="68.5" r="0.6" fill="#eab308" />
                  <polygon points="-2,67.5 -4,68.5 -2,69.5" fill="#eab308" />
                </g>

                
{/* 10. Ring 4 Top Left: Java */}
                <g className="animate-[pulse_5.5s_ease-in-out_infinite_0.9s]">
                  <path d="M 50 50 L 40 40 L 40 25 L 16.4 1.4" fill="none" stroke="#f97316" strokeWidth="0.25" className="animate-line-flow" />
                  <circle cx="40" cy="40" r="0.6" fill="#f97316" />
                  <circle cx="40" cy="25" r="0.6" fill="#f97316" />
                  <circle cx="16.4" cy="1.4" r="1.2" fill="none" stroke="#f97316" strokeWidth="0.5" />
                  <circle cx="16.4" cy="1.4" r="0.4" fill="#f97316" />
                </g>

                
                </g>
              </svg>
            </div>
            <div className="absolute top-[1.4%] left-[85.2%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-blue-500/50 pointer-events-none text-xs font-bold text-blue-400 whitespace-nowrap shadow-lg">C</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[68.5%] left-[107%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [12, -12, 12] }} transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 1.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-600/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-blue-600/50 pointer-events-none text-xs font-bold text-blue-500 whitespace-nowrap shadow-lg">C++</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[110%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [12, -12, 12] }} transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 2.2 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-purple-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" alt="C#" className="w-16 h-16 object-contain" />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-purple-500/50 pointer-events-none text-xs font-bold text-purple-500 whitespace-nowrap shadow-lg">C#</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[68.5%] left-[-7%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ x: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-orange-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-orange-500/50 pointer-events-none text-xs font-bold text-orange-500 whitespace-nowrap shadow-lg">Java</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[1.4%] left-[14.8%] -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [12, -12, 12] }} transition={{ repeat: Infinity, duration: 8.2, ease: "easeInOut", delay: 1.8 }} className="animate-[spin_120s_linear_infinite_reverse]">
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer relative">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-16 h-16 object-contain" />
                   <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-yellow-500/50 pointer-events-none text-xs font-bold text-yellow-500 whitespace-nowrap shadow-lg">Python</span>
                </div>
              </motion.div>
            </div>
          </div>
</div>
     </motion.div>

    </motion.div>
  );
};
