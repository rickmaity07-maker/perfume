"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Monogram from "./Monogram";

/** Inertial scrolling. Native scroll position is preserved, so scroll-linked animations keep working. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -80 } });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}

/** A fine gilt ring that trails the pointer and grows over interactive elements. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const enabled = useFinePointer();

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none-fine");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, select, textarea, label");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [x, y, enabled]);

  if (!enabled) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference">
      <motion.div
        animate={{ width: label ? 92 : hover ? 46 : 10, height: label ? 92 : hover ? 46 : 10, backgroundColor: hover && !label ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white flex items-center justify-center"
      >
        <AnimatePresence>
          {label && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="eyebrow !text-[9px] !tracking-[0.25em] text-black">
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/** Opening ceremony: the seal draws itself, then the curtain lifts. Once per session. */
export function Intro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("vespre.intro")) return;
      sessionStorage.setItem("vespre.intro", "1");
    } catch {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raf = requestAnimationFrame(() => setShow(true));
    const t = setTimeout(() => setShow(false), 2900);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[150] bg-noir flex flex-col items-center justify-center text-gilt-soft"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <Monogram draw className="w-24 h-24" />
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.9em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ delay: 1.1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 display-text text-sm pl-[0.6em]"
          >
            VESPRE
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.6, duration: 1 }} className="mt-3 eyebrow !text-[9px] text-ivory">
            Maison de Parfum · Paris
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
