var startGame = false;

var canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
var windowWidth = canvas.width;
var windowHeight = canvas.height;

$(document).ready(function($){
    $('button').on('click', function() {
        startGame = true;
        
    });
    windowResize();
});


function windowResize(){
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}
function draw()
{
    //This is outlining the canvas. 
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '5';
    ctx.strokeRect(0,0, window.innerWidth, window.innerHeight);



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

