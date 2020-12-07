import { OBJECT_TYPE, DIRECTIONS } from "./basics";

class Pacman {
  //timer is after how long pacman is rendered and controls the speed of pacman
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  //check if  pacman is ready to move or not

  shouldMove() {
    // Don't move before a key is pressed
    if (!this.dir) {
      return false;
    }

    //counts from the timer to the speed passed, if the timer equals the speed passed in then the timer resets and pacman can move. This controls how fast pacman will be rendered
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }

    this.timer++;
  }

  //object exist from gameboard passed in
  getNextMove(objectExist) {
    //define next position as being current position of pacman plus the movement value of the key pressed
    let nextMovePos = this.pos + this.dir.movement;

    // Do we collide with a wall or the ghost lair?
    if (
      objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePos, OBJECT_TYPE.WALL)
    ) {
      //then we don't move
      nextMovePos = this.pos;
    }

    //otherwise we move, return next move position
    return { nextMovePos, direction: this.dir };
  }

  makeMove() {
    //remove pacman from current positon and add him to the new postion
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToAdd, classesToRemove };
  }

  //set new positon of pacman with the next move position
  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  //take in event and object exists
  handleKeyInput(e, objectExist) {
    let dir;

    //check what keys are pressed, if keys are up down left right
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      //set direction as the key entered
      dir = DIRECTIONS[e.key];
    } else {
      //otherwise nothing
      return;
    }

    //make pacman keep moving in the direction selected unless he runs into a wall or ghost lair

    const nextMovePos = this.pos + dir.movement;
    //if he does, we return nothing and he stops
    if (
      objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      return;
    }

    this.dir = dir;
  }
}

export default Pacman;
