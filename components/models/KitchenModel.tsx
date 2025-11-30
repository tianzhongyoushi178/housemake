'use client';

import React from 'react';

export const KitchenModel = () => {
    return (
        <group position={[0, 0, -1.2]}> {/* Position at the back of the room */}
            {/* Base Cabinet */}
            <mesh position={[0, 0.425, 0]}>
                <boxGeometry args={[2.4, 0.85, 0.65]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>

            {/* Countertop */}
            <mesh position={[0, 0.86, 0]}>
                <boxGeometry args={[2.45, 0.02, 0.67]} />
                <meshStandardMaterial color="#333" roughness={0.2} />
            </mesh>

            {/* Sink (Visual representation) */}
            <mesh position={[-0.6, 0.87, 0.1]}>
                <boxGeometry args={[0.6, 0.01, 0.4]} />
                <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Stove (Visual representation) */}
            <mesh position={[0.6, 0.87, 0.1]}>
                <boxGeometry args={[0.6, 0.02, 0.4]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Range Hood */}
            <group position={[0.6, 2.0, 0.1]}>
                <mesh>
                    <boxGeometry args={[0.6, 0.4, 0.4]} />
                    <meshStandardMaterial color="#ccc" metalness={0.5} />
                </mesh>
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.5]} />
                    <meshStandardMaterial color="#ccc" metalness={0.5} />
                </mesh>
            </group>

            {/* Upper Cabinet */}
            <mesh position={[-0.6, 2.0, 0]}>
                <boxGeometry args={[1.2, 0.6, 0.35]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>
        </group>
    );
};
