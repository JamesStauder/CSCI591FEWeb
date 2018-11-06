var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', '/Nov1/Invaders/assets/games/invaders/bullet.png');
    game.load.image('ship', '/Nov1/Invaders/assets/games/invaders/player.png');
    game.load.spritesheet('kaboom', '/Nov1/Invaders/assets/games/invaders/explode.png', 128, 128);
    game.load.image('starfield', '/Nov1/Invaders/assets/games/invaders/starfield.png');
	game.load.image('ufo', '/Nov1/Invaders/assets/games/invaders/ufo.png');
}

var player;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton, aButton, dButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var waveTimer = 0;
var stateText;
var livingEnemies = [];
var enemies;
var level = 0;
var counter = 0;
var minEnemyVelocity = 10;
var maxEnemyVelocity = 60;
var playerSpeed = 200;
var numberOfLives = 3;
function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    
    //  The hero!
	// add the player as a sprite
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.collideWorldBounds = true;
	// the bad guys
	
	// add the enemies as a group
	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;
	
	createEnemies();

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    liveText = game.add.text(game.world.width - 150, 10, 'Lives : 3', { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setUpBlam, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	aButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
	dButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

    
}

/*
	Create the enemies by adding them to the group in random positions
*/
function createEnemies()
{
	
	for(var i = 0; i < 5; i++)
	{
		// create enemies randomly between 10 to the width of the screen
		var bad = enemies.create(game.rnd.integerInRange(10,game.world.width-100),50,'ufo');
		// make sure the body can move
		bad.body.moves.true;
		// set the velocity of the body between a random range
		bad.body.velocity.y = game.rnd.integerInRange(minEnemyVelocity, maxEnemyVelocity);
	
	}
}

/*
	This function makes sure the explosion happens
*/
function setUpBlam (boom) {

    boom.anchor.x = 0.5;
    boom.anchor.y = 0.5;
    boom.animations.add('kaboom');

}


/*
	This should update the values of each of the objects
*/
function update() {

	
    //  Scroll the background
    starfield.tilePosition.y += 2;

    if (player.alive)
    {
		//  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);
		
		// change the direction of the player depending on the key pressed
		

        if (cursors.left.isDown || aButton.isDown)
        {
            player.body.velocity.x = -playerSpeed;

        }

		if (cursors.right.isDown || dButton.isDown)
        {
            player.body.velocity.x = playerSpeed;
        }
		// use the fireButton or space key to fire a bullet - call the
		// firebullet method
		if (fireButton.isDown || game.input.activePointer.isDown)
        {
            fireBullet();
        }
		



		// determine if another wave of enemies should appear
        if (game.time.now > waveTimer)
        {
			// create another way
            createNextWave();
			// use your counter to determine if things should get faster`
			counter++;
			if(counter % 5)
			{
				// increase the speed of the enemy velocities
				// and the player speed
				minEnemyVelocity+=10;
				
			}
        }

		// determine if an enemy has gone out of bounds. If so, kill the player
		checkEnemiesOutOfBounds();
        
	    //  Run collision	
		game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
		game.physics.arcade.overlap(enemies, player, enemyHitsPlayer, null, this);
    }

}

/*
	Check each of the enemies on the screen to see if any of them them have fallen
	off the bottom of the screen
	if so, then kill the enemy and the player
*/
function checkEnemiesOutOfBounds()
{
	livingEnemies.length=0;

    enemies.forEachAlive(function(bad){

        
        livingEnemies.push(bad);
    });
	
	for(var i = 0; i < livingEnemies.length; i++)
	{
		if(livingEnemies[i].body.y > game.world.height)
		{
			livingEnemies[i].kill();
			killPlayer();
		}
		
	}
}
function render() {

}

/*
	Check to see if the bullet killed a bad guy
*/
function collisionHandler (bullet, bad) {

    //  When a bullet hits an enemy we kill them both
    bullet.kill();
    bad.kill();

    
    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bad.body.x, bad.body.y);
    explosion.play('kaboom', 30, false, true);

	// increase the score
	score = score + 10;
    // set the score
    scoreText.text = scoreString + score;

    
}

/*
	If the enemy hits a player, kill them both
*/
function enemyHitsPlayer (player,bad) {
 
    bad.kill();
	killPlayer();

}

/*
	Kill a player function where you decrease the number of lives in the text
	create an explosion
	and if there are no more lives, start over
*/
function killPlayer()
{
numberOfLives-=1;
liveText.text = "Lives: " + numberOfLives;
live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
}

// this method creates more enemies and updates the wave timer
function createNextWave () {
	createEnemies();
    waveTimer = game.time.now + 5000;
}

// this method fires the bullet
function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
			if(score > 0)
				score -= 1;
			scoreText.text = scoreString + score;
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

// this just kills the bullet
function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

// this function restarts everything
function restart () {
	
	// reset the lives and set the text
	numberOfLives = 3;
	// reset the speed of the player
	player = 200;
	// reset the min enemy velocity
    minEnemyVelocity = 10;
	// reset the max enemy velocity
	maxEnemyVelocity = 60;
	// reset the counter
	counter = 0;
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    enemies.removeAll();
    createEnemies();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;
/*
  Ways to enhance
  1. After a certain score, you get an extra life
  2. Speed up the enemies after a certain timeline
  3. Add music
  4. Change the background
  5. Add a boss
  6. Add a high score
  
*/
}