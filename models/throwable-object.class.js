/**
 * Represents a throwable salsa bottle that flies through the air and splashes on impact.
 */
class ThrowableObject extends MovableObject {
  /** @type {boolean} */
  throwBottleAir = false;
  /** @type {boolean} */
  bottleSplash = false;
  /** @type {boolean} */
  isBreaking = false;
  /** @type {HTMLAudioElement} */
  bottlesplash_sound = new Audio('assets/audio/bottleBreak.mp3');

  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20,
  };

  IMAGES_ROTATE = [
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_BOTTLE_SPLASH = [
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
  ];

  /**
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   * @param {boolean} direction - True to throw left, false to throw right.
   */
  constructor(x, y, direction) {
    super();
    this.loadImage('assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);

    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 70;
    this.otherDirection = direction;
    this.throw();
    this.animate();
  }

  /**
   * Launches the bottle with an initial upward speed and applies gravity and horizontal movement.
   */
  throw() {
    this.throwBottleAir = true;
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      this.x += this.otherDirection ? -10 : 10;
    }, 25);
  }

  /**
   * Triggers the splash animation and sound when the bottle hits a target or the ground.
   */
  breakAndSplash() {
    if (!this.isBreaking) {
      this.throwBottleAir = false;
      this.isBreaking = true;

      playAudio(this.bottlesplash_sound);

      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      this.speedY = 0;
      this.speedX = 0;
    }
  }

  /**
   * Continuously plays the rotation animation while the bottle is in the air.
   */
  animate() {
    setInterval(() => {
      if (this.throwBottleAir) {
        this.playAnimation(this.IMAGES_ROTATE);
      }
    }, 9000 / 60);
  }
}
