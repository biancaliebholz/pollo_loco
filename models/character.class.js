class Character extends MovableObject {
  height = 260;
  y = 80;
  speed = 15;
  isJumping = false;
  jumpFrame = 0;
  lastMove = 0;
  deadFrame = 0;
deadAnimationStarted = false;

  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
    'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_IDLE = [
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
    'assets/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_HURT = [
    'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',
  ];

  world;

  constructor() {
    super().loadImage('assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD); // ✅ geändert: war this.DEAD (falsch)

    this.lastMove = new Date().getTime(); // ✅ geändert
    this.applyGravity();
    this.animate();
  }

  animate() {
    // MOVEMENT / INPUT
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.lastMove = new Date().getTime(); // ✅ geändert
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.lastMove = new Date().getTime(); // ✅ geändert
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump(); // benutzt MovableObject.jump()
      }

      this.world.camera_x = -this.x + 110;
    }, 1000 / 60);

    // ANIMATIONS
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        return;
      }

      if (this.isHurt()) { // ✅ geändert: war fälschlich isAboveGround()
        this.playAnimation(this.IMAGES_HURT);
        return;
      }

      if (this.isAboveGround()) {
        this.playJumpOnce(); // ✅ geändert: Jump nicht loopen
        return;
      }

      // ✅ geändert: sobald gelandet -> Jump-Status zurücksetzen
      this.isJumping = false;
      this.jumpFrame = 0;

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playIdleOrLongIdle(); // ✅ geändert
      }
    }, 50);
  }

  playJumpOnce() {
    // ✅ geändert: Jump Frames einmal durch, letzter Frame bleibt bis Landung
    if (!this.isJumping) return;

    let i = Math.min(this.jumpFrame, this.IMAGES_JUMPING.length - 1);
    let path = this.IMAGES_JUMPING[i];
    this.img = this.imageCache[path];

    if (this.jumpFrame < this.IMAGES_JUMPING.length - 1) {
      this.jumpFrame++;
    }
  }

   playIdleOrLongIdle() {
    // ✅ geändert: nach 5s nichts tun -> long idle
    let seconds = (new Date().getTime() - this.lastMove) / 1000;
    if (seconds > 5) this.playAnimation(this.IMAGES_LONG_IDLE);
    else this.playAnimation(this.IMAGES_IDLE);
  }
}