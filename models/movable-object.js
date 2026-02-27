class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;

  speedY = 0;
  acceleration = 3.0;

  energy = 100;
  lastHit = 0;

  groundY = 160;
  jumpPower = 30;

  once = {};       // AnimationOnce Tracker
  removed = false; // fürs Entfernen

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this.y > this.groundY) {
          this.y = this.groundY;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.groundY;
  }

  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height;
  }

  hit() {
    if (this.isDead()) return;
    this.energy -= 10;
    if (this.energy < 0) this.energy = 0;
    this.lastHit = new Date().getTime();
  }

  isHurt() {
    const timepassed = new Date().getTime() - this.lastHit;
    return (timepassed / 1000) < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveLeft() { this.x -= this.speed; }
  moveRight() { this.x += this.speed; }

  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, key) {
    if (!this.once[key]) this.once[key] = 0;

    const i = Math.min(this.once[key], images.length - 1);
    const path = images[i];
    const img = this.imageCache[path];
    if (img) this.img = img;

    if (this.once[key] < images.length - 1) this.once[key]++;
    return this.once[key] >= images.length - 1;
  }

  fadeOut() {
    const t = setInterval(() => {
      this.opacity -= 0.03;
      if (this.opacity <= 0) {
        this.opacity = 0;
        clearInterval(t);
        this.removed = true;
      }
    }, 50);
  }

  jump() {
    this.speedY = this.jumpPower;
    this.isJumping = true;
    this.jumpFrame = 0;
  }
}