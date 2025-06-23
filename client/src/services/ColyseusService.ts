// client/src/services/ColyseusService.ts
import { Client, Room } from 'colyseus.js';
import type { CampusState } from '../types/Room'; // CampusState is from Room.ts
import type { Player } from '../types/Player'; // Player is from Player.ts
import type { Zone } from '../types/Zone';     // Zone is from Zone.ts
import { UserStore } from '../stores/UserStore'; // Import UserStore for user data

// ColyseusService handles all interactions with the Colyseus server.
// This includes connecting to the server, joining/leaving rooms,
// and listening for state changes and messages.
export class ColyseusService {
    private client: Client; // The Colyseus client instance
    private room: Room<CampusState> | null = null; // The active game room
    public isConnected: boolean = false; // Tracks if the client is connected to the Colyseus server

    // Constructor initializes the Colyseus client with the server address.
    constructor() {
        // Replace 'localhost:2567' with your server's actual address in production.
        this.client = new Client('ws://localhost:2567');
        console.log("[Client ColyseusService] Initialized. Client instance created.");
    }

    // connectToServer attempts to establish a connection to the Colyseus server.
    // This method will now primarily set the isConnected flag.
    // The actual WebSocket connection is often established implicitly by joinOrCreate.
    public async connectToServer(): Promise<void> {
        try {
            this.isConnected = true;
            console.log("[Client ColyseusService] Ready to connect. Connection will be established on room join.");
        } catch (e) {
            console.error("[Client ColyseusService] Failed to prepare Colyseus client for connection:", e);
            this.isConnected = false;
            throw e; // Re-throw the error to be handled by the caller (e.g., App.tsx)
        }
    }

    // joinCampusRoom attempts to join the 'campus_room' on the server.
    // It passes user data (name, avatarUrl) as options to the room.
    public async joinCampusRoom(): Promise<Room<CampusState>> {
        if (!this.client) {
            throw new Error("Colyseus client not initialized. Call connectToServer first.");
        }

        const { userName, avatarUrl, setSessionId, setPlayers, setZones, addPlayer, removePlayer, addZone, removeZone, addChatMessage } = UserStore.getState();

        if (!userName) {
            throw new Error("User name is not set in UserStore. Cannot join room.");
        }

        try {
            console.log(`[Client ColyseusService] Attempting to join 'campus_room' as ${userName}...`);
            this.room = await this.client.joinOrCreate<CampusState>('campus_room', {
                name: userName,
                avatarUrl: avatarUrl
            });

            // --- DEBUG LOGS (KEEP FOR NOW) ---
            console.log("[Client ColyseusService] Raw room object immediately after joinOrCreate:", JSON.stringify(this.room, null, 2));
            // --- END DEBUG LOGS ---

            // Use .roomId for the room ID as confirmed by JSON.stringify output.
            // Use .sessionId for the session ID.
            console.log(`[Client ColyseusService] Joined room successfully: Room ID: ${this.room.roomId}, Session ID: ${this.room.sessionId}`);

            this.isConnected = true; // Confirm connection after successful room join

            // Ensure sessionId is a string before setting it in the store
            if (typeof this.room.sessionId === 'string') {
                setSessionId(this.room.sessionId);
            } else {
                console.error("[Client ColyseusService] Room sessionId is not a string after join. Cannot set UserStore sessionId.");
                // Optionally throw an error or handle this case more robustly
            }

            // Set up state change listener. This is crucial for real-time updates.
            // All state-related listener setups should ideally happen here or after the first state update.
            this.room.onStateChange((state) => {
                console.log("[Client ColyseusService] Room state updated. Total players:", state.players.size, "Total zones:", state.zones.size);

                // Directly update the UserStore with the new players and zones data.
                // The UserStore.subscribe in Game.ts will then react to these changes.
                const playersArray = Array.from(state.players.values());
                console.log("[Client ColyseusService] Players sent to UserStore:", JSON.stringify(playersArray, null, 2)); // <--- NEW LOG
                setPlayers(playersArray);
                setZones(Array.from(state.zones.values()));

                // Removed state.players.onAdd/onRemove and state.zones.onAdd/onRemove listeners here.
                // These are not applicable to the client-side representation of MapSchema within onStateChange.
                // Player/zone additions/removals are handled by the Game.ts scene's UserStore.subscribe,
                // which compares the currentPlayers array with the existing sprites.
            });

            // Listen for messages from the server (e.g., chat messages, game events)
            this.room.onMessage('new_chat_message', (message) => {
                console.log("[Client ColyseusService] New chat message received:", message);
                addChatMessage(message);
            });

            // Listen for room disconnection
            this.room.onLeave((code) => {
                console.log(`[Client ColyseusService] Room disconnected, code: ${code}`);
                this.room = null;
                this.isConnected = false; // Mark as disconnected
                UserStore.getState().clearPlayers(); // Clear players on disconnect
                UserStore.getState().clearZones(); // Clear zones on disconnect
                UserStore.getState().setSessionId(null); // Clear session ID on disconnect
            });

            return this.room;

        } catch (e) {
            console.error("[Client ColyseusService] Failed to join room:", e);
            this.isConnected = false; // Mark as disconnected on join failure
            throw e; // Re-throw the error to be handled by the caller
        }
    }

    // leaveRoom allows the client to leave the current game room.
    public async leaveRoom(): Promise<void> {
        if (this.room) {
            console.log("[Client ColyseusService] Leaving room...");
            await this.room.leave();
            this.room = null;
            this.isConnected = false; // Mark as disconnected
            console.log("[Client ColyseusService] Room left successfully.");
        }
    }

    // sendPlayerMovement sends the player's current position and state to the server.
    public sendPlayerMovement(x: number, y: number, animation: string, direction: string): void {
        if (this.room) {
            this.room.send('player_move', { x, y, animation, direction });
            // console.log(`[Client ColyseusService] Sent player move: x=${x}, y=${y}`); // Verbose, uncomment for deep debug
        }
    }

    // sendChatMessage sends a global chat message to the server.
    public sendChatMessage(text: string): void {
        if (this.room) {
            this.room.send('chat_message', { text });
        }
    }

    // getRoom returns the current active room.
    public getRoom(): Room<CampusState> | null {
        return this.room;
    }

    // getClient returns the Colyseus client instance.
    public getClient(): Client {
        return this.client;
    }
}

// Export a singleton instance of the service
export const colyseusService = new ColyseusService();
