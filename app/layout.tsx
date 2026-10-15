import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./_components/store";
import Shell from "./_components/Shell";

const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-bodoni" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Vespre — Maison de Parfum, Paris", template: "%s · Vespre Paris" },
  description: "Haute parfumerie composed in Grasse and Paris. Six extraits and eaux de parfum, engraved by hand, macerated for twelve weeks.",
  openGraph: { title: "Vespre — Maison de Parfum, Paris", description: "Haute parfumerie composed in Grasse and Paris.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0d0b0a" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} ${pinyon.variable}`}>
      <body>
        <StoreProvider>
          <Shell>{children}</Shell>
        </StoreProvider>
      </body>
    </html>
  );
}
