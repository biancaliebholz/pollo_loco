class Coin extends MovableObject {
  width = 50;
  height = 50;
  y = 300;

  constructor(x, y = 300) {
    super().loadImage('assets/img_pollo_locco/img/8_coin/coin_1.png');
    this.x = x;
    this.y = y;
  }
}