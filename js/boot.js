
// global variables
var appleExist;

var bootState = {

	preload: function(){

		// backgrounds
		game.load.image('loadscreen','assets/loadscreen.png');
		game.load.image('background','assets/background.png');
		game.load.image('background2','assets/background2.png');

		// items
		game.load.image('apple','assets/apple.png');

		// character
		game.load.image('snake','assets/snake.png');
	},

	create: function(){
		game.add.sprite(0,0,'loadscreen');

		var style = { font: "bold 32px Courier", fill: "#000000"}  
		
		startMessage = game.add.text(game.world.centerX,game.world.centerY,'Snake',style);
		startMessage.anchor.setTo(0.5,0.5);

		startMessage2 = game.add.text(game.world.centerX,game.world.centerY+16,'click to start',style);
		startMessage2.anchor.setTo(0.5,0);
		
		appleExist = false;

		game.input.onDown.addOnce(startGame,this);
	}
};

function startGame(){
	game.state.start('mainState');
}