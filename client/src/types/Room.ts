// client/src/types/Room.ts
// This file defines the client-side interface for the Colyseus room state,
// mirroring the server-side CampusState schema.

// Removed MapSchema import as it's not directly exported from colyseus.js
// On the client, Colyseus's MapSchema behaves like a standard Map.
import type { Player } from './Player'; // Use 'import type' for type-only imports
import type { Zone } from './Zone'; // Use 'import type' for type-only imports

export interface CampusState {
    // Colyseus's MapSchema instances on the client behave like standard JavaScript Maps.
    // We define them as Map<string, Type> for type safety.
    players: Map<string, Player>;
    zones: Map<string, Zone>;
    // Add other global state properties here if they exist in CampusState on the server
    // globalMessage: string;
    // serverTime: number;
}
