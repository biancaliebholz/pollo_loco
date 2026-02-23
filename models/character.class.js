class Character extends MovableObject {

  height = 260;
  y = 165;
   IMAGES_WALKING = [ 
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
    'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png',
 ];

  constructor(){
    super().loadImage('assets/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);

    this.animate();

  }

  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    },130);

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