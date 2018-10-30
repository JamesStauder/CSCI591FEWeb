
  var startGame = false;
  
  var enemyX = [],enemyY = [];
  var bulletX = [], bulletY = [];
  var addEnemyTick = 0;
  var ticksPerEnemy = 10;
  var playerX = 750, playerY = 550;
  var playerSpeed = 10;
  var playerWidth = 50;
  var bulletWidth = 5;
  var enemyWidth = 25;

  var canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');


  var windowWidth = canvas.width;
  var windowHeight = canvas.height;
  $(document).ready(function($){

  $('button').on('click', function() {
    startGame = true;
    setInterval(fallingEnemy,100);
    setInterval(draw,1000/60);
    this.disabled = true;
   });

  $('body').on('keypress', function (e) {
		var actualKeyCode = e.keyCode;               // Get the Unicode value
		var actualCharacter = String.fromCharCode(actualKeyCode);
		console.log(actualCharacter);
		console.log(e.keyCode);
		
		if(actualCharacter == "w")
		{
			playerY = Math.max(playerY-playerSpeed, 0);
		}
		else if(actualCharacter == "s")
		{
			playerY = Math.min(playerY+playerSpeed, windowHeight - playerWidth);
		}
		
		else if(actualKeyCode == 32)
		{
			 bulletX.push(playerX);
			 bulletY.push(playerY);
		}
	});
});
  
  function draw()
  {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillRect(playerX,playerY,playerWidth,playerWidth);
	  
	  for(var i = 0; i < enemyX.length; i++){
		ctx.fillRect(enemyX[i], enemyY[i], enemyWidth, enemyWidth);
         if(checkCollision(enemyX[i],enemyY[i],enemyWidth,enemyWidth,playerX,playerY,playerWidth,playerWidth))
         {
            //END THE GAME
         }
	  }
     
      for(var i = 0; i < bulletX.length; i++){
        ctx.fillRect(bulletX[i], bulletY[i], bulletWidth, bulletWidth);
      }
      fire();
  }
    
  function fallingEnemy()
  {
	for(var i = 0; i < enemyY.length; i++){
	
		var speed = 15;
		var distX = Math.abs((playerX - enemyX[i]));
		var distY = Math.abs((playerY - enemyY[i]));
		
		var xSpeed = speed;
		var ySpeed = speed * distY/(distY + distX);
		
		if ((playerY - enemyY[i]) < 0){
			ySpeed = -ySpeed;
		}
		enemyX[i] = enemyX[i] + xSpeed;
		enemyY[i] = enemyY[i] + ySpeed;

        if(enemyX[i] > windowWidth){
            enemyX.shift();
            enemyY.shift();
        }
	}
	addEnemyTick += 1;
	if(addEnemyTick == ticksPerEnemy){
		addEnemyTick = 0;
		enemyX.push(0);
		enemyY.push(Math.random() * (windowHeight - enemyWidth));
	}
	
	
  }
  
  function fire()
  {
      for(var i = 0; i < bulletX.length; i++){
         bulletX[i] = bulletX[i] -1;
         if(checkCollision(bulletX,bulletY,5,5,enemyX,enemyY,15,15))
         {
           //END THE ENEMY. 
         }
      }
     
  }
  


  
  // This performs simple rectangular collision detection
  function checkCollision(x1,y1,h1,w1,x2,y2,h2,w2)
  {
    
      if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2)
      {
        return true;  
      }
      else
      {
        return false;      
      }  
  }