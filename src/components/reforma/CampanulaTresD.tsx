import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// ============================================================
// CampanulaTresD — a campânula dourada, agora a sério, em 3D.
//
// Uma cloche de metal polido pousada num prato, a respirar ao
// de leve sobre o palco verde. Reflete um estúdio inventado
// (Lightformers dentro de um <Environment> procedimental): sem
// HDR a descarregar, sem pedidos de rede, e o ouro fica com
// aquele reflexo de sala de jantar — luz quente de cima, um
// verde profundo à volta.
//
// Interação:
//   · o rato (ou o dedo) inclina-a devagar — parallax, não
//     órbita: ninguém a vira ao contrário sem querer;
//   · `levantada` sobe a campânula com uma inclinação de
//     mordomo e solta um sopro de faíscas douradas.
//
// Telemóvel: dpr limitado a 1.5, geometria contida, e o
// frameloop pára quando o palco sai do ecrã (prop `ativa`).
// prefers-reduced-motion: sem flutuação, movimentos curtos.
// ============================================================

const OURO = "#E4C06A";
const OURO_ESCURO = "#B8903E";
const PEROLA = "#FFF8EA";

interface CenaProps {
  levantada: boolean;
  reduzido: boolean;
}

/** Sombra macia por baixo do prato — um disco com gradiente, e não uma luz a calcular sombras. */
function useTexturaSombra() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(0.55, "rgba(0,0,0,0.18)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Cloche({ levantada, reduzido }: CenaProps) {
  const grupo = useRef<THREE.Group>(null);
  const domo = useRef<THREE.Group>(null);
  const sombra = useRef<THREE.Mesh>(null);
  const texturaSombra = useTexturaSombra();

  useFrame((state, delta) => {
    const g = grupo.current;
    const d = domo.current;
    if (!g || !d) return;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Parallax: o palco inclina-se para onde o visitante olha
    const px = state.pointer.x;
    const py = state.pointer.y;
    const giro = reduzido ? 0 : Math.sin(t * 0.22) * 0.16;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.42 + giro, 2.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.06 - py * 0.1, 2.5, dt);

    // O gesto: a campânula sobe e inclina-se, como quem a segura pela pega
    const yAlvo = levantada ? 2.05 : 0;
    const zAlvo = levantada ? -0.26 : 0;
    const xAlvo = levantada ? 0.12 : 0;
    const vel = reduzido ? 12 : 2.4;
    d.position.y = THREE.MathUtils.damp(d.position.y, yAlvo, vel, dt);
    d.position.x = THREE.MathUtils.damp(d.position.x, levantada ? 0.35 : 0, vel, dt);
    d.rotation.z = THREE.MathUtils.damp(d.rotation.z, zAlvo, vel, dt);
    d.rotation.x = THREE.MathUtils.damp(d.rotation.x, xAlvo, vel, dt);

    // A sombra encolhe quando a cloche se afasta do prato
    if (sombra.current) {
      const s = THREE.MathUtils.lerp(1.15, 0.85, Math.min(d.position.y / 2.05, 1));
      sombra.current.scale.setScalar(s);
      (sombra.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0.9, 0.55, Math.min(d.position.y / 2.05, 1));
    }
  });

  return (
    <group ref={grupo} position={[0, -0.25, 0]}>
      {/* Sombra no chão do palco */}
      <mesh ref={sombra} rotation-x={-Math.PI / 2} position={[0, -0.16, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshBasicMaterial map={texturaSombra} transparent depthWrite={false} opacity={0.9} />
      </mesh>

      {/* O prato de servir */}
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[1.42, 1.5, 0.07, 96]} />
        <meshPhysicalMaterial
          color={OURO}
          metalness={1}
          roughness={0.28}
          clearcoat={0.4}
          clearcoatRoughness={0.25}
          envMapIntensity={1.05}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.47, 0.045, 24, 128]} />
        <meshPhysicalMaterial color={OURO_ESCURO} metalness={1} roughness={0.2} envMapIntensity={1.2} />
      </mesh>

      {/* A campânula, que sobe como um todo */}
      <group ref={domo}>
        {/* O domo: meia esfera ligeiramente achatada */}
        <mesh scale={[1, 0.84, 1]} position={[0, 0, 0]}>
          <sphereGeometry args={[1.08, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color={OURO}
            metalness={1}
            roughness={0.17}
            clearcoat={0.65}
            clearcoatRoughness={0.12}
            envMapIntensity={1.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* O rebordo */}
        <mesh rotation-x={Math.PI / 2} position={[0, 0.005, 0]}>
          <torusGeometry args={[1.08, 0.055, 24, 128]} />
          <meshPhysicalMaterial color={OURO_ESCURO} metalness={1} roughness={0.2} envMapIntensity={1.2} />
        </mesh>
        {/* A pega: uma argola de pé, sobre um pequeno pedestal */}
        <mesh position={[0, 0.93, 0]}>
          <cylinderGeometry args={[0.09, 0.13, 0.08, 32]} />
          <meshPhysicalMaterial color={OURO_ESCURO} metalness={1} roughness={0.22} envMapIntensity={1.2} />
        </mesh>
        <mesh position={[0, 1.12, 0]}>
          <torusGeometry args={[0.15, 0.04, 20, 48]} />
          <meshPhysicalMaterial color={OURO} metalness={1} roughness={0.16} clearcoat={0.6} envMapIntensity={1.2} />
        </mesh>
        {/* A pérola — o ADN do logo, a coroar a pega */}
        <mesh position={[0, 0.98, 0]}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshPhysicalMaterial color={PEROLA} metalness={0.1} roughness={0.25} clearcoat={1} envMapIntensity={0.8} />
        </mesh>
      </group>

      {/* O sopro de faíscas — só quando a mesa se revela */}
      {levantada && !reduzido && (
        <Sparkles
          count={42}
          scale={[2.8, 2.2, 2.8]}
          position={[0, 0.9, 0]}
          size={3}
          speed={0.45}
          opacity={0.75}
          color="#FFE9A8"
        />
      )}
    </group>
  );
}

