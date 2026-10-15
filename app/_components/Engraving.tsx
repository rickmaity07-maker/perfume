"use client";

import { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Gilded cap plate with hand-engraved initials, drawn live as the client types. */
export function EngravedPlate({ initials, script = false, className = "" }: { initials: string; script?: boolean; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const text = initials.trim().toUpperCase() || "V";
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={`Engraving preview: ${text}`}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7d5f2e" />
          <stop offset="0.22" stopColor="#e6d1a4" />
          <stop offset="0.45" stopColor="#b8955a" />
          <stop offset="0.62" stopColor="#f6e8c8" />
          <stop offset="0.8" stopColor="#9c7a41" />
          <stop offset="1" stopColor="#d9c49b" />
        </linearGradient>
        <radialGradient id={`s${id}`} cx="0.3" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`e${id}`} x="-10%" y="-10%" width="120%" height="120%">
          {/* inner shadow: the letters read as cut into the metal */}
          <feOffset dx="0" dy="2.5" in="SourceAlpha" result="off" />
          <feGaussianBlur stdDeviation="1.6" in="off" result="blur" />
          <feComposite operator="out" in="SourceAlpha" in2="blur" result="inner" />
          <feFlood floodColor="#3b2a10" floodOpacity="0.9" />
          <feComposite operator="in" in2="inner" result="shadow" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shadow" />
          </feMerge>
        </filter>
      </defs>
      <rect x="20" y="20" width="360" height="360" rx="6" fill={`url(#g${id})`} />
      <rect x="20" y="20" width="360" height="360" rx="6" fill={`url(#s${id})`} />
      <rect x="38" y="38" width="324" height="324" rx="3" fill="none" stroke="#6e5226" strokeOpacity="0.55" strokeWidth="1" />
      <rect x="46" y="46" width="308" height="308" rx="2" fill="none" stroke="#fff3d6" strokeOpacity="0.35" strokeWidth="0.75" />
      <AnimatePresence mode="wait">
        <motion.text
          key={text + script}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          x="200"
          y={script ? 238 : 252}
          textAnchor="middle"
          fill="#8a6a35"
          filter={`url(#e${id})`}
          style={{
            fontFamily: script ? "var(--font-pinyon)" : "var(--font-bodoni)",
            fontStyle: script ? "normal" : "italic",
            fontSize: script ? (text.length > 2 ? 120 : 150) : text.length > 2 ? 130 : 170,
            letterSpacing: script ? 0 : "-0.02em",
          }}
        >
          {text}
        </motion.text>
      </AnimatePresence>
    </svg>
  );
}

export const cleanInitials = (v: string) => v.replace(/[^a-zA-ZÀ-ÿ&.]/g, "").slice(0, 3);
