// src/utils/InteractableHandler.ts
import Phaser from 'phaser';
import Chair from '../items/Chair';
import Computer from '../items/Computer';
import Whiteboard from '../items/Whiteboard';
import Cupboard from '../items/Cupboard';
import GameTable from '../items/GameTable';
import DialogPrompt from '../items/DialogPrompt';
import type { Interactable } from '../interfaces/Interactable';

export interface InteractableObject {
  x: number;
  y: number;
  width?: number;
  height?: number;
  type: string;
  properties: {
    name: string;
    value: any;
  }[];
}

interface Zone extends Interactable {
  rect: Phaser.Geom.Rectangle;
}

export class InteractableHandler {
  private scene: Phaser.Scene;
  private player: Phaser.Physics.Arcade.Sprite;
  private interactables: Interactable[] = [];
  private zones: Zone[] = [];
  private chairs: Chair[] = [];
  private computers: Computer[] = [];
  private whiteboards: Whiteboard[] = [];
  private cupboards: Cupboard[] = [];
  private gameTables: GameTable[] = [];
  private currentChair?: Chair;
  private isSitting = false;
  private currentZone?: Zone;
  private zonePrompt?: DialogPrompt;

  // Define which zones have E key interactions
  private readonly INTERACTIVE_ZONES = [
    'academic', 'finance', 'compdept', 'itdept', 'library',
  ];

  constructor(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.player = player;
    this.zonePrompt = new DialogPrompt(scene);
  }

  /**
   * Load and process all interactable objects from Tiled map layers
   */
  loadFromMap(map: Phaser.Tilemaps.Tilemap): void {
    // console.log('Loading interactables from map...');
    
    // Process zones first so we can determine object types based on zones
    this.processObjectLayer(map, 'Zones', (obj) => {
      return this.createZone(obj);
    });

    // Process chairs
    this.processObjectLayer(map, 'Chairs', (obj) => {
      return this.createChair(obj);
    });

    // Process computers
    this.processObjectLayer(map, 'Computers', (obj) => {
      return this.createComputer(obj);
    });

    // Process whiteboards
    this.processObjectLayer(map, 'Whiteboards', (obj) => {
      return this.createWhiteboard(obj);
    });

    // Process cupboards
    this.processObjectLayer(map, 'Cupboards', (obj) => {
      return this.createCupboard(obj);
    });

    // Process game tables
    this.processObjectLayer(map, 'Games', (obj) => {
      return this.createGameTable(obj);
    });

    // console.log(`Loaded: ${this.zones.length} zones, ${this.chairs.length} chairs, ${this.computers.length} computers, ${this.whiteboards.length} whiteboards, ${this.cupboards.length} cupboards, ${this.gameTables.length} game tables`);
  }

  /**
   * Process an object layer and create interactable objects
   */
  private processObjectLayer(
    map: Phaser.Tilemaps.Tilemap,
    layerName: string,
    createFn: (obj: InteractableObject) => Interactable | null
  ): void {
    const layer = map.getObjectLayer(layerName);
    if (!layer) {
      // console.log(`Layer ${layerName} not found`);
      return;
    }

    // console.log(`Processing ${layerName} layer with ${layer.objects.length} objects`);

    layer.objects.forEach(obj => {
      // For Tiled objects, x,y is the top-left corner for rectangles
      const interactableObj: InteractableObject = {
        x: obj.x !== undefined ? obj.x + (obj.width ? obj.width / 2 : 0) : 0,
        y: obj.y !== undefined ? obj.y + (obj.height ? obj.height / 2 : 0) : 0,
        width: obj.width,
        height: obj.height,
        type: obj.type || layerName.toLowerCase(),
        properties: obj.properties || []
      };

      // console.log(`Creating ${layerName} object at (${interactableObj.x}, ${interactableObj.y}) with properties:`, interactableObj.properties);

      const interactable = createFn(interactableObj);
      if (interactable) {
        this.interactables.push(interactable);
        
        // Add to specific tracking arrays
        if (interactable instanceof Chair) {
          this.chairs.push(interactable);
        } else if (interactable instanceof Computer) {
          this.computers.push(interactable);
        } else if (interactable instanceof Whiteboard) {
          this.whiteboards.push(interactable);
        } else if (interactable instanceof Cupboard) {
          this.cupboards.push(interactable);
        } else if (interactable instanceof GameTable) {
          this.gameTables.push(interactable);
        }
      }
    });
  }

