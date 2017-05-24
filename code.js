var KLeft=37;
var KRight=39;
var KTop=38;
var KDown=40;

var cols, rows;
var w = 35;
var grid = [];
var current;

var stack = [];
var enemies = [];

var kordx;
var kordy;

var zalX=0;
var zalY=0;

var test=0;

var reseted = false;
var move = true;

var maxHP= 100;
var hp= 100;
var EnHp;
var MaxEnHp;

var keliasX;
var keliasY;
	
var potions = 5;

var score = 0;
var which;
var dmg;
var whichEn;
var ataka;

var enemiesProperties = [
{name : "Bat", type : "winged", Ehp : 30, AtcNr1Name : "Bat wing", AtcNr2Name : "Bite", AtcNr1Dmg : 2, AtcNr2Dmg : 1, Exp : 12},
{name : "Kobold", type : "humanoid", Ehp : 40, AtcNr1Name : "Scratch", AtcNr2Name : "Bite", AtcNr1Dmg : 3, AtcNr2Dmg : 4, Exp : 10},
{name : "Red Kobold", type : "humanoid", Ehp : 60, AtcNr1Name : "Upper spear stab", AtcNr2Name : "Lower spear stab", AtcNr1Dmg : 3, AtcNr2Dmg : 5, Exp : 18},
{name : "Snake", type : "reptile", Ehp : 35, AtcNr1Name : "Poison", AtcNr2Name : "Bite", AtcNr1Dmg : 8, AtcNr2Dmg : 3, Exp : 14},
{name : "Kobold Boss", type : "humanoid", Ehp : 50, AtcNr1Name : "Fire bolt", AtcNr2Name : "Flames", AtcNr1Dmg : 6, AtcNr2Dmg : 5, Exp : 30}
];

function setup() {
  createCanvas(850, 510);
  cols = floor(400/w);
  rows = floor(400/w);

  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
  enemyGenerator();
}

function draw() {	
  background(51);
	
if (reseted){
	 frameRate(100);
  	
}

  for (var i = 0; i < grid.length; i++) {
    grid[i].show(i);
  } 
 
  current.visited = true;
  current.highlight();
  
 
  var next = current.checkNeighbors();
  
  if (next) {
    next.visited = true;

    stack.push(current);
   
    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
	buttons();
  EnemyPlace();
  if (!keyCode){
	keyPressed();
}
  player();
  
  if ( enemies[index(zalX, zalY)]){
		move= false;
		whichEn=enemies[index(zalX, zalY)];
		
		MaxEnHp=enemiesProperties[whichEn].Ehp;
		 noStroke();
		fill(255);
		textSize(20);
		text("Jus susidurete su: "+ enemiesProperties[whichEn].name, 410, 70);
		if (ataka){
		 noStroke();
		fill(255);
		textSize(20);
		text("Jis panaudojo: "+ ataka+ " ataka", 410, 110);
		}}
	
  hpBar();
  EnHPBar();
   end();
   notes();

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function enemyGenerator() {
	
	 var number=floor(cols*rows )-1;
	var sk = floor(number/4);
	
	for (var i=0; i<=sk; i++){
	var r = floor(random(1, number));
	var e = floor(random(0, 5));
		enemies[r]=e;
		
	}
}

function EnemyPlace(){
	var y;
	var x;
	
	for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
		if (enemies[index(i, j)]) {
			x = i*w;
			y= j*w;
			
      noStroke();
      fill(255, 0, 0, 100);
      rect(x+10, y+10, w-20, w-20);
    } } }	
}

  function player(){
	
		 var x = zalX *w;
		 var y = zalY *w;
	   noStroke();
      fill(5, 252, 223 ,100);
      rect(x, y, w, w);
	 
	  
  }
  
  function keyPressed() {
	 // tikrina ar pabaigtas labirintas
	  if (test> 1){
		  reseted = true;
	  }
	 else if (kordx == 0 && kordy == 0 && !reseted ){
		  test++;
		 
	  };
	  
	  // judejimas
	 if (reseted == true && move ){
		
 if (keyCode === KLeft){
	keyCode= false;
	if (!grid[index(zalX, zalY)].walls[3]){
	kelias();
	zalX--;
	
if ( enemies[index(zalX, zalY)]){
			
		EnHp= enemiesProperties[enemies[index(zalX, zalY)]	].Ehp
  } } }
 if (keyCode === KRight){
	keyCode= false;
	if (!grid[index(zalX, zalY)].walls[1]){
		kelias();
	zalX++;

	if ( enemies[index(zalX, zalY)]){
			
		EnHp= enemiesProperties[enemies[index(zalX, zalY)]	].Ehp;
		 
	}}}
  if (keyCode === KTop){
    keyCode= false;
	if (!grid[index(zalX, zalY)].walls[0]){
    	kelias();
	zalY--;
	
	if ( enemies[index(zalX, zalY)]){
			
		EnHp= enemiesProperties[enemies[index(zalX, zalY)]	].Ehp;
	} } }
  if (keyCode === KDown){
    keyCode= false;
	if (!grid[index(zalX, zalY)].walls[2]){
		kelias();
    zalY++;
	
	if ( enemies[index(zalX, zalY)]){
			
		EnHp= enemiesProperties[enemies[index(zalX, zalY)]	].Ehp;	
	} } }
}
 }

