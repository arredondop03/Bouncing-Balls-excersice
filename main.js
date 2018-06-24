
//Setting up the canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// Getting a random number to create random values for each ball so they are not all the same
function random(min, max){
  var num = Math.floor(Math.random() * (max - min + 1) + min )
  return num;
}

//Constuctor function for balls

function Ball(x, y, velX, velY, color, size){
  this.x = x;
  this.y = y;
  this. velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//Drawing the balls. adding proterties to the prototype

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

//Making the ball move

Ball.prototype.update = function(){
  if(((this.x + this.size) >= width)){
    this.velX = -(this.velX)
  }

  if((this.x + this.size <= 0)){
    this.velX = -(this.velX)
  }

  if(((this.y + this.size) >= height)){
    this.velY = -(this.velY)
  }

  if((this.y + this.size <= 0)){
    this.velY = -(this.velY)
  }

  this.x += this.velX;
  this.y += this.velY;

}

//Change color of the balls when they colide with another one
// --- I dont understand how this works
Ball.prototype.collisionDetect = function(){
  for(var j = 0; j < balls.length; j++){
    if(!(this === balls[j])){
      var dx = this.x - balls[j].x; // --- What is dx and dy??
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.size + balls[j].size){
        balls[j].color = this.color = `rgb(${random(0,255)} , ${random(0,255)}, ${random(0,255)})`;
      }
    }
  }
}


//Storage for the balls that will be created bellow
var balls = [];


//creating random 24 balls
function loop(){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // ---I know is for transparency but I dont quite understand why that works
  ctx.fillRect(0,0,width,height); // ---Again! No idea why this has to do here!! Help :(

  while(balls.length < 25){
    var size = random(10,20);
    var ball = new Ball( 
      //---is it better to do it like this or to create the variables and then plug them in??
      //the following is to draw all the balls inside of the box with a min margin of the ball's size to 
      // avoid drawing errors
      random(0 + size, width - size), 
      random(0 + size, height - size),
      random(-4,4), //not all balls will go at the same speed??
      (-4,4),
      `rgb(${random(0,255)} , ${random(0,255)}, ${random(0,255)})`,
      // 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    
    balls.push(ball);
  }

  // --- is it ok to do this for loop, or should I do a forEach???
  // --- why cant I just put 25?
  // draw and update each ball created
  for(var i = 0; i < balls.length; i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop); // --- I didnt quite understand this :(

}

loop();








