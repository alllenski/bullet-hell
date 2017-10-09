
player = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	w:12,
	h:16,
	bs:4,
	firecd:0,
	heat:0,
	heats:[],

	draw:function(){
		if(player.spr){
			image(player.spr, player.x, player.y);
		} else {

		}
	},

	update:function(){
		player.fire();
		player.move();
		player.draw();
	},

	fire:function(){
		for(var i = 0; i < enemies.length; i++){
			player.d = dist(player.x, player.y, enemies[i].x, enemies[i].y);
			player.heats.push(player.d);
		}
		player.heat = Math.min(60, Array.min(player.heats) / 8)
		player.heats.length = 0;
		if(player.firecd < 0){
			var bullet = new Bullet(player.x + player.w / 2 - player.bs / 2, player.y);
			bullets.push(bullet);
			player.firecd = player.heat;
		}
		player.firecd -= 1;
	},

	move:function(){
		if(keyW && keyA){
			player.y += -1.6;
			player.x += -1.6;
			player.spr = LeftWalkUp;
		} else if(keyW && keyD){
			player.y += -1.6;
			player.x += 1.6;
			player.spr = RightWalkUp;
		} else if(keyS && keyA){
			player.y += 1.6;
			player.x += -1.6;
			player.spr = LeftWalkDown;
		} else if(keyS && keyD){
			player.y += 1.6;
			player.x += 1.6;
			player.spr = RightWalkDown;
		} else if(keyW){
			player.y += -1.6;
			player.spr = StandUp;
		} else if(keyS){
			player.y += 1.6;
			player.spr = StandDown; 
		} else if(keyA){
			player.x += -1.6;
			player.spr = LeftWalk;
		} else if(keyD){
			player.x += 1.6;
			player.spr = RightWalk;
		} else {
			player.spr = Stand;
		}
		player.x = constrain(player.x, 0, WIDTH - player.w);
		player.y = constrain(player.y, 0, HEIGHT - player.h);
	}
}
