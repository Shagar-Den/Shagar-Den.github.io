

const terrain = document.getElementById('area');
const player = document.getElementById('player');
const ball = document.getElementById('ball');
player.posX = 0;
player.posY = 0;
player.speed = 30;

ball.posX = 0;
ball.posY = 0;
ball.speed = 20;
ball.angle = Math.random * 360;

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

function update(progress) {
	
	
	
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



