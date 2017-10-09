
WIDTH = 400;
HEIGHT = 400;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

function preload(){
	Stand = loadImage("assets/Stand.png");
	StandUp = loadImage("assets/StandUp.png");
	StandDown = loadImage("assets/StandDown.png");
	LeftWalk = loadImage("assets/LeftWalk.png");
	LeftWalkUp = loadImage("assets/LeftWalkUp.png");
	LeftWalkDown = loadImage("assets/LeftWalkDown.png");
	RightWalk = loadImage("assets/RightWalk.png");
	RightWalkUp = loadImage("assets/RightWalkUp.png");
	RightWalkDown = loadImage("assets/RightWalkDown.png");
	BulletSpr = loadImage("assets/Bullet.png");
	LeftMiniSkull = loadImage("assets/LeftMiniSkull.png");
	RightMiniSkull = loadImage("assets/RightMiniSkull.png");
}

function setup(){
	createCanvas(WIDTH, HEIGHT);
	background(0, 0, 0);
	init();
}

function init(){
	bullets = [];
	ebullets = [];
	enemies = [];
	spawns = [];
	spawnInterval = 0;
	player.x = WIDTH / 2;
	player.y = HEIGHT / 2;
	player.spr = Stand;
	pause = false;
	gameIsOver = false;
}

function draw(){
	noStroke()
	background(0);
	gameArea();
}

function gameArea(){
	if(!pause){
		player.update();
	    // SPAWN
	    if(spawnInterval == 0){
	    	spawn();
	    	spawnInterval = 120;
	    } else {
	    	spawnInterval -= 1;
	    }
	    updateOthers();
	    if(gameIsOver){
	    	gameOver();
	    }
	}
}

function Bullet(x, y){
	this.x = x;
	this.y = y;
	this.s = 4;
	this.popping = false;

	this.draw = function(){
		image(BulletSpr, this.x, this.y);
	}

	this.move = function(){
		this.y -= 5;
	}

	this.poof = function(){
		this.popping = true;
	}
}

function EnemyBullet(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.s = 4;
	this.popping = false;

	this.draw = function(){
		fill(211, 71, 211);
		rect(this.x, this.y, this.s, this.s);
	}

	this.move = function(){
		this.x += vx;
		this.y += vy; 
	}

	this.poof = function(){
		this.popping = true;
	}
}

function keyPressed(){
	switch(keyCode){
		case 87:
		keyW = true;
		break;
		case 83:
		keyS = true;
		break;
		case 65:
		keyA = true;
		break;
		case 68:
		keyD = true;
		break;
	}
}


function keyReleased(){
	switch(keyCode){
		case 87:
		keyW = false;
		break;
		case 83:
		keyS = false;
		break;
		case 65:
		keyA = false;
		break;
		case 68:
		keyD = false;
		break;
	}
}


function collide(x1, y1, w1, h1, x2, y2, w2, h2){
	if(x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1){
		return true;
	} else {
		return false;
	}
}

function outside(x, y, w, h){
	if(x > WIDTH || x + w < 0 || y > HEIGHT || y + h < 0){
		return true;
	} else {
		return false;
	}
}

function gameOver(){
	enemies.length = 0;
	bullets.length = 0;
	ebullets.length = 0;
	init();
}

function spawn(){
	var toSpawn = floor(random(4));
	for(var i = 0; i < toSpawn; i++){
		var x = random(380);
		var enemy = new Enemy(x, 0, 00, 0, 1);
		enemies.push(enemy);
	}
}

function updateOthers(){
	for(var i = 0; i < enemies.length; i++){
		enemies[i].update();
		if(collide(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h, player.x, player.y, player.w, player.h)){
			gameIsOver = true;
		}
		if(outside(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h)){
			enemies.splice(i, 1);
		}
	}
		// BULLET COLLISION
		for(var i = 0; i < ebullets.length; i++){
			ebullets[i].draw();
			ebullets[i].move();
			if(collide(ebullets[i].x, ebullets[i].y, ebullets[i].s, player.x, player.y, player.s)){
				ebullets[i].poof();
			}
			if(outside(ebullets[i].x, ebullets[i].y, ebullets[i].s)){
				ebullets[i].poof();
			}
			if(ebullets[i].popping){
				ebullets.splice(i, 1);
			}
		}
		for(var i = 0; i < bullets.length; i++){
			bullets[i].draw();
			bullets[i].move();
			for(var j = 0; j < enemies.length; j++) {
				if(collide(bullets[i].x, bullets[i].y, bullets[i].s, enemies[j].x, enemies[j].y, enemies[j].s)){
					bullets[i].poof();
					enemies[j].hp -= 1;
					if(enemies[j].hp <= 0){
						enemies.splice(j, 1);
					}
				}
			}
			if(outside(bullets[i].x, bullets[i].y, bullets[i].s)){
				bullets[i].poof();
			}
			if(bullets[i].popping){
				bullets.splice(i, 1);
			}
		}
	}

	Array.min = function(array){
		return Math.min.apply(Math, array);
	};

// fire tracking
/*
		if(frog.firecd < 0){
			var ax = player.x + 10;
			var ay = player.y + 10;
			var a = atan2(ay - frog.y, ax - frog.x);
			var eBullet = new EnemyBullet(frog.x + frog.center, frog.y + frog.center, cos(a), sin(a));
			ebullets.push(eBullet);
			frog.firecd = frog.cfirecd;
		}
		frog.firecd -= 1;
*/