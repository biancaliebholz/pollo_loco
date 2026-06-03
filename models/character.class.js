/**
 * Represents the player character Pepe, controlled via keyboard input.
 * Extends MovableObject with walking, jumping, idle, and hurt animations.
 */
class Character extends MovableObject {
  height = 280;
  y = 50;
  speed = 10;
  /** @type {number} */
  timePassed = 0;
  /** @type {HTMLAudioElement} */
  dead_sound = new Audio('assets/audio/characterDead.wav');

  offset = {
    left: 20,
    top: 110,
    right: 25,
    bottom: 10,
  };

  /** @type {string[]} */
  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png',
  ];

  /** @type {string[]} */
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

  /** @type {string[]} */
  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
    'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png',
  ];

  /** @type {string[]} */
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

  /** @type {string[]} */
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

  /** @type {string[]} */
  IMAGES_HURT = [
    'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
    'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
    'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',
  ];

  /** @type {World} */
  world;
  /** @type {HTMLAudioElement} */
  walking_sound = new Audio("assets/audio/characterRun.mp3");

  /**
   * Loads all animation image sets, applies gravity, and starts the animation loops.
   */
  constructor() {
    super().loadImage("assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the main movement loop at 60 fps and the state update loop at 10 fps.
   */
  animate() {
    setInterval(() => {
      if (gamePaused) return;
      if (!this.world || !this.world.keyboard) return;
      this.handleMovement();
      this.handleActions();
      this.updateCamera();
    }, 1000 / 60);

    setInterval(() => {
      if (gamePaused) return;
      if (!this.world || !this.world.keyboard) return;
      this.updateCharacterState();
    }, 100);
  }

  /**
   * Moves the character left or right based on keyboard input and manages the walking sound.
   */
  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    } else if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }

    // Audio Logik: Nur abspielen, wenn wir uns bewegen und Sound an ist
    if ((this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) || (this.world.keyboard.LEFT && this.x > 0)) {
      if (!mainSound && this.walking_sound.paused) {
        this.walking_sound.play().catch(() => {});
      }
    } else {
      this.walking_sound.pause();
    }
  }

  /**
   * Triggers a jump when the space key is pressed and the character is on the ground.
   */
  handleActions() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Shifts the canvas camera to follow the character's horizontal position.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Selects and plays the appropriate animation based on the character's current state.
   */
  updateCharacterState() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        gameOver();
      }, 600);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.setNewTimePassed();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.setNewTimePassed();
    } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
      const timePassed = this.timePassedSinceLastAction();
      this.playIdleOrSleep(timePassed);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
      this.setNewTimePassed();
    }
  }

  /**
   * Plays the long-idle (sleep) animation after 4 seconds of inactivity, otherwise plays idle.
   *
   * @param {number} timePassed - Seconds elapsed since the last action.
   */
  playIdleOrSleep(timePassed) {
    if (timePassed >= 4) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Records the current timestamp as the last action time.
   */
  setNewTimePassed() {
    this.timePassed = new Date().getTime();
  }

  /**
   * Returns the number of seconds elapsed since the last recorded action.
   *
   * @returns {number} Elapsed time in seconds.
   */
  timePassedSinceLastAction() {
    return (new Date().getTime() - this.timePassed) / 1000;
  }
}
