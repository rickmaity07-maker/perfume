"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Shape } from "../data";

/**
 * Real-time glass flacon: refracting glass, tinted juice, heavy base, gilded cap.
 * Geometry is procedural, so every scent has its own bottle without product photography.
 */

type FlaconProps = {
  hue: string;
  shape: Shape;
  engraving?: string;
  className?: string;
  /** Slow idle turn. Disable for still renders. */
  spin?: boolean;
  /** Follow the pointer slightly. */
  parallax?: boolean;
  shadow?: boolean;
};

const GOLD = "#c9a66b";
const STAGE = new THREE.Color("#0d0b0a");

type Spec = {
  kind: "box" | "lathe";
  glass: [number, number, number]; // box size
  liquid: [number, number, number]; // box size
  liquidY: number;
  base?: { size: [number, number, number]; y: number };
  fill: number; // world-space height of the liquid surface
  cap: { y: number; w: number; h: number; d: number; round: boolean };
  tube: [number, number]; // length, centre y
};

const SPECS: Record<Shape, Spec> = {
  column: {
    kind: "box", glass: [1.05, 2.2, 0.62], liquid: [0.93, 1.9, 0.5], liquidY: 0.09,
    base: { size: [1, 0.22, 0.57], y: -0.97 }, fill: 0.5,
    cap: { y: 1.42, w: 0.52, h: 0.5, d: 0.52, round: false }, tube: [1.95, 0.125],
  },
  block: {
    kind: "box", glass: [1.7, 1.75, 0.78], liquid: [1.58, 1.4, 0.66], liquidY: 0.07,
    base: { size: [1.62, 0.22, 0.72], y: -0.745 }, fill: 0.4,
    cap: { y: 1.2, w: 0.95, h: 0.55, d: 0.62, round: false }, tube: [1.5, 0.13],
  },
  orb: {
    kind: "lathe", glass: [0, 0, 0], liquid: [0, 0, 0], liquidY: 0, fill: 0.22,
    cap: { y: 1.4, w: 0.62, h: 0.62, d: 0.5, round: true }, tube: [1.9, 0.08],
  },
  flask: {
    kind: "lathe", glass: [0, 0, 0], liquid: [0, 0, 0], liquidY: 0, fill: 0.18,
    cap: { y: 1.42, w: 0.5, h: 0.6, d: 0.5, round: true }, tube: [1.9, 0.08],
  },
};

function latheProfile(shape: Shape) {
  const pts: THREE.Vector2[] = [];
  if (shape === "orb") {
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI;
      pts.push(new THREE.Vector2(Math.sin(t) * 0.98 + 0.001, -Math.cos(t) * 0.95));
    }
    pts.push(new THREE.Vector2(0.26, 0.98), new THREE.Vector2(0.26, 1.08), new THREE.Vector2(0.001, 1.08));
  } else {
    const prof: [number, number][] = [
      [0.001, -1.05], [0.62, -1.05], [0.78, -0.98], [0.86, -0.75], [0.86, 0.15], [0.7, 0.55], [0.34, 0.85], [0.26, 0.95], [0.26, 1.08], [0.001, 1.08],
    ];
    prof.forEach(([x, y]) => pts.push(new THREE.Vector2(x, y)));
  }
  return pts;
}

