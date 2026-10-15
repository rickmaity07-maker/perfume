import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono, Cormorant, Manrope, Archivo, JetBrains_Mono } from "next/font/google";
import "./concepts.css";

const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const cormorant = Cormorant({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-cormorant" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Vespre | Design Concepts",
  robots: { index: false },
};

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`concept ${instrument.variable} ${geist.variable} ${geistMono.variable} ${cormorant.variable} ${manrope.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      {children}
    </div>
  );
}
