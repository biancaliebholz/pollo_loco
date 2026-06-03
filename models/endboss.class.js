/**
 * Represents the endboss chicken enemy with walking, alert, attack, hurt, and dead states.
 */
class Endboss extends MovableObject {
  /** @type {number} */
  speedAngry = 2;
  /** @type {number} */
  speed = 0.15;
  /** @type {boolean} */
  isDead = false;
  /** @type {boolean} */
  inDamage = false;
  /** @type {boolean} */
  isAlert = false;
  /** @type {boolean} */
  moveLeftAngry = false;
  /** @type {boolean} */
  aggressive = false;
  /** @type {boolean} */
  endbossImmune = false;
  /** @type {number} */
  energyEndboss = 100;
  /** @type {boolean} */
  otherDirection = false;
  height = 400;
  width = 280;
  y = 60;
  /** @type {HTMLAudioElement} */
  endbossdead_sound = new Audio('assets/audio/chickenDead2.mp3');
  /** @type {HTMLAudioElement} */
  alert_sound = new Audio('assets/audio/warning.wav');

  offset = {
    top: 80,
    bottom: 80,
    left: 80,
    right: 80
  };

  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_ALERT = [
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
    'assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  /**
   * Loads all animation image sets, sets the initial position, and starts the animation loops.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 2200;
    this.moveLeftAngry = false;
    this.animate();
  }

  /**
   * Sets the inDamage flag briefly to trigger the hurt animation on bottle hit.
   */
  hitBottleEndboss() {
    this.inDamage = true;
    setTimeout(() => {
      this.inDamage = false;
    }, 400);
  }

  /**
   * Reduces endboss energy by 20, increases speed, and checks for death or angry mode.
   */
  minusEnergyEndboss() {
    if (!this.endbossImmune) {
      this.endbossImmune = true;
      this.energyEndboss -= 20;
      this.speed += 0.3;

      if (this.energyEndboss <= 0) {
        this.energyEndboss = 0;
        this.isDeadEndboss();
      } else {
        this.lastHit = new Date().getTime();
      }

      setTimeout(() => {
        this.endbossImmune = false;
      }, 200);
    }

    this.checkAngryEndboss();
  }

  /**
   * Triggers the alert sequence and enables angry movement when energy drops to 20 or below.
   */
  checkAngryEndboss() {
    if (this.energyEndboss <= 20) {
      this.isAlert = true;
      this.moveLeftAngry = false;

      setTimeout(() => {
        playAudio(this.alert_sound);
      }, 10);

      setTimeout(() => {
        this.isAlert = false;
        this.moveLeftAngry = true;
      }, 1500);
    }
  }

  /**
   * Moves the endboss left at the angry speed.
   */
  moveLeftEndbossAngry() {
    this.x -= this.speedAngry;
  }

  /**
   * Moves the endboss right at the angry speed.
   */
  moveRightEndbossAngry() {
    this.x += this.speedAngry;
  }

  /**
   * Sets isDead to true if energy has reached zero.
   */
  isDeadEndboss() {
    if (this.energyEndboss <= 0) {
      this.isDead = true;
    }
  }

  /**
   * Starts all animation and movement interval loops.
   */
  animate() {
    this.setupMovementInterval();
    this.setupStateInterval();
  }

  /**
   * Starts the 60 fps movement interval, handling both normal and angry movement modes.
   */
  setupMovementInterval() {
    setInterval(() => {
      if (gamePaused) return;

      if (this.isAlert) {
        this.speed = 0;
        return;
      }

      if (this.moveLeftAngry) {
        if (this.otherDirection) {
          this.moveRightEndbossAngry();
        } else {
          this.moveLeftEndbossAngry();
        }
      } else {
        if (this.otherDirection) {
          this.moveRight();
        } else {
          this.moveLeft();
        }
      }
    }, 1000 / 60);
  }

  /**
   * Starts the state update interval that selects the correct animation sequence.
   */
  setupStateInterval() {
    setInterval(() => {
      if (gamePaused) return;
      this.updateCharacterState();
    }, 9000 / 60);
  }

  /**
   * Selects and plays the correct animation based on the endboss's current state.
   */
  updateCharacterState() {
    if (this.isDead) {
      this.handleCharacterDead();
    } else if (this.aggressive) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isAlert) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.inDamage) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the death animation and sound, then triggers the win screen after a delay.
   */
  handleCharacterDead() {
    this.playAnimation(this.IMAGES_DEAD);
    playAudio(this.endbossdead_sound);
    setTimeout(() => {
      winGame();
    }, 700);
  }
}
