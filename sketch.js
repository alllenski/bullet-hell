
WIDTH = 400;
HEIGHT = 400;

function preload(){
	stand = loadImage("res/Stand.png");
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
	player.x = WIDTH / 2;
	player.y = HEIGHT / 2;
	pause = false;
	gameIsOver = false;
}

function draw(){
	noStroke()
	background(71);
	gameArea();
}

function gameArea(){
	if(!pause){
		player.update();
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
		fill(211, 211, 71);
		rect(this.x, this.y, this.s, this.s);
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

function keyReleased() {
	if(keyCode == 80){
		if(pause){
			pause = false;
		} else {
			pause = true;
		}
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
	bullets.length = 0;
	ebullets.length = 0;
	init();
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