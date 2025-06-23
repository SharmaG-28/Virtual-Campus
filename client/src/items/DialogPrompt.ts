// src/items/DialogPrompt.ts
import Phaser from 'phaser';

export default class DialogPrompt {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private isVisible = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics().setDepth(9999);
    
    this.text = scene.add.text(0, 0, '', {
      fontSize: '12px',
      color: '#ffffff',
      fontStyle: 'bold',
    })
    .setOrigin(0.5, 0.5)
    .setVisible(false)
    .setDepth(10000);
  }

  show(x: number, y: number, keyToPress: string, actionText?: string): void {
    // If actionText is provided, show it, otherwise just show the key prompt
    const promptText = actionText ? 
      `Press '${keyToPress}' to ${actionText}` : 
      (keyToPress === 'S') ?
      `Press '${keyToPress}' to sit` :
      (keyToPress === 'P') ?
      `Press '${keyToPress}' to play` :
      (keyToPress === 'O') ?
      `Press '${keyToPress}' to open` : "";
    
    this.text.setText(promptText);
    
    // Position the text above the object
    this.text.setPosition(x, y - 30);
    
    // Clear previous graphics
    this.graphics.clear();
    
    // Get text bounds for background sizing
    const textBounds = this.text.getBounds();
    const padding = 8;
    
    // Draw rounded rectangle background
    this.graphics.fillStyle(0x000000, 0.8); // Black background with 80% opacity
    this.graphics.lineStyle(2, 0xffffff, 0.9); // White border
    
    this.graphics.fillRoundedRect(
      textBounds.x - padding,
      textBounds.y - padding,
      textBounds.width + (padding * 2),
      textBounds.height + (padding * 2),
      6 // Corner radius
    );
    
    this.graphics.strokeRoundedRect(
      textBounds.x - padding,
      textBounds.y - padding,
      textBounds.width + (padding * 2),
      textBounds.height + (padding * 2),
      6 // Corner radius
    );
    
    // Make visible
    this.text.setVisible(true);
    this.graphics.setVisible(true);
    this.isVisible = true;
  }

  hide(): void {
    if (!this.isVisible) return;
    
    this.text.setVisible(false);
    this.graphics.setVisible(false);
    this.graphics.clear();
    this.isVisible = false;
  }

  destroy(): void {
    this.text.destroy();
    this.graphics.destroy();
  }
}