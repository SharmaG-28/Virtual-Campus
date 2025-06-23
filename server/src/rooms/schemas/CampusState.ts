// server/src/rooms/schemas/CampusState.ts
import { Schema, type, MapSchema } from '@colyseus/schema';
import { Player } from './Player';
import { Zone } from './Zone'; // Import Zone schema

// CampusState defines the entire synchronized state of the CampusRoom.
// All properties decorated with @type will be automatically synchronized to clients.
export class CampusState extends Schema {
    // A MapSchema to store all connected players, keyed by their sessionId.
    // Using MapSchema allows for efficient addition, removal, and lookup of players.
    @type({ map: Player }) players = new MapSchema<Player>();

    // A MapSchema to store all zones in the campus, keyed by their zone ID.
    @type({ map: Zone }) zones = new MapSchema<Zone>();

    // You can add other global state properties here, e.g.,
    // @type("string") globalMessage: string = "Welcome to Metaverse Campus!";
    // @type("number") serverTime: number = Date.now();
}
