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

            {/* Bathtub */}
            <group position={[0.4, 0.3, 0]}>
                <mesh>
                    <boxGeometry args={[0.7, 0.5, 1.5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Water (Visual) */}
                <mesh position={[0, 0.26, 0]}>
                    <planeGeometry args={[0.6, 1.4]} />
                    <meshStandardMaterial color="#aaddff" />
                </mesh>
            </group>

            {/* Washing Area Faucet */}
            <mesh position={[-0.4, 0.6, -0.75]}>
                <boxGeometry args={[0.2, 0.1, 0.1]} />
                <meshStandardMaterial color="#ccc" metalness={0.8} />
            </mesh>
        </group>
    );
};
