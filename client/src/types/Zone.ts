// client/src/types/Zone.ts
// This file defines the client-side interface for a Zone,
// mirroring the server-side Colyseus Zone schema.

export interface Zone {
    id: string; // Unique identifier for the zone
    name: string; // Display name of the zone
    x: number; // X-coordinate of the zone's top-left corner
    y: number; // Y-coordinate of the zone's top-left corner
    width: number; // Width of the zone
    height: number; // Height of the zone
    type: string; // Type of zone (e.g., "meeting", "social", "lecture", "gaming")
    locked: boolean; // Indicates if the zone is currently locked
    // Add other properties if you expand the server-side Zone schema
    // description?: string;
    // hostId?: string | null;
    // occupants?: string[];
}
