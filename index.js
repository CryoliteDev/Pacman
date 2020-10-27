import { LEVEL, OBJECT_TYPE } from './setup';

// Classes
import GameBoard from "./GameBoard"; 
import Pacman from "./Pacman";


// DOM Elements
const gameGrid = document.querySelector("#game");
const scoreTable = document.querySelector("#score");
const startButton = document.querySelector("#start-button");

// Game constants 
const POWER_PILL_TIME = 1000; // MILLISECONDS
const GLOBLA_SPEED = 80; //MILISECONDS (for game loop)
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function gameOver(pacman, grid) {

}

function checkCollision(pacman, ghosts) {
    
}

function gameLoop(pacman, ghosts) {
    
}

function startGame() {
    console.log("testing start btn");

    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add("hide");
    gameBoard.createGrid(LEVEL);
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
}

// Initialize game
startButton.addEventListener("click", startGame);