class Endboss extends MovableObject {
  height = 450;
  width = 300;
  y = 10;

  state = 'wait';         
  hasSeen = false;         
  alertUntil = 0;          
energy = 100;
  seeRange = 550;         
  attackRange = 140;     

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
    this.loadImages(this.IMAGES_ALERT); 
    this.loadImages(this.IMAGES_ATTACK); 
    this.loadImages(this.IMAGES_HURT);   
    this.loadImages(this.IMAGES_DEAD);   

    this.x = 2000;
    this.speed = 0.9; 
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.updateState();
      this.moveByState();
      this.animateByState();
    }, 130);
  }

  updateState() {
    if (this.isDead()) return this.state = 'dead';
    if (this.isHurt()) return this.state = 'hurt';
    if (!this.canSee()) return this.state = 'wait';

    if (!this.hasSeen) {
      this.hasSeen = true;
      this.alertUntil = new Date().getTime() + 1100; 
      this.resetOnce('alert'); 
      return this.state = 'alert';
    }
    if (new Date().getTime() < this.alertUntil) return this.state = 'alert';
    this.state = this.inAttackRange() ? 'attack' : 'walk';
  }

  canSee() {
    return this.world && Math.abs(this.x - this.world.character.x) < this.seeRange;
  }

  inAttackRange() {
    return this.world && Math.abs(this.x - this.world.character.x) < this.attackRange;
  }

  moveByState() {
    if (this.state !== 'walk') return;
    if (this.x > this.world.character.x) this.moveLeft();
    else this.moveRight();
  }

  animateByState() {
    if (this.state === 'dead') return this.playAnimationOnce(this.IMAGES_DEAD, 'dead');
    if (this.state === 'hurt') return this.playAnimationOnce(this.IMAGES_HURT, 'hurt');
    if (this.state === 'alert') return this.playAnimationOnce(this.IMAGES_ALERT, 'alert');
    if (this.state === 'attack') return this.playAnimation(this.IMAGES_ATTACK);
    if (this.state === 'walk') return this.playAnimation(this.IMAGES_WALKING);
    this.img = this.imageCache[this.IMAGES_WALKING[0]] || this.img; // wait
  }
}