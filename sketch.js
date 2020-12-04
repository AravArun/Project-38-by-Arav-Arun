  var obstacle, obstacleImage, obstacleGroup,gameover_img,gameState;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;

function preload(){
  backgroundImage= loadImage("jungle.jpg");
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
  gameover_img = loadImage("gameover.png")
}

function setup() {
    createCanvas(600,280);
    backgroundy= createSprite (200,40,400,400);
    backgroundy.addImage (backgroundImage);
    backgroundy.velocityX= -2;

    monkey= createSprite (70,140,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;

    ground= createSprite (200,265,400,5);
    ground.visible= false;
 
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
    background("white");
    camera.position.y = monkey.y;
  
    if (keyDown ("space") && monkey.y>=220) {
      monkey.velocityY= -20;  
    }    
    
    monkey.velocityY= monkey.velocityY + 0.9;
  
    monkey.collide (ground);
  
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
      
    }
  
    switch (score) {
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      gameState = "end"
      
    }
    
    
    spawnBananas();
    spawnObstacles();
  
    drawSprites();
  
    stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);  
    if(gameState == "end"){
    imageMode(CENTER);
    image(gameover_img,300,232,600,280);
    ground.velocityX=0;
    monkey.velocityX = 0;
    ObstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    ObstacleGroup.setLifetimeEach(-1);
    
    }
}

function spawnBananas () {
  if (frameCount%90===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;

      banana.lifetime= 150;

      bananaGroup.add(banana);
  }
}

function spawnObstacles(){
if (frameCount%200===0) {
    obstacle= createSprite(610, 247,10,10);
    obstacle.x=610 ;
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.velocityX=-5;
    obstacle.lifetime=122;
    obstacle.scale=0.18;
    //stone.debug=true;
    obstacle.setCollider("rectangle",0,0,350,350);
    obstacleGroup.add(obstacle);
     
}
}