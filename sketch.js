
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1;
var world,boy;
var score=0;

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {

	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new Mango(1100,100,30);
	mango2=new Mango(1200,150,38);
	mango3=new Mango(990,110,30);
	mango4=new Mango(1100,170,40);
	mango5=new Mango(900,190,30);

	treeObj=new Tree(1050,580);
	groundObject=new Ground(width/2,600,width,20);
	stoneObj=new Stone(200,420,30);
	launcherObj=new Launcher(stoneObj.body,{x:245,y:420})
	

	var render=Render.create({
element:document.body,
engine:engine,
options:{
	width:1300,
	height:600,
	wireframes:false
}
	});
	Engine.run(engine);
	Render.run(render);

}

function draw() {

  background(230);
  //Add code for displaying text here!
  	textSize(30);
	text("PLUCKING MANGOES",30,70)
	textSize(20);
	text("Press Space to get Stone again",30,120)
	textSize(29);
	text("Score = "+score,420,60);
  image(boy ,200,340,200,300);
  

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  

  groundObject.display();
  
  stoneObj.display();
  launcherObj.display();
  detectCollision(stoneObj,mango1)
  detectCollision(stoneObj,mango2)
  detectCollision(stoneObj,mango3)
  detectCollision(stoneObj,mango4)
  detectCollision(stoneObj,mango5)
}

function mouseDragged(){
	Matter.Body.setPosition(stoneObj.body,{x:mouseX,y:mouseY});

}
function mouseReleased(){
	launcherObj.fly();
}

function detectCollision(lstone,lmango){
	mangoBody=lmango.body.position;
	stoneBody=lstone.body.position;
	var distance=dist(stoneBody.x,stoneBody.y,mangoBody.x,mangoBody.y);
	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body,false);
		score++;
	}
}

function keyPressed(){
	if(keyCode===32){
		Matter.Body.setPosition(stoneObj.body,{x:200,y:420})
		launcherObj.attach(stoneObj.body);
	}
}