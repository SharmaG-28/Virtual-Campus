import Phaser from 'phaser';

export interface Interactable {
  x: number;
  y: number;
  width?: number;
  height?: number;
  zoneType?: string;
  actionKey?: string; // Which key should be shown in the prompt
  interact: (player?: Phaser.Physics.Arcade.Sprite) => boolean;
  showHint: () => void;
  hideHint: () => void;
}