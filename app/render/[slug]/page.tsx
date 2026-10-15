import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "../../data";
import RenderStill from "./RenderStill";

/** Internal: a single flacon on a transparent stage, used to produce the stills in /public/flacons. */
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function RenderPage({ params }: PageProps<"/render/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  return <RenderStill hue={p.hue} shape={p.shape} />;
}
