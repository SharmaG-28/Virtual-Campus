// client/src/components/login/AvatarSelector.tsx
import React, { useState } from 'react';
import { UserStore } from '../../stores/UserStore'; // Import UserStore

interface AvatarSelectorProps {
    onAvatarSelected: () => void;
}

const avatars = [
    { id: 'adam', url: 'assets/images/Adam_login.png', name: 'Adam' },
    { id: 'nancy', url: 'assets/images/Nancy_login.png', name: 'Nancy' },
    { id: 'lucy', url: 'assets/images/Lucy_login.png', name: 'Lucy' },
    { id: 'ash', url: 'assets/images/Ash_login.png', name: 'Ash' },
    // Add more avatars as needed
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onAvatarSelected }) => {
    const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
    const setAvatarUrl = UserStore((state) => state.setAvatarUrl);
    const setAvatarId = UserStore((state) => state.setAvatarId); // Added: Get setAvatarId function
    const userName = UserStore((state) => state.userName); // Get user name for display

    const handleSelectAvatar = (avatarId: string, avatarUrl: string) => {
        setSelectedAvatarId(avatarId);
        setAvatarUrl(avatarUrl); // Store the display image URL
        setAvatarId(avatarId); // Store the character ID for game logic
    };

    const handleSubmit = () => {
        if (selectedAvatarId) {
            onAvatarSelected(); // Proceed to the next stage (Camera Setup)
        } else {
            console.warn("Please select an avatar.");
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
            <div className='w-full max-w-[720px] p-12 flex flex-col items-center justify-center space-y-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#812094]/20'>
                <h2 className="text-2xl font-bold text-center text-[#812094] dark:text-white">
                    Hello, {userName || 'Guest'}! Choose Your Avatar
                </h2>
                <p className="text-center text-sm text-gray-900 dark:text-gray-400">
                    Select a character that represents you in the metaverse.
                </p>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
                    {avatars.map((avatar) => (
                        <div
                            key={avatar.id}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                                ${selectedAvatarId === avatar.id
                                    ? 'ring-4 ring-[#812094] bg-indigo-100 '
                                    : 'bg-white/30 hover:bg-gray-50 border border-white/40'
                                }`}
                            onClick={() => handleSelectAvatar(avatar.id, avatar.url)}
                        >
                            <img
                                src={avatar.url}
                                alt={avatar.name}
                                className="w-20 h-20 object-contain mx-auto mb-2 rounded-full"
                                // Fallback for images
                                onError={(e) => {
                                    e.currentTarget.src = `https://placehold.co/96x96/FF0000/FFFFFF?text=${avatar.name.substring(0,2).toUpperCase()}`;
                                }}
                            />
                            <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                {avatar.name}
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!selectedAvatarId}
                    className={`w-[55%] relative py-2 px-4 mt-10 text-white font-semibold rounded-lg shadow-lg text-md
                        ${selectedAvatarId
                            ? 'bg-gradient-to-r from-[#812094] to-purple-500 hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-102 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed opacity-50'
                        }`}
                >
                    <div className="flex items-center justify-center">
                        <span>Continue to Virtual Campus</span>
                        {selectedAvatarId && (
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default AvatarSelector;