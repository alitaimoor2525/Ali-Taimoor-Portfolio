import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Points,
  PointMaterial,
  Torus,
  Stars,
  Trail,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getScroll, setScrollIntensity, startScrollSignal } from "./scrollSignal";

function NeuralPoints({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { hero, velocity } = getScroll();
    ref.current.rotation.y += delta * (0.05 + velocity * 0.25);
    ref.current.rotation.x += delta * 0.015;
    const s = (1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03) * (1 + hero * 0.5);
    ref.current.scale.setScalar(s);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a78bfa" size={0.028} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

/** Glowing rings orbiting the core on tilted axes. */
function OrbitRings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { hero, velocity } = getScroll();
    const spin = 1 + velocity * 1.6;
    const spread = 1 + hero * 0.45;
    for (const r of [a, b, c]) r.current?.scale.setScalar(THREE.MathUtils.lerp(r.current.scale.x, spread, 0.08));
    delta *= spin;
    if (a.current) {
      a.current.rotation.z += delta * 0.5;
      a.current.rotation.x = 1.2 + Math.sin(t * 0.4) * 0.2;
    }
    if (b.current) {
      b.current.rotation.y += delta * 0.4;
      b.current.rotation.z = -0.8 + Math.cos(t * 0.3) * 0.25;
    }
    if (c.current) {
      c.current.rotation.x += delta * 0.28;
      c.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group>
      <Torus ref={a} args={[2.55, 0.012, 8, 90]} rotation={[1.2, 0, 0]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.75} />
      </Torus>
      <Torus ref={b} args={[3.05, 0.008, 8, 90]} rotation={[0.4, 0.9, -0.8]}>
        <meshBasicMaterial color="#c084fc" transparent opacity={0.55} />
      </Torus>
      <Torus ref={c} args={[3.6, 0.006, 6, 80]} rotation={[0.9, 0.2, 0.4]}>
        <meshBasicMaterial color="#818cf8" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

/** Small light particles racing along orbits, leaving glowing trails. */
function Electron({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (!ref.current) return;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius * Math.sin(tilt),
      Math.sin(t) * radius * Math.cos(tilt),
    );
  });
  return (
    <Trail width={1.1} length={5} color={color} attenuation={(w) => w * w} decay={1.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

/** Crystalline shards drifting around the core. */
function Shards({ count = 14 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 5 - 1,
        ] as [number, number, number],
        rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3] as [number, number, number],
        scale: 0.08 + Math.random() * 0.16,
      })),
    [count],
  );

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const { hero, velocity } = getScroll();
    g.rotation.y += delta * (0.04 + velocity * 0.2);
    g.position.z = THREE.MathUtils.lerp(g.position.z, hero * 3, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -hero * 0.5, 0.05);
  });

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <Float key={i} speed={1 + (i % 3) * 0.4} rotationIntensity={1.6} floatIntensity={1.8}>
          <mesh position={s.pos} rotation={s.rot} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 2 ? "#a855f7" : "#3b82f6"}
              emissive={i % 2 ? "#7c3aed" : "#1d4ed8"}
              emissiveIntensity={0.7}
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Core({ lite = false }: { lite?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { hero, progress, velocity } = getScroll();
    g.rotation.y += delta * (0.16 + velocity * 0.35) + progress * 0.004;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, hero * 0.6, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * 0.35 - hero * 0.4, 0.05);
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.x * 0.4, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, hero * 1.4, 0.06);
    const pulse = (1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.025) * (1 - hero * 0.28);
    g.scale.setScalar(pulse);
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.65, lite ? 5 : 9]}>
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#3b82f6"
          emissiveIntensity={0.45}
          roughness={0.12}
          metalness={0.92}
          distort={0.48}
          speed={1.6}
        />
      </Icosahedron>
      <Icosahedron args={[2.25, 1]}>
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
      </Icosahedron>
      {!lite ? (
        <Icosahedron args={[2.9, 2]}>
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.07} />
        </Icosahedron>
      ) : null}
    </group>
  );
}

/** Whole rig drifts with the cursor for a parallax, cinematic feel. */
function CameraRig({ lite }: { lite: boolean }) {
  useEffect(() => startScrollSignal(), []);

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const { hero, progress } = getScroll();
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.9 - hero * 1.2, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.6 + hero * 0.5, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 6.5 - hero * 2.2 + progress * 1.2, 2, delta);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, lite ? 0 : progress * 0.25, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({
  onReady,
  lite = false,
  active = true,
}: {
  onReady?: () => void;
  lite?: boolean;
  active?: boolean;
}) {
  // Mobile / lite devices keep the same choreography at a fraction of the amplitude.
  useEffect(() => setScrollIntensity(lite ? 0.4 : 1), [lite]);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? 1 : [1, 1.35]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.getContext("webgl2") ?? null;
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={90} color="#3b82f6" />
      {!lite ? <pointLight position={[-6, -3, 2]} intensity={70} color="#a855f7" /> : null}

      <Stars radius={40} depth={30} count={lite ? 250 : 800} factor={3} saturation={0} fade speed={0.6} />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.1}>
        <Core lite={lite} />
      </Float>

      <OrbitRings />
      {!lite ? (
        <>
          <Electron radius={2.55} speed={0.9} tilt={0.4} color="#60a5fa" />
          <Electron radius={3.6} speed={0.45} tilt={2.0} color="#818cf8" />
          <Shards count={8} />
        </>
      ) : null}

      <NeuralPoints count={lite ? 220 : 550} />
      <CameraRig lite={lite} />
    </Canvas>
  );
}
