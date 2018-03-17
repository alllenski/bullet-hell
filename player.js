
player = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	s:4,
	bs:4,
	firecd:0,
	heat:0,
	heats:[],

	draw:function(){
		if(player.spr){
			image(player.spr, player.x, player.y);
		} else {
			fill(0, 255, 0);
			rect(player.x, player.y, player.s, player.s)
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
			var bullet = new Bullet(player.x + player.s / 2 - player.bs / 2, player.y);
			bullets.push(bullet);
			player.firecd = player.heat;
		}
		player.firecd -= 1;
	},

	move:function(){
		if(keyW && keyA){
			player.y += -1.6;
			player.x += -1.6;
		} else if(keyW && keyD){
			player.y += -1.6;
			player.x += 1.6;
		} else if(keyS && keyA){
			player.y += 1.6;
			player.x += -1.6;
		} else if(keyS && keyD){
			player.y += 1.6;
			player.x += 1.6;
		} else if(keyW){
			player.y += -1.6;
		} else if(keyS){
			player.y += 1.6;
		} else if(keyA){
			player.x += -1.6;
		} else if(keyD){
			player.x += 1.6;
		} else {

		}
		player.x = constrain(player.x, 0, WIDTH - player.s);
		player.y = constrain(player.y, 0, HEIGHT - player.s);
	}
}
