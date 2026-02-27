class Bottle extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  groundY = 360;

  state = 'GROUND'; // GROUND | THROW | SPLASH
  facing = 'RIGHT'; // ✅ NEU: LEFT/RIGHT (nur fürs Boden-Bild)

  vx = 0;
  flying = false;
  hasHit = false;

  // ✅ NEU: Splash-Frames unabhängig von currentImage
  splashFrame = 0;
  opacity = 1;
  removed = false;

  IMAGES_GROUND = [
    'assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', // z.B. RIGHT
    'assets/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', // z.B. LEFT
  ];

  IMAGES_THROW = [
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_SPLASH = [
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
  ];

  constructor(x = 500, facing = 'RIGHT') {
    super();
    this.facing = facing;

    this.loadImages(this.IMAGES_GROUND);
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);

    this.x = x;
    this.setGroundImage(); // ✅ FIX: nicht animieren!
    this.animate();
  }

  setGroundImage() {
    const idx = (this.facing === 'LEFT') ? 1 : 0;
    this.img = this.imageCache[this.IMAGES_GROUND[idx]] || this.img;
  }

  animate() {
    setInterval(() => {
      if (this.removed) return;

      if (this.state === 'GROUND') this.setGroundImage();          // ✅ FIX
      if (this.state === 'THROW') this.playAnimation(this.IMAGES_THROW);
      if (this.state === 'SPLASH') this.playSplashAndFade();
    }, 120);
  }

  throw(directionRight = true, power = 0.35) {
    this.state = 'THROW';
    this.facing = directionRight ? 'RIGHT' : 'LEFT';

    const minV = 7, maxV = 14;
    const minUp = 12, maxUp = 20;

    const v = minV + power * (maxV - minV);
    const up = minUp + power * (maxUp - minUp);

    this.vx = directionRight ? v : -v;
    this.speedY = up;

    if (!this.flying) {
      this.flying = true;
      this.applyGravity();
      this.fly();
    }
  }

  fly() {
    setInterval(() => {
      if (this.state !== 'THROW' || this.removed) return;

      this.x += this.vx;

      // ✅ Boden-Kontakt -> splash (wenn gelandet)
      if (!this.isAboveGround() && this.speedY === 0) this.splash();
    }, 1000 / 60);
  }

  splash() {
  if (this.state === 'SPLASH') return;

  this.state = 'SPLASH';
  this.vx = 0;
  this.splashFrame = 0;
  this.opacity = 1;

  this.hasHit = true;   // ✅ GANZ WICHTIG!
}

  playSplashAndFade() {
    // ✅ Splash 1x durch
    const i = Math.min(this.splashFrame, this.IMAGES_SPLASH.length - 1);
    const path = this.IMAGES_SPLASH[i];
    const img = this.imageCache[path];
    if (img) this.img = img;

    if (this.splashFrame < this.IMAGES_SPLASH.length - 1) {
      this.splashFrame++;
      return;
    }

    // ✅ danach langsam ausblenden & entfernen
    this.opacity -= 0.06;
    if (this.opacity <= 0) this.removed = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    super.draw(ctx);
    ctx.restore();
  }
}