function kelias(zalX,zalY){
	keliasX=this.zalX;
	keliasY=this.zalY;
	return keliasX,keliasX;
}
 
 function buttons(){
		
		button = createButton('Atack');
		button.position(410, 370);
		button.mousePressed(atack);
		
		button = createButton('Use HP potion ('+ potions + ")");
		button.position(470, 370);
		 button.mousePressed(potion);
		
		button = createButton('Run');
		button.position(600, 370);
		 button.mousePressed(run);
	}
		
	function atack(){		
		if ( enemies[index(zalX, zalY)]){
				
		if (EnHp>0 ){
		var a=whichAtc();
		
		EnHp -=playerDmg() ;
		if (a == 0){
		hp-=enemiesProperties[enemies[index(zalX, zalY)]].AtcNr1Dmg;
		ataka=enemiesProperties[enemies[index(zalX, zalY)]].AtcNr1Name;
	
		console.log(hp);
		}else{
		hp-=enemiesProperties[enemies[index(zalX, zalY)]].AtcNr2Dmg;
		ataka=enemiesProperties[enemies[index(zalX, zalY)]].AtcNr2Name;
		
		console.log(hp);
		}
		
		} 
		if ( EnHp<=0){
			enemies[index(zalX, zalY)] = false;
			score ++;
			hp+=10;
			move = true;
			console.log("enemie");
		}	
	}
			
		}
	
	 function whichAtc() {
        which = Math.floor(Math.random() * 2);
       return which; };
      
	  function playerDmg() {
        dmg = Math.floor(Math.random() * 10) + 1 ;
       return dmg; };
	
	
	function potion(){
		if (potions>0){
		if (hp>=75){
			potions--;
		hp=maxHP;}
		else {
		hp+=25;
		potions--;}
		}
	}	
	
	function run(){
			if ( enemies[index(zalX, zalY)]){	
		zalX=keliasX;
		zalY=keliasY;
		move= true;
		hp-=5;
		EnHp= -100;
			}
			}	
			
function EnHPBar(){
	stroke(255);
	 fill(152,0,0);
  rect(410, 20, 350, 15);
  
	 if (hp < 25)
  {
    fill(255, 0, 0);
  }  
  else if (hp < 50)
  {
    fill(255, 200, 0);
  }
  else
  {
    fill(30, 190, 30);
  }
  if (EnHp>=0){
  var width = (EnHp / MaxEnHp) * 350;
  rect(410, 20, width, 15);
  }
}

function hpBar(){
	stroke(255);
	 fill(152,0,0);
  rect(75, 395, 350, 15);
  
	 if (hp < 25)
  {
    fill(255, 0, 0);
  }  
  else if (hp < 50)
  {
    fill(255, 200, 0);
  }
  else
  {
    fill(30, 190, 30);
  }
  
  var drawWidth = (hp / maxHP) * 350;
  rect(75, 395, drawWidth, 15);
}

function end() {
	if (hp <=0){
		alert("Pralaimejai tavo rezultatas:"+ score);
		window.location.href = "index.html";
	}
	else if (zalX  == rows && zalY  == cols ){
		alert ("win tavo score:"+ score);
		
	}	
	
}

function notes(){
	
	 noStroke();
		fill(200);
		textSize(18);
		text("Navigavimas su rodyklemis.", 10, 460);
		
		 noStroke();
		fill(200);
		textSize(18);
		text("Laimi jei pasieki auksini kvadrata.", 10, 480);
		
		 noStroke();
		fill(200);
		textSize(18);
		text("Mazesni raudoni kvadratukai priesai.", 10, 500);
		
		noStroke();
		fill(220);
		textSize(20);
		text("DLC Coming soon...", 665, 505);
		
		noStroke();
		fill(200);
		textSize(18);
		text("Player: ", 10, 408);
		
}
