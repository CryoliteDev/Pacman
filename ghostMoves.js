import {DIRECTIONS, OBJECT_TYPE } from "./setup"

// primitive random movement
export function randomMovement(position, direction, objectExist) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    //an array from the directions object keys
    const keys = Object.keys(DIRECTIONS); //grabs all keys and puts 'em in array

    while(objectExist(nextMovePos, OBJECT_TYPE.WALL) || 
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)) {
            //gets random key from a the key array
            const key =  keys[Math.floor(Math.random() * keys.length)];

            //set the nxt move
            dir = DIRECTIONS[key];
            nextMovePos = position + dir.movement;
    }
    return { nextMovePos, direction: dir};
}