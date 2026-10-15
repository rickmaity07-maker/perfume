"use client";

import { motion } from "framer-motion";

/** The Vespre seal: a Didone V inside a fine double ring. `draw` animates the strokes on. */
export default function Monogram({ className = "", draw = false, duration = 1.8 }: { className?: string; draw?: boolean; duration?: number }) {
  const t = { duration, ease: [0.65, 0, 0.35, 1] as const };
  const p = (d: number) => (draw ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { ...t, delay: d } } : {});
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <motion.circle cx="60" cy="60" r="56" strokeWidth="0.6" {...p(0)} />
      <motion.circle cx="60" cy="60" r="51" strokeWidth="0.35" {...p(0.15)} />
      {/* thick and thin strokes of the V */}
      <motion.path d="M38 34 L60 88" strokeWidth="3.2" strokeLinecap="butt" {...p(0.35)} />
      <motion.path d="M82 34 L60 88" strokeWidth="0.9" {...p(0.5)} />
      {/* serifs */}
      <motion.path d="M31 34 H46 M75 34 H89" strokeWidth="0.9" {...p(0.7)} />
      <motion.path d="M60 20 l2 2 -2 2 -2 -2 z" strokeWidth="0.6" {...p(0.9)} />
    </svg>
  );
}
