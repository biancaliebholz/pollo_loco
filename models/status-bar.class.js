class StatusBar extends DrawableObject {

  IMAGES = [
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
  ]
  percentage = 100;


  /**
   * Constructor for initializing the object.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  
  /**
   * Set the percentage and update the image accordingly.
   *
   * @param {number} percentage - The percentage value to set
   * @return {void} 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  
  /**
   * Returns the image index based on the current percentage.
   *
   * @return {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

class StatusBarBottle extends DrawableObject {

  IMAGES = [
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',

  ]
  percentageBottle = 0;


  /**
   * Constructor for initializing the object.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentageBottle(0);
  }


  /**
   * Set the percentage of the bottle and update the image accordingly.
   *
   * @param {number} percentageBottle - The percentage value to set (between 0 and 5).
   * @return {void} 
   */
  setPercentageBottle(percentageBottle) {
    this.percentageBottle = percentageBottle;
    let path = this.IMAGES[this.resolveImageIndexBottle()];
    this.img = this.imageCache[path];
  }


  /**
   * Resolve the image index based on the percentage of the bottle.
   *
   * @return {number} The index of the image corresponding to the percentage of the bottle.
   */
  resolveImageIndexBottle() {
    if (this.percentageBottle == 0) {
      return 0;
    } else if (this.percentageBottle <= 20) {
      return 1;
    } else if (this.percentageBottle <= 40) {
      return 2;
    } else if (this.percentageBottle <= 60) {
      return 3;
    } else if (this.percentageBottle <= 80) {
      return 4;
    } else {
      return 5;
    }
  }
}

class StatusBarCoin extends DrawableObject {

  IMAGES = [
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ]
  percentageCoin = 0;


  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentageCoin(0);
  }


  /**
   * Set percentage coin and update related image.
   *
   * @param {number} percentageCoin - the percentage of the coin
   */
  setPercentageCoin(percentageCoin) {
    this.percentageCoin = percentageCoin;
    let path = this.IMAGES[this.resolveImageIndexCoin()];
    this.img = this.imageCache[path];
  }


  /**
   * Returns the image index based on the coin percentage.
   *
   * @return {number} The index of the image.
   */
  resolveImageIndexCoin() {
    if (this.percentageCoin == 100) {
      return 5;
    } else if (this.percentageCoin == 0) {
      return 0;
    } else if (this.percentageCoin <= 20) {
      return 1;
    } else if (this.percentageCoin <= 40) {
      return 2;
    } else if (this.percentageCoin <= 60) {
      return 3;
    } else if (this.percentageCoin <= 80) {
      return 4;
    } else {
      return 1;
    }
  }
}

class StatusBarEndboss extends DrawableObject {

  IMAGES = [
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
  ]
  percentageEndboss = 100;

  
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 250;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentageEndboss(100);
  }


  /**
   * Set the percentage of the end boss.
   *
   * @param {number} percentageEndboss - the percentage of the end boss
   */
  setPercentageEndboss(percentageEndboss) {
    this.percentageEndboss = percentageEndboss;
    let path = this.IMAGES[this.resolveImageIndexEndboss()];
    this.img = this.imageCache[path];
  }

  
  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  resolveImageIndexEndboss() {
    if (this.percentageEndboss == 100) {
      return 5;
    } else if (this.percentageEndboss >= 80) {
      return 4;
    } else if (this.percentageEndboss >= 60) {
      return 3;
    } else if (this.percentageEndboss >= 40) {
      return 2;
    } else if (this.percentageEndboss >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
