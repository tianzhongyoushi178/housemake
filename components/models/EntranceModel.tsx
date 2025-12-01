'use client';

import React from 'react';

export const EntranceModel = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Tataki (Lower floor) */}
            <mesh position={[0, 0.05, 0.5]}>
                <boxGeometry args={[1.6, 0.1, 1.0]} />
                <meshStandardMaterial color="#888" roughness={0.8} />
            </mesh>

            {/* Hallway Floor (Higher) */}
            <mesh position={[0, 0.2, -0.5]}>
                <boxGeometry args={[1.6, 0.4, 1.0]} />
                <meshStandardMaterial color="#d4a373" />
            </mesh>

            {/* Kamachi (Step Edge) */}
            <mesh position={[0, 0.2, 0.0]}>
                <boxGeometry args={[1.6, 0.4, 0.05]} />
                <meshStandardMaterial color="#a07050" />
            </mesh>

            {/* Shoe Box */}
            <group position={[0.6, 1.0, 0.5]}>
                <mesh>
                    <boxGeometry args={[0.35, 2.0, 0.8]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                {/* Doors */}
                <mesh position={[-0.18, 0, 0]}>
                    <boxGeometry args={[0.01, 1.9, 0.75]} />
                    <meshStandardMaterial color="#f9f9f9" />
                </mesh>
                {/* Handle */}
                <mesh position={[-0.19, 0, 0.2]}>
                    <boxGeometry args={[0.02, 0.2, 0.02]} />
                    <meshStandardMaterial color="#ccc" metalness={0.5} />
                </mesh>
            </group>

            {/* Entrance Door (Visual) */}
            <group position={[0, 1.1, 1.0]}>
                <mesh position={[0.75, 0, 0]}>
                    <boxGeometry args={[0.1, 2.2, 0.1]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[-0.75, 0, 0]}>
                    <boxGeometry args={[0.1, 2.2, 0.1]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[0, 1.05, 0]}>
                    <boxGeometry args={[1.6, 0.1, 0.1]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
        </group>
    );
};
