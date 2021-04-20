var w = window.innerWidth;
var h = window.innerHeight;
var wRef = 2560; 


var scoreCount = 50000;
var Timer = 0;
var bestScore = 0;
var hasWon = false;

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
player.style.transform = `translate(${player.posX}px, ${player.posY}px)`;
player.speed = 5 * w/wRef;
player.speedGain = 0.2;

ball.posX = (borders.right + borders.left - (ball.getBoundingClientRect().right + ball.getBoundingClientRect().left)) / 2;
ball.posY = ((borders.bottom + borders.top)*1.5 - (ball.getBoundingClientRect().bottom + ball.getBoundingClientRect().top)) / 2;
ball.initPosX = ball.posX;
ball.initPosY = ball.posY;
ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
ball.speed = 0.1 * w/wRef;
ball.angle = Math.random() * 2 * Math.PI;
ball.vx = ball.speed * Math.cos(ball.angle);
ball.vy = ball.speed * Math.sin(ball.angle);

var score = 1;
var scoreForText = 0;
var scoreGain = 0.005;
var horizontalSpeed = 0;
var speedIndiuced = 0.1;



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


function addElement (c,r, container,nbColomn) {
  if(!(c==brickColumnCount && r%2==0))
  {
    var newDiv = document.createElement("div");
    container.appendChild(newDiv);
    newDiv.classList.add('brick');
    newDiv.style.width = `${100/(nbColomn+1)}%`;
	//newDiv.style.
    //var x = (c*(brickWidth+brickHorizontalPadding))+brickOffsetLeft - ((newDiv.getBoundingClientRect().right + newDiv.getBoundingClientRect().left) / 2) - (r%2 * brickWidth/2);
    //var y = (r*(brickHeight+brickVerticalPadding))+brickOffsetTop -((newDiv.getBoundingClientRect().top + newDiv.getBoundingClientRect().bottom) / 2);
    bricks[bNb] = {active : true};
    bNb++
    //newDiv.style.transform = `translate(${x}px, ${y}px)`;
    //newDiv.style.transform = `translate(${x*100/brickWidth}%, ${y*100/brickHeight}%)`;
  }
  
}


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

//drawBricks();


function init(){	
	drawBricks();
	Timer = Date.now();
	hasWon = false;
}

init();


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

document.getElementById("buttonRestart").addEventListener("click", function() {
	document.getElementById('winPanel').classList.add('off');
	
	player.style.transform = `translate(${player.initPosX}px, ${player.initPosY}px)`;
	player.speed = 5 * w/wRef;
	player.speedGain = 0.2;
	
	ball.style.transform = `translate(${ball.initPosX}px, ${ball.initPosY}px)`;
	ball.speed = 0.1 * w/wRef;
	ball.angle = Math.random() * 2 * Math.PI;
	ball.vx = ball.speed * Math.cos(ball.angle);
	ball.vy = ball.speed * Math.sin(ball.angle);
	
	init();
});


var running = true;

function moveLeft(){
  var playerBound = player.getBoundingClientRect();
  if(playerBound.left>borders.left){
      if(playerBound.left - player.speed<borders.left){
        player.posX -= playerBound.left-borders.left;
      }
      else{
        player.posX -= player.speed;
      }
      horizontalSpeed = -ball.speed;
  }
}

function moveRight(){
  var playerBound = player.getBoundingClientRect();
  if(playerBound.right<borders.right){
      if(playerBound.right + player.speed>borders.right){
        player.posX += borders.right - playerBound.right;
      }
      else{
        player.posX += player.speed;
      }
      horizontalSpeed = ball.speed;
  }
}

/*function moveUp(){
  if(player.posY>borderY){
      player.posY -= player.speed;
  }
}

function moveDown(){
  if(player.posY<borderY){
      player.posY += player.speed;
  }
}*/




function movePlayer() {
  
  if (pressedKeys[37] && !pressedKeys[39] ){
    moveLeft();
  }    //left arrow key only
  else if (pressedKeys[39] && !pressedKeys[37] ){
    moveRight();
  }   //right arrow key only
  else{
    horizontalSpeed = 0;
  }

  var deltaP = terrain.getBoundingClientRect().bottom - player.posY;
  if(deltaP > refPosY+deltaAcceptable || deltaP < refPosY-deltaAcceptable){
    player.posY += deltaP-refPosY;
  }


  player.style.transform = `translate(${player.posX}px, ${player.posY}px)`;
}

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
        //--len;
        //--i;
        score += scoreGain;
        player.speed += player.speedGain;
        ++scoreForText;
        scoreText.textContent = `${scoreForText}`;
        bricks[i].active = false;
      }
    }	
	}
}

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

