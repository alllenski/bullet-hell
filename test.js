
x = 40;
y = 40;

offsetX = 0;
offsetY = 0;

function setup(){
	createCanvas(600, 480);
}

function draw(){
	push();
	translate(offsetX, offsetY);
	rect(-offsetX, -offsetY, 640, 480);
	fill(255, 0, 0);
	rect(x - offsetX, y - offsetY, 8, 8);
	rect(200, 20, 8, 8);
	pop();
	offsetX++;
}