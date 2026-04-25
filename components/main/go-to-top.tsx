"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="go-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={scrollTop}
          aria-label="Go to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center border border-cyan-500/40 bg-[#030014]/80 backdrop-blur-md text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 group"
        >
          {/* corner accents */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/60 group-hover:border-cyan-300 transition-colors" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/60 group-hover:border-cyan-300 transition-colors" />

          <svg
            className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
