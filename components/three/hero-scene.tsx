"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

/* A slowly rotating wireframe core surrounded by floating metallic units —
   an abstract "cold-chain network". Light-weight: no external HDR/assets. */

export function Core() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.18;
      ref.current.rotation.x += delta * 0.06;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.65, 1]} />
      <meshStandardMaterial
        color="#0f766e"
        wireframe
        emissive="#14b8a6"
        emissiveIntensity={0.4}
        roughness={0.4}
      />
    </mesh>
  );
}

export function Units() {
  const positions = useMemo(
    () =>
      [
        [2.6, 1.1, -0.5],
        [-2.7, -0.8, 0.4],
        [2.2, -1.4, 0.6],
        [-2.3, 1.5, -0.3],
        [0.2, 2.4, -1],
        [0.4, -2.5, -0.6],
      ] as const,
    []
  );
  return (
    <>
      {positions.map((p, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.2}
          rotationIntensity={0.8}
          floatIntensity={1.1}
        >
          <mesh position={p as unknown as [number, number, number]}>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#1e293b" : "#0f766e"}
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const x = state.pointer.x * 0.3;
    const y = state.pointer.y * 0.2;
    group.current.rotation.y += (x - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}>{children}</group>;
}

/** Shared scene contents (lights + rig + meshes), reused by the hero and the
    scroll-driven traveling object. */
export function SceneContent() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <pointLight position={[-5, -3, -2]} intensity={40} color="#2dd4bf" />
      <Rig>
        <Core />
        <Units />
      </Rig>
    </Suspense>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneContent />
    </Canvas>
  );
}
