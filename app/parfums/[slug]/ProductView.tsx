"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, getProduct, flaconImage, formatPrice, fromPrice } from "../../data";
import { useStore } from "../../_components/store";
import { Crumbs } from "../../_components/Ornament";
import { Fade, RevealLines } from "../../_components/Reveal";
import { Magnetic } from "../../_components/Motion";
import { cleanInitials } from "../../_components/Engraving";

const Flacon = dynamic(() => import("../../_components/Flacon"), { ssr: false });
const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductView({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  const { add } = useStore();
  const [ml, setMl] = useState(p.sizes[0].ml);
  const [engrave, setEngrave] = useState(false);
  const [initials, setInitials] = useState("");
  const [added, setAdded] = useState(false);
  const size = p.sizes.find((s) => s.ml === ml)!;
  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const engraving = engrave && initials ? initials : undefined;
  const engraveError = engrave && !initials;

  const onAdd = () => {
    if (engraveError) return;
    add(p.slug, ml, engraving);
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <main>
      <section className="relative grid lg:grid-cols-[1.15fr_1fr]">
        {/* stage */}
        <div className="relative lg:sticky lg:top-0 h-[78svh] lg:h-[100svh] bg-noir overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_58%,rgba(184,149,90,0.17),transparent_70%)]" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-x-0 top-[14%] text-center display italic text-[38vw] lg:text-[22vw] leading-none text-ivory/[0.035] select-none pointer-events-none"
          >
            {p.no}
          </motion.span>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, ease }} className="absolute inset-0 pt-24 lg:pt-16">
            <Flacon hue={p.hue} shape={p.shape} engraving={engraving} className="w-full h-full" />
          </motion.div>
          <p className="absolute bottom-6 inset-x-0 text-center eyebrow !text-[9px] text-ivory/35 pointer-coarse:hidden">Move your cursor to turn the flacon</p>
        </div>

        {/* details */}
        <div className="px-6 md:px-14 pt-12 lg:pt-40 pb-24 border-l border-ivory/10">
          <Crumbs items={[["Les Parfums", "/parfums"], [p.name]]} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="eyebrow text-gilt mt-14">
            N° {p.no} · {p.family}
          </motion.p>
          <RevealLines as="h1" className="display text-[clamp(3.2rem,6vw,6rem)] leading-[0.95] mt-5" lines={[p.name]} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="display-text italic text-xl text-ivory/55 mt-2">
            {p.translation}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease }} className="mt-8 text-[15px] leading-[1.9] text-ivory/70 max-w-[46ch] pretty">
            {p.tagline} {p.story[0]}
          </motion.p>

          {/* purchase */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease }} className="mt-12 border-t border-ivory/10 pt-10">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow !text-[10px] text-ivory/50">{p.concentration} · {p.oil}% perfume oil</span>
              <AnimatePresence mode="wait">
                <motion.span key={size.price} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-4xl font-extralight tracking-wide tnum">
                  {formatPrice(size.price)}
                </motion.span>
              </AnimatePresence>
            </div>

            <fieldset className="mt-8">
              <legend className="eyebrow !text-[9px] text-ivory/45 mb-4">Contenance</legend>
              <div className="grid grid-cols-2 gap-3">
                {p.sizes.map((s) => (
                  <button
                    key={s.ml}
                    type="button"
                    role="radio"
                    aria-checked={ml === s.ml}
                    onClick={() => setMl(s.ml)}
                    className={`relative text-left px-5 py-4 border transition-colors ${ml === s.ml ? "border-gilt" : "border-ivory/15 hover:border-ivory/40"}`}
                  >
                    <span className="display text-2xl">{s.ml} ml</span>
                    <span className="block text-xs text-ivory/50 mt-1 tnum">{formatPrice(s.price)}</span>
                    {ml === s.ml && <motion.span layoutId="size-dot" className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-gilt" />}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 border border-ivory/15">
              <label className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer">
                <span>
                  <span className="display text-xl">Engrave the cap</span>
                  <span className="block text-xs text-ivory/50 mt-1">By hand in Paris · complimentary · adds two days</span>
                </span>
                <input type="checkbox" checked={engrave} onChange={(e) => setEngrave(e.target.checked)} className="sr-only peer" />
                <span aria-hidden className="relative w-11 h-6 rounded-full border border-ivory/30 peer-checked:bg-gilt peer-checked:border-gilt transition-colors after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:w-4 after:h-4 after:rounded-full after:bg-ivory after:transition-transform peer-checked:after:translate-x-[18px]" />
              </label>
              <AnimatePresence>
                {engrave && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <label htmlFor="initials" className="eyebrow !text-[9px] text-ivory/45">Initials, up to three</label>
                      <input
                        id="initials"
                        value={initials}
                        onChange={(e) => setInitials(cleanInitials(e.target.value).toUpperCase())}
                        maxLength={3}
                        placeholder="H M"
                        aria-invalid={engraveError}
                        className="mt-2 w-full bg-transparent border-b border-ivory/25 focus:border-gilt outline-none display italic text-4xl pb-2 tracking-[0.1em] placeholder:text-ivory/15"
                      />
                      <p className="mt-2 text-xs text-ivory/45">{engraveError ? <span className="text-[#e3a58f]">Enter your initials, or turn engraving off.</span> : "Watch the cap on the left."}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={onAdd} className="mt-8 w-full btn-gilt eyebrow py-5 relative overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={added ? "y" : "n"} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="block">
                  {added ? "Added to your bag" : `Add to bag — ${formatPrice(size.price)}`}
                </motion.span>
              </AnimatePresence>
            </button>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-ivory/60">
              <li>✦ Free insured delivery</li>
              <li>✦ Signature wrapping</li>
              <li>✦ Two samples of your choice</li>
              <li>✦ Returns within 30 days</li>
            </ul>
          </motion.div>

          {/* composition */}
          <Fade className="mt-24">
            <p className="eyebrow text-gilt">La Composition</p>
            <dl className="mt-8">
              {([["Tête", "First fifteen minutes", p.notes.top], ["Cœur", "The following hours", p.notes.heart], ["Fond", "Until morning", p.notes.base]] as const).map(([k, sub, notes]) => (
                <div key={k} className="grid grid-cols-[100px_1fr] gap-6 py-6 border-t border-ivory/10">
                  <dt>
                    <span className="display italic text-2xl text-gilt-soft">{k}</span>
                    <span className="block text-[11px] text-ivory/40 mt-1">{sub}</span>
                  </dt>
                  <dd className="display text-2xl md:text-3xl leading-snug">{notes.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Fade>

          <Fade className="mt-20">
            <p className="eyebrow text-gilt">Le Caractère</p>
            <dl className="mt-8 grid grid-cols-3 border-t border-ivory/10">
              {[["Concentration", `${p.oil}%`], ["On skin", `${p.longevity} hours`], ["Sillage", p.sillage]].map(([k, v]) => (
                <div key={k} className="pt-6 pr-4">
                  <dt className="eyebrow !text-[9px] text-ivory/45">{k}</dt>
                  <dd className="display text-2xl md:text-3xl mt-3 tnum">{v}</dd>
                </div>
              ))}
            </dl>
          </Fade>

          <Fade className="mt-20">
            <p className="eyebrow text-gilt">L&apos;Histoire</p>
            {p.story.map((para, i) => (
              <p key={i} className="mt-6 text-[15px] leading-[1.95] text-ivory/70 max-w-[50ch] pretty">{para}</p>
            ))}
            <p className="mt-10 font-[family-name:var(--font-script)] text-5xl text-gilt-soft -rotate-2">Hélène Marceau</p>
          </Fade>
        </div>
      </section>

      {/* also in the collection */}
      <section className="border-t border-ivory/10 px-6 md:px-10 py-28">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <h2 className="display text-4xl md:text-6xl">Also in <span className="italic text-gilt-soft">the collection</span></h2>
            <Link href="/parfums" className="eyebrow link-underline pb-1 hidden md:inline">All compositions</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {others.map((o, i) => (
              <Fade key={o.slug} delay={i * 0.1}>
                <Link href={`/parfums/${o.slug}`} data-cursor="View" className="group block">
                  <div className="arch aspect-[4/5] bg-noir-2 border border-ivory/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(184,149,90,0.15),transparent_65%)]" />
                    <img src={flaconImage(o)} alt={`${o.name} flacon`} className="absolute inset-0 m-auto w-[80%] h-[80%] object-contain group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <p className="display text-3xl mt-6 group-hover:italic">{o.name}</p>
                  <p className="text-sm text-ivory/50 mt-1 tnum">{o.concentration} · from {formatPrice(fromPrice(o))}</p>
                </Link>
              </Fade>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Magnetic>
              <Link href="/salon" className="eyebrow inline-block px-10 py-5 border border-ivory/25 hover:border-gilt transition-colors">Try it at the salon first</Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
