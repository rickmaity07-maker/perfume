/** Review label so sections can be referenced when picking pieces to combine ("A1", "B3"...). */
export default function SectionTag({ id, name, tone = "dark" }: { id: string; name: string; tone?: "dark" | "light" }) {
  return (
    <div
      className={`absolute top-4 left-4 z-30 flex items-center gap-2 px-2 py-1 font-mono text-[10px] tracking-wider uppercase pointer-events-none ${
        tone === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <span className="font-bold">{id}</span>
      <span className="opacity-60">{name}</span>
    </div>
  );
}
