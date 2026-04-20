"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Custom hook for a true "coder typing" effect
const TypewriterText = ({
  text,
  delay = 0,
  speed = 10,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, hasStarted, speed]);

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: displayText }} />
      {hasStarted && (
        <span className="inline-block w-2.5 h-4 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
      )}
    </>
  );
};

export const AboutContent = () => {
  const [mounted, setMounted] = useState(false);
  const [consoleReady, setConsoleReady] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setConsoleReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[1400px] mx-auto min-h-[900px] lg:min-h-[800px] flex items-center justify-center font-mono overflow-hidden py-10 px-4 md:px-10 z-20">
      {/* --- HUD FRAME BORDERS --- */}
      <div className="absolute inset-4 pointer-events-none hidden md:block">
        {/* Top Left Bracket */}
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
        {/* Top Right Bracket */}
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
        {/* Bottom Left Bracket */}
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
        {/* Bottom Right Bracket */}
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

        {/* Connecting Lines */}
        <div className="absolute top-[1px] left-[80px] right-[80px] h-[1px] bg-cyan-500/20"></div>
        <div className="absolute bottom-[1px] left-[80px] right-[80px] h-[1px] bg-cyan-500/20"></div>
        <div className="absolute left-[1px] top-[80px] bottom-[80px] w-[1px] bg-cyan-500/20"></div>
        <div className="absolute right-[1px] top-[80px] bottom-[80px] w-[1px] bg-cyan-500/20"></div>
      </div>

      {/* --- BACKGROUND GLOW & PARTICLES --- */}
      <div className="absolute inset-0 bg-[url('/bg-hud.png')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- HUD ELEMENTS --- */}

      {/* 1. DATA SCANNING GRID (Top-Left) */}
      <div className="absolute top-8 left-8 lg:top-[12%] lg:left-[8%] w-48 h-32 border border-cyan-500/30 bg-[#020617]/50 backdrop-blur-sm p-3 hidden xl:flex flex-col z-10 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        {/* Animated scanning line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,1)] animate-[scan_3s_linear_infinite]"></div>

        {/* Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        ></div>

        <div className="relative z-10">
          <p className="text-cyan-400 text-[10px] font-bold mb-1 tracking-widest uppercase">
            COORD
          </p>
          <div className="text-cyan-200/60 text-[8px] leading-relaxed font-mono">
            0x03587133 <br />
            6103.4150517289 <br />
            04045.5214087344 <br />
            wG4BvVLe47qXYaNCD
          </div>
          <p className="text-cyan-400 text-[10px] font-bold mt-3 mb-1 tracking-widest uppercase animate-pulse">
            DATA SCANNING
          </p>
          <div className="text-cyan-200/60 text-[8px] leading-relaxed font-mono">
            xyDt98IRzw0feV0qO <br />
            RazSWLfOvRdGdoVXx <br />
            3DPlCbsnTJVmjdpTr
          </div>
        </div>
      </div>

      {/* 2. MIDDLE LEFT RADAR */}
      <div className="absolute top-[45%] left-[-20px] lg:left-[5%] -translate-y-1/2 w-[220px] h-[220px] hidden lg:flex items-center justify-center opacity-80 z-0">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20"></div>
        <div className="absolute inset-[15px] rounded-full border border-dashed border-cyan-500/40 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-[35px] rounded-full border-[2px] border-cyan-400/20 border-l-cyan-400 animate-[spin_10s_linear_infinite_reverse]"></div>
        <div className="absolute inset-[50px] rounded-full border-[1px] border-cyan-500/30"></div>

        {/* Core elements */}
        <div className="absolute w-[40px] h-[40px] border border-orange-500/80 rotate-45 shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
        <div className="absolute w-[40px] h-[40px] border border-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.4)] animate-pulse"></div>
        <div className="absolute w-[8px] h-[8px] bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"></div>

        {/* Scanning line */}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-cyan-300 origin-left animate-[spin_4s_linear_infinite]"></div>

        {/* Ticks */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-orange-500/60 text-[8px] flex flex-col gap-[3px] font-bold">
          <span>200 ─</span>
          <span>100 ─</span>
          <span className="text-orange-400">000 ─</span>
          <span>-100 ─</span>
          <span>-200 ─</span>
        </div>
      </div>

      {/* 3. BOTTOM LEFT CHART UI */}
      <div className="absolute bottom-[10%] lg:bottom-[15%] left-[8%] lg:left-[10%] w-[140px] h-[70px] hidden xl:flex items-end gap-1 opacity-70 z-0">
        <div className="absolute -bottom-8 w-full text-center text-[10px] text-cyan-400/80 tracking-[0.3em] font-bold">
          {"{ 87 }"}
        </div>

        <div className="flex w-full items-end gap-[2px] h-full overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-cyan-500/40"
              style={{
                height: `${20 + Math.random() * 80}%`,
                animation: `pulse ${2 + Math.random() * 2}s infinite alternate`,
              }}
            ></div>
          ))}
        </div>

        {/* Radar sweep arch below */}
        <div className="absolute -bottom-4 -left-4 -right-4 h-[20px] border-b-[2px] border-dotted border-cyan-500/50 rounded-b-[50%]"></div>
        <div className="absolute -bottom-2 -left-2 -right-2 h-[15px] border-b-[1px] border-cyan-400/30 rounded-b-[50%]"></div>
      </div>

      {/* 4. MASSIVE RIGHT IRIS RING */}
      <div className="absolute top-[10%] right-[-30%] sm:right-[-15%] lg:right-[0%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] flex items-center justify-center opacity-30 lg:opacity-50 pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-cyan-500/40 animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute inset-[30px] rounded-full border-[15px] border-l-transparent border-cyan-800/40 animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="absolute inset-[60px] rounded-full border-[4px] border-cyan-500/20"></div>
        <div className="absolute inset-[80px] rounded-full border-[1px] border-dashed border-cyan-300/50 animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute inset-[130px] rounded-full border-[25px] border-t-cyan-500/30 border-r-cyan-500/30 border-b-transparent border-l-transparent animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-[130px] rounded-full border-[2px] border-cyan-400/50"></div>

        {/* Center Core */}
        <div className="absolute inset-[180px] rounded-full bg-[#020617]/50 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center shadow-[inset_0_0_50px_rgba(6,182,212,0.3)]">
          <div className="w-[40%] h-[40%] rounded-full bg-cyan-400/30 blur-md animate-pulse"></div>
          <div className="absolute w-[15%] h-[15%] rounded-full bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
        </div>

        {/* HUD Ring Metrics */}
        <div className="absolute top-[22%] right-[12%] bg-[#020617] border border-cyan-500/60 px-2 py-0.5 text-[10px] text-cyan-300 rotate-[12deg] tracking-widest">
          345°
        </div>
        <div className="absolute bottom-[22%] right-[16%] bg-[#020617] border border-cyan-500/60 px-2 py-0.5 text-[10px] text-cyan-300 -rotate-[12deg] tracking-widest">
          85v
        </div>
      </div>

      {/* --- CENTRAL MAIN PANEL --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full max-w-[900px] z-20 xl:ml-auto xl:mr-[4%] 2xl:mr-[8%] flex flex-col items-center xl:items-end"
      >
        {/* TABS OUTSIDE THE CARD */}
        <div className="flex flex-row justify-center sm:justify-start gap-2 sm:gap-4 mb-4 relative z-30 w-full xl:w-auto">
          {["skills", "education", "services"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest border transition-all duration-300 relative overflow-hidden group/tab ${
                activeTab === tab
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "border-cyan-800/50 bg-[#0b1426]/80 text-cyan-500/60 hover:border-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-900/40 backdrop-blur-md"
              }`}
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent group-hover/tab:w-full transition-all duration-700 ease-out z-0"></div>
              <span className="relative z-10 flex items-center gap-2 font-bold">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${activeTab === tab ? "bg-cyan-400 animate-pulse" : "bg-transparent border border-cyan-700"}`}
                ></span>
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Outer Glow & Border Wrap with Clip Path */}
        <div
          className="relative p-[1px] bg-gradient-to-br from-cyan-400/80 via-cyan-500/20 to-cyan-500/60 shadow-[0_0_30px_rgba(6,182,212,0.15)] group w-full"
          style={{
            clipPath:
              "polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
          }}
        >
          <div
            className="bg-[#0b1426]/90 backdrop-blur-xl w-full h-full p-6 sm:p-10 md:p-12 relative overflow-hidden"
            style={{
              clipPath:
                "polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)",
            }}
          >
            {/* Added: Hacker Code Background Image with deep blend modes */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity z-0 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1426]/50 via-transparent to-[#0b1426]/90 z-0 pointer-events-none"></div>

            {/* Highlight bar left */}
            <div className="absolute left-0 top-[20%] w-[3px] h-[60px] bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] z-10" />
            <div className="absolute right-0 bottom-[20%] w-[3px] h-[60px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)] z-10" />

            {/* Top Tech accent corners */}
            <div className="absolute top-[8px] right-[8px] w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 z-10"></div>
            <div className="absolute bottom-[8px] left-[8px] w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 z-10"></div>

            <div className="flex flex-col items-center sm:items-start mb-6 md:mb-10 w-full relative z-10">
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

              {/* Title Text - Coder Typing Vibe */}
              <h1 className="flex flex-col sm:flex-row items-start sm:items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.2em] ml-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
                <span className="text-cyan-500 text-xl sm:text-3xl mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
                  root@sys:~#
                </span>
                <span className="flex">
                  {"ABOUT_ME".split("").map((char, index) => (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15, duration: 0 }}
                      key={index}
                      className={
                        char === "_"
                          ? "text-transparent"
                          : "text-white font-sans"
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

            <div className="text-sm md:text-base text-slate-300 max-w-[750px] leading-relaxed mb-8 relative z-10 font-mono tracking-tight bg-black/40 p-4 border-l-4 border-cyan-500 rounded backdrop-blur-sm">
              <span className="text-green-400">&gt; RUN exe --about</span>
              <br />
              <span className="text-orange-400 font-bold tracking-wide">
                <TypewriterText
                  text="I am a Full-Stack Web Developer"
                  speed={40}
                  delay={1800}
                />
              </span>{" "}
              {consoleReady ? (
                <TypewriterText
                  text={
                    "with strong design and coding expertise, capable of translating client requirements into innovative, scalable, and high-quality web applications.<br/><br/><span style='color: #22d3ee;'>I blend robust back-end architecture with modern, visually stunning front-end interfaces</span> to deliver seamless user experiences. My passion lies in writing clean, modular code, continuously learning and adapting to new technologies in the ever-evolving digital landscape."
                  }
                  speed={15}
                  delay={3200}
                />
              ) : null}
            </div>

            {/* DYNAMIC TAB CONTENT */}
            <div className="relative z-10 min-h-[300px] mt-6">
              {activeTab === "skills" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 pr-0 sm:pr-0"
                >
                  {/* Category 1 & 4: Web Designing & Version Control */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Web Designing
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          "HTML",
                          "CSS (Sass)",
                          "Tailwind CSS",
                          "JavaScript",
                          "jQuery",
                          "Bootstrap",
                          "Vue.js",
                          "React.js",
                        ].map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            key={tech}
                            className="px-3 py-1.5 bg-cyan-950/30 border border-cyan-500/20 text-cyan-100 text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Version Control
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {["Git", "GitHub", "GitLab"].map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            key={tech}
                            className="px-3 py-1.5 bg-green-950/30 border border-green-500/20 text-green-100 text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:border-green-400 hover:bg-green-500/20 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Categories 2, 3 & 5: Dev, DB & OS */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Web Development
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {["PHP", "Laravel", "Node Js"].map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            key={tech}
                            className="px-3 py-1.5 bg-orange-950/30 border border-orange-500/20 text-orange-100 text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(249,115,22,0.1)] hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:border-orange-400 hover:bg-orange-500/20 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Database
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {["MySQL", "MongoDB"].map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            key={tech}
                            className="px-3 py-1.5 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-[#ddd6fe] text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/30 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Working Exp.
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {["Cpanel", "VPS", "DevOps", "CI/CD"].map(
                          (tech, idx) => (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 * idx }}
                              key={tech}
                              className="px-3 py-1.5 bg-blue-950/30 border border-blue-500/20 text-blue-100 text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:border-blue-400 hover:bg-blue-500/20 hover:text-white transition-all cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Operating System
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {["Linux", "Windows"].map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            key={tech}
                            className="px-3 py-1.5 bg-red-950/30 border border-red-500/20 text-red-100 text-[10px] sm:text-xs rounded backdrop-blur-md shadow-[0_0_8px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:border-red-400 hover:bg-red-500/20 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="relative pl-6 border-l border-cyan-500/30 space-y-6">
                    <div className="border-l-[3px] border-cyan-500/50 pl-6 relative">
                      <div className="absolute w-[14px] h-[14px] bg-cyan-950 border-2 border-cyan-400 rounded-full -left-[9px] top-0 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute w-6 h-[2px] bg-cyan-500/50 -left-[2px] top-1.5"></div>
                      <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2 font-mono">
                        <span className="text-orange-400">&gt;</span> 2015 -
                        2020
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-wider mb-1 font-mono group-hover:text-cyan-300 transition-colors">
                        B.Sc in Computer Science & Engineering
                      </h3>
                      <p className="text-orange-300 text-sm font-mono mb-2">
                        Bangladesh Institute of Science and Technology (BIST)
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        CGPA: 2.77 / 4.00
                      </p>
                    </div>

                    <div className="border-l-[3px] border-cyan-500/50 pl-6 relative">
                      <div className="absolute w-[14px] h-[14px] bg-cyan-950 border-2 border-cyan-400 rounded-full -left-[9px] top-0 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute w-6 h-[2px] bg-cyan-500/50 -left-[2px] top-1.5"></div>
                      <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2 font-mono">
                        <span className="text-orange-400">&gt;</span> 2011 -
                        2013
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-wider mb-1 font-mono group-hover:text-cyan-300 transition-colors">
                        Higher Secondary Certificate (Science)
                      </h3>
                      <p className="text-orange-300 text-sm font-mono mb-2">
                        Tamirul Millat Kamil Madrasha, Jatrabari, Dhaka
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        GPA: 4.92 / 5.00
                      </p>
                    </div>

                    <div className="border-l-[3px] border-cyan-500/50 pl-6 relative">
                      <div className="absolute w-[14px] h-[14px] bg-cyan-950 border-2 border-cyan-400 rounded-full -left-[9px] top-0 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute w-6 h-[2px] bg-cyan-500/50 -left-[2px] top-1.5"></div>
                      <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2 font-mono">
                        <span className="text-orange-400">&gt;</span> 2009 -
                        2011
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-wider mb-1 font-mono group-hover:text-cyan-300 transition-colors">
                        Secondary School Certificate (Science)
                      </h3>
                      <p className="text-orange-300 text-sm font-mono mb-2">
                        Muradpur Islamia Alim Madrasha, Jurain, Dhaka
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        GPA: 4.69 / 5.00
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "services" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-0 sm:pr-0"
                >
                  <div className="p-5 border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm hover:border-cyan-400/80 transition-all group relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all z-10 m-2"></div>
                    <h3 className="text-cyan-300 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-cyan-500/30 pb-2 font-mono group-hover:text-white transition-colors">
                      <span className="text-xl font-sans text-cyan-500 group-hover:text-cyan-300">
                        {"</>"}
                      </span>{" "}
                      Frontend Architecture
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Building robust, scalable, and responsive user interfaces
                      using React, Next.js, and modern CSS frameworks like
                      Tailwind. Ensuring cross-browser compatibility and peak
                      performance.
                    </p>
                  </div>

                  <div className="p-5 border border-orange-500/30 bg-orange-950/20 backdrop-blur-sm hover:border-orange-400/80 transition-all group relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/30 opacity-0 group-hover:opacity-100 transition-all z-10 m-2"></div>
                    <h3 className="text-orange-300 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-orange-500/30 pb-2 font-mono group-hover:text-white transition-colors">
                      <span className="text-xl font-sans text-orange-500 group-hover:text-orange-300">
                        {"[DB]"}
                      </span>{" "}
                      Backend & API Systems
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Designing secure, fast server-side architectures using
                      PHP, Laravel, and Node.js. Efficiently managing data flow
                      with relational (MySQL) and NoSQL (MongoDB) databases.
                    </p>
                  </div>

                  <div className="p-5 border border-[#8b5cf6]/30 bg-purple-950/20 backdrop-blur-sm hover:border-[#8b5cf6]/80 transition-all group relative overflow-hidden sm:col-span-2 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8b5cf6]/30 opacity-0 group-hover:opacity-100 transition-all z-10 m-2"></div>
                    <h3 className="text-[#ddd6fe] text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-[#8b5cf6]/30 pb-2 font-mono group-hover:text-white transition-colors">
                      <span className="text-xl font-sans text-[#8b5cf6] group-hover:text-[#a78bfa]">
                        {"⚙"}
                      </span>{" "}
                      Full-Stack Implementation
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-[80%]">
                      End-to-end development covering the whole lifecycle—from
                      wireframing to database schema design, API integration,
                      and final deployment. Bridging the gap between UI
                      perfection and core logic.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* --- ORANGE NODE CONNECTORS (Linked to Main Panel) --- */}
        <div className="absolute top-1/2 left-[-160px] -translate-y-1/2 w-[160px] h-[200px] hidden xl:block z-0 pointer-events-none">
          <svg className="w-full h-full overflow-visible">
            {/* Top line to node 1 */}
            <path
              d="M 160 80 L 100 80 L 50 40 L 40 40"
              fill="none"
              stroke="#f97316"
              strokeWidth="1"
              strokeOpacity="0.6"
              className="animate-[pulse_3s_infinite]"
            />
            {/* Bottom line to node 2 */}
            <path
              d="M 160 140 L 100 140 L 50 180 L 40 180"
              fill="none"
              stroke="#f97316"
              strokeWidth="1"
              strokeOpacity="0.6"
              className="animate-[pulse_3s_infinite_1s]"
            />

            {/* Dots at Panel connection */}
            <circle cx="160" cy="80" r="3" fill="#f97316" />
            <circle cx="160" cy="140" r="3" fill="#f97316" />
            {/* Angles Dots */}
            <circle cx="100" cy="80" r="1.5" fill="#f97316" />
            <circle cx="100" cy="140" r="1.5" fill="#f97316" />
          </svg>

          {/* Top 3D Cylinder Node */}
          <div className="absolute top-[25px] left-[15px] w-12 h-6 group">
            {/* Ring top */}
            <div className="absolute inset-0 rounded-[50%] border-2 border-orange-500/80 bg-[#1a0500]/80 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10"></div>
            {/* Center core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-1.5 rounded-[50%] bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,1)] animate-pulse z-10"></div>
            {/* Red emitting dots on edge */}
            <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-red-500 z-10"></div>
            <div className="absolute bottom-1 right-2 w-1 h-1 rounded-full bg-red-500 z-10"></div>
            {/* Glowing beam downward */}
            <div
              className="absolute top-[50%] left-0 w-full h-[60px] bg-gradient-to-b from-orange-500/40 to-transparent z-0 pointer-events-none opacity-60"
              style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
            ></div>
          </div>

          {/* Bottom 3D Cylinder Node */}
          <div className="absolute top-[165px] left-[15px] w-12 h-6 group">
            <div className="absolute inset-0 rounded-[50%] border-2 border-orange-500/80 bg-[#1a0500]/80 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-1.5 rounded-[50%] bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,1)] animate-pulse z-10"></div>
            <div className="absolute top-1 right-2 w-1 h-1 rounded-full bg-red-500 z-10"></div>
            <div className="absolute bottom-1 left-2 w-1 h-1 rounded-full bg-red-500 z-10"></div>
            <div
              className="absolute top-[50%] left-0 w-full h-[60px] bg-gradient-to-b from-orange-500/40 to-transparent z-0 pointer-events-none opacity-60"
              style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Global CSS for Animations */}
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
