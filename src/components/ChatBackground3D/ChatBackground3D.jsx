import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import styles from './ChatBackground3D.module.css';

function FloatingMesh({ position, color, scale, spin }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.x += delta * spin;
    mesh.rotation.y += delta * spin * 0.65;
    mesh.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * spin + position[0]) * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function FloatingTorus({ position, color, scale, spin }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.x += delta * spin * 0.8;
    mesh.rotation.z += delta * spin;
    mesh.position.x =
      position[0] + Math.cos(state.clock.elapsedTime * spin * 0.5) * 0.25;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[0.85, 0.22, 12, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.22}
        roughness={0.35}
        metalness={0.4}
      />
    </mesh>
  );
}

function Scene({ theme }) {
  const accent = theme === 'dark' ? '#3dd4ad' : '#1ba385';
  const accentSoft = theme === 'dark' ? '#159174' : '#7dceb8';

  const shapes = useMemo(
    () => [
      { type: 'mesh', position: [-2.2, 0.4, -1], scale: 0.95, spin: 0.35, color: accent },
      { type: 'mesh', position: [2.4, -0.6, -0.5], scale: 0.75, spin: 0.28, color: accentSoft },
      { type: 'torus', position: [0.3, 1.1, -1.5], scale: 0.9, spin: 0.22, color: accent },
      { type: 'torus', position: [-1.2, -1.3, -0.8], scale: 0.65, spin: 0.18, color: accentSoft },
      { type: 'mesh', position: [1.5, 0.9, -1.2], scale: 0.55, spin: 0.42, color: accent },
    ],
    [accent, accentSoft],
  );

  return (
    <>
      <ambientLight intensity={0.85} />
      <pointLight position={[4, 4, 6]} intensity={1.1} color={accentSoft} />
      <pointLight position={[-5, -2, 4]} intensity={0.45} color="#ffffff" />
      {shapes.map((item) => {
        const { type, ...props } = item;
        return type === 'torus' ? (
          <FloatingTorus key={item.position.join(',')} {...props} />
        ) : (
          <FloatingMesh key={item.position.join(',')} {...props} />
        );
      })}
    </>
  );
}

function usePrefersReducedMotion() {
  return useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
}

export function ChatBackground3D({ theme }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={styles.fallback} aria-hidden="true" />;
  }

  return (
    <div className={styles.wrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <Scene theme={theme} />
      </Canvas>
      <div className={styles.scrim} />
    </div>
  );
}
