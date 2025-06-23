// src/items/Computer.ts
import Phaser from 'phaser';
import type { Interactable } from '../interfaces/Interactable';
import DialogPrompt from './DialogPrompt';

export default class Computer extends Phaser.Physics.Arcade.Sprite implements Interactable {
  zoneType?: string;
  actionKey = 'O'; // Key to interact with computers
  private useVisuals: boolean;
  private dialogPrompt?: DialogPrompt;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, zoneType: string = 'computer', useVisuals: boolean = false) {
    super(scene, x, y, texture);
    this.zoneType = zoneType;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setDepth(y);
    
    // Only show the computer sprite if useVisuals is true
    this.useVisuals = useVisuals;
    if (!useVisuals) {
      this.setAlpha(0); // Make invisible
    }
    
    this.dialogPrompt = new DialogPrompt(scene);
  }

  interact(player?: Phaser.Physics.Arcade.Sprite): boolean {
    console.log('Computer interact called with zoneType:', this.zoneType);
    
    // Map the zoneType property to the correct event
    switch (this.zoneType) {
      case 'career':
        console.log('Emitting open-career-portal event');
        this.scene.events.emit('open-career-portal');
        break;
      case 'coding':
        console.log('Emitting open-coding-portal event');
        this.scene.events.emit('open-coding-portal');
        break;
      case 'computer':  // Default computer type
        console.log('Emitting generic computer portal event');
        this.scene.events.emit('open-computer-portal');
        break;
      default:
        // For any other computer types
        console.log(`Emitting open-${this.zoneType}-portal event`);
        this.scene.events.emit(`open-${this.zoneType}-portal`);
        break;
    }
    return true;
  }

  showHint() {
    this.dialogPrompt?.show(this.x, this.y, this.actionKey, 'use computer');
  }

  hideHint() {
    this.dialogPrompt?.hide();
  }
}