/** Um estúdio inventado: luz quente de cima, um painel de cada lado, verde profundo à volta. */
function Estudio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#1c2e26"]} />
      <Lightformer
        form="rect"
        intensity={3.2}
        color="#FFF3DA"
        position={[0, 5, 0]}
        rotation-x={Math.PI / 2}
        scale={[7, 4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.6}
        color="#FFE6B0"
        position={[-5, 1.5, 2]}
        rotation-y={Math.PI / 2}
        scale={[3, 7, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#FFFFFF"
        position={[5, 1, -1]}
        rotation-y={-Math.PI / 2}
        scale={[2, 6, 1]}
      />
      <Lightformer form="ring" intensity={2.2} color="#F8DA8E" position={[0, 2.5, -6]} scale={3.5} />
      <Lightformer form="rect" intensity={0.5} color="#365446" position={[0, -4, 0]} rotation-x={-Math.PI / 2} scale={[8, 8, 1]} />
    </Environment>
  );
}

/** Aponta a câmara para o centro da cena uma única vez. */
function Enquadramento() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0.15, 0);
  }, [camera]);
  return null;
}

interface Props extends CenaProps {
  /** Só renderiza frames enquanto o palco está no ecrã. */
  ativa: boolean;
  aoPronta?: () => void;
  className?: string;
}

export default function CampanulaTresD({ levantada, reduzido, ativa, aoPronta, className }: Props) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      frameloop={ativa ? "always" : "never"}
      camera={{ position: [0, 2.1, 7.2], fov: 28, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        aoPronta?.();
      }}
    >
      <Enquadramento />
      <Estudio />
      <ambientLight intensity={0.15} />
      <directionalLight position={[2, 5, 3]} intensity={0.6} color="#FFF1D0" />
      <Float
        speed={reduzido ? 0 : 1.1}
        rotationIntensity={reduzido ? 0 : 0.12}
        floatIntensity={reduzido ? 0 : 0.35}
        floatingRange={[-0.05, 0.08]}
      >
        <Cloche levantada={levantada} reduzido={reduzido} />
      </Float>
    </Canvas>
  );
}
