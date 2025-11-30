'use client';

import React from 'react';

export const StairsModel = () => {
    const steps = 14;
    const stepHeight = 0.2;
    const stepDepth = 0.25;
    const stepWidth = 0.9;

    return (
        <group position={[0, 0, -1.0]}>
            {Array.from({ length: steps }).map((_, i) => (
                <mesh
                    key={i}
                    position={[0, i * stepHeight + stepHeight / 2, i * stepDepth]}
                >
                    <boxGeometry args={[stepWidth, stepHeight, stepDepth]} />
                    <meshStandardMaterial color="#d4a373" />
                </mesh>
            ))}
            {/* Handrail (Simplified) */}
            <mesh
                position={[0.4, steps * stepHeight / 2 + 0.5, steps * stepDepth / 2]}
                rotation={[Math.atan2(stepHeight, stepDepth), 0, 0]}
            >
                <boxGeometry args={[0.05, 0.05, steps * stepDepth * 1.5]} />
                <meshStandardMaterial color="#8d5524" />
            </mesh>
        </group>
    );
};
