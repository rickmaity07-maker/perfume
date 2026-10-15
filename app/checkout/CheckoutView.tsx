"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, flaconImage, formatPrice, getProduct } from "../data";
import { useStore, type BagLine } from "../_components/store";
import { Field, inputClass, isEmail } from "../_components/Field";
import Monogram from "../_components/Monogram";

const ease = [0.22, 1, 0.36, 1] as const;

const COUNTRIES = [
  { code: "FR", name: "France", zone: "eu" },
  { code: "BE", name: "Belgium", zone: "eu" },
  { code: "DE", name: "Germany", zone: "eu" },
  { code: "IT", name: "Italy", zone: "eu" },
  { code: "ES", name: "Spain", zone: "eu" },
  { code: "NL", name: "Netherlands", zone: "eu" },
  { code: "CH", name: "Switzerland", zone: "intl" },
  { code: "GB", name: "United Kingdom", zone: "intl" },
  { code: "US", name: "United States", zone: "intl" },
] as const;

type Form = { email: string; first: string; last: string; address: string; postcode: string; city: string; country: string; phone: string; gift: boolean; card: string };

export default function CheckoutView() {
  const { lines, subtotal, clear, ready } = useStore();
  const [f, setF] = useState<Form>({ email: "", first: "", last: "", address: "", postcode: "", city: "", country: "FR", phone: "", gift: false, card: "" });
  const [samples, setSamples] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Form | "samples", string>>>({});
  const [placed, setPlaced] = useState<{ ref: string; lines: BagLine[]; total: number; email: string } | null>(null);

  const country = COUNTRIES.find((c) => c.code === f.country)!;
  const sameDay = f.country === "FR" && f.city.trim().toLowerCase() === "paris";
  const shipping = country.zone === "intl" ? 35 : 0;
  const total = subtotal + shipping;
  const engraved = lines.some((l) => l.engraving);
  const eta = useMemo(() => {
    if (sameDay) return "Today by courier, if ordered before 13:00";
    const days = (country.zone === "intl" ? 6 : 3) + (engraved ? 2 : 0);
    const d = new Date();
    d.setDate(d.getDate() + days);
    return `By ${d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`;
  }, [sameDay, country.zone, engraved]);

  const set = (k: keyof Form) => (v: string | boolean) => {
    setF((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggleSample = (slug: string) => {
    setErrors((e) => ({ ...e, samples: undefined }));
    setSamples((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length < 2 ? [...s, slug] : s));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!isEmail(f.email)) e.email = "Please enter a valid email address.";
    if (!f.first.trim()) e.first = "Required.";
    if (!f.last.trim()) e.last = "Required.";
    if (f.address.trim().length < 5) e.address = "Please enter your street address.";
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(f.postcode.trim())) e.postcode = "Please check the postcode.";
    if (!f.city.trim()) e.city = "Required.";
    if (f.phone.replace(/\D/g, "").length < 8) e.phone = "We need a number for the courier.";
    if (f.gift && f.card.length > 240) e.card = "Please keep the card under 240 characters.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    const ref = `VS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setPlaced({ ref, lines, total, email: f.email });
    clear();
    window.scrollTo({ top: 0 });
  };

  if (!ready) return <main className="min-h-[100svh]" />;

  if (placed) {
    return (
      <main className="min-h-[100svh] px-6 md:px-10 pt-44 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }} className="max-w-2xl mx-auto text-center">
          <Monogram draw className="w-24 h-24 mx-auto text-gilt" />
          <p className="eyebrow text-gilt mt-12 tnum">Order {placed.ref}</p>
          <h1 className="display text-5xl md:text-7xl mt-6">Merci.</h1>
          <p className="mt-8 text-[15px] leading-[1.9] text-ivory/70 max-w-[46ch] mx-auto">
            Your flacons are reserved. Our concierge will email a secure payment link to {placed.email} within the hour; once it&apos;s settled, your order goes to the atelier for wrapping{placed.lines.some((l) => l.engraving) ? " and engraving" : ""}.
          </p>
          <ul className="mt-12 text-left divide-y divide-ivory/10 border-y border-ivory/10">
            {placed.lines.map((l) => {
              const p = getProduct(l.slug)!;
              return (
                <li key={l.key} className="flex justify-between py-4 text-sm">
                  <span>{p.name} · {l.ml} ml{l.engraving ? ` · engraved ${l.engraving}` : ""} × {l.qty}</span>
                  <span className="tnum">{formatPrice(l.price * l.qty)}</span>
                </li>
              );
            })}
            <li className="flex justify-between py-4"><span className="eyebrow">Total</span><span className="text-2xl font-extralight tracking-wide tnum">{formatPrice(placed.total)}</span></li>
          </ul>
          <Link href="/parfums" className="inline-block mt-14 eyebrow link-underline pb-1">Return to the collection</Link>
        </motion.div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-24">
        <Monogram className="w-16 h-16 text-gilt" />
        <h1 className="display text-5xl mt-10">Your bag is empty</h1>
        <p className="text-sm text-ivory/60 mt-4">Choose a composition to begin.</p>
        <Link href="/parfums" className="mt-10 btn-gilt eyebrow px-10 py-5">Discover the collection</Link>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-10 pt-36 md:pt-44 pb-32">
      <div className="max-w-[1400px] mx-auto">
        <p className="eyebrow text-gilt">Checkout</p>
        <h1 className="display text-5xl md:text-7xl mt-4">Almost <span className="italic text-gilt-soft">yours.</span></h1>

        <div className="mt-16 grid lg:grid-cols-[1.25fr_1fr] gap-16 lg:gap-24 items-start">
          <form noValidate onSubmit={submit} className="space-y-14">
            <fieldset>
              <legend className="eyebrow text-gilt mb-6">I · Contact</legend>
              <Field id="co-email" label="Email" error={errors.email}>
                <input id="co-email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email")(e.target.value)} aria-invalid={!!errors.email} aria-describedby="co-email-err" className={inputClass} />
              </Field>
            </fieldset>

            <fieldset>
              <legend className="eyebrow text-gilt mb-6">II · Delivery</legend>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                <Field id="co-first" label="First name" error={errors.first}>
                  <input id="co-first" autoComplete="given-name" value={f.first} onChange={(e) => set("first")(e.target.value)} aria-invalid={!!errors.first} className={inputClass} />
                </Field>
                <Field id="co-last" label="Last name" error={errors.last}>
                  <input id="co-last" autoComplete="family-name" value={f.last} onChange={(e) => set("last")(e.target.value)} aria-invalid={!!errors.last} className={inputClass} />
                </Field>
                <Field id="co-address" label="Address" error={errors.address} className="sm:col-span-2">
                  <input id="co-address" autoComplete="street-address" value={f.address} onChange={(e) => set("address")(e.target.value)} aria-invalid={!!errors.address} className={inputClass} />
                </Field>
                <Field id="co-postcode" label="Postcode" error={errors.postcode}>
                  <input id="co-postcode" autoComplete="postal-code" value={f.postcode} onChange={(e) => set("postcode")(e.target.value)} aria-invalid={!!errors.postcode} className={inputClass} />
                </Field>
                <Field id="co-city" label="City" error={errors.city}>
                  <input id="co-city" autoComplete="address-level2" value={f.city} onChange={(e) => set("city")(e.target.value)} aria-invalid={!!errors.city} className={inputClass} />
                </Field>
                <Field id="co-country" label="Country">
                  <select id="co-country" autoComplete="country" value={f.country} onChange={(e) => set("country")(e.target.value)} className={`${inputClass} [color-scheme:dark]`}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code} className="bg-noir">{c.name}</option>)}
                  </select>
                </Field>
                <Field id="co-phone" label="Telephone" error={errors.phone}>
                  <input id="co-phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone")(e.target.value)} aria-invalid={!!errors.phone} className={inputClass} />
                </Field>
              </div>
              <div className="mt-6 flex items-center justify-between gap-6 px-5 py-4 border border-gilt/40 bg-gilt/5">
                <div>
                  <p className="display text-xl">{sameDay ? "Paris courier" : country.zone === "intl" ? "International insured" : "Insured delivery"}</p>
                  <p className="text-xs text-ivory/55 mt-1">{eta}</p>
                </div>
                <span className="text-sm tnum">{shipping ? formatPrice(shipping) : "Complimentary"}</span>
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow text-gilt mb-2">III · Your two samples</legend>
              <p className="text-xs text-ivory/50 mb-6">Choose two 2 ml vials to discover at home ({samples.length}/2).</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRODUCTS.map((p) => {
                  const on = samples.includes(p.slug);
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleSample(p.slug)}
                      disabled={!on && samples.length >= 2}
                      className={`text-left px-4 py-3 border transition-colors disabled:opacity-35 ${on ? "border-gilt bg-gilt/5" : "border-ivory/15 hover:border-ivory/40"}`}
                    >
                      <span className="display text-lg">{p.name}</span>
                      <span className="block text-[11px] text-ivory/45">{p.family}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow text-gilt mb-6">IV · Gifting</legend>
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" checked={f.gift} onChange={(e) => set("gift")(e.target.checked)} className="w-4 h-4 accent-[#b8955a]" />
                <span className="text-[15px]">This is a gift: hide prices and add a handwritten card</span>
              </label>
              <AnimatePresence>
                {f.gift && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <Field id="co-card" label={`Your card (${f.card.length}/240)`} error={errors.card} className="mt-6">
                      <textarea id="co-card" rows={3} value={f.card} onChange={(e) => set("card")(e.target.value)} className={`${inputClass} resize-none display italic text-xl`} placeholder="Written by hand in Paris…" />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>
            </fieldset>

            <div>
              <button type="submit" className="w-full btn-gilt eyebrow py-5">Reserve my order — {formatPrice(total)}</button>
              <p className="mt-4 text-xs text-ivory/45 text-center max-w-[52ch] mx-auto">
                Nothing is charged now. Our concierge confirms stock and emails you a secure payment link within the hour.
              </p>
            </div>
          </form>

          <aside className="lg:sticky lg:top-28 border border-ivory/10 bg-noir-2 p-8">
            <p className="eyebrow text-gilt">Your order</p>
            <ul className="mt-6 divide-y divide-ivory/10">
              {lines.map((l) => {
                const p = getProduct(l.slug)!;
                return (
                  <li key={l.key} className="py-5 grid grid-cols-[64px_1fr_auto] gap-4 items-center">
                    <div className="bg-noir aspect-[4/5] flex items-center justify-center">
                      <img src={flaconImage(p)} alt="" className="w-[85%] h-[85%] object-contain" />
                    </div>
                    <div>
                      <p className="display text-xl">{p.name}</p>
                      <p className="text-[11px] text-ivory/50 mt-1">{l.ml} ml{l.engraving ? ` · engraved ${l.engraving}` : ""} · × {l.qty}</p>
                    </div>
                    <span className="text-sm tnum">{formatPrice(l.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-4 space-y-3 text-sm border-t border-ivory/10 pt-6">
              <div className="flex justify-between"><dt className="text-ivory/60">Subtotal</dt><dd className="tnum">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ivory/60">Delivery</dt><dd className="tnum">{shipping ? formatPrice(shipping) : "Complimentary"}</dd></div>
              <div className="flex justify-between"><dt className="text-ivory/60">Wrapping & samples</dt><dd>Complimentary</dd></div>
              <div className="flex justify-between items-baseline pt-4 border-t border-ivory/10"><dt className="eyebrow">Total</dt><dd className="text-3xl font-extralight tracking-wide tnum">{formatPrice(total)}</dd></div>
            </dl>
            <p className="mt-4 text-[11px] text-ivory/40">Prices include VAT{country.zone === "intl" ? " and import duties" : ""}.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
