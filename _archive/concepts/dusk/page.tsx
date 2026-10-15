"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { PRODUCTS, PHOTOS, photo, type Product } from "../../data";
import { useCart } from "../../ClientLayout";
import Bottle from "../_shared/Bottle";
import SectionTag from "../_shared/SectionTag";

const ease = [0.16, 1, 0.3, 1] as const;
const BY_HOUR = [...PRODUCTS].sort((a, b) => a.hour.localeCompare(b.hour));

const SKY_STOPS = [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.78, 1];
const SKY = ["#F2C98A", "#EDB46A", "#E08A45", "#C0606A", "#7A4A86", "#3D2F66", "#191833", "#0A0A14"];

export default function DuskConcept() {
  const { scrollYProgress } = useScroll();
  const sky = useTransform(scrollYProgress, SKY_STOPS, SKY);
  const color = useTransform(scrollYProgress, [0, 0.22, 0.32, 1], ["#2B1A0E", "#2B1A0E", "#FFF4E8", "#F4EEF5"]);
  const sunY = useTransform(scrollYProgress, [0, 0.6], ["0vh", "90vh"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.5, 0.65], [1, 0.7, 0]);
  const stars = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  return (
    <motion.div style={{ color }} className="f-manrope relative min-h-screen selection:bg-white/30">
      {/* Sky */}
      <motion.div aria-hidden style={{ backgroundColor: sky }} className="fixed inset-0 -z-10">
        <motion.div
          style={{ y: sunY, opacity: sunOpacity }}
          className="absolute left-1/2 top-[28vh] -translate-x-1/2 w-[70vmin] h-[70vmin] rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.95)_0%,rgba(255,200,120,0.55)_35%,rgba(255,170,90,0)_70%)] blur-2xl" />
        </motion.div>
        <motion.div style={{ opacity: stars }} className="absolute inset-0">
          <Stars />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
      </motion.div>

      <DuskNav progress={scrollYProgress} />
      <main>
        <Hero />
        <Hours />
        <Manifesto />
        <Ritual />
        <FindYourHour />
      </main>
      <DuskFooter />
    </motion.div>
  );
}

function Stars() {
  const pts = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => {
        // deterministic pseudo-random so server and client markup match
        const r = (n: number) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2);
        const f = (n: number) => Math.round(n * 100) / 100;
        return { x: f(r(1) * 100), y: f(r(2) * 70), s: f(1 + r(3) * 1.6), d: f(r(4) * 4) };
      }),
    []
  );
  return (
    <>
      {pts.map((p, i) => (
        <span key={i} className="twinkle absolute rounded-full bg-white" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }} />
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- NAV */

function DuskNav({ progress }: { progress: MotionValue<number> }) {
  const { cartCount, setCartOpen } = useCart();
  const [clock, setClock] = useState("17:30");
  useMotionValueEvent(progress, "change", (v) => {
    const mins = 17 * 60 + 30 + Math.round(v * 330); // 17:30 → 23:00
    setClock(`${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`);
  });

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-20 grid grid-cols-3 items-center">
        <div className="flex items-center gap-6 text-[13px]">
          <Link href="/concepts" className="opacity-70 hover:opacity-100">← Concepts</Link>
          <a href="#hours" className="hidden md:inline opacity-70 hover:opacity-100">The hours</a>
          <a href="#find" className="hidden md:inline opacity-70 hover:opacity-100">Find yours</a>
        </div>
        <Link href="/concepts/dusk" className="f-cormorant italic text-3xl text-center">Vespre</Link>
        <div className="flex items-center justify-end gap-5">
          <span className="hidden sm:inline tnum text-[12px] tracking-[0.2em] opacity-70" aria-label="Evening time indicator">{clock}</span>
          <button onClick={() => setCartOpen(true)} className="rounded-full border border-current/30 px-4 py-2 text-[12px] hover:bg-white/15 backdrop-blur-sm transition-colors active:scale-[0.98]">
            Bag · {cartCount}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- B1 HERO */

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5">
      <SectionTag id="B1" name="Hero · sunset" />
      <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 0.75, letterSpacing: "0.35em" }} transition={{ duration: 2, ease }} className="text-[11px] uppercase mb-8">
        Six eaux de parfum · 17:50 to 22:30
      </motion.p>
      <h1 className="f-cormorant font-light text-[clamp(3.8rem,12vw,11rem)] leading-[0.85] tracking-[-0.02em]">
        <motion.span initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.6, ease }} className="block">
          The hour
        </motion.span>
        <motion.span initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.6, delay: 0.25, ease }} className="block italic">
          before night.
        </motion.span>
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.2, duration: 1.2 }} className="mt-10 max-w-[40ch] text-[15px] leading-relaxed pretty">
        Vespre means evening. Each of our scents is composed for a particular minute of it, from the last warm light to the hour before sleep.
      </motion.p>
      <motion.a
        href="#hours"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="mt-12 group flex flex-col items-center gap-3 text-[12px] tracking-[0.25em] uppercase"
      >
        Begin at 17:50
        <span className="block w-px h-14 bg-current/50 origin-top group-hover:scale-y-125 transition-transform" />
      </motion.a>
    </section>
  );
}

