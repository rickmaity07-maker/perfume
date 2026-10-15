import Link from "next/link";

/** "IV ——— Savoir-faire" chapter marker used across the site. */
export function Chapter({ n, label, className = "" }: { n?: string; label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {n && <span className="eyebrow text-gilt">{n}</span>}
      <span className="h-px w-16 bg-gilt" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function Crumbs({ items }: { items: [string, string?][] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow !text-[9px] text-ivory/45 flex flex-wrap gap-3">
      {items.map(([label, href], i) => (
        <span key={label} className="flex gap-3">
          {href ? <Link href={href} className="link-underline hover:text-ivory">{label}</Link> : <span className="text-ivory/80">{label}</span>}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </span>
      ))}
    </nav>
  );
}

/** Page masthead for inner pages. */
export function Masthead({ eyebrow, title, italic, intro }: { eyebrow: string; title: string; italic?: string; intro?: string }) {
  return (
    <header className="relative px-6 md:px-10 pt-44 md:pt-52 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(184,149,90,0.13),transparent_70%)]" />
      <div className="relative max-w-[1500px] mx-auto">
        <p className="eyebrow text-gilt">{eyebrow}</p>
        <h1 className="display text-[clamp(3.4rem,10vw,10rem)] mt-6 leading-[0.9]">
          {title} {italic && <span className="italic text-gilt-soft">{italic}</span>}
        </h1>
        {intro && <p className="mt-10 max-w-[52ch] text-[15px] leading-[1.9] text-ivory/65 pretty">{intro}</p>}
      </div>
    </header>
  );
}
