// src/items/Chair.ts
import Phaser from 'phaser';
import type { Interactable } from '../interfaces/Interactable';
import DialogPrompt from './DialogPrompt';

export default class Chair extends Phaser.Physics.Arcade.Sprite implements Interactable {
  direction: string = 'down';
  isOccupied = false;
  zoneType?: string;
  actionKey = 'S'; // Key to sit
  private useVisuals: boolean;
  private dialogPrompt?: DialogPrompt;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number, useVisuals: boolean = false) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setDepth(y);
    
    // Only show the chair sprite if useVisuals is true
    this.useVisuals = useVisuals;
    if (!useVisuals) {
      this.setAlpha(0); // Make invisible
    }
    
    this.dialogPrompt = new DialogPrompt(scene);
  }

  setDirection(dir: string) {
    this.direction = dir;
    return this;
  }

  interact(player?: Phaser.Physics.Arcade.Sprite): boolean {
    if (!player || this.isOccupied) return false;
    
    // Get the character prefix from the player's current animation key
    const animKey = player.anims.currentAnim?.key || 'adam_idle_down';
    const characterPrefix = animKey.split('_')[0];
    
    this.isOccupied = true;
    player.setVelocity(0);
    player.setPosition(this.x, this.y + 8); // Adjust position based on your sprite
    player.body!.checkCollision.none = true;
    
    // Use the correct character's sitting animation
    player.play(`${characterPrefix}_sit_${this.direction}`);
    
    return true;
  }

  release() {
    this.isOccupied = false;
  }

  showHint() {
    if (this.isOccupied) return;
    this.dialogPrompt?.show(this.x, this.y, this.actionKey);
  }

  hideHint() {
    this.dialogPrompt?.hide();
  }
}