/* ---------------------------------------------------------------- B2 HOURS */

function Hours() {
  return (
    <section id="hours" className="relative">
      <SectionTag id="B2" name="Hours · products" />
      {BY_HOUR.map((p, i) => (
        <Hour key={p.id} product={p} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

function Hour({ product: p, flip }: { product: Product; flip: boolean }) {
  const { addToCart } = useCart();
  return (
    <article className="min-h-[100svh] flex items-center px-5 md:px-10 py-24">
      <div className={`max-w-[1300px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-20 items-center ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.4, ease }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 m-auto w-[70%] aspect-square rounded-full blur-3xl opacity-60" style={{ background: p.hue }} />
          <div className="relative w-[45%] md:w-[52%] max-w-[300px] text-white/70 drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]">
            <Bottle hue={p.hue} shape={p.shape} capColor="#16110e" glass="rgba(255,255,255,0.28)" label={`N°${p.no}`} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          <p className="f-cormorant font-light text-[clamp(5rem,13vw,10rem)] leading-none tnum opacity-90">{p.hour}</p>
          <h2 className="f-cormorant italic text-5xl md:text-6xl mt-2">{p.name}</h2>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed opacity-80 pretty">{p.story}</p>
          <ul className="mt-8 flex flex-wrap gap-2 text-[12px]">
            {[...p.top, ...p.heart, ...p.base].map((n) => (
              <li key={n} className="rounded-full border border-current/25 px-3 py-1 opacity-80">{n}</li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={() => addToCart(p)}
              className="rounded-full bg-white/90 text-[#1a1222] px-7 py-3.5 text-[13px] font-medium hover:bg-white transition-colors active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
            >
              Add to bag · €{p.price}
            </button>
            <span className="text-[12px] opacity-60">{p.family} · {p.longevity} h on skin</span>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- B3 MANIFESTO */

const MANIFESTO = "Evening is when people stop performing for the day. The meetings end, the shoes come off, someone opens a bottle of wine. We make scent for that hour: closer to the skin, slower to leave.";

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");

  return (
    <section className="relative min-h-[90svh] flex items-center px-5 md:px-10 py-32">
      <SectionTag id="B3" name="Manifesto · scroll reveal" tone="light" />
      <p ref={ref} className="max-w-[1100px] mx-auto f-cormorant text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.08] balance">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">{children}</motion.span>;
}

/* ---------------------------------------------------------------- B4 RITUAL */

const STEPS = [
  { n: "i", t: "Skin, not clothes", d: "Two sprays on the wrists and one at the base of the throat. Fabric holds the top notes but loses the base." },
  { n: "ii", t: "Before you dress", d: "Apply on bare skin, then wait a minute. The alcohol lifts off and the oils settle where your pulse warms them." },
  { n: "iii", t: "Leave it alone", d: "Don't rub your wrists together. It crushes the top notes and skips straight to the heart." },
];

function Ritual() {
  return (
    <section className="relative px-5 md:px-10 py-32">
      <SectionTag id="B4" name="Ritual" tone="light" />
      <div className="max-w-[1300px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 mb-20 items-end">
          <h2 className="f-cormorant italic text-6xl md:text-7xl leading-none">How to wear it</h2>
          <div className="relative h-56 md:h-72 overflow-hidden rounded-[2px]">
            <img src={photo(PHOTOS.dropperHands, 1400)} alt="Hands holding an amber dropper bottle in low evening light" className="absolute inset-0 w-full h-full object-cover opacity-85 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3D2F66]/60 to-transparent" />
          </div>
        </div>
        <ol className="grid md:grid-cols-3 gap-px bg-white/15">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease }}
              className="bg-[#2a2150]/40 backdrop-blur-md p-8 md:p-10 min-h-[300px] flex flex-col"
            >
              <span className="f-cormorant italic text-6xl opacity-60">{s.n}</span>
              <h3 className="f-cormorant text-3xl mt-auto">{s.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed opacity-75 pretty">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- B5 FIND YOUR HOUR */

const Q1 = [
  { label: "Early evening, still outside", scores: { 5: 2, 2: 2, 3: 1 } },
  { label: "Over a long dinner", scores: { 4: 2, 1: 1, 2: 1 } },
  { label: "Late, when it's quiet", scores: { 6: 2, 1: 2 } },
];
const Q2 = [
  { label: "Smoke & leather", id: 1 },
  { label: "Citrus & spice", id: 2 },
  { label: "Salt & warm wood", id: 3 },
  { label: "Flowers & powder", id: 4 },
  { label: "Pine & green", id: 5 },
  { label: "Fig & tea", id: 6 },
];

function FindYourHour() {
  const { addToCart } = useCart();
  const [a1, setA1] = useState<number | null>(null);
  const [a2, setA2] = useState<number | null>(null);

  const result = useMemo(() => {
    if (a1 === null || a2 === null) return null;
    const score: Record<number, number> = {};
    Object.entries(Q1[a1].scores).forEach(([id, s]) => (score[+id] = (score[+id] ?? 0) + s));
    score[a2] = (score[a2] ?? 0) + 3;
    const best = Object.entries(score).sort((x, y) => y[1] - x[1])[0][0];
    return PRODUCTS.find((p) => p.id === +best)!;
  }, [a1, a2]);

  const chip = (on: boolean) =>
    `rounded-full px-5 py-2.5 text-[13px] border transition-all active:scale-[0.98] ${on ? "bg-white text-[#191833] border-white" : "border-white/30 hover:border-white/70"}`;

  return (
    <section id="find" className="relative px-5 md:px-10 py-32">
      <SectionTag id="B5" name="Find your hour · quiz" tone="light" />
      <div className="max-w-[1100px] mx-auto rounded-[28px] border border-white/15 bg-white/[0.06] backdrop-blur-xl p-8 md:p-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
        <p className="text-[11px] tracking-[0.3em] uppercase opacity-60 mb-4">Two questions</p>
        <h2 className="f-cormorant italic text-5xl md:text-6xl mb-12">Find your hour</h2>

        <fieldset className="mb-10">
          <legend className="text-[15px] mb-4 opacity-85">When do you feel most like yourself?</legend>
          <div className="flex flex-wrap gap-2">
            {Q1.map((q, i) => (
              <button key={q.label} type="button" aria-pressed={a1 === i} onClick={() => setA1(i)} className={chip(a1 === i)}>{q.label}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-[15px] mb-4 opacity-85">Which would you reach for?</legend>
          <div className="flex flex-wrap gap-2">
            {Q2.map((q) => (
              <button key={q.id} type="button" aria-pressed={a2 === q.id} onClick={() => setA2(q.id)} className={chip(a2 === q.id)}>{q.label}</button>
            ))}
          </div>
        </fieldset>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mt-14 pt-10 border-t border-white/15 grid grid-cols-[90px_1fr] md:grid-cols-[120px_1fr_auto] gap-6 md:gap-10 items-center"
            >
              <div className="text-white/70"><Bottle hue={result.hue} shape={result.shape} glass="rgba(255,255,255,0.25)" /></div>
              <div>
                <p className="text-[12px] tracking-[0.2em] uppercase opacity-60">Your hour is {result.hour}</p>
                <p className="f-cormorant italic text-5xl mt-1">{result.name}</p>
                <p className="mt-3 text-[14px] opacity-75 max-w-[44ch]">{result.story}</p>
              </div>
              <button onClick={() => addToCart(result)} className="col-span-2 md:col-span-1 rounded-full bg-white text-[#191833] px-7 py-3.5 text-[13px] font-medium hover:bg-white/85 active:scale-[0.98]">
                Add · €{result.price}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- B6 FOOTER */

function DuskFooter() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <footer className="relative px-5 md:px-10 pt-40 pb-10">
      <SectionTag id="B6" name="Footer · night" tone="light" />
      <div className="max-w-[1300px] mx-auto text-center">
        <p className="f-cormorant italic text-[clamp(3rem,9vw,8rem)] leading-none">Letters at dusk.</p>
        <p className="mt-6 text-[14px] opacity-70">One email a season, sent at 18:00 Paris time.</p>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const v = new FormData(e.currentTarget).get("email")?.toString() ?? "";
            setState(/^\S+@\S+\.\S+$/.test(v) ? "done" : "error");
          }}
          className="mt-10 mx-auto max-w-md flex rounded-full border border-white/25 bg-white/5 backdrop-blur-md p-1.5 focus-within:border-white/60"
        >
          <label htmlFor="d-email" className="sr-only">Email address</label>
          <input id="d-email" name="email" type="email" placeholder="Your email" className="flex-1 bg-transparent px-5 outline-none text-[14px] placeholder:text-white/40" />
          <button className="rounded-full bg-white text-[#0A0A14] px-6 py-2.5 text-[13px] font-medium">{state === "done" ? "Subscribed" : "Subscribe"}</button>
        </form>
        {state === "error" && <p className="mt-3 text-[13px] text-[#f3b4c0]">Enter a valid email address.</p>}

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] opacity-50">
          <span>© 2026 Vespre Parfums · 42 Avenue Montaigne, Paris</span>
          <span className="flex gap-6 justify-center"><a href="#">Shipping</a><a href="#">Privacy</a><a href="#">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
