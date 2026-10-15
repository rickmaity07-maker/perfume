import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "../../data";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/parfums/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.concentration}`,
    description: `${p.tagline} ${p.family}. Notes of ${[...p.notes.top, ...p.notes.heart, ...p.notes.base].join(", ")}.`,
    openGraph: { images: [`/flacons/${p.slug}.png`] },
  };
}

export default async function ProductPage({ params }: PageProps<"/parfums/[slug]">) {
  const { slug } = await params;
  if (!getProduct(slug)) notFound();
  return <ProductView slug={slug} />;
}
