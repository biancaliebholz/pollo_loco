class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;

  imageCache = {};
  currentImage = 0;

  opacity = 1;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  // ✅ ist jetzt für ALLE da -> World kann es immer aufrufen
  drawFrame(ctx) {
    // Nur Debug-Rahmen für bestimmte Klassen
    if (this instanceof Character || this instanceof Chicken || this instanceof MiniChicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}