  /**
   * Create a zone interactable
   */
  private createZone(obj: InteractableObject): Zone | null {
    if (!obj.width || !obj.height) return null;
    
    const zoneName = this.getProperty(obj, 'zone', 'general');
    // console.log(`Creating zone: ${zoneName} at (${obj.x}, ${obj.y})`);
    
    const rect = new Phaser.Geom.Rectangle(
      obj.x - obj.width / 2,
      obj.y - obj.height / 2,
      obj.width,
      obj.height
    );

    const zone: Zone = {
      x: obj.x,
      y: obj.y,
      width: obj.width,
      height: obj.height,
      rect: rect,
      zoneType: zoneName,
      actionKey: 'E', // Zone uses E key
      interact: (player?: Phaser.Physics.Arcade.Sprite) => {
        // console.log(`Zone interaction triggered for: ${zoneName}`);
        // Handle specific zone interactions with correct event names
        switch (zoneName) {
          case 'academic':
            this.scene.events.emit('open-academic-portal');
            break;
          case 'finance':
            this.scene.events.emit('open-finance-portal');
            break;
          case 'compdept':
            this.scene.events.emit('open-compdept-portal');
            break;
          case 'itdept':
            this.scene.events.emit('open-itdept-portal');
            break;
          case 'library':
            this.scene.events.emit('open-elibrary-portal');
            break;
          case 'market':
            this.scene.events.emit('open-marketplace-portal');
            break;
          case 'career':
            this.scene.events.emit('open-career-portal');
            break;
          case 'coding':
            this.scene.events.emit('open-coding-portal');
            break;
          case 'gaming':
            this.scene.events.emit('open-game-selection-portal');
            break;
          default:
            // For clubs and other zones
            if (zoneName.startsWith('club')) {
              this.scene.events.emit('open-club-resources-portal');
            } else {
              this.scene.events.emit(`open-${zoneName}-portal`);
            }
            break;
        }
        return true;
      },
      showHint: () => {
        // Only show zone prompt when player is in the zone - handled separately
      },
      hideHint: () => {
        // Handled separately
      }
    };
    
    this.zones.push(zone);
    return zone;
  }

  /**
   * Create a chair interactable
   */
  private createChair(obj: InteractableObject): Chair {
    const direction = this.getProperty(obj, 'direction', 'down');
    // console.log(`Creating chair at (${obj.x}, ${obj.y}) facing ${direction}`);
    const chair = new Chair(
      this.scene,
      obj.x,
      obj.y,
      'chair'
    );
    chair.setDirection(direction);
    return chair;
  }

  /**
   * Create a computer interactable
   */
  private createComputer(obj: InteractableObject): Computer {
    // Determine zone type based on position
    const zoneType = this.getZoneTypeAtPosition(obj.x, obj.y);
    // console.log(`Creating computer at (${obj.x}, ${obj.y}) in zone: ${zoneType}`);
    
    const computer = new Computer(
      this.scene,
      obj.x,
      obj.y,
      'Computer',
      zoneType || 'computer'
    );
    
    return computer;
  }

  /**
   * Create a whiteboard interactable
   */
  private createWhiteboard(obj: InteractableObject): Whiteboard {
    // console.log(`Creating whiteboard at (${obj.x}, ${obj.y})`);
    return new Whiteboard(
      this.scene,
      obj.x,
      obj.y,
      'WhiteBoard'
    );
  }

  /**
   * Create a cupboard interactable
   */
  private createCupboard(obj: InteractableObject): Cupboard {
    // Determine zone type based on position
    const zoneType = this.getZoneTypeAtPosition(obj.x, obj.y);
    // console.log(`Creating cupboard at (${obj.x}, ${obj.y}) in zone: ${zoneType}`);
    
    let cupboardZoneType = 'cupboard';
    if (zoneType === 'market') {
      cupboardZoneType = 'marketplace';
    } else if (zoneType && zoneType.startsWith('club')) {
      cupboardZoneType = 'club';
    }
    
    return new Cupboard(
      this.scene,
      obj.x,
      obj.y,
      'cupboard',
      cupboardZoneType
    );
  }

  /**
   * Create a game table interactable
   */
  private createGameTable(obj: InteractableObject): GameTable {
    const gameType = this.getProperty(obj, 'gameType', 'general');
    // console.log(`Creating game table at (${obj.x}, ${obj.y}) with type: ${gameType}`);
    return new GameTable(
      this.scene,
      obj.x,
      obj.y,
      'gameTable',
      gameType
    );
  }

