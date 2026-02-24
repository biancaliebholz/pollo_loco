const level1 = new Level(
    [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
  ],
  [
    new Cloud()
  ],
  [
    // air
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/air.png', 0),
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/air.png', 720),

    // 3rd layer
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 720),

    // 2nd layer
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 720),

    // 1st layer
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundLayer('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 720),
  ]
);