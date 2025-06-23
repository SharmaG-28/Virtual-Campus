// server/src/rooms/schemas/Zone.ts
import { Schema, type } from '@colyseus/schema';

// Zone schema defines the properties of a specific area or zone within the campus.
export class Zone extends Schema {
    @type("string") id!: string; // Unique identifier for the zone (e.g., "meet1", "library"), definitely assigned on creation
    @type("string") name!: string; // Display name of the zone, definitely assigned on creation
    @type("number") x!: number; // X-coordinate of the zone's top-left corner, definitely assigned on creation
    @type("number") y!: number; // Y-coordinate of the zone's top-left corner, definitely assigned on creation
    @type("number") width!: number; // Width of the zone, definitely assigned on creation
    @type("number") height!: number; // Height of the zone, definitely assigned on creation
    @type("string") type!: string; // Type of zone (e.g., "meeting", "social", "lecture", "gaming"), definitely assigned on creation
    @type("boolean") locked: boolean = false; // Indicates if the zone is currently locked (e.g., for a private meeting)
    // You could add more properties like:
    // @type("string") description: string;
    // @type("string") hostId: string | null = null; // For meeting zones, who is hosting
    // @type(["string"]) occupants: string[] = new ArraySchema<string>(); // IDs of players currently in this zone
}
