"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { PRODUCTS, PHOTOS, flaconImage, formatPrice, getProduct, fromPrice } from "../data";
import { useStore } from "./store";
import Monogram from "./Monogram";
import { Cursor, Intro, SmoothScroll } from "./Experience";

const ease = [0.22, 1, 0.36, 1] as const;

const NAV = [
  { href: "/parfums", label: "Les Parfums", sub: "The collection" },
  { href: "/maison", label: "La Maison", sub: "Savoir-faire" },
  { href: "/salon", label: "Le Salon", sub: "Appointments & bespoke" },
  { href: "/service-client", label: "Service Client", sub: "Delivery, returns, care" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/render");
  const { setBagOpen, setMenuOpen, setSearchOpen, menuOpen, bagOpen, searchOpen } = useStore();

  // Close overlays on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setBagOpen(false);
  }, [pathname, setMenuOpen, setSearchOpen, setBagOpen]);

  // Esc closes whatever is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
      setBagOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen, setSearchOpen, setBagOpen]);

  // Freeze page scroll under overlays.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    const locked = menuOpen || bagOpen || searchOpen;
    if (locked) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, [menuOpen, bagOpen, searchOpen]);

  if (bare) return <>{children}</>;

  return (
    <div className="grain">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] bg-ivory text-noir px-4 py-2">Skip to content</a>
      <SmoothScroll />
      <Cursor />
      <Intro />
      <Header />
      <Menu />
      <Search />
      <Bag />
      <div id="main">{children}</div>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ Header */

