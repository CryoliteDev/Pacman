import { LEVEL, OBJECT_TYPE } from "./basics";
import { randomMovement } from "./ghostMoves";

// Classes
import GameBoard from "./GameBoard";
import Pacman from "./Pacman";
import Ghost from "./Ghosts";

// DOM Elements
const gameGrid = document.querySelector("#game");
const scoreTable = document.querySelector("#score");
const startButton = document.querySelector("#start-button");
const instructionButton = document.querySelector("#instructions-button");

// Sounds
import soundDot from "./sounds/munch.wav";
import soundPill from "./sounds/pill.wav";
import soundGameStart from "./sounds/game_start.wav";
import soundGameOver from "./sounds/death.wav";
import soundGhost from "./sounds/eat_ghost.wav";

// Game constants
const POWER_PILL_TIME = 10000; // MILLISECONDS
const GLOBAL_SPEED = 80; //MILISECONDS (for game loop)
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

// --- AUDIO --- //
function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

function gameOver(pacman, grid) {
  playAudio(soundGameOver);
  document.removeEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  gameBoard.showGameStatus(gameWin);
  clearInterval(timer);

  startButton.classList.remove("hide");
  instructionButton.classList.remove("hide");
}
/**
 * Checks if the pacman and the ghost
 * have come in to contact or not
 */
function checkCollision(pacman, ghosts) {
  const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhost) {
    if (pacman.powerPill) {
      playAudio(soundGhost);
      gameBoard.removeObject(collidedGhost.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name,
      ]);

      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
    }
  }
}

function gameLoop(pacman, ghosts) {
  // console.log("testing game loop");
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts);

  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  checkCollision(pacman, ghosts);

  // if pacman eats a dot
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
    playAudio(soundDot);
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    gameBoard.dotCount--;
    score += 10;
  }

  //if pacmman eats powerpill
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
    playAudio(soundPill);
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
    pacman.powerPill = true;
    score += 50;

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(
      () => (pacman.powerPill = false),
      POWER_PILL_TIME
    );
  }

  //change ghost scare mode
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }

  //if all dots are eaten
  if (gameBoard.dotCount === 0) {
    gameWin = true;
    gameOver(pacman, gameGrid);
  }

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

function startGame() {
  playAudio(soundGameStart);
  gameWin = false;
  powerPillActive = false;
  score = 0;

  startButton.classList.add("hide");
  instructionButton.classList.add("hide");

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);

  document.addEventListener("keydown", (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
  );

  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE),
  ];

  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize game
startButton.addEventListener("click", startGame);

instructionButton.addEventListener("click", getInstructions);
