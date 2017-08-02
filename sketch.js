
var spawnInterval = 0;

function setup(){
	createCanvas(400, 400);
	background(0, 0, 0);
	init();
}
function init(){
	enemies = [];
	bullets = [];
	ebullets = [];
	spawns = [];
	player.x = 190;
	player.y = 300;
	pause = true;
	gameIsOver = false;
}
function draw(){
	noStroke()
	background(71);
	if(!pause){
		player.update();
		// SPAWN
		if(spawnInterval == 0){
			spawn();
			spawnInterval = 60;
		} else {
			spawnInterval -= 1;
		}
		// ENEMY
		for(var i = 0; i < enemies.length; i++){
			enemies[i].update();
			if(collide(enemies[i].x, enemies[i].y, enemies[i].s, player.x, player.y, player.s)){
				gameIsOver = true;
			}
			if(outside(enemies[i].x, enemies[i].y, enemies[i].s)){
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
		if(gameIsOver){
			gameOver();
		}
	}

}

function Enemy(x, y, type, vx, vy){
	this.x = x;
	this.y = y;
	if(type == 00){
		this.s = 16;
		this.c = [211, 71, 71];
		this.hp = 3;
		this.vx = vx;
		this.vy = vy;
		this.cfirecd = 60;
		this.firecd = this.cfirecd;
		this.update = function(){
			this.draw();
			this.move();
			this.fire();
		}
	} else if(type == 01){
		this.s = 32;
		this.c = [161, 71, 71];
		this.hp = 12;
		this.vx = vx;
		this.vy = vy;
		this.cfirecd = 120;
		this.cabilitycd = 30;
		this.firecd = this.cfirecd;
		this.abilitycd = this.cabilitycd;
		this.update = function(){
			this.draw();
			this.move();
		},
		this.ability = function(){

		}
	} else if(type == 02){

	}

	this.fire = function(){
		if(this.firecd < 0){
			var ax = player.x + 10;
			var ay = player.y + 10;
			var a = atan2(ay - this.y, ax - this.x);
			var eBullet = new EnemyBullet(this.x, this.y, cos(a), sin(a));
			ebullets.push(eBullet);
			this.firecd = this.cfirecd;
		}
		this.firecd -= 1;
	}

	this.draw = function(){
		fill(this.c);
		rect(this.x, this.y, this.s, this.s);
	}

	this.move = function(){
		this.x += this.vx;
		this.y += this.vy;
	}
}

function Bullet(x, y){
	this.x = x;
	this.y = y;
	this.s = 8;
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

function collide(x1, y1, s1, x2, y2, s2){
	if(x1 < x2 + s2 && x2 < x1 + s1 && y1 < y2 + s2 && y2 < y1 + s1){
		return true;
	} else {
		return false;
	}
}

function outside(x, y, s){
	if(x > 400 || x + s < 0 || y > 400 || y + s < 0){
		return true;
	} else {
		return false;
	}
}

function spawn(){
	var toSpawn = floor(random(4));
	for(var i = 0; i < toSpawn; i++){
		var x = random(380);
		var enemy = new Enemy(x, 0, 00, 0, 1);
		enemies.push(enemy);
	}
}

function gameOver(){
	enemies.length = 0;
	bullets.length = 0;
	ebullets.length = 0;
	spawns.length = 0;
	init();
}

Array.min = function(array){
	return Math.min.apply(Math, array);
};

// ENEMY PATTERNS
// BULLET PATTERNS


// ENEMY LIST
/*
00 = MINION
01 = ENFORCER
*/
