"use client";

/**
 * NoteRings — signature graphic.
 * Three concentric arcs represent how a fragrance actually unfolds:
 * Top (0–15min), Heart (15min–3hr), Base (3hr+).
 * Tick marks on each ring = the notes passed in. This is the one
 * "memorable" element of the design — everything else stays quiet.
 */

type NoteRingsProps = {
  top: string[];
  heart: string[];
  base: string[];
  size?: number;
  className?: string;
};

function ringTicks(count: number, radius: number, cx: number, cy: number) {
  const ticks = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * (radius - 6);
    const y1 = cy + Math.sin(angle) * (radius - 6);
    const x2 = cx + Math.cos(angle) * (radius + 6);
    const y2 = cy + Math.sin(angle) * (radius + 6);
    ticks.push({ x1, y1, x2, y2 });
  }
  return ticks;
}

export default function NoteRings({
  top,
  heart,
  base,
  size = 320,
  className = "",
}: NoteRingsProps) {
  const cx = size / 2;
  const cy = size / 2;
  const rTop = size * 0.18;
  const rHeart = size * 0.31;
  const rBase = size * 0.44;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Fragrance structure: top notes ${top.join(", ")}; heart notes ${heart.join(
        ", "
      )}; base notes ${base.join(", ")}`}
    >
      <circle cx={cx} cy={cy} r={rBase} fill="none" stroke="var(--vsp-line)" strokeWidth={1} opacity={0.5} />
      <circle cx={cx} cy={cy} r={rHeart} fill="none" stroke="var(--vsp-line)" strokeWidth={1} opacity={0.65} />
      <circle cx={cx} cy={cy} r={rTop} fill="none" stroke="var(--vsp-line)" strokeWidth={1} opacity={0.85} />

      {ringTicks(base.length, rBase, cx, cy).map((t, i) => (
        <line key={`b${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--vsp-bronze)" strokeWidth={1.25} />
      ))}
      {ringTicks(heart.length, rHeart, cx, cy).map((t, i) => (
        <line key={`h${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--vsp-bronze)" strokeWidth={1.25} />
      ))}
      {ringTicks(top.length, rTop, cx, cy).map((t, i) => (
        <line key={`t${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="var(--vsp-bronze)" strokeWidth={1.25} />
      ))}

      <circle cx={cx} cy={cy} r={2.5} fill="var(--vsp-bronze)" />
    </svg>
  );
}