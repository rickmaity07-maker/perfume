import type { Metadata } from "next";
import CollectionView from "./CollectionView";

export const metadata: Metadata = {
  title: "Les Parfums",
  description: "Six compositions: three extraits de parfum and three eaux de parfum, macerated for twelve weeks and finished by hand in Paris.",
};

export default function ParfumsPage() {
  return <CollectionView />;
}
