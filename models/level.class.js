class Level {
  enemies;
  clouds;
  BackgroundLayer;
  coins;
  bottles;
  level_end_x = 3000;

  constructor(enemies, clouds, BackgroundLayer, coins, bottles){
    this.enemies = enemies;
    this.clouds = clouds;
    this.BackgroundLayer = BackgroundLayer;
    this.coins = coins;
    this.bottles = bottles;
  }
}