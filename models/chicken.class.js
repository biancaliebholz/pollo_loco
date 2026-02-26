class Chicken extends MovableObject {
  height = 60;
  width = 50;
  y = 358;
  groundY = 358;

  energy = 10;

  opacity = 1;
  removed = false;

  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  constructor(x) {
    super();
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.img = this.imageCache[this.IMAGES_WALKING[0]];

    this.x = (x !== undefined) ? x : (200 + Math.random() * 500); // ✅ Random bleibt drin
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.removed) return;
      if (this.isDead()) return;
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.removed) return;

      if (this.isDead()) {
        // ✅ Dead-Bild NUR beim ersten Dead-Tick setzen
        if (this.opacity === 1) {
          this.img = this.imageCache[this.IMAGES_DEAD[0]];
        }

        this.opacity -= 0.03;
        if (this.opacity <= 0) this.removed = true;
        return;
      }

      this.playAnimation(this.IMAGES_WALKING);
    }, 130);
  }

  draw(ctx) {
    if (this.removed) return; // ✅ extra safety
    ctx.save();
    ctx.globalAlpha = this.opacity;
    super.draw(ctx);
    ctx.restore();
  }
}