/**
 * Represents a collectable coin that animates and spawns at a random position.
 */
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

  /**
   * Loads images, starts the animation, and randomizes the coin's position.
   */
    constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }

  /**
   * Sets a random horizontal and vertical position within the level.
   */
  randomizePosition() {
    this.x = 500 + Math.random() * 1500;
    this.y = 125 + Math.random() * 200;
  }


  /**
   * A method that continuously plays the animation using a set interval.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}


/**
 * Represents a collectable salsa bottle lying on the ground.
 */
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
  ];

  /**
   * Loads images, starts the animation, and randomizes the bottle's position.
   */
  constructor() {
    super().loadImage(this.IMAGES_BOTTLES[0]);
    this.loadImages(this.IMAGES_BOTTLES);
    this.animate();
    this.randomizePosition();
  }


  /**
   * Sets a random horizontal position within the level.
   */
  randomizePosition() {
    this.x = 200 + Math.random() * 1500;
  }

  /**
   * Continuously cycles through the bottle images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 300);
  }
}
