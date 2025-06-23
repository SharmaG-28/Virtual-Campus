// client/src/components/login/LoginPage.tsx
import React, { useState } from 'react';
import { UserStore } from '../../stores/UserStore'; // Import UserStore

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [inputName, setInputName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const setUserName = UserStore((state) => state.setUserName);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputName.trim()) {
            setIsLoading(true);
            // Simulate brief loading for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            setUserName(inputName.trim());
            onLoginSuccess();
        } else {
            console.warn("Please enter a valid name.");
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
            <div className='relative z-10 flex flex-col items-center'>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-60 mb-4">
                        <img src="/assets/background/VC_Logo.png" alt="VIRTUAL CAMPUS" />
                    </div>
                    <h1 className="text-[35px] font-bold text-[#7718A6] tracking-wide">
                        Welcome to Virtual Campus
                    </h1>
                    <p className="text-gray-900 font-medium font-serif text-[15px]">
                        Your Gateway to the Future of Education
                    </p>
                </div>

                

                <div className='w- bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-4 border border-[#812094]/20'>
                    <div className="text-center mb-8">
                        <p className="text-gray-900 font-mono text-[12px] font-medium">
                            Enter your name to begin your academic <br />journey in the
                        </p>
                        <p className='font-semibold text-xl text-blue-500'>
                            [ Metaverse 🌐]
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-xs ml-1 font-semibold text-[#812094]">
                                Student Name
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-[#812094]/30 rounded-lg text-md text-black placeholder-[#812094] focus:outline-none focus:ring-2 focus:ring-[#812094] focus:border-transparent transition-all duration-300"
                                    placeholder="e.g., Alex Johnson"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="w-4 h-4 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative py-2 px-4 cursor-pointer bg-gradient-to-r from-[#812094] to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Entering Campus...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span>Enter Virtual Campus</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                </div>
                            )}
                        </button>
                    </form>
                    <div className="mt-6 pt-4 border-t border-[#812094]/20">
                        <p className="text-black text-sm text-center mb-4">What awaits you:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center text-[#6d2f79]">
                                <svg className="w-5 h-5 mr-2 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Interactive Learning
                            </div>
                            <div className="flex items-center text-[#6d2f79]">
                                <svg className="w-5 h-5 mr-2 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Virtual Collaboration
                            </div>
                            <div className="flex items-center text-[#6d2f79]">
                                <svg className="w-5 h-5 mr-2 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Gamified Experience
                            </div>
                            <div className="flex items-center text-[#6d2f79]">
                                <svg className="w-5 h-5 mr-2 text-[#812094]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Real-time Communication
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage