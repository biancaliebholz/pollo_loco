class Endboss extends MovableObject {
height = 450;
width = 300;
y = 10;

    IMAGES_WALKING = [
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2000;
        this.animate();
    }


  animate(){
    this.moveLeft();
    setInterval(() => {
    this.playAnimation(this.IMAGES_WALKING);
    },130);

  }
}