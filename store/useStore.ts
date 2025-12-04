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

  // History
  past: RoomUnit[][];
  future: RoomUnit[][];

  addUnit: (type: RoomUnit['type']) => void;
  removeUnit: (id: string) => void;
  updateUnit: (id: string, updates: Partial<RoomUnit>) => void;
  selectObject: (id: string | null) => void;
  selectWall: (wallId: string | null) => void;
  removeWallFromUnit: (unitId: string, wallId: string) => void;
  addOpeningToUnitWall: (unitId: string, wallId: string, type: 'window' | 'door') => void;
  toggleWallOnUnit: (unitId: string, direction: 'top' | 'bottom' | 'left' | 'right') => void;
  rotateUnit: (id: string) => void;
  resizeUnit: (id: string, deltaW: number, deltaD: number) => void;
  setCameraMode: (mode: 'rotate' | 'pan') => void;
  clearScene: () => void;
  undo: () => void;
  redo: () => void;

  // AI Generation
  isAIModalOpen: boolean;
  setAIModalOpen: (isOpen: boolean) => void;
  loadLayout: (newUnits: RoomUnit[]) => void;
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

export const useStore = create<ProjectState>((set, get) => ({
  units: [],
  selectedId: null,
  selectedWallId: null,
  cameraMode: 'rotate', // Default to rotate
  past: [],
  future: [],

  // Helper to save history
  saveHistory: () => {
    const { units, past } = get();
    // Limit history size if needed, e.g., 50
    const newPast = [...past, units];
    if (newPast.length > 50) newPast.shift();
    set({ past: newPast, future: [] });
  },

  addUnit: (type) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] }); // Save history manually inside action for now or use middleware. 
    // Actually, let's just do it inline for simplicity and clarity.

    set((state) => {
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
    });
  },

  removeUnit: (id) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.filter((u) => u.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
      selectedWallId: state.selectedId === id ? null : state.selectedWallId,
    }));
  },

  updateUnit: (id, updates) => {
    // Note: updateUnit is called frequently during drag. We might not want to save history on every frame.
    // Ideally, we save history on drag start/end. But for now, let's assume this is called on drag end.
    // If it's called on every frame, this will flood history.
    // The current implementation in Scene3D calls it onMouseUp (handleTransformEnd), so it's safe!
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    }));
  },

  selectObject: (id) => set({ selectedId: id, selectedWallId: null }), // Selection doesn't need history

  selectWall: (wallId) => set({ selectedWallId: wallId }), // Selection doesn't need history

  removeWallFromUnit: (unitId, wallId) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.map((u) => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          walls: u.walls.filter((w) => w.id !== wallId),
          openings: u.openings.filter((o) => o.wallId !== wallId),
        };
      }),
      selectedWallId: null,
    }));
  },

  addOpeningToUnitWall: (unitId, wallId, type) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.map((u) => {
        if (u.id !== unitId) return u;

        const wall = u.walls.find(w => w.id === wallId);
        if (!wall) return u;

        const dx = wall.end[0] - wall.start[0];
        const dy = wall.end[1] - wall.start[1];
        const length = Math.sqrt(dx * dx + dy * dy);

        const newOpening: Opening = {
          id: `op-${Date.now()}`,
          wallId,
          type,
          distFromStart: length / 2 - (type === 'door' ? 0.4 : 0.8),
          width: type === 'door' ? 0.8 : 1.6,
          height: type === 'door' ? 2.0 : 1.0,
          sillHeight: type === 'door' ? 0 : 0.9,
        };

        return {
          ...u,
          openings: [...u.openings, newOpening],
        };
      }),
    }));
  },

  toggleWallOnUnit: (unitId, direction) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.map((u) => {
        if (u.id !== unitId) return u;

        const halfW = u.width / 2;
        const halfD = u.depth / 2;

        // Check if wall exists on this edge
        // We define "exists" as having a wall that roughly matches the edge coordinates
        const existingWallIndex = u.walls.findIndex(w => {
          const { start, end } = w;
          if (direction === 'top') {
            return Math.abs(start[1] - halfD) < 0.01 && Math.abs(end[1] - halfD) < 0.01;
          }
          if (direction === 'bottom') {
            return Math.abs(start[1] + halfD) < 0.01 && Math.abs(end[1] + halfD) < 0.01;
          }
          if (direction === 'right') {
            return Math.abs(start[0] - halfW) < 0.01 && Math.abs(end[0] - halfW) < 0.01;
          }
          if (direction === 'left') {
            return Math.abs(start[0] + halfW) < 0.01 && Math.abs(end[0] + halfW) < 0.01;
          }
          return false;
        });

        if (existingWallIndex !== -1) {
          // Remove existing wall
          const wallId = u.walls[existingWallIndex].id;
          return {
            ...u,
            walls: u.walls.filter((_, i) => i !== existingWallIndex),
            openings: u.openings.filter(o => o.wallId !== wallId) // Remove associated openings
          };
        }

        // Add new wall
        let newWall: Wall | null = null;
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
    }));
  },

  rotateUnit: (id) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.map((u) => {
        if (u.id !== id) return u;
        return { ...u, rotation: u.rotation - Math.PI / 2 };
      }),
    }));
  },

  resizeUnit: (id, deltaW, deltaD) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });

    set((state) => ({
      units: state.units.map((u) => {
        if (u.id !== id) return u;

        const newWidth = Math.max(0.91, u.width + deltaW);
        const newDepth = Math.max(0.91, u.depth + deltaD);

        const oldHalfW = u.width / 2;
        const oldHalfD = u.depth / 2;
        const newHalfW = newWidth / 2;
        const newHalfD = newDepth / 2;

        const newWalls = u.walls.map(w => {
          const { start, end } = w;
          let newStart = [...start] as [number, number];
          let newEnd = [...end] as [number, number];

          const isTop = Math.abs(start[1] - oldHalfD) < 0.01 && Math.abs(end[1] - oldHalfD) < 0.01;
          const isBottom = Math.abs(start[1] + oldHalfD) < 0.01 && Math.abs(end[1] + oldHalfD) < 0.01;
          const isRight = Math.abs(start[0] - oldHalfW) < 0.01 && Math.abs(end[0] - oldHalfW) < 0.01;
          const isLeft = Math.abs(start[0] + oldHalfW) < 0.01 && Math.abs(end[0] + oldHalfW) < 0.01;

          if (isTop) {
            newStart[1] = newHalfD; newEnd[1] = newHalfD;
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
    }));
  },

  setCameraMode: (mode) => set({ cameraMode: mode }),

  clearScene: () => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });
    set({ units: [], selectedId: null, selectedWallId: null });
  },

  undo: () => set((state) => {
    if (state.past.length === 0) return state;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    return {
      units: previous,
      past: newPast,
      future: [state.units, ...state.future],
      selectedId: null, // Deselect on undo to avoid issues
      selectedWallId: null
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    return {
      units: next,
      past: [...state.past, state.units],
      future: newFuture,
      selectedId: null,
      selectedWallId: null
    };
  }),

  isAIModalOpen: false,
  setAIModalOpen: (isOpen) => set({ isAIModalOpen: isOpen }),

  loadLayout: (newUnits) => {
    const { units, past } = get();
    set({ past: [...past, units], future: [] });
    set({ units: newUnits, selectedId: null, selectedWallId: null });
  },
}));
