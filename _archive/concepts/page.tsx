import Link from "next/link";

const CONCEPTS = [
  {
    href: "/concepts/archive",
    code: "A",
    name: "Scent Archive",
    blurb: "Bone paper, oxblood ink, oversized serif. A catalogue of scents with a cursor-follow index and an hour-by-hour wear timeline.",
    bg: "#EDE7DC", fg: "#1D1A17", accent: "#6B1E1E",
    sections: ["Hero · specimen", "Index · hover preview", "Wear timeline", "Atelier plate", "Provenance ledger", "Journal", "Footer"],
    font: "f-instrument",
  },
  {
    href: "/concepts/dusk",
    code: "B",
    name: "Dusk",
    blurb: "The sky moves from gold to night as you scroll. Each scent is pinned to a minute of the evening, with a two-question finder.",
    bg: "linear-gradient(160deg,#F2C98A,#C0606A 45%,#3D2F66 75%,#0A0A14)", fg: "#FFF4E8", accent: "#F2C98A",
    sections: ["Hero · sunset", "Hours · products", "Manifesto · scroll reveal", "Ritual", "Find your hour · quiz", "Footer · night"],
    font: "f-cormorant italic",
  },
  {
    href: "/concepts/lab",
    code: "C",
    name: "Lab",
    blurb: "Off-white grid, condensed type that stretches under the cursor, data-sheet product pages and a full materials matrix.",
    bg: "#F2F1EE", fg: "#111111", accent: "#D9461F",
    sections: ["Hero · stretch type", "Formula sheet", "Product grid", "Process · counters", "Materials matrix", "Footer · giant type"],
    font: "f-archivo font-extrabold uppercase wdth-62",
  },
];

export default function ConceptsIndex() {
  return (
    <main className="f-geist min-h-screen bg-[#141414] text-[#EDEDED] px-5 md:px-10 py-16">
      <div className="max-w-[1400px] mx-auto">
        <p className="f-gmono text-[11px] uppercase tracking-[0.2em] opacity-60">Vespre · design review</p>
        <h1 className="f-instrument text-5xl md:text-7xl mt-4 tracking-tight">Three directions</h1>
        <p className="mt-4 max-w-[60ch] text-[15px] opacity-70">
          Every section carries a label (A1, B3, C2…) in its top-left corner. Pick the sections you like from any concept, e.g. &ldquo;A1 + B2 + C5&rdquo;, and they&apos;ll be combined into the final site.
        </p>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {CONCEPTS.map((c) => (
            <Link key={c.code} href={c.href} className="group block border border-white/10 hover:border-white/40 transition-colors">
              <div className="aspect-[4/3] p-6 flex flex-col justify-between" style={{ background: c.bg, color: c.fg }}>
                <span className="f-gmono text-[11px] uppercase tracking-wider opacity-70">Concept {c.code}</span>
                <span className={`${c.font} text-6xl leading-none group-hover:translate-x-1 transition-transform`}>{c.name}</span>
                <span className="h-1 w-16" style={{ background: c.accent }} />
              </div>
              <div className="p-6">
                <p className="text-[14px] opacity-75 leading-relaxed">{c.blurb}</p>
                <ol className="mt-5 space-y-1 f-gmono text-[11px] opacity-60">
                  {c.sections.map((s, i) => (
                    <li key={s}><span className="opacity-100 font-bold">{c.code}{i + 1}</span> · {s}</li>
                  ))}
                </ol>
                <span className="mt-6 inline-block text-[13px] underline underline-offset-4">Open concept →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
