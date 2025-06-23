// client/src/stores/GameStore.ts
import { create } from 'zustand';
import type { Player } from '../types/Player';
import type { Zone } from '../types/Zone';

// Define the shape of the GameStore state
interface GameState {
    // This store will primarily hold game-specific state that is not directly
    // synchronized by Colyseus's room state, but derived from it or managed client-side.
    // For example, local player's current position (if not directly updated via Colyseus state)
    // or game-specific UI states.

    // Example: Current local player's position (might be redundant if ColyseusService updates UserStore.players)
    // This could be useful for immediate UI updates before server acknowledgment.
    localPlayerX: number;
    localPlayerY: number;
    localPlayerAnimation: string;
    localPlayerDirection: string;
    // Other game-specific states
    isGameReady: boolean; // True when game assets are loaded and ready to render
    currentActiveZoneId: string | null; // The zone the local player is currently interacting with

    // Actions
    setLocalPlayerPosition: (x: number, y: number) => void;
    setLocalPlayerAnimation: (animation: string) => void;
    setLocalPlayerDirection: (direction: string) => void;
    setGameReady: (ready: boolean) => void;
    setCurrentActiveZoneId: (zoneId: string | null) => void;
    resetGameStore: () => void;
}

// Create the Zustand store
export const GameStore = create<GameState>((set) => ({
    localPlayerX: 0,
    localPlayerY: 0,
    localPlayerAnimation: "idle",
    localPlayerDirection: "down",
    isGameReady: false,
    currentActiveZoneId: null,

    setLocalPlayerPosition: (x, y) => set({ localPlayerX: x, localPlayerY: y }),
    setLocalPlayerAnimation: (animation) => set({ localPlayerAnimation: animation }),
    setLocalPlayerDirection: (direction) => set({ localPlayerDirection: direction }),
    setGameReady: (ready) => set({ isGameReady: ready }),
    setCurrentActiveZoneId: (zoneId) => set({ currentActiveZoneId: zoneId }),
    resetGameStore: () => set({
        localPlayerX: 0,
        localPlayerY: 0,
        localPlayerAnimation: "idle",
        localPlayerDirection: "down",
        isGameReady: false,
        currentActiveZoneId: null,
    }),
}));
