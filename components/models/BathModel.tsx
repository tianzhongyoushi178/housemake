'use client';

import React from 'react';

export const BathModel = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Floor */}
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[1.6, 0.1, 1.6]} />
                <meshStandardMaterial color="#ddd" />
            </mesh>
            {/* Drain */}
            <mesh position={[-0.5, 0.101, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.08, 32]} />
                <meshStandardMaterial color="#aaa" />
            </mesh>

            {/* Bathtub (Hollow-ish look) */}
            <group position={[0.4, 0.3, 0]}>
                {/* Outer Shell */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.7, 0.5, 1.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Inner Hollow (Visual - slightly smaller box on top) */}
                <mesh position={[0, 0.251, 0]}>
                    <boxGeometry args={[0.55, 0.02, 1.35]} />
                    <meshStandardMaterial color="#aaddff" opacity={0.8} transparent />
                </mesh>
                {/* Rim */}
                <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[0.7, 0.05, 1.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </group>

            {/* Washing Area Faucet & Mirror */}
            <group position={[-0.4, 0, -0.75]}>
                {/* Counter */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[0.6, 0.05, 0.2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Mirror */}
                <mesh position={[0, 1.2, 0.05]}>
                    <planeGeometry args={[0.5, 0.8]} />
                    <meshStandardMaterial color="#fff" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Faucet */}
                <mesh position={[0, 0.6, 0.05]}>
                    <boxGeometry args={[0.15, 0.1, 0.1]} />
                    <meshStandardMaterial color="#ccc" metalness={0.8} />
                </mesh>
            </group>

            {/* Shower */}
            <group position={[-0.7, 1.8, 0]}>
                <mesh rotation={[0, 0, -Math.PI / 4]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                    <meshStandardMaterial color="#ccc" metalness={0.8} />
                </mesh>
                <mesh position={[0.1, -0.1, 0]}>
                    <cylinderGeometry args={[0.05, 0.01, 0.1]} />
                    <meshStandardMaterial color="#ccc" metalness={0.8} />
                </mesh>
            </group>

            {/* Door Frame (Visual) */}
            <group position={[0, 1.0, 0.8]}>
                <mesh position={[0.4, 0, 0]}>
                    <boxGeometry args={[0.05, 2.0, 0.05]} />
                    <meshStandardMaterial color="#ccc" />
                </mesh>
                <mesh position={[-0.4, 0, 0]}>
                    <boxGeometry args={[0.05, 2.0, 0.05]} />
                    <meshStandardMaterial color="#ccc" />
                </mesh>
                <mesh position={[0, 1.0, 0]}>
                    <boxGeometry args={[0.85, 0.05, 0.05]} />
                    <meshStandardMaterial color="#ccc" />
                </mesh>
            </group>
        </group>
    );
};
