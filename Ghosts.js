import { DIRECTIONS, OBJECT_TYPE } from "./basics";

class Ghost {
  //movement is a move function we can give class, potential for multiple move algorithms per ghost, and name for each ghost
  constructor(speed = 5, startPos, movement, name) {
    this.name = name;
    this.movement = movement;
    this.startPos = startPos; //send ghosts back here after pacman eats them
    this.pos = startPos;
    this.dir = DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }

  //methods are mostly the same as those of the pacman class
  shouldMove() {
    //counts from the timer to the speed passed, if the timer equals the speed passed in then the timer resets and pacman can move. This controls how fast the ghosts will be rendered/move
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  //object exist from gameboard passed in
  getNextMove(objectExist) {
    // Call movement function here and get pos and dir from the move function. Doesn't matter what the move function is as long as it returns nextMovePos and direction
    const { nextMovePos, direction } = this.movement(
      this.pos,
      this.dir,
      objectExist
    );
    return { nextMovePos, direction };
  }

  makeMove() {
    //remove ghost from current positon and add him to the new postion, we want to remove the ghost itself, its scared state and the name because name is it's identifier
    const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

    //if the ghost is scared then we also add in the scared property
    if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];

    return { classesToRemove, classesToAdd };
  }

  //set new positon of ghosts with the next move position and direction it's going in
  setNewPos(nextMovePos, direction) {
    this.pos = nextMovePos;
    this.dir = direction;
  }
}

export default Ghost;

// random movement function for the ghosts, can define more move functions with other traits if wanted
export function randomMovement(position, direction, objectExist) {
  let dir = direction;
  let nextMovePos = position + dir.movement;
  // Create an array of all possible directions
  const keys = Object.keys(DIRECTIONS);

  //ghost keeps moving unless it runs into a wall or a ghost, in which case it randomly changes its direction
  while (
    objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
    objectExist(nextMovePos, OBJECT_TYPE.GHOST)
  ) {
    // Get a random direction from that array
    const key = keys[Math.floor(Math.random() * keys.length)];
    // Set that as the new direction
    dir = DIRECTIONS[key];
    // Set the next move position
    nextMovePos = position + dir.movement;
  }

  return { nextMovePos, direction: dir };
}
