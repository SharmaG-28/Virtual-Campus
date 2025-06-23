// client/src/types/Player.ts
// This file defines the client-side interface for a Player,
// mirroring the server-side Colyseus Player schema.

export interface Player {
    id: string; // Unique session ID of the player
    name: string; // Display name of the player
    x: number; // X-coordinate of the player's position on the map
    y: number; // Y-coordinate of the player's position on the map
    avatarUrl: string; // URL to the player's avatar image
    animation: string; // Current animation state (e.g., "idle", "walk", "run")
    direction: string; // Current facing direction (e.g., "up", "down", "left", "right")
    hasVideo: boolean; // Indicates if the player has an active video stream
    hasAudio: boolean; // Indicates if the player has an active audio stream
    isSharingScreen: boolean; // Indicates if the player is sharing their screen
    currentZoneId: string | null; // The ID of the zone the player is currently in
}
