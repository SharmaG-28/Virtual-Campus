// src/items/GameTable.ts
import Phaser from 'phaser';
import type { Interactable } from '../interfaces/Interactable';
import DialogPrompt from './DialogPrompt';

export default class GameTable extends Phaser.Physics.Arcade.Sprite implements Interactable {
  gameType?: string;
  actionKey = 'P'; // Key to interact with game tables
  private useVisuals: boolean;
  private dialogPrompt?: DialogPrompt;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, gameType: string = 'default', useVisuals: boolean = false) {
    super(scene, x, y, texture);
    this.gameType = gameType;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setDepth(y);
    
    // Only show the game table sprite if useVisuals is true
    this.useVisuals = useVisuals;
    if (!useVisuals) {
      this.setAlpha(0); // Make invisible
    }
    
    this.dialogPrompt = new DialogPrompt(scene);
  }

  interact(player?: Phaser.Physics.Arcade.Sprite): boolean {
    // Always open the game selection portal, but pass gameType as data if needed
    this.scene.events.emit('open-game-selection', { gameType: this.gameType });
    return true;
  }

  showHint() {
    this.dialogPrompt?.show(this.x, this.y, this.actionKey);
  }

  hideHint() {
    this.dialogPrompt?.hide();
  }
}