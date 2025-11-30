'use client';

import React from 'react';

export const VanityModel = () => {
    return (
        <group position={[0, 0, -0.4]}>
            {/* Cabinet */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.75, 0.8, 0.5]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>

            {/* Basin */}
            <mesh position={[0, 0.82, 0]}>
                <boxGeometry args={[0.75, 0.05, 0.52]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Mirror */}
            <mesh position={[0, 1.4, -0.24]}>
                <boxGeometry args={[0.7, 0.8, 0.02]} />
                <meshStandardMaterial color="#eef" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
};
