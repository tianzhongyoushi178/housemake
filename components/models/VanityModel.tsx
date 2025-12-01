'use client';

import React from 'react';

export const VanityModel = () => {
    return (
        <group position={[0, 0, -0.4]}>
            {/* Cabinet Body */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.75, 0.8, 0.5]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>

            {/* Cabinet Doors */}
            <group position={[0, 0.4, 0.26]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.01, 0.75, 0.01]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                {/* Handles */}
                <mesh position={[-0.2, 0.1, 0.02]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.1]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
                <mesh position={[0.2, 0.1, 0.02]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.1]} />
                    <meshStandardMaterial color="#888" metalness={0.8} />
                </mesh>
            </group>

            {/* Countertop & Basin */}
            <group position={[0, 0.82, 0]}>
                <mesh>
                    <boxGeometry args={[0.78, 0.04, 0.52]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Basin Visual */}
                <mesh position={[0, 0.021, 0.05]}>
                    <boxGeometry args={[0.5, 0.01, 0.35]} />
                    <meshStandardMaterial color="#eee" />
                </mesh>
                <mesh position={[0, 0.01, 0.05]}>
                    <boxGeometry args={[0.45, 0.01, 0.3]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
            </group>

            {/* Faucet */}
            <group position={[0, 0.84, -0.15]}>
                <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.02, 0.025, 0.1]} />
                    <meshStandardMaterial color="#ccc" metalness={0.9} />
                </mesh>
                <mesh position={[0, 0.12, 0.08]} rotation={[Math.PI / 4, 0, 0]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.15]} />
                    <meshStandardMaterial color="#ccc" metalness={0.9} />
                </mesh>
                {/* Handle */}
                <mesh position={[0.05, 0.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <cylinderGeometry args={[0.005, 0.005, 0.1]} />
                    <meshStandardMaterial color="#ccc" metalness={0.9} />
                </mesh>
            </group>

            {/* Mirror */}
            <group position={[0, 1.4, -0.24]}>
                <mesh>
                    <boxGeometry args={[0.7, 0.8, 0.02]} />
                    <meshStandardMaterial color="#eef" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Frame */}
                <mesh position={[0, 0, -0.015]}>
                    <boxGeometry args={[0.74, 0.84, 0.02]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>

            {/* Lights */}
            <group position={[0, 1.85, -0.15]}>
                <mesh position={[-0.2, 0, 0]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.2, 0, 0]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </group>
    );
};
