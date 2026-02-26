class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  bottleCount = 0;

  bottleChargeStart = 0;
  bottleMaxChargeMs = 700;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();

    this.checkCollisions();
    this.checkBottlePickup();
    this.checkBottleHits();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(e => e.world = this);
  }

  startBottleCharge() {
    if (this.bottleCount <= 0) return;
    this.bottleChargeStart = new Date().getTime();
  }

  releaseBottleCharge() {
    if (this.bottleCount <= 0) return;
    let ms = new Date().getTime() - this.bottleChargeStart;
    let power = Math.min(ms / this.bottleMaxChargeMs, 1);
    this.throwBottle(power);
  }

  throwBottle(power = 0.35) {
    if (this.bottleCount <= 0) return;

    const b = new Bottle(
      this.character.x + (this.character.otherDirection ? -20 : 80),
      this.character.otherDirection ? 'LEFT' : 'RIGHT'
    );
    b.y = this.character.y + 120;
    b.groundY = 360;

    b.throw(!this.character.otherDirection, power);
    this.level.bottles.push(b);

    this.bottleCount--;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isDead && enemy.isDead()) return;
        if (!this.character.isColliding(enemy)) return;

        const falling = this.character.speedY < 0;
        const charBottom = this.character.y + this.character.height;
        const enemyTopZone = enemy.y + enemy.height * 0.55;

        if (falling && charBottom <= enemyTopZone) {
          enemy.hit();
          this.character.speedY = 12;
          return;
        }

        this.character.hit();
      });
    }, 80);
  }

  checkBottlePickup() {
    setInterval(() => {
      if (!this.level.bottles) return;

      this.level.bottles = this.level.bottles.filter((b) => {
        const pickable = b.state === 'GROUND' && this.character.isColliding(b);
        if (pickable) this.bottleCount++;
        return !pickable;
      });
    }, 120);
  }

  checkBottleHits() {
    setInterval(() => {
      if (!this.level.bottles) return;

      this.level.bottles.forEach((b) => {
        if (b.state !== 'THROW') return;
        if (b.hasHit) return;

        this.level.enemies.forEach((enemy) => {
          if (enemy.isDead && enemy.isDead()) return;
          if (!b.isColliding(enemy)) return;

          b.hasHit = true;
          enemy.hit();
          b.splash();
        });
      });
    }, 60);
  }

  draw() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.loopBackground();

    this.addObjectsToMap(this.level.BackgroundLayer);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);

    // ✅ FIX: wirklich entfernen (sonst “ploppen” sie wieder)
    this.level.enemies = this.level.enemies.filter(e => !e.removed);
    this.level.bottles = this.level.bottles.filter(b => !b.removed);

    requestAnimationFrame(() => this.draw());
  }

  loopBackground() {
    const viewLeft = -this.camera_x;
    const viewRight = viewLeft + this.canvas.width;

    this.level.BackgroundLayer.forEach(layer => {
      if (layer.x + layer.width < viewLeft) layer.x += layer.width * 2;
      if (layer.x > viewRight) layer.x -= layer.width * 2;
    });
  }

  addObjectsToMap(objects) {
    if (!objects) return;
    objects.forEach(o => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}