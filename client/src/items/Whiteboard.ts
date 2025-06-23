// src/items/Whiteboard.ts
import Phaser from 'phaser';
import type { Interactable } from '../interfaces/Interactable';
import DialogPrompt from './DialogPrompt';

export default class Whiteboard extends Phaser.Physics.Arcade.Sprite implements Interactable {
  zoneType?: string;
  actionKey = 'O'; // Key to interact with whiteboards
  private useVisuals: boolean;
  private dialogPrompt?: DialogPrompt;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, useVisuals: boolean = false) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setDepth(y);
    
    // Only show the whiteboard sprite if useVisuals is true
    this.useVisuals = useVisuals;
    if (!useVisuals) {
      this.setAlpha(0); // Make invisible
    }
    
    this.dialogPrompt = new DialogPrompt(scene);
  }

  interact(): boolean {
    this.scene.events.emit('open-whiteboard');
    return true;
  }

  showHint() {
    this.dialogPrompt?.show(this.x, this.y, this.actionKey);
  }

  hideHint() {
    this.dialogPrompt?.hide();
  }
}