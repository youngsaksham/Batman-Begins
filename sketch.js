const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var maxDrops = 100,
  thunderFrame = 0;
var drops = [];
var bg;

function preload() {
  //loading animation for walking
  walking = loadAnimation(
    "walking_1.png",
    "walking_2.png",
    "walking_3.png",
    "walking_4.png",
    "walking_5.png",
    "walking_6.png",
    "walking_7.png",
    "walking_8.png"
  );

  //images for thunder
  thunder1 = loadImage("1.png");
  thunder2 = loadImage("2.png");
  thunder3 = loadImage("3.png");
  thunder4 = loadImage("4.png");

  //sounds for rain and thunder
  rainSound = loadSound("rain.mp3");
  thunderSound = loadSound("thunder.mp3");
}

function setup() {
  createCanvas(600, 600);
  background("black");

  engine = Engine.create();
  world = engine.world;

  Engine.run(engine);

  //code of rain
  if (frameCount % 150 === 0) {
    for (var i = 0; i < maxDrops; i++) {
      drops.push(new drop(random(0, 600), random(0, 400)));
    }
  }

  Umbrella = new umbrella(250, 405, 100, 10);
  Umbrella.angle = 10;

  man = createSprite(250, 470, 10, 10);
  man.addAnimation("walking", walking);
  man.scale = 0.35;

  bg = loadImage("bg.jpg");
  rainSound.loop();
}

function draw() {
  background(bg);

  //code for thunder
  rand = Math.round(random(1, 4));
  if (frameCount % 120 === 0) {
    thunderFrame = frameCount;
    thunder = createSprite(random(50, 550), random(10, 30));
    switch (rand) {
      case 1:
        thunder.addImage(thunder2);
        break;

      case 2:
        thunder.addImage(thunder1);
        break;

      case 3:
        thunder.addImage(thunder3);
        break;

      case 4:
        thunder.addImage(thunder4);
        break;
      default:
        break;
    }

    thunderSound.play();

    thunder.scale = random(0.3, 0.6);
    thunder.lifetime = 10;
  }

  //code for display and change position dor drops
  for (var i = 0; i < maxDrops; i++) {
    drops[i].display();
    drops[i].changePosition();
  }
  Umbrella.display();

  drawSprites();
}
