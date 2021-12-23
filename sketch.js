//declaración de variables.
var database;
var position;
var formulario;
var player;
var game;
var canvas;
var gameState = 0;
var playerCount;
var allPlayers;
var distance =0;
var car1, car2, car3, car4, cars;
var track;
var ground;
var car1Img, car2Img, car3Img, car4Img;

function preload(){
  //precarga todas las imágenes.

track = loadImage("images/track.jpg");
ground = loadImage("images/ground.png");
car1Img = loadImage("images/car1.png");
car2Img = loadImage("images/car2.png");
car3Img = loadImage("images/car3.png");
car4Img = loadImage("images/car4.png");

}

function setup(){
  //se adapta el juego al display del jugador
 canvas = createCanvas(displayWidth - 20, displayHeight-30);
 database = firebase.database();
 //crea el gameState y lo inicia
 game = new Game();
 game.getState();
 game.start();

}

function draw(){
  //espera a que se unan los 4 juadores para cambiar el 
  //gameState de start a play
  if(playerCount === 4){
    game.update(1);

  }
  if(gameState === 1){
      //cambia el gameState a play
      clear();
      game.play();
      
  }

  if(gameState === 2){
    //cambia el gameState a end
    game.end();
  }
}
