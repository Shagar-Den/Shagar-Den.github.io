
//Set all variables

var w = window.innerWidth;
var h = window.innerHeight;
var wRef = 2560; 


var scoreCount = 50000;
var Timer = 0;
var bestScore = 0;
var hasWon = false;
var maxSpeed = 0.6;

const terrain = document.getElementById('area');
const tableB = document.getElementById('table');
const player = document.getElementById('player');
const ball = document.getElementById('ball');
var scoreText = document.getElementById('scoreNum');
var borders = terrain.getBoundingClientRect();
//console.log('Border',borders.top, borders.right, borders.bottom, borders.left);


player.posX = (borders.right + borders.left - (player.getBoundingClientRect().right + player.getBoundingClientRect().left)) / 2;
player.posY = borders.bottom - player.getBoundingClientRect().bottom - 50;
var refPosY = borders.bottom - player.posY;
var deltaAcceptable = 5;

player.initPosX = player.posX;
player.initPosY = player.posY;
/*player.style.transform = `translate(${player.posX}px, ${player.posY}px)`;
player.speed = 5;
player.speedGain = 0.2;*/

ball.posX = (borders.right + borders.left - (ball.getBoundingClientRect().right + ball.getBoundingClientRect().left)) / 2;
ball.posY = ((borders.bottom + borders.top)*1.5 - (ball.getBoundingClientRect().bottom + ball.getBoundingClientRect().top)) / 2;
ball.initPosX = ball.posX;
ball.initPosY = ball.posY;
/*ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
ball.speed = 0.3;
ball.angle = Math.random() * 2 * Math.PI;
ball.vx = ball.speed * Math.cos(ball.angle);
ball.vy = ball.speed * Math.sin(ball.angle);*/

var score; //speed coef value (initialise value in init)
var scoreForText = 0; //score show on screen (total bricks broken)
var scoreGain = 0.01; //speed coef increasing delta value
var running = true; //To see if window has focus each game loop


//Set up the bricks count (rows, colomn, min value of playing area...)
var brickColumnCount = 14;
var brickRowCount = 6;
var brickWidth = 75;
var brickHeight = 20;
var brickHorizontalPadding = 3;
var brickVerticalPadding = 30;
var brickOffsetLeft = (borders.right + borders.left)/2 - (brickColumnCount/2)*brickWidth;
var brickOffsetTop = 30 + borders.top ;


terrain.style.minWidth = `${brickColumnCount*(brickWidth+brickHorizontalPadding) + 2*brickWidth}px`;
terrain.style.minHeight = `${brickRowCount*(brickHeight+brickVerticalPadding)*2}px`; 


var bricks = [];
var bNb = 0;

//Create the bricks
function addElement (c,r, container,nbColomn) {
  if(!(c==brickColumnCount && r%2==0))
  {
    var newDiv = document.createElement("div");
    container.appendChild(newDiv);
    newDiv.classList.add('brick');
    newDiv.style.width = `${100/(nbColomn+1)}%`;
    bricks[bNb] = {active : true};
    bNb++
  }
  
}

//Draw bricks on screen (create them on first run and change their value on restart)
function drawBricks() {
  var bricksElem = document.getElementsByClassName("brick");
  if(bricksElem.length === 0){
	  for(var r=0; r<brickRowCount; r++) {
		//create a div brick-table-row and change var nb of colomn 1 out of 2 row
		var newDiv = document.createElement("div");
		tableB.appendChild(newDiv);
		newDiv.classList.add('bricks-table-row');
		newDiv.style.width = '80%';
		newDiv.style.height = `${50/(brickRowCount+1)}%`;
		var nbColomn = r%2 ? brickColumnCount : brickColumnCount+1;
		for(var c=0; c<nbColomn; c++) {
				addElement (c,r, newDiv,nbColomn);
		  }
	  }
  }
  else{
	  for (var i = 0, len = bricksElem.length; i < len; i++) {
		  bricksElem[i].style.backgroundColor = '222222';
        bricks[i].active = true;
	  }
  }
  
}


