
function Enemy(x, y, type){
	this.x = x,
	this.y = y,
	this.s = 100,
	this.bs = 4,
	this.hp = 200,
	this.cfirecd = 20,
	this.firecd = 0,
	this.b1 = -1,
	this.a1 = 0.1,
	this.b2 = 1,

	draw = function(){
		fill(211);
		rect(this.x, this.y, this.s, this.s);
	},
	
	fire = function(){
		if(this.firecd < 0){
			var eBullet = new EnemyBullet(this.x + this.s / 2 - this.bs / 2, this.y + this.s / 2 - this.bs / 2, this.b1, 1);
			ebullets.push(eBullet);
			this.firecd = this.cfirecd;
		}
		this.firecd -= 1;
	},

	move = function(){

	},

	update = function(){
		this.fire();
		this.move();
		this.draw();
	}

}

function Minion(x, y){

}