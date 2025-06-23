// client/src/types/Communication.ts
// This file defines types related to communication features like chat and calls.
// Ensuring ChatMessage is correctly exported.

// Interface for a general chat message
export interface ChatMessage {
    senderId: string;
    senderName: string;
    message: string;
    timestamp: number; // Unix timestamp
    isPrivate?: boolean; // Optional: true if it's a private message
}

// Interface for a video/audio stream (e.g., from WebRTC)
export interface MediaStreamData {
    peerId: string; // The ID of the peer providing the stream
    stream: MediaStream; // The actual MediaStream object
    type: 'video' | 'audio' | 'screenshare'; // Type of stream
}

// Interface for a peer connection status
export interface PeerConnectionStatus {
    peerId: string;
    status: 'connecting' | 'connected' | 'disconnected' | 'failed';
    // You might add more details like ICE state, signaling state etc.
}
