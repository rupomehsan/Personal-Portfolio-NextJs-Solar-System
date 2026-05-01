"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypewriterText = ({
  text,
  delay = 0,
  speed = 40,
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

const experiences = [
  {
    company: "Techpark IT",
    location: "Mirpur-06",
    duration: "October 2023 - Present",
    role: "Software Engineer & Assistant Project Manager",
    description:
      "Expertise in full-stack web development using PHP, Laravel, Vue.js, and MySQL. Focused on delivering scalable, robust, and efficient web applications while supporting project planning, coordination, and successful delivery.",
    tech: ["PHP", "Laravel", "Vue.js", "MySQL"],
  },
  {
    company: "CCN Infotech Ltd",
    location: "Bashundhara R/A",
    duration: "June 2022 - September 2023",
    role: "Junior Software Engineer",
    description:
      "Spent a year gaining valuable experience working effectively with both front-end and back-end technologies.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "Laravel"],
  },
  {
    company: "Project X Ltd",
    location: "Khilkhet, Nikunja 2",
    duration: "September 2021 - May 2022",
    role: "Backend Developer",
    description:
      "Worked almost a year learning how to effectively use front-end and back-end technologies to help create scalable and all-encompassing solutions.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "Laravel"],
  },
];

export const Skills = () => {
  return (
    <section
      id="experience"
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-screen w-full max-w-[1400px] mx-auto"
    >
      {/* HUD Frame Borders */}
      <div className="absolute inset-4 pointer-events-none hidden md:block z-10">
        <svg width="80" height="80" className="absolute top-0 left-0 opacity-60">
          <path d="M 80 2 L 20 2 L 2 20 L 2 80" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 80 8 L 25 8 L 8 25 L 8 80" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
        <svg width="80" height="80" className="absolute top-0 right-0 opacity-60">
          <path d="M 0 2 L 60 2 L 78 20 L 78 80" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 0 8 L 55 8 L 72 25 L 72 80" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
        <svg width="80" height="80" className="absolute bottom-0 left-0 opacity-60">
          <path d="M 80 78 L 20 78 L 2 60 L 2 0" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 80 72 L 25 72 L 8 55 L 8 0" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
        <svg width="80" height="80" className="absolute bottom-0 right-0 opacity-60">
          <path d="M 0 78 L 60 78 L 78 60 L 78 0" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 0 72 L 55 72 L 72 55 L 72 0" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
        <div className="absolute top-[1px] left-[80px] right-[80px] h-[1px] bg-cyan-500/20" />
        <div className="absolute bottom-[1px] left-[80px] right-[80px] h-[1px] bg-cyan-500/20" />
        <div className="absolute left-[1px] top-[80px] bottom-[80px] w-[1px] bg-cyan-500/20" />
        <div className="absolute right-[1px] top-[80px] bottom-[80px] w-[1px] bg-cyan-500/20" />
      </div>
      <div className="absolute w-auto h-auto top-[5%] sm:top-[10%] z-[5]">
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
            <span className="text-cyan-500 text-xl sm:text-3xl sm:mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">
              root@sys:~#
            </span>
            <span className="flex">
              {"EXPERIENCE".split("").map((char, index) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0 }}
                  viewport={{ once: true }}
                  key={index}
                  className="text-white font-sans"
                >
                  {char === "E" ? "Ξ" : char}
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

      <div className="w-full max-w-[1000px] px-4 md:px-10 mt-32 sm:mt-40 z-20 relative">
        <div className="absolute left-[30px] sm:left-[80px] top-0 bottom-0 w-[2px] bg-cyan-500/30"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="mb-14 relative pl-12 sm:pl-24"
          >
            {/* Timeline Node */}
            <div className="absolute left-[19px] sm:left-[69px] top-2 w-[24px] h-[24px] bg-[#020617] border-2 border-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>

            {/* Connecting Line from Node to Card */}
            <div className="absolute left-[43px] sm:left-[93px] top-5 w-6 sm:w-16 h-[2px] bg-cyan-500/50 hidden sm:block"></div>

            <div
              className="bg-[#0b1426]/80 backdrop-blur-md border border-cyan-500/30 p-6 sm:p-8 relative group hover:border-cyan-400/80 transition-all duration-300"
              style={{
                clipPath:
                  "polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 m-2"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 m-2"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 border-b border-cyan-500/20 pb-4 relative z-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-wider">
                    {exp.role}
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm mt-1 flex items-center gap-2">
                    <span className="text-orange-500">@</span> {exp.company}{" "}
                    <span className="text-slate-500">|</span>{" "}
                    <span className="text-orange-300/80 text-xs">
                      {exp.location}
                    </span>
                  </p>
                </div>
                <div className="bg-[#020617]/50 px-4 py-1.5 border border-orange-500/30 rounded text-orange-400 text-xs font-mono whitespace-nowrap self-start sm:self-auto">
                  {exp.duration}
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-mono relative z-10">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 relative z-10">
                {exp.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-[10px] sm:text-xs rounded font-mono shadow-[0_0_8px_rgba(6,182,212,0.1)] group-hover:border-cyan-400 group-hover:bg-cyan-900/60 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── LEFT SIDE DECORATIONS ── */}

      {/* Left HUD Stats Panel */}
      <div className="absolute top-[8%] left-[1%] w-[170px] border border-cyan-500/30 bg-[#020617]/70 backdrop-blur-sm p-3.5 hidden xl:flex flex-col z-10 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.12)]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,1)]" style={{ animation: "scan 3s linear infinite" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.06) 1px,transparent 1px)", backgroundSize: "12px 12px" }} />
        <div className="relative z-10">
          <p className="text-cyan-400 text-[9px] font-bold mb-3 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />SYS::CAREER
          </p>
          <div className="flex flex-col gap-2.5">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-cyan-300 text-[24px] font-black leading-none">5+</span>
                <span className="text-cyan-500/70 text-[8px] tracking-widest uppercase font-bold">Yrs Exp</span>
              </div>
              <div className="w-full h-[2px] mt-1 bg-cyan-900/50"><div className="h-full w-[88%] bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.9)]" /></div>
            </div>
            <div className="w-full h-px bg-cyan-500/10" />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-orange-400 text-[24px] font-black leading-none">3</span>
                <span className="text-orange-500/70 text-[8px] tracking-widest uppercase font-bold">Companies</span>
              </div>
              <div className="w-full h-[2px] mt-1 bg-orange-900/50"><div className="h-full w-[60%] bg-orange-400/80 shadow-[0_0_6px_rgba(249,115,22,0.9)]" /></div>
            </div>
            <div className="w-full h-px bg-cyan-500/10" />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-purple-400 text-[24px] font-black leading-none">200+</span>
                <span className="text-purple-500/70 text-[8px] tracking-widest uppercase font-bold">Projects</span>
              </div>
              <div className="w-full h-[2px] mt-1 bg-purple-900/50"><div className="h-full w-[95%] bg-purple-400/80 shadow-[0_0_6px_rgba(167,139,250,0.9)]" /></div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-cyan-500/15 flex items-center justify-between">
            <span className="text-[8px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400/80">STATUS: ONLINE</span>
            </span>
            <span className="text-[7px] text-cyan-500/40 font-mono">v3.0</span>
          </div>
        </div>
      </div>

      {/* Left Orbital Radar */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[0%] xl:left-[3%] w-[190px] h-[190px] hidden xl:flex items-center justify-center opacity-70 z-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-[12px] rounded-full border border-dashed border-cyan-500/35 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-[32px] rounded-full border-[2px] border-cyan-400/20 border-l-cyan-400 animate-[spin_10s_linear_infinite_reverse]" />
        <div className="absolute inset-[48px] rounded-full border border-cyan-500/25" />
        <div className="absolute w-[36px] h-[36px] border border-orange-500/70 rotate-45 shadow-[0_0_12px_rgba(249,115,22,0.4)]" />
        <div className="absolute w-[36px] h-[36px] border border-orange-500/70 shadow-[0_0_12px_rgba(249,115,22,0.4)] animate-pulse" />
        <div className="absolute w-[7px] h-[7px] bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
        <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent to-cyan-300 origin-left animate-[spin_4s_linear_infinite]" />
        <div className="absolute -left-9 top-1/2 -translate-y-1/2 text-orange-500/60 text-[8px] flex flex-col gap-[3px] font-bold">
          <span>200 ─</span><span>100 ─</span><span className="text-orange-400">000 ─</span><span>-100 ─</span>
        </div>
      </div>

      {/* Left Skill Radar Chart */}
      <div className="absolute bottom-[10%] left-[4%] hidden xl:flex flex-col items-center z-0 pointer-events-none opacity-90">
        <svg viewBox="-65 -65 130 130" className="w-[130px] h-[130px]">
          {/* Axis lines */}
          <line x1="0" y1="0" x2="0"      y2="-50"    stroke="rgba(6,182,212,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="47.55"  y2="-15.45" stroke="rgba(6,182,212,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="29.39"  y2="40.45"  stroke="rgba(6,182,212,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="-29.39" y2="40.45"  stroke="rgba(6,182,212,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="-47.55" y2="-15.45" stroke="rgba(6,182,212,0.18)" strokeWidth="0.8" />
          {/* Web rings at 33 / 66 / 100% */}
          <polygon points="0,-16.5 15.69,-5.1 9.7,13.35 -9.7,13.35 -15.69,-5.1"          fill="none" stroke="rgba(6,182,212,0.09)" strokeWidth="0.5" />
          <polygon points="0,-33 31.39,-10.2 19.4,26.7 -19.4,26.7 -31.39,-10.2"          fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="0.5" />
          <polygon points="0,-50 47.55,-15.45 29.39,40.45 -29.39,40.45 -47.55,-15.45"   fill="none" stroke="rgba(6,182,212,0.2)"  strokeWidth="0.8" />
          {/* Data fill — FE 90%, BE 95%, DB 85%, OPS 70%, PM 80% */}
          <polygon
            points="0,-45 45.17,-14.68 24.98,34.38 -20.57,28.32 -38.04,-12.36"
            fill="rgba(6,182,212,0.10)"
            stroke="rgba(6,182,212,0.75)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Data dots */}
          <circle cx="0"      cy="-45"    r="2.5" fill="#22d3ee" filter="url(#gc)" />
          <circle cx="45.17"  cy="-14.68" r="2.5" fill="#22d3ee" filter="url(#gc)" />
          <circle cx="24.98"  cy="34.38"  r="2.5" fill="#22d3ee" filter="url(#gc)" />
          <circle cx="-20.57" cy="28.32"  r="2.5" fill="#f97316" filter="url(#go)" />
          <circle cx="-38.04" cy="-12.36" r="2.5" fill="#a78bfa" filter="url(#gp)" />
          {/* Glow filters */}
          <defs>
            <filter id="gc"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="go"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="gp"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* Axis labels */}
          <text x="0"    y="-57"  textAnchor="middle" dominantBaseline="middle" fill="rgba(34,211,238,0.65)"  fontSize="6.5" fontFamily="monospace" fontWeight="bold">FE</text>
          <text x="57"   y="-18"  textAnchor="start"  dominantBaseline="middle" fill="rgba(34,211,238,0.65)"  fontSize="6.5" fontFamily="monospace" fontWeight="bold">BE</text>
          <text x="35"   y="51"   textAnchor="middle" dominantBaseline="middle" fill="rgba(34,211,238,0.65)"  fontSize="6.5" fontFamily="monospace" fontWeight="bold">DB</text>
          <text x="-35"  y="51"   textAnchor="middle" dominantBaseline="middle" fill="rgba(249,115,22,0.65)"  fontSize="6.5" fontFamily="monospace" fontWeight="bold">OPS</text>
          <text x="-57"  y="-18"  textAnchor="end"    dominantBaseline="middle" fill="rgba(167,139,250,0.65)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">PM</text>
          {/* Center crosshair */}
          <circle cx="0" cy="0" r="2" fill="rgba(34,211,238,0.4)" />
        </svg>
        <span className="text-[8px] text-cyan-400/55 tracking-[0.22em] font-mono -mt-1">SKILL_RADAR</span>
      </div>

      {/* Left Node Connectors */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[16%] w-[100px] h-[180px] hidden xl:block z-0 pointer-events-none">
        <svg className="w-full h-full overflow-visible">
          <path d="M 100 65 L 50 65 L 18 30 L 6 30" fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.55" />
          <path d="M 100 125 L 50 125 L 18 160 L 6 160" fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.55" />
          <circle cx="100" cy="65"  r="3"   fill="#f97316" />
          <circle cx="100" cy="125" r="3"   fill="#f97316" />
          <circle cx="50"  cy="65"  r="1.5" fill="#f97316" fillOpacity="0.7" />
          <circle cx="50"  cy="125" r="1.5" fill="#f97316" fillOpacity="0.7" />
        </svg>
        {/* Top cylinder */}
        <div className="absolute top-[14px] left-[-8px] w-11 h-5">
          <div className="absolute inset-0 rounded-[50%] border-2 border-orange-500/80 bg-[#1a0500]/80 shadow-[0_0_12px_rgba(249,115,22,0.8)] z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-1 rounded-[50%] bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse z-10" />
          <div className="absolute top-0.5 left-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute bottom-0.5 right-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute top-full left-0 w-full h-[50px] bg-gradient-to-b from-orange-500/35 to-transparent z-0" style={{ clipPath: "polygon(5% 0,95% 0,80% 100%,20% 100%)" }} />
        </div>
        {/* Bottom cylinder */}
        <div className="absolute top-[146px] left-[-8px] w-11 h-5">
          <div className="absolute inset-0 rounded-[50%] border-2 border-orange-500/80 bg-[#1a0500]/80 shadow-[0_0_12px_rgba(249,115,22,0.8)] z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-1 rounded-[50%] bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse z-10" />
          <div className="absolute top-0.5 right-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute bottom-0.5 left-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute top-full left-0 w-full h-[50px] bg-gradient-to-b from-orange-500/35 to-transparent z-0" style={{ clipPath: "polygon(5% 0,95% 0,80% 100%,20% 100%)" }} />
        </div>
      </div>

      {/* ── RIGHT SIDE DECORATIONS ── */}

      {/* Right Tech Stack Panel */}
      <div className="absolute top-[8%] right-[1%] w-[170px] border border-orange-500/25 bg-[#020617]/70 backdrop-blur-sm p-3.5 hidden xl:flex flex-col z-10 overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.1)]">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-400/60 shadow-[0_0_10px_rgba(249,115,22,0.8)]" style={{ animation: "scan 4s linear infinite" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(249,115,22,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.05) 1px,transparent 1px)", backgroundSize: "12px 12px" }} />
        <div className="relative z-10">
          <p className="text-orange-400 text-[9px] font-bold mb-3 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />SYS::STACK
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Laravel",    pct: "95%", bar: "bg-red-400/70"    },
              { label: "Vue.js",     pct: "90%", bar: "bg-green-400/70"  },
              { label: "React/Next", pct: "80%", bar: "bg-cyan-400/70"   },
              { label: "MySQL",      pct: "88%", bar: "bg-orange-400/70" },
              { label: "PHP",        pct: "95%", bar: "bg-purple-400/70" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between font-mono text-[8px] mb-0.5">
                  <span className="text-slate-400">{s.label}</span>
                  <span className="text-slate-600">{s.pct}</span>
                </div>
                <div className="w-full h-[2px] bg-slate-800/80">
                  <div className={`h-full ${s.bar}`} style={{ width: s.pct }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-orange-500/15 flex items-center">
            <span className="text-[8px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400/80">ACTIVE: 5 STACKS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Orbital */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[0%] xl:right-[3%] w-[190px] h-[190px] hidden xl:flex items-center justify-center opacity-70 z-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-orange-500/20" />
        <div className="absolute inset-[12px] rounded-full border border-dashed border-orange-500/30 animate-[spin_25s_linear_infinite_reverse]" />
        <div className="absolute inset-[32px] rounded-full border-[2px] border-orange-400/20 border-r-orange-400 animate-[spin_12s_linear_infinite]" />
        <div className="absolute inset-[48px] rounded-full border border-orange-500/25" />
        <div className="absolute w-[36px] h-[36px] border border-cyan-500/60 rotate-45 shadow-[0_0_12px_rgba(6,182,212,0.3)]" />
        <div className="absolute w-[36px] h-[36px] border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)] animate-pulse" />
        <div className="absolute w-[7px] h-[7px] bg-orange-300 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]" />
        <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent to-orange-300 origin-left animate-[spin_5s_linear_infinite_reverse]" />
        <div className="absolute -right-9 top-1/2 -translate-y-1/2 text-cyan-500/60 text-[8px] flex flex-col gap-[3px] font-bold items-end">
          <span>─ 200</span><span>─ 100</span><span className="text-cyan-400">─ 000</span><span>─ -100</span>
        </div>
      </div>

      {/* Right Node Connectors */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[16%] w-[100px] h-[180px] hidden xl:block z-0 pointer-events-none">
        <svg className="w-full h-full overflow-visible">
          <path d="M 0 65 L 50 65 L 82 30 L 94 30"   fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.55" />
          <path d="M 0 125 L 50 125 L 82 160 L 94 160" fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.55" />
          <circle cx="0"  cy="65"  r="3"   fill="#f97316" />
          <circle cx="0"  cy="125" r="3"   fill="#f97316" />
          <circle cx="50" cy="65"  r="1.5" fill="#f97316" fillOpacity="0.7" />
          <circle cx="50" cy="125" r="1.5" fill="#f97316" fillOpacity="0.7" />
        </svg>
        {/* Top cylinder */}
        <div className="absolute top-[14px] right-[-8px] w-11 h-5">
          <div className="absolute inset-0 rounded-[50%] border-2 border-orange-500/80 bg-[#1a0500]/80 shadow-[0_0_12px_rgba(249,115,22,0.8)] z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-1 rounded-[50%] bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse z-10" />
          <div className="absolute top-0.5 left-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute bottom-0.5 right-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute top-full left-0 w-full h-[50px] bg-gradient-to-b from-orange-500/35 to-transparent z-0" style={{ clipPath: "polygon(5% 0,95% 0,80% 100%,20% 100%)" }} />
        </div>
        {/* Bottom cylinder */}
        <div className="absolute top-[146px] right-[-8px] w-11 h-5">
          <div className="absolute inset-0 rounded-[50%] border-2 border-orange-500/80 bg-[#1a0500]/80 shadow-[0_0_12px_rgba(249,115,22,0.8)] z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-1 rounded-[50%] bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse z-10" />
          <div className="absolute top-0.5 right-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute bottom-0.5 left-1.5 w-1 h-1 rounded-full bg-red-500 z-10" />
          <div className="absolute top-full left-0 w-full h-[50px] bg-gradient-to-b from-orange-500/35 to-transparent z-0" style={{ clipPath: "polygon(5% 0,95% 0,80% 100%,20% 100%)" }} />
        </div>
      </div>

      {/* Right Arc Gauge */}
      <div className="absolute bottom-[8%] right-[4%] hidden xl:flex flex-col items-center z-0 pointer-events-none opacity-90">
        <svg viewBox="0 0 130 80" className="w-[150px] h-[92px]">
          <defs>
            <filter id="fpurp"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="forg2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="fcyn2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* Outer track — r=50, Skills 88% — purple */}
          <path d="M 15 68 A 50 50 0 0 0 115 68" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 15 68 A 50 50 0 0 0 115 68" fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="4" strokeLinecap="round" strokeDasharray="138.23 18.85" filter="url(#fpurp)"/>
          {/* Middle track — r=38, Projects 80% — orange */}
          <path d="M 27 68 A 38 38 0 0 0 103 68" fill="none" stroke="rgba(249,115,22,0.12)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 27 68 A 38 38 0 0 0 103 68" fill="none" stroke="rgba(249,115,22,0.85)" strokeWidth="4" strokeLinecap="round" strokeDasharray="95.50 23.88" filter="url(#forg2)"/>
          {/* Inner track — r=26, Exp 65% — cyan */}
          <path d="M 39 68 A 26 26 0 0 0 91 68" fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 39 68 A 26 26 0 0 0 91 68" fill="none" stroke="rgba(6,182,212,0.85)" strokeWidth="4" strokeLinecap="round" strokeDasharray="53.09 28.59" filter="url(#fcyn2)"/>
          {/* Labels inside the gauge hollow */}
          <text x="65" y="54" textAnchor="middle" fill="rgba(167,139,250,0.8)" fontSize="7" fontFamily="monospace" fontWeight="bold">SKILLS·88%</text>
          <text x="65" y="62" textAnchor="middle" fill="rgba(249,115,22,0.8)" fontSize="7" fontFamily="monospace" fontWeight="bold">PROJ·80%</text>
          <text x="65" y="70" textAnchor="middle" fill="rgba(6,182,212,0.8)" fontSize="7" fontFamily="monospace" fontWeight="bold">EXP·65%</text>
          {/* Center tick marks */}
          <line x1="63" y1="69" x2="63" y2="73" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
          <line x1="65" y1="69" x2="65" y2="76" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
          <line x1="67" y1="69" x2="67" y2="73" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        </svg>
        <span className="text-[8px] text-orange-400/55 tracking-[0.22em] font-mono -mt-1">ARC_METRICS</span>
      </div>

      {/* Background elements */}
      <div className="w-full flex items-start justify-center absolute inset-0 mix-blend-screen opacity-20 pointer-events-none z-0">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-full object-cover"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-transparent to-[#030014] pointer-events-none z-0" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%   { top: 0;    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      ` }} />
    </section>
  );
};
