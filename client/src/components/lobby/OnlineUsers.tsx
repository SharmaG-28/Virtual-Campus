// client/src/components/lobby/OnlineUsers.tsx
import React from 'react';
import { UserStore } from '../../stores/UserStore';

const OnlineUsers: React.FC = () => {
    // Select the players array from the UserStore
    const players = UserStore((state) => state.players);
    const sessionId = UserStore((state) => state.sessionId); // Current user's session ID

    // Filter out the current user from the list if they are already in the players array
    const otherPlayers = players.filter(player => player.id !== sessionId);

    return (
        <div className="w-full max-h-80 overflow-y-auto">
            {otherPlayers.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="w-10 h-10 mx-auto mb-2 text-[#812094] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <p className="text-gray-700 font-medium text-sm">No other students online</p>
                    <p className="text-gray-600 text-xs mt-1">Be the first to explore the campus!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-[#812094] bg-[#812094]/10 px-3 py-1 rounded-full">
                            {otherPlayers.length} {otherPlayers.length === 1 ? 'Student' : 'Students'} Online
                        </span>
                    </div>
                    {otherPlayers.map((player) => (
                        <div key={player.id} className="flex items-center space-x-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl shadow-md border border-[#812094]/10 hover:bg-white/50 transition-all duration-200">
                            <div className="relative">
                                <img
                                    src={player.avatarUrl}
                                    alt={player.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-[#812094]/20 shadow-sm"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://placehold.co/48x48/812094/FFFFFF?text=${player.name.substring(0,2).toUpperCase()}`;
                                    }}
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">{player.name}</p>
                                <p className="text-sm text-gray-600 font-mono">
                                    ID: {player.id.substring(0, 8)}...
                                </p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-600 font-medium">Active</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OnlineUsers;