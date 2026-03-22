class Level {
    enemies;
    endboss
    clouds;
    backgroundObjects;
    level_end_x = 3500;
    collectableCoins;
    collectableBottles;
    constructor(enemies, endboss, clouds, backgroundObjects, collectableCoins, collectableBottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoins = collectableCoins;
        this.collectableBottles = collectableBottles;
    }
}