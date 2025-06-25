// client/src/App.tsx
import { useEffect, useState, useCallback, useRef } from 'react';
// import './App.css'; // Uncomment if you have global CSS here
import Modal from './components/Modal';
import LoginPage from './components/login/LoginPage';
import AvatarSelector from './components/login/AvatarSelector';
import CameraSetup from './components/login/CameraSetup';
import Lobby from './components/lobby/Lobby';
import { UserStore } from './stores/UserStore';
import { colyseusService } from './services/ColyseusService';
import initializePhaser from './PhaserGame'; // Import the Phaser initializer

// Import existing portal components
import CodingPortal from './components/coding/CodingPortal';
import CareerPortal from './components/career/CareerPortal';
import WhiteboardPortal from './components/whiteboard/WhiteboardPortal';
import ELibraryPortal from './components/library/ELibraryPortal';
import MarketplacePortal from './components/market/MarketplacePortal';
import ClubResourcesPortal from './components/clubs/ClubResourcesPortal';
import GameSelectionPortal from './components/games/GameSelectionPortal';
import AcademicPortal from './components/academic/AcademicPortal';
import FinancePortal from './components/finance/FinancePortal';
import CompDeptPortal from './components/compdept/CompDeptPortal';
import ITDeptPortal from './components/itdept/ITDeptPortal';

// Import the VideoCall component
import VideoCall from './components/communication/VideoCall';

// Define the stages of the application flow
type AppStage = 'login' | 'avatar_selection' | 'camera_setup' | 'lobby' | 'game';

const portalComponents: Record<string, { component: React.FC, title: string }> = {
    'career': { component: CareerPortal, title: 'Career Portal' },
    'coding': { component: CodingPortal, title: 'Coding Portal' },
    'whiteboard': { component: WhiteboardPortal, title: 'Whiteboard' },
    'elibrary': { component: ELibraryPortal, title: 'Digital Library' },
    'marketplace': { component: MarketplacePortal, title: 'Marketplace' },
    'club-resources': { component: ClubResourcesPortal, title: 'Club Resources' },
    'game-selection': { component: GameSelectionPortal, title: 'Game Selection' },
    'academic': { component: AcademicPortal, title: 'Academic Portal' },
    'finance': { component: FinancePortal, title: 'Finance Portal' },
    'compdept': { component: CompDeptPortal, title: 'Computer Science Department' },
    'itdept': { component: ITDeptPortal, title: 'IT Department Portal' }
};

