"use client";

import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/lib/motion";

export const AboutContent = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center px-6 md:px-14 lg:px-20 w-full z-[20] gap-10 mt-10"
    >
      <motion.div 
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
              <motion.div initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 2 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>CSS3 / SASS</span>
              <span className="text-cyan-400">92%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "92%" }} transition={{ duration: 1.5, delay: 1.1 }} className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 3 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>JavaScript</span>
              <span className="text-cyan-400">88%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "88%" }} transition={{ duration: 1.5, delay: 1.2 }} className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 4 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>React / Next</span>
              <span className="text-cyan-400">85%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1.5, delay: 1.3 }} className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 5 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>PHP / Laravel</span>
              <span className="text-cyan-400">80%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "80%" }} transition={{ duration: 1.5, delay: 1.4 }} className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></motion.div>
            </div>
          </div>
          {/* Skill 6 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-slate-300">
              <span>Node.js</span>
              <span className="text-cyan-400">78%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "78%" }} transition={{ duration: 1.5, delay: 1.5 }} className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"></motion.div>
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
    </motion.div>
  );
};
