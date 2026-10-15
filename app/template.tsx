"use client";

import { motion } from "framer-motion";

/** Remounts on every navigation: a gilt curtain lifts off the incoming page. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[140] pointer-events-none origin-top"
        style={{ background: "linear-gradient(180deg, #15120f 0%, #0d0b0a 100%)" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      >
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "var(--gilt-gradient)" }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </>
  );
}
