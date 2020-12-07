import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./basics";

class GameBoard {
  constructor(DOMGrid) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }

  showGameStatus(gameWin) {
    // Create and show game win or game over
    const div = document.createElement("div");
    div.classList.add("game-status");
    div.innerHTML = `${gameWin ? "WIN!" : "GAME OVER!"}`;
    this.DOMGrid.appendChild(div);
  }

  //method to create grid, called every time game starts. grid is the array of objects and the value at that index is the object at that index
  createGrid(level) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = "";
    // First set correct amount of columns based on Grid Size and the size of each cell is based on Cell Size
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

    //loop through the gaemboard array, and create each element in the array
    level.forEach((square) => {
      const div = document.createElement("div");

      //check value of current element and match it to classlist to get what object it's supposed to be
      div.classList.add("square", CLASS_LIST[square]);
      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
      this.DOMGrid.appendChild(div);
      this.grid.push(div);

      // Add dots, keep track of the number of dots
      if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
    });
  }

  //takes the position and classes.
  addObject(pos, classes) {
    //where in the grid we want to apply/add these classes/objects
    this.grid[pos].classList.add(...classes);
  }

  removeObject(pos, classes) {
    //where in the grid we want to remove these classes/objects
    this.grid[pos].classList.remove(...classes);
  }

  // checks to make sure an object exists at that current position
  // Can have an arrow function here cause of this binding
  objectExist = (pos, object) => {
    return this.grid[pos].classList.contains(object);
  };

  //used to rotate pacman on the grid, rotates at postion by the specified amount of degrees
  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  //method to move characters
  moveCharacter(character) {
    //make sure the character is ready to move, using the characters should move method
    if (character.shouldMove()) {
      //from this gameboard class we pass in the objectexist method so it can be used in the pacman class. That method in the pacman/character class then returns the nextmovePos and direction. So the nextmovepos and direction here are gotten from using the return values of the character's getNextMove method.

      const { nextMovePos, direction } = character.getNextMove(
        this.objectExist
      );

      //do the same thing here with the characters makeMove method and classesToRemove and classesToAdd
      const { classesToRemove, classesToAdd } = character.makeMove();

      //now we can use those values after having grabbed them from running the characters methods

      //if the character has to be rotated and we want to change position
      if (character.rotation && nextMovePos !== character.pos) {
        // Rotate the character's current location
        this.rotateDiv(nextMovePos, character.dir.rotation);
        // Rotate the previous div back to normal, reset it basically

        this.rotateDiv(character.pos, 0);
      }

      //move the character on the grid visually, first by removing it from its current spot and then adding it to where it is supposed to be
      this.removeObject(character.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);

      //set the characters new position
      character.setNewPos(nextMovePos, direction);
    }
  }

  //used to initialize class itself, can be called wihtout instantiating the class itself. we create an instance of the class and create the grid and then return the instance.
  static createGameBoard(DOMGrid, level) {
    //creating the empty gameboard using the previously defined constructor
    const board = new this(DOMGrid);

    //populate gameboard with the hardcoded array passed in from basics

    board.createGrid(level);
    return board;
  }
}

export default GameBoard;
