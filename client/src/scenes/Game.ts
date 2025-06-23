// client/src/scenes/Game.ts
import Phaser from 'phaser';
import { createCharacterAnims } from '../anims/CharacterAnims';
import { InteractableHandler } from '../utils/InteractableHandler';
import { colyseusService } from '../services/ColyseusService';
import { UserStore } from '../stores/UserStore';
import type { Player } from '../types/Player';

// Extend the PlayerSprite interface to include properties for interpolation
interface PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    sessionId: string;
    label?: Phaser.GameObjects.Text;
    direction?: string;
    characterType?: string;
}

// New interface to track remote player state for interpolation
interface RemotePlayerState {
    lastX: number;
    lastY: number;
    lastAnimation: string; // The full animation key (e.g., 'adam_run_down')
    lastDirection: string;
    lastUpdateTime: number;
    targetX?: number; // Target X position received from server
    targetY?: number; // Target Y position received from server
    lastReceivedAnimation: string; // The raw animation name from server (e.g., 'run', 'idle', 'sit_down')
    lastReceivedDirection: string; // The raw direction from server (e.g., 'down')
}

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: PlayerSprite; // Changed to PlayerSprite for consistency
    private map!: Phaser.Tilemaps.Tilemap;
    private wallLayer!: Phaser.Tilemaps.TilemapLayer;
    private furnitureLayer!: Phaser.Tilemaps.TilemapLayer;

    private keyS!: Phaser.Input.Keyboard.Key;
    private keyO!: Phaser.Input.Keyboard.Key;
    private keyE!: Phaser.Input.Keyboard.Key;
    private keyP!: Phaser.Input.Keyboard.Key;
    private keySpace!: Phaser.Input.Keyboard.Key;

    private interactableHandler!: InteractableHandler;
    private currentZone = 'general'; // Not directly used in the provided snippets but kept
    private activeCharacter = 'adam'; // Will be set from UserStore avatarUrl

    // Track previous state of local player to reduce server messages
    private prevPlayerX: number = -1;
    private prevPlayerY: number = -1;
    private prevPlayerAnimation: string = "";
    private prevPlayerDirection: string = "";

    // For throttling local player state updates to the server
    private lastSentStateTime: number = 0;
    private sendUpdateInterval: number = 50; // milliseconds

    private unsubscribeUserStore: (() => void) | null = null;

    // Animation state tracking for remote players (now using the new interface)
    private remotePlayerStates: Map<string, RemotePlayerState> = new Map();
    private otherPlayers: Map<string, PlayerSprite> = new Map(); // Keep this for actual sprite references

    constructor() {
        super('game');
        console.log('[Game Scene] Constructor called.');
    }

    preload() {
        console.log('[Game Scene] preload() method started.');
        // Load map assets
        this.load.tilemapTiledJSON('map', 'assets/map/campus_map.json');
        this.load.spritesheet('Floor', 'assets/map/Floor.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('Generic', 'assets/tileset/Generic.png');
        this.load.image('Office', 'assets/tileset/Modern_Office_Black_Shadow.png');
        this.load.image('Classroom', 'assets/tileset/Classroom_and_library.png');
        this.load.image('Basement', 'assets/tileset/Basement.png');
        this.load.image('chair', 'assets/items/chair.png');
        this.load.image('Computer', 'assets/items/computer.png');
        this.load.image('vendingMachine', 'assets/items/vendingmachine.png');
        this.load.image('WhiteBoard', 'assets/items/whiteboard.png');

        const characterFrameConfig = { frameWidth: 32, frameHeight: 48 };
        this.load.spritesheet('adam', 'assets/character/adam.png', characterFrameConfig);
        this.load.spritesheet('nancy', 'assets/character/nancy.png', characterFrameConfig);
        this.load.spritesheet('lucy', 'assets/character/lucy.png', characterFrameConfig);
        this.load.spritesheet('ash', 'assets/character/ash.png', characterFrameConfig);

        console.log('[Game Scene] preload() method finished.');
    }

    create() {
        console.log('[Game Scene] create() method started.');
        if (!this.input.keyboard) {
            console.error('[Game Scene] Keyboard input not enabled!');
            throw new Error('Keyboard input not enabled');
        }

        // Create animations for all characters
        createCharacterAnims(this.anims);
        console.log('[Game Scene] Character animations created');

        // Map setup
        this.map = this.make.tilemap({ key: 'map' });
        const tilesets = [
            this.map.addTilesetImage('Floor', 'Floor'),
            this.map.addTilesetImage('Generic', 'Generic'),
            this.map.addTilesetImage('Office', 'Office'),
            this.map.addTilesetImage('Classroom', 'Classroom'),
            this.map.addTilesetImage('Basement', 'Basement'),
            this.map.addTilesetImage('chair', 'chair'),
            this.map.addTilesetImage('Computer', 'Computer'),
            this.map.addTilesetImage('vendingMachine', 'vendingMachine'),
            this.map.addTilesetImage('WhiteBoard', 'WhiteBoard'),
        ].filter((t): t is Phaser.Tilemaps.Tileset => t !== null);

        this.map.createLayer('Ground', tilesets);
        this.furnitureLayer = this.map.createLayer('Furniture', tilesets)!;
        this.furnitureLayer.setCollisionByProperty({ collides: true });
        this.wallLayer = this.map.createLayer('Wall', tilesets)!;
        this.wallLayer.setCollisionByProperty({ collides: true });
        this.map.createLayer('Object', tilesets);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Player setup
        const userAvatarId = UserStore.getState().avatarId;
        if (userAvatarId) {
            this.activeCharacter = userAvatarId;
        } else {
            // Fallback: try to extract from avatar URL (for backward compatibility)
            const userAvatarUrl = UserStore.getState().avatarUrl;
            if (userAvatarUrl) {
                // Try to match both path formats
                let match = userAvatarUrl.match(/assets\/character\/(\w+)\.png/);
                if (!match) {
                    // Try the login images path format
                    match = userAvatarUrl.match(/assets\/images\/(\w+)_login\.png/);
                }
                
                if (match && match[1]) {
                    this.activeCharacter = match[1].toLowerCase(); // Ensure lowercase for consistency
                }
            }
        }

        console.log(`[Game Scene] Local player activeCharacter set to: ${this.activeCharacter}`);

        const localPlayerFromStore = UserStore.getState().players.find(
            (p) => p.id === UserStore.getState().sessionId
        );
        const initialX = localPlayerFromStore?.x || this.map.widthInPixels / 2;
        const initialY = localPlayerFromStore?.y || this.map.heightInPixels / 2 + 250;

        this.player = this.physics.add.sprite(initialX, initialY, this.activeCharacter, 0) as PlayerSprite;
        this.player.sessionId = UserStore.getState().sessionId!;
        this.player.characterType = this.activeCharacter;
        this.player.setSize(16, 16).setOffset(8, 32);
        this.player.play(`${this.activeCharacter}_idle_down`);
        this.player.direction = 'down'; // Initialize local player direction
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.furnitureLayer);
        this.player.setDepth(10);

        this.player.label = this.add.text(this.player.x, this.player.y - 40, UserStore.getState().userName || 'You', {
            fontSize: '14px',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            fontStyle: 'bold',
            padding: { x: 8, y: 5 }
        }).setOrigin(0.5).setDepth(11);

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(1);

        // Input
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.keyS = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyO = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyE = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyP = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keySpace = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.interactableHandler = new InteractableHandler(this, this.player);
        this.interactableHandler.loadFromMap(this.map);

        this.add.text(20, 5, "Controls: Arrow keys to move, 'S' to Sit, 'SPACE' to Stand Up, 'O' to Open, 'E' to Enter, 'P' to Play", {
            fontSize: '20px',
            color: '#fff',
            backgroundColor: '#000',
            fontStyle: 'bold',
            padding: {
                x: 10,
                y: 8
            }
        }).setScrollFactor(0).setDepth(999);

        // Colyseus Integration
        const room = colyseusService.getRoom();
        if (room) {
            this.sendPlayerStateToServer(); // Send initial state

            console.log('[Game Scene] Attempting to subscribe to UserStore.players...');

            let lastKnownPlayers: Player[] = []; // To prevent unnecessary updates from UserStore

            this.unsubscribeUserStore = UserStore.subscribe(
                (state) => {
                    const currentPlayers = state.players;
                    const localSessionId = state.sessionId;

                    // Manual deep equality check (consider if this is too strict for rapid updates)
                    // For debugging, you might temporarily comment this out to see all updates
                    if (JSON.stringify(currentPlayers) === JSON.stringify(lastKnownPlayers)) {
                        return;
                    }
                    lastKnownPlayers = JSON.parse(JSON.stringify(currentPlayers)); // Deep copy to prevent mutation issues

                    // console.log('[Game Scene] UserStore.subscribe callback triggered');
                    // console.log(`[Game Scene] Total players in store: ${currentPlayers.length}`);

                    const playersInStoreMap = new Map(currentPlayers.map((p: Player) => [p.id, p]));

                    // Remove players who are no longer in the store
                    this.otherPlayers.forEach((sprite, id) => {
                        if (!playersInStoreMap.has(id)) {
                            console.log(`[Game Scene] Removing player sprite for ID: ${id}`);
                            sprite.label?.destroy();
                            sprite.destroy();
                            this.otherPlayers.delete(id);
                            this.remotePlayerStates.delete(id);
                        }
                    });

                    // Add or update players currently in the store
                    currentPlayers.forEach((player: Player) => {
                        if (player.id === localSessionId) {
                            // Local player - only update if server sends significant correction
                            if (Math.abs(this.player.x - player.x) > 5 || Math.abs(this.player.y - player.y) > 5) {
                                console.log(`[Game Scene] Server corrected local player position from (${this.player.x}, ${this.player.y}) to (${player.x}, ${player.y})`);
                                this.player.setPosition(player.x, player.y);
                                this.player.label?.setPosition(player.x, player.y - 40);
                            }
                            return; // Skip local player for remote updates
                        }

                        // Process Remote Players
                        this.updateRemotePlayer(player);
                    });
                }
            );
        } else {
            console.warn("[Game Scene] Colyseus room not available. Multiplayer features will not work.");
        }

        // Portal Event Forwarding
        const portalEvents = [
            'open-career-portal', 'open-coding-portal', 'open-whiteboard',
            'open-elibrary-portal', 'open-marketplace', 'open-club-resources',
            'open-game-selection', 'open-academic-portal', 'open-finance-portal',
            'open-compdept-portal', 'open-itdept-portal', 'open-market-portal',
            'open-gaming-portal'
        ];

        portalEvents.forEach(eventName => {
            this.events.on(eventName, () => {
                console.log(`[Game Scene] Forwarding scene event to game: ${eventName}`);
                this.game.events.emit(eventName);
            });
        });

        // Portal setup
        const portalLayer = this.map.getObjectLayer('Portals');
        if (portalLayer) {
            this.map.findObject('Portals', (obj: any) => {
                if (obj.properties && obj.properties.portalId) {
                    const portalRect = this.add.zone(obj.x, obj.y, obj.width, obj.height)
                        .setOrigin(0, 0)
                        .setData('portalId', obj.properties.portalId);
                    this.physics.world.enable(portalRect);
                    this.physics.add.overlap(this.player, portalRect, this.handlePortalOverlap, undefined, this);
                }
            });
        }

        console.log('[Game Scene] create() method finished.');
    }

    private updateRemotePlayer(player: Player) {
        // console.log(`[Game Scene] Processing remote player: ${player.name} (ID: ${player.id})`);
        // console.log(`[Game Scene] Remote player data received: x=${player.x}, y=${player.y}, animation=${player.animation}, direction=${player.direction}`);

        let otherPlayerSprite = this.otherPlayers.get(player.id);
        const currentTime = this.time.now;

        let remoteState = this.remotePlayerStates.get(player.id);

        if (!otherPlayerSprite) {
            // Player joined: Create new sprite
            let playerChar = 'adam';

            if (player.avatarUrl) {
                // Try character spritesheet format first: assets/character/adam.png
                let match = player.avatarUrl.match(/assets\/character\/(\w+)\.png/);
                if (!match) {
                    // Try login image format: assets/images/Adam_login.png
                    match = player.avatarUrl.match(/assets\/images\/(\w+)_login\.png/);
                }
                
                if (match && match[1]) {
                    playerChar = match[1].toLowerCase(); // Ensure lowercase for consistency
                }
            }
            
            console.log(`[Game Scene] Creating new sprite for ${player.name}. Character: ${playerChar}, avatarUrl: ${player.avatarUrl}`);

            if (!this.textures.exists(playerChar)) {
                console.warn(`[Game Scene] Texture for character ${playerChar} not loaded. Using default 'adam'.`);
                otherPlayerSprite = this.physics.add.sprite(player.x, player.y, 'adam', 0) as PlayerSprite;
                otherPlayerSprite.characterType = 'adam';
            } else {
                otherPlayerSprite = this.physics.add.sprite(player.x, player.y, playerChar, 0) as PlayerSprite;
                otherPlayerSprite.characterType = playerChar;
            }

            otherPlayerSprite.sessionId = player.id;
            otherPlayerSprite.setSize(16, 16).setOffset(8, 32);
            otherPlayerSprite.setDepth(9);
            this.physics.add.collider(otherPlayerSprite, this.wallLayer);
            this.physics.add.collider(otherPlayerSprite, this.furnitureLayer);
            this.otherPlayers.set(player.id, otherPlayerSprite);

            const label = this.add.text(player.x, player.y - 40, player.name, {
                fontSize: '14px',
                color: '#FFFF00', // Yellow for remote players
                backgroundColor: '#000000',
                fontStyle: 'bold',
                padding: { x: 8, y: 5 }
            }).setOrigin(0.5).setDepth(11);
            otherPlayerSprite.label = label;

            console.log(`[Game Scene] Created remote player sprite for ${player.name}`);

            // Initialize remote state with received data
            remoteState = {
                lastX: player.x,
                lastY: player.y,
                lastAnimation: this.normalizeAnimationName(player.animation || 'idle', player.direction || 'down', otherPlayerSprite.characterType),
                lastDirection: player.direction || 'down',
                lastUpdateTime: currentTime,
                targetX: player.x,
                targetY: player.y,
                lastReceivedAnimation: player.animation || 'idle',
                lastReceivedDirection: player.direction || 'down',
            };
            this.remotePlayerStates.set(player.id, remoteState);
            otherPlayerSprite.play(remoteState.lastAnimation, true); // Play initial animation
        } else {
            // Update existing remote state with new target values
            if (!remoteState) {
                // This case should ideally not happen after initial creation
                console.warn(`[Game Scene] Remote state not found for existing player ${player.id}. Re-initializing.`);
                remoteState = {
                    lastX: otherPlayerSprite.x,
                    lastY: otherPlayerSprite.y,
                    lastAnimation: otherPlayerSprite.anims.currentAnim?.key || `${otherPlayerSprite.characterType}_idle_down`,
                    lastDirection: otherPlayerSprite.direction || 'down',
                    lastUpdateTime: currentTime,
                    targetX: player.x,
                    targetY: player.y,
                    lastReceivedAnimation: player.animation || 'idle',
                    lastReceivedDirection: player.direction || 'down',
                };
                this.remotePlayerStates.set(player.id, remoteState);
            } else {
                remoteState.targetX = player.x;
                remoteState.targetY = player.y;
                remoteState.lastReceivedAnimation = player.animation || 'idle';
                remoteState.lastReceivedDirection = player.direction || 'down';
                remoteState.lastUpdateTime = currentTime;
            }
        }
    }

    // Improved animation normalization
    private normalizeAnimationName(serverAnimation: string, direction: string, characterType: string): string {
        // Ensure characterType is valid for animation key generation
        if (!characterType) {
            console.warn("[Game Scene] normalizeAnimationName called with undefined characterType. Falling back to 'adam'.");
            characterType = 'adam'; // Fallback
        }

        // If the animation already includes the character prefix, return as-is
        if (serverAnimation.startsWith(characterType + '_')) {
            return serverAnimation;
        }

        // Handle basic states and ensure they get a direction suffix
        if (serverAnimation === 'idle' || !serverAnimation) {
            return `${characterType}_idle_${direction}`;
        }

        // Handle movement states
        // Ensure that 'run' is used if server sends 'walk' or 'move'
        if (serverAnimation.includes('run') || serverAnimation.includes('walk') || serverAnimation.includes('move')) {
            return `${characterType}_run_${direction}`;
        }

        // Handle sitting states
        if (serverAnimation.includes('sit')) {
            // Check if the server string already includes the direction
            if (serverAnimation.endsWith('_down') || serverAnimation.endsWith('_left') || serverAnimation.endsWith('_right') || serverAnimation.endsWith('_up')) {
                return `${characterType}_${serverAnimation}`; // e.g., "sit_down" -> "adam_sit_down"
            }
            return `${characterType}_sit_${direction}`;
        }

        // Direct mapping for specific server animation names that might not be raw 'run'/'idle'/'sit'
        const animationMappings: { [key: string]: string } = {
            'run_left': `${characterType}_run_left`,
            'run_right': `${characterType}_run_right`,
            'run_up': `${characterType}_run_up`,
            'run_down': `${characterType}_run_down`,
            'idle_left': `${characterType}_idle_left`,
            'idle_right': `${characterType}_idle_right`,
            'idle_up': `${characterType}_idle_up`,
            'idle_down': `${characterType}_idle_down`,
            'sit_left': `${characterType}_sit_left`,
            'sit_right': `${characterType}_sit_right`,
            'sit_up': `${characterType}_sit_up`,
            'sit_down': `${characterType}_sit_down`,
        };

        // Try direct mapping first (this helps if server sends e.g. "idle_down")
        if (animationMappings[serverAnimation]) {
            return animationMappings[serverAnimation];
        }

        // Fallback to idle if we can't figure it out
        console.warn(`[Game Scene] Could not normalize animation '${serverAnimation}' for character '${characterType}'. Using idle fallback.`);
        return `${characterType}_idle_${direction}`;
    }

    update(time: number, delta: number) {
        if (!this.player || !this.player.body) return;

        // Handle local player input and movement
        const wasMoving = this.handleMovement();

        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            const chairDirection = this.interactableHandler.handleSit();
            if (chairDirection) {
                // Update player direction to match chair's direction
                this.player.direction = chairDirection;
                // Play the correct sitting animation
                const sitAnim = `${this.activeCharacter}_sit_${chairDirection}`;
                if (this.anims.exists(sitAnim)) {
                    this.player.play(sitAnim, true);
                } else {
                    console.warn(`Sitting animation ${sitAnim} not found`);
                    this.player.play(`${this.activeCharacter}_sit_down`, true);
                }
            }
            this.sendPlayerStateToServer();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyO)) {
            this.interactableHandler.handleInteraction();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
            this.interactableHandler.handleZoneInteraction();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
            this.interactableHandler.handleGameInteraction();
        }

        // Only allow standing up if currently sitting
        if (this.interactableHandler.isPlayerSitting()) {
            if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
                this.interactableHandler.getUpFromChair();
                this.sendPlayerStateToServer(); // Send update after standing
            }
            // If sitting, prevent further movement and animation logic for local player in this update cycle
            // The handleMovement function already handles setting velocity to 0 and playing sit anim.
            // If the player is sitting, we don't want to send movement updates unless they stand up.
            // So, no `sendPlayerStateToServer` if only sitting. It was sent when they sat down or stood up.
        } else {
             // Send updates at regular intervals or when state changes for the local player
            if (time - this.lastSentStateTime > this.sendUpdateInterval || wasMoving) {
                this.sendPlayerStateToServer();
                this.lastSentStateTime = time;
            }
        }


        this.interactableHandler.updateHints();

        // --- REMOTE PLAYER INTERPOLATION AND ANIMATION UPDATE ---
        this.otherPlayers.forEach((sprite, id) => {
            const remoteState = this.remotePlayerStates.get(id);

            if (remoteState && sprite.body && sprite.characterType) {
                const lerpFactor = 0.15; // Controls smoothness, adjust as needed (0.1 to 0.25 common)

                // Interpolate position towards the target received from the server
                if (remoteState.targetX !== undefined && remoteState.targetY !== undefined) {
                    sprite.x = Phaser.Math.Linear(sprite.x, remoteState.targetX, lerpFactor);
                    sprite.y = Phaser.Math.Linear(sprite.y, remoteState.targetY, lerpFactor);

                    // Update label position to follow the sprite
                    if (sprite.label) {
                        sprite.label.setPosition(sprite.x, sprite.y - 40);
                    }
                }

                // Determine current animation based on movement or server data
                const positionDelta = Math.abs(sprite.x - remoteState.targetX!) + Math.abs(sprite.y - remoteState.targetY!);
                const movementThreshold = 1; // If current position is close to target, consider them not moving for animation

                let animToPlay = '';
                // If the player is currently moving significantly towards the target, play run animation
                if (positionDelta > movementThreshold && (remoteState.lastReceivedAnimation === 'run' || remoteState.lastReceivedAnimation.includes('run'))) {
                    animToPlay = `${sprite.characterType}_run_${remoteState.lastReceivedDirection}`;
                } else {
                    // Otherwise, play the animation sent by the server (idle/sit)
                    animToPlay = this.normalizeAnimationName(
                        remoteState.lastReceivedAnimation,
                        remoteState.lastReceivedDirection,
                        sprite.characterType
                    );
                }

                // Play animation only if it's different from the current one
                if (sprite.anims.currentAnim?.key !== animToPlay) {
                    if (this.anims.exists(animToPlay)) {
                        sprite.play(animToPlay, true);
                    } else {
                        // Fallback if the animation does not exist (should be caught by createCharacterAnims)
                        console.warn(`[Game Scene] Remote animation '${animToPlay}' does not exist for player ${id}. Falling back to idle.`);
                        sprite.play(`${sprite.characterType}_idle_${remoteState.lastReceivedDirection}`, true);
                    }
                }
            }
        });
        // --- END REMOTE PLAYER INTERPOLATION ---
    }

    private handleMovement(): boolean {
        if (!this.player.body) return false;

        if (this.interactableHandler.isPlayerSitting()) {
            this.player.setVelocity(0, 0);
            // Ensure sitting animation continues playing
            const currentAnim = this.player.anims.currentAnim?.key;
            if (currentAnim && currentAnim.includes('sit')) {
                // Keep the sitting animation active
                if (!this.player.anims.isPlaying || this.player.anims.currentAnim?.key !== currentAnim) {
                    this.player.play(currentAnim, true);
                }
            }
            return false; // No movement occurred
        }

        const speed = 150;
        let isMoving = false;
        this.player.setVelocity(0); // Reset velocity each frame

        let currentAnimation = this.player.anims.currentAnim?.key || `${this.activeCharacter}_idle_down`;
        let currentDirection = this.player.direction || 'down'; // Default direction

        // Prioritize cardinal directions for movement and animation
        if (this.cursors.left?.isDown) {
            this.player.setVelocityX(-speed);
            currentDirection = 'left';
            isMoving = true;
        } else if (this.cursors.right?.isDown) {
            this.player.setVelocityX(speed);
            currentDirection = 'right';
            isMoving = true;
        }

        if (this.cursors.up?.isDown) {
            this.player.setVelocityY(-speed);
            currentDirection = 'up'; // Overrides horizontal direction if also moving up
            isMoving = true;
        } else if (this.cursors.down?.isDown) {
            this.player.setVelocityY(speed);
            currentDirection = 'down'; // Overrides horizontal direction if also moving down
            isMoving = true;
        }

        // Normalize diagonal movement (prevents faster diagonal movement)
        if (this.player.body.velocity.x !== 0 && this.player.body.velocity.y !== 0) {
            this.player.body.velocity.normalize().scale(speed);
        }

        // Set animation based on movement state and direction
        if (isMoving) {
            currentAnimation = `${this.activeCharacter}_run_${currentDirection}`;
        } else {
            // If not moving, transition to idle animation based on the *last* known direction
            // This ensures they face the last direction they were moving.
            currentAnimation = `${this.activeCharacter}_idle_${currentDirection}`;
        }

        // Update animation only if it needs to change
        if (this.player.anims.currentAnim?.key !== currentAnimation) {
            if (this.anims.exists(currentAnimation)) {
                this.player.play(currentAnimation, true);
            } else {
                console.warn(`[Game Scene] Animation '${currentAnimation}' not found for local player. Falling back.`);
                this.player.play(`${this.activeCharacter}_idle_down`, true); // Safest fallback
            }
        }

        this.player.direction = currentDirection; // Store the current direction on the player sprite

        // Update label position
        if (this.player.label) {
            this.player.label.setPosition(this.player.x, this.player.y - 40);
        }

        // Return true if the player is actively moving, for throttling server updates
        return isMoving;
    }

    private sendPlayerStateToServer() {
        if (!colyseusService.getRoom()) return;

        const currentX = Math.round(this.player.x);
        const currentY = Math.round(this.player.y);
        const currentAnimation = this.player.anims.currentAnim?.key || `${this.activeCharacter}_idle_down`;
        const currentDirection = this.player.direction || 'down';

        // Send update if position, animation, or direction changed
        if (currentX !== this.prevPlayerX ||
            currentY !== this.prevPlayerY ||
            currentAnimation !== this.prevPlayerAnimation ||
            currentDirection !== this.prevPlayerDirection) {

            // Send simplified animation name to server
            let serverAnimation = currentAnimation;
            if (currentAnimation.startsWith(this.activeCharacter + '_')) {
                serverAnimation = currentAnimation.substring(this.activeCharacter.length + 1);
            }
            
            // Handle sitting state specifically
            if (serverAnimation.startsWith('sit_')) {
                serverAnimation = 'sit'; // Send 'sit' to server regardless of direction
            } else if (serverAnimation.startsWith('run_')) {
                serverAnimation = 'run';
            } else if (serverAnimation.startsWith('idle_')) {
                serverAnimation = 'idle';
            }

            colyseusService.sendPlayerMovement(
                currentX,
                currentY,
                serverAnimation,
                currentDirection
            );

            this.prevPlayerX = currentX;
            this.prevPlayerY = currentY;
            this.prevPlayerAnimation = currentAnimation;
            this.prevPlayerDirection = currentDirection;
        }
    }

    private handlePortalOverlap(player: Phaser.GameObjects.GameObject, portalRect: Phaser.GameObjects.Zone) {
        const portalId = portalRect.getData('portalId');
        if (portalId) {
            console.log(`[Game Scene] Overlapped with portal object: ${portalId}`);
            this.game.events.emit(`open-${portalId}-portal`);
        }
    }

    shutdown() {
        console.log('[Game Scene] shutdown() method called.');

        if (this.unsubscribeUserStore) {
            this.unsubscribeUserStore();
            this.unsubscribeUserStore = null;
        }

        this.otherPlayers.forEach(sprite => {
            sprite.label?.destroy();
            sprite.destroy();
        });
        this.otherPlayers.clear();
        this.remotePlayerStates.clear();

        if (this.player) {
            this.player.label?.destroy();
            this.player.destroy();
            this.player = null!;
        }

        if (this.map) {
            this.map.destroy();
            this.map = null!;
        }

        // Clean up references to prevent memory leaks
        this.wallLayer = null!;
        this.furnitureLayer = null!;
        this.cursors = null!;
        this.keyS = null!;
        this.keyO = null!;
        this.keyE = null!;
        this.keyP = null!;
        this.keySpace = null!;
        this.interactableHandler = null!;

        console.log('[Game Scene] shutdown() method finished.');
    }
}