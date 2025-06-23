// server/src/rooms/CampusRoom.ts
import { Room, Client } from 'colyseus';
import { Schema, type, MapSchema } from '@colyseus/schema';
import { Player } from './schemas/Player';
import { CampusState } from './schemas/CampusState';
import { Zone } from './schemas/Zone'; // Import Zone schema

// CampusRoom represents a single instance of the metaverse campus game room.
export class CampusRoom extends Room<CampusState> {
    maxClients = 100; // Maximum number of clients allowed in this room

    // onCreate is called when the room is initialized.
    onCreate(options: any) {
        // Set the initial state of the room.
        // This state will be synchronized with all connected clients.
        this.setState(new CampusState());

        // Set up a patch interval to send state updates to clients.
        // This is crucial for real-time synchronization.
        this.setPatchRate(1000 / 20); // 20 patches per second (50ms interval)

        // Set up message handlers for client-server communication.
        // These handlers define how the server responds to messages from clients.

        // Handle player movement updates from clients.
        this.onMessage('player_move', (client, message) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                // Update player's position based on client message.
                // Ensure to validate input to prevent cheating or invalid data.
                player.x = message.x;
                player.y = message.y;
                // You might also want to update the player's animation state, direction, etc.
                player.animation = message.animation;
                player.direction = message.direction;
            }
        });

        // Handle chat messages (global chat for now).
        this.onMessage('chat_message', (client, message) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                // Broadcast the chat message to all clients in the room.
                // Include sender's name and the message content.
                this.broadcast('new_chat_message', {
                    senderId: client.sessionId,
                    senderName: player.name, // Assuming player has a name property
                    message: message.text,
                    timestamp: Date.now()
                }, { except: client }); // Optionally, don't send back to the sender
                console.log(`[Chat] ${player.name}: ${message.text}`);
            }
        });

        // Initialize zones (example zones, you'll load these from your map data)
        this.initializeZones();

        console.log("CampusRoom created with options:", options);
    }

    // initializeZones method to populate the room state with zone information.
    // In a real application, this data would likely come from your map configuration.
    private initializeZones() {
        // Example zones. You will expand this based on your actual map.
        const zonesData = [
            { id: "meet1", name: "Meeting Room 1", x: 100, y: 100, width: 50, height: 50, type: "meeting", locked: false },
            { id: "club1", name: "Club House 1", x: 200, y: 150, width: 70, height: 70, type: "social", locked: false },
            { id: "lecture1", name: "Lecture Hall 1", x: 300, y: 200, width: 100, height: 80, type: "lecture", locked: false },
            { id: "gaming", name: "Gaming Zone", x: 400, y: 250, width: 120, height: 90, type: "gaming", locked: false },
            { id: "library", name: "Library", x: 500, y: 300, width: 80, height: 60, type: "quiet", locked: false }
        ];

        zonesData.forEach(zoneData => {
            const zone = new Zone();
            zone.id = zoneData.id;
            zone.name = zoneData.name;
            zone.x = zoneData.x;
            zone.y = zoneData.y;
            zone.width = zoneData.width;
            zone.height = zoneData.height;
            zone.type = zoneData.type;
            zone.locked = zoneData.locked;
            this.state.zones.set(zone.id, zone);
        });
        console.log(`Initialized ${this.state.zones.size} zones.`);
    }

    // onJoin is called when a new client connects to the room.
    async onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined the room with options:", options);

        // Create a new Player instance for the joining client.
        const player = new Player();
        player.id = client.sessionId;
        player.name = options.name || `Guest-${client.sessionId.substring(0, 4)}`; // Assign a name (from options or default)
        player.x = Math.floor(Math.random() * 800); // Random initial position for demonstration
        player.y = Math.floor(Math.random() * 600);
        player.avatarUrl = options.avatarUrl || "https://placehold.co/60x60/FF0000/FFFFFF?text=AV"; // Default avatar

        // Add the new player to the room's state.
        this.state.players.set(client.sessionId, player);

        // Notify all clients about the new player (optional, state synchronization handles this).
        this.broadcast('player_joined', { sessionId: client.sessionId, name: player.name }, { except: client });
    }

    // onLeave is called when a client leaves the room.
    async onLeave(client: Client, consented: boolean) {
        // Remove the player from the room's state.
        this.state.players.delete(client.sessionId);

        // Notify all clients about the player leaving (optional).
        this.broadcast('player_left', { sessionId: client.sessionId }, { except: client });

        console.log(client.sessionId, "left the room. Consented:", consented);
    }

    // onDispose is called when the room is disposed (e.g., no clients left).
    onDispose() {
        console.log("CampusRoom disposed.");
    }
}
