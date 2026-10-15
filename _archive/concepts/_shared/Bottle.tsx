import { useId } from "react";
import type { BottleShape } from "../../data";

/**
 * Original vector bottle with tinted liquid. Stands in for product photography
 * so every scent has its own colour without relying on third-party product shots.
 */

const BODIES: Record<BottleShape, { body: string; cap: React.ReactNode; fillTop: number }> = {
  tall: {
    body: "M72 70 L128 70 L128 96 Q150 112 150 150 L150 282 Q150 304 126 304 L74 304 Q50 304 50 282 L50 150 Q50 112 72 96 Z",
    cap: <rect x="80" y="18" width="40" height="54" rx="3" />,
    fillTop: 150,
  },
  round: {
    body: "M86 74 L114 74 L114 96 C158 108 172 150 172 200 C172 262 140 304 100 304 C60 304 28 262 28 200 C28 150 42 108 86 96 Z",
    cap: <circle cx="100" cy="46" r="30" />,
    fillTop: 168,
  },
  flask: {
    body: "M80 78 L120 78 L120 120 L160 262 Q166 304 124 304 L76 304 Q34 304 40 262 L80 120 Z",
    cap: <rect x="84" y="30" width="32" height="50" rx="2" />,
    fillTop: 196,
  },
  block: {
    body: "M84 76 L116 76 L116 100 L162 100 Q170 100 170 108 L170 296 Q170 304 162 304 L38 304 Q30 304 30 296 L30 108 Q30 100 38 100 L84 100 Z",
    cap: <rect x="70" y="26" width="60" height="52" rx="1" />,
    fillTop: 140,
  },
};

type BottleProps = {
  hue: string;
  shape?: BottleShape;
  label?: string;
  capColor?: string;
  glass?: string;
  className?: string;
};

export default function Bottle({ hue, shape = "tall", label, capColor = "#1b1714", glass = "rgba(255,255,255,0.35)", className = "" }: BottleProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { body, cap, fillTop } = BODIES[shape];

  return (
    <svg viewBox="0 0 200 320" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`clip${uid}`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`liq${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hue} stopOpacity="0.75" />
          <stop offset="1" stopColor={hue} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`shine${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill={capColor}>{cap}</g>
      <path d={body} fill={glass} />
      <g clipPath={`url(#clip${uid})`}>
        <rect x="0" y={fillTop} width="200" height="200" fill={`url(#liq${uid})`} />
        <rect x="0" y={fillTop} width="200" height="3" fill="#fff" opacity="0.35" />
        <rect x="56" y="70" width="14" height="240" fill={`url(#shine${uid})`} />
      </g>
      <path d={body} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25" />
      {label && (
        <g>
          <rect x="70" y="214" width="60" height="38" fill="#f7f3ec" opacity="0.92" />
          <text x="100" y="231" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#1b1714" fontFamily="serif">VESPRE</text>
          <text x="100" y="245" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#1b1714" fontFamily="monospace">{label}</text>
        </g>
      )}
    </svg>
  );
}
