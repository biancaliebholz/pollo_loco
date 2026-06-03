/**
 * Represents a small chicken enemy that walks left and bounces vertically.
 */
class Smallchicken extends MovableObject {
  speed = 8;
  speedY = 4;
  y = 360;
  height = 60;
  width = 60;
  /** @type {boolean} */
  isDead = false;
  offset = {
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
  }
  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ];


  /**
   * Constructor for initializing the chicken enemy.
   */
  constructor() {
    super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.4;
    this.animate();
    this.randomizePosition();
  }

  /**
   * Sets a random horizontal starting position within the level.
   */
  randomizePosition() {
    this.x = 300 + Math.random() * 2500;
  }


  /**
   * Bounces the chicken vertically between y=300 and y=360.
   */
  chickenJump() {
    if (this.y <= 300) {
      this.speedY = Math.abs(this.speedY);
    }
    if (this.y >= 360) {
      this.speedY = -Math.abs(this.speedY);
    }
    this.y += this.speedY;
  }

  /**
   * Starts the movement, jump, and sprite animation loops.
   */
animate() {
  setInterval(() => {
    if (gamePaused) return;
    this.moveLeft();
  }, 1000 / 60);

  setInterval(() => {
    if (gamePaused) return;
    this.chickenJump();
  }, 1000 / 60);

  setInterval(() => {
    if (gamePaused) return;

    if (this.isDead === false) {
      this.playAnimation(this.IMAGES_WALKING);
    }

    if (this.isDead === true) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }, 200);
}
}
