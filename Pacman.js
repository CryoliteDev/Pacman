import { OBJECT_TYPE, DIRECTIONS } from "./setup"

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true;
    }

    /**
     * Check if pacman is ready to move or not
     */
    shouldMove() {
        if (!this.dir) { // shouldn't move initially 
            return;
        }

        if (this.timer === this.speed) { 
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    /**
     * Calculate the nxt move for pacman
     * @param {*} objectExist 
     */
    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement; // movement from the key (setup.js)

        if (
            objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) {
            
                nextMovePos = this.pos;
        }

        return{
            nextMovePos, direction: this.dir
        };
    }

    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return {
            classesToRemove, classesToAdd
        }
    }

    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    handleKeyInput = (e, objectExist) => {
        let dir;

        // console.log(e);

        if (e.keyCode >= 37 && e.keyCode <=40) {
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }

        const nextMovePos = this.pos + dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) {
            return;
        }

        this.dir = dir;
    };
}

export default Pacman;