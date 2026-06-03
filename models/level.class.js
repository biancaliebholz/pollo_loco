/**
 * Represents a game level with all its entities and objects.
 */
class Level {
    /** @type {MovableObject[]} */
    enemies;
    /** @type {Endboss[]} */
    endboss
    /** @type {Cloud[]} */
    clouds;
    /** @type {BackgroundObject[]} */
    backgroundObjects;
    /** @type {number} */
    level_end_x = 3500;
    /** @type {CollectableCoin[]} */
    collectableCoins;
    /** @type {CollectableBottle[]} */
    collectableBottles;

    /**
     * @param {MovableObject[]} enemies - Array of enemy objects.
     * @param {Endboss[]} endboss - Array containing the endboss.
     * @param {Cloud[]} clouds - Array of cloud objects.
     * @param {BackgroundObject[]} backgroundObjects - Array of background layer objects.
     * @param {CollectableCoin[]} collectableCoins - Array of collectable coin objects.
     * @param {CollectableBottle[]} collectableBottles - Array of collectable bottle objects.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, collectableCoins, collectableBottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoins = collectableCoins;
        this.collectableBottles = collectableBottles;
    }
}
