"use client"; // ⚠️ Keep ONLY for Next.js App Router. Remove if using CRA, Vite, or Expo.

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// 🎯 Animated 3D Sphere Component
const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2} ref={meshRef}>
      <MeshDistortMaterial
        attach="material"
        color="#00d4ff"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// 🎯 Main 3D Scene Component
const Scene3D: React.FC = () => {
  return (
    <div
      className="w-full h-full absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* ✅ Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#a855f7" intensity={1} />

        {/* ✅ Animated sphere */}
        <AnimatedSphere />

        {/* ✅ Camera controls */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
