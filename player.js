
player = {
	x:0,
	y:0,
	w:12,
	h:16,
	bs:4,
	spr:stand,
	firecd:0,
	heat:0,
	heats:[],

	draw:function(){
		fill(211);
		image(player.spr, player.x, player.y);
	},

	setSprite:function(){

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
		if(keyIsDown(90)){
			if(keyIsDown(37)){
				player.x -= 0.85;
			}
			if(keyIsDown(39)){
				player.x += 0.85;
			}
			if(keyIsDown(38)){
				player.y -= 0.85;
			}
			if(keyIsDown(40)){
				player.y += 0.85;
			}
		} else {
			if(keyIsDown(37)){
				player.x -= 1.5;
			}
			if(keyIsDown(39)){
				player.x += 1.5;
			}
			if(keyIsDown(38)){
				player.y -= 1.5;
			}
			if(keyIsDown(40)){
				player.y += 1.5;
			}
		}
		if(keyIsDown(90)){
			// Fire secondary weapon
		}
		player.x = constrain(player.x, 0, WIDTH - player.w);
		player.y = constrain(player.y, 0, HEIGHT - player.h);
	}
}