function makeEngravingTexture(text: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `italic 400 ${text.length > 2 ? 150 : 200}px "Bodoni Moda", Didot, Georgia, serif`;
  ctx.fillText(text, 256, 270);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

function Bottle({ hue, shape, engraving, spin = true, parallax = true }: FlaconProps) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.MeshPhysicalMaterial>(null);
  const spec = SPECS[shape];
  const target = useMemo(() => new THREE.Color(hue), [hue]);
  const clip = useMemo(() => [new THREE.Plane(new THREE.Vector3(0, -1, 0), spec.fill)], [spec.fill]);
  const lathe = useMemo(() => (spec.kind === "lathe" ? new THREE.LatheGeometry(latheProfile(shape), 128) : null), [spec.kind, shape]);
  const liquidLathe = useMemo(() => {
    if (!lathe) return null;
    const g = lathe.clone();
    g.scale(0.93, 0.93, 0.93);
    return g;
  }, [lathe]);
  const engraveTex = useMemo(() => (engraving ? makeEngravingTexture(engraving) : null), [engraving]);

  useFrame((state, dt) => {
    if (liquid.current) {
      const k = 1 - Math.pow(0.02, dt);
      liquid.current.color.lerp(target, k);
      liquid.current.emissive.lerp(target, k);
    }
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const px = parallax ? state.pointer.x : 0;
    const py = parallax ? state.pointer.y : 0;
    const base = spin ? Math.sin(t * 0.25) * 0.55 : -0.42;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, base + px * 0.35, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.06, 3, dt);
    g.position.y = spin ? Math.sin(t * 0.8) * 0.03 : 0;
  });

  const glass = (
    <MeshTransmissionMaterial
      background={STAGE}
      backside
      backsideThickness={0.25}
      samples={6}
      resolution={512}
      thickness={0.35}
      roughness={0.02}
      ior={1.45}
      chromaticAberration={0.05}
      anisotropicBlur={0.05}
      distortion={0.04}
      distortionScale={0.3}
      temporalDistortion={0}
      clearcoat={1}
      clearcoatRoughness={0}
      envMapIntensity={1.2}
      color="#ffffff"
      attenuationColor="#fff8ee"
      attenuationDistance={3}
    />
  );
  const gold = <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} envMapIntensity={1.7} />;
  const juice = (
    <meshPhysicalMaterial
      ref={liquid}
      color={hue}
      emissive={hue}
      emissiveIntensity={0.14}
      roughness={0.04}
      clearcoat={1}
      transparent
      opacity={0.88}
      side={THREE.DoubleSide}
      clippingPlanes={clip}
      envMapIntensity={1.4}
    />
  );
  const thickGlass = <meshPhysicalMaterial color="#efe6d6" transparent opacity={0.45} roughness={0.05} clearcoat={1} envMapIntensity={2.5} />;

  const { cap } = spec;
  return (
    <group ref={group}>
      {/* glass shell */}
      {spec.kind === "box" ? (
        <RoundedBox args={spec.glass} radius={0.06} smoothness={6}>
          {glass}
        </RoundedBox>
      ) : (
        <mesh geometry={lathe!}>{glass}</mesh>
      )}

      {/* heavy base */}
      {spec.base && (
        <RoundedBox args={spec.base.size} radius={0.04} position={[0, spec.base.y, 0]}>
          {thickGlass}
        </RoundedBox>
      )}

      {/* juice, cut flat at the fill line */}
      {spec.kind === "box" ? (
        <RoundedBox args={spec.liquid} radius={0.03} position={[0, spec.liquidY, 0]}>
          {juice}
        </RoundedBox>
      ) : (
        <mesh geometry={liquidLathe!}>{juice}</mesh>
      )}

      {/* dip tube */}
      <mesh position={[0.1, spec.tube[1], 0]}>
        <cylinderGeometry args={[0.013, 0.013, spec.tube[0], 12]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={0.1} />
      </mesh>

      {/* gilded collar and cap */}
      <group position={[0, cap.y, 0]}>
        <mesh position={[0, -cap.h / 2 - 0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 48]} />
          {gold}
        </mesh>
        {cap.round ? (
          <mesh>
            <cylinderGeometry args={[cap.w / 2, cap.w / 2, cap.h, 96]} />
            {gold}
          </mesh>
        ) : (
          <RoundedBox args={[cap.w, cap.h, cap.d]} radius={0.03} smoothness={4}>
            {gold}
          </RoundedBox>
        )}
        {engraveTex && (
          <mesh position={[0, 0, (cap.round ? cap.w / 2 : cap.d / 2) + 0.002]}>
            <planeGeometry args={[Math.min(cap.w, cap.h) * 0.85, Math.min(cap.w, cap.h) * 0.85]} />
            <meshStandardMaterial color="#6e5024" metalness={1} roughness={0.55} alphaMap={engraveTex} transparent />
          </mesh>
        )}
      </group>
    </group>
  );
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      {/* Light from the sides and above; thin strips in front draw the vertical highlights on the glass. */}
      <Lightformer form="rect" intensity={5} position={[-4, 1, 0.6]} scale={[0.7, 7, 1]} color="#fff4e2" />
      <Lightformer form="rect" intensity={3.5} position={[4, 0.5, -0.4]} scale={[0.5, 7, 1]} color="#ffe2b8" />
      <Lightformer form="rect" intensity={2.5} position={[0, 5, 0]} scale={[3, 0.6, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={2.2} position={[-1.6, 0.8, 5]} scale={[0.18, 3.5, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={1.4} position={[1.9, 0.8, 5]} scale={[0.08, 3.5, 1]} color="#ffe9c9" />
      <Lightformer form="ring" intensity={1.2} position={[0, 0, -4]} scale={3} color="#d9c49b" />
    </Environment>
  );
}

export default function Flacon({ className = "", shadow = true, ...props }: FlaconProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pause rendering when off-screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 7.4], fov: 30 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
      >
        <ambientLight intensity={0.25} />
        <spotLight position={[3, 6, 4]} angle={0.4} penumbra={1} intensity={60} color="#fff2dc" />
        <pointLight position={[-3, -1, 2]} intensity={6} color="#d9c49b" />
        <Suspense fallback={null}>
          <Bottle {...props} />
          <Studio />
        </Suspense>
        {shadow && <ContactShadows position={[0, -1.25, 0]} opacity={0.55} scale={6} blur={2.6} far={2} color="#000" />}
      </Canvas>
    </div>
  );
}
