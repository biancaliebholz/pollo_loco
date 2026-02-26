// MiniChicken.js
class MiniChicken extends MovableObject {
  height = 40;
  width = 40;
  y = 380;
  groundY = 380; // ✅ damit Gravity/Jumps korrekt landen

  IMAGES_WALKING = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ];

  constructor(x) { // ✅ x optional
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    // ✅ falls du später zurück willst: Original war 200 + Math.random()*500
    this.x = (x !== undefined) ? x : (200 + Math.random() * 500);

    this.speed = 0.25 + Math.random() * 0.25;
    this.jumpPower = 18; // ✅ kleiner Hop als Character
    this.acceleration = 2.8; // ✅ etwas softer

    this.applyGravity(); // ✅ damit jump() wirkt
    this.animate();
  }

  animate() {
    setInterval(() => { this.moveLeft(); }, 1000 / 60);
    setInterval(() => { this.playAnimation(this.IMAGES_WALKING); }, 130);

    // ✅ kleiner Hop: randomisiert, damit nicht alle gleichzeitig springen
    setInterval(() => {
      if (!this.isAboveGround() && Math.random() < 0.35) this.jump();
    }, 900);
  }
}