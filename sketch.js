var PLAY = 1;
var END = 0;
var gameState = 1;

var score;

var fruitGroup,fruit1,fruit2,fruit3,fruit4;

var enemyGroup,monster,monster_image;

var sword,sword_image;

var gameover,gameOverImage;

var knifeSwooshSound,gameOverSound;

function preload(){
  sword_image = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
 monster_image = loadAnimation("alien1.png","alien2.png");
  
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}


function setup(){
  createCanvas(500,500);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(sword_image);
  sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score = 0;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw(){
background("lightblue");
  
  edges = createEdgeSprites();
  
  fruits();
    Enemy();
  
  if(gameState === PLAY){
    
     sword.y=World.mouseY;
     sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score+2;
     }
  
  
    if(enemyGroup.isTouching(sword)){
      gameState = END;
      gameOverSound.play();
      
    }
}
 else if (gameState === END){
       fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      
      sword.addImage(gameOverImage);
      sword.x = 250;
      sword.y = 250;
      sword.scale = 1.2;
      gameOverImage.visible=true;
 }
  

  drawSprites();
  fill("black")
    textSize(20);
  text("Score: "+score,100,25);
}

function fruits(){
  if(World.frameCount%80===0){
     fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX = -(7+score/4);
    fruit.setlifeTime = 100;
    
    fruitGroup.add(fruit);
    var position = Math.round(random(1,2));
    
    if(position===1)
      {
        fruit.x=500;
        fruit.velocityX=-(7+(score/4));
      }
    else
    {
      if(position===2){
        fruit.x=0;
        fruit.velocityX= (7+(score/4));
      }
    }
     }
  
}

function Enemy(){
  if(World.frameCount%200===0){
     monster = createSprite(400,200,20,20);
    var place = Math.round(random(1,2));
    
    if(place===1)
      {
        fruit.x=500;
        fruit.velocityX=-(8+(score/4));
      }
    else
    {
      if(place===2){
        fruit.x=0;
        fruit.velocityX= (8+(score/4));
      }
    }
    monster.addAnimation("moving",monster_image);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+score/10);
    monster.setlifeTime = 50;
    
    enemyGroup.add(monster);
     }
}