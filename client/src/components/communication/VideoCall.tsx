// client/src/components/communication/VideoCall.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IoVideocamOutline, IoVideocamOffOutline, IoMicOutline, IoMicOffOutline } from 'react-icons/io5';
import { CommunicationStore } from '../../stores/CommunicationStore';

interface VideoCallProps {
  onClose: () => void; // Function to close the video call component/modal
}

const VideoCall: React.FC<VideoCallProps> = ({ onClose }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Access state and actions from CommunicationStore
  const localStream = CommunicationStore((state) => state.localStream);
  const isMicMuted = CommunicationStore((state) => state.isMicMuted);
  const isCameraOff = CommunicationStore((state) => state.isCameraOff);
  const setLocalStream = CommunicationStore((state) => state.setLocalStream);
  const toggleMicMute = CommunicationStore((state) => state.toggleMicMute);
  const toggleCameraOff = CommunicationStore((state) => state.toggleCameraOff);

  const [hasMediaPermission, setHasMediaPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get media stream and set it
  const getMedia = useCallback(async () => {
    // If a stream already exists in the store, use it
    if (localStream && localStream.active) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.play().catch(e => console.error("Error playing existing local video:", e));
      }
      setHasMediaPermission(true);
      return;
    }

    // Otherwise, request new media
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch(e => console.error("Error playing new local video:", e));
      }
      setLocalStream(stream); // Store the stream in Zustand
      setHasMediaPermission(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing media devices in VideoCall:", err);
      setError("Failed to access camera/microphone. Please ensure permissions are granted.");
      setHasMediaPermission(false);
    }
  }, [localStream, setLocalStream]);

  useEffect(() => {
    getMedia();

    // Ensure video/audio tracks are enabled/disabled based on current store state
    if (localStream) {
        localStream.getAudioTracks().forEach(track => track.enabled = !isMicMuted);
        localStream.getVideoTracks().forEach(track => track.enabled = !isCameraOff);
    }

    // Log current state for debugging
    console.log(`[VideoCall] Render - localStream: ${!!localStream}, isCameraOff: ${isCameraOff}, hasMediaPermission: ${hasMediaPermission}, videoTrackEnabled: ${localStream?.getVideoTracks()[0]?.enabled}`);


    // Cleanup function: Stop the stream when component unmounts
    return () => {
      // It's crucial not to stop the stream if it's potentially used elsewhere (e.g., CameraSetup)
      // For this simplified component, we'll stop it only if it was started by this component
      // and if no other component needs it. For a shared stream, the CommunicationStore
      // or a higher-level service should manage its lifecycle.
      // For now, if the localStream is managed by CommunicationStore, don't stop it here.
      // If you intend for this component to fully control the stream, you would add:
      /*
      const currentStream = CommunicationStore.getState().localStream;
      if (currentStream && currentStream === localStream) { // Only stop if THIS component started it
          currentStream.getTracks().forEach(track => track.stop());
          setLocalStream(null); // Clear the stream from Zustand
      }
      */
    };
  }, [getMedia, localStream, isMicMuted, isCameraOff, setLocalStream, hasMediaPermission]);

  // Handle toggling mic state
  const handleToggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        // Toggle the track's enabled state directly
        audioTrack.enabled = !isMicMuted;
        toggleMicMute(); // Update Zustand store, which should reflect the new state
      }
    }
  }, [localStream, isMicMuted, toggleMicMute]);

  // Handle toggling camera state
  const handleToggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        // Toggle the track's enabled state directly
        videoTrack.enabled = !isCameraOff;
        toggleCameraOff(); // Update Zustand store, which should reflect the new state
      }
    }
  }, [localStream, isCameraOff, toggleCameraOff]);

  return (
    <div className="fixed bottom-8 right-8 z-50 p-2 font-inter">
      {error && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-red-600 text-white text-sm px-3 py-1 rounded-md shadow-lg">
          {error}
        </div>
      )}
      <div className="relative w-60 h-40 bg-gray-900 rounded-lg shadow-xl overflow-hidden border-2 border-purple-500">
        {hasMediaPermission ? (
          <>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted // Always mute local playback to avoid echo
              className="w-full h-full object-cover"
            ></video>
            {/* CORRECTED: Show "Camera Off" overlay ONLY when isCameraOff is true */}
            {isCameraOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 text-white text-sm">
                Camera Off
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-800">
            <svg className="w-8 h-8 mb-2 text-purple-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 2v-7l-4 2z" />
            </svg>
            <span className="text-xs text-center font-medium px-2">Waiting for media...</span>
          </div>
        )}

        {/* Toolbar at the bottom of the video feed */}
        <div className="absolute bottom-2 left-0 right-0 bg-opacity-75 flex justify-center space-x-2 py-1 px-2 rounded-b-lg">
          <button
            onClick={handleToggleMic}
            // Button color reflects the *current* state: green for on, red for off
            className={`p-2 rounded-full transition-all duration-300 ${!isMicMuted ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
            title={!isMicMuted ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {/* Icon reflects the *current* state */}
            {!isMicMuted ? <IoMicOutline size={20} /> : <IoMicOffOutline size={20} />}
          </button>
          <button
            onClick={handleToggleCamera}
            // Button color reflects the *current* state: green for on, red for off
            className={`p-2 rounded-full transition-all duration-300 ${!isCameraOff ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
            title={!isCameraOff ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {/* Icon reflects the *current* state */}
            {!isCameraOff ? <IoVideocamOutline size={20} /> : <IoVideocamOffOutline size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
