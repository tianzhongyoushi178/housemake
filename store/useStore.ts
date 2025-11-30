import { create } from 'zustand';

export type Wall = {
  id: string;
  start: [number, number]; // x, y
  end: [number, number];   // x, y
  thickness: number;       // default 0.15 (meters)
  height: number;          // default 2.4 (meters)
};

export type Opening = { // 窓やドア
  id: string;
  wallId: string;
  type: 'window' | 'door';
  distFromStart: number;   // 壁の始点からの距離
  width: number;
  height: number;
  sillHeight: number;      // 床からの高さ
};

export type RoomUnit = {
  id: string;
  type: 'living' | 'kitchen' | 'toilet' | 'bath' | 'washroom' | 'entrance' | 'stairs' | 'room';
  position: [number, number]; // x, y (center)
  rotation: number;           // rotation around Y in radians
  width: number;              // Unit width (meters)
  depth: number;              // Unit depth (meters)
  walls: Wall[];              // local coordinates relative to unit center
  openings: Opening[];
};

type ProjectState = {
  units: RoomUnit[];
  selectedId: string | null; // ID of the selected RoomUnit
  selectedWallId: string | null; // ID of the selected Wall (within selected unit)
  cameraMode: 'rotate' | 'pan'; // Camera interaction mode

  addUnit: (type: RoomUnit['type']) => void;
  removeUnit: (id: string) => void;
  updateUnit: (id: string, updates: Partial<RoomUnit>) => void;
  selectObject: (id: string | null) => void;
  selectWall: (wallId: string | null) => void;
  removeWallFromUnit: (unitId: string, wallId: string) => void;
  addOpeningToUnitWall: (unitId: string, wallId: string, type: 'window' | 'door') => void;
  addWallToUnit: (unitId: string, direction: 'top' | 'bottom' | 'left' | 'right') => void;
  rotateUnit: (id: string) => void;
  resizeUnit: (id: string, deltaW: number, deltaD: number) => void;
  setCameraMode: (mode: 'rotate' | 'pan') => void;
  clearScene: () => void;
};

// Helper to create default walls for a room type
const createDefaultRoom = (type: RoomUnit['type']): { width: number, depth: number, walls: Wall[], openings: Opening[] } => {
  // Default size 3.6m x 3.6m (2間 x 2間)
  let width = 3.6;
  let depth = 3.6;

  // Adjust size based on type
  if (type === 'toilet') { width = 1.8; depth = 1.8; }
  if (type === 'bath') { width = 1.8; depth = 1.8; }
  if (type === 'washroom') { width = 1.8; depth = 1.8; }
  if (type === 'entrance') { width = 1.8; depth = 1.8; }
  if (type === 'stairs') { width = 1.8; depth = 3.6; }

  // Walls are now initially empty!
  const walls: Wall[] = [];
  const openings: Opening[] = [];

  return { width, depth, walls, openings };
};

