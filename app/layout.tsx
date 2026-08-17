import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // <-- This imports the Cart Provider

export const metadata: Metadata = {
  title: "Vespre | Fine Fragrances",
  description: "A Truly Timeless Eau De Parfum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased vsp-root selection:bg-(--vsp-bronze) selection:text-black">
        {/* The ClientLayout wraps the children, providing the Cart Context to all pages */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}