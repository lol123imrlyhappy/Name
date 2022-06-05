var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var obstacle1;
var obstacle2;
var obstaclesGroup;
var coins;
var score = 0;
var gameState = "play";

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("jake1.png","jake2.png","jake3.png","jake4.PNG","jake5.png");
  money = loadImage("COIN DANG IT.png");
  obstacleimg = loadImage("obstacle1.png");

  
}

function setup(){
  
  createCanvas(600,600);
  

// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

obstaclesGroup = new Group();
coinGroup = new Group();

//creating boy running
boy = createSprite(180,340,30,30);
boy.addAnimation("JakeRunning",boyImg);
  
// create left Boundary
leftBoundary=createSprite(0,0,100,800);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;

boy.debug = true;
boy.setCollider('circle', 0, 0, 30)
}

function draw() {
  background(0);
  fill("red");
  text("score =" + score, 500, 100);
  edges= createEdgeSprites();

  if(gameState === "play"){

    spawnObstacles();
  
  // boy moving on Xaxis with mouse
  boy.x = World.mouseX;
  
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  if(obstaclesGroup.isTouching(boy)){
    gameState = "end";

    

    }

  if(coinGroup.isTouching(boy)){
    coins.destroy();
    score = score + 1;
  }

  } else if(gameState === "end"){
    boy.destroy();
    path.velocityY = 0;
    coinGroup.setVelocityYEach(0);
    obstaclesGroup.setVelocityYEach(0);
    coinGroup.destroyEach();
    obstaclesGroup.destroyEach();
    fill("white")
    textSize(10);
    text("BRUH U TRY AGAIN", 450, 300);
  }


  //obstaclesCollided();

  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(random(50, 350),-10,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = 8

      obstacle.addImage('obstacle', obstacleimg);


        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.05;
        obstacle.lifetime = 300;

        //add each obstacle to the group
        obstaclesGroup.add(obstacle)
    }

    if(frameCount % 60 === 0) {
      coins = createSprite(random(50, 350), -10, 10, 40);
      coins.velocityY = 8

      coins.addImage('coins', money);

      coins.scale = 0.05
      coins.lifetime = 300;
      
      coinGroup.add(coins);
    }
  }