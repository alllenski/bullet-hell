player = {
	x:190,
	y:300,
	s:20,
	firecd:0,
	heat:0,
	heats:[],
	d:0,

	draw:function(){
		fill(211);
		rect(player.x, player.y, player.s, player.s);
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
		player.heat = Math.min(120, Array.min(player.heats) / 8)
		player.heats.length = 0;
		if(player.firecd < 0){
			var bullet = new Bullet(player.x + 6, player.y);
			bullets.push(bullet);
			player.firecd = player.heat;
		}
		player.firecd -= 1;
	},
	move:function(){
		if(keyIsDown(37)){
			player.x -= 4;
		}
		if(keyIsDown(39)){
			player.x += 4;
		}
		if(keyIsDown(38)){
			player.y -= 4;
		}
		if(keyIsDown(40)){
			player.y += 4;
		}
		if(keyIsDown(90)){
			// Fire secondary weapon
		}
		player.x = constrain(player.x, 0, 380);
		player.y = constrain(player.y, 0, 380);
	}
}

// HEAT SYSTEM. FIRE MORE WHEN NEAR ENEMIES