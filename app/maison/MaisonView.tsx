"use client";

import Link from "next/link";
import { PHOTOS, MATERIALS } from "../data";
import { Masthead, Chapter } from "../_components/Ornament";
import { Fade, ParallaxImage, RevealLines } from "../_components/Reveal";
import { Magnetic, ScrollWords, Tilt } from "../_components/Motion";

const CALENDAR = [
  { m: "Jan", t: "Bergamot is pressed in Calabria" },
  { m: "Apr", t: "Iris rhizomes, lifted three years ago, are peeled and dried" },
  { m: "May", t: "Rose de Mai harvest, three weeks in Grasse" },
  { m: "Aug", t: "Jasmine picked at dawn until October" },
  { m: "Nov", t: "The year's batches enter maceration" },
];

const FIGURES = [
  ["12", "weeks of maceration at 4 °C"],
  ["< 4,000", "flacons finished each year"],
  ["240", "flacons in a single batch"],
  ["9", "hands touch every flacon"],
];

export default function MaisonView() {
  return (
    <main>
      <Masthead
        eyebrow="La Maison · Paris & Grasse"
        title="Slowness,"
        italic="by design."
        intro="Vespre was founded on one stubborn idea: that perfume deserves the same time and handwork as couture. Everything we make is composed in Grasse and finished in a small atelier behind Avenue Montaigne."
      />

      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <ParallaxImage src={PHOTOS.dropperHands(1800)} alt="A perfumer's hands measuring oil from an amber dropper bottle" className="lg:col-span-7 aspect-[4/3]" />
          <Fade className="lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="display italic text-3xl md:text-4xl leading-snug text-ivory/90">“A perfume should arrive before you do, and stay a little after you leave.”</p>
            <p className="font-[family-name:var(--font-script)] text-5xl text-gilt-soft mt-8 -rotate-2">Hélène Marceau</p>
            <p className="eyebrow !text-[9px] text-ivory/45 mt-2">Maître parfumeur</p>
          </Fade>
        </div>
      </section>

      <section className="bg-noir-2 border-y border-ivory/10 px-6 md:px-10 py-32 md:py-44">
        <div className="max-w-[1100px] mx-auto">
          <Chapter n="I" label="The atelier" className="mb-14" />
          <ScrollWords
            className="display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.25]"
            text="Nine people touch every flacon. One weighs the materials, one blends, one watches the maceration, one filters, one fills, one polishes the glass, one sets the gilded cap, one engraves it, and one wraps it for you."
          />
        </div>
      </section>

      <section className="px-6 md:px-10 py-32 md:py-44">
        <div className="max-w-[1500px] mx-auto">
          <Chapter n="II" label="In figures" className="mb-20" />
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10 border border-ivory/10">
            {FIGURES.map(([n, l], i) => (
              <Fade key={l} delay={i * 0.08} className="bg-noir p-8 md:p-12">
                <dt className="display gilt-text text-6xl md:text-7xl tnum">{n}</dt>
                <dd className="mt-6 text-sm text-ivory/60 max-w-[20ch]">{l}</dd>
              </Fade>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-32 md:pb-44">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <Chapter n="III" label="The year in Grasse" className="mb-12" />
            <RevealLines className="display text-[clamp(2.6rem,5vw,5rem)] leading-[1]" lines={["We follow", <span key="i" className="italic text-gilt-soft">the harvests.</span>]} />
            <ol className="mt-16">
              {CALENDAR.map((c, i) => (
                <Fade key={c.m} delay={i * 0.06}>
                  <li className="grid grid-cols-[80px_1fr] gap-6 py-6 border-t border-ivory/10">
                    <span className="display italic text-2xl text-gilt">{c.m}</span>
                    <span className="text-[15px] text-ivory/75">{c.t}</span>
                  </li>
                </Fade>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-6 content-start lg:pt-24">
            {MATERIALS.map((m, i) => (
              <Fade key={m.name} delay={i * 0.1} className={i % 2 ? "mt-16" : ""}>
                <Tilt>
                  <ParallaxImage src={m.photo(800)} alt={m.name} className="arch aspect-[3/4.2]" strength={8} />
                </Tilt>
                <p className="display text-2xl mt-5">{m.name}</p>
                <p className="eyebrow !text-[9px] text-gilt mt-2">{m.origin}</p>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-ivory/10 px-6 md:px-10 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,rgba(184,149,90,0.15),transparent_70%)]" />
        <div className="relative">
          <Chapter n="IV" label="Our commitments" className="justify-center mb-12" />
          <p className="display text-3xl md:text-5xl max-w-[26ch] mx-auto leading-[1.15]">
            We pay growers before the harvest. We never use wild oud or animal ambergris. Our flacons are refillable at the salon, for life.
          </p>
          <Magnetic className="mt-14">
            <Link href="/salon" className="btn-gilt eyebrow inline-block px-10 py-5">Visit the atelier</Link>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}
