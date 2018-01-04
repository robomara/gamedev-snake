// mainState variables
//var snake;
var start;
var end;
var cursors;

var snakeX = [];
var snakeY = [];
var snake = [];

var prevDirection = 'up';
var direction = 'right'; // default starting direction

var timeStep = 50;
var growSnake = false;
var score = 0;

var mainState = {


	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);

		prevDirection = 'up';
		direction = 'right'; // default starting direction

		snakeX = [];
		snakeY = [];
		snake = [];

		game.add.sprite(0,0,'background');
		snake = makeSnake();
		start = new Date().getTime();
		end = start + timeStep;

		cursors = game.input.keyboard.createCursorKeys();

		scoreText = game.add.text(game.world.width,0,score);
		scoreText.anchor.setTo(1,0);


	},

	update: function(){

		// generate apple if not present on screen
		collectApple();
		makeApple();
		direction = manageInput();
		
		// update end time to
		end = new Date().getTime();
		
		if (end - start > timeStep){
			moveSnake(direction);
			start = new Date().getTime();
		}

		console.log(direction);
	}
};

function makeApple(){
	if (!appleExist){

	randomX = Math.floor(game.world.width * Math.random() / 20) * 20 + 10;
	randomY = Math.floor(game.world.height * Math.random() / 20) * 20 + 10;

	apple = game.add.sprite(randomX,randomY,'apple');
	apple.anchor.setTo(0.5);
	apple.scale.setTo(1.5);

	appleExist = true;

	return apple;
	}
}

function makeSnake(){
	
	for (i=0; i<10;i++){
		snakeY[i] = Math.floor(game.world.centerY * 20) / 20 + 10;
		snakeX[i] = Math.floor(game.world.centerX * 20) / 20 - 310 + (20*i);	
		snake[i] = game.add.sprite(snakeX[i],snakeY[i],'snake');
		snake[i].anchor.setTo(0.5);
	}	
	return snake;
}

function moveSnake(direction){

	manageDirection(direction);


	if (!growSnake) {

		snakeX.shift();
		snakeY.shift();

		drawSnake();
	}
	else{
		snake.push(game.add.sprite(snakeX[snakeX.length-1],snakeY[snakeY.length-1],'snake'));
		snake[snake.length-1].anchor.setTo(0.5);
		drawSnake();
		growSnake = false;
	}

	selfCollision();
	outOfBounds();
}


function collectApple(){
	if (appleExist){
		if (Phaser.Rectangle.intersects(snake[snake.length-1].getBounds(), apple.getBounds())){
			apple.destroy();
			score += 1;
			appleExist = false;
			scoreText.text = score;
			growSnake = true;
		}	
	}
}


function selfCollision(){
	for (i=0; i<(snake.length-2); i++){
		if(snake[snake.length-1].x == snake[i].x && snake[snake.length-1].y == snake[i].y){
			gameOver();
		}
	}
}

function manageInput(){
	if(cursors.up.isDown && prevDirection != 'down'){
		direction = 'up';
	}
	else if (cursors.down.isDown && prevDirection != 'up'){
		direction = 'down';
	}
	else if (cursors.left.isDown && prevDirection != 'right'){
		direction = 'left';
	}
	else if (cursors.right.isDown && prevDirection != 'left'){
		direction = 'right';
	}

	return direction;
}

function manageDirection(){
	switch(direction) {
		case 'up':
			snakeX.push(snakeX[snakeX.length-1]);
		    snakeY.push(snakeY[snakeY.length-1] - 20);
		    prevDirection = 'up';
		    break;
		case 'down':
		    snakeX.push(snakeX[snakeX.length-1]);
		    snakeY.push(snakeY[snakeY.length-1] + 20);
		    prevDirection = 'down';
		    break;
		case 'left':
		    snakeX.push(snakeX[snakeX.length-1] - 20);
		    snakeY.push(snakeY[snakeY.length-1]);
		    prevDirection = 'left';
		    break;
	    case 'right':
		    snakeX.push(snakeX[snakeX.length-1] + 20);
		    snakeY.push(snakeY[snakeY.length-1]);
		    prevDirection = 'right';
		    break;
		default:
	    	break;
	}
}


function gameOver(){
	game.state.start('gameOverState');
}

function drawSnake(){
	for (i=0;i<(snakeY.length);i++){
			snake[i].x = snakeX[i];
			snake[i].y = snakeY[i];
	}
}

function outOfBounds(){
	if (snake[snake.length-1].x < 0 
		|| snake[snake.length-1].x > game.world.width 
		|| snake[snake.length-1].y < 0
		|| snake[snake.length-1].y > game.world.height){
		gameOver();
	}
}