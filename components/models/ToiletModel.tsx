'use client';

import React from 'react';

export const ToiletModel = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Tank */}
            <group position={[0, 0.8, -0.6]}>
                <mesh>
                    <boxGeometry args={[0.4, 0.4, 0.2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Lid */}
                <mesh position={[0, 0.21, 0]}>
                    <boxGeometry args={[0.42, 0.02, 0.22]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Lever */}
                <mesh position={[0.15, 0.15, 0.11]} rotation={[0, 0, -0.2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.08]} />
                    <meshStandardMaterial color="#ccc" metalness={0.8} />
                </mesh>
            </group>

            {/* Bowl Base */}
            <group position={[0, 0, -0.2]}>
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[0.18, 0.22, 0.4]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Rim */}
                <mesh position={[0, 0.41, 0.05]}>
                    <cylinderGeometry args={[0.18, 0.18, 0.05]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Inner Water (Visual) */}
                <mesh position={[0, 0.38, 0.05]}>
                    <cylinderGeometry args={[0.12, 0.1, 0.02]} />
                    <meshStandardMaterial color="#aaddff" />
                </mesh>
            </group>

            {/* Seat/Lid */}
            <group position={[0, 0.44, -0.15]} rotation={[-0.1, 0, 0]}>
                <mesh position={[0, 0, 0.1]}>
                    <boxGeometry args={[0.36, 0.02, 0.45]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </group>

            {/* Paper Holder */}
            <group position={[0.45, 0.6, -0.2]}>
                <mesh>
                    <boxGeometry args={[0.02, 0.05, 0.1]} />
                    <meshStandardMaterial color="#ccc" metalness={0.5} />
                </mesh>
                {/* Paper Roll */}
                <mesh position={[0.05, -0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.12]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </group>
        </group>
    );
};
