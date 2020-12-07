import { GAMEBOARD, OBJECT_TYPE } from "./basics";
import { randomMovement } from "./Ghosts";

//Classes
import GameBoard from "./GameBoard";
import Pacman from "./Pacman";
import Ghost from "./Ghosts";

// Sounds
import soundDot from "./sounds/munch.wav";
import soundPill from "./sounds/pill.wav";
import soundGameStart from "./sounds/game_start.wav";
import soundGameOver from "./sounds/death.wav";
import soundGhost from "./sounds/eat_ghost.wav";

//Dom elements
const gameGrid = document.querySelector("#game");
const scoreTable = document.querySelector("#score");
const startButton = document.querySelector("#start-button");
const instructionButton = document.querySelector("#instructions-button");

//Game constants
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; // speed for the gameloop, in ms
const gameBoard = GameBoard.createGameBoard(gameGrid, GAMEBOARD);

//Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

//function to play sound effects
function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

//function for when pacman dies
function gameOver(pacman) {
  playAudio(soundGameOver);

  //remove the event listener we created for controlling pacman
  document.removeEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist)
  );

  //show the game win screen
  gameBoard.showGameStatus(gameWin);

  //stop the game loops
  clearInterval(timer);

  //show the buttons again
  startButton.classList.remove("hide");
  instructionButton.classList.remove("hide");
}

//function for when pacman and a ghost run into each other
function checkCollision(pacman, ghosts) {
  //get the ghost pacman collided with
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  //if collided
  if (collidedGhost) {
    //if pacman has eaten a power pill he will eat the ghost
    if (pacman.powerPill) {
      playAudio(soundGhost);

      //so we remove the ghost from that position along with it's scared property so it resets, and remove the name
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name,
      ]);

      //reset the position so the ghost goes back to the lair
      collidedGhost.pos = collidedGhost.startPos;

      //give 100 points for eating the ghost
      score += 100;
    } else {
      //otherwise if the ghost isn't scared pacman dies and we remove him
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);

      //rotate the specific div back to neutral so it doesn't rotate any ghost that moves to that position
      gameBoard.rotateDiv(pacman.pos, 0);

      //call game over function
      gameOver(pacman, gameGrid);
    }
  }
}

//game loop handles the movement of characters, it executes everytime it completes it's interval
function gameLoop(pacman, ghosts) {
  //move pacman
  gameBoard.moveCharacter(pacman);

  //check and see if there is a collission after pacman moves
  checkCollision(pacman, ghosts);

  //move ghosts
  ghosts.forEach((ghost) => {
    gameBoard.moveCharacter(ghost);
  });

  //check if there's a collission after a ghost moves, checked twice because ghosts and pacman don't move in sync
  checkCollision(pacman, ghosts);

  //let pacman eat dots. first check to see if where pacman moves, there is a dot
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
    playAudio(soundDot);
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    gameBoard.dotCount--;

    //give 10 points for eating a dot
    score += 10;
  }

  //check if pacman eats a powerPill, if a powerpill exists at pacmans position
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
    playAudio(soundPill);

    //remove the powerpill
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    //set pacmans powerpill status as true and award him 50 points
    pacman.powerPill = true;
    score += 50;

    //clear the powerpill effect after ten seconds, first we clear out the old timer if we already have a powerpill active then set the timer
    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(
      () => (pacman.powerPill = false),
      POWER_PILL_TIME
    );
  }

  // Change ghosts into scared mode if powerpill eaten
  //if one is true the other is false
  if (pacman.powerPill !== powerPillActive) {
    //then we have powerpillactive status be what it's supposed to be, if powerpill is true then it's true etc
    powerPillActive = pacman.powerPill;

    //make each ghost scared depending on whether the powerpill is active or not
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }

  //Check if all dots have been eaten, if they have then the game is won and game over is called
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(pacman, ghosts);
  }

  //show score on scoreboard
  scoreTable.innerHTML = score;
}

function getInstructions() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("instructions-button");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

//function is ran when start button is pressed
function startGame() {
  playAudio(soundGameStart);

  //hide start and instructions button at start of game and reset previous values
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add("hide");
  instructionButton.classList.add("hide");

  //create the new game grid from the game board each time we start a new game
  gameBoard.createGrid(GAMEBOARD);

  //create pacman with a speed of two and put on the grid
  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);

  //add event listener for pacman so we can move him with our keyboard
  document.addEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist)
  );

  //create ghosts at different positions and different speeds
  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 209, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.CLYDE),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.PINKY),
  ];

  // Gameloop, start the interval that will run the game loop function, run gameLoop every 80ms
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

//Initialize game when button is pressed
startButton.addEventListener("click", startGame);

//display instructions when instructions button is pressed
instructionButton.addEventListener("click", getInstructions);