function Header() {
  const { count, setBagOpen, setMenuOpen, setSearchOpen } = useStore();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setScrolled(y > 40);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 inset-x-0 z-50 text-white mix-blend-difference"
    >
      <div className={`grid grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10 transition-[height] duration-700 ${scrolled ? "h-16" : "h-24"}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => setMenuOpen(true)} className="group flex items-center gap-3 eyebrow" aria-label="Open menu">
            <span className="flex flex-col gap-[5px] w-6">
              <span className="h-px bg-current w-full transition-all duration-500 group-hover:w-1/2" />
              <span className="h-px bg-current w-2/3 transition-all duration-500 group-hover:w-full" />
            </span>
            <span className="hidden md:inline">Menu</span>
          </button>
          <Link href="/parfums" className="hidden lg:inline eyebrow link-underline pb-1">Les Parfums</Link>
        </div>

        <Link href="/" aria-label="Vespre, home" className="flex flex-col items-center">
          <span className="display-text text-[22px] md:text-[26px] tracking-[0.42em] pl-[0.42em] leading-none">VESPRE</span>
          <span className={`eyebrow !text-[8px] !tracking-[0.5em] mt-2 transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-70"}`}>Paris</span>
        </Link>

        <div className="flex items-center justify-end gap-6 md:gap-8">
          <button onClick={() => setSearchOpen(true)} className="eyebrow link-underline pb-1 hidden md:inline">Search</button>
          <Link href="/salon" className="eyebrow link-underline pb-1 hidden lg:inline">Book the salon</Link>
          <button onClick={() => setBagOpen(true)} className="eyebrow link-underline pb-1" aria-label={`Open bag, ${count} items`}>
            Bag <span className="tnum">({count})</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ Menu */

function Menu() {
  const { menuOpen, setMenuOpen, setSearchOpen } = useStore();
  const [hover, setHover] = useState(0);
  const images = [PHOTOS.copperSmoke(1200), PHOTOS.amberDropper(1200), PHOTOS.dropperHands(1200), PHOTOS.iris(1200)];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] bg-noir text-ivory grid lg:grid-cols-[1.3fr_1fr]"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex flex-col px-6 md:px-16 pt-8 pb-10">
            <div className="flex justify-between items-center">
              <button onClick={() => setMenuOpen(false)} className="eyebrow link-underline pb-1">Close</button>
              <Monogram className="w-10 h-10 text-gilt" />
            </div>
            <nav className="my-auto py-12">
              <ul className="space-y-2 md:space-y-4">
                {NAV.map((n, i) => (
                  <li key={n.href} className="overflow-hidden">
                    <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.35 + i * 0.07, duration: 1, ease }}>
                      <Link href={n.href} onMouseEnter={() => setHover(i)} className="group flex items-baseline gap-5">
                        <span className="eyebrow text-gilt w-8 tnum">0{i + 1}</span>
                        <span className="display text-[13vw] md:text-[5.5vw] leading-[1.02] group-hover:italic transition-all duration-500 group-hover:translate-x-3">{n.label}</span>
                        <span className="hidden md:inline eyebrow text-smoke opacity-0 group-hover:opacity-100 transition-opacity duration-500">{n.sub}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-x-10 gap-y-3 eyebrow text-smoke">
              <button onClick={() => { setMenuOpen(false); setSearchOpen(true); }} className="link-underline pb-1 text-ivory">Search the collection</button>
              <a href="mailto:concierge@vespre.com" className="link-underline pb-1">concierge@vespre.com</a>
              <a href="tel:+33140506070" className="link-underline pb-1">+33 1 40 50 60 70</a>
            </motion.div>
          </div>
          <div className="relative hidden lg:block overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={hover}
                src={images[hover]}
                alt=""
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/20 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ Search */

function Search() {
  const { searchOpen } = useStore();
  return <AnimatePresence>{searchOpen && <SearchPanel key="search" />}</AnimatePresence>;
}

function SearchPanel() {
  const { setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      [p.name, p.translation, p.family, ...p.notes.top, ...p.notes.heart, ...p.notes.base].some((t) => t.toLowerCase().includes(s))
    );
  }, [q]);

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] bg-noir/95 backdrop-blur-xl text-ivory overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          data-lenis-prevent
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
            <div className="flex justify-between">
              <span className="eyebrow text-gilt">Search the collection</span>
              <button onClick={() => setSearchOpen(false)} className="eyebrow link-underline pb-1">Close</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (results[0]) router.push(`/parfums/${results[0].slug}`);
              }}
            >
              <label htmlFor="search" className="sr-only">Search by name, note or family</label>
              <input
                id="search"
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Iris, oud, Heure d'Ambre…"
                className="mt-14 w-full bg-transparent border-b border-ivory/20 focus:border-gilt pb-5 display text-5xl md:text-7xl outline-none placeholder:text-ivory/20 transition-colors"
              />
            </form>
            <p className="mt-6 eyebrow text-smoke">{results.length ? `${results.length} ${results.length === 1 ? "fragrance" : "fragrances"}` : "Nothing matches that note. Try “amber” or “iris”."}</p>
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10">
              {results.map((p) => {
                const match = q.trim() ? [...p.notes.top, ...p.notes.heart, ...p.notes.base].find((n) => n.toLowerCase().includes(q.trim().toLowerCase())) : null;
                return (
                  <li key={p.slug} className="bg-noir">
                    <Link href={`/parfums/${p.slug}`} className="group flex items-center gap-5 p-5 hover:bg-noir-2 transition-colors">
                      <img src={flaconImage(p)} alt="" className="w-16 h-20 object-contain group-hover:scale-105 transition-transform duration-700" />
                      <div>
                        <p className="display text-2xl group-hover:italic">{p.name}</p>
                        <p className="eyebrow !text-[9px] text-smoke mt-2">{match ? `Contains ${match}` : p.family}</p>
                        <p className="text-sm mt-1 text-ivory/70 tnum">From {formatPrice(fromPrice(p))}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
  );
}

/* ------------------------------------------------------------------ Bag */

function Bag() {
  const { bagOpen, setBagOpen, lines, subtotal, setQty, remove, count } = useStore();
  return (
    <AnimatePresence>
      {bagOpen && (
        <>
          <motion.div key="veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBagOpen(false)} className="fixed inset-0 z-[70] bg-noir/60 backdrop-blur-sm" />
          <motion.aside
            key="bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[71] w-full sm:w-[480px] bg-noir-2 text-ivory flex flex-col border-l border-ivory/10"
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-8 h-24 border-b border-ivory/10">
              <h2 className="display text-3xl">Your bag <span className="text-smoke text-xl tnum">({count})</span></h2>
              <button onClick={() => setBagOpen(false)} className="eyebrow link-underline pb-1">Close</button>
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
                <Monogram className="w-16 h-16 text-gilt" />
                <p className="display text-3xl mt-8">Your bag is empty</p>
                <p className="text-sm text-ivory/60 mt-3 max-w-[30ch]">Every flacon can be engraved with your initials at no charge.</p>
                <Link href="/parfums" className="mt-10 btn-gilt eyebrow px-8 py-4">Discover the collection</Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-8 divide-y divide-ivory/10">
                  {lines.map((l) => {
                    const p = getProduct(l.slug)!;
                    return (
                      <li key={l.key} className="py-7 grid grid-cols-[88px_1fr] gap-5">
                        <div className="bg-noir aspect-[4/5] flex items-center justify-center">
                          <img src={flaconImage(p)} alt={`${p.name} flacon`} className="w-[85%] h-[85%] object-contain" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex justify-between gap-4">
                            <Link href={`/parfums/${p.slug}`} className="display text-2xl leading-tight hover:italic">{p.name}</Link>
                            <span className="tnum text-sm">{formatPrice(l.price * l.qty)}</span>
                          </div>
                          <p className="eyebrow !text-[9px] text-ivory/50 mt-2">{p.concentration} · {l.ml} ml</p>
                          {l.engraving && <p className="text-xs mt-2 text-ivory/70">Engraved <span className="display italic text-base text-gilt">{l.engraving}</span></p>}
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex items-center border border-ivory/20">
                              <button onClick={() => setQty(l.key, l.qty - 1)} className="w-9 h-9 hover:bg-ivory/5" aria-label="Decrease quantity">−</button>
                              <span className="w-8 text-center text-sm tnum">{l.qty}</span>
                              <button onClick={() => setQty(l.key, l.qty + 1)} className="w-9 h-9 hover:bg-ivory/5" aria-label="Increase quantity">+</button>
                            </div>
                            <button onClick={() => remove(l.key)} className="eyebrow !text-[9px] text-ivory/50 link-underline pb-0.5">Remove</button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="px-8 py-7 border-t border-ivory/10 bg-noir-3/60">
                  <ul className="space-y-1.5 text-[13px] text-ivory/70 mb-6">
                    <li>✦ Complimentary signature wrapping</li>
                    <li>✦ Two discovery samples of your choice</li>
                    <li>✦ Free insured delivery across Europe</li>
                  </ul>
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="eyebrow">Subtotal</span>
                    <span className="text-3xl font-extralight tracking-wide tnum">{formatPrice(subtotal)}</span>
                  </div>
                  <Link href="/checkout" className="block text-center btn-gilt eyebrow py-5">Proceed to checkout</Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ Footer */

function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  return (
    <footer className="relative bg-noir text-ivory border-t border-ivory/10 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 pt-28 pb-10">
        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-14 lg:gap-10">
          <div>
            <Monogram className="w-14 h-14 text-gilt" />
            <p className="display text-4xl md:text-5xl mt-10 leading-[1.05] max-w-[14ch]">La Correspondance</p>
            <p className="text-sm text-ivory/60 mt-4 max-w-[38ch] pretty">A letter from the atelier each season: new compositions, private salon evenings, the harvest in Grasse.</p>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
              }}
              className="mt-8 flex items-end gap-4 max-w-md border-b border-ivory/25 focus-within:border-gilt transition-colors"
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                placeholder="Your email address"
                className="flex-1 bg-transparent py-3 outline-none text-[15px] placeholder:text-ivory/35"
              />
              <button className="eyebrow pb-3 text-gilt-soft hover:text-ivory transition-colors">{state === "done" ? "Thank you" : "Subscribe"}</button>
            </form>
            <p className="mt-3 text-xs h-4" aria-live="polite">
              {state === "error" && <span className="text-[#e3a58f]">Please enter a valid email address.</span>}
              {state === "done" && <span className="text-gilt-soft">You&apos;ll receive the next letter in the spring.</span>}
            </p>
          </div>

          <FooterCol title="La Maison" links={[["Les Parfums", "/parfums"], ["Savoir-faire", "/maison"], ["Le Salon privé", "/salon"], ["Bespoke perfume", "/salon#bespoke"]]} />
          <FooterCol title="Service Client" links={[["Delivery", "/service-client#delivery"], ["Returns", "/service-client#returns"], ["Engraving & gifting", "/service-client#engraving"], ["Contact the concierge", "/service-client#contact"]]} />
          <div className="space-y-6 text-sm text-ivory/65">
            <p className="eyebrow text-gilt">Salons</p>
            <p><span className="text-ivory">Paris</span><br />42 Avenue Montaigne<br />75008 Paris</p>
            <p><span className="text-ivory">Grasse</span><br />124 Route de Pégomas<br />06130 Grasse</p>
            <p><a href="tel:+33140506070" className="link-underline">+33 1 40 50 60 70</a><br /><a href="mailto:concierge@vespre.com" className="link-underline">concierge@vespre.com</a></p>
          </div>
        </div>

        <div className="mt-28 flex flex-col md:flex-row justify-between gap-5 eyebrow !text-[9px] text-ivory/45">
          <span>© {new Date().getFullYear()} Vespre Parfums SAS · Paris</span>
          <span className="flex flex-wrap gap-8">
            <Link href="/legal/privacy" className="link-underline">Privacy</Link>
            <Link href="/legal/terms" className="link-underline">Terms of sale</Link>
            <Link href="/legal/cookies" className="link-underline">Cookies</Link>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a>
          </span>
        </div>
      </div>
      <p aria-hidden className="display gilt-text gilt-shimmer text-center text-[24vw] leading-[0.75] tracking-[0.04em] -mb-[3vw] select-none pointer-events-none">VESPRE</p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="eyebrow text-gilt mb-6">{title}</p>
      <ul className="space-y-3 text-sm text-ivory/70">
        {links.map(([l, h]) => (
          <li key={h}><Link href={h} className="link-underline hover:text-ivory transition-colors">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
