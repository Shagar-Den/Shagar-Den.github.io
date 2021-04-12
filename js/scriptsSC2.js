
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							  
const terrain = document.getElementById('area');
const player = document.getElementById('player');
const ball = document.getElementById('ball');
var borders = terrain.getBoundingClientRect();
console.log('Border',borders.top, borders.right, borders.bottom, borders.left);

player.posX = 0;
player.posY = 0;
player.speed = 30;

ball.posX = 0;
ball.posY = 0;
ball.speed = 0.05;
ball.angle = Math.random() * 2 * Math.PI;

const timerInterval = 110, borderX = 500;// borderY = 100;
const keys = [37, 39];
var key = 0, timerId = 0;

function moveLeft(){
  if(player.posX>-borderX){
      player.posX -= player.speed;
  }
}

function moveRight(){
  if(player.posX<borderX){
      player.posX += player.speed;
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

function checkRebound(){
	
	var ballBound = ball.getBoundingClientRect();
	var playerBound = player.getBoundingClientRect();
	
	if(ballBound.right > borders.right && (ball.angle < Math.PI/2 || ball.angle > 3*Math.PI/2)){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		if(ball.angle < Math.PI/2){
			ball.angle += 2*((Math.PI/2)-ball.angle);
		}
		else{
			ball.angle += 2*((3*Math.PI/2)-ball.angle);
		}
	}
	if(ballBound.bottom > borders.bottom && ball.angle < Math.PI){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		ball.angle += 2*(Math.PI-ball.angle);
	}
	if(ballBound.top < borders.top && ball.angle > Math.PI){
		console.log('Ball',ballBound.top, ballBound.right, ballBound.bottom, ballBound.left)
		ball.angle += 2*(Math.PI-ball.angle);
	}
	if(ballBound.left < borders.left && (ball.angle > Math.PI/2 && ball.angle < 3*Math.PI/2)){
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
	
	ball.posX += ball.speed * Math.cos(ball.angle) * progress;
	ball.posY += ball.speed * Math.sin(ball.angle) * progress;
	//console.log('A frame');
	checkRebound();

	ball.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
}


function loop(timestamp) {
  var progress = timestamp - lastRender
  update(progress)

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)



