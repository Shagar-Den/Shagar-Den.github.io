// définition des dimensions de la zone de jeu
const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;

// définition de la vitesse de déplacement du personnage
const PLAYER_SPEED = 5;

// création de l'objet du personnage
const player = {
  x: 40,
  y: 40,
  width: 16,
  height: 24,
  speed: PLAYER_SPEED
};

// création de l'objet des obstacles
const obstacles = [
  { x: 0, y: 0, width: 32, height: 32 },
  { x: 200, y: 200, width: 32, height: 32 },
  { x: -200, y: -200, width: 32, height: 32 }
  ];

// création de l'objet de la caméra
const camera = {
  x: 0,
  y: 0,
  width: GAME_WIDTH,
  height: GAME_HEIGHT
};

let currentFrameX = 0;
let currentAnim = 0; //0: idle | 1: run

let frameCounter = 0;
const frameThreshold = 10; // change this value to adjust the frame rate

let facingRight = true;

// chargement de l'image du personnage
const playerSpriteSheet = new Image();
playerSpriteSheet.src = "player.png";

// chargement de l'image du fond
const backgroundImage = new Image();
backgroundImage.src = "background.png";

// récupération de l'élément canvas de la page
const canvas = document.querySelector("#gameCanvas");

// récupération du contexte de dessin de l'élément canvas
const context = canvas.getContext("2d");

/*
playerSprite.onload = function() {
  player.width = playerSprite.naturalWidth;
  player.height = playerSprite.naturalHeight;
};
*/

backgroundImage.onload = function() {
  for (const obstacle of obstacles) {
    obstacle.width = backgroundImage.naturalWidth;
    obstacle.height = backgroundImage.naturalHeight;
  }
};


// vérification de la prise en charge de requestAnimationFrame
let requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

// si requestAnimationFrame n'est pas pris en charge, utilisation de setTimeout comme substitution
if (!requestAnimationFrame) {
  requestAnimationFrame = function(callback) {
    setTimeout(callback, 1000 / 60);
  };
}


// checks if the player is colliding with obstacles
function isColliding(player,obstacles) {
  for (const obstacle of obstacles) {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.height + player.y > obstacle.y) {
      //console.log(`Collision detected! Player position: (${player.x}, ${player.y}). Obstacle position: (${obstacle.x}, ${obstacle.y}).`);
      return true;
    }
  }
  return false;
}

let leftKeyDown = false;
let upKeyDown = false;
let rightKeyDown = false;
let downKeyDown = false;

// gestion des entrées de l'utilisateur
document.addEventListener("keydown", event => {
  // conversion de la valeur de la propriété key en minuscules
  const key = event.key.toLowerCase();

  switch (key) {
    case "arrowleft":
      leftKeyDown = true;
      break;
    case "arrowup":
      upKeyDown = true;
      break;
    case "arrowright":
      rightKeyDown = true;
      break;
    case "arrowdown":
      downKeyDown = true;
      break;
  }
});

document.addEventListener("keyup", event => {
  // conversion de la valeur de la propriété key en minuscules
  const key = event.key.toLowerCase();

  switch (key) {
    case "arrowleft":
      leftKeyDown = false;
      break;
    case "arrowup":
      upKeyDown = false;
      break;
    case "arrowright":
      rightKeyDown = false;
      break;
    case "arrowdown":
      downKeyDown = false;
      break;
  }
});


// création de la fonction de mise à jour du jeu
function update() {
  let playerX = player.x;
  let playerY = player.y;

  if (leftKeyDown) {
    player.x -= player.speed;
  }
  if (upKeyDown) {
    player.y -= player.speed;
  }
  if (rightKeyDown) {
    player.x += player.speed;
  }
  if (downKeyDown) {
    player.y += player.speed;
  }

  // check if the player is colliding with the background image
  if (isColliding(player,obstacles)) {
    // if the player is colliding, reset the player position
    player.x = playerX;
    player.y = playerY;
  }

  // mise à jour de la position de la caméra en fonction de la position du personnage
  camera.x = player.x - camera.width / 2;
  camera.y = player.y - camera.height / 2;
}

// création de la fonction de rendu du jeu
function render() {
  // décalage de la caméra
  context.translate(-camera.x, -camera.y);

  for (const obstacle of obstacles) {
    // dessin du fond à l'arrière-plan
    context.drawImage(backgroundImage, obstacle.x, obstacle.y);
  }


  // determine the animation and frame to draw based on the direction the player character is facing

  if(!leftKeyDown && !rightKeyDown && !upKeyDown && !downKeyDown){
    currentAnim = 0;
  }
  else{
    currentAnim = 1;
  }

  let xPos = player.x;

  if(rightKeyDown && !facingRight){
    facingRight = true;
  }
  else if (leftKeyDown && facingRight){
    facingRight = false;
  }

  if (!facingRight) {
    // if the player character is moving to the left, horizontally flip the sprite sheet by turning back the screen, drawing then turning it back again
    context.scale(-1, 1);
    xPos = -xPos-player.width;
  }

  // dessin du personnage à sa position actuelle
  context.drawImage(playerSpriteSheet, 
    currentFrameX * player.width, // the x-coordinate of the top-left corner of the frame on the sprite sheet
    (currentAnim+1) * player.height, // the y-coordinate of the top-left corner of the frame on the sprite sheet
    player.width, // the width of the frame on the sprite sheet
    player.height, // the height of the frame on the sprite sheet
    xPos, 
    player.y, // the y-coordinate of the top-left corner of the frame on the canvas
    player.width, // the width of the frame on the canvas
    player.height // the height of the frame on the canvas
    );

  if (!facingRight) {
    // if the player character is moving to the left, change the scale back after drawing. See the similar code above to understand.
    context.scale(-1, 1);
  }

  // annulation du décalage de la caméra
  context.translate(camera.x, camera.y);


  frameCounter = frameCounter + 1;

  if(frameCounter>=frameThreshold){
    frameCounter = 0;
    currentFrameX = (currentFrameX + 1) % 4;
  }
}

// boucle principale du jeu
function mainLoop() {

  // mise à jour du jeu
  update();

  // effacement de l'écran
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // rendu du jeu
  render();

  // demande de rafraîchissement de la frame suivante
  requestAnimationFrame(mainLoop);
}

// démarrage de la boucle principale du jeu
requestAnimationFrame(mainLoop);