//Initialize the board. Regroup the few steps needed each time
function init(){	

  score = 1;

  player.style.transform = `translate(${player.initPosX}px, ${player.initPosY}px)`;
	player.speed = 5;
	player.speedGain = 0.2;
	
	ball.style.transform = `translate(${ball.initPosX}px, ${ball.initPosY}px)`;
	ball.speed = 0.3;
	ball.angle = Math.random() * 2 * Math.PI;
	ball.vx = ball.speed * Math.cos(ball.angle);
	ball.vy = ball.speed * Math.sin(ball.angle);


	drawBricks();
	Timer = Date.now();
	hasWon = false;
}

//Run initialization on first time.
init();

//Show the win panel with score, time and previous best if needed
function winAct(){
	hasWon = true;
	var finalTime = Math.floor((Date.now() - Timer)/1000);
	var finalScore = Math.floor(scoreCount/finalTime);
	if(finalScore > bestScore){
		bestScore = finalScore;
		document.getElementById('resultScore').textContent = "Score: " + finalScore.toString();
		document.getElementById('trackScore').textContent = "New best!"
	}
	else{
		document.getElementById('resultScore').textContent = "Score: " + finalScore.toString();
		document.getElementById('trackScore').textContent = "Best score: " + bestScore.toString();
	}
	
	document.getElementById('resultTime').textContent = "Your time: " + finalTime.toString() + " sec.";
	
	document.getElementById('winPanel').classList.remove('off');
}


//Restart the game when pressing restart button
document.getElementById("buttonRestart").addEventListener("click", function() {
	document.getElementById('winPanel').classList.add('off');
	
	init();
});



//-------Player movement, to stay on the same Y value and to not go off area----------

function moveLeft(){
  var playerBound = player.getBoundingClientRect();
  var currentBorders = terrain.getBoundingClientRect();
  if(playerBound.left>currentBorders.left){
      if(playerBound.left - player.speed<currentBorders.left){
        player.posX -= playerBound.left-currentBorders.left;
      }
      else{
        player.posX -= player.speed;
      }
  }
}

function moveRight(){
  var playerBound = player.getBoundingClientRect();
  var currentBorders = terrain.getBoundingClientRect();
  if(playerBound.right<currentBorders.right){
      if(playerBound.right + player.speed>currentBorders.right){
        player.posX += currentBorders.right - playerBound.right;
      }
      else{
        player.posX += player.speed;
      }
  }
}


function movePlayer() {
  
  if (pressedKeys[37] && !pressedKeys[39] ){
    moveLeft();
  }    //left arrow key only
  else if (pressedKeys[39] && !pressedKeys[37] ){
    moveRight();
  }   //right arrow key only

  var deltaP = terrain.getBoundingClientRect().bottom - player.posY;
  if(deltaP > refPosY+deltaAcceptable || deltaP < refPosY-deltaAcceptable){
    player.posY += deltaP-refPosY;
  }


  player.style.transform = `translate(${player.posX}px, ${player.posY}px)`;
}

//---------------------------------------------------------------------------

//Loop through all active bricks to see if ball is touching, and hide the brick + increase correspondent value if needed
function touchBrick(){
	var ballBound = ball.getBoundingClientRect();
	var bricksElem = document.getElementsByClassName("brick");
	for (var i = 0, len = bricksElem.length; i < len; i++) {
    if(bricks[i].active){
      var toRemove = false;
      if(isInsideElement(ballBound.right, ((ballBound.top+ballBound.bottom)/2),bricksElem[i]) && ball.vx > 0){
        ball.vx *= -1;
        toRemove = true;
      }
      if(isInsideElement(((ballBound.right+ballBound.left)/2), ballBound.bottom, bricksElem[i]) && ball.vy > 0){
        ball.vy *= -1;
        toRemove = true;
      }
      if(isInsideElement(((ballBound.right+ballBound.left)/2), ballBound.top, bricksElem[i]) && ball.vy < 0){
        ball.vy *= -1;
        toRemove = true;
      }
      if(isInsideElement(ballBound.left, ((ballBound.top+ballBound.bottom)/2), bricksElem[i]) && ball.vx < 0){
        ball.vx *= -1;
        toRemove = true;
      }
      if(toRemove){
        bricksElem[i].style.backgroundColor = 'eeeeee';
        score += scoreGain;
        player.speed += player.speedGain;
        ++scoreForText;
        scoreText.textContent = `${scoreForText}`;
        bricks[i].active = false;
      }
    }	
	}
}


// check if there are still active bricks on the board (if not we won)
function hasActiveBricks(){
	var activeFound = false;
	var bricksElem = document.getElementsByClassName("brick");
	for (var i = 0, len = bricksElem.length; i < len; i++) {
		if(bricks[i].active && !activeFound){
			activeFound = true;
		}
	}
	return activeFound;
}

// check if ball touch the player bar, in that case, make the ball rebound with a determined angle (depend on the touching point)
function isInsidePlayer(pointX,pointY){
  var inside = isInsideElement(pointX,pointY,player);
  if(inside){
    var playerB = player.getBoundingClientRect();
    var coef = (pointX - (playerB.right+playerB.left)/2)/((playerB.right-playerB.left)/2);
    var signCoef = (coef/Math.abs(coef));
    coef = Math.min(Math.abs(coef),0.95);

    var vectorSpeedSqrd = ball.vx * ball.vx + ball.vy * ball.vy;

    ball.vx = signCoef * Math.sqrt(coef * vectorSpeedSqrd);
    ball.vy = Math.sqrt((1-coef) * vectorSpeedSqrd);
  }
  return inside;
}


// function to check if ball point inside an object (player or brick) 
function isInsideElement(pointX,pointY,thing){
  var thingBound = thing.getBoundingClientRect();
  if(pointY > thingBound.top && pointY < thingBound.bottom && pointX < thingBound.right && pointX > thingBound.left){
    return true;
  }
  else{
    return false;
  }
}

// to check if ball point is outside of the area borders
function isOutsideBox(pointX,pointY){
  var borders = terrain.getBoundingClientRect();
  if(pointY > borders.bottom || pointY < borders.top || pointX < borders.left || pointX > borders.right){
    console.log('Outside box');
    return true;
  }
  return false;
}

// check if ball bounce onto something and act accordingly (bricks behaviour is treated separatly as we need to loop through all and do other actions in case of touch)
function checkRebound(){
	var borders = terrain.getBoundingClientRect();
	var ballBound = ball.getBoundingClientRect();

	if((ballBound.bottom > borders.bottom || isInsidePlayer(((ballBound.right+ballBound.left)/2), ballBound.bottom)) && ball.vy > 0){
		ball.vy *= -1;
	}
	if((ballBound.right > borders.right || isInsidePlayer(ballBound.right, ((ballBound.top+ballBound.bottom)/2))) && ball.vx > 0){
		ball.vx *= -1;
	}
	if((ballBound.top < borders.top || isInsidePlayer(((ballBound.right+ballBound.left)/2), ballBound.top)) && ball.vy < 0){
		ball.vy *= -1;
	}
	if((ballBound.left < borders.left || isInsidePlayer(ballBound.left, ((ballBound.top+ballBound.bottom)/2))) && ball.vx < 0){
		ball.vx *= -1;
	}
	
	touchBrick();
}

// Active game loop, progress is the delta-t since last loop, is makes the ball move at the same speed over time.
function update(progress) {
	checkRebound();

  var totalSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * score;
  //console.log(totalSpeed);
  var coefX = (ball.vx * score)/totalSpeed;
  var coefY = (ball.vy * score)/totalSpeed;
  totalSpeed = Math.min(totalSpeed, maxSpeed); //security check, to not overspeeding even if we decided to go crazy on score coef.

  ball.posX += coefX * totalSpeed * progress;
	ball.posY += coefY * totalSpeed * progress;

	ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;

  movePlayer();

  if(!hasActiveBricks() && !hasWon){ //check if there are no active bricks and if have not won yet
		winAct();
	}
}

// Game loop, always run even if window is not focused. Call the active game loop only when window is focused
function loop(timestamp) {
  var progress = timestamp - lastRender

  if(running){
    update(progress);
  }

  lastRender = timestamp
  window.requestAnimationFrame(loop) // call next loop on frame
}

//Start the game loop
var lastRender = 0
window.requestAnimationFrame(loop)

//Get key pressed input
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

// Set up event handler to run update for the window focus event, we can continue the game (ball and player movement)
window.addEventListener("focus", function(event) 
{ 
    running = true;
}, false);

// Blur event, opposed to focus (stop update when window not focused)
window.addEventListener("blur", function(event)
{ 
  running = false;
}, false);

