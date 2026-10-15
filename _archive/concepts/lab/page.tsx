"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, animate, useInView, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { PRODUCTS, PHOTOS, photo, type Product } from "../../data";
import { useCart } from "../../ClientLayout";
import Bottle from "../_shared/Bottle";
import SectionTag from "../_shared/SectionTag";

const ease = [0.16, 1, 0.3, 1] as const;
const label = "f-jet text-[11px] uppercase tracking-[0.08em]";

export default function LabConcept() {
  return (
    <div className="f-archivo min-h-screen bg-[#F2F1EE] text-[#111] selection:bg-[#D9461F] selection:text-white">
      <LabNav />
      <main>
        <Hero />
        <FormulaSheet />
        <Grid />
        <Process />
        <Matrix />
      </main>
      <LabFooter />
    </div>
  );
}

/* ---------------------------------------------------------------- NAV */

function LabNav() {
  const { cartCount, setCartOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-[#F2F1EE] border-b border-[#111]">
      <div className="h-12 grid grid-cols-[auto_1fr_auto] items-stretch">
        <Link href="/concepts/lab" className="px-5 flex items-center border-r border-[#111] font-extrabold wdth-62 text-xl tracking-tight uppercase">
          Vespre/Lab
        </Link>
        <nav className={`hidden md:flex items-stretch ${label}`}>
          {[["01", "Formulas", "#formulas"], ["02", "Process", "#process"], ["03", "Materials", "#materials"]].map(([n, t, h]) => (
            <a key={n} href={h} className="px-5 flex items-center gap-2 border-r border-[#111] hover:bg-[#111] hover:text-[#F2F1EE] transition-colors">
              <span className="opacity-50">[{n}]</span>{t}
            </a>
          ))}
          <Link href="/concepts" className="px-5 flex items-center border-r border-[#111] hover:bg-[#111] hover:text-[#F2F1EE] transition-colors">← Concepts</Link>
        </nav>
        <span className="md:hidden" />
        <button onClick={() => setCartOpen(true)} className={`${label} px-5 border-l border-[#111] bg-[#111] text-[#F2F1EE] hover:bg-[#D9461F] transition-colors`}>
          Bag({String(cartCount).padStart(2, "0")})
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- C1 HERO */

function StretchLine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const w = useMotionValue(62);
  const ws = useSpring(w, { stiffness: 120, damping: 20 });
  const fvs = useMotionTemplate`"wdth" ${ws}`;
  return (
    <motion.span
      ref={ref}
      style={{ fontVariationSettings: fvs }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) w.set(62 + ((e.clientX - r.left) / r.width) * 63);
      }}
      onMouseLeave={() => w.set(62)}
      className={`block cursor-ew-resize ${className}`}
    >
      {children}
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="relative lab-grid border-b border-[#111]">
      <SectionTag id="C1" name="Hero · stretch type" />
      <div className={`grid grid-cols-2 md:grid-cols-4 border-b border-[#111] ${label}`}>
        {["Formula index — 06 active", "Batch 26-10", "Macerated 84 days", "Grasse 43.66°N 6.92°E"].map((t, i) => (
          <span key={t} className={`px-5 py-3 border-[#111] ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>{t}</span>
        ))}
      </div>

      <div className="px-5 pt-10 md:pt-14 pb-8">
        <h1 className="font-extrabold uppercase leading-[0.82] tracking-[-0.02em] text-[clamp(4rem,15vw,15rem)]">
          <StretchLine>Perfume,</StretchLine>
          <StretchLine className="text-[#D9461F]">on the</StretchLine>
          <StretchLine>record.</StretchLine>
        </h1>
        <p className={`${label} mt-4 opacity-50`}>↔ Move across the headline</p>
      </div>

      <div className="grid md:grid-cols-12 border-t border-[#111]">
        <div className="md:col-span-5 p-5 md:p-8 md:border-r border-[#111] flex flex-col justify-between gap-10">
          <p className="text-2xl md:text-3xl font-medium leading-tight tracking-tight max-w-[22ch]">
            Six formulas. No fillers. Every number published — concentration, wear time, origin.
          </p>
          <div className="flex gap-px bg-[#111] border border-[#111] self-start">
            <a href="#formulas" className={`${label} bg-[#111] text-[#F2F1EE] px-6 py-4 hover:bg-[#D9461F] transition-colors`}>Read the formulas →</a>
            <a href="#grid" className={`${label} bg-[#F2F1EE] px-6 py-4 hover:bg-[#e6e4df] transition-colors`}>Shop all</a>
          </div>
        </div>
        <div className="md:col-span-4 relative min-h-[320px] border-t md:border-t-0 md:border-r border-[#111] overflow-hidden">
          <img src={photo(PHOTOS.dropperHands, 1000)} alt="Hands measuring perfume oil from an amber dropper bottle" className="absolute inset-0 w-full h-full object-cover grayscale contrast-125" />
          <span className={`${label} absolute bottom-0 left-0 bg-[#D9461F] text-white px-3 py-2`}>Fig. 1 — Dosing base oil, 0.01 g</span>
        </div>
        <dl className="md:col-span-3 grid grid-cols-2 md:grid-cols-1 border-t md:border-t-0 border-[#111]">
          {[["15–22%", "Oil concentration"], ["7–10 h", "Wear on skin"], ["240", "Bottles / batch"]].map(([v, l], i) => (
            <div key={l} className={`p-5 md:p-6 border-[#111] ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r md:border-r-0" : ""}`}>
              <dt className={`${label} opacity-60`}>{l}</dt>
              <dd className="text-4xl md:text-5xl font-extrabold wdth-75 tnum mt-2">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- C2 FORMULA SHEET */

const composition = (p: Product) => {
  const top = 30 - p.longevity;
  const heart = 35;
  return [
    { k: "Top", v: top, notes: p.top },
    { k: "Heart", v: heart, notes: p.heart },
    { k: "Base", v: 100 - top - heart, notes: p.base },
  ];
};

function FormulaSheet() {
  const { addToCart } = useCart();
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <section id="formulas" className="relative border-b border-[#111]">
      <SectionTag id="C2" name="Formula sheet" />
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#111] pt-16">
          <p className={`${label} px-5 pb-4 opacity-60`}>[01] Formulas</p>
          <ul>
            {PRODUCTS.map((x, i) => (
              <li key={x.id}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full grid grid-cols-[40px_1fr_auto] items-center px-5 py-4 border-t border-[#111] text-left transition-colors ${i === active ? "bg-[#111] text-[#F2F1EE]" : "hover:bg-[#e6e4df]"}`}
                >
                  <span className="f-jet text-xs opacity-60">{x.no}</span>
                  <span className="font-extrabold uppercase wdth-62 text-2xl tracking-tight">{x.name}</span>
                  <span className="f-jet text-xs tnum">{i === active ? "●" : `€${x.price}`}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto border-b md:border-b-0 md:border-r border-[#111] flex items-center justify-center" style={{ background: `color-mix(in oklab, ${p.hue} 28%, #F2F1EE)` }}>
                <span className={`${label} absolute top-5 left-5`}>Formula {p.no}/06</span>
                <span className={`${label} absolute top-5 right-5`}>{p.family}</span>
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease }} className="w-[38%] text-[#111]">
                  <Bottle hue={p.hue} shape={p.shape} label={`N°${p.no}`} glass="rgba(255,255,255,0.5)" />
                </motion.div>
              </div>

              <div className="flex flex-col">
                <div className="p-5 md:p-8 border-b border-[#111]">
                  <h2 className="font-extrabold uppercase wdth-62 text-6xl md:text-7xl leading-[0.85] tracking-tight">{p.name}</h2>
                  <p className="mt-4 text-[15px] leading-snug max-w-[40ch]">{p.story}</p>
                </div>

                <div className="p-5 md:p-8 border-b border-[#111] space-y-4">
                  <p className={`${label} opacity-60`}>Composition by weight</p>
                  {composition(p).map((c, i) => (
                    <div key={c.k} className="grid grid-cols-[56px_1fr_44px] items-center gap-3">
                      <span className={label}>{c.k}</span>
                      <div className="h-7 bg-[#111]/[0.06] relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${c.v}%` }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease }}
                          className="absolute inset-y-0 left-0 bg-[#111] flex items-center px-2 overflow-hidden"
                        >
                          <span className="f-jet text-[10px] text-[#F2F1EE] whitespace-nowrap uppercase">{c.notes.join(" / ")}</span>
                        </motion.div>
                      </div>
                      <span className="f-jet text-xs tnum text-right">{c.v}%</span>
                    </div>
                  ))}
                </div>

                <dl className="grid grid-cols-3 border-b border-[#111]">
                  <div className="p-5 border-r border-[#111]">
                    <dt className={`${label} opacity-60`}>Conc.</dt>
                    <dd className="text-3xl font-extrabold wdth-75 tnum mt-1">{p.concentration}%</dd>
                  </div>
                  <div className="p-5 border-r border-[#111]">
                    <dt className={`${label} opacity-60`}>Wear</dt>
                    <dd className="text-3xl font-extrabold wdth-75 tnum mt-1">{p.longevity}h</dd>
                  </div>
                  <div className="p-5">
                    <dt className={`${label} opacity-60`}>Sillage</dt>
                    <dd className="flex gap-1 mt-3" aria-label={`${p.sillage} of 5`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`h-5 flex-1 ${i < p.sillage ? "bg-[#D9461F]" : "bg-[#111]/10"}`} />
                      ))}
                    </dd>
                  </div>
                </dl>

                <button onClick={() => addToCart(p)} className="mt-auto group flex justify-between items-center px-5 md:px-8 py-6 bg-[#111] text-[#F2F1EE] hover:bg-[#D9461F] transition-colors active:scale-[0.995]">
                  <span className="font-extrabold uppercase wdth-62 text-3xl tracking-tight">Add to bag</span>
                  <span className="f-jet text-sm tnum">€{p.price} / 50 ml <span className="inline-block group-hover:translate-x-1 transition-transform">→</span></span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- C3 GRID */

function Grid() {
  const { addToCart } = useCart();
  return (
    <section id="grid" className="relative border-b border-[#111]">
      <SectionTag id="C3" name="Product grid" />
      <div className="flex items-end justify-between px-5 pt-16 pb-6 border-b border-[#111]">
        <h2 className="font-extrabold uppercase wdth-62 text-6xl md:text-8xl leading-none tracking-tight">All formulas</h2>
        <span className={`${label} opacity-60`}>06 items · 50 ml</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="group bg-[#F2F1EE] hover:bg-[#111] hover:text-[#F2F1EE] transition-colors duration-300 flex flex-col">
            <div className={`flex justify-between px-5 py-3 ${label}`}>
              <span>{p.no}</span><span className="opacity-60">{p.family}</span>
            </div>
            <div className="relative mx-5 aspect-[4/3] flex items-center justify-center overflow-hidden transition-colors duration-500" style={{ background: `color-mix(in oklab, ${p.hue} 22%, #F2F1EE)` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: p.hue }} />
              <div className="relative w-[26%] text-[#111] group-hover:-translate-y-2 group-hover:rotate-[-4deg] transition-transform duration-500">
                <Bottle hue={p.hue} shape={p.shape} glass="rgba(255,255,255,0.55)" />
              </div>
            </div>
            <div className="px-5 pt-5 pb-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-extrabold uppercase wdth-62 text-4xl leading-none tracking-tight">{p.name}</h3>
                <p className="f-jet text-[11px] mt-2 opacity-60 uppercase">{p.top[0]} · {p.heart[0]} · {p.base[0]}</p>
              </div>
              <button onClick={() => addToCart(p)} aria-label={`Add ${p.name} to bag`} className="shrink-0 f-jet text-xs tnum border border-current px-3 py-2 hover:bg-[#D9461F] hover:border-[#D9461F] hover:text-white transition-colors">
                €{p.price} +
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- C4 PROCESS */

function CountUp({ to, pad = 2 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tnum">{String(v).padStart(pad, "0")}</span>;
}

const PROCESS = [
  { day: 0, t: "Weigh", d: "Each material weighed to 0.01 g against the formula sheet." },
  { day: 1, t: "Blend", d: "Oils combined in order of volatility, heaviest first." },
  { day: 84, t: "Macerate", d: "Twelve weeks at 4 °C in sealed steel, away from light." },
  { day: 85, t: "Filter", d: "Chilled to −5 °C and paper-filtered twice to clear waxes." },
  { day: 86, t: "Fill", d: "Filled by hand. Batch number engraved on the base." },
];

function Process() {
  return (
    <section id="process" className="relative border-b border-[#111] lab-grid">
      <SectionTag id="C4" name="Process · counters" />
      <div className="px-5 pt-16 pb-10 grid md:grid-cols-12 gap-6 items-end">
        <h2 className="md:col-span-7 font-extrabold uppercase wdth-62 text-6xl md:text-8xl leading-[0.85] tracking-tight">
          Day 00 to day <span className="text-[#D9461F]"><CountUp to={86} /></span>
        </h2>
        <p className="md:col-span-4 md:col-start-9 text-[15px] leading-snug">
          Most fragrance is bottled within days of blending. Ours waits twelve weeks, which is why the opening and the drydown still smell like the same perfume.
        </p>
      </div>
      <ol className="grid md:grid-cols-5 border-t border-[#111]">
        {PROCESS.map((s, i) => (
          <li key={s.t} className={`p-5 md:p-6 min-h-[260px] flex flex-col border-[#111] ${i < 4 ? "border-b md:border-b-0 md:border-r" : ""} bg-[#F2F1EE]/80`}>
            <span className={`${label} opacity-60`}>Day</span>
            <span className="text-7xl font-extrabold wdth-62 leading-none mt-1"><CountUp to={s.day} /></span>
            <h3 className="mt-auto font-extrabold uppercase text-xl">{s.t}</h3>
            <p className="mt-2 text-[13px] leading-snug opacity-75">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- C5 MATERIALS MATRIX */

type Layer = "T" | "H" | "B";
const NOTES = (() => {
  const m = new Map<string, Record<number, Layer>>();
  PRODUCTS.forEach((p) => {
    const add = (n: string, l: Layer) => m.set(n, { ...(m.get(n) ?? {}), [p.id]: l });
    p.top.forEach((n) => add(n, "T"));
    p.heart.forEach((n) => add(n, "H"));
    p.base.forEach((n) => add(n, "B"));
  });
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
})();

function Matrix() {
  const [col, setCol] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const rows = NOTES.filter(([n]) => n.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="materials" className="relative border-b border-[#111]">
      <SectionTag id="C5" name="Materials matrix" />
      <div className="px-5 pt-16 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111]">
        <div>
          <h2 className="font-extrabold uppercase wdth-62 text-6xl md:text-8xl leading-none tracking-tight">Materials</h2>
          <p className="mt-3 text-[15px] max-w-[46ch]">Every note, every formula it appears in, and whether it shows up at the top (T), heart (H) or base (B).</p>
        </div>
        <label className="flex items-center border border-[#111] focus-within:ring-2 focus-within:ring-[#D9461F]">
          <span className={`${label} px-3 opacity-60`}>Filter</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. iris" className="f-jet text-sm bg-transparent py-2.5 pr-3 outline-none w-44" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className={label}>
              <th className="text-left px-5 py-3 font-normal border-b border-[#111]">Note</th>
              {PRODUCTS.map((p) => (
                <th key={p.id} className="border-b border-l border-[#111] p-0 font-normal">
                  <button
                    onMouseEnter={() => setCol(p.id)}
                    onMouseLeave={() => setCol(null)}
                    onFocus={() => setCol(p.id)}
                    onBlur={() => setCol(null)}
                    className={`w-full py-3 px-2 transition-colors ${col === p.id ? "bg-[#111] text-[#F2F1EE]" : ""}`}
                  >
                    {p.no} <span className="hidden lg:inline">{p.name}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([note, where]) => (
              <tr key={note} className="group hover:bg-[#111] hover:text-[#F2F1EE] transition-colors">
                <td className="px-5 py-2.5 border-b border-[#111]/20 font-semibold uppercase wdth-75">{note}</td>
                {PRODUCTS.map((p) => (
                  <td key={p.id} className={`text-center border-b border-l border-[#111]/20 f-jet text-xs ${col === p.id ? "bg-[#D9461F]/15" : ""}`}>
                    {where[p.id] ? <span className="inline-flex w-6 h-6 items-center justify-center bg-[#D9461F] text-white">{where[p.id]}</span> : <span className="opacity-20">·</span>}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 f-jet text-sm opacity-60">No note matches “{query}”.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- C6 FOOTER */

function LabFooter() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <footer className="relative bg-[#111] text-[#F2F1EE] overflow-hidden">
      <SectionTag id="C6" name="Footer · giant type" tone="light" />
      <div className="grid md:grid-cols-12 border-b border-[#F2F1EE]/20">
        <div className="md:col-span-6 p-5 md:p-8 pt-16 md:pt-16 md:border-r border-[#F2F1EE]/20">
          <p className={`${label} opacity-60 mb-4`}>Batch notices</p>
          <p className="text-2xl md:text-3xl font-medium leading-tight max-w-[26ch]">One email when a new batch is filled. Batch number, fill date, quantity.</p>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const v = new FormData(e.currentTarget).get("email")?.toString() ?? "";
              setState(/^\S+@\S+\.\S+$/.test(v) ? "done" : "error");
            }}
            className="mt-8 flex border border-[#F2F1EE]/40 focus-within:border-[#F2F1EE] max-w-lg"
          >
            <label htmlFor="l-email" className="sr-only">Email address</label>
            <input id="l-email" name="email" type="email" placeholder="EMAIL@ADDRESS" className="f-jet text-sm flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-[#F2F1EE]/40" />
            <button className={`${label} bg-[#D9461F] px-5 hover:bg-[#F2F1EE] hover:text-[#111] transition-colors`}>{state === "done" ? "Subscribed" : "Subscribe →"}</button>
          </form>
          {state === "error" && <p className="mt-3 f-jet text-xs text-[#ff9b80]">ERR: enter a valid email address.</p>}
        </div>
        <div className={`md:col-span-6 grid grid-cols-2 ${label}`}>
          <div className="p-5 md:p-8 pt-10 md:pt-16 border-r border-[#F2F1EE]/20 space-y-2 opacity-80">
            <p className="opacity-50 mb-4">Locations</p>
            <p>Maison — 42 Av. Montaigne, Paris</p>
            <p>Lab — 124 Rte de Pégomas, Grasse</p>
            <p className="pt-3 normal-case">concierge@vespre.com</p>
          </div>
          <div className="p-5 md:p-8 pt-10 md:pt-16 flex flex-col gap-2 opacity-80">
            <p className="opacity-50 mb-4">Index</p>
            <a href="#" className="hover:text-[#D9461F]">Shipping & returns</a>
            <a href="#" className="hover:text-[#D9461F]">Consultations</a>
            <a href="#" className="hover:text-[#D9461F]">Privacy</a>
            <a href="#" className="hover:text-[#D9461F]">Terms</a>
          </div>
        </div>
      </div>
      <p aria-hidden className="font-extrabold uppercase wdth-62 leading-[0.78] tracking-[-0.03em] text-[clamp(6rem,31vw,34rem)] text-center -mb-[0.12em] select-none">
        Vespre
      </p>
      <div className={`${label} flex justify-between px-5 py-3 border-t border-[#F2F1EE]/20 opacity-60`}>
        <span>© 2026 Vespre Parfums</span><span>Formula index v6.0</span>
      </div>
    </footer>
  );
}
