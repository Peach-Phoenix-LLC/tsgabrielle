"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Float, Stage, Environment } from "@react-three/drei";
import { Suspense } from "react";

// Asset path mapped as per Infrastructure Directive
const MODEL_PATH = "/assets/models/pink-flamingo-noir-jacket.gltf";

function ProductModel() {
  const { scene } = useGLTF(MODEL_PATH);
  
  return (
    <Float 
      speed={1.5}          // Matches your sin(elapsedTime * 1.5)
      rotationIntensity={0.5} 
      floatIntensity={0.1} // Matches your 0.1 amplitude
    >
      <primitive object={scene} scale={1.5} />
    </Float>
  );
}

export default function SpatialProductViewer() {
  return (
    <div className="w-full h-[600px] zero-gravity-element">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <ProductModel />
          </Stage>
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
