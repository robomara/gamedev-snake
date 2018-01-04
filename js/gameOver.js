
var gameOverState = {
	create: function(){
		game.add.image(0,0,'background2');
		restartText = game.add.text(game.world.centerX,game.world.centerY,'click to restart');
		restartText.anchor.setTo(0.5,1);
		finalScoreText = game.add.text(game.world.centerX,game.world.centerY-100,'Score: ' + score);
		finalScoreText.anchor.setTo(0.5,0);
		game.input.onDown.addOnce(restart,this);
	}
}


function restart(){
	scoreText.text = 0;
	score = 0;
	appleExist = false;
	game.state.start('mainState');
}
