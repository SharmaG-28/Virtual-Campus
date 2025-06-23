// client/src/components/lobby/Lobby.tsx
import React, { useState } from 'react';
import { UserStore } from '../../stores/UserStore';
import { colyseusService } from '../../services/ColyseusService';
import OnlineUsers from './OnlineUsers'; // Import the OnlineUsers component

interface LobbyProps {
    onJoinRoom: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ onJoinRoom }) => {
    const userName = UserStore((state) => state.userName);
    const avatarUrl = UserStore((state) => state.avatarUrl);
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleJoinCampus = async () => {
        setIsJoining(true);
        setError(null);
        try {
            const room = await colyseusService.joinCampusRoom();
            // IMPORTANT: Set sessionId in UserStore *before* calling onJoinRoom
            // This ensures App.tsx has the sessionId updated before it re-renders
            // and potentially mounts GameCanvas.
            if (room && room.sessionId) {
                UserStore.getState().setSessionId(room.sessionId);
                console.log(`[Lobby.tsx] Session ID set in UserStore: ${room.sessionId}`);
            } else {
                console.error("[Lobby.tsx] Room or sessionId is null/undefined after joining.");
                throw new Error("Could not get session ID after joining room.");
            }

            onJoinRoom(); // Transition to the game stage
        } catch (e: any) {
            console.error("Failed to join campus room:", e);
            setError(e.message || "Failed to join campus room. Please try again.");
        } finally {
            setIsJoining(false);
        }
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
            <div className="relative z-10 w-full max-w-[800px] p-8 space-y-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#812094]/20">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        {avatarUrl && (
                            <img
                                src={avatarUrl}
                                alt={userName || 'User'}
                                className="w-16 h-16 rounded-full border-4 border-[#812094]/30 shadow-lg mr-4"
                                onError={(e) => {
                                    e.currentTarget.src = `https://placehold.co/80x80/812094/FFFFFF?text=${(userName || 'U').substring(0,2).toUpperCase()}`;
                                }}
                            />
                        )}
                        <div>
                            <h2 className="text-[26px] font-bold text-[#812094]">
                                Welcome to the Campus Lobby!
                            </h2>
                            <p className="text-md text-gray-900 font-medium mt-2">
                                Hello, {userName}! Ready to explore the Metaverse?
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 px-4 py-2 text-sm rounded-lg text-center shadow-lg">
                        <strong className="font-bold">Connection Error!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Online Users Section */}
                    <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#812094]/20">
                        <div className="flex items-center mb-4">
                            <svg className="w-4 h-4 mr-3 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            <h3 className="text-lg font-bold text-[#812094]">
                                Online Students
                            </h3>
                        </div>
                        <OnlineUsers />
                    </div>

                    {/* Join Campus Section */}
                    <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#812094]/20 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-3">
                                <svg className="w-4 h-4 mr-3 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                <h3 className="text-lg font-bold text-[#812094]">
                                    Enter Virtual Campus
                                </h3>
                            </div>
                            <p className="text-gray-900 text-justify text-[12px] mb-4">
                                Step into the metaverse and start your immersive learning journey. Connect with fellow students, attend virtual classes, and explore interactive educational experiences.
                            </p>
                            
                            <div className="space-y-3 mb-5 text-[12px]">
                                <div className="flex items-center text-[#6d2f79]">
                                    <svg className="w-4 h-4 mr-3 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="font-medium">Interactive 2D Environment</span>
                                </div>
                                <div className="flex items-center text-[#6d2f79]">
                                    <svg className="w-4 h-4 mr-3 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="font-medium">Real-time Voice & Video Chat</span>
                                </div>
                                <div className="flex items-center text-[#6d2f79]">
                                    <svg className="w-4 h-4 mr-3 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="font-medium">Collaborative Learning Spaces</span>
                                </div>
                                <div className="flex items-center text-[#6d2f79]">
                                    <svg className="w-4 h-4 mr-3 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="font-medium">Gamified Educational Experience</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-center'>
                            <button
                                onClick={handleJoinCampus}
                                disabled={isJoining}
                                className={`w-[80%] relative py-[9px] px-3 text-white font-medium text-sm rounded-lg shadow-md transition-all duration-300 transform
                                    ${isJoining
                                        ? 'bg-gray-400 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-r from-[#812094] to-purple-500 hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent hover:scale-102 cursor-pointer'
                                    }`}
                            >
                                {isJoining ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Entering Campus...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <span>🌐 Enter Virtual Campus</span>
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lobby;