export const useStore = create<ProjectState>((set) => ({
  units: [],
  selectedId: null,
  selectedWallId: null,
  cameraMode: 'rotate', // Default to rotate

  addUnit: (type) => set((state) => {
    const id = `unit-${Date.now()}`;
    const { width, depth, walls, openings } = createDefaultRoom(type);

    const newUnit: RoomUnit = {
      id,
      type,
      position: [0, 0], // Default at center
      rotation: 0,
      width,
      depth,
      walls,
      openings,
    };

    return { units: [...state.units, newUnit], selectedId: id, selectedWallId: null };
  }),

  removeUnit: (id) => set((state) => ({
    units: state.units.filter((u) => u.id !== id),
    selectedId: state.selectedId === id ? null : state.selectedId,
    selectedWallId: state.selectedId === id ? null : state.selectedWallId,
  })),

  updateUnit: (id, updates) => set((state) => ({
    units: state.units.map((u) => (u.id === id ? { ...u, ...updates } : u)),
  })),

  selectObject: (id) => set({ selectedId: id, selectedWallId: null }),

  selectWall: (wallId) => set({ selectedWallId: wallId }),

  removeWallFromUnit: (unitId, wallId) => set((state) => ({
    units: state.units.map((u) => {
      if (u.id !== unitId) return u;
      return {
        ...u,
        walls: u.walls.filter((w) => w.id !== wallId),
        openings: u.openings.filter((o) => o.wallId !== wallId), // Remove openings on that wall too
      };
    }),
    selectedWallId: null, // Deselect after removing
  })),

  addOpeningToUnitWall: (unitId, wallId, type) => set((state) => ({
    units: state.units.map((u) => {
      if (u.id !== unitId) return u;

      const wall = u.walls.find(w => w.id === wallId);
      if (!wall) return u;

      // Calculate center position based on wall length
      const dx = wall.end[0] - wall.start[0];
      const dy = wall.end[1] - wall.start[1];
      const length = Math.sqrt(dx * dx + dy * dy);

      const newOpening: Opening = {
        id: `op-${Date.now()}`,
        wallId,
        type,
        distFromStart: length / 2 - (type === 'door' ? 0.4 : 0.8), // Center roughly
        width: type === 'door' ? 0.8 : 1.6,
        height: type === 'door' ? 2.0 : 1.0,
        sillHeight: type === 'door' ? 0 : 0.9,
      };

      return {
        ...u,
        openings: [...u.openings, newOpening],
      };
    }),
  })),

  addWallToUnit: (unitId, direction) => set((state) => ({
    units: state.units.map((u) => {
      if (u.id !== unitId) return u;

      const halfW = u.width / 2;
      const halfD = u.depth / 2;
      let newWall: Wall | null = null;

      // Check if wall already exists roughly in that position? 
      // For simplicity, we just add. User can delete duplicates.
      // Ideally we check ID or position.

      if (direction === 'bottom') {
        newWall = { id: `w-${Date.now()}`, start: [-halfW, -halfD], end: [halfW, -halfD], thickness: 0.15, height: 2.4 };
      } else if (direction === 'right') {
        newWall = { id: `w-${Date.now()}`, start: [halfW, -halfD], end: [halfW, halfD], thickness: 0.15, height: 2.4 };
      } else if (direction === 'top') {
        newWall = { id: `w-${Date.now()}`, start: [halfW, halfD], end: [-halfW, halfD], thickness: 0.15, height: 2.4 };
      } else if (direction === 'left') {
        newWall = { id: `w-${Date.now()}`, start: [-halfW, halfD], end: [-halfW, -halfD], thickness: 0.15, height: 2.4 };
      }

      if (!newWall) return u;

      return {
        ...u,
        walls: [...u.walls, newWall],
      };
    }),
  })),

  rotateUnit: (id) => set((state) => ({
    units: state.units.map((u) => {
      if (u.id !== id) return u;
      return { ...u, rotation: u.rotation - Math.PI / 2 }; // Rotate 90 degrees clockwise
    }),
  })),

  resizeUnit: (id, deltaW, deltaD) => set((state) => ({
    units: state.units.map((u) => {
      if (u.id !== id) return u;

      const newWidth = Math.max(0.91, u.width + deltaW); // Min size 0.91m
      const newDepth = Math.max(0.91, u.depth + deltaD);

      const oldHalfW = u.width / 2;
      const oldHalfD = u.depth / 2;
      const newHalfW = newWidth / 2;
      const newHalfD = newDepth / 2;

      // Adjust walls
      const newWalls = u.walls.map(w => {
        const { start, end } = w;
        let newStart = [...start] as [number, number];
        let newEnd = [...end] as [number, number];

        // Check if wall is on an edge (approximate)
        const isTop = Math.abs(start[1] - oldHalfD) < 0.01 && Math.abs(end[1] - oldHalfD) < 0.01;
        const isBottom = Math.abs(start[1] + oldHalfD) < 0.01 && Math.abs(end[1] + oldHalfD) < 0.01;
        const isRight = Math.abs(start[0] - oldHalfW) < 0.01 && Math.abs(end[0] - oldHalfW) < 0.01;
        const isLeft = Math.abs(start[0] + oldHalfW) < 0.01 && Math.abs(end[0] + oldHalfW) < 0.01;

        if (isTop) {
          newStart[1] = newHalfD; newEnd[1] = newHalfD;
          // Scale length if it spans the full width
          if (Math.abs(Math.abs(start[0] - end[0]) - u.width) < 0.1) {
            newStart[0] = start[0] < end[0] ? -newHalfW : newHalfW;
            newEnd[0] = start[0] < end[0] ? newHalfW : -newHalfW;
          }
        }
        if (isBottom) {
          newStart[1] = -newHalfD; newEnd[1] = -newHalfD;
          if (Math.abs(Math.abs(start[0] - end[0]) - u.width) < 0.1) {
            newStart[0] = start[0] < end[0] ? -newHalfW : newHalfW;
            newEnd[0] = start[0] < end[0] ? newHalfW : -newHalfW;
          }
        }
        if (isRight) {
          newStart[0] = newHalfW; newEnd[0] = newHalfW;
          if (Math.abs(Math.abs(start[1] - end[1]) - u.depth) < 0.1) {
            newStart[1] = start[1] < end[1] ? -newHalfD : newHalfD;
            newEnd[1] = start[1] < end[1] ? newHalfD : -newHalfD;
          }
        }
        if (isLeft) {
          newStart[0] = -newHalfW; newEnd[0] = -newHalfW;
          if (Math.abs(Math.abs(start[1] - end[1]) - u.depth) < 0.1) {
            newStart[1] = start[1] < end[1] ? -newHalfD : newHalfD;
            newEnd[1] = start[1] < end[1] ? newHalfD : -newHalfD;
          }
        }

        return { ...w, start: newStart, end: newEnd };
      });

      return { ...u, width: newWidth, depth: newDepth, walls: newWalls };
    }),
  })),

  setCameraMode: (mode) => set({ cameraMode: mode }),

  clearScene: () => set({ units: [], selectedId: null, selectedWallId: null }),
}));
