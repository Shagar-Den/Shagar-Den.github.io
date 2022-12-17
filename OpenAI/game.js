// définition des dimensions de la zone de jeu
const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;

// définition de la vitesse de déplacement du personnage
const PLAYER_SPEED = 20;

// création de l'objet du personnage
const player = {
  x: 40,
  y: 40,
  width: 32,
  height: 32,
  speed: PLAYER_SPEED
};

// création de l'objet du obstacle
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

// chargement de l'image du personnage
const playerSprite = new Image();
playerSprite.src = "player.png";

// chargement de l'image du fond
const backgroundImage = new Image();
backgroundImage.src = "background.png";

// récupération de l'élément canvas de la page
const canvas = document.querySelector("#gameCanvas");

// récupération du contexte de dessin de l'élément canvas
const context = canvas.getContext("2d");


playerSprite.onload = function() {
  player.width = playerSprite.naturalWidth;
  player.height = playerSprite.naturalHeight;
};


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


// checks if the player is colliding with the background image
function isColliding(player,obstacles) {
  for (const obstacle of obstacles) {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.height + player.y > obstacle.y) {
      return true;
    }
  }
  return false;
}

// gestion des entrées de l'utilisateur
document.addEventListener("keydown", event => {
  // conversion de la valeur de la propriété key en minuscules
  const key = event.key.toLowerCase();
  const playerX = player.x;
  const playerY = player.y;

  switch (key) {
    case "arrowleft":
      player.x -= player.speed;
      break;
    case "arrowup":
      player.y -= player.speed;
      break;
    case "arrowright":
      player.x += player.speed;
      break;
    case "arrowdown":
      player.y += player.speed;
      break;
  }

  // check if the player is colliding with the background image
  if (isColliding(player,obstacles)) {
    // if the player is colliding, set the player position to its previous position to prevent it from moving through the obstacle
    player.x = playerX;
    player.y = playerY;
  }
});


// création de la fonction de mise à jour du jeu
function update() {
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

  // dessin du personnage à sa position actuelle
  context.drawImage(playerSprite, player.x, player.y);

  // annulation du décalage de la caméra
  context.translate(camera.x, camera.y);

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
