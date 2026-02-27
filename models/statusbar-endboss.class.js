class EndbossStatusBar extends DrawableObject {
  percentage = 100;

  IMAGES = [
    'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
     'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
      'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
       'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
         'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
  ];

  constructor() {
    super();

    // ✅ Position oben rechts (im Screen)
    this.x = 500;   // wenn du es weiter rechts willst: 520 / 540
    this.y = 20;

    this.width = 200;
    this.height = 60;

    this.loadImages(this.IMAGES);

    // ✅ start
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = Math.max(0, Math.min(100, percentage));
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}