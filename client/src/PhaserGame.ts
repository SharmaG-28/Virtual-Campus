// client/src/PhaserGame.ts
import Phaser from 'phaser';
import Game from './scenes/Game'; // Main game scene

// This function will now initialize the Phaser game and return the game instance.
// The parent element will be passed during initialization.
const initializePhaser = (parentEl: HTMLDivElement): Phaser.Game => {
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO, // Automatically choose WebGL or Canvas
        width: window.innerWidth, // Set initial width (will be resized by CSS)
        height: window.innerHeight, // Set initial height (will be resized by CSS)
        parent: parentEl, // Attach to the provided DOM element
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x:0, y: 0 }, // No gravity for a top-down game
                debug: false // Set to true for physics debug visuals
            }
        },
        scene: [Game], // Add your game scenes here
        scale: {
            mode: Phaser.Scale.RESIZE, // Allow Phaser to resize with its parent container
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        render: {
            pixelArt: true // For pixel art games
        }
    };

    const game = new Phaser.Game(config);

    // Optional: Add a resize listener to ensure the game canvas resizes with the window
    // This might be redundant with Phaser.Scale.RESIZE but can help in some setups.
    window.addEventListener('resize', () => {
        if (game.isBooted) {
            game.scale.resize(window.innerWidth, window.innerHeight);
        }
    });

    return game;
};

export default initializePhaser;
