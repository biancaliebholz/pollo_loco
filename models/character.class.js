class Character extends MovableObject {

  height = 260;
  y = 90;
  speed = 12;
   IMAGES_WALKING = [ 
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png',
 ];
 world;

  constructor(){
    super().loadImage('assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);

    this.animate();

  }

  animate(){

    setInterval (()=> {
      if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
        this.x += this.speed;
        this.otherDirection = false;
      }

      if(this.world.keyboard.LEFT && this.x > 0 ){
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 110;
    },1000 / 60);

    setInterval(() => {
   if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
 
      }

    },50);

}

  jump(){
  }
 
}

/*
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
  
  
  

  
*/