  /**
   * Get a property value from an object
   */
  private getProperty(obj: InteractableObject, name: string, defaultValue: any): any {
    const prop = obj.properties?.find(p => p.name === name);
    return prop ? prop.value : defaultValue;
  }

  /**
   * Get zone type at specific position
   */
  private getZoneTypeAtPosition(x: number, y: number): string | null {
    for (const zone of this.zones) {
      if (Phaser.Geom.Rectangle.Contains(zone.rect, x, y)) {
        return zone.zoneType || null;
      }
    }
    return null;
  }

  /**
   * Get the current zone the player is in
   */
  private getCurrentZoneName(): string | null {
    for (const zone of this.zones) {
      if (Phaser.Geom.Rectangle.Contains(zone.rect, this.player.x, this.player.y)) {
        return zone.zoneType || null;
      }
    }
    return null;
  }

  /**
   * Get the nearest interactable to the player of a specific type
   */
  private getNearestInteractableOfType<T extends Interactable>(
    objects: T[], 
    maxDistance: number = 64
  ): T | null {
    let nearest: T | null = null;
    let minDistance = Infinity;

    for (const obj of objects) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y, obj.x, obj.y
      );
      
      if (distance < maxDistance && distance < minDistance) {
        minDistance = distance;
        nearest = obj;
      }
    }

    return nearest;
  }

  /**
   * Get the nearest interactable to the player
   */
  getNearestInteractable(maxDistance: number = 64): Interactable | null {
    let nearest: Interactable | null = null;
    let minDistance = Infinity;

    // Check standard interactables (excluding zones)
    for (const obj of this.interactables) {
      // Skip zones since we handle them separately
      if ('rect' in obj) continue;
      
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y, obj.x, obj.y
      );
      
      if (distance < maxDistance && distance < minDistance) {
        minDistance = distance;
        nearest = obj;
      }
    }

    return nearest;
  }

  /**
   * Check if player is in a zone and update the current zone
   */
  checkZones(): void {
    // Hide current zone prompt if it exists
    this.zonePrompt?.hide();
    
    // Check each zone to see if the player is in it
    let inZone = false;
    for (const zone of this.zones) {
      if (Phaser.Geom.Rectangle.Contains(zone.rect, this.player.x, this.player.y)) {
        this.currentZone = zone;
        inZone = true;
        
        // Only show prompt for interactive zones
        if (this.INTERACTIVE_ZONES.includes(zone.zoneType || '')) {
          this.zonePrompt?.show(this.player.x, this.player.y - 40, zone.actionKey, `enter ${zone.zoneType}`);
        }
        break;
      }
    }
    
    // If not in any zone, clear the current zone
    if (!inZone) {
      this.currentZone = undefined;
    }
  }

  /**
   * Handle object interaction - prioritize based on current zone context
   */
  handleInteraction(): boolean {
    // console.log('Handling O key interaction');
    const currentZone = this.getCurrentZoneName();
    // console.log('Current zone:', currentZone);
    
    // In gaming zone, prioritize game tables for O key
    if (currentZone === 'gaming') {
      const nearestGame = this.getNearestInteractableOfType(this.gameTables);
      if (nearestGame) {
        // console.log('Interacting with game table in gaming zone');
        return nearestGame.interact(this.player);
      }
    }
    
    // Check whiteboards first (they're common across zones)
    const nearestWhiteboard = this.getNearestInteractableOfType(this.whiteboards);
    if (nearestWhiteboard) {
      // console.log('Interacting with whiteboard');
      return nearestWhiteboard.interact(this.player);
    }
    
    // Zone-specific interactions
    if (currentZone === 'career' || currentZone === 'coding') {
      // In career/coding zones, prioritize computers
      const nearestComputer = this.getNearestInteractableOfType(this.computers);
      if (nearestComputer) {
        // console.log(`Interacting with computer in ${currentZone} zone`);
        return nearestComputer.interact(this.player);
      }
    } else if (currentZone === 'market' || (currentZone && currentZone.startsWith('club'))) {
      // In market/club zones, prioritize cupboards (removed library from here)
      const nearestCupboard = this.getNearestInteractableOfType(this.cupboards);
      if (nearestCupboard) {
        // console.log(`Interacting with cupboard in ${currentZone} zone`);
        return nearestCupboard.interact(this.player);
      }
    }
    
    // Generic interaction - check remaining objects
    const nearestObj = this.getNearestInteractable();
    if (nearestObj) {
      // console.log('Interacting with nearest object');
      return nearestObj.interact(this.player);
    }
    
    // console.log('No nearby objects to interact with');
    return false;
  }

  /**
   * Handle zone interaction
   */
  handleZoneInteraction(): boolean {
    // console.log('Handling E key interaction');
    if (this.currentZone) {
      const zoneType = this.currentZone.zoneType || '';
      // console.log('Interacting with zone:', zoneType);
      
      // Only allow interaction with zones that have E key functionality
      if (this.INTERACTIVE_ZONES.includes(zoneType)) {
        return this.currentZone.interact(this.player);
      } else {
        // console.log('Zone does not support E key interaction');
      }
    }
    // console.log('Not in any interactive zone');
    return false;
  }

  /**
   * Handle game table interaction
   */
  handleGameInteraction(): boolean {
    // console.log('Handling P key interaction');
    // Find the nearest game table within distance
    const nearestGame = this.getNearestInteractableOfType(this.gameTables);

    if (nearestGame) {
      // console.log('Interacting with game table');
      return nearestGame.interact(this.player);
    }
    // console.log('No nearby game tables');
    return false;
  }

  /**
   * Handle sitting on chairs
   */
  handleSit(): string | null {
    // console.log('Handling S key interaction');
    const nearestChair = this.getNearestInteractableOfType(this.chairs, 32);

    if (nearestChair && !nearestChair.isOccupied) {
      // console.log('Sitting on chair');
      if (nearestChair.interact(this.player)) {
        this.isSitting = true;
        this.currentChair = nearestChair;

        // Get the chair's direction (default to 'down' if not specified)
        const chairDirection = nearestChair.direction || 'down';
        console.log("ChairDirection", chairDirection);
        return chairDirection;
      }
    }
    // console.log('No nearby available chairs');
    return null;
  }

  /**
   * Get up from a chair
   */
  getUpFromChair(): void {
    // console.log('Getting up from chair');
    if (this.isSitting && this.currentChair) {
      this.isSitting = false;
      this.currentChair.release();
      this.currentChair = undefined;
      this.player.body!.checkCollision.none = false;
      
      // Get the character prefix from the current animation
      const animKey = this.player.anims.currentAnim?.key || 'adam_sit_down';
      const characterPrefix = animKey.split('_')[0];
      const direction = animKey.split('_')[2] || 'down';
      
      this.player.play(`${characterPrefix}_idle_${direction}`);
    }
  }

  /**
   * Check if player is sitting
   */
  isPlayerSitting(): boolean {
    return this.isSitting;
  }

  /**
   * Update object hints
   */
  updateHints(): void {
    // Hide hints for all interactables
    this.interactables.forEach(obj => {
      // Skip zones as they're handled separately
      if ('rect' in obj) return;
      obj.hideHint();
    });
    
    // Check and update zone indicators
    this.checkZones();
    
    // Show hint for nearest interactable based on current zone context
    const currentZone = this.getCurrentZoneName();
    let nearestObj: Interactable | null = null;
    
    // In gaming zone, prioritize game tables for O key hint
    if (currentZone === 'gaming') {
      nearestObj = this.getNearestInteractableOfType(this.gameTables);
    }
    
    // Check whiteboards first if no zone-specific object
    if (!nearestObj) {
      nearestObj = this.getNearestInteractableOfType(this.whiteboards);
    }
    
    // Zone-specific prioritization
    if (!nearestObj) {
      if (currentZone === 'career' || currentZone === 'coding') {
        nearestObj = this.getNearestInteractableOfType(this.computers);
      } else if (currentZone === 'market' || (currentZone && currentZone.startsWith('club'))) {
        nearestObj = this.getNearestInteractableOfType(this.cupboards);
      }
    }
    
    // Generic fallback
    if (!nearestObj) {
      nearestObj = this.getNearestInteractable();
    }
    
    // Show hint for the prioritized object
    if (nearestObj && !('rect' in nearestObj)) {
      nearestObj.showHint();
    }
    
    // Also show hints for nearby chairs (for sitting)
    const nearestChair = this.getNearestInteractableOfType(this.chairs, 32);
    if (nearestChair && !nearestChair.isOccupied && nearestChair !== nearestObj) {
      nearestChair.showHint();
    }
  }
}