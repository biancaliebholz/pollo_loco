class Level {
    enemies;
    clouds;
    BackgroundLayer;
    level_end_x = 3000;

    constructor(enemies, clouds, BackgroundLayer){
        this.enemies = enemies;
        this.clouds = clouds;
        this. BackgroundLayer = BackgroundLayer;
    }
}