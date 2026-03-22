class MovableObject extends DrawableObject {
  speedAngry = 0.15;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accleration = 2.5;
  energy = 100;
  energyBottle = 0;
  energyCoin = 0;
  energyEndboss = 100;
  lastHit = 0;
  immune = false;
  hurt_sound = new Audio('assets/audio/characterDamage.mp3');
  jump_sound = new Audio('assets/audio/characterJump.wav');

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (gamePaused) return;

      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    if (!this.immune) {
      this.immune = true;
      if (!mainSound) {
        this.hurt_sound.play();
      }
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

  addEnergyBottle() {
    this.energyBottle += 20;
    if (this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }

  minusEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
      this.energyBottle = 0;
    }
  }

  addEnergyCoin() {
    this.energyCoin += 20;
    if (this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    if (!mainSound) {
      this.jump_sound.cloneNode(true).play();
    }
    this.speedY = 30;
    if (this.y <= 150) {
      this.y = 150;
    }
  }

  jumpOnEnemy() {
    this.speedY = 15;
  }
}