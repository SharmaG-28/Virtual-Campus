// client/src/stores/CommunicationStore.ts
import { create } from 'zustand';
import type { MediaStreamData, PeerConnectionStatus, ChatMessage } from '../types/Communication';

// Define the shape of the CommunicationStore state
interface CommunicationState {
    // WebRTC related states
    localStream: MediaStream | null; // The local user's video/audio stream
    remoteStreams: Map<string, MediaStreamData>; // Map of remote peer IDs to their media streams
    peerConnectionStatuses: Map<string, PeerConnectionStatus['status']>; // Status of peer connections
    isMicMuted: boolean;
    isCameraOff: boolean;
    isScreenSharing: boolean;

    // Chat related states (private chat)
    privateChatMessages: Map<string, ChatMessage[]>; // Map of peerId to array of private messages
    activePrivateChatPeerId: string | null; // The peer ID of the currently active private chat

    // Actions
    setLocalStream: (stream: MediaStream | null) => void;
    addRemoteStream: (peerId: string, stream: MediaStream, type: MediaStreamData['type']) => void;
    removeRemoteStream: (peerId: string, type?: MediaStreamData['type']) => void;
    updatePeerConnectionStatus: (peerId: string, status: PeerConnectionStatus['status']) => void;
    toggleMicMute: () => void;
    toggleCameraOff: () => void;
    toggleScreenShare: () => void;
    addPrivateChatMessage: (peerId: string, message: ChatMessage) => void;
    setActivePrivateChatPeer: (peerId: string | null) => void;
    clearCommunicationStore: () => void;
}

// Create the Zustand store
export const CommunicationStore = create<CommunicationState>((set, get) => ({
    localStream: null,
    remoteStreams: new Map(),
    peerConnectionStatuses: new Map(),
    isMicMuted: false,
    isCameraOff: false,
    isScreenSharing: false,
    privateChatMessages: new Map(),
    activePrivateChatPeerId: null,

    setLocalStream: (stream) => set({ localStream: stream }),

    addRemoteStream: (peerId, stream, type) => set((state) => {
        const newRemoteStreams = new Map(state.remoteStreams);
        newRemoteStreams.set(peerId, { peerId, stream, type });
        return { remoteStreams: newRemoteStreams };
    }),

    removeRemoteStream: (peerId, type) => set((state) => {
        const newRemoteStreams = new Map(state.remoteStreams);
        if (type) {
            // If type is specified, remove only that specific stream type
            const existingStream = newRemoteStreams.get(peerId);
            if (existingStream && existingStream.type === type) {
                newRemoteStreams.delete(peerId);
            }
        } else {
            // Otherwise, remove all streams for that peer
            newRemoteStreams.delete(peerId);
        }
        return { remoteStreams: newRemoteStreams };
    }),

    updatePeerConnectionStatus: (peerId, status) => set((state) => {
        const newStatuses = new Map(state.peerConnectionStatuses);
        newStatuses.set(peerId, status);
        return { peerConnectionStatuses: newStatuses };
    }),

    toggleMicMute: () => set((state) => {
        const newMicMuted = !state.isMicMuted;
        if (state.localStream) {
            state.localStream.getAudioTracks().forEach(track => track.enabled = !newMicMuted);
        }
        return { isMicMuted: newMicMuted };
    }),

    toggleCameraOff: () => set((state) => {
        const newCameraOff = !state.isCameraOff;
        if (state.localStream) {
            state.localStream.getVideoTracks().forEach(track => track.enabled = !newCameraOff);
        }
        return { isCameraOff: newCameraOff };
    }),

    toggleScreenShare: () => set((state) => ({ isScreenSharing: !state.isScreenSharing })),

    addPrivateChatMessage: (peerId, message) => set((state) => {
        const newPrivateChatMessages = new Map(state.privateChatMessages);
        const messages = newPrivateChatMessages.get(peerId) || [];
        newPrivateChatMessages.set(peerId, [...messages, message]);
        return { privateChatMessages: newPrivateChatMessages };
    }),

    setActivePrivateChatPeer: (peerId) => set({ activePrivateChatPeerId: peerId }),

    clearCommunicationStore: () => set({
        localStream: null,
        remoteStreams: new Map(),
        peerConnectionStatuses: new Map(),
        isMicMuted: false,
        isCameraOff: false,
        isScreenSharing: false,
        privateChatMessages: new Map(),
        activePrivateChatPeerId: null,
    }),
}));
