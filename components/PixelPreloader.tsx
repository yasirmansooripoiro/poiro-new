"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Particle = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
};

function ParticleField({ count = 4500 }: { count?: number }) {
  const meshRef = useRef<THREE.Points | null>(null);
  const { mouse } = useThree();

  const { positions, particles } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const particles: Particle[] = [];

    // Use a seeded random function to avoid impure function calls
    const seededRandom = (() => {
      let seed = count;
      return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    })();

    for (let i = 0; i < count; i++) {
      const x = (seededRandom() - 0.5) * 0.02;
      const y = (seededRandom() - 0.5) * 0.02;
      const z = (seededRandom() - 0.5) * 0.02;

      const angle = seededRandom() * Math.PI * 2;
      const speed = 0.002 + seededRandom() * 0.01;

      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(vx, vy, 0),
      });
    }

    return { positions, particles };
  }, [count]);

  const mouseVec = new THREE.Vector2();
  const particleVec = new THREE.Vector2();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      p.position.add(p.velocity);

      // subtle noise drift
      p.position.x += Math.sin(time + i) * 0.0003;
      p.position.y += Math.cos(time + i) * 0.0003;

      // mouse repulsion
      mouseVec.set(mouse.x, mouse.y);
      particleVec.set(p.position.x, p.position.y);

      const dist = particleVec.distanceTo(mouseVec);

      if (dist < 0.25) {
        const force = (0.25 - dist) * 0.02;
        const dir = particleVec.clone().sub(mouseVec).normalize();

        p.position.x += dir.x * force;
        p.position.y += dir.y * force;
      }

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    });

    const geometry = meshRef.current?.geometry;
    if (!geometry) return;

    const attr = geometry.attributes.position as THREE.BufferAttribute;
    attr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        color="#ff8105"
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

export default function PixelPreloader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 1.2], fov: 75 }}>
        <ParticleField />
      </Canvas>

      <div className="absolute text-white tracking-[0.35em] text-lg font-light">
        LOADING..
      </div>
    </div>
  );
}
