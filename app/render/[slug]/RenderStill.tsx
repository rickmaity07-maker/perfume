"use client";

import dynamic from "next/dynamic";
import type { Shape } from "../../data";

const Flacon = dynamic(() => import("../../_components/Flacon"), { ssr: false });

export default function RenderStill({ hue, shape }: { hue: string; shape: Shape }) {
  return (
    <div style={{ width: 800, height: 1000, background: "transparent" }}>
      <style>{"html, body { background: transparent !important; }"}</style>
      <Flacon hue={hue} shape={shape} spin={false} parallax={false} className="w-full h-full" />
    </div>
  );
}
