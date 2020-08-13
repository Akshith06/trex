var Play,End,gamestate,trex,trexrunning,trexcollide,ground,invisibleground,groundimage,cloudimage,Cloudsgroup,cloud,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclegroup,score,gameover,restart,restarted,gamend,trexded
 Play=1; 
 End=0;
 gamestate=Play;
function preload() {
trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
 groundimage=loadImage("ground2.png"); 
 cloudimage=loadImage("cloud.png");
 obstacle1=loadImage("obstacle1.png");
 obstacle2=loadImage("obstacle2.png"); 
 obstacle3=loadImage("obstacle3.png");
 obstacle4=loadImage("obstacle4.png");
 obstacle5=loadImage("obstacle5.png");
 obstacle6=loadImage("obstacle6.png");
 gamend=loadImage("gameOver.png");
 restarted=loadImage("restart.png");
 trexded=loadImage("trex_collided.png");
}


function setup() {
  createCanvas(400, 400);
  Cloudsgroup=new Group();
  obstaclegroup=new Group();
  score=0;
  gameover=createSprite(250,100,1,1);
  gameover.addImage("gameend",gamend);
  gameover.scale=0.5;
  restart=createSprite(250,150,1,1);
  restart.addImage("restarte",restarted);
  restart.visible=false;
  gameover.visible=false;
  restart.scale=0.7;
  trex=createSprite(50,380,1,1);
  trex.scale=0.5;
  trex.addAnimation("running",trexrunning);
  trex.addAnimation("collide",trexded);
  ground=createSprite(200,380,1,1);
  ground.addImage("groundmove",groundimage);
    //invisibleground.visible=false;
  ground.x=ground.width/2;
  ground.velocityX=-2;
    invisibleground=createSprite(200,390,400,1);
  invisibleground.visible=false;
}

function draw() {
  background(255);

  if(obstaclegroup.isTouching(trex))
  {
    gamestate=End;
  }
  if(gamestate===Play)
  {
      if(keyDown("space"))
     {
       trex.velocityY = -12 ;
    }
    if(ground.x<0)
    {
       ground.x=ground.width/2; 
    }
  spawnclouds();
  spawnobstacles();
    score=score+Math.round(getFrameRate()/60);
  }
  //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    trex.collide(invisibleground);
  if(gamestate===End)
  {
    gameover.visible=true;
    restart.visible=true;
   trex.changeAnimation("collide",trexded);
    obstaclegroup.setVelocityXEach(0);
    ground.velocityX=0;
    Cloudsgroup.setVelocityXEach(0);
    trex.velocityY=0;
    if(mousePressedOver(restart))
    {
    reset();
    } 
  }
  text("score:"+score,300,50);
  drawSprites();
}

function spawnclouds ()
{
 if(World.frameCount%60===0)
 {
  cloud=createSprite(400,Math.round(random(280,320)),100,100);
   cloud.addImage("cloudi",cloudimage);
  
   cloud.scale=0.5;
   cloud.velocityX= -3;
   cloud.lifetime=134;
   
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
   Cloudsgroup.add(cloud);
 } 
}

function spawnobstacles ()
{
 if(World.frameCount % 60 === 0) 
 {
    var obstacle = createSprite(400,365,10,40);
    //obstacle.velocityX = - (6 + 3*count/100);
    obstacle.velocityX=-4;
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand)
   {
     case 1: obstacle.addImage(obstacle1);
  break; 
       case 2: obstacle.addImage(obstacle2);
  break;
         case 3: obstacle.addImage(obstacle3);
  break;
           case 4: obstacle.addImage(obstacle4);
  break;
             case 5: obstacle.addImage(obstacle5);
   break;
               case 6: obstacle.addImage(obstacle6);
   break;
                 default:break;
   }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = -70;
    
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}
function reset()
{
gamestate=Play;
gameover.visible=false;
restart.visible=false;
score=0;
obstaclegroup.destroyEach();
Cloudsgroup.destroyEach();
trex.changeAnimation("running",trexrunning);  
} 