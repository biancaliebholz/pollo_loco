class Endboss extends MovableObject {
  speedAngry = 2;
  speed = 0.15;
  isDead = false;
  inDamage = false;
  isAlert = false;
  moveLeftAngry = false;
  aggressive = false;
  endbossImmune = false;
  energyEndboss = 100;
  otherDirection = false;
  height = 400;
  width = 280;
  y = 60;
  endbossdead_sound = new Audio('assets/audio/chickenDead2.mp3');
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

  hitBottleEndboss() {
    this.inDamage = true;
    setTimeout(() => {
      this.inDamage = false;
    }, 400);
  }

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

  moveLeftEndbossAngry() {
    this.x -= this.speedAngry;
  }

  moveRightEndbossAngry() {
    this.x += this.speedAngry;
  }

  isDeadEndboss() {
    if (this.energyEndboss <= 0) {
      this.isDead = true;
    }
  }

  animate() {
    this.setupMovementInterval();
    this.setupStateInterval();
  }

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

  setupStateInterval() {
    setInterval(() => {
      if (gamePaused) return;
      this.updateCharacterState();
    }, 9000 / 60);
  }

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

  handleCharacterDead() {
    this.playAnimation(this.IMAGES_DEAD);
    playAudio(this.endbossdead_sound);
    setTimeout(() => {
      winGame();
    }, 700);
  }
}