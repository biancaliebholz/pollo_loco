/**
 * Represents a parallax background layer rendered at a fixed position.
 */
class BackgroundObject extends MovableObject {

  width = 720;
  height = 480;

  /**
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - Horizontal starting position of the layer.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
