"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaFacebook, FaLinkedinIn, FaWhatsapp, FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa6";
import { SiFiverr, SiUpwork, SiFreelancer } from "react-icons/si";

const SOCIALS = [
  { Icon: FaGithub,     link: "https://github.com/rupomehsan",                               label: "GitHub",     color: "hover:text-white hover:border-white/40" },
  { Icon: FaLinkedinIn, link: "https://www.linkedin.com/in/md-abu-ahsan-54515a1b2/",         label: "LinkedIn",   color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
  { Icon: FaFacebook,   link: "https://www.facebook.com/rupom.ehsan/",                       label: "Facebook",   color: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
  { Icon: FaWhatsapp,   link: "https://wa.me/8801682292241",                                  label: "WhatsApp",   color: "hover:text-[#25D366] hover:border-[#25D366]/40" },
  { Icon: FaTelegram,   link: "https://web.telegram.org/k/#-2272837972",                     label: "Telegram",   color: "hover:text-[#26A5E4] hover:border-[#26A5E4]/40" },
  { Icon: SiFiverr,     link: "https://www.fiverr.com/rupom_ehsan/",                         label: "Fiverr",     color: "hover:text-[#1DBF73] hover:border-[#1DBF73]/40" },
  { Icon: SiUpwork,     link: "https://www.upwork.com/freelancers/~010e8a7dea092d1282",      label: "Upwork",     color: "hover:text-[#6FDA44] hover:border-[#6FDA44]/40" },
  { Icon: SiFreelancer, link: "https://www.freelancer.com.bd/u/rupomehsan",                  label: "Freelancer", color: "hover:text-[#29B2FE] hover:border-[#29B2FE]/40" },
];

const EMAILS = [
  "mdabuahsan96@gmail.com",
  "rupomehsan34@gmail.com",
];

const PHONES = [
  { raw: "8801682292241", display: "+880 1682 292 241" },
  { raw: "8801931374336", display: "+880 1931 374 336" },
];

export const Contact = () => {
  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center min-h-screen w-full max-w-[1400px] mx-auto h-full py-20 z-20 relative overflow-hidden"
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
      {/* ── Section heading ── */}
      <div className="w-auto h-auto z-[5] mb-12 mt-6">
        <div className="flex flex-col items-center w-full relative">
          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mb-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[15%] h-full bg-[#a78bfa] relative z-10" />
            <div className="w-[50%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10" />
            <div className="w-[35%] h-full bg-teal-900/60 relative z-10" />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>

          <h1 className="flex flex-col sm:flex-row items-center text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-3 animate-pulse whitespace-nowrap mb-2 sm:mb-0">root@sys:~#</span>
            <span className="flex">
              {"CONTACT_ME".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15, duration: 0 }}
                  viewport={{ once: true }}
                  className={char === "_" ? "text-transparent" : "text-white font-sans"}
                >
                  {char === "_" ? " " : char === "A" ? "Δ" : char === "E" ? "Ξ" : char === "O" ? (
                    <span className="relative inline-flex items-center justify-center">
                      O<span className="absolute w-[6px] h-[6px] bg-white rounded-full" />
                    </span>
                  ) : char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 1 }}
                className="inline-block w-[12px] sm:w-[20px] h-[30px] bg-green-500 ml-2 mt-2"
              />
            </span>
          </h1>

          <div className="flex w-full max-w-[280px] sm:max-w-[400px] h-[3px] sm:h-[4px] mt-3 relative overflow-hidden hidden sm:flex">
            <div className="w-[60%] h-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10" />
            <div className="w-[10%] h-full bg-[#a78bfa] relative z-10" />
            <div className="w-[30%] h-full bg-teal-900/60 relative z-10" />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: "600%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute top-0 left-0 w-[40px] h-full bg-white/80 blur-[3px] z-20"
            />
          </div>
        </div>
      </div>

      {/* ── Two-column content ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-20 w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14"
      >

        {/* ── LEFT: contact info ── */}
        <div className="flex flex-col gap-8 h-full">
          <div className="backdrop-blur-md bg-[#030014]/40 border border-cyan-500/20 p-6 sm:p-8 relative group overflow-hidden h-full">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            <div className="flex items-center gap-2 mb-6">
              <span className="text-cyan-400 font-mono text-lg animate-pulse">$&gt;</span>
              <h2 className="text-base font-mono font-bold text-slate-200 tracking-widest uppercase">reach_out.sh</h2>
            </div>

            {/* Email */}
            <div className="mb-6">
              <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] mb-3">// EMAIL_ADDRESSES</p>
              <div className="flex flex-col gap-2">
                {EMAILS.map((email) => (
                  <Link
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 group/item px-3 py-2 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-950/40 group-hover/item:border-cyan-400/60 group-hover/item:bg-cyan-500/10 transition-all">
                      <FaEnvelope className="w-3.5 h-3.5 text-cyan-500 group-hover/item:text-cyan-300 transition-colors" />
                    </span>
                    <span className="font-mono text-xs text-slate-300 group-hover/item:text-cyan-300 transition-colors break-all">{email}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] mb-3">// PHONE_NUMBERS</p>
              <div className="flex flex-col gap-2">
                {PHONES.map((p) => (
                  <Link
                    key={p.raw}
                    href={`tel:+${p.raw}`}
                    className="flex items-center gap-3 group/item px-3 py-2 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-950/40 group-hover/item:border-cyan-400/60 group-hover/item:bg-cyan-500/10 transition-all">
                      <FaPhone className="w-3.5 h-3.5 text-cyan-500 group-hover/item:text-cyan-300 transition-colors" />
                    </span>
                    <span className="font-mono text-xs text-slate-300 group-hover/item:text-cyan-300 transition-colors">{p.display}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] mb-3">// SOCIAL_CHANNELS</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ Icon, link, label, color }) => (
                  <Link
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className={`flex items-center gap-2 px-3 py-2 border border-cyan-500/20 bg-cyan-950/20 text-slate-400 text-[11px] font-mono transition-all duration-200 ${color}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: form ── */}
        <div className="relative backdrop-blur-md bg-[#030014]/40 border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(112,66,248,0.15)] group overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]" />

          <div className="flex items-center mb-6 gap-3">
            <span className="text-cyan-400 font-mono text-xl animate-pulse">$&gt;</span>
            <h2 className="text-lg font-mono font-bold text-slate-200 tracking-widest uppercase">init_contact.sh</h2>
          </div>

          <form className="flex flex-col gap-5 w-full font-mono relative z-10">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs text-purple-300 uppercase tracking-widest">[ usr_name ]</label>
              <input
                type="text" id="name"
                className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs text-purple-300 uppercase tracking-widest">[ usr_email ]</label>
              <input
                type="email" id="email"
                className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs text-purple-300 uppercase tracking-widest">[ usr_phone ]</label>
              <div className="relative">
                <input
                  type="tel" id="phone"
                  className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                  placeholder="+880 XXXX XXX XXX"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-purple-300 uppercase tracking-widest">[ payload_data ]</label>
              <textarea
                id="message" rows={4}
                className="w-full bg-[#0a0a1a]/50 border border-purple-500/20 px-4 py-3 text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-[#0a0a1a]/80 transition-all duration-300 resize-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                placeholder="Type your message here..."
                required
              />
            </div>

            {/* Quick contact hint */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] font-mono text-slate-600 border-t border-purple-500/10 pt-3">
              <span className="flex items-center gap-1.5"><FaEnvelope className="w-3 h-3 text-cyan-700" />mdabuahsan96@gmail.com</span>
              <span className="flex items-center gap-1.5"><FaPhone className="w-3 h-3 text-cyan-700" />+880 1682 292 241</span>
            </div>

            <button
              type="button"
              className="mt-2 w-full py-3 bg-purple-600/20 hover:bg-cyan-500/20 border border-purple-500 text-purple-300 hover:text-cyan-300 hover:border-cyan-400 uppercase tracking-[0.3em] text-xs font-bold transition-all duration-300 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover/btn:w-full transition-all duration-700 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">Transmit <span className="animate-pulse">_</span></span>
            </button>
          </form>
        </div>
      </motion.div>

      {/* video bg */}
      <div className="w-full flex items-start justify-center absolute inset-0 mix-blend-screen opacity-60 pointer-events-none z-0">
        <video loop muted autoPlay playsInline preload="false" className="w-full h-full object-cover opacity-80">
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%   { top: 0;    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};
