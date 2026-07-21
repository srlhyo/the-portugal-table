import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#c19a5b";
const GOLD_LIGHT = "#d9bd8c";
const ROSE = "#e8cfc3";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = Math.random() * 1.6 + 0.3;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.045;
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD_LIGHT}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CenterpieceRing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.12;
    groupRef.current.rotation.x = 0.55 + Math.sin(t * 0.15) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.7, 0.012, 16, 120]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[2.15, 0.006, 16, 120]} />
        <meshBasicMaterial color={ROSE} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 6]}>
        <torusGeometry args={[1.35, 0.008, 16, 120]} />
        <meshBasicMaterial color={GOLD_LIGHT} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function CoreGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 0.9) * 0.06;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={[0, -0.15, -0.6]}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.4} />
        </mesh>
        <mesh scale={0.94}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial
            color={GOLD}
            emissive={GOLD}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.22}
          />
        </mesh>
      </group>
    </Float>
  );
}

const EtherealScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color={GOLD_LIGHT} />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color={ROSE} />

      <CoreGlow />
      <CenterpieceRing />
      <ParticleField />
      <Sparkles
        count={60}
        scale={[8, 4, 8]}
        size={2}
        speed={0.3}
        opacity={0.5}
        color={GOLD_LIGHT}
      />
    </Canvas>
  );
};

export default EtherealScene;
