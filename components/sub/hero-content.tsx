"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiFiverr, SiUpwork, SiFreelancer } from "react-icons/si";
import { useRef, useState, useEffect } from "react";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [glowClicks, setGlowClicks] = useState(0);

  // Role cycling
  const ROLES = [
    "PHP · Laravel · MySQL Expert",
    "React · Vue · Frontend Dev",
    "Tech Enthusiast",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex((p) => (p + 1) % ROLES.length),
      3200,
    );
    return () => clearInterval(t);
  }, []);

  // 3-D tilt for the profile circle
  const circleRotX = useMotionValue(0);
  const circleRotY = useMotionValue(0);
  const smoothRotX = useSpring(circleRotX, { stiffness: 180, damping: 22 });
  const smoothRotY = useSpring(circleRotY, { stiffness: 180, damping: 22 });
  const handleCircleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    circleRotX.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 13);
    circleRotY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 13);
  };
  const handleCircleLeave = () => {
    circleRotX.set(0);
    circleRotY.set(0);
  };

  // Orbital system 3D mouse tilt
  const orbMouseX = useMotionValue(0);
  const orbMouseY = useMotionValue(0);
  const smoothOrbX = useSpring(orbMouseX, { stiffness: 100, damping: 18 });
  const smoothOrbY = useSpring(orbMouseY, { stiffness: 100, damping: 18 });
  const handleOrbitalMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    orbMouseX.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 18);
    orbMouseY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 18);
  };
  const handleOrbitalLeave = () => {
    orbMouseX.set(0);
    orbMouseY.set(0);
  };

  // Extremely professional, subtle 3D multi-layered parallax offsets
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const parallaxOrbital = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleOrbital = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityOrbital = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.5, 0],
  );

  // High-end 3D Holographic "Exploded View" Scroll Effects
  const rotateXOrbital = useTransform(
    scrollYProgress,
    [0, 1],
    ["0deg", "70deg"],
  );
  const rotateZOrbital = useTransform(
    scrollYProgress,
    [0, 1],
    ["0deg", "-45deg"],
  );
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
      className="flex flex-col xl:flex-row items-center xl:items-center justify-center xl:justify-center px-4 md:px-10 pt-20 pb-4 xl:pt-24 xl:pb-10 w-full z-[20] min-h-[100dvh] relative"
    >
      {/* GLOBAL CONNECTION HUB BETWEEN LEFT & RIGHT CORES */}
      <div className="absolute top-[53%] left-[25%] w-[50%] h-[100px] -translate-y-1/2 hidden xl:block z-0 pointer-events-none origin-left">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible opacity-80 mix-blend-screen"
        >
          <defs>
            <linearGradient
              id="connectorGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="70%" stopColor="#d946ef" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>

            <filter
              id="glowConnection"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="2.5" result="blur1" />
              <feGaussianBlur stdDeviation="5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="intenseGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComponentTransfer in="blur" result="glow">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowConnection)">
            {/* Background Faint Track */}
            <path
              d="M 22 50 L 30 50 L 35 30 L 45 30 L 55 50 M 30 50 L 35 70 L 45 70 L 55 50 M 22 50 L 95 50"
              fill="none"
              stroke="rgba(34, 211, 238, 0.15)"
              strokeWidth="0.8"
            />

            {/* Animated Solid Core Energy Line - piercing the right core */}
            <path
              d="M 22 50 L 95 50"
              fill="none"
              stroke="url(#glowPulse)"
              strokeWidth="1.5"
              className="opacity-50"
              style={{
                strokeDasharray: "200",
                strokeDashoffset: 200,
                animation: "dashFlow 4s ease-in-out infinite alternate",
              }}
            />

            {/* Geometric Hub Network Connectors - Dashed (Ends right before outer shell) */}
            <path
              d="M 22 50 L 30 50 L 35 30 L 45 30 L 55 50 M 30 50 L 35 70 L 45 70 L 55 50 M 22 50 L 95 50 M 35 30 L 35 70 M 45 30 L 45 70 M 40 30 L 40 70"
              fill="none"
              stroke="url(#connectorGradient)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              style={{
                strokeDashoffset: 100,
                animation: "dashFlow 6s linear infinite",
              }}
            />

            {/* Main Diamond Junctions */}
            <path
              d="M 30 48 L 32 50 L 30 52 L 28 50 Z"
              fill="#22d3ee"
              className="animate-pulse"
              filter="url(#intenseGlow)"
            />
            <path
              d="M 55 48 L 57 50 L 55 52 L 53 50 Z"
              fill="#e879f9"
              className="animate-pulse"
              filter="url(#intenseGlow)"
            />

            <circle
              cx="35"
              cy="30"
              r="1.2"
              fill="#22d3ee"
              filter="url(#intenseGlow)"
            />
            <circle
              cx="45"
              cy="30"
              r="1.2"
              fill="#8b5cf6"
              filter="url(#intenseGlow)"
            />
            <circle
              cx="35"
              cy="70"
              r="1.2"
              fill="#8b5cf6"
              filter="url(#intenseGlow)"
            />
            <circle
              cx="45"
              cy="70"
              r="1.2"
              fill="#22d3ee"
              filter="url(#intenseGlow)"
            />

            <circle
              cx="22"
              cy="50"
              r="1.5"
              fill="#22d3ee"
              filter="url(#intenseGlow)"
            />
            <circle
              cx="55"
              cy="50"
              r="1.2"
              fill="#8b5cf6"
              filter="url(#intenseGlow)"
            />
            <circle
              cx="95"
              cy="50"
              r="1.5"
              fill="#e879f9"
              filter="url(#intenseGlow)"
            />

            {/* Center Core Process Node */}
            <circle
              cx="40"
              cy="50"
              r="3"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.5"
              className="animate-[spin_4s_linear_infinite]"
              strokeDasharray="2 2"
            />
            <circle
              cx="40"
              cy="50"
              r="1.5"
              fill="#e879f9"
              filter="url(#intenseGlow)"
            >
              <animate
                attributeName="r"
                values="1.5;2.5;1.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* HIGH SPEED PACKETS */}
          </g>
          <style>
            {`
              @keyframes dashFlow {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </svg>
      </div>

      {/* LEFT SIDE: New Cyberpunk HUD */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="w-full flex flex-col items-center justify-center xl:justify-center xl:pr-0 h-full sm:h-auto basis-1/2"
      >
        {/* OUTSIDE TOP: Details Section / Name */}
        <div className="flex flex-col w-full max-w-[500px] items-center z-10 mb-4 sm:mb-10 text-center">
          {/* Terminal command badge */}

          {/* SOFTWARE ENGINEER label */}
          <div className="flex items-center gap-2 w-full justify-center mb-2">
            <div className="h-px flex-1 max-w-[32px] bg-gradient-to-r from-transparent to-cyan-500/40 hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-400 font-mono text-[10px] sm:text-xs tracking-[0.3em] font-bold uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              SOFTWARE ENGINEER
            </span>
            <div className="h-px flex-1 max-w-[32px] bg-gradient-to-l from-transparent to-cyan-500/40 hidden sm:block" />
          </div>

          {/* Name — typewriter */}
          <h1 className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide uppercase leading-tight mt-2 min-h-[1.2em]">
            <motion.div
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] whitespace-nowrap overflow-hidden pr-1"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
                repeatDelay: 2,
              }}
            >
              MD. ABU AHSAN
            </motion.div>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-[4px] md:w-[6px] h-[0.9em] bg-cyan-400 ml-1 shadow-[0_0_15px_rgba(34,211,238,1)]"
            />
          </h1>

          {/* Cycling role subtitle */}
          <div className="flex items-center justify-center gap-2 mt-2 min-h-[1.8em] font-mono">
            <span className="text-cyan-600/80 text-sm">{">"}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 7, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -7, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-sm text-purple-300/90 tracking-wide"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <motion.span
              className="text-purple-400 font-bold"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.85 }}
            >
              _
            </motion.span>
          </div>
        </div>

        {/* CIRCLE CENTER — Developer HUD Identity · 3D tilt */}
        <motion.div
          onMouseMove={handleCircleMove}
          onMouseLeave={handleCircleLeave}
          whileHover={{ scale: 1.025 }}
          transition={{ type: "spring", stiffness: 250, damping: 28 }}
          style={{
            rotateX: smoothRotX,
            rotateY: smoothRotY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] aspect-square flex flex-col items-center justify-center text-center z-20 group"
        >
          {/* ── Corner L-Bracket Frame ── */}
          <div className="absolute top-[4%] left-[4%] w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-cyan-400/75 z-30 pointer-events-none" />
          <div className="absolute top-[4%] right-[4%] w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-cyan-400/75 z-30 pointer-events-none" />
          <div className="absolute bottom-[4%] left-[4%] w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-cyan-400/75 z-30 pointer-events-none" />
          <div className="absolute bottom-[4%] right-[4%] w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-cyan-400/75 z-30 pointer-events-none" />

          {/* Corner pulse dots */}
          <div className="absolute top-[4%] left-[4%] w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] z-30 pointer-events-none animate-pulse" />
          <div
            className="absolute top-[4%] right-[4%] w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] z-30 pointer-events-none animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-[4%] left-[4%] w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(167,139,250,0.9)] z-30 pointer-events-none animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-[4%] right-[4%] w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(167,139,250,0.9)] z-30 pointer-events-none animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />

          {/* ── SVG HUD Ring: tick marks + cardinal diamonds ── */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <filter
                  id="hud-ring-glow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer boundary ring */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(6,182,212,0.13)"
                strokeWidth="1"
              />

              {/* Fine tick marks every 10° */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = ((i * 10 - 90) * Math.PI) / 180;
                const major = i % 3 === 0;
                const r1 = major ? 88 : 91;
                const x1 = 100 + r1 * Math.cos(angle);
                const y1 = 100 + r1 * Math.sin(angle);
                const x2 = 100 + 95 * Math.cos(angle);
                const y2 = 100 + 95 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      major ? "rgba(34,211,238,0.5)" : "rgba(34,211,238,0.18)"
                    }
                    strokeWidth={major ? "1.4" : "0.6"}
                  />
                );
              })}

              {/* Cardinal diamonds at N / E / S / W */}
              {[0, 90, 180, 270].map((deg, i) => {
                const a = ((deg - 90) * Math.PI) / 180;
                const cx = 100 + 95 * Math.cos(a);
                const cy = 100 + 95 * Math.sin(a);
                return (
                  <polygon
                    key={i}
                    points={`${cx},${cy - 4.5} ${cx + 3},${cy} ${cx},${cy + 4.5} ${cx - 3},${cy}`}
                    fill="#22d3ee"
                    filter="url(#hud-ring-glow)"
                    opacity="0.9"
                  />
                );
              })}

              {/* Inner dashed guide ring */}
              <circle
                cx="100"
                cy="100"
                r="79"
                fill="none"
                stroke="rgba(6,182,212,0.07)"
                strokeWidth="0.5"
                strokeDasharray="3 6"
              />
            </svg>
          </div>

          {/* ── Slowly Spinning Dashed Middle Ring ── */}
          <div className="absolute inset-[12px] rounded-full border border-dashed border-cyan-400/18 group-hover:border-cyan-300/30 transition-all duration-700 animate-[spin_100s_linear_infinite] z-10 pointer-events-none" />

          {/* ── Ambient background glow ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/5 to-transparent pointer-events-none rounded-full z-0" />

          {/* ── HUD Status: Top ── */}
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.9)] animate-pulse" />
            <span className="text-[7px] sm:text-[8px] font-mono text-green-400/80 tracking-[0.25em] uppercase">
              SYS_ONLINE
            </span>
          </div>

          {/* ── HUD Status: Bottom ── */}
          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="text-[7px] sm:text-[8px] font-mono text-cyan-500/55 tracking-[0.2em] uppercase select-none">
              &lt; FULL_STACK /&gt;
            </span>
          </div>

          {/* ── Floating mini tech chips at 45° corners ── */}
          <div className="absolute top-[13%] right-[9%] z-30 pointer-events-none hidden lg:flex items-center gap-1 bg-[#020617]/85 border border-cyan-500/25 backdrop-blur-sm px-2 py-[3px] rounded-sm">
            <span className="w-[5px] h-[5px] rounded-full bg-cyan-400/90 animate-pulse" />
            <span className="text-[7px] font-mono text-cyan-400/70 tracking-wider">
              Vue · React
            </span>
          </div>
          <div className="absolute bottom-[13%] right-[9%] z-30 pointer-events-none hidden lg:flex items-center gap-1 bg-[#020617]/85 border border-purple-500/25 backdrop-blur-sm px-2 py-[3px] rounded-sm">
            <span
              className="w-[5px] h-[5px] rounded-full bg-purple-400/90 animate-pulse"
              style={{ animationDelay: "0.7s" }}
            />
            <span className="text-[7px] font-mono text-purple-400/70 tracking-wider">
              Laravel
            </span>
          </div>
          <div className="absolute bottom-[13%] left-[9%] z-30 pointer-events-none hidden lg:flex items-center gap-1 bg-[#020617]/85 border border-emerald-500/25 backdrop-blur-sm px-2 py-[3px] rounded-sm">
            <span
              className="w-[5px] h-[5px] rounded-full bg-emerald-400/90 animate-pulse"
              style={{ animationDelay: "1.3s" }}
            />
            <span className="text-[7px] font-mono text-emerald-400/70 tracking-wider">
              MySQL
            </span>
          </div>
          <div className="absolute top-[13%] left-[9%] z-30 pointer-events-none hidden lg:flex items-center gap-1 bg-[#020617]/85 border border-yellow-500/25 backdrop-blur-sm px-2 py-[3px] rounded-sm">
            <span
              className="w-[5px] h-[5px] rounded-full bg-yellow-400/90 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
            <span className="text-[7px] font-mono text-yellow-400/70 tracking-wider">
              JS · PHP
            </span>
          </div>

          {/* ── Profile Image Wrapper with Orbiting Socials ── */}
          {/* translateZ lifts the core forward for a 3-D pop effect */}
          <motion.div
            style={{ translateZ: 35 }}
            className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px] flex-shrink-0 z-10 flex items-center justify-center"
          >
            {/* Inner orbit anchor ring */}
            <div className="absolute inset-[-20px] sm:inset-[-30px] lg:inset-[-40px] rounded-full border-[1px] border-cyan-500/30"></div>

            {/* Orbit track rings */}
            <div className="absolute inset-[-70px] sm:inset-[-95px] lg:inset-[-115px] rounded-full border-[1px] border-dashed border-cyan-500/30 animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-[-70px] sm:inset-[-95px] lg:inset-[-115px] rounded-full border-[1px] border-cyan-500/10"></div>

            {/* Orbiting Social Icons */}
            <div className="absolute inset-[-70px] sm:inset-[-95px] lg:inset-[-115px] rounded-full animate-[spin_40s_linear_infinite]">
              {(
                [
                  {
                    title: "GitHub",
                    Icon: FaGithub,
                    link: "https://github.com/rupomehsan",
                    color: "hover:text-white",
                    bColor: "hover:border-white/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]",
                  },
                  {
                    title: "LinkedIn",
                    Icon: FaLinkedinIn,
                    link: "https://www.linkedin.com/in/md-abu-ahsan-54515a1b2/",
                    color: "hover:text-[#0077B5]",
                    bColor: "hover:border-[#0077B5]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(0,119,181,0.6)]",
                  },
                  {
                    title: "Facebook",
                    Icon: FaFacebook,
                    link: "https://www.facebook.com/rupom.ehsan/",
                    color: "hover:text-[#1877F2]",
                    bColor: "hover:border-[#1877F2]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]",
                  },
                  {
                    title: "WhatsApp",
                    Icon: FaWhatsapp,
                    link: "https://wa.me/8801683392241",
                    color: "hover:text-[#25D366]",
                    bColor: "hover:border-[#25D366]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(37,211,102,0.6)]",
                  },
                  {
                    title: "Telegram",
                    Icon: FaTelegram,
                    link: "https://web.telegram.org/k/#-2272837972",
                    color: "hover:text-[#26A5E4]",
                    bColor: "hover:border-[#26A5E4]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(38,165,228,0.6)]",
                  },
                  {
                    title: "Fiverr",
                    Icon: SiFiverr,
                    link: "https://www.fiverr.com/rupom_ehsan/buying?source=avatar_menu_profile",
                    color: "hover:text-[#1DBF73]",
                    bColor: "hover:border-[#1DBF73]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(29,191,115,0.6)]",
                  },
                  {
                    title: "Upwork",
                    Icon: SiUpwork,
                    link: "https://www.upwork.com/freelancers/~010e8a7dea092d1282",
                    color: "hover:text-[#6FDA44]",
                    bColor: "hover:border-[#6FDA44]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(111,218,68,0.6)]",
                  },
                  {
                    title: "Freelancer",
                    Icon: SiFreelancer,
                    link: "https://www.freelancer.com.bd/u/rupomehsan",
                    color: "hover:text-[#29B2FE]",
                    bColor: "hover:border-[#29B2FE]/50",
                    shadow: "hover:shadow-[0_0_20px_rgba(41,178,254,0.6)]",
                  },
                ] as const
              ).map((item, i, arr) => {
                const angle = i * (360 / arr.length);
                return (
                  <div
                    key={i}
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    {/* Connector line from center to icon node */}
                    <div className="absolute inset-0 hidden sm:block z-0 pointer-events-none">
                      <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="w-full h-full overflow-visible opacity-50"
                      >
                        <g className="animate-[pulse_4.2s_ease-in-out_infinite]">
                          <path
                            d="M 50 50 L 45 45 L 45 10 L 50 0"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="0.5"
                            className="animate-line-flow"
                          />
                          <circle
                            cx="45"
                            cy="45"
                            r="1.5"
                            fill="#22d3ee"
                            className="animate-pulse"
                          />
                        </g>
                      </svg>
                    </div>
                    {/* Icon node */}
                    <div className="absolute top-0 left-1/2 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 -mt-5 -ml-5 sm:-mt-7 sm:-ml-7 lg:-mt-8 lg:-ml-8 z-20">
                      <div className="w-full h-full animate-[spin_40s_linear_infinite_reverse]">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item.title}
                          style={{ transform: `rotate(-${angle}deg)` }}
                          className={`relative flex items-center justify-center w-full h-full rounded-full border border-cyan-500/30 bg-[#020617]/70 backdrop-blur-md overflow-visible transition-all duration-500 ease-out hover:scale-[1.3] lg:hover:scale-[1.8] pointer-events-auto ${item.bColor} ${item.shadow} group/btn`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full"></div>
                          <item.Icon
                            className={`relative z-10 text-cyan-400/80 transition-all duration-300 ${item.color} drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover/btn:drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] scale-[1.15] sm:scale-[1.25] group-hover/btn:scale-[1.4]`}
                            size={28}
                          />
                          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 text-[10px] sm:text-xs font-bold text-white bg-[#020617]/90 px-2 sm:px-3 py-1 rounded-md backdrop-blur-md border border-cyan-500/50 whitespace-nowrap drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] pointer-events-none group-hover/btn:-translate-y-1">
                            {item.title}
                          </span>
                          <div className="absolute inset-0 -z-0 opacity-0 group-hover/btn:opacity-40 blur-xl transition-opacity duration-500 bg-current"></div>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inner spinning rings */}
            <div className="absolute inset-[-10px] sm:inset-[-15px] rounded-full border-2 border-cyan-500/40 animate-[spin_10s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.1)]"></div>
            <div className="absolute inset-[-20px] sm:inset-[-25px] rounded-full border-[1px] border-dashed border-cyan-400/60 animate-[spin_15s_linear_infinite_reverse]"></div>

            {/* ── Core Profile Image with HUD overlay ── */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-500/50 shadow-[0_0_28px_rgba(6,182,212,0.35)] bg-[#000510] ring-2 ring-cyan-500/10 group-hover:ring-cyan-400/30 transition-all duration-300 transform group-hover:scale-105">
              <Image
                src="/banner-img.png"
                alt="MD Shefat / Profile"
                fill
                className="object-cover select-none object-top scale-110"
                sizes="(max-width: 768px) 250px, 300px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-cyan-900/20 to-transparent opacity-60"></div>

              {/* Animated HUD scan line */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ y: ["-100%", "210%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                  }}
                  className="w-full h-[28%] bg-gradient-to-b from-transparent via-cyan-400/12 to-transparent"
                />
              </div>

              {/* Reticle corner brackets inside image */}
              <div className="absolute top-[11%] left-[11%] w-4 h-4 border-t border-l border-cyan-400/60 pointer-events-none" />
              <div className="absolute top-[11%] right-[11%] w-4 h-4 border-t border-r border-cyan-400/60 pointer-events-none" />
              <div className="absolute bottom-[11%] left-[11%] w-4 h-4 border-b border-l border-cyan-400/60 pointer-events-none" />
              <div className="absolute bottom-[11%] right-[11%] w-4 h-4 border-b border-r border-cyan-400/60 pointer-events-none" />

              {/* Center lock dot */}
              <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/70 shadow-[0_0_5px_rgba(34,211,238,0.9)] pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* OUTSIDE BOTTOM: Action Buttons + Badge */}
        <div className="flex flex-col items-center mt-5 sm:mt-10 z-10 w-full max-w-[500px] gap-4">
          {/* ── Angular Cyberpunk Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            {/* Hire Me — scrolls to #contact */}
            <motion.a
              href="#contact"
              whileHover={{
                boxShadow:
                  "0 0 28px rgba(6,182,212,0.35), inset 0 0 20px rgba(6,182,212,0.07)",
              }}
              whileTap={{ scale: 0.96 }}
              className="group/hire relative w-full sm:w-auto px-8 py-3 overflow-hidden bg-[#020617]/55 backdrop-blur-sm border border-cyan-500/45 cursor-pointer"
              style={{
                clipPath:
                  "polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)",
              }}
            >
              {/* Fill sweep */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/18 to-transparent translate-y-full group-hover/hire:translate-y-0 transition-transform duration-300 ease-out" />
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/hire:translate-x-full transition-transform duration-600" />
              {/* Cut-corner accent */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400/25 group-hover/hire:bg-cyan-400/50 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400/25 group-hover/hire:bg-cyan-400/50 transition-colors duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2.5 text-cyan-300 font-mono font-bold tracking-[0.12em] uppercase text-sm group-hover/hire:text-white transition-colors duration-250 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover/hire:animate-pulse shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                Hire Me
              </span>
            </motion.a>

            {/* Download CV — triggers browser download of Resume-of-Ahsan.pdf */}
            <motion.a
              href="/Resume-of-Ahsan.pdf"
              download="Resume-of-Ahsan.pdf"
              whileHover={{
                boxShadow:
                  "0 0 28px rgba(99,102,241,0.35), inset 0 0 20px rgba(99,102,241,0.07)",
              }}
              whileTap={{ scale: 0.96 }}
              className="group/cv relative w-full sm:w-auto px-8 py-3 overflow-hidden bg-[#020617]/55 backdrop-blur-sm border border-indigo-500/45 cursor-pointer"
              style={{
                clipPath:
                  "polygon(0% 0%,calc(100% - 12px) 0%,100% 12px,100% 100%,12px 100%,0% calc(100% - 12px))",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/18 to-transparent translate-y-full group-hover/cv:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/cv:translate-x-full transition-transform duration-600" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-400/25 group-hover/cv:bg-indigo-400/50 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-indigo-400/25 group-hover/cv:bg-indigo-400/50 transition-colors duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2.5 text-indigo-300 font-mono font-bold tracking-[0.12em] uppercase text-sm group-hover/cv:text-white transition-colors duration-250 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover/cv:-translate-y-0.5 transition-transform duration-250 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download CV
              </span>
            </motion.a>
          </motion.div>

          {/* ── Enhanced Status Badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.65,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="relative group cursor-pointer hover:scale-[1.03] transition-transform duration-300 w-full sm:w-auto"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/28 via-purple-500/28 to-indigo-500/28 rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />

            <div className="relative flex items-center justify-center gap-3 bg-[#020617]/85 border border-cyan-500/30 px-5 sm:px-6 py-2.5 rounded-full backdrop-blur-md overflow-hidden">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

              {/* Ping dot */}
              <div className="relative w-2 h-2 shrink-0 hidden sm:block">
                <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-70" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              </div>

              <div className="flex flex-col items-center sm:items-start gap-0">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-300 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold font-mono leading-tight">
                  Web Full Stack Developer
                </span>
                <span className="text-[8px] text-gray-500 font-mono tracking-[0.12em] mt-0.5 hidden sm:block">
                  PHP · Laravel · Vue · React · MySQL
                </span>
              </div>

              {/* Right decorative line stack */}
              <div className="hidden sm:flex flex-col gap-[3px] shrink-0 ml-1">
                <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-cyan-400/75 to-transparent" />
                <div className="w-5 h-[2px] rounded-full bg-gradient-to-r from-purple-400/75 to-transparent" />
                <div className="w-3 h-[2px] rounded-full bg-gradient-to-r from-indigo-400/75 to-transparent" />
              </div>
            </div>
          </motion.div>
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
          perspective: 1500,
        }}
        className="w-full h-full flex justify-center items-center relative z-0 origin-center basis-1/2 min-h-[400px] md:min-h-[600px]"
      >
        <motion.div
          style={{ y: parallaxBackground, transform: "translateZ(-100px)" }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-cyan-500/20 blur-[80px] rounded-full point-events-none"></div>
        </motion.div>
        <motion.div
          onMouseMove={handleOrbitalMove}
          onMouseLeave={handleOrbitalLeave}
          style={{
            transformStyle: "preserve-3d",
            rotateX: smoothOrbX,
            rotateY: smoothOrbY,
            perspective: 1200,
          }}
          className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center cursor-pointer"
        >
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
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 2,
              }}
              className="top-0 left-0 w-full h-full border border-purple-500/50 rounded-full absolute"
            ></motion.div>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 4,
              }}
              className="top-0 left-0 w-full h-full border border-cyan-500/50 rounded-full absolute"
            ></motion.div>
          </div>

          {/* Decorative spinning rings (Orbit Path) — each at a different Z depth */}
          <div
            className="absolute top-1/2 left-1/2 w-[120%] h-[120%]"
            style={{ transform: "translateZ(-90px) translateX(-50%) translateY(-50%)", transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.3)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-[100%] h-[100%]"
            style={{ transform: "translateZ(-50px) translateX(-50%) translateY(-50%)", transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.4)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-[80%] h-[80%]"
            style={{ transform: "translateZ(-20px) translateX(-50%) translateY(-50%)", transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.5)] animate-[spin_120s_linear_infinite]"></div>
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-[60%] h-[60%]"
            style={{ transform: "translateZ(10px) translateX(-50%) translateY(-50%)", transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full rounded-full border-[1px] border-dashed border-teal-400/60 shadow-[0_0_15px_rgba(45,212,191,0.6)] animate-[spin_120s_linear_infinite]"></div>
          </div>

          {/* Central Processor Image - lifted forward in Z for strong 3D pop */}
          {/* Enhanced Sun-like Glow */}
          <div
            className="absolute top-1/2 left-1/2 w-[100px] h-[100px] md:w-[250px] md:h-[250px] bg-cyan-400/50 blur-[80px] rounded-full animate-pulse z-20 pointer-events-none"
            style={{ transform: "translateZ(40px) translateX(-50%) translateY(-50%)" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 z-30"
            style={{ transform: "translateZ(70px) translateX(-50%) translateY(-50%)" }}
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-[#000000e8] backdrop-blur-xl border-4 border-cyan-500/50 shadow-[0_0_80px_rgba(34,211,238,0.8)] border-cyan-400 overflow-hidden flex items-center justify-center relative"
            >
              {/* Decorative inner rings for HUD effect */}
              <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/50 animate-[spin_15s_linear_infinite_reverse]" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-16 h-16 md:w-20 md:h-20 text-cyan-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                />
              </svg>
            </motion.div>
          </div>

          {/* --- Ring 1 (Inner, 60% Width -> 30% Radius) - 5 Databases --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible opacity-80"
              >
                <defs>
                  <filter
                    id="neon-glow-r1"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
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
                    <path
                      d="M 50 50 L 48 48 L 48 20 L 50 20"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="48" cy="20" r="0.4" fill="#22d3ee" />
                  </g>

                  {/* 12. Ring 1 Top Right: PostgreSQL */}
                  <g className="animate-[pulse_3.2s_ease-in-out_infinite_0.6s]">
                    <path
                      d="M 50 50 L 60 40 L 78.5 40 L 78.5 41"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="60" cy="40" r="0.4" fill="#60a5fa" />
                  </g>

                  {/* 13. Ring 1 Bottom Right: MongoDB */}
                  <g className="animate-[pulse_5.2s_ease-in-out_infinite_1.1s]">
                    <path
                      d="M 50 50 L 60 60 L 67.6 67.6 L 67.6 74"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <path d="M 67.6 73 L 68.6 74 L 67.6 75 Z" fill="#4ade80" />
                  </g>

                  {/* 14. Ring 1 Bottom Left: Redis */}
                  <g className="animate-[pulse_4.6s_ease-in-out_infinite_0.3s]">
                    <path
                      d="M 50 50 L 40 60 L 32.4 67.6 L 32.4 74"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <path d="M 32.4 73 L 31.4 74 L 32.4 75 Z" fill="#f87171" />
                  </g>

                  {/* 15. Ring 1 Top Left: Firebase */}
                  <g className="animate-[pulse_3.8s_ease-in-out_infinite_0.7s]">
                    <path
                      d="M 50 50 L 40 40 L 21.5 40 L 21.5 41"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="40" cy="40" r="0.4" fill="#fbbf24" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
                    alt="MySQL"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-cyan-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-cyan-300 whitespace-nowrap shadow-lg">
                    MySQL
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[41%] left-[78.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [5, -5, 5] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
                    alt="MongoDB"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-emerald-500/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-emerald-400 whitespace-nowrap shadow-lg">
                    MongoDB
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[74%] left-[67.6%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{
                  repeat: Infinity,
                  duration: 6.5,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-sky-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                    alt="PostgreSQL"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-sky-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-sky-400 whitespace-nowrap shadow-lg">
                    PostgreSQL
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[74%] left-[32.4%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
                    alt="Redis"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-red-500/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-red-500 whitespace-nowrap shadow-lg">
                    Redis
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[41%] left-[21.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 2.5,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-10 h-10 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/firebase.png"
                    width={24}
                    height={24}
                    alt="Firebase"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-yellow-400/50 pointer-events-none text-[9px] md:text-[10px] font-bold text-yellow-400 whitespace-nowrap shadow-lg">
                    Firebase
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 2 (Middle, 80% Width -> 40% Radius) - 5 Frontend Frameworks --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible opacity-80"
              >
                <defs>
                  <filter
                    id="neon-glow-r2"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
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
                    <path
                      d="M 50 50 L 65 35 L 65 17.6 L 73.5 17.6"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="65" cy="35" r="0.4" fill="#38bdf8" />
                    <circle cx="65" cy="17.6" r="0.4" fill="#38bdf8" />
                  </g>

                  {/* 17. Ring 2 Bottom Right: Vue */}
                  <g className="animate-[pulse_3.6s_ease-in-out_infinite_0.4s]">
                    <path
                      d="M 50 50 L 65 65 L 88 65 L 88 62.3"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="65" cy="65" r="0.4" fill="#34d399" />
                    <rect
                      x="87"
                      y="61.3"
                      width="2"
                      height="2"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="0.3"
                    />
                  </g>

                  {/* 18. Ring 2 Bottom: Angular */}
                  <g className="animate-[pulse_5.8s_ease-in-out_infinite_0.9s]">
                    <path
                      d="M 50 50 L 52 52 L 52 90 L 50 90"
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <rect
                      x="49"
                      y="89"
                      width="2"
                      height="2"
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="0.3"
                    />
                  </g>

                  {/* 19. Ring 2 Bottom Left: Tailwind */}
                  <g className="animate-[pulse_4.4s_ease-in-out_infinite_1.4s]">
                    <path
                      d="M 50 50 L 35 65 L 12 65 L 12 62.3"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="35" cy="65" r="0.4" fill="#38bdf8" />
                    <rect
                      x="11"
                      y="61.3"
                      width="2"
                      height="2"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.3"
                    />
                  </g>

                  {/* 20. Ring 2 Top Left: Next.js */}
                  <g className="animate-[pulse_3.4s_ease-in-out_infinite_0.5s]">
                    <path
                      d="M 50 50 L 35 35 L 35 17.6 L 26.5 17.6"
                      fill="none"
                      stroke="#a1a1aa"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <circle cx="35" cy="35" r="0.4" fill="#a1a1aa" />
                    <circle cx="35" cy="17.6" r="0.4" fill="#a1a1aa" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="absolute top-[17.6%] left-[73.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 6.2,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/react.png"
                    width={28}
                    height={28}
                    alt="React"
                    className="w-7 h-7 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-cyan-400/50 pointer-events-none text-[10px] font-bold text-cyan-400 whitespace-nowrap shadow-lg">
                    React
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[62.3%] left-[88%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [-8, 8, -8] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.8,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
                    alt="Vue"
                    className="w-7 h-7 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-emerald-400/50 pointer-events-none text-[10px] font-bold text-emerald-400 whitespace-nowrap shadow-lg">
                    Vue.js
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  repeat: Infinity,
                  duration: 7.2,
                  ease: "easeInOut",
                  delay: 2.2,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-orange-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/html.png"
                    width={28}
                    height={28}
                    alt="HTML"
                    className="w-7 h-7 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-orange-500/50 pointer-events-none text-[10px] font-bold text-orange-500 whitespace-nowrap shadow-lg">
                    HTML
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[62.3%] left-[12%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [8, -8, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 6.8,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/css.png"
                    width={28}
                    height={28}
                    alt="CSS"
                    className="w-7 h-7 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-blue-500/50 pointer-events-none text-[10px] font-bold text-blue-400 whitespace-nowrap shadow-lg">
                    CSS
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[17.6%] left-[26.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                  delay: 2.8,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-14 h-14 rounded-full bg-[#000000e8] backdrop-blur-md border border-white/50 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/next.png"
                    width={28}
                    height={28}
                    alt="Next.js"
                    className="w-7 h-7 object-contain invert"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 bg-black/80 rounded-md border border-white/50 pointer-events-none text-[10px] font-bold text-white whitespace-nowrap shadow-lg">
                    Next.js
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 3 (Outer, 100% Width -> 50% Radius) - 5 Backends --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible opacity-80"
              >
                <defs>
                  <filter
                    id="neon-glow-r3"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
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
                    <path
                      d="M 50 50 L 45 45 L 45 15 L 50 10 L 50 5"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="0.2"
                      className="animate-line-flow"
                    />
                    <path
                      d="M 50 50 L 45 45 L 45 15"
                      fill="none"
                      className="animate-line-flow"
                      stroke="#818cf8"
                      strokeWidth="0.4"
                    />
                    <circle cx="45" cy="45" r="0.8" fill="#818cf8" />
                    <circle
                      cx="50"
                      cy="5"
                      r="1.5"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="0.4"
                    />
                    <circle cx="50" cy="5" r="0.5" fill="#818cf8" />
                  </g>

                  {/* 2. Ring 3 Top Right: JavaScript */}
                  <g className="animate-[pulse_3s_ease-in-out_infinite_0.5s]">
                    <path
                      d="M 50 50 L 65 50 L 80.5 34.5 L 94 34.5"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <circle cx="65" cy="50" r="0.6" fill="#facc15" />
                    <circle cx="80.5" cy="34.5" r="0.6" fill="#facc15" />
                    <rect
                      x="93"
                      y="33.5"
                      width="2"
                      height="2"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="0.5"
                    />
                  </g>

                  {/* 3. Ring 3 Bottom Right: Node.js */}
                  <g className="animate-[pulse_5s_ease-in-out_infinite_1s]">
                    <path
                      d="M 50 50 L 50 65 L 75.4 90.4 L 76 90.4"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <circle cx="50" cy="65" r="0.6" fill="#4ade80" />
                    <circle cx="75.4" cy="90.4" r="0.6" fill="#4ade80" />
                    <path d="M 76 89.4 L 77 90.4 L 76 91.4 Z" fill="#4ade80" />
                  </g>

                  {/* 4. Ring 3 Bottom Left: Laravel */}
                  <g className="animate-[pulse_4s_ease-in-out_infinite_0.2s]">
                    <path
                      d="M 50 50 L 50 65 L 24.6 90.4 L 24 90.4"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <circle cx="50" cy="65" r="0.6" fill="#f87171" />
                    <circle cx="24.6" cy="90.4" r="0.6" fill="#f87171" />
                    <path d="M 24 89.4 L 23 90.4 L 24 91.4 Z" fill="#f87171" />
                  </g>

                  {/* 5. Ring 3 Top Left: Kotlin */}
                  <g className="animate-[pulse_3s_ease-in-out_infinite_0.8s]">
                    <path
                      d="M 50 50 L 35 50 L 19.5 34.5 L 6 34.5"
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <circle cx="35" cy="50" r="0.6" fill="#c084fc" />
                    <rect x="5" y="33.5" width="2" height="2" fill="#c084fc" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-indigo-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(129,140,248,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
                    alt="PHP"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-indigo-400/50 pointer-events-none text-[11px] font-bold text-indigo-400 whitespace-nowrap shadow-lg">
                    PHP
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[34.5%] left-[97.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [10, -10, 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 6.5,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/js.png"
                    width={32}
                    height={32}
                    alt="JavaScript"
                    className="w-8 h-8 object-contain rounded-sm"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-yellow-400/50 pointer-events-none text-[11px] font-bold text-yellow-400 whitespace-nowrap shadow-lg">
                    JavaScript
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90.4%] left-[79.3%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <Image
                    src="/skills/node.png"
                    width={32}
                    height={32}
                    alt="Node.js"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-green-500/50 pointer-events-none text-[11px] font-bold text-green-400 whitespace-nowrap shadow-lg">
                    Node.js
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[90.4%] left-[20.7%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{
                  repeat: Infinity,
                  duration: 6.8,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"
                    alt="Laravel"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-red-500/50 pointer-events-none text-[11px] font-bold text-red-500 whitespace-nowrap shadow-lg">
                    Laravel
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[34.5%] left-[2.5%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 7.2,
                  ease: "easeInOut",
                  delay: 2.5,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-16 h-16 rounded-full bg-[#000000e8] backdrop-blur-md border border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
                    alt="Kotlin"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-purple-500/50 pointer-events-none text-[11px] font-bold text-purple-400 whitespace-nowrap shadow-lg">
                    Kotlin
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- Ring 4 (Outermost, 120% Width -> 60% Radius) - 5 Languages - MUCH BIGGER --- */}
          <div className="absolute top-0 left-0 w-full h-full z-20 origin-center pointer-events-none animate-[spin_120s_linear_infinite]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible opacity-80"
              >
                <defs>
                  <filter
                    id="neon-glow-r4"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
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
                    <path
                      d="M 50 50 L 60 40 L 60 25 L 83.6 1.4"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="0.25"
                      className="animate-line-flow"
                    />
                    <circle cx="60" cy="40" r="0.6" fill="#60a5fa" />
                    <circle cx="60" cy="25" r="0.6" fill="#60a5fa" />
                    <circle
                      cx="83.6"
                      cy="1.4"
                      r="1.2"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="0.5"
                    />
                    <circle cx="83.6" cy="1.4" r="0.4" fill="#60a5fa" />
                  </g>

                  {/* 7. Ring 4 Bottom Right: C++ */}
                  <g className="animate-[pulse_4s_ease-in-out_infinite_0.6s]">
                    <path
                      d="M 50 50 L 75 50 L 93.5 68.5 L 102 68.5"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <circle
                      cx="75"
                      cy="50"
                      r="0.8"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.3"
                    />
                    <circle cx="93.5" cy="68.5" r="0.6" fill="#3b82f6" />
                    <polygon
                      points="102,67.5 104,68.5 102,69.5"
                      fill="#3b82f6"
                    />
                  </g>

                  {/* 8. Ring 4 Bottom: C# */}
                  <g className="animate-[pulse_4.5s_ease-in-out_infinite_0.4s]">
                    <path
                      d="M 50 50 L 55 55 L 55 85 L 50 90 L 50 105"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <path
                      d="M 50 50 L 55 55 L 55 85"
                      fill="none"
                      className="animate-line-flow"
                      stroke="#a855f7"
                      strokeWidth="0.5"
                    />
                    <circle cx="55" cy="55" r="0.6" fill="#a855f7" />
                    <circle
                      cx="50"
                      cy="105"
                      r="1.5"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="0.5"
                    />
                    <circle cx="50" cy="105" r="0.5" fill="#a855f7" />
                  </g>

                  {/* 9. Ring 4 Bottom Left: Python */}
                  <g className="animate-[pulse_3.5s_ease-in-out_infinite_1.2s]">
                    <path
                      d="M 50 50 L 25 50 L 6.5 68.5 L -2 68.5"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="0.3"
                      className="animate-line-flow"
                    />
                    <circle
                      cx="25"
                      cy="50"
                      r="0.8"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="0.3"
                    />
                    <circle cx="6.5" cy="68.5" r="0.6" fill="#eab308" />
                    <polygon points="-2,67.5 -4,68.5 -2,69.5" fill="#eab308" />
                  </g>

                  {/* 10. Ring 4 Top Left: Java */}
                  <g className="animate-[pulse_5.5s_ease-in-out_infinite_0.9s]">
                    <path
                      d="M 50 50 L 40 40 L 40 25 L 16.4 1.4"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="0.25"
                      className="animate-line-flow"
                    />
                    <circle cx="40" cy="40" r="0.6" fill="#f97316" />
                    <circle cx="40" cy="25" r="0.6" fill="#f97316" />
                    <circle
                      cx="16.4"
                      cy="1.4"
                      r="1.2"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="0.5"
                    />
                    <circle cx="16.4" cy="1.4" r="0.4" fill="#f97316" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="absolute top-[1.4%] left-[85.2%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
                    alt="C"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-blue-500/50 pointer-events-none text-xs font-bold text-blue-400 whitespace-nowrap shadow-lg">
                    C
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[68.5%] left-[107%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [12, -12, 12] }}
                transition={{
                  repeat: Infinity,
                  duration: 7.5,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-blue-600/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
                    alt="C++"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-blue-600/50 pointer-events-none text-xs font-bold text-blue-500 whitespace-nowrap shadow-lg">
                    C++
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[110%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [12, -12, 12] }}
                transition={{
                  repeat: Infinity,
                  duration: 8.5,
                  ease: "easeInOut",
                  delay: 2.2,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-purple-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"
                    alt="C#"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-purple-500/50 pointer-events-none text-xs font-bold text-purple-500 whitespace-nowrap shadow-lg">
                    C#
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[68.5%] left-[-7%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [-12, 12, -12] }}
                transition={{
                  repeat: Infinity,
                  duration: 9,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-orange-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                    alt="Java"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-orange-500/50 pointer-events-none text-xs font-bold text-orange-500 whitespace-nowrap shadow-lg">
                    Java
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="absolute top-[1.4%] left-[14.8%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [12, -12, 12] }}
                transition={{
                  repeat: Infinity,
                  duration: 8.2,
                  ease: "easeInOut",
                  delay: 1.8,
                }}
                className="animate-[spin_120s_linear_infinite_reverse]"
              >
                <div className="pointer-events-auto group w-24 h-24 rounded-full bg-[#000000e8] backdrop-blur-md border border-yellow-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:scale-110 pointer-events-auto transition-all duration-300 cursor-pointer relative">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                    alt="Python"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-black/80 rounded-md border border-yellow-500/50 pointer-events-none text-xs font-bold text-yellow-500 whitespace-nowrap shadow-lg">
                    Python
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
