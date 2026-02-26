class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 0.08 + Math.random() * 0.12;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.wrap();
    }, 1000 / 60);
  }

  wrap() {                 // ✅ FEHLTE
    if (this.x + this.width < 0) {
      this.x = 3000;
    }
  }
}