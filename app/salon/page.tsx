import type { Metadata } from "next";
import SalonView from "./SalonView";

export const metadata: Metadata = {
  title: "Le Salon privé",
  description: "Book a private fragrance consultation at 42 Avenue Montaigne, or apply for a bespoke perfume.",
};

export default function SalonPage() {
  return <SalonView />;
}
