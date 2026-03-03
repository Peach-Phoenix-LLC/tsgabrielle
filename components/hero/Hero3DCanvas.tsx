"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function HolographicCube() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh rotation={[0.4, 0.8, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#cb5c31" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export function Hero3DCanvas() {
  return (
    <div className="h-[340px] w-full overflow-hidden rounded-2xl border border-peach shadow-luxe">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 3, 3]} intensity={1.2} />
        <HolographicCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
