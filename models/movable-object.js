/**
 * Base class for all objects in the game that can move and interact physically.
 * Extends DrawableObject with movement, gravity, collision, and health logic.
 */
class MovableObject extends DrawableObject {
  /** @type {number} */
  speedAngry = 0.15;
  /** @type {number} */
  speed = 0.15;
  /** @type {boolean} */
  otherDirection = false;
  /** @type {number} */
  speedY = 0;
  /** @type {number} */
  accleration = 2.5;
  /** @type {number} */
  energy = 100;
  /** @type {number} */
  energyBottle = 0;
  /** @type {number} */
  energyCoin = 0;
  /** @type {number} */
  energyEndboss = 100;
  /** @type {number} */
  lastHit = 0;
  /** @type {boolean} */
  immune = false;
  /** @type {HTMLAudioElement} */
  hurt_sound = new Audio('assets/audio/characterDamage.mp3');
  /** @type {HTMLAudioElement} */
  jump_sound = new Audio('assets/audio/characterJump.wav');

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies gravity by decreasing speedY each tick and moving the object vertically.
   */
  applyGravity() {
    setInterval(() => {
      if (gamePaused) return;

      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accleration;
      } else if (this.y > 150) {
        this.y = 150;
      }
    }, 1000 / 25);
  }

  /**
   * Returns whether the object is currently above the ground level.
   *
   * @returns {boolean} True if above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  /**
   * Checks whether this object is colliding with another movable object using offset-adjusted AABB.
   *
   * @param {MovableObject} mo - The other movable object to test collision against.
   * @returns {boolean} True if the two objects overlap.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces energy by 20 if not immune, triggers hurt sound, and grants brief immunity.
   */
  hit() {
    if (!this.immune) {
      this.immune = true;
      playAudio(this.hurt_sound);
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
      setTimeout(() => {
        this.immune = false;
      }, 1000);
    }
  }

  /**
   * Increases the bottle energy by 20, capped at 100.
   */
  addEnergyBottle() {
    this.energyBottle += 20;
    if (this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }

  /**
   * Decreases the bottle energy by 20, floored at 0.
   */
  minusEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
      this.energyBottle = 0;
    }
  }

  /**
   * Increases the coin energy by 20, capped at 100.
   */
  addEnergyCoin() {
    this.energyCoin += 20;
    if (this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }

  /**
   * Returns whether the object's energy has reached zero.
   *
   * @returns {boolean} True if energy is 0.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Returns whether the object was hit within the last second.
   *
   * @returns {boolean} True if less than 1 second has passed since the last hit.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Advances the animation frame from the given image array.
   *
   * @param {string[]} images - Array of image paths to cycle through.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting vertical speed and playing the jump sound.
   */
  jump() {
    playAudio(this.jump_sound);
    this.speedY = 30;
    if (this.y <= 150) {
      this.y = 150;
    }
  }

  /**
   * Applies a reduced upward impulse used when the character jumps on an enemy.
   */
  jumpOnEnemy() {
    this.speedY = 15;
  }
}
