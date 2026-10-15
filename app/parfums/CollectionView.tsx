"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, flaconImage, formatPrice, fromPrice } from "../data";
import { Masthead } from "../_components/Ornament";
import { Magnetic, Tilt } from "../_components/Motion";

const ease = [0.22, 1, 0.36, 1] as const;
const FILTERS = [
  { id: "all", label: "All compositions" },
  { id: "Extrait de Parfum", label: "Extraits" },
  { id: "Eau de Parfum", label: "Eaux de Parfum" },
] as const;

export default function CollectionView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const list = PRODUCTS.filter((p) => filter === "all" || p.concentration === filter);

  return (
    <main>
      <Masthead
        eyebrow="La Collection · N° VI"
        title="Les"
        italic="Parfums"
        intro="Six compositions, each macerated for twelve weeks and finished by hand. Extraits carry more perfume oil and sit closer to the skin for longer; eaux de parfum open brighter and travel further."
      />

      <div className="sticky top-0 z-30 bg-noir/80 backdrop-blur-md border-y border-ivory/10">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
          <div className="flex gap-6 md:gap-10" role="tablist" aria-label="Filter by concentration">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`eyebrow !text-[10px] relative pb-1 transition-colors ${filter === f.id ? "text-ivory" : "text-ivory/40 hover:text-ivory/70"}`}
              >
                {f.label}
                {filter === f.id && <motion.span layoutId="filter-line" className="absolute left-0 right-0 -bottom-0.5 h-px bg-gilt" />}
              </button>
            ))}
          </div>
          <span className="eyebrow !text-[9px] text-ivory/40 tnum hidden sm:inline">{list.length} compositions</span>
        </div>
      </div>

      <section className="max-w-[1500px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.ul layout className="grid md:grid-cols-2 gap-x-10 gap-y-24 md:gap-y-32">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 1, delay: i * 0.06, ease }}
                className={i % 2 === 1 ? "md:mt-40" : ""}
              >
                <Link href={`/parfums/${p.slug}`} data-cursor="View" className="group block">
                  <Tilt max={5}>
                    <div className="relative arch aspect-[4/5] overflow-hidden bg-noir-2 border border-ivory/5">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(184,149,90,0.18),transparent_65%)] opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                      <span className="absolute top-[18%] inset-x-0 text-center display italic text-[9rem] md:text-[12rem] leading-none text-ivory/[0.04] select-none">{p.no}</span>
                      <img
                        src={flaconImage(p)}
                        alt={`${p.name} flacon`}
                        className="absolute inset-0 m-auto w-[78%] h-[78%] object-contain translate-y-[4%] group-hover:scale-[1.04] group-hover:-translate-y-[1%] transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                    </div>
                  </Tilt>
                  <div className="mt-8 grid grid-cols-[1fr_auto] gap-6 items-start">
                    <div>
                      <p className="eyebrow !text-[9px] text-gilt">N° {p.no} · {p.family}</p>
                      <h2 className="display text-4xl md:text-5xl mt-3 group-hover:italic transition-all duration-500">{p.name}</h2>
                      <p className="display-text italic text-ivory/50 mt-1">{p.translation}</p>
                    </div>
                    <div className="text-right">
                      <p className="eyebrow !text-[9px] text-ivory/45">{p.concentration}</p>
                      <p className="text-sm mt-3 tnum">from {formatPrice(fromPrice(p))}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-ivory/55 max-w-[46ch]">{[...p.notes.top, ...p.notes.heart, ...p.notes.base].join(" · ")}</p>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>

      <section className="border-t border-ivory/10 px-6 md:px-10 py-28 text-center">
        <p className="eyebrow text-gilt">Not sure where to begin?</p>
        <p className="display text-4xl md:text-6xl mt-6 max-w-[20ch] mx-auto leading-[1.05]">Try them on skin, <span className="italic text-gilt-soft">not on paper.</span></p>
        <p className="mt-6 text-sm text-ivory/60 max-w-[48ch] mx-auto">Every order includes two 2 ml samples of your choice. Or spend an hour at the salon on Avenue Montaigne, with a perfumer to guide you.</p>
        <Magnetic className="mt-10">
          <Link href="/salon" className="btn-gilt eyebrow inline-block px-10 py-5">Book a consultation</Link>
        </Magnetic>
      </section>
    </main>
  );
}
