class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.checkCollision();
  }

 setWorld() {
  this.character.world = this;
  this.level.enemies.forEach(e => e.world = this);
}
checkCollision() { 
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
        }
      });
    }, 200);
  }



  draw() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.loopBackground();

    this.addObjectsToMap(this.level.BackgroundLayer);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);

    requestAnimationFrame(() => this.draw());
  }
loopBackground() {
  const viewLeft = -this.camera_x;                 
  const viewRight = viewLeft + this.canvas.width;  

  this.level.BackgroundLayer.forEach(layer => {
    if (layer.x + layer.width < viewLeft) {
      layer.x += layer.width * 2;
    }
    if (layer.x > viewRight) {
      layer.x -= layer.width * 2;
    }
  });
}

  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

   mo.draw(this.ctx);
   mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
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