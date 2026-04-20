"use client";

import { motion } from "framer-motion";
import { slideInFromTop } from "@/lib/motion";

export const Contact = () => {
  return (
    <div
      id="contact"
      className="flex flex-row relative items-center justify-center min-h-[900px] w-full h-full py-20 z-20"
    >
      <div className="absolute w-auto h-auto top-[10%] sm:top-[15%] z-[5]">
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
          <h1 className="flex flex-col sm:flex-row items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
              root@sys:~#
            </span>
            <span className="flex">
              {"CONTACT_ME".split("").map((char, index) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15, duration: 0 }}
                  viewport={{ once: true }}
                  key={index}
                  className={
                    char === "_" ? "text-transparent" : "text-white font-sans"
                  }
                >
                  {char === "_" ? (
                    "\u00A0"
                  ) : char === "A" ? (
                    "Δ"
                  ) : char === "E" ? (
                    "Ξ"
                  ) : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O
                      <span className="absolute w-[6px] h-[6px] bg-white rounded-full"></span>
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
                className="inline-block w-[12px] sm:w-[20px] h-[30px] bg-green-500 ml-2 mt-2"
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center absolute z-[20] w-full max-w-[700px] px-6 mt-32"
      >
        <div className="relative w-full backdrop-blur-md bg-[#030014]/40 border border-purple-500/30 p-8 sm:p-10 shadow-[0_0_30px_rgba(112,66,248,0.15)] rounded-sm group overflow-hidden">
          {/* Coder corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

          {/* Glitchy scanner line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]"></div>

          <div className="flex items-center mb-8 gap-3">
            <span className="text-cyan-400 font-mono text-xl animate-pulse">
              $&gt;
            </span>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-slate-200 tracking-widest uppercase">
              init_contact.sh
            </h2>
          </div>

          <form className="flex flex-col gap-6 w-full font-mono relative z-10">
            <div className="flex flex-col gap-2 group/input">
              <label
                htmlFor="name"
                className="text-xs text-purple-300 uppercase tracking-widest"
              >
                [ usr_name ]
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div className="flex flex-col gap-2 group/input">
              <label
                htmlFor="email"
                className="text-xs text-purple-300 uppercase tracking-widest"
              >
                [ usr_email ]
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                placeholder="Enter your email..."
                required
              />
            </div>

            <div className="flex flex-col gap-2 group/input">
              <label
                htmlFor="message"
                className="text-xs text-purple-300 uppercase tracking-widest"
              >
                [ payload_data ]
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 resize-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                placeholder="Type your message here..."
                required
              />
            </div>

            <button
              type="button"
              className="mt-4 w-full py-3 bg-purple-600/20 hover:bg-cyan-500/20 border border-purple-500 text-purple-300 hover:text-cyan-300 hover:border-cyan-400 uppercase tracking-[0.3em] text-xs font-bold transition-all duration-300 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover/btn:w-full transition-all duration-700 ease-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Transmit <span className="animate-pulse">_</span>
              </span>
            </button>
          </form>
        </div>
      </motion.div>

      <div className="w-full flex items-start justify-center absolute inset-0 mix-blend-screen opacity-60 pointer-events-none z-0">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `,
        }}
      />
    </div>
  );
};
