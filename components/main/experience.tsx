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
      className="flex flex-col items-center justify-center gap-10 h-full relative overflow-hidden py-20 z-20 min-h-screen"
    >
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
    </section>
  );
};