function App() {
    const userName = UserStore((state) => state.userName);
    const sessionId = UserStore((state) => state.sessionId);

    const [currentStage, setCurrentStage] = useState<AppStage>('login');
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [isLoadingGame, setIsLoadingGame] = useState(false); // New state for explicit game loading
    const [showMiniVideo, setShowMiniVideo] = useState(false); // State to control visibility of mini video feed

    // Refs for Phaser game management
    const phaserContainerRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<Phaser.Game | null>(null);

    // Stabilize the handleOpenPortal function using useCallback
    const handleOpenPortal = useCallback((portalId: string) => {
        console.log(`[App.tsx] Opening portal: ${portalId}`);
        const portalConfig = portalComponents[portalId];
        if (portalConfig) {
            setActiveModal(portalId);
            setModalTitle(portalConfig.title);
            console.log(`[App.tsx] Portal set - ID: ${portalId}, Title: ${portalConfig.title}`);
        } else {
            console.error(`[App.tsx] Portal component not found for ID: ${portalId}`);
            setActiveModal(portalId);
            setModalTitle(`${portalId.charAt(0).toUpperCase() + portalId.slice(1)} Portal`);
        }
    }, []);

    // Effect to handle Colyseus server connection (runs once on mount)
    useEffect(() => {
        const connect = async () => {
            try {
                await colyseusService.connectToServer();
                console.log("[App.tsx] Colyseus server connection established.");
            } catch (error) {
                console.error("[App.tsx] Failed to connect to Colyseus server:", error);
                // Handle connection error, e.g., show an error message to the user
            }
        };
        connect();
    }, []);

    // Log stage changes for debugging
    useEffect(() => {
        console.log(`[App.tsx] Current stage changed to: ${currentStage}`);
        // Control mini video visibility based on game stage
        if (currentStage === 'game') {
            setShowMiniVideo(true);
        } else {
            setShowMiniVideo(false);
        }
    }, [currentStage]);

    // Effect to manage Phaser game instance lifecycle
    useEffect(() => {
        // Condition to initialize the game:
        // - currentStage is 'game'
        // - sessionId is available (meaning user has joined a room)
        // - gameInstanceRef.current is null (game not yet initialized)
        // - phaserContainerRef.current is available (DOM element exists)
        const shouldInitializeGame = currentStage === 'game' && !!sessionId && !gameInstanceRef.current && phaserContainerRef.current;

        if (shouldInitializeGame) {
            console.log('[App.tsx] Conditions met to initialize Phaser game. phaserContainerRef.current:', phaserContainerRef.current);
            setIsLoadingGame(true); // Show loading overlay

            // Delay initialization slightly to ensure DOM is ready and React finishes its render cycle
            // This can sometimes help with Phaser's canvas creation.
            const timeoutId = setTimeout(() => {
                try {
                    const game = initializePhaser(phaserContainerRef.current!);
                    gameInstanceRef.current = game;
                    console.log('[App.tsx] Phaser game instance created and assigned to ref.');
                    setIsLoadingGame(false); // Hide loading overlay now that game is initialized

                    // Set up event listeners for portals from the Phaser game
                    const portalEvents = [
                        'open-career-portal', 'open-coding-portal', 'open-whiteboard',
                        'open-elibrary-portal', 'open-marketplace', 'open-club-resources',
                        'open-game-selection', 'open-academic-portal', 'open-finance-portal',
                        'open-compdept-portal', 'open-itdept-portal', 'open-market-portal',
                        'open-gaming-portal'
                    ];

                    portalEvents.forEach(eventName => {
                        game.events.on(eventName, () => {
                            console.log(`[App.tsx] Phaser game emitted event: ${eventName}`);
                            const portalId = eventName.replace('open-', '').replace('-portal', '');
                            handleOpenPortal(portalId);
                        });
                    });

                } catch (error) {
                    console.error("[App.tsx] Error initializing Phaser game:", error);
                    setIsLoadingGame(false); // Hide loading on error
                    // Optionally, transition to an error stage or display a persistent error message
                }
            }, 100); // Small delay, adjust if needed

            return () => {
                clearTimeout(timeoutId); // Clear timeout if component unmounts before it fires
                if (gameInstanceRef.current) {
                    console.log('[App.tsx] Cleaning up Phaser game instance.');
                    const game = gameInstanceRef.current;
                    const portalEvents = [
                        'open-career-portal', 'open-coding-portal', 'open-whiteboard',
                        'open-elibrary-portal', 'open-marketplace', 'open-club-resources',
                        'open-game-selection', 'open-academic-portal', 'open-finance-portal',
                        'open-compdept-portal', 'open-itdept-portal', 'open-market-portal',
                        'open-gaming-portal'
                    ];
                    portalEvents.forEach(eventName => {
                        game.events.off(eventName); // Remove all listeners for this event
                    });

                    game.destroy(true); // Destroy the Phaser game instance
                    gameInstanceRef.current = null; // Clear the ref
                }
            };
        }
    }, [currentStage, sessionId, handleOpenPortal]); // Re-run when stage or session ID changes

    const renderModalContent = () => {
        if (!activeModal) return null;

        const PortalComponent = portalComponents[activeModal]?.component;

        if (PortalComponent) {
            return <PortalComponent />;
        }

        return <div>Content for {modalTitle} portal is under development</div>;
    };

    const handleJoinGame = () => {
        setCurrentStage('game');
    };

    console.log(`[App.tsx Render] currentStage: ${currentStage}, sessionId: ${sessionId}, gameInstanceRef.current: ${!!gameInstanceRef.current}, isLoadingGame: ${isLoadingGame}`);


    return (
        <div className="App">
            {currentStage === 'login' && <LoginPage onLoginSuccess={() => setCurrentStage('avatar_selection')} />}
            {currentStage === 'avatar_selection' && <AvatarSelector onAvatarSelected={() => setCurrentStage('camera_setup')} />}
            {currentStage === 'camera_setup' && <CameraSetup onCameraSetupComplete={() => setCurrentStage('lobby')} />}
            {currentStage === 'lobby' && <Lobby onJoinRoom={handleJoinGame} />}

            {/* Render the Phaser game container directly when in 'game' stage */}
            {currentStage === 'game' && (
                <div
                    id="phaser-container"
                    ref={phaserContainerRef}
                    style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }} // Use 100vh for full height
                >
                    {/* The Phaser canvas will be appended here by initializePhaser */}
                    {/* The loading overlay is now conditionally rendered inside this container */}
                    {isLoadingGame && (
                        <div className="flex items-center justify-center absolute inset-0 bg-gray-900 bg-opacity-75 z-50">
                            <p className="text-xl text-white">
                                Joining campus... preparing visuals.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Render modals on top of the game or other stages */}
            {activeModal && (
                <Modal onClose={() => setActiveModal(null)}>
                    {renderModalContent()}
                </Modal>
            )}

            {/* Render the mini video call component */}
            {showMiniVideo && <VideoCall onClose={() => setShowMiniVideo(false)} />}
        </div>
    );
}

export default App;
