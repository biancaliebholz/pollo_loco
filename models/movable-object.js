class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  speedY = 0;
  acceleration = 3.0;

  energy = 100;
  lastHit = 0;

  groundY = 160;
  jumpPower = 30;

  opacity = 1;              // ✅ NEU: fürs Verblassen
  once = {};                // ✅ NEU: Animation-Once-Tracker

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this.y > this.groundY) {
          this.y = this.groundY;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.groundY;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.save();                           // ✅ NEU
    ctx.globalAlpha = this.opacity;       // ✅ NEU
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();                        // ✅ NEU
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof MiniChicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height;
  }

hit(){
  if(this.isDead()) return;   
  this.energy -= 10;

  if(this.energy < 0){
    this.energy = 0;
  }

  this.lastHit = new Date().getTime();
}

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return (timepassed / 1000) < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveLeft() { this.x -= this.speed; }
  moveRight() { this.x += this.speed; }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, key) {            // ✅ NEU: einmal abspielen
    if (!this.once[key]) this.once[key] = 0;
    let i = Math.min(this.once[key], images.length - 1);
    let path = images[i];
    let img = this.imageCache[path];
    if (img) this.img = img;
    if (this.once[key] < images.length - 1) this.once[key]++;
    return this.once[key] >= images.length - 1; // true = fertig
  }

  fadeOut() {                                 // ✅ NEU: sauber verblassen
    let t = setInterval(() => {
      this.opacity -= 0.03;
      if (this.opacity <= 0) {
        this.opacity = 0;
        clearInterval(t);
        this.removed = true;                  // ✅ NEU: World kann es aus Array filtern
      }
    }, 50);
  }

  jump() {
    this.speedY = this.jumpPower;
    this.isJumping = true;
    this.jumpFrame = 0;
  }
}