"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Lines rise out of a mask as they enter the viewport. */
export function RevealLines({ lines, className = "", delay = 0, as = "h2" }: { lines: React.ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p" }) {
  // The observer sits on the heading itself: masked children are clipped, so they never register as visible.
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-10%" }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{ duration: 1.3, delay: delay + i * 0.09, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Fade({ children, className = "", delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Image that unveils upward from its frame and drifts with scroll. */
export function ParallaxImage({ src, alt, className = "", strength = 12 }: { src: string; alt: string; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img src={src} alt={alt} style={{ y, scale: 1 + strength / 50 }} className="absolute inset-0 w-full h-full object-cover" />
    </motion.div>
  );
}
