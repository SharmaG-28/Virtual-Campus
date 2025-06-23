// src/items/Cupboard.ts
import Phaser from 'phaser';
import type { Interactable } from '../interfaces/Interactable';
import DialogPrompt from './DialogPrompt';

export default class Cupboard extends Phaser.Physics.Arcade.Sprite implements Interactable {
  zoneType?: string;
  actionKey = 'O'; // Key to interact with cupboards
  private useVisuals: boolean;
  private dialogPrompt?: DialogPrompt;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, zoneType: string = 'cupboard', useVisuals: boolean = false) {
    super(scene, x, y, texture);
    this.zoneType = zoneType;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setDepth(y);
    
    // Only show the cupboard sprite if useVisuals is true
    this.useVisuals = useVisuals;
    if (!useVisuals) {
      this.setAlpha(0); // Make invisible
    }
    
    this.dialogPrompt = new DialogPrompt(scene);
  }

  interact(player?: Phaser.Physics.Arcade.Sprite): boolean {
    console.log('Cupboard interact called with zoneType:', this.zoneType);
    
    // Handle the different cupboard types based on zone property
    switch (this.zoneType) {
      case 'library':
        console.log('Emitting open-elibrary event');
        this.scene.events.emit('open-elibrary');
        break;
      case 'marketplace':
      case 'market':
        console.log('Emitting open-marketplace event');
        this.scene.events.emit('open-marketplace');
        break;
      case 'club':
        console.log('Emitting open-club-resources event');
        this.scene.events.emit('open-club-resources');
        break;
      case 'cupboard':
        // Default cupboard
        console.log('Emitting generic cupboard event');
        this.scene.events.emit('open-cupboard-resources');
        break;
      default:
        // Default case for other cupboard types
        console.log(`Emitting open-${this.zoneType}-resources event`);
        this.scene.events.emit(`open-${this.zoneType}-resources`);
        break;
    }
    return true;
  }

  showHint() {
    this.dialogPrompt?.show(this.x, this.y, this.actionKey, 'open resources');
  }

  hideHint() {
    this.dialogPrompt?.hide();
  }
}