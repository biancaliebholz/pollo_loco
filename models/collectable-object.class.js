class CollectableCoin extends MovableObject {
  height = 150;
  width = 150;
  IMAGES_COINS = [
    'assets/img_pollo_locco/img/8_coin/coin_1.png',
    'assets/img_pollo_locco/img/8_coin/coin_2.png'
  ];

  offset = {
    left: 50,
    top: 60,
    right: 50,
    bottom: 60,
  };

    constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }

  randomizePosition() {
    this.x = 500 + Math.random() * 1500;
    this.y = 125 + Math.random() * 200;
  }


  /**
   * A method that continuously plays the animation using a set interval.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}


class CollectableBottle extends MovableObject {
  height = 100;
  width = 100;
  x = 300;
  y = 330;

  offset = {
    left: 40,
    top: 20,
    right: 40,
    bottom: 30,
  };

  IMAGES_BOTTLES = [
    'assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    //'assets/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

 
  constructor() {
    super().loadImage(this.IMAGES_BOTTLES[0]);
    this.loadImages(this.IMAGES_BOTTLES);
    this.animate();
    this.randomizePosition();
  }


  randomizePosition() {
    this.x = 200 + Math.random() * 1500;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 300);
  }
}

