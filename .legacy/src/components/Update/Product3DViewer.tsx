'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';

const ProductMesh = ({ url }: { url: string }) => {
    const texture = useTexture(url || "https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/transparent_bg.png");

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Center top>
                <mesh castShadow>
                    <planeGeometry args={[3, 4]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        side={THREE.DoubleSide}
                    />
                </mesh>
                {/* Holographic Foil Layer */}
                <mesh position={[0, 0, 0.01]}>
                    <planeGeometry args={[3, 4]} />
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.1}
                        transmission={0.5}
                        thickness={1}
                        roughness={0.1}
                        metalness={0.8}
                        iridescence={1}
                        iridescenceIOR={1.5}
                    />
                </mesh>
            </Center>
        </Float>
    );
};

const Product3DViewer = ({ primaryImageUrl }: { primaryImageUrl: string }) => {
    return (
        <div className="w-full aspect-[3/4] rounded-[32px] overflow-hidden bg-[#f7f7f7] relative cursor-grab active:cursor-grabbing">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                    <ProductMesh url={primaryImageUrl} />
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                </Suspense>
            </Canvas>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-[32px]" />
            <div className="absolute bottom-8 right-8 text-[10px] font-light text-[#a932bd] uppercase tracking-[0.3em] opacity-40">
                3D Interactive Perspective
            </div>
        </div>
    );
};

export default Product3DViewer;
