
function Enemy(x, y){
	this.x = x,
	this.y = y,
	this.s = 12,
	this.center = 6,
	this.bs = 4,
	this.hp = 5,
	this.cfirecd = 20,
	this.firecd = 0,
	this.b1 = -1,
	this.a1 = 0.1,
	this.b2 = 1,
	
	this.draw = function(){
		fill(255, 0, 0);
		rect(this.x, this.y, this.s, this.s);
	},
	
	this.fire = function(){	
		if(this.firecd < 0){
			var ax = player.x - player.s;
			var ay = player.y - player.s;
			var a = atan2(ay - this.y, ax - this.x);
			var eBullet = new EnemyBullet(this.x + this.center, this.y + this.center, cos(a), sin(a));
			ebullets.push(eBullet);
			this.firecd = this.cfirecd;
		}
		this.firecd -= 1;
	},

	this.move = function(){
		this.y += 1;
	},

	this.update = function(){
		this.fire();
		this.move();
		this.draw();
	}

}
