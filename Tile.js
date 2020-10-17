//different types of tiles
var TYPES = [
    "BARRIER",
    "OPEN", 
    "BISCUIT",
    "CHERRY"
]

const TILE_SPEED = 0.2; // tiles movement
const DIMENSIONS = 20; //field size 
const SIZE = 25; //tile size
var HALF_SIZE = SIZE / 2;
var THIRD_SIZE = SIZE / 3;
var QUARTER_SIZE = SIZE / 4;

/**
 * 
 * @param {} type - type of tile
 */
function Tile(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; //barrier
    this.destination = (-1, -1)
    this.intact = true;
}
console.log("just testing TILE");

Tile.prototype.draw = function() {

    switch (this.type) {
        
        case "BARRIER":
            strokeWeight(5);
            stroke(0);
            fill("#0000FF");
            rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
            break;

        case "BISCUIT":
            ellipseMode(CORNER);
            noStroke();
            fill(255);
            ellipse(this.x * SIZE + THIRD_SIZE, this.y * SIZE + THIRD_SIZE, THIRD_SIZE);
            break;

        case "CHERRY":
            ellipseMode(CORNER);
            stroke(255);
            strokeWeight(2);
            fill("#FF2222");
            ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
            break;  

        case "GHOST":
            break;

        case "PACMAN":
        break;
    
    }
};