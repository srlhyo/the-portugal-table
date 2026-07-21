import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#d9b877";
const GOLD_WARM = "#e8c68f";
const EMBER = "#f2d9ab";

/** Soft round glow sprite, generated once and reused for every particle. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,244,220,0.7)");
    gradient.addColorStop(1, "rgba(255,244,220,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

const COUNT = 90;

function EmberParticles() {
  const glowTexture = useGlowTexture();
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds, colors, basePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 2);
    const colors = new Float32Array(COUNT * 3);
    const palette = [new THREE.Color(GOLD), new THREE.Color(GOLD_WARM), new THREE.Color(EMBER)];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      seeds[i * 2] = Math.random() * Math.PI * 2;
      seeds[i * 2 + 1] = 0.25 + Math.random() * 0.6;
      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, seeds, colors, basePositions: positions.slice() };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const baseX = basePositions[i * 3];
      const baseY = basePositions[i * 3 + 1];
      const phase = seeds[i * 2];
      const speed = seeds[i * 2 + 1];

      const rise = ((t * speed * 0.12 + phase) % 3) - 1.5;
      const sway = Math.sin(t * speed * 0.4 + phase) * 0.35;

      posAttr.setX(i, baseX + sway);
      posAttr.setY(i, baseY + rise);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.32}
        map={glowTexture}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Ambient, business-neutral candlelight glow drifting over the hero photo — no abstract geometry, just warm light. */
const CandlelightField = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <EmberParticles />
    </Canvas>
  );
};

export default CandlelightField;
