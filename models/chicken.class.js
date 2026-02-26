class Chicken extends MovableObject {
  height = 60;
  width = 50;
  y = 358;

  // ✅ NEU: pro Chicken Boden korrekt (falls später Jump/Gravity genutzt wird)
  groundY = 358;

  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  deadAnimationStarted = false; // ✅ NEU (minimal nötig)
  deadFrame = 0;                // ✅ NEU (minimal nötig)

  constructor(x) { // ✅ geändert: x optional
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD); // ✅ FIX: Dead-Bild wurde vorher nicht geladen

    this.x = (x !== undefined) ? x : (200 + Math.random() * 500); // ✅ geändert
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    setInterval(() => { this.moveLeft(); }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playDeadOnce(); // ✅ FIX: kein playAnimationOnce
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 130);
  }

  playDeadOnce() {
    // ✅ bei 1 Dead-Bild: setzt es und bleibt stehen (trotzdem sauber geschrieben)
    if (!this.deadAnimationStarted) {
      this.deadAnimationStarted = true;
      this.deadFrame = 0;
    }

    let i = Math.min(this.deadFrame, this.IMAGES_DEAD.length - 1);
    let path = this.IMAGES_DEAD[i];
    let img = this.imageCache[path];
    if (img) this.img = img;

    if (this.deadFrame < this.IMAGES_DEAD.length - 1) {
      this.deadFrame++;
    }
  }
}