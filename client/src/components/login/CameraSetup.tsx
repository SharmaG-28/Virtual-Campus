// client/src/components/login/CameraSetup.tsx
import React, { useEffect, useRef, useState } from 'react';
import { CommunicationStore } from '../../stores/CommunicationStore'; // Import CommunicationStore
import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { FiVideo, FiVideoOff } from "react-icons/fi";

interface CameraSetupProps {
    onCameraSetupComplete: () => void;
}

const CameraSetup: React.FC<CameraSetupProps> = ({ onCameraSetupComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const setLocalStream = CommunicationStore((state) => state.setLocalStream);
    const toggleMicMute = CommunicationStore((state) => state.toggleMicMute);
    const toggleCameraOff = CommunicationStore((state) => state.toggleCameraOff);
    const isMicMuted = CommunicationStore((state) => state.isMicMuted);
    const isCameraOff = CommunicationStore((state) => state.isCameraOff);

    const [hasMediaPermission, setHasMediaPermission] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMedia = async () => {
            try {
                // Request both video and audio
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play(); // Start playing the stream
                }
                setLocalStream(stream); // Store the stream in Zustand
                setHasMediaPermission(true);
                setError(null);
            } catch (err) {
                console.error("Error accessing media devices:", err);
                setError("Failed to access camera/microphone. Please ensure permissions are granted.");
                setHasMediaPermission(false);
            }
        };

        getMedia();

        // Cleanup function: Stop the stream when component unmounts
        return () => {
            const currentStream = CommunicationStore.getState().localStream;
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
                setLocalStream(null); // Clear the stream from Zustand
            }
        };
    }, [setLocalStream]);

    const handleContinue = () => {
        onCameraSetupComplete(); // Proceed to the lobby
    };

    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 relative overflow-hidden'>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`
                        }}
                    />
                ))}
            </div>
            <div className='relative z-10 w-full max-w-[600px] px-6 py-10 flex flex-col items-center justify-center space-y-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#812094]/20'>
                <div className="text-center">
                    <h2 className="text-[26px] font-bold text-[#812094] mb-4">
                        Set Up Camera & Microphone
                    </h2>
                    <p className="text-gray-900 text-md">
                        Allow access to your camera and microphone for seamless communication in the metaverse.
                    </p>
                </div>

                {error && (
                    <div className="w-full bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-6 py-4 rounded-xl text-center">
                        <strong className="font-semibold">Error:</strong> {error}
                    </div>
                )}

                <div className="relative w-[80%] aspect-video bg-gray-900/20 backdrop-blur-sm rounded-md overflow-hidden shadow-xl border border-[#812094]/20">
                    {hasMediaPermission ? (
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-700">
                            <svg className="w-12 h-12 mb-4 text-[#812094] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 2v-7l-4 2z"/>
                            </svg>
                            <span className="text-sm text-center font-medium">Waiting for camera/microphone permission...</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-6">
                    <button
                        onClick={toggleMicMute}
                        className={`p-3 rounded-full transition-all duration-300 shadow-lg transform hover:scale-102 cursor-pointer
                            ${isMicMuted 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-white/30 backdrop-blur-sm text-[#812094] hover:bg-white/40 border border-[#812094]/20'
                            }`}
                        title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
                    >
                        {isMicMuted ? (
                            <IoMicOffOutline className="w-5 h-5" />
                        ) : (
                            <IoMicOutline className="w-5 h-5" />
                        )}
                    </button>

                    <button
                        onClick={toggleCameraOff}
                        className={`p-3 rounded-full transition-all duration-300 shadow-lg transform hover:scale-102 cursor-pointer
                            ${isCameraOff 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-white/30 backdrop-blur-sm text-[#812094] hover:bg-white/40 border border-[#812094]/20'
                            }`}
                        title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
                    >
                        {isCameraOff ? (
                            <FiVideoOff className="w-5 h-5" />
                        ) : (
                            <FiVideo className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!hasMediaPermission}
                    className={`w-[60%] relative py-2 px-4 text-white font-semibold rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform
                        ${hasMediaPermission
                            ? 'bg-gradient-to-r from-[#812094] to-purple-500 hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent hover:scale-102'
                            : 'bg-gray-400 cursor-not-allowed opacity-50'
                        }`}
                >
                    <div className="flex items-center justify-center text-md">
                        <span>Continue to Virtual Campus</span>
                        {hasMediaPermission && (
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default CameraSetup;