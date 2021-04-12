const terrain = document.getElementById('area');
const player = document.getElementById('player');
const ball = document.getElementById('ball');
var borders = terrain.getBoundingClientRect();
console.log('Border',borders.top, borders.right, borders.bottom, borders.left);


player.posX = (borders.right + borders.left - (player.getBoundingClientRect().right + player.getBoundingClientRect().left)) / 2;
player.posY = borders.bottom - player.getBoundingClientRect().bottom - 50;
player.style.transform = `translate(${player.posX}px, ${player.posY}px)`;
player.speed = 30;

ball.posX = (borders.right + borders.left - (ball.getBoundingClientRect().right + ball.getBoundingClientRect().left)) / 2;
ball.posY = (borders.bottom + borders.top - (ball.getBoundingClientRect().bottom + ball.getBoundingClientRect().top)) / 2;
ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
ball.speed = 0.1;
ball.angle = Math.random() * 2 * Math.PI;


var score = 1;
var horizontalSpeed = 0;



var brickColumnCount = 4;
var brickRowCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 3;
var brickOffsetLeft = (borders.right + borders.left)/2 - (brickColumnCount/2)*brickWidth;
var brickOffsetTop = 30 + borders.top ;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, element: null };
    }
}

function addElement (c,r) {
  var newDiv = document.createElement("div");
  newDiv.classList.add('brick');
  terrain.appendChild(newDiv);
  bricks[c][r].element = newDiv;
  bricks[c][r].x -= ((newDiv.getBoundingClientRect().right + newDiv.getBoundingClientRect().left) / 2);
  bricks[c][r].y -= ((newDiv.getBoundingClientRect().top + newDiv.getBoundingClientRect().bottom) / 2);
  newDiv.style.transform = `translate(${bricks[c][r].x}px, ${bricks[c][r].y}px)`;
}


function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
              var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              addElement (c,r);
          }
      }
  }
}

drawBricks();

const timerInterval = 110;
const keys = [37, 39];
var key = 0, timerId = 0;
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
      horizontalSpeed = -1;
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
      horizontalSpeed = 1;
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

$(document).keydown(function(e){
  if (!timerId && keys.includes(e.which)) {
    key = e.which;
    timerId = setInterval(moveObject, timerInterval);
    moveObject();
  }
});

$(document).keyup(function(e){
  if (timerId && (e.which === key)) {
    key = 0;
    clearInterval(timerId);
    timerId = 0;
  }
});



function moveObject() {
  switch (key){
    case 37:    //left arrow key
        moveLeft();
        break;
    /*case 38:    //up arrow key
        moveUp();
        break;*/
    case 39:    //right arrow key
        moveRight();
        break;
    /*case 40:    //bottom arrow key
        moveDown();
        break;*/
    }
    player.style.transform = `translate(${player.posX}px, ${player.posY}px)`;
}

function isInsidePlayer(pointX,pointY){
  var playerBound = player.getBoundingClientRect();
  if(pointY > playerBound.top && pointY < playerBound.bottom && pointX < playerBound.right && pointX > playerBound.left){
    console.log('Inside player');
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
	
	//if(needRebound(ballBound.right, ((ballBound.top+ballBound.bottom)/2)) && (ball.angle < Math.PI/2 || ball.angle > 3*Math.PI/2)){
  if((ballBound.right > borders.right || isInsidePlayer(ballBound.right, ((ballBound.top+ballBound.bottom)/2))) && (ball.angle < Math.PI/2 || ball.angle > 3*Math.PI/2)){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		if(ball.angle < Math.PI/2){
			ball.angle += 2*((Math.PI/2)-ball.angle);
		}
		else{
			ball.angle += 2*((3*Math.PI/2)-ball.angle);
		}
	}
	if((ballBound.bottom > borders.bottom || isInsidePlayer(((ballBound.right+ballBound.left)/2), ballBound.bottom)) && ball.angle < Math.PI){
  //else if(needRebound(((ballBound.right+ballBound.left)/2), ballBound.bottom) && ball.angle < Math.PI){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		ball.angle += 2*(Math.PI-ball.angle);
	}
  //else if(needRebound(((ballBound.right+ballBound.left)/2), ballBound.top) && ball.angle > Math.PI){
	if((ballBound.top < borders.top || isInsidePlayer(((ballBound.right+ballBound.left)/2), ballBound.top)) && ball.angle > Math.PI){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		ball.angle += 2*(Math.PI-ball.angle);
	}
  //else if(needRebound(ballBound.left, ((ballBound.top+ballBound.bottom)/2)) && (ball.angle > Math.PI/2 && ball.angle < 3*Math.PI/2)){
	if((ballBound.left < borders.left || isInsidePlayer(ballBound.left, ((ballBound.top+ballBound.bottom)/2))) && (ball.angle > Math.PI/2 && ball.angle < 3*Math.PI/2)){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		if(ball.angle < Math.PI){
			ball.angle += 2*((Math.PI/2)-ball.angle);
		}
		else{
			ball.angle += 2*((3*Math.PI/2)-ball.angle);
		}
	}
}



function update(progress) {
	//console.log("Progress: " + progress); 
	ball.posX += ball.speed * Math.cos(ball.angle) * progress;
	ball.posY += ball.speed * Math.sin(ball.angle) * progress * score;
	//console.log('A frame');
	checkRebound();

	ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
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


// Set global counter variable to verify event instances
var nCounter = 0;

// Set up event handler to produce text for the window focus event
window.addEventListener("focus", function(event) 
{ 
    console.log("window has focus " + nCounter); 
    nCounter = nCounter + 1;
    running = true;
}, false);

// Example of the blur event as opposed to focus
window.addEventListener("blur", function(event)
{ 
  console.log("window lost focus");
  running = false;
}, false);

