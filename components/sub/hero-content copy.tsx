"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-14 lg:px-20 mt-28 md:mt-40 w-full z-[20] gap-10"
    >
      <div className="h-full w-full max-w-[680px] flex flex-col gap-6 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Software Engineer Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-2 text-white max-w-[640px] w-auto h-auto"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Building scalable software that solves
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}real business problems.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-[620px]">
            Full Stack Software Engineer focused on clean architecture,
            performance, and product-driven development across web and mobile
            platforms.
          </p>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.75)}
          className="flex flex-wrap gap-3 max-w-[620px]"
        >
          <span className="px-4 py-2 rounded-full text-sm border border-white/20 bg-white/5 text-gray-200">
            Full-Stack Development
          </span>
          <span className="px-4 py-2 rounded-full text-sm border border-white/20 bg-white/5 text-gray-200">
            System Design Mindset
          </span>
          <span className="px-4 py-2 rounded-full text-sm border border-white/20 bg-white/5 text-gray-200">
            Performance & Security
          </span>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.9)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[620px]"
        >
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              Experience
            </p>
            <p className="text-sm text-gray-200 mt-1">3+ Years</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              Primary Stack
            </p>
            <p className="text-sm text-gray-200 mt-1">React, Next.js, Node</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              Current Focus
            </p>
            <p className="text-sm text-gray-200 mt-1">Modern SaaS Products</p>
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-wrap gap-4 pt-2"
        >
          <a
            href="#projects"
            className="py-2.5 px-6 button-primary text-center text-white cursor-pointer rounded-lg"
          >
            View Projects
          </a>
          <a
            href="#skills"
            className="py-2.5 px-6 text-center text-gray-200 cursor-pointer rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Explore Skills
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
