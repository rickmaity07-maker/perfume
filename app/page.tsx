"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { PRODUCTS, PHOTOS, MATERIALS, formatPrice, fromPrice } from "./data";
import { RevealLines, Fade, ParallaxImage } from "./_components/Reveal";
import { EngravedPlate, cleanInitials } from "./_components/Engraving";
import Monogram from "./_components/Monogram";
import { GoldDust, Magnetic, ScrollMarquee, ScrollWords, Tilt } from "./_components/Motion";

const Flacon = dynamic(() => import("./_components/Flacon"), { ssr: false });
const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  return (
    <main>
      <Hero />
      <Overture />
      <Showcase />
      <IngredientBand />
      <Matieres />
      <SavoirFaire />
      <Gravure />
      <SalonInvitation />
    </main>
  );
}

/* ------------------------------------------------------------------ I. Hero */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spacing = useTransform(scrollYProgress, [0, 1], ["0.02em", "0.32em"]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.85]);

  // Copper light that follows the pointer and reveals a second layer of smoke.
  const mx = useMotionValue(50);
  const my = useMotionValue(45);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(circle 28vmax at ${smx}% ${smy}%, black 0%, rgba(0,0,0,0.55) 40%, transparent 72%)`;

  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PRODUCTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-noir"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <motion.img
          src={PHOTOS.smokeWisp(2200)}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4, scale: [1.08, 1.0, 1.08], x: ["0%", "-2%", "0%"] }}
          transition={{ opacity: { duration: 3 }, scale: { duration: 28, repeat: Infinity, ease: "easeInOut" }, x: { duration: 28, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.img
          src={PHOTOS.copperSmoke(2200)}
          alt=""
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, rotate: [0, 2, 0] }}
          transition={{ opacity: { duration: 2.5, delay: 1 }, rotate: { duration: 24, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
        />
      </motion.div>
      <GoldDust className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,11,10,0.85)_100%)]" />
      <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-noir" />

      <motion.div style={{ opacity: fade }} className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.4, ease }} className="eyebrow text-gilt-soft">
          Maison de Parfum · Paris &amp; Grasse
        </motion.p>

        <motion.h1 style={{ letterSpacing: spacing, scale: wordScale }} className="display text-[17vw] md:text-[19vw] leading-[0.85] mt-6 md:mt-4 whitespace-nowrap select-none [perspective:800px]">
          {"VESPRE".split("").map((c, k) => (
            <motion.span
              key={k}
              className="inline-block gilt-text gilt-shimmer"
              initial={{ opacity: 0, y: "40%", rotateX: -70, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: "0%", rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.2, delay: 0.5 + k * 0.11, ease }}
            >
              {c}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-6 md:mt-8 h-[1.6em] overflow-hidden display-text italic text-2xl md:text-4xl text-ivory/85" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              {PRODUCTS[i].name} <span className="text-ivory/40 text-lg md:text-2xl">— {PRODUCTS[i].translation.toLowerCase()}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1.2, ease }} className="mt-10 flex flex-wrap justify-center gap-5">
          <Magnetic>
            <Link href="/parfums" data-cursor="Enter" className="btn-gilt eyebrow inline-block px-10 py-5">Les Parfums</Link>
          </Magnetic>
          <Magnetic>
            <Link href="/salon" className="eyebrow inline-block px-10 py-5 border border-ivory/30 hover:border-gilt hover:text-gilt-soft transition-colors">Le Salon privé</Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 bottom-0 px-6 md:px-10 pb-8 flex items-end justify-between">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1.2 }} className="eyebrow !text-[9px] text-ivory/45 hidden md:block">
          Composed in Grasse · Finished by hand in Paris
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1.2 }} className="flex flex-col items-center gap-3 mx-auto md:mx-0">
          <span className="eyebrow !text-[9px] text-ivory/50">Scroll</span>
          <span className="relative block w-px h-14 bg-ivory/15 overflow-hidden">
            <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-gilt" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
          </span>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1.2 }} className="eyebrow !text-[9px] text-ivory/45 hidden md:block tnum">
          Collection N° VI — 2026
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ II. Overture */

function Overture() {
  return (
    <section className="relative bg-noir-2 text-ivory px-6 md:px-10 py-32 md:py-48 border-t border-ivory/10">
      <div className="max-w-[1300px] mx-auto">
        <Fade className="flex items-center gap-6 mb-16 md:mb-24">
          <span className="eyebrow text-gilt">I</span>
          <span className="h-px w-16 bg-gilt" />
          <span className="eyebrow">La Maison</span>
        </Fade>
        <RevealLines
          className="display text-[clamp(2.6rem,6.2vw,6.4rem)] leading-[1.02] tracking-[-0.025em]"
          lines={[
            <>We compose perfume the way</>,
            <>couture houses cut cloth —</>,
            <span key="i" className="italic text-gilt">slowly, by hand,</span>,
            <>and for very few people.</>,
          ]}
        />
        <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-10 items-end">
          <Fade className="md:col-span-6 md:col-start-1" delay={0.1}>
            <ScrollWords
              className="display-text text-2xl md:text-[1.7rem] leading-[1.5] text-ivory"
              text="Each Vespre composition begins in Grasse, with materials chosen harvest by harvest. It rests for twelve weeks in the cold before it is filtered, then filled, polished and sealed by hand in our Paris atelier. We make fewer than four thousand flacons a year."
            />
          </Fade>
          <Fade className="md:col-span-4 md:col-start-9" delay={0.25}>
            <motion.p initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.4 }} className="font-[family-name:var(--font-script)] text-6xl md:text-7xl text-gilt-soft -rotate-3 pb-4">Hélène Marceau</motion.p>
            <p className="eyebrow mt-4 text-ivory/45">Maître parfumeur, Vespre</p>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ III. Showcase */

function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(PRODUCTS.length - 1, Math.max(0, Math.floor(v * PRODUCTS.length)))));
  const p = PRODUCTS[active];
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} style={{ height: `${PRODUCTS.length * 90 + 10}vh` }} className="relative bg-noir">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 65% at 68% 55%, rgba(184,149,90,0.14), transparent 70%)" }}
        />
        <div className="relative h-full max-w-[1500px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="relative z-10 pt-24 lg:pt-0">
            <div className="flex items-center gap-6 mb-10">
              <span className="eyebrow text-gilt">II</span>
              <span className="h-px w-16 bg-gilt" />
              <span className="eyebrow">Les Parfums</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={p.slug} initial="in" animate="show" exit="out">
                <motion.p variants={{ in: { opacity: 0 }, show: { opacity: 1 }, out: { opacity: 0 } }} transition={{ duration: 0.6 }} className="display text-gilt text-2xl italic">
                  N° {p.no}
                </motion.p>
                <div className="overflow-hidden mt-3">
                  <motion.h2
                    variants={{ in: { y: "105%" }, show: { y: "0%" }, out: { y: "-105%" } }}
                    transition={{ duration: 0.9, ease }}
                    className="display text-[clamp(3.2rem,7.5vw,8rem)] leading-[0.95] pb-2"
                  >
                    {p.name}
                  </motion.h2>
                </div>
                <motion.div variants={{ in: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -8 } }} transition={{ duration: 0.8, delay: 0.15, ease }}>
                  <p className="display-text italic text-xl text-ivory/60 mt-2">{p.translation}</p>
                  <p className="mt-8 max-w-[40ch] text-[15px] leading-relaxed text-ivory/75 pretty">{p.tagline} {p.story[0]}</p>
                  <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg border-t border-ivory/15 pt-6">
                    {([["Tête", p.notes.top], ["Cœur", p.notes.heart], ["Fond", p.notes.base]] as const).map(([k, v]) => (
                      <div key={k}>
                        <dt className="eyebrow !text-[9px] text-gilt">{k}</dt>
                        <dd className="mt-3 text-sm text-ivory/80 leading-relaxed">{v.join(", ")}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-10 flex items-center gap-8">
                    <Magnetic><Link href={`/parfums/${p.slug}`} data-cursor="View" className="btn-gilt eyebrow inline-block px-9 py-4">Discover</Link></Magnetic>
                    <span className="text-sm text-ivory/60 tnum">{p.concentration} · from {formatPrice(fromPrice(p))}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 lg:relative lg:inset-auto h-full opacity-40 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
            <Flacon hue={p.hue} shape={p.shape} className="w-full h-full" />
          </div>
        </div>

        {/* progress rail */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-4">
          {PRODUCTS.map((x, i) => (
            <span key={x.slug} className={`display text-sm transition-all duration-700 ${i === active ? "text-gilt italic translate-x-0" : "text-ivory/25 translate-x-1"}`}>
              {x.no}
            </span>
          ))}
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-ivory/10">
          <motion.div style={{ width: bar }} className="h-full bg-gilt" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Ingredient band */

function IngredientBand() {
  const notes = ["Florentine Iris", "Jasmine Grandiflorum", "Rose de Mai", "Assam Oud", "Calabrian Bergamot", "Bourbon Vanilla", "Labdanum", "Haitian Vetiver"];
  return (
    <section className="relative bg-noir-2 py-16 md:py-24 border-y border-ivory/10 overflow-hidden">
      <ScrollMarquee items={notes} baseVelocity={-1.6} className="display italic text-[11vw] md:text-[7vw] leading-none text-ivory/90" />
      <ScrollMarquee items={notes.slice().reverse()} baseVelocity={1.2} className="display text-[11vw] md:text-[7vw] leading-none mt-2 text-transparent [-webkit-text-stroke:1px_rgba(184,149,90,0.6)]" />
    </section>
  );
}

/* ------------------------------------------------------------------ IV. Les Matières */

function Matieres() {
  return (
    <section className="relative bg-noir-2 px-6 md:px-10 py-32 md:py-44 overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20 md:mb-28">
          <div>
            <Fade className="flex items-center gap-6 mb-10">
              <span className="eyebrow text-gilt">III</span>
              <span className="h-px w-16 bg-gilt" />
              <span className="eyebrow">Les Matières</span>
            </Fade>
            <RevealLines className="display text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[1]" lines={["The rarest materials,", <span key="i" className="italic text-gilt-soft">and where they grow.</span>]} />
          </div>
          <Fade className="text-[15px] leading-[1.9] text-ivory/65 max-w-[46ch] lg:justify-self-end pretty" delay={0.2}>
            We buy from the same growers every year and pay for the harvest before it begins. When a natural material can&apos;t be sourced responsibly, we build it in the laboratory and tell you so.
          </Fade>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {MATERIALS.map((m, i) => (
            <Fade key={m.name} delay={i * 0.12} className={i % 2 === 1 ? "lg:mt-24" : ""}>
              <figure className="group" data-cursor={m.origin.split(",")[0]}>
                <Tilt>
                  <ParallaxImage src={m.photo(900)} alt={m.name} className="arch aspect-[3/4.4]" strength={8} />
                </Tilt>
                <figcaption className="mt-6">
                  <p className="display text-2xl md:text-3xl group-hover:italic transition-all">{m.name}</p>
                  <p className="eyebrow !text-[9px] text-gilt mt-3">{m.origin}</p>
                  <p className="text-[13px] text-ivory/55 mt-3 leading-relaxed">{m.note}</p>
                </figcaption>
              </figure>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ V. Savoir-faire */

const STEPS = [
  { n: "I", t: "La Récolte", d: "Jasmine is picked before sunrise, when its scent is strongest, and processed the same morning in Grasse." },
  { n: "II", t: "La Macération", d: "Twelve weeks at four degrees, in the dark. The base notes bind to the top notes, so the perfume holds together from the first minute to the last." },
  { n: "III", t: "Le Flaconnage", d: "Each flacon is polished, filled and sealed by hand. The gilded cap is weighted, numbered and engraved in our Paris atelier." },
];

function SavoirFaire() {
  return (
    <section className="relative bg-noir text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative lg:sticky lg:top-0 h-[70svh] lg:h-[100svh] p-6 md:p-10 lg:p-16">
          <ParallaxImage src={PHOTOS.amberDropper(1600)} alt="An amber glass flacon on a turned wooden stand, with leaf shadows across the wall" className="arch w-full h-full" />
        </div>
        <div className="px-6 md:px-16 py-24 lg:py-44">
          <Fade className="flex items-center gap-6 mb-12">
            <span className="eyebrow text-gilt">IV</span>
            <span className="h-px w-16 bg-gilt" />
            <span className="eyebrow">Savoir-faire</span>
          </Fade>
          <RevealLines className="display text-[clamp(2.6rem,5vw,5rem)] leading-[1]" lines={["Twelve weeks", <span key="i" className="italic text-gilt">in the dark.</span>]} />
          <ol className="mt-20 space-y-0">
            {STEPS.map((s, i) => (
              <Fade key={s.n} delay={i * 0.08}>
                <li className="grid grid-cols-[64px_1fr] gap-6 py-10 border-t border-ivory/10">
                  <span className="display italic text-3xl text-gilt">{s.n}</span>
                  <div>
                    <h3 className="display text-3xl md:text-4xl">{s.t}</h3>
                    <p className="mt-4 text-[15px] leading-[1.85] text-ivory/60 max-w-[44ch] pretty">{s.d}</p>
                  </div>
                </li>
              </Fade>
            ))}
          </ol>
          <Fade className="mt-10">
            <Link href="/maison" className="eyebrow link-underline pb-1">Visit the atelier</Link>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ VI. Gravure */

function Gravure() {
  const [initials, setInitials] = useState("HM");
  const [script, setScript] = useState(false);

  return (
    <section className="relative bg-noir px-6 md:px-10 py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_30%_50%,rgba(184,149,90,0.16),transparent_70%)]" />
      <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <Fade className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-10 rounded-full bg-gilt/10 blur-3xl" />
          <EngravedPlate initials={initials} script={script} className="relative w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
        </Fade>
        <div>
          <Fade className="flex items-center gap-6 mb-10">
            <span className="eyebrow text-gilt">V</span>
            <span className="h-px w-16 bg-gilt" />
            <span className="eyebrow">La Gravure</span>
          </Fade>
          <RevealLines className="display text-[clamp(2.6rem,5vw,5rem)] leading-[1]" lines={["Your initials,", <span key="i" className="italic gilt-text">engraved in gold.</span>]} />
          <Fade delay={0.15}>
            <p className="mt-8 text-[15px] leading-[1.9] text-ivory/65 max-w-[44ch] pretty">
              Every gilded cap can be hand-engraved by our artisan in Paris, at no charge. Up to three characters. Try yours.
            </p>
            <div className="mt-12 grid sm:grid-cols-[1fr_auto] gap-6 items-end max-w-lg">
              <label className="block">
                <span className="eyebrow !text-[9px] text-ivory/50">Initials</span>
                <input
                  value={initials}
                  onChange={(e) => setInitials(cleanInitials(e.target.value))}
                  maxLength={3}
                  aria-label="Initials to engrave"
                  className="mt-3 w-full bg-transparent border-b border-ivory/25 focus:border-gilt outline-none display text-5xl pb-3 uppercase tracking-[0.1em] transition-colors"
                />
              </label>
              <div className="flex border border-ivory/20" role="radiogroup" aria-label="Engraving style">
                {[["Didone", false], ["Script", true]].map(([l, v]) => (
                  <button
                    key={String(l)}
                    role="radio"
                    aria-checked={script === v}
                    onClick={() => setScript(v as boolean)}
                    className={`eyebrow !text-[9px] px-5 py-3 transition-colors ${script === v ? "bg-gilt text-noir" : "hover:bg-ivory/5"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <Magnetic className="mt-14"><Link href="/parfums" className="inline-block btn-gilt eyebrow px-9 py-4">Choose your flacon</Link></Magnetic>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ VII. Salon */

function SalonInvitation() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <ParallaxImage src={PHOTOS.copperSmoke(2000)} alt="" className="!absolute inset-0" strength={10} />
      <div className="absolute inset-0 bg-noir/55" />
      <div className="relative w-full max-w-[1100px] mx-auto px-6 md:px-10 py-32 text-center flex flex-col items-center">
        <Monogram className="w-16 h-16 text-gilt-soft" />
        <RevealLines className="display text-[clamp(2.8rem,7vw,7rem)] leading-[0.98] mt-12" lines={["Le Salon privé", <span key="i" className="italic text-gilt-soft">Avenue Montaigne</span>]} />
        <Fade delay={0.2}>
          <p className="mt-10 text-[15px] leading-[1.9] text-ivory/75 max-w-[52ch] mx-auto pretty">
            An hour with one of our perfumers, by appointment. We&apos;ll walk you through the collection on your skin, not on paper, and pour a glass of champagne while it settles. For those who want something entirely their own, we accept a small number of bespoke commissions each year.
          </p>
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            <Magnetic><Link href="/salon" className="btn-gilt eyebrow inline-block px-10 py-5">Request an appointment</Link></Magnetic>
            <Link href="/salon#bespoke" className="eyebrow px-10 py-5 border border-ivory/30 hover:border-ivory transition-colors">Bespoke perfume</Link>
          </div>
        </Fade>
      </div>
    </section>
  );
}
