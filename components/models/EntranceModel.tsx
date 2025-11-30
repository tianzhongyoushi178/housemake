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

            {/* Shoe Box */}
            <mesh position={[0.6, 1.0, 0.5]}>
                <boxGeometry args={[0.35, 2.0, 0.8]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
        </group>
    );
};
