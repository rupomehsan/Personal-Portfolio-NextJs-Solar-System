"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes flameUp {
          0% { transform: translateY(20%) scale(0.8); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-40%) scale(1.1); opacity: 0; }
        }
        .flame-1 { animation: flameUp 1.2s infinite ease-in; }
        .flame-2 { animation: flameUp 1.5s infinite ease-in 0.2s; }
        .flame-3 { animation: flameUp 1.3s infinite ease-in 0.4s; }
      `}</style>

      {/* DESKTOP SIDEBAR (Left Navigation) */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-[80px] hover:w-[240px] bg-transparent z-50 transition-all duration-500 ease-in-out overflow-hidden group/sidebar">
        {/* Navigation Links (Centered Vertically) */}
        <div className="flex-1 w-full flex flex-col items-center group-hover/sidebar:items-start justify-center gap-2 px-4 group-hover/sidebar:px-6 relative">
          
          {/* PROFESSIONAL TIMELINE/HUB CONNECTOR */}
          <div className="relative flex flex-col gap-2 w-full">
            {/* The line itself - mathematically pinned to the centers of the top and bottom icons */}
            <div className="absolute left-[24px] md:left-[32px] top-[32px] bottom-[32px] w-[2px] -translate-x-1/2 transition-all duration-500 ease-in-out z-0 pointer-events-none hidden md:block">
              {/* Base wire */}
              <div className="absolute inset-0 bg-cyan-800/40"></div>
              {/* Core glowing fiber */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-teal-300 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] filter blur-[0.5px] opacity-70"></div>
              {/* Traveling energy pulse */}
              <div className="absolute top-0 w-full h-[50px] bg-white rounded-full mix-blend-screen shadow-[0_0_15px_rgba(255,255,255,1)] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>

            {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className="relative w-full flex items-center justify-start text-gray-400 hover:text-cyan-300 font-mono text-sm tracking-[0.2em] uppercase transition-all duration-300 p-2 group/item border border-transparent hover:border-cyan-500/50 hover:bg-[#030014]/60 hover:shadow-[inset_0_0_20px_rgba(6,182,212,0.2)] rounded-2xl md:rounded-l-none md:rounded-r-2xl"
            >
              {/* Fire Animated Rounded Icon for 2 Letters */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full shrink-0 group-hover/item:scale-110 transition-transform duration-300 border border-cyan-500/20 bg-[#030014]/50 overflow-visible">
                {/* Static Glow */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3),inset_0_0_10px_rgba(6,182,212,0.2)] group-hover/item:shadow-[0_0_25px_rgba(6,182,212,0.8),inset_0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"></div>

                {/* Burn Animation (Flames moving up) - Cyan Theme */}
                <div className="absolute inset-0 rounded-full overflow-hidden mix-blend-screen opacity-50 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-[-20%] left-[10%] w-[80%] h-[120%] bg-gradient-to-t from-blue-700 via-cyan-500 to-transparent blur-[4px] flame-1"></div>
                  <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[100%] bg-gradient-to-t from-cyan-500 via-teal-400 to-transparent blur-[3px] flame-2"></div>
                  <div className="absolute bottom-[-30%] left-[30%] w-[40%] h-[140%] bg-gradient-to-t from-teal-300 via-white to-transparent blur-[2px] flame-3"></div>
                </div>

                {/* 2 Letters */}
                <span className="font-black text-cyan-400 group-hover/item:text-teal-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] text-sm tracking-tighter transition-colors z-10">
                  {link.title.substring(0, 2).toUpperCase()}
                </span>
              </div>

              {/* Full Text (Hidden until hover) */}
              <span className="opacity-0 -translate-x-4 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-4 transition-all duration-300 whitespace-nowrap font-bold text-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
                {link.title}
              </span>
            </Link>
          ))}
          </div>

          {/* Source Code Tab */}
        </div>
      </div>

      {/* MOBILE NAVBAR (Top Horizontal) */}
      <div className="md:hidden w-full h-[70px] fixed top-0 left-0 bg-[#030014]/60 backdrop-blur-md shadow-[0_5px_20px_rgba(6,182,212,0.1)] border-b border-cyan-500/20 z-50 px-6 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-3">
          <div className="relative w-[40px] h-[40px] rounded-full border border-cyan-500/50 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-cover"
              draggable={false}
            />
          </div>
          <span className="font-black text-cyan-300 tracking-widest text-xs uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
            John Doe
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-cyan-300 hover:text-white transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-[#030014]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center md:hidden border-t border-cyan-500/20">
          <div className="flex flex-col items-center gap-8 w-full px-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="w-full text-center text-gray-300 hover:text-cyan-300 font-mono text-sm tracking-[0.3em] uppercase py-3 border-b border-cyan-500/10 hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            {/* Social Icons */}
            <div className="flex justify-center gap-8 mt-6 w-full">
              {SOCIALS.map(({ link, name, icon: Icon }) => (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                  className="text-gray-400 hover:text-cyan-300 hover:scale-125 transition-all"
                >
                  <Icon className="h-8 w-8" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
