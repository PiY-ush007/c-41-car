var gameState=0;

var carimg,npcimg,bgimg,trackimg,npc2img;
var car,ground,npc,bullet,wall,npc2,topWall,sideWall;

var bulletsGroup,npcGroup,npc2Group;

var score=0;

var gameOver,playAgain


function preload(){
carimg=loadImage("sprites/car.png");
bgimg=loadImage("sprites/sky.jpg");
npcimg=loadAnimation("sprites/npc1.png","sprites/npc2.png","sprites/npc3.png");
npc2img=loadAnimation("sprites/npc21.png","sprites/npc22.png","sprites/npc23.png");



}

function setup() {
  createCanvas(400, 400);
  backgroundimg=createSprite(200,200,400,400);
 
  
  ground=createSprite(200,390,400,20);

bulletsGroup=new Group();
npcGroup=new Group();
npc2Group=new Group();
 wall=createSprite(300,200,50,400);

 topWall=createSprite(200,10,400,20);

sideWall=createSprite(10 ,200,30,360);
 
  

car=createSprite(100,362,50,10);

car.addImage("car",carimg);

backgroundimg.addImage("backgroundimg",bgimg);
backgroundimg.depth=backgroundimg.depth-1;




}

function draw() {
 
  if(gameState===0){
  background("backgroundimg");

 
 
 
  if(keyDown("RIGHT_ARROW")){
       
    car.x=car.x+10;
  }
  if(keyDown("LEFT_ARROW")){
    car.x=car.x-10;
  }
  if(keyDown("UP_ARROW")){
    car.y=car.y-15;
  }
if(keyDown("DOWN_ARROW")){
  car.y=car.y+15;
}

  ground.velocityX=-3;
  ground.shapeColor=("lightblue");

 // text("score"+)
 if(keyWentDown("space")){

  bullet=createSprite(car.x+50,car.y,4,4);
 
 bullet.shapeColor=("yellow");
 bullet.velocityX=7;

 bulletsGroup.add(bullet);



 
}

    
   if(frameCount%60===0){
     npc=createSprite(410,random(100,300),20,20);
     npc.velocityX=-10;
    
     npc.addAnimation("npc",npcimg);
     npc.scale=0.7;
       
     npcGroup.add(npc);
    
   }
  
  if(bulletsGroup.isTouching(npc)){
    npc.destroy();
    bullet.destroy();
    score=score+100;
  } 
  if(frameCount%40===0){
    npc2=createSprite(410,random(50,300),20,20);
    npc2.velocityX=-7;
   

    npc2.addAnimation("npc2",npc2img);
    npc2.scale=0.5;
    npc2Group.add(npc2);

  }
  if(bulletsGroup.isTouching(npc2)){
    npc2.destroy();
    bullet.destroy();
    score=score+100
  }

  

  
 
  
car.collide(ground);
if(ground.x<ground.x+20){
  ground.x=ground.width/2;
}
car.collide(wall);
wall.visible=false;

car.collide(topWall);

topWall.shapeColor=("purple")

car.collide(sideWall);
 
sideWall.shapeColor=("brown");

backgroundimg.depth=backgroundimg.depth-1;

if(npcGroup.isTouching(sideWall)){
  npc.destroy();
  score=0;
  gameState=1;
}
if(npc2Group.isTouching(sideWall)){
  npc2.destroy();
  score=0;
  gameState=1;
}
//car.collide(npc);
//car.collide(npc2);


  }

  if(gameState===1){
    playAgain=createButton("play again");
playAgain.position(200,350,50,20)
gameOver=createElement('h2');
gameOver.html("GAME OVER");
gameOver.position(200,200);
    car.destroy();
    npc.destroy();
    npc2.destroy();
    ground.velocityX=0;
   
  
    playAgain.mousePressed(()=>{
      
    
 gameState=0;
 playAgain.hide();
 gameOver.hide();

 car=createSprite(100,362,50,10);
 car.addImage("car",carimg);
 score=0;
      })
  }
  
 
  drawSprites();

  textSize(20);
  textFont("Georgia");
  textStyle(BOLD);
  
  fill("black");
  
  text("score:"+score,280,100);
  if(score%100===0){
    npcGroup.velocityX=npcGroup.velocityX+-2;
    npc2Group.velocityX=npc2Group.velocityX-2;
  }
  
    

}