"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PHOTOS, SALONS, SERVICES } from "../data";
import { Chapter, Masthead } from "../_components/Ornament";
import { Fade, ParallaxImage, RevealLines } from "../_components/Reveal";
import { Field, inputClass, isEmail } from "../_components/Field";
import Monogram from "../_components/Monogram";

const ease = [0.22, 1, 0.36, 1] as const;
const SLOTS = ["11:00", "12:30", "14:00", "15:30", "17:00", "18:00"];

const BESPOKE = [
  { n: "I", t: "Conversation", d: "Two long sittings with Hélène Marceau, in Paris or Grasse. We talk about places, people and materials, not about perfume." },
  { n: "II", t: "Composition", d: "Three to five trials over four months, each worn for a week. You keep every vial." },
  { n: "III", t: "Your flacon", d: "A hand-cut crystal flacon with your name engraved on the base. The formula is yours alone, and we keep it on file for refills." },
];

type Form = { service: string; salon: string; date: string; slot: string; name: string; email: string; phone: string; notes: string };

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function SalonView() {
  const [f, setF] = useState<Form>({ service: "consultation", salon: "paris", date: "", slot: "", name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState<string | null>(null);
  const min = useMemo(() => tomorrow(), []);
  const set = (k: keyof Form) => (v: string) => {
    setF((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = "Please tell us your name.";
    if (!isEmail(f.email)) e.email = "Please enter a valid email address.";
    if (!f.date) e.date = "Choose a date.";
    else if (f.date < min) e.date = "Appointments start from tomorrow.";
    else if (f.salon === "paris" && [0, 1].includes(new Date(f.date + "T12:00").getDay())) e.date = "The Paris salon is closed on Sundays and Mondays.";
    if (!f.slot) e.slot = "Choose a time.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0])?.focus();
      return;
    }
    setDone(`VS-${f.date.replaceAll("-", "").slice(2)}-${f.slot.replace(":", "")}`);
  };

  const salon = SALONS.find((s) => s.id === f.salon)!;
  const service = SERVICES.find((s) => s.id === f.service)!;

  return (
    <main>
      <Masthead
        eyebrow="Le Salon privé · Sur rendez-vous"
        title="An hour,"
        italic="entirely yours."
        intro="Our salons receive one guest at a time. A perfumer will introduce the collection on your skin, explain how each composition changes through the day, and help you choose without hurry."
      />

      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-28 self-start">
            <ParallaxImage src={PHOTOS.jasmine(1400)} alt="Jasmine flowers on a dark leafy branch" className="arch aspect-[4/5]" />
            <div className="mt-10 grid sm:grid-cols-2 gap-8 text-sm text-ivory/65">
              {SALONS.map((s) => (
                <div key={s.id}>
                  <p className="display text-2xl text-ivory">{s.name}</p>
                  <p className="mt-2">{s.address}</p>
                  <p className="mt-1 text-ivory/45">{s.hours}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="border border-gilt/40 p-10 md:p-16 text-center">
                  <Monogram draw className="w-20 h-20 mx-auto text-gilt" />
                  <p className="display text-4xl md:text-5xl mt-10">Merci, {f.name.split(" ")[0]}.</p>
                  <p className="mt-6 text-[15px] leading-[1.9] text-ivory/70 max-w-[42ch] mx-auto">
                    Your request for a {service.name.toLowerCase()} at {salon.name} on{" "}
                    {new Date(f.date + "T12:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} at {f.slot} is with our concierge. We&apos;ll confirm by email to {f.email} within one working day.
                  </p>
                  <p className="eyebrow !text-[10px] text-gilt mt-10 tnum">Reference {done}</p>
                  <button onClick={() => setDone(null)} className="mt-10 eyebrow link-underline pb-1">Make another request</button>
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                  <fieldset>
                    <legend className="eyebrow text-gilt mb-6">I · The occasion</legend>
                    <div className="grid gap-3">
                      {SERVICES.map((s) => (
                        <label key={s.id} className={`flex items-center justify-between gap-6 px-6 py-5 border cursor-pointer transition-colors ${f.service === s.id ? "border-gilt bg-gilt/5" : "border-ivory/15 hover:border-ivory/35"}`}>
                          <span>
                            <span className="display text-2xl">{s.name}</span>
                            <span className="block text-xs text-ivory/50 mt-1">{s.detail}</span>
                          </span>
                          <input type="radio" name="service" value={s.id} checked={f.service === s.id} onChange={() => set("service")(s.id)} className="sr-only" />
                          <span aria-hidden className={`w-4 h-4 rounded-full border ${f.service === s.id ? "border-gilt bg-gilt shadow-[inset_0_0_0_3px_var(--color-noir)]" : "border-ivory/30"}`} />
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="eyebrow text-gilt mb-6">II · Where and when</legend>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {SALONS.map((s) => (
                        <label key={s.id} className={`px-5 py-4 border cursor-pointer transition-colors ${f.salon === s.id ? "border-gilt bg-gilt/5" : "border-ivory/15 hover:border-ivory/35"}`}>
                          <input type="radio" name="salon" value={s.id} checked={f.salon === s.id} onChange={() => set("salon")(s.id)} className="sr-only" />
                          <span className="display text-2xl">{s.city}</span>
                          <span className="block text-xs text-ivory/45 mt-1">{s.name}</span>
                        </label>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-8">
                      <Field id="date" label="Date" error={errors.date}>
                        <input id="date" type="date" min={min} value={f.date} onChange={(e) => set("date")(e.target.value)} aria-invalid={!!errors.date} aria-describedby="date-err" className={`${inputClass} [color-scheme:dark]`} />
                      </Field>
                      <Field id="slot" label="Time" error={errors.slot}>
                        <div id="slot" tabIndex={-1} className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-describedby="slot-err">
                          {SLOTS.map((s) => (
                            <button key={s} type="button" role="radio" aria-checked={f.slot === s} onClick={() => set("slot")(s)} className={`py-2.5 text-sm tnum border transition-colors ${f.slot === s ? "border-gilt text-gilt-soft" : "border-ivory/15 text-ivory/70 hover:border-ivory/40"}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="eyebrow text-gilt mb-6">III · About you</legend>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                      <Field id="name" label="Full name" error={errors.name}>
                        <input id="name" autoComplete="name" value={f.name} onChange={(e) => set("name")(e.target.value)} aria-invalid={!!errors.name} aria-describedby="name-err" className={inputClass} />
                      </Field>
                      <Field id="email" label="Email" error={errors.email}>
                        <input id="email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email")(e.target.value)} aria-invalid={!!errors.email} aria-describedby="email-err" className={inputClass} />
                      </Field>
                      <Field id="phone" label="Telephone" optional>
                        <input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone")(e.target.value)} className={inputClass} />
                      </Field>
                      <Field id="notes" label="Anything we should know" optional>
                        <input id="notes" value={f.notes} onChange={(e) => set("notes")(e.target.value)} placeholder="Scents you love, a gift…" className={inputClass} />
                      </Field>
                    </div>
                  </fieldset>

                  <button type="submit" className="w-full btn-gilt eyebrow py-5">Request the appointment</button>
                  <p className="text-xs text-ivory/40 text-center">Complimentary. We&apos;ll confirm by email within one working day.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="bespoke" className="relative bg-noir-2 border-t border-ivory/10 px-6 md:px-10 py-32 md:py-44 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_20%,rgba(184,149,90,0.12),transparent_70%)]" />
        <div className="relative max-w-[1500px] mx-auto">
          <Chapter n="✦" label="Parfum sur mesure" className="mb-12" />
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <RevealLines className="display text-[clamp(2.8rem,6vw,6rem)] leading-[0.98]" lines={["A perfume", <span key="i" className="italic gilt-text">no one else will wear.</span>]} />
            <Fade className="text-[15px] leading-[1.9] text-ivory/65 max-w-[46ch] lg:justify-self-end pretty" delay={0.15}>
              We accept six bespoke commissions a year. The process takes about six months and begins at €18,000. To apply, choose &ldquo;Bespoke perfume&rdquo; above and we&apos;ll arrange a first conversation.
            </Fade>
          </div>
          <ol className="mt-24 grid md:grid-cols-3 gap-px bg-ivory/10 border border-ivory/10">
            {BESPOKE.map((b, i) => (
              <Fade key={b.n} delay={i * 0.1} className="bg-noir-2 p-10 min-h-[320px] flex flex-col">
                <span className="display italic text-5xl text-gilt">{b.n}</span>
                <h3 className="display text-3xl mt-auto">{b.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/60">{b.d}</p>
              </Fade>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
