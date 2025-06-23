// server/src/rooms/schemas/Player.ts
import { Schema, type } from '@colyseus/schema';

// Player schema defines the structure of a player's data that will be synchronized across clients.
export class Player extends Schema {
    @type("string") id!: string; // Unique session ID of the player, definitely assigned on creation
    @type("string") name!: string; // Display name of the player, definitely assigned on creation
    @type("number") x!: number; // X-coordinate of the player's position on the map, definitely assigned on creation
    @type("number") y!: number; // Y-coordinate of the player's position on the map, definitely assigned on creation
    @type("string") avatarUrl!: string; // URL to the player's avatar image, definitely assigned on creation
    @type("string") animation: string = "idle"; // Current animation state (e.g., "idle", "walk", "run")
    @type("string") direction: string = "down"; // Current facing direction (e.g., "up", "down", "left", "right")
    @type("boolean") hasVideo: boolean = false; // Indicates if the player has an active video stream
    @type("boolean") hasAudio: boolean = false; // Indicates if the player has an active audio stream
    @type("boolean") isSharingScreen: boolean = false; // Indicates if the player is sharing their screen
    @type("string") currentZoneId: string | null = null; // The ID of the zone the player is currently in
}
