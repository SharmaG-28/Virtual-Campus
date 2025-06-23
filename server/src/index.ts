// server/src/index.ts
import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { CampusRoom } from './rooms/CampusRoom';

const port = Number(process.env.PORT || 2567); // Default Colyseus port
const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Create a barebones HTTP server
const httpServerInstance = http.createServer(app); // Assign the http.Server instance here

// Create the Colyseus server instance
const gameServer = new Server({
    transport: new WebSocketTransport({
        server: httpServerInstance // Attach Colyseus to the HTTP server instance
    })
});

// Define your game rooms
// 'campus_room' is the identifier for clients to join this room
gameServer.define('campus_room', CampusRoom);

// Start the Colyseus server
gameServer.listen(port)
    .then(() => { // No need to capture 'listeningServer' here, as we already have httpServerInstance
        console.log(`🚀 Colyseus server listening on ws://localhost:${port}`);
    })
    .catch((err) => {
        console.error("Colyseus server failed to start:", err);
        process.exit(1); // Exit with an error code if server fails to start
    });

// Optional: Add a simple health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy!');
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down server...');
    if (httpServerInstance) {
        httpServerInstance.close(() => {
            console.log('HTTP server closed.');
            // After the HTTP server closes, you might want to perform additional cleanup
            // or ensure all Colyseus rooms are disposed, though Colyseus usually handles this.
            process.exit(0);
        });
    } else {
        console.log('HTTP server instance not found or not yet started. Exiting.');
        process.exit(0);
    }
});
