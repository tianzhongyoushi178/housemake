'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Outlines } from '@react-three/drei';
import { useStore, Wall, RoomUnit } from '@/store/useStore';
import * as THREE from 'three';
import { useRef } from 'react';

// Import Models
import { KitchenModel } from '@/components/models/KitchenModel';
import { BathModel } from '@/components/models/BathModel';
import { ToiletModel } from '@/components/models/ToiletModel';
import { VanityModel } from '@/components/models/VanityModel';
import { StairsModel } from '@/components/models/StairsModel';
import { EntranceModel } from '@/components/models/EntranceModel';

// Helper to calculate wall properties (Local coordinates)
const getWallTransform = (start: [number, number], end: [number, number], height: number, thickness: number) => {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const cx = (start[0] + end[0]) / 2;
    const cy = (start[1] + end[1]) / 2;

    // 2D (x, y) -> 3D (x, 0, y)
    const position = new THREE.Vector3(cx, height / 2, cy);
    const rotation = [0, -angle, 0] as [number, number, number];

    return { position, rotation, length };
};

const WallMesh = ({ wall, isSelected, onSelect }: { wall: Wall; isSelected: boolean; onSelect: (e: any) => void }) => {
    const { start, end, height, thickness } = wall;
    const { position, rotation, length } = getWallTransform(start, end, height, thickness);

    return (
        <mesh
            position={position}
            rotation={rotation}
            onClick={onSelect}
        >
            <boxGeometry args={[length, height, thickness]} />
            <meshStandardMaterial color={isSelected ? "#ff9999" : "#e5e5e5"} />
            {isSelected && <Outlines thickness={0.05} color="red" />}
        </mesh>
    );
};

const OpeningMesh = ({ opening, walls }: { opening: any; walls: any[] }) => {
    const wall = walls.find((w) => w.id === opening.wallId);
    if (!wall) return null;

    const { start, end, height: wallHeight, thickness } = wall;
    const { distFromStart, width, height, sillHeight } = opening;

    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const wallLength = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const dirX = dx / wallLength;
    const dirY = dy / wallLength;

    const centerXDist = distFromStart + width / 2;
    const cx = start[0] + dirX * centerXDist;
    const cy = start[1] + dirY * centerXDist;

    const position = new THREE.Vector3(cx, sillHeight + height / 2, cy);
    const rotation = [0, -angle, 0] as [number, number, number];

    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={[width, height, thickness + 0.05]} />
            <meshStandardMaterial color="#88ccff" transparent opacity={0.3} />
        </mesh>
    );
};

const RoomUnitMesh = ({ unit, isSelected, selectedWallId, onSelectWall, onSelectUnit }: {
    unit: RoomUnit;
    isSelected: boolean;
    selectedWallId: string | null;
    onSelectWall: (wallId: string) => void;
    onSelectUnit: (e: any) => void;
}) => {
    return (
        <group onClick={onSelectUnit}>
            {/* Floor (Base) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[unit.width, unit.depth]} />
                <meshStandardMaterial color="#f0f0f0" side={THREE.DoubleSide} />
            </mesh>

            {/* Walls & Openings */}
            {unit.walls.map((wall) => (
                <WallMesh
                    key={wall.id}
                    wall={wall}
                    isSelected={isSelected && selectedWallId === wall.id}
                    onSelect={(e) => {
                        if (isSelected) {
                            e.stopPropagation();
                            onSelectWall(wall.id);
                        }
                    }}
                />
            ))}
            {unit.openings.map((opening) => (
                <OpeningMesh key={opening.id} opening={opening} walls={unit.walls} />
            ))}

            {/* Render Specific Models based on Type */}
            {unit.type === 'kitchen' && <KitchenModel />}
            {unit.type === 'bath' && <BathModel />}
            {unit.type === 'toilet' && <ToiletModel />}
            {unit.type === 'washroom' && <VanityModel />}
            {unit.type === 'stairs' && <StairsModel />}
            {unit.type === 'entrance' && <EntranceModel />}

            {/* Selection Highlight (Outline) */}
            {isSelected && (
                <mesh position={[0, 1.2, 0]}>
                    <boxGeometry args={[unit.width + 0.05, 2.45, unit.depth + 0.05]} /> {/* Approximate bounding box */}
                    <meshBasicMaterial visible={false} />
                    <Outlines thickness={0.05} color="#4a9eff" />
                </mesh>
            )}
        </group>
    );
};

const SceneContent = () => {
    const { units, selectedId, selectedWallId, selectObject, selectWall, updateUnit } = useStore();
    const transformRef = useRef<any>(null);

    const handleTransformEnd = () => {
        if (!transformRef.current || !selectedId) return;
        const object = transformRef.current.object;
        if (!object) return;

        // Update unit position/rotation from the transformed object
        const newPos = object.position;
        const newRot = object.rotation;

        updateUnit(selectedId, {
            position: [newPos.x, newPos.z],
            rotation: newRot.y,
        });
    };

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <gridHelper args={[20, 22]} /> {/* 20m size, 22 divisions ~ 0.91m spacing */}

            <group onPointerMissed={(e) => e.type === 'click' && selectObject(null)}>
                {units.map((unit) => {
                    const isSelected = selectedId === unit.id;

                    if (isSelected) {
                        // Render inside TransformControls
                        return (
                            <TransformControls
                                key={unit.id}
                                ref={transformRef}
                                position={[unit.position[0], 0, unit.position[1]]}
                                rotation={[0, unit.rotation, 0]}
                                onMouseUp={handleTransformEnd}
                                mode="translate"
                                translationSnap={0.91} // 910mm snap
                                rotationSnap={Math.PI / 2} // 90 degree snap
                            >
                                <RoomUnitMesh
                                    unit={unit}
                                    isSelected={true}
                                    selectedWallId={selectedWallId}
                                    onSelectWall={selectWall}
                                    onSelectUnit={(e) => {
                                        e.stopPropagation();
                                        // Already selected
                                    }}
                                />
                            </TransformControls>
                        );
                    } else {
                        // Render normally
                        return (
                            <group
                                key={unit.id}
                                position={[unit.position[0], 0, unit.position[1]]}
                                rotation={[0, unit.rotation, 0]}
                            >
                                <RoomUnitMesh
                                    unit={unit}
                                    isSelected={false}
                                    selectedWallId={null}
                                    onSelectWall={() => { }}
                                    onSelectUnit={(e) => {
                                        e.stopPropagation();
                                        selectObject(unit.id);
                                    }}
                                />
                            </group>
                        );
                    }
                })}
            </group>
        </>
    );
};

export default function Scene3D() {
    const cameraMode = useStore((state) => state.cameraMode);

    return (
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <OrbitControls
                makeDefault
                mouseButtons={{
                    LEFT: cameraMode === 'rotate' ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: THREE.MOUSE.PAN
                }}
                touches={{
                    ONE: cameraMode === 'rotate' ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN,
                    TWO: THREE.TOUCH.DOLLY_PAN
                }}
            />
            <SceneContent />
        </Canvas>
    );
}
