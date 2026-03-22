class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Loads an image from the given path.
   *
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    if (!path) {
      console.warn('loadImage got invalid path:', path, this);
      return;
    }

    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws an image on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
   */
  draw(ctx) {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object if it belongs to certain classes.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof CollectableCoin ||
      this instanceof CollectableBottle ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Smallchicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "0";
      ctx.strokeStyle = "transparent";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }

  /**
   * Preloads images into the cache.
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    if (!Array.isArray(arr)) {
      console.warn('loadImages got invalid array:', arr, this);
      return;
    }

    arr.forEach((path) => {
      if (!path) {
        console.warn('loadImages got invalid image path:', path, this);
        return;
      }

      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}