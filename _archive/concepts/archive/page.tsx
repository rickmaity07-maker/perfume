"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { PRODUCTS, MATERIALS, PHOTOS, photo, type Product } from "../../data";
import { useCart } from "../../ClientLayout";
import Bottle from "../_shared/Bottle";
import SectionTag from "../_shared/SectionTag";

const INK = "#1D1A17";
const OXBLOOD = "#6B1E1E";
const ease = [0.16, 1, 0.3, 1] as const;

export default function ArchiveConcept() {
  return (
    <div className="grain f-geist min-h-screen bg-[#EDE7DC] text-[#1D1A17] selection:bg-[#6B1E1E] selection:text-[#EDE7DC]">
      <ArchiveNav />
      <main>
        <Hero />
        <Index />
        <Timeline />
        <Plate />
        <Provenance />
        <Journal />
      </main>
      <ArchiveFooter />
    </div>
  );
}

/* ---------------------------------------------------------------- NAV */

function ArchiveNav() {
  const { cartCount, setCartOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-[#EDE7DC]/85 backdrop-blur-md border-b border-[#1D1A17]/15">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden md:flex gap-7 text-[13px]">
          <a href="#index" className="hover:text-[#6B1E1E] transition-colors">Index</a>
          <a href="#plate" className="hover:text-[#6B1E1E] transition-colors">Atelier</a>
          <a href="#provenance" className="hover:text-[#6B1E1E] transition-colors">Provenance</a>
        </nav>
        <Link href="/concepts" className="md:hidden f-gmono text-[11px] uppercase tracking-wider">← Concepts</Link>
        <Link href="/concepts/archive" className="f-instrument text-3xl tracking-tight">Vespre</Link>
        <div className="flex justify-end items-center gap-6 text-[13px]">
          <span className="hidden lg:inline f-gmono text-[11px] uppercase tracking-wider opacity-50">Archive of evening scents · Grasse</span>
          <button onClick={() => setCartOpen(true)} className="f-gmono text-[11px] uppercase tracking-wider border border-[#1D1A17]/30 px-3 py-1.5 hover:bg-[#1D1A17] hover:text-[#EDE7DC] transition-colors active:scale-[0.98]">
            Bag ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- A1 HERO */

function Hero() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];

  return (
    <section className="relative border-b border-[#1D1A17]/15">
      <SectionTag id="A1" name="Hero · specimen" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="f-gmono text-[11px] uppercase tracking-[0.2em] text-[#6B1E1E] mb-8">
            Catalogue · Volume VI · Autumn 2026
          </motion.p>
          <h1 className="f-instrument text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.02em]">
            {["Scent,", "kept like", "a record."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${i === 1 ? "pl-[12%]" : ""} ${i === 2 ? "italic" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 * i, ease }}
                >
                  {i === 2 ? <>a <span className="text-[#6B1E1E]">record.</span></> : line}
                </motion.span>
              </span>
            ))}
          </h1>
          <p className="mt-10 max-w-[44ch] text-[15px] leading-relaxed text-[#1D1A17]/70 pretty">
            Six eaux de parfum, each filed with its full structure: what you smell in the first fifteen minutes, what stays by the third hour, and what&apos;s still on your collar the next morning.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#index" className="bg-[#1D1A17] text-[#EDE7DC] px-7 py-4 text-[13px] hover:bg-[#6B1E1E] transition-colors active:scale-[0.98]">
              Browse the index
            </a>
            <a href="#timeline" className="text-[13px] underline underline-offset-[6px] decoration-[#1D1A17]/30 hover:decoration-[#6B1E1E]">
              How a scent unfolds
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square max-w-[560px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <SpecimenRings product={p} />
              </motion.div>
            </AnimatePresence>
            <motion.div key={`b${p.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[22%] text-[#1D1A17]">
              <Bottle hue={p.hue} shape={p.shape} glass="rgba(255,255,255,0.55)" />
            </motion.div>
          </div>

          <div className="mt-8 border-t border-[#1D1A17]/20 pt-4 grid grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <p className="f-gmono text-[11px] uppercase tracking-wider opacity-50">Specimen N°{p.no} · {p.family}</p>
              <p className="f-instrument text-3xl mt-1">{p.name}</p>
            </div>
            <div className="flex gap-1" role="tablist" aria-label="Choose specimen">
              {PRODUCTS.map((x, i) => (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`f-gmono text-[11px] w-9 h-9 border transition-colors ${i === active ? "bg-[#1D1A17] text-[#EDE7DC] border-[#1D1A17]" : "border-[#1D1A17]/25 hover:border-[#1D1A17]"}`}
                >
                  {x.no}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecimenRings({ product }: { product: Product }) {
  const size = 560;
  const c = size / 2;
  const rings = [
    { r: 110, label: "Top", notes: product.top, sub: "0 – 15 min" },
    { r: 180, label: "Heart", notes: product.heart, sub: "15 min – 3 h" },
    { r: 250, label: "Base", notes: product.base, sub: `3 – ${product.longevity} h` },
  ];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible" role="img" aria-label={`${product.name} structure: top ${product.top.join(", ")}; heart ${product.heart.join(", ")}; base ${product.base.join(", ")}`}>
      {rings.map((ring, ri) => (
        <g key={ring.label}>
          <motion.circle
            cx={c} cy={c} r={ring.r} fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={1}
            strokeDasharray={ri === 2 ? "2 5" : undefined}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: ri * 0.15, ease }}
          />
          <text x={c} y={c - ring.r - 8} textAnchor="middle" fontSize="11" fill={OXBLOOD} className="f-gmono" letterSpacing="2">
            {ring.label.toUpperCase()} · {ring.sub}
          </text>
          {ring.notes.map((note, ni) => {
            const angle = (ri * 0.6 + ni * (Math.PI / 1.1) + 0.9) % (Math.PI * 2);
            const x = c + Math.cos(angle) * ring.r;
            const y = c + Math.sin(angle) * ring.r;
            const right = Math.cos(angle) >= 0;
            return (
              <motion.g key={note} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + ri * 0.15 + ni * 0.1 }}>
                <circle cx={x} cy={y} r={4} fill={OXBLOOD} />
                <text x={x + (right ? 10 : -10)} y={y + 4} textAnchor={right ? "start" : "end"} fontSize="17" fill={INK} className="f-instrument" fontStyle="italic">
                  {note}
                </text>
              </motion.g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- A2 INDEX */

function Index() {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26 });
  const y = useSpring(my, { stiffness: 220, damping: 26 });
  const hp = hovered !== null ? PRODUCTS[hovered] : null;

  return (
    <section id="index" className="relative border-b border-[#1D1A17]/15 py-24 md:py-32">
      <SectionTag id="A2" name="Index · hover preview" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="f-instrument text-5xl md:text-7xl tracking-tight">The index</h2>
          <p className="max-w-[38ch] text-[14px] text-[#1D1A17]/65 pretty">Every formula we currently make. Hover a row to see the bottle; nothing is limited edition, nothing is discontinued without notice.</p>
        </div>

        <div
          ref={ref}
          className="relative"
          onMouseMove={(e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="hidden md:grid grid-cols-[80px_1.4fr_1fr_1.4fr_90px_100px_120px] f-gmono text-[10px] uppercase tracking-[0.15em] opacity-50 pb-3 border-b border-[#1D1A17]">
            <span>N°</span><span>Name</span><span>Family</span><span>Key notes</span><span>Wear</span><span>50 ml</span><span />
          </div>

          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              onMouseEnter={() => setHovered(i)}
              className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1.4fr_1fr_1.4fr_90px_100px_120px] items-center gap-y-2 py-6 md:py-7 border-b border-[#1D1A17]/15 hover:bg-[#1D1A17]/[0.03] transition-colors"
            >
              <span className="f-gmono text-[12px] opacity-50 tnum">{p.no}</span>
              <span className="f-instrument text-3xl md:text-[2.6rem] leading-none tracking-tight group-hover:italic group-hover:translate-x-2 transition-transform duration-500">{p.name}</span>
              <span className="hidden md:block text-[13px] opacity-70">{p.family}</span>
              <span className="hidden md:block f-instrument italic text-[17px] opacity-80">{p.top[0]}, {p.heart[0]}, {p.base[0]}</span>
              <span className="hidden md:block f-gmono text-[12px] tnum opacity-70">{p.longevity} h</span>
              <span className="f-gmono text-[13px] tnum md:text-left text-right">€{p.price}</span>
              <button
                onClick={() => addToCart(p)}
                className="col-span-3 md:col-span-1 justify-self-start md:justify-self-end f-gmono text-[11px] uppercase tracking-wider border border-[#1D1A17]/30 px-4 py-2 hover:bg-[#6B1E1E] hover:border-[#6B1E1E] hover:text-[#EDE7DC] transition-colors active:scale-[0.98]"
              >
                Add to bag
              </button>
            </div>
          ))}

          <motion.div style={{ x, y }} className="hidden md:block pointer-events-none absolute left-0 top-0 z-20">
            <AnimatePresence>
              {hp && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="-translate-x-1/2 -translate-y-[115%] w-52 aspect-[4/5] flex items-center justify-center shadow-[0_30px_60px_-20px_rgba(60,30,20,0.45)]"
                  style={{ background: `color-mix(in oklab, ${hp.hue} 22%, #F6F2EA)` }}
                >
                  <div className="w-[55%] text-[#1D1A17]">
                    <Bottle hue={hp.hue} shape={hp.shape} label={`N°${hp.no}`} glass="rgba(255,255,255,0.6)" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- A3 TIMELINE */

const MAX_H = 12;
const pct = (h: number) => Math.sqrt(h / MAX_H) * 100;
const pos = (h: number) => `${pct(h)}%`;
const TICKS = [
  { h: 0, l: "0" }, { h: 0.25, l: "15 m" }, { h: 1, l: "1 h" }, { h: 3, l: "3 h" }, { h: 6, l: "6 h" }, { h: 9, l: "9 h" }, { h: 12, l: "12 h" },
];

function Timeline() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];
  const bands = [
    { label: "Top", notes: p.top, from: 0, to: 0.75 },
    { label: "Heart", notes: p.heart, from: 0.2, to: 4 },
    { label: "Base", notes: p.base, from: 1, to: p.longevity },
  ];

  return (
    <section id="timeline" className="relative border-b border-[#1D1A17]/15 py-24 md:py-32 bg-[#E6DFD2]">
      <SectionTag id="A3" name="Wear timeline" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-16">
          <h2 className="f-instrument text-5xl md:text-6xl tracking-tight leading-[0.95]">How it <span className="italic">wears</span>, hour by hour.</h2>
          <div>
            <p className="max-w-[52ch] text-[14px] text-[#1D1A17]/70 pretty">
              Perfume is three layers evaporating at different speeds. Light citrus and spice go first; the heavier woods and resins stay. Choose a scent to see when each layer is present on skin.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PRODUCTS.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setActive(i)}
                  className={`text-[13px] px-4 py-2 border transition-colors ${i === active ? "bg-[#1D1A17] text-[#EDE7DC] border-[#1D1A17]" : "border-[#1D1A17]/25 hover:border-[#1D1A17]"}`}
                >
                  {x.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="space-y-5">
            {bands.map((b) => (
              <div key={b.label} className="grid grid-cols-[64px_1fr] md:grid-cols-[90px_1fr] items-center gap-4">
                <span className="f-gmono text-[11px] uppercase tracking-wider opacity-60">{b.label}</span>
                <div className="relative h-16 md:h-20 border-l border-[#1D1A17]/20">
                  <motion.div
                    initial={false}
                    animate={{ left: `${pct(b.from)}%`, width: `${pct(b.to) - pct(b.from)}%` }}
                    transition={{ duration: 0.8, ease }}
                    className="absolute inset-y-0 flex items-center px-4 overflow-hidden"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.hue}55 12%, ${p.hue}aa 60%, transparent)` }}
                  >
                    <span className="f-instrument italic text-lg md:text-xl whitespace-nowrap">{b.notes.join(" · ")}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[64px_1fr] md:grid-cols-[90px_1fr] gap-4 mt-4">
            <span />
            <div className="relative h-6 border-t border-[#1D1A17]">
              {TICKS.map((t) => (
                <span key={t.h} className="absolute top-2 -translate-x-1/2 f-gmono text-[10px] opacity-60 tnum first:translate-x-0" style={{ left: pos(t.h) }}>
                  {t.l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- A4 PLATE */

function Plate() {
  return (
    <section id="plate" className="relative border-b border-[#1D1A17]/15">
      <SectionTag id="A4" name="Atelier plate" tone="light" />
      <div className="grid lg:grid-cols-2">
        <figure className="relative min-h-[60vh] lg:min-h-[90vh] overflow-hidden">
          <motion.img
            src={photo(PHOTOS.amberDropper, 1600)}
            alt="Amber glass dropper bottle on a wooden stand, with leaf shadows across the wall"
            className="absolute inset-0 w-full h-full object-cover sepia-[0.25]"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease }}
          />
          <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-8 bg-gradient-to-t from-black/50 to-transparent text-[#EDE7DC] f-gmono text-[11px] uppercase tracking-wider">
            Plate IV — Tincture of benzoin, week 9 of 12
          </figcaption>
        </figure>

        <div className="px-5 md:px-16 py-20 md:py-28 flex flex-col justify-center">
          <p className="f-gmono text-[11px] uppercase tracking-[0.2em] text-[#6B1E1E] mb-8">From the atelier ledger</p>
          <h2 className="f-instrument text-5xl md:text-6xl leading-[0.95] tracking-tight mb-10 balance">Twelve weeks in the cold before anything is bottled.</h2>
          <p className="text-[15px] leading-[1.75] text-[#1D1A17]/75 max-w-[52ch] pretty first-letter:font-[family-name:var(--font-instrument)] first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-[#6B1E1E]">
            Each batch rests at four degrees for twelve weeks. Over that time, the heavy base molecules bind to the lighter top notes, so the opening doesn&apos;t vanish and leave the base alone. We test every batch on skin at hour six. If the base isn&apos;t holding, the batch goes back.
          </p>
          <dl className="mt-14 grid grid-cols-3 border-t border-[#1D1A17]/20">
            {[
              ["84", "days macerated"],
              ["240", "bottles per batch"],
              ["6 h", "skin test, every batch"],
            ].map(([n, l]) => (
              <div key={l} className="pt-5 pr-4">
                <dt className="f-instrument text-4xl md:text-5xl tnum">{n}</dt>
                <dd className="f-gmono text-[10px] uppercase tracking-wider opacity-60 mt-2">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- A5 PROVENANCE */

function Provenance() {
  const usedIn = (name: string) => PRODUCTS.filter((p) => [...p.top, ...p.heart, ...p.base].includes(name));

  return (
    <section id="provenance" className="relative border-b border-[#1D1A17]/15 py-24 md:py-32">
      <SectionTag id="A5" name="Provenance ledger" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid lg:grid-cols-[1fr_2.2fr] gap-14">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 className="f-instrument text-5xl md:text-6xl tracking-tight leading-[0.95]">Where it <span className="italic">comes from</span>.</h2>
          <p className="mt-6 max-w-[40ch] text-[14px] text-[#1D1A17]/65 pretty">
            We list the origin of every key material. Where a natural ingredient can&apos;t be sourced responsibly, we use a lab-made equivalent and say so.
          </p>
        </div>

        <div>
          <div className="hidden md:grid grid-cols-[1.2fr_1.6fr_1.2fr_1fr] f-gmono text-[10px] uppercase tracking-[0.15em] opacity-50 pb-3 border-b border-[#1D1A17]">
            <span>Material</span><span>Origin</span><span>Harvest</span><span>Used in</span>
          </div>
          {MATERIALS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.04, ease }}
              className="grid grid-cols-2 md:grid-cols-[1.2fr_1.6fr_1.2fr_1fr] gap-y-1 py-5 border-b border-[#1D1A17]/15 hover:pl-3 transition-[padding] duration-300"
            >
              <span className="f-instrument text-2xl">{m.name}</span>
              <span className={`text-[14px] self-center ${m.synthetic ? "text-[#6B1E1E]" : "opacity-75"}`}>{m.origin}</span>
              <span className="f-gmono text-[12px] opacity-60 self-center">{m.harvest}</span>
              <span className="f-gmono text-[12px] self-center tnum">{usedIn(m.name).map((p) => `N°${p.no}`).join(" ") || "—"}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- A6 JOURNAL */

const ENTRIES = [
  { date: "14 Sep 2026", tag: "Guide", title: "Layering two scents without muddying either", img: PHOTOS.dropperHands, alt: "Hands holding a small amber dropper bottle against a dark background" },
  { date: "02 Aug 2026", tag: "Field notes", title: "Three weeks of the jasmine harvest in Grasse", img: PHOTOS.flowers, alt: "Field of orange flowers under a blue sky" },
  { date: "19 Jun 2026", tag: "Materials", title: "Why our ambergris comes from a lab", img: PHOTOS.amberBottle, alt: "Amber-coloured perfume bottle lying on draped white fabric" },
];

function Journal() {
  return (
    <section className="relative py-24 md:py-32">
      <SectionTag id="A6" name="Journal" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex items-end justify-between mb-14">
          <h2 className="f-instrument text-5xl md:text-7xl tracking-tight">Notes &amp; letters</h2>
          <a href="#" className="hidden md:inline text-[13px] underline underline-offset-[6px] decoration-[#1D1A17]/30 hover:decoration-[#6B1E1E]">All entries</a>
        </div>
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-8 md:gap-10">
          {ENTRIES.map((e, i) => (
            <article key={e.title} className={`group cursor-pointer ${i === 1 ? "md:mt-24" : ""} ${i === 2 ? "md:mt-12" : ""}`}>
              <div className={`overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                <img src={photo(e.img, 900)} alt={e.alt} className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" />
              </div>
              <div className="flex justify-between f-gmono text-[10px] uppercase tracking-wider opacity-60 mt-5">
                <span>{e.tag}</span><span>{e.date}</span>
              </div>
              <h3 className="f-instrument text-2xl md:text-3xl leading-tight mt-3 group-hover:text-[#6B1E1E] transition-colors balance">{e.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- FOOTER */

function ArchiveFooter() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <footer className="relative bg-[#1D1A17] text-[#EDE7DC]">
      <SectionTag id="A7" name="Footer" tone="light" />
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pt-24 pb-10">
        <div className="grid lg:grid-cols-2 gap-16 pb-20 border-b border-[#EDE7DC]/15">
          <div>
            <p className="f-instrument text-4xl md:text-5xl leading-tight max-w-[18ch] balance">The archive letter, four times a year. Nothing else.</p>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const v = new FormData(e.currentTarget).get("email")?.toString() ?? "";
                setState(/^\S+@\S+\.\S+$/.test(v) ? "done" : "error");
              }}
              className="mt-10 flex max-w-md border-b border-[#EDE7DC]/40 focus-within:border-[#EDE7DC]"
            >
              <label htmlFor="a-email" className="sr-only">Email address</label>
              <input id="a-email" name="email" type="email" placeholder="Email address" className="flex-1 bg-transparent py-3 outline-none placeholder:text-[#EDE7DC]/40 text-[15px]" />
              <button className="f-gmono text-[11px] uppercase tracking-wider px-2 hover:text-[#d9a0a0]">{state === "done" ? "Subscribed" : "Subscribe"}</button>
            </form>
            {state === "error" && <p className="mt-3 text-[13px] text-[#e6a3a3]">Enter a valid email address.</p>}
          </div>
          <div className="grid grid-cols-2 gap-8 text-[14px]">
            <div className="space-y-2 opacity-75">
              <p className="f-gmono text-[10px] uppercase tracking-wider opacity-60 mb-4">Maison</p>
              <p>42 Avenue Montaigne<br />75008 Paris</p>
              <p className="pt-2">Atelier: 124 Route de Pégomas<br />06130 Grasse</p>
            </div>
            <div className="flex flex-col gap-2 opacity-75">
              <p className="f-gmono text-[10px] uppercase tracking-wider opacity-60 mb-4">Client care</p>
              <a href="mailto:concierge@vespre.com" className="hover:opacity-100">concierge@vespre.com</a>
              <a href="#" className="hover:opacity-100">Shipping &amp; returns</a>
              <a href="#" className="hover:opacity-100">Book a consultation</a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 f-gmono text-[10px] uppercase tracking-wider opacity-50">
          <span>© 2026 Vespre Parfums</span>
          <span className="flex gap-6"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></span>
        </div>
      </div>
    </footer>
  );
}
