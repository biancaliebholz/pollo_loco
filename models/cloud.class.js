class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  IMAGE_CLOUD = 'assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png';

  constructor() {
    super().loadImage(this.IMAGE_CLOUD);
    this.x = 100 + Math.random() * 2500;
    this.speed = 0.08 + Math.random() * 0.12;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.wrap();
    }, 1000 / 60);
  }

  wrap() {
    if (this.x + this.width < 0) {
      this.x = 3000;
    }
  }
}