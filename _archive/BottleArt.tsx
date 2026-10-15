/**
 * BottleArt — original vector silhouettes used as placeholder product art.
 * These are drawn shapes, not derived from any photograph or template asset.
 * Swap the <BottleArt/> usage for real product photography whenever it's ready —
 * just drop images into /public/products and replace the <svg> below with <Image/>.
 */

type BottleArtProps = {
  variant?: "tall" | "round" | "flask";
  accent?: string;
  className?: string;
};

export default function BottleArt({
  variant = "tall",
  accent = "var(--vsp-bronze)",
  className = "",
}: BottleArtProps) {
  if (variant === "round") {
    return (
      <svg viewBox="0 0 200 320" className={className} role="img" aria-hidden="true">
        <rect x="78" y="20" width="44" height="26" rx="4" fill={accent} />
        <rect x="88" y="8" width="24" height="16" rx="3" fill={accent} opacity={0.7} />
        <path
          d="M60 46 C40 70 40 120 40 170 C40 240 60 300 100 300 C140 300 160 240 160 170 C160 120 160 70 140 46 Z"
          fill="none"
          stroke="var(--vsp-line)"
          strokeWidth="1.5"
        />
        <path
          d="M60 46 C40 70 40 120 40 170 C40 240 60 300 100 300 C140 300 160 240 160 170 C160 120 160 70 140 46 Z"
          fill="var(--vsp-glass)"
          opacity={0.18}
        />
        <line x1="40" y1="150" x2="160" y2="150" stroke={accent} strokeWidth="0.75" opacity={0.5} />
      </svg>
    );
  }

  if (variant === "flask") {
    return (
      <svg viewBox="0 0 200 320" className={className} role="img" aria-hidden="true">
        <rect x="82" y="16" width="36" height="30" rx="3" fill={accent} />
        <path
          d="M70 46 L70 110 L44 260 Q42 296 84 296 L116 296 Q158 296 156 260 L130 110 L130 46 Z"
          fill="none"
          stroke="var(--vsp-line)"
          strokeWidth="1.5"
        />
        <path
          d="M70 46 L70 110 L44 260 Q42 296 84 296 L116 296 Q158 296 156 260 L130 110 L130 46 Z"
          fill="var(--vsp-glass)"
          opacity={0.18}
        />
        <line x1="52" y1="200" x2="148" y2="200" stroke={accent} strokeWidth="0.75" opacity={0.5} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 320" className={className} role="img" aria-hidden="true">
      <rect x="84" y="14" width="32" height="34" rx="3" fill={accent} />
      <rect x="92" y="2" width="16" height="14" rx="2" fill={accent} opacity={0.7} />
      <path
        d="M72 48 L128 48 L128 90 Q148 110 148 160 L148 270 Q148 300 118 300 L82 300 Q52 300 52 270 L52 160 Q52 110 72 90 Z"
        fill="none"
        stroke="var(--vsp-line)"
        strokeWidth="1.5"
      />
      <path
        d="M72 48 L128 48 L128 90 Q148 110 148 160 L148 270 Q148 300 118 300 L82 300 Q52 300 52 270 L52 160 Q52 110 72 90 Z"
        fill="var(--vsp-glass)"
        opacity={0.18}
      />
      <line x1="52" y1="180" x2="148" y2="180" stroke={accent} strokeWidth="0.75" opacity={0.5} />
    </svg>
  );
}