function isInsidePlayer(pointX,pointY){
  var inside = isInsideElement(pointX,pointY,player);
  if(inside){

    //Add player speed to ball
    //ball.vx += horizontalSpeed;

    //Add player indiuced fluctation to ball speed
    var playerB = player.getBoundingClientRect();
    var coef = (pointX - (playerB.right+playerB.left)/2)/((playerB.right-playerB.left)/2);
    coef = coef/Math.abs(coef) * Math.min(Math.abs(coef),0.95);
    //ball.vx += coef * speedIndiuced * score;
    var totalSpeed = Math.abs(ball.vx * h/w) + Math.abs(ball.vy * w/h);
    ball.vx = coef * totalSpeed * w/h;
    ball.vy = (1-coef) * totalSpeed * h/w;
  }
  return inside;
}

function isInsideElement(pointX,pointY,thing){
  var thingBound = thing.getBoundingClientRect();
  if(pointY > thingBound.top && pointY < thingBound.bottom && pointX < thingBound.right && pointX > thingBound.left){
    return true;
  }
  else{
    return false;
  }
}

function isOutsideBox(pointX,pointY){
  var borders = terrain.getBoundingClientRect();
  if(pointY > borders.bottom || pointY < borders.top || pointX < borders.left || pointX > borders.right){
    console.log('Outside box');
    return true;
  }
  return false;
}

function needRebound(pointX,pointY){
  return (isInsidePlayer(pointX,pointY) ||isOutsideBox(pointX,pointY));
}

function checkRebound(){
	var borders = terrain.getBoundingClientRect();
	var ballBound = ball.getBoundingClientRect();
	
	if((ballBound.right > borders.right || isInsidePlayer(ballBound.right, ((ballBound.top+ballBound.bottom)/2))) && ball.vx > 0){
		//console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		ball.vx *= -1;
	}
	if((ballBound.bottom > borders.bottom || isInsidePlayer(((ballBound.right+ballBound.left)/2), ballBound.bottom)) && ball.vy > 0){
		ball.vy *= -1;
	}
	if((ballBound.top < borders.top || isInsidePlayer(((ballBound.right+ballBound.left)/2), ballBound.top)) && ball.vy < 0){
		ball.vy *= -1;
	}
	if((ballBound.left < borders.left || isInsidePlayer(ballBound.left, ((ballBound.top+ballBound.bottom)/2))) && ball.vx < 0){
		ball.vx *= -1;
	}
	
	touchBrick();
	
	if(!hasActiveBricks() && !hasWon){
		winAct();
	}
}

/*
function checkBricksPlace(){
  var bricksElem = document.getElementsByClassName("brick");
	for (var i = 0, len = bricksElem.length; i < len; i++) {
    var x = (bricksElem[i].getBoundingClientRect().right + bricksElem[i].getBoundingClientRect().left) / 2;
    if(bricks[i].xOffset != x - (terrain.getBoundingClientRect().right + terrain.getBoundingClientRect().left)/2){
      var nx = (terrain.getBoundingClientRect().right + terrain.getBoundingClientRect().left)/2 + bricks[i].xOffset;
      var ny = (bricksElem[i].getBoundingClientRect().top + bricksElem[i].getBoundingClientRect().bottom) / 2;
      bricksElem[i].style.transform = `translate(${nx}px, ${ny}px)`;
    }
  }
}
*/


function update(progress) {
	checkRebound();

	ball.posX += (ball.vx/Math.abs(ball.vx)) * Math.min(Math.abs(ball.vx * progress * score),20);
	ball.posY += (ball.vy/Math.abs(ball.vy)) * Math.min(Math.abs(ball.vy * progress * score),20*h/w);

	ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;

  movePlayer();

  //checkBricksPlace();
}


function loop(timestamp) {
  var progress = timestamp - lastRender

  if(running){
    update(progress);
  }

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)


var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

// Set up event handler to run update for the window focus event
window.addEventListener("focus", function(event) 
{ 
    running = true;
}, false);

// Blur event, opposed to focus (stop update when window not focused)
window.addEventListener("blur", function(event)
{ 
  running = false;
}, false);

