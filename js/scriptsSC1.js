var width = window.innerWidth;
var height = window.innerHeight;
var viewAngle = 45;
var nearClipping = 0.1;
var farClipping = 2000;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( viewAngle, width / height, nearClipping, farClipping );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );



var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.x = -2;
cube.position.z = -5;
scene.add(cube);

const texture = new THREE.TextureLoader().load( '../assets/img/textures/grass_texture.jpg' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// immediately use the texture for material creation

var coneGeometry = new THREE.ConeGeometry( 0.5, 1, 4 );
var coneMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cone = new THREE.Mesh( coneGeometry, coneMaterial);
cone.position.z = -5;
scene.add(cone);

var textureLoader = new THREE.TextureLoader();
textureLoader.load("../assets/img/textures/grass_texture.jpg", texture => {
  var sphereGeometry = new THREE.SphereGeometry( 0.5, 8, 8 );
  var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff, bumpMap: texture, bumpScale: 1.0 } );
  var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.z = -5;
  sphere.position.x = 2;
  scene.add(sphere);
  },
);


var light = new THREE.PointLight(0xFFFFFF);
light.position.x = 0;
light.position.y = 10;
light.position.z = 0;
scene.add(light);

var lightAngle = 0;



function animate() {
  lightAngle += 1;
  if (lightAngle > 360) { lightAngle = 0;};
  light.position.x = 5 * Math.cos(lightAngle * Math.PI / 180);
  light.position.z = 5 * Math.sin(lightAngle * Math.PI / 180);
  requestAnimationFrame( animate );
  renderer.render( scene, camera ); 
}

animate();


camera.position.z = 10;
var controls = new THREE.OrbitControls( camera, renderer.domElement );
