class ThrowableObject extends MovableObject {
  throwBottleAir = false;
  bottleSplash = false;
  isBreaking = false;
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

  throw() {
    this.throwBottleAir = true;
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      this.x += this.otherDirection ? -10 : 10;
    }, 25);
  }

  breakAndSplash() {
    if (!this.isBreaking) {
      this.throwBottleAir = false;
      this.isBreaking = true;

      if (!mainSound) {
        this.bottlesplash_sound.cloneNode(true).play();
      }

      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      this.speedY = 0;
      this.speedX = 0;
    }
  }

  animate() {
    setInterval(() => {
      if (this.throwBottleAir) {
        this.playAnimation(this.IMAGES_ROTATE);
      }
    }, 9000 / 60);
  }
}