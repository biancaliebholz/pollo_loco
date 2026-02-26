// level1.js
const level1 = new Level(
  [
    // ✅ 10 normale Chickens (vorne -> hinten)
    new Chicken(250),
    new Chicken(450),
    new Chicken(700),
    new Chicken(950),
    new Chicken(1200),
    new Chicken(1500),
    new Chicken(1800),
    new Chicken(2100),
    new Chicken(2450),
    new Chicken(2750),

    // ✅ 10 MiniChickens (dazwischen verteilt)
    new MiniChicken(350),
    new MiniChicken(600),
    new MiniChicken(820),
    new MiniChicken(1100),
    new MiniChicken(1350),
    new MiniChicken(1650),
    new MiniChicken(1950),
    new MiniChicken(2250),
    new MiniChicken(2550),
    new MiniChicken(2850),

    // ✅ Boss am Ende
    new Endboss(),
  ],
  [
    // Clouds (wie du es gerade hast)
    new Cloud('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png', 0),
    new Cloud('assets/img_pollo_locco/img/5_background/layers/4_clouds/2.png', 600),
    new Cloud('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png', 1200),
    new Cloud('assets/img_pollo_locco/img/5_background/layers/4_clouds/2.png', 1800),
    new Cloud('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png', 2400),
    new Cloud('assets/img_pollo_locco/img/5_background/layers/4_clouds/2.png', 3000),
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