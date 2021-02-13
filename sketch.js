var player,player_running,player_jump,player_dead;
var bg,bgimg,h,i,sound,t,timg;
var p,pimg,gameState = "start";
var obs,obsi1,obsi2,obsi3,obsgrp;
var jump,gos,y=0;
var restartimg,restart;
var gameoverimg,gameover;
var s =0,k,kgrp;
var variable=0;

function preload(){
  player_running = loadAnimation("walk1.png","walk2.png");
  player_jump = loadAnimation("jump.png");
  bgimg = loadImage("background.png");
  sound = loadSound("MattOglseby - 2.m4a");
  timg = loadImage("Title.png");
  pimg = loadImage("Play.png");
  jump  =loadSound("Mario Jump.mp3");
  gos = loadSound("Game Over.mp3");
  obsi1 = loadImage("Spikey1.png");
  obsi2 = loadImage("Spikey2.png");
  player_dead = loadAnimation("dead.png");
  restartimg = loadImage("Button_74.png");
  gameoverimg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600,300);
  bg = createSprite(0,150,10,10);
  bg.addImage(bgimg);
  bg.scale = 0.5;
   
  h = createSprite(620,150,10,10);
  i = createSprite(100,275,90,10);

  player = createSprite(100,250,10,10);
  player.addAnimation("jump",player_jump);
  player.addAnimation("running",player_running);
  player.addAnimation("dead",player_dead);
  player.scale = 0.7;
  
  t = createSprite(300,75,10,10);
  t.addImage(timg);
  p = createSprite(300,200,10,10);
  p.addImage(pimg);
  
  restart = createSprite(300,200,10,10);
  restart.addImage(restartimg);
  
  gameover = createSprite(300,100,10,10);
  gameover.addImage(gameoverimg);
  obsgrp = new Group();
  kgrp = new Group();
}

function draw() {
  background("");
  restart.visible = false;
  gameover.visible = false;
  
   
  if(gameState === "play" || gameState === "start"){
    y = y+1
    if(y===1){
     sound.loop();
    }
  }
  
  if(gameState === "start"){
    player.visible = false;
    bg.visible = true;
   s =0;
    
  bg.velocityX = -3;
  if(!bg.isTouching(h)){
    bg.x=500
  }
    if(mousePressedOver(p)){
      gameState = "play"
      player.visible = true;
      p.visible = false;
      t.visible = false;
      player.y = 100;
    }
  }
  if(gameState === "play"){
   bg.visible = true;
  bg.velocityX = -3;
  if(!bg.isTouching(h)){
    bg.x=500
  }
    player.velocityY = player.velocityY+0.8;
    if(keyWentDown("space")&&player.y>249){
      player.velocityY = player.velocityY-14.3;
      player.changeAnimation("jump",player_jump);
      jump.play();
    }
    
    if(keyWentDown("up")&&player.y>249){
      player.velocityY = player.velocityY-14.3;
      player.changeAnimation("jump",player_jump);
      jump.play();
    }
    
    if(keyWentDown("w")&&player.y>249){
      player.velocityY = player.velocityY-14.3;
      player.changeAnimation("jump",player_jump);
      jump.play();
    }
    obs1();
    
    if(player.isTouching(obsgrp)){
      player.velocityY = 0;
      player.changeAnimation("dead",player_dead);
      gos.play(); 
      gameState = "end";
     
    }
    
    if(player.isTouching(i)){
      player.changeAnimation("running",player_running);
    }
   
  }
  if(gameState === "end"){
    
    bg.velocityX = 0;
    y = 0
    obsgrp.setVelocityXEach(0);
    if(mousePressedOver(restart)){
      sound.loop();
      gameState = "play"
      obsgrp.destroyEach(); 
      s = 0;
      variable= 0; 
    }
    obsgrp.setLifetimeEach(-1);
    restart.visible = true;
    gameover.visible = true;
    sound.stop();
  }
  i.visible = false;
  player.collide(i);
  
  drawSprites();
  
  if(gameState==="start"){
    fill("red");
    textFont("Forte")
    textSize(30);
    text("Monsters are chasing you, RUN AWAY!!!!",40,275);
  }
  
  if(gameState==="play" || gameState==="end"){
    textSize(19);
    text("Score: " + s ,480,50);
    if(player.isTouching(kgrp) && !player.isTouching(obsgrp)){
      
      variable  = variable + 1
      if(variable >= 1){
        s=s+1;
        variable = -24;
      }
      variable  = variable + 1
    }
  }
  
}
function obs1(){
  if(frameCount%150===0){
  obs = createSprite(600,250,10,10);
  obs.velocityX = -3;
  var a = Math.round(random(1,2));
    switch(a) {
      case 1: obs.addImage(obsi1);
              break;
      case 2: obs.addImage(obsi2);
              break;
    default: break;
    }
    obsgrp.add(obs);
    obs.lifetime = 200;
    
  k = createSprite(600,144.70000000000002,10,10);
  k.velocityX = -3;
  k.visible = false;
  kgrp.add(k);
  }
}