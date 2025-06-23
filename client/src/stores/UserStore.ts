// client/src/stores/UserStore.ts
import { create } from 'zustand';
import type { Player } from '../types/Player';
import type { Zone } from '../types/Zone';
import type { ChatMessage } from '../types/Communication'; // Import ChatMessage from Communication.ts

// Define the shape of the UserStore state
interface UserState {
    userName: string | null;
    avatarUrl: string | null;
    avatarId: string | null; // Added: Track the selected character ID
    sessionId: string | null; // Colyseus sessionId of the current user
    players: Player[]; // All players currently in the room (including self)
    zones: Zone[]; // All zones in the campus map
    chatMessages: ChatMessage[]; // Global chat messages
    setUserName: (name: string) => void;
    setAvatarUrl: (url: string) => void;
    setAvatarId: (id: string) => void; // Added: Set the selected character ID
    setSessionId: (id: string | null) => void; // <--- CHANGED: Allow null
    setPlayers: (players: Player[]) => void;
    addPlayer: (player: Player) => void;
    removePlayer: (id: string) => void;
    setZones: (zones: Zone[]) => void;
    addZone: (zone: Zone) => void;
    removeZone: (id: string) => void;
    addChatMessage: (message: ChatMessage) => void;
    clearPlayers: () => void;
    clearZones: () => void;
    clearChatMessages: () => void;
    resetUserStore: () => void;
}

// Create the Zustand store
export const UserStore = create<UserState>((set) => ({
    userName: null,
    avatarUrl: null,
    avatarId: null, // Added: Initialize as null
    sessionId: null,
    players: [],
    zones: [],
    chatMessages: [],

    setUserName: (name) => set({ userName: name }),
    setAvatarUrl: (url) => set({ avatarUrl: url }),
    setAvatarId: (id) => set({ avatarId: id }), // Added: Set avatar ID
    setSessionId: (id) => set({ sessionId: id }), // <--- CHANGED: Accepts string | null
    setPlayers: (players) => set({ players }),
    addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
    removePlayer: (id) => set((state) => ({ players: state.players.filter(p => p.id !== id) })),
    setZones: (zones) => set({ zones }),
    addZone: (zone) => set((state) => ({ zones: [...state.zones, zone] })),
    removeZone: (id) => set((state) => ({ zones: state.zones.filter(z => z.id !== id) })),
    addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
    clearPlayers: () => set({ players: [] }),
    clearZones: () => set({ zones: [] }),
    clearChatMessages: () => set({ chatMessages: [] }),
    resetUserStore: () => set({
        userName: null,
        avatarUrl: null,
        avatarId: null, // Added: Reset avatar ID
        sessionId: null,
        players: [],
        zones: [],
        chatMessages: []
    }),
}));