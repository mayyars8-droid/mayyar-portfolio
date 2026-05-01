import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  RoundedBox,
  TorusKnot,
} from '@react-three/drei';
import * as THREE from 'three';

type SceneProps = {
  className?: string;
};

function FloatingKnot({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.24;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1}>
      <TorusKnot ref={ref} args={[0.55, 0.18, 220, 32]} position={position}>
        <MeshDistortMaterial
          color="#FF5F1F"
          metalness={0.4}
          roughness={0.16}
          distort={0.28}
          speed={1.4}
        />
      </TorusKnot>
    </Float>
  );
}

function GlassCube({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.35) * 0.4;
    ref.current.rotation.y = t * 0.35;
  });
  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1.2}>
      <RoundedBox
        ref={ref}
        args={[0.85, 0.85, 0.85]}
        radius={0.14}
        smoothness={6}
        position={position}
      >
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={1}
          thickness={0.5}
          ior={1.4}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationColor="#FFE7C8"
          attenuationDistance={1.4}
          metalness={0}
        />
      </RoundedBox>
    </Float>
  );
}

function Sphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.6, 6]} />
        <MeshDistortMaterial
          color="#1E40FF"
          metalness={0.25}
          roughness={0.22}
          distort={0.4}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#1A1815" transparent opacity={0.4} />
    </points>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const { x, y } = pointer.current;
    groupRef.current.rotation.y += (x * 0.35 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-y * 0.25 - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene({ className }: SceneProps) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

  // On mobile: float a single subtle group near the top-right, lower DPR for perf.
  const groupPos: [number, number, number] = isSmall ? [1.3, 1.5, 0] : [2.4, 0.3, 0];
  const dpr: [number, number] = isSmall ? [1, 1.3] : [1, 1.7];

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 5]} intensity={1.2} color="#FFE0C8" />
        <directionalLight position={[-5, -2, -3]} intensity={0.45} color="#A9C0FF" />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={2.4}
              position={[3, 3, 2]}
              scale={[5, 3, 1]}
              color="#FFCCAA"
            />
            <Lightformer
              form="rect"
              intensity={1.8}
              position={[-4, -2, -2]}
              scale={[5, 3, 1]}
              color="#C5CDFF"
            />
            <Lightformer
              form="circle"
              intensity={1.5}
              position={[0, 4, 4]}
              scale={2}
              color="#FFFFFF"
            />
          </Environment>

          {/* Cluster the objects on the right side, behind the text */}
          <MouseParallax>
            <group position={groupPos} scale={isSmall ? 0.7 : 1}>
              <FloatingKnot position={[-0.8, 1.2, 0]} />
              <Sphere position={[0.9, -0.6, 0.2]} />
              <GlassCube position={[-0.4, -0.4, 0.6]} />
            </group>
            <Particles count={isSmall ? 30 : 60} />
          </MouseParallax>
        </Suspense>
      </Canvas>
    </div>
  );
}
