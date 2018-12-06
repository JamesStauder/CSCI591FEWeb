var mainCanvasWidthPercent = .8;
var mainCanvasHeightPercent = .94;

var scoreCanvasWidthPercent = .8;
var scoreCanvasHeightPercent = .05;
var scoreCanvas = document.getElementById('scoreCanvas');

ctxScore = scoreCanvas.getContext('2d');

var game = new Phaser.Game(window.innerWidth * mainCanvasWidthPercent,window.innerHeight * mainCanvasHeightPercent,Phaser.AUTO, 'mainCanvas', { preload: preload, create: create, update: update, render: render });


var score = 0;
var player;
var difficultyLevel = 3;
var livingEnemies = [];
var numberOfLives = 20;

$(document).ready(function($){
	windowResize();
});

function preload() {
    game.load.image('bullet', '/typerPython/game2/assets/bullet.png');
    game.load.image('ship', '/typerPython/game2/assets/player.png');
    game.load.spritesheet('kaboom', '/typerPython/game2/assets/explode.png', 128, 128);
    game.load.image('starfield', '/typerPython/game2/assets/starfield.png');
	game.load.image('ufo', '/typerPython/game2/assets/ufo.png');
}
function update(){
    //  Scroll the background
    starfield.tilePosition.y += 2;
	player.angle += 1;
	
	
    if (player.alive)
    {
		// determine if an enemy has gone out of bounds. If so, kill the player
		checkEnemiesOutOfBounds();
        
	    //  Run collision	
		game.physics.arcade.overlap(enemies, player, enemyHitsPlayer, null, this);
    }

}
function windowResize(){
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}
function resizeCanvas(){
	scoreCanvas.width = window.innerWidth * scoreCanvasWidthPercent;
	scoreCanvas.height = window.innerHeight * scoreCanvasHeightPercent;
}
function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
	
	
	setInterval(function(){
	spawnEnemy(); 
	}, 10000/difficultyLevel);

    starfield = game.add.tileSprite(0, 0, window.innerWidth * mainCanvasWidthPercent,window.innerHeight * mainCanvasHeightPercent, 'starfield');

	player = game.add.sprite(window.innerWidth * mainCanvasWidthPercent/2,window.innerHeight * mainCanvasHeightPercent/2, 'ship');
    game.physics.enable(player, Phaser.Physics.ARCADE);

	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;
    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    liveText = game.add.text(game.world.width - 150, 10, 'Lives : ' + numberOfLives, { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

	
	//  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setUpBlam, this);
}
function render() {
	
}
function setUpBlam (boom) {

    boom.anchor.x = 0.5;
    boom.anchor.y = 0.5;
    boom.animations.add('kaboom');

}
function spawnEnemy(){
	
	borders = ['left', 'top', 'right', 'bottom'];
	whichSide = borders[Math.floor(Math.random()*5)];
	
	if (whichSide == 'left'){
		var bad = enemies.create(50, game.rnd.integerInRange(10,game.world.height-10),'ufo');
	}
	else if (whichSide == 'top'){
		var bad = enemies.create(game.rnd.integerInRange(10,game.world.width-10),50,'ufo');
	}
	else if(whichSide == 'right'){
		var bad = enemies.create(game.world.width - 50, game.rnd.integerInRange(10,game.world.height-10),'ufo');
	}
	else{
		var bad = enemies.create(game.rnd.integerInRange(10,game.world.width-10),game.world.height-50,'ufo');
	}

	bad.body.moves.true;
	bad.answer = game.rnd.integerInRange(0,10);
	var spriteTitle = game.add.text(30,30,bad.answer,{ font: "50px Arial", fill: "#ff0000", align: "center" });
	bad.addChild(spriteTitle);
	
	bad.body.velocity.x = (player.x - bad.x)/100*difficultyLevel;
	bad.body.velocity.y = (player.y - bad.y)/100*difficultyLevel;
}
function checkEnemiesOutOfBounds(){
	livingEnemies.length=0;

    enemies.forEachAlive(function(bad){
        livingEnemies.push(bad);
    });
	
	for(var i = 0; i < livingEnemies.length; i++)
	{
		if(livingEnemies[i].body.y > game.world.height)
		{
			livingEnemies[i].kill(); 
		}
		
	}
}
function enemyHitsPlayer (player,bad) {
 
    bad.kill();
	killPlayer();

}
function killPlayer(){
	numberOfLives-=1;
	liveText.text = "Lives: " + numberOfLives;

    //  And create an explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (numberOfLives < 1)
    {
        player.kill();

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
    }
}
function checkForAnswer(output){
    enemies.forEachAlive(function(bad){
		console.log(output.toString().trim());
		console.log(bad.answer.toString().trim());
		if (output.toString().trim() == bad.answer.toString().trim()){
			killEnemy(bad)
		}
    });
}
function killEnemy(bad){
	bad.kill();
	var explosion = explosions.getFirstExists(false);
    explosion.reset(bad.body.x, bad.body.y);
    explosion.play('kaboom', 30, false, true);
}