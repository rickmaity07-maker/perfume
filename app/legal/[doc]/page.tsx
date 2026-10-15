import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs } from "../../_components/Ornament";

// Draft wording: have counsel review before launch.
const DOCS = {
  privacy: {
    title: "Privacy",
    updated: "1 October 2026",
    sections: [
      ["What we collect", "Your name, contact details and delivery address when you order or book an appointment; the contents of your bag, stored in your own browser; and, if you subscribe, your email address for La Correspondance."],
      ["Why", "To deliver your order, confirm appointments, answer your messages and, with your consent, send our seasonal letter. We never sell your data and never share it for advertising."],
      ["Who sees it", "Our concierge and atelier in Paris, and the couriers and payment provider needed to complete your order. Each is bound by a data-processing agreement."],
      ["How long", "Order records for ten years, as French accounting law requires. Appointment and contact messages for three years. You can unsubscribe from emails at any time."],
      ["Your rights", "Under the GDPR you may access, correct, export or delete your data, or object to its use. Write to privacy@vespre.com and we will reply within thirty days. You may also contact the CNIL."],
    ],
  },
  terms: {
    title: "Terms of sale",
    updated: "1 October 2026",
    sections: [
      ["The seller", "Vespre Parfums SAS, 42 Avenue Montaigne, 75008 Paris, France."],
      ["Orders", "An order is confirmed once payment is received through the secure link our concierge sends. Until then, flacons are reserved for 48 hours."],
      ["Prices", "Prices are in euros and include French VAT. Deliveries outside the EU include duties, shown at checkout."],
      ["Withdrawal", "You may return unopened flacons within 30 days of delivery for a full refund. Engraved flacons are made to your request and are excluded, unless they arrive damaged."],
      ["Disputes", "These terms are governed by French law. Before any proceedings, please write to us; you may also use the European Online Dispute Resolution platform."],
    ],
  },
  cookies: {
    title: "Cookies",
    updated: "1 October 2026",
    sections: [
      ["What we use", "We use no advertising or tracking cookies. Your browser stores your bag and whether you have seen our opening animation; neither leaves your device."],
      ["Managing them", "You can clear this information at any time from your browser settings. The site will simply start with an empty bag."],
    ],
  },
} as const;

type Doc = keyof typeof DOCS;

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  return doc in DOCS ? { title: DOCS[doc as Doc].title } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[doc]">) {
  const { doc } = await params;
  if (!(doc in DOCS)) notFound();
  const d = DOCS[doc as Doc];

  return (
    <main className="px-6 md:px-10 pt-44 pb-32">
      <div className="max-w-[900px] mx-auto">
        <Crumbs items={[["Vespre", "/"], [d.title]]} />
        <h1 className="display text-6xl md:text-8xl mt-10">{d.title}</h1>
        <p className="eyebrow !text-[9px] text-ivory/45 mt-6">Last updated {d.updated}</p>
        <dl className="mt-16">
          {d.sections.map(([k, v]) => (
            <div key={k} className="grid md:grid-cols-[220px_1fr] gap-3 md:gap-10 py-8 border-t border-ivory/10">
              <dt className="display italic text-xl text-gilt-soft">{k}</dt>
              <dd className="text-[15px] leading-[1.9] text-ivory/70">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
