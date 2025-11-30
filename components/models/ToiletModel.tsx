'use client';

import React from 'react';

export const ToiletModel = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Tank */}
            <mesh position={[0, 0.8, -0.6]}>
                <boxGeometry args={[0.4, 0.4, 0.2]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Bowl Base */}
            <mesh position={[0, 0.2, -0.2]}>
                <cylinderGeometry args={[0.15, 0.2, 0.4]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Seat/Lid */}
            <mesh position={[0, 0.42, -0.1]}>
                <cylinderGeometry args={[0.18, 0.18, 0.05]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Paper Holder */}
            <mesh position={[0.4, 0.6, -0.2]}>
                <boxGeometry args={[0.15, 0.05, 0.1]} />
                <meshStandardMaterial color="#ccc" metalness={0.5} />
            </mesh>
        </group>
    );
};
