"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Masthead } from "../_components/Ornament";
import { Fade } from "../_components/Reveal";
import { Field, inputClass, isEmail } from "../_components/Field";

const SECTIONS = [
  {
    id: "delivery",
    title: "Delivery",
    rows: [
      ["Paris", "Hand delivery by our courier the same day for orders placed before 13:00, Tuesday to Saturday. Complimentary."],
      ["France & Europe", "Insured delivery in 2–3 working days, signature required. Complimentary."],
      ["United Kingdom, US, Switzerland", "4–6 working days, duties included at checkout. €35."],
      ["Engraved flacons", "Add two working days for the engraver."],
    ],
  },
  {
    id: "returns",
    title: "Returns",
    rows: [
      ["Within 30 days", "Unopened flacons can be returned for a full refund. We send a prepaid label and collect from your door."],
      ["Opened by mistake?", "Write to us. If the perfume isn't right for you, we'll suggest another composition and arrange an exchange."],
      ["Engraved flacons", "Engraving makes a flacon personal, so these can't be returned unless they arrive damaged."],
    ],
  },
  {
    id: "engraving",
    title: "Engraving & gifting",
    rows: [
      ["Engraving", "Up to three characters on the gilded cap, in Didone capitals or script. Cut by hand in our Paris atelier, at no charge."],
      ["Signature wrapping", "Every order arrives in our black lacquered coffret with a silk ribbon and a handwritten card, if you'd like one."],
      ["Samples", "Choose two 2 ml samples with every order, so you can discover the next composition at home."],
    ],
  },
  {
    id: "care",
    title: "Caring for your perfume",
    rows: [
      ["Light and heat", "Keep the flacon away from windows and radiators. A drawer or wardrobe is ideal."],
      ["Refills", "Bring any Vespre flacon to the salon and we'll refill it from the current batch, for life."],
    ],
  },
];

export default function ServiceView() {
  return (
    <main>
      <Masthead eyebrow="Service Client" title="At your" italic="service." intro="Our concierge answers every message personally, Tuesday to Saturday, 10:00–19:00 Paris time." />

      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-24">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 self-start">
            <ul className="flex lg:flex-col flex-wrap gap-x-6 gap-y-4">
              {[...SECTIONS, { id: "contact", title: "Contact the concierge" }].map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group flex items-baseline gap-4">
                    <span className="eyebrow !text-[9px] text-gilt tnum">0{i + 1}</span>
                    <span className="display text-xl group-hover:italic link-underline">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-28">
            {SECTIONS.map((s) => (
              <Fade key={s.id}>
                <section id={s.id} className="scroll-mt-28">
                  <h2 className="display text-4xl md:text-6xl">{s.title}</h2>
                  <dl className="mt-10">
                    {s.rows.map(([k, v]) => (
                      <div key={k} className="grid md:grid-cols-[260px_1fr] gap-3 md:gap-10 py-7 border-t border-ivory/10">
                        <dt className="display italic text-xl text-gilt-soft">{k}</dt>
                        <dd className="text-[15px] leading-[1.85] text-ivory/70 max-w-[58ch]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Fade>
            ))}
            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
}

function Contact() {
  const [f, setF] = useState({ name: "", email: "", order: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((s) => ({ ...s, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  return (
    <section id="contact" className="scroll-mt-28">
      <h2 className="display text-4xl md:text-6xl">Contact the <span className="italic text-gilt-soft">concierge</span></h2>
      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-ivory/65">
        <a href="tel:+33140506070" className="link-underline">+33 1 40 50 60 70</a>
        <a href="mailto:concierge@vespre.com" className="link-underline">concierge@vespre.com</a>
      </div>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.p key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 display text-3xl text-gilt-soft max-w-[30ch]">
            Thank you. A member of our concierge will reply within one working day.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            noValidate
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              const errs: Record<string, string> = {};
              if (!f.name.trim()) errs.name = "Please tell us your name.";
              if (!isEmail(f.email)) errs.email = "Please enter a valid email address.";
              if (f.message.trim().length < 10) errs.message = "Please write a few words so we can help.";
              setErrors(errs);
              if (Object.keys(errs).length) document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus();
              else setSent(true);
            }}
            className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-2"
          >
            <Field id="c-name" label="Full name" error={errors.name}>
              <input id="c-name" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby="c-name-err" className={inputClass} />
            </Field>
            <Field id="c-email" label="Email" error={errors.email}>
              <input id="c-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby="c-email-err" className={inputClass} />
            </Field>
            <Field id="c-order" label="Order reference" optional className="sm:col-span-2">
              <input id="c-order" value={f.order} onChange={set("order")} placeholder="VS-…" className={inputClass} />
            </Field>
            <Field id="c-message" label="Your message" error={errors.message} className="sm:col-span-2">
              <textarea id="c-message" rows={5} value={f.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby="c-message-err" className={`${inputClass} resize-none`} />
            </Field>
            <div className="sm:col-span-2 mt-4">
              <button type="submit" className="btn-gilt eyebrow px-10 py-5">Send to the concierge</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
