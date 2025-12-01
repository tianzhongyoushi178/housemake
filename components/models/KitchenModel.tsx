'use client';

import React from 'react';

export const KitchenModel = () => {
    return (
        <group position={[0, 0, -1.2]}> {/* Position at the back of the room */}
            {/* Base Cabinet Body */}
            <mesh position={[0, 0.425, 0]}>
                <boxGeometry args={[2.4, 0.85, 0.65]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>

            {/* Cabinet Doors/Drawers Lines */}
            <group position={[0, 0.425, 0.33]}>
                {/* Vertical Divider */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.02, 0.8, 0.01]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                {/* Horizontal Divider (Top Drawer) */}
                <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[2.3, 0.02, 0.01]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                {/* Handles */}
                <mesh position={[-0.6, 0.3, 0.02]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
                <mesh position={[0.6, 0.3, 0.02]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
                <mesh position={[-0.6, -0.1, 0.02]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
                <mesh position={[0.6, -0.1, 0.02]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
            </group>

            {/* Countertop */}
            <mesh position={[0, 0.86, 0]}>
                <boxGeometry args={[2.45, 0.02, 0.67]} />
                <meshStandardMaterial color="#333" roughness={0.2} />
            </mesh>

            {/* Sink Area */}
            <group position={[-0.6, 0.87, 0.1]}>
                {/* Sink Basin (Visual) */}
                <mesh position={[0, -0.05, 0]}>
                    <boxGeometry args={[0.7, 0.15, 0.45]} />
                    <meshStandardMaterial color="#ddd" metalness={0.5} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.65, 0.4]} />
                    <meshStandardMaterial color="#aaa" metalness={0.6} roughness={0.2} />
                </mesh>

                {/* Faucet */}
                <group position={[0, 0, -0.25]}>
                    <mesh position={[0, 0.15, 0]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                        <meshStandardMaterial color="#ccc" metalness={0.9} />
                    </mesh>
                    <mesh position={[0, 0.3, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.2]} />
                        <meshStandardMaterial color="#ccc" metalness={0.9} />
                    </mesh>
                </group>
            </group>

            {/* Stove Area */}
            <group position={[0.6, 0.87, 0.1]}>
                {/* Stove Top */}
                <mesh>
                    <boxGeometry args={[0.6, 0.02, 0.45]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Burners */}
                <mesh position={[-0.15, 0.015, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[0.15, 0.015, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[-0.15, 0.015, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.06, 32]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>

            {/* Range Hood */}
            <group position={[0.6, 2.0, 0.1]}>
                <mesh>
                    <boxGeometry args={[0.75, 0.1, 0.5]} />
                    <meshStandardMaterial color="#ddd" metalness={0.5} />
                </mesh>
                <mesh position={[0, 0.25, 0]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshStandardMaterial color="#ddd" metalness={0.5} />
                </mesh>
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    <meshStandardMaterial color="#ccc" metalness={0.5} />
                </mesh>
            </group>

            {/* Upper Cabinet */}
            <group position={[-0.6, 2.0, 0]}>
                <mesh>
                    <boxGeometry args={[1.2, 0.6, 0.35]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>
                {/* Doors */}
                <mesh position={[0, 0, 0.18]}>
                    <boxGeometry args={[0.01, 0.58, 0.01]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                <mesh position={[-0.3, -0.2, 0.18]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.1]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
                <mesh position={[0.3, -0.2, 0.18]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.1]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
            </group>
        </group>
    );
};
