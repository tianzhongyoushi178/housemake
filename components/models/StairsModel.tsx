'use client';

'use client';

import React from 'react';

export const StairsModel = () => {
    const steps = 14;
    const stepHeight = 0.2;
    const stepDepth = 0.25;
    const stepWidth = 1.6; // Increased width (approx unit width 1.8m - walls)

    return (
        <group position={[0, 0, -1.0]}>
            {/* Steps */}
            {Array.from({ length: steps }).map((_, i) => (
                <group key={i} position={[0, i * stepHeight + stepHeight / 2, i * stepDepth]}>
                    <mesh>
                        <boxGeometry args={[stepWidth, stepHeight, stepDepth]} />
                        <meshStandardMaterial color="#d4a373" />
                    </mesh>
                    {/* Nosing (Tip of the step) */}
                    <mesh position={[0, stepHeight / 2 - 0.01, stepDepth / 2]}>
                        <boxGeometry args={[stepWidth, 0.02, 0.02]} />
                        <meshStandardMaterial color="#c49363" />
                    </mesh>
                </group>
            ))}
        </group>
    );
};
