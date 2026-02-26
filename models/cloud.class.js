class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;

    this.speed = 0.08 + Math.random() * 0.12; // ✅ Wolken langsamer
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.wrap();
    }, 1000 / 60);
  }

}