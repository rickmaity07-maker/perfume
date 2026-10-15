import type { Metadata } from "next";
import MaisonView from "./MaisonView";

export const metadata: Metadata = {
  title: "La Maison",
  description: "How Vespre perfume is made: harvests in Grasse, twelve weeks of maceration, flacons finished by hand in Paris.",
};

export default function MaisonPage() {
  return <MaisonView />;
}
