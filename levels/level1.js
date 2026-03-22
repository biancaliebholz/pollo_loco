let level1;

function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(), 
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),  
    ],
    [ new Endboss() ],
    [new Cloud()],
    [
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', -719),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719),

      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 0),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),
      
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 719),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 1438),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 1438),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 1438),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 1438),

       new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 2157),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 2157),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 2157),
      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 2157),


      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/3_third_layer/1.png',
        719 * 2
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/2_second_layer/1.png',
        719 * 2
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/1_first_layer/1.png',
        719 * 2
      ),

      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png',
        719 * 3
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png',
        719 * 3
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png',
        719 * 3
      ),

      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 719 * 4),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/3_third_layer/1.png',
        719 * 4
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/2_second_layer/1.png',
        719 * 4
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/1_first_layer/1.png',
        719 * 4
      ),

      new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 719 * 5),
      new BackgroundObject(
       'assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png',
        719 * 5
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png',
        719 * 5
      ),
      new BackgroundObject(
        'assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png',
        719 * 5
      ),
    ],
    [
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
    ],
    [
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
    ]
  );
}