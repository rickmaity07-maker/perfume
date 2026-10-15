import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(184,149,90,0.12),transparent_70%)]" />
      <p className="relative display italic gilt-text text-[38vw] md:text-[22vw] leading-none select-none">404</p>
      <h1 className="relative display text-4xl md:text-6xl -mt-[4vw]">This page has evaporated.</h1>
      <p className="relative mt-6 text-sm text-ivory/60 max-w-[40ch]">Like a top note, it was here and now it isn&apos;t. Let us take you somewhere more lasting.</p>
      <div className="relative mt-12 flex flex-wrap gap-5 justify-center">
        <Link href="/parfums" className="btn-gilt eyebrow px-10 py-5">Les Parfums</Link>
        <Link href="/" className="eyebrow px-10 py-5 border border-ivory/25 hover:border-gilt transition-colors">Return home</Link>
      </div>
    </main>
  );
}
