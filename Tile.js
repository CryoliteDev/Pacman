//different types of tiles
var TYPES = [
    "BARRIER",
    "BISCUIT",
    "OPEN",
    "CHERRY",
    "GHOST",
    "PACMAN"
]

const TILE_SPEED = 0.2; // tiles movement
const DIMENSIONS = 20; //field size 
const SIZE = 25; //tile size
const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

/**
 * 
 * @param type - type of tile
 * @param behavior - ghosts movement
 */
function Tile(x, y, type, behavior) {
    this.x = x;
    this.y = y;
    this.type = type; //barrier
    this.destination = (-1, -1)
    this.moving = false;
    this.intact = true;
    this.speed = 0.2;
    this.behavior = behavior; // 0 = aggressive, 1 = less aggressive -> for ghosts   
}

Tile.prototype.update = function() {
    if (!this.intact) { //update not needed
        return;
    }

    //movement
    if (this.moving) {

        this.x = lerp(this.x, this.destination.x, this.speed);
        this.y = lerp(this.y, this.destination.y, this.speed);

        var distanceX = Math.abs(this.x - this.destination.x);
        var distanceY = Math.abs(this.y - this.destination.y);

        if (distanceX < 0.1 && distanceY < 0.1) { //rounding to the nearest position
            this.x = this.destination.x;
            this.y = this.destination.y;

            this.moving = false; //done movin
        }
    }

    //eating 
    if (this.type == "PACMAN") { //cuz only pacman can eat
        var destinationTile = getTile(Math.floor(this.x), Math.floor(this.y)); //where pacman movin

        if (destinationTile.intact) {
            switch (destinationTile.type) {
                case "BISCUIT":
                    score++; //worth 1 point
                    destinationTile.intact = false;
                    break;

                case "CHERRY":
                    score += 10; //worth 10 points
                    destinationTile.intact = false;
                    break;
            }
        }

        if (score == endScore) { //checks if pacman has won or not 
            endGame(true);
        }

    } else if (this.type == "GHOST") {
        var distance = dist(pacman.x, pacman.y, this.x, this.y);

        if (distance < 0.3) { //if pacman has touched the ghoust 
            endGame(false);
        }

        //movement
        if (this.moving) { //can't move multiple at once
            return;
        }

        //relative posible movement 
        var possibleMoves = [
            getTile(this.x - 1, this.y), //LEFT
            getTile(this.x + 1, this.y), //RIGHT
            getTile(this.x, this.y - 1), //TOP
            getTile(this.x, this.y + 1), //BOTTOM
        ];

        //sort distance by pacman
        possibleMoves.sort(function(a, b) {
            var aD = dist(a.x, a.y, pacman.x, pacman.y);
            var bD = dist(b.x, b.y, pacman.x, pacman.y);

            return aD - bD;
        });

        //sort by distance from pacman
        if (this.behavior === 0) { //if ghost is aggressive 
            for (var i = 0; i < possibleMoves.length; i++) {
                if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) { //attempt to move
                    break;
                } 
            }
        } else { // less aggressive 
            var index = Math.floor(random(4));
            this.move(possibleMoves[index].x, possibleMoves[index].y, false);
        }
    }
};

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
            fill("#FF00EE");
            stroke(0);
            strokeWeight(1);

            //draws triangle 
            beginShape();
            vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
            vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + (QUARTER_SIZE * 3));
            vertex(this.x * SIZE + (QUARTER_SIZE * 3), this.y * SIZE + (QUARTER_SIZE * 3));
            endShape(CLOSE);
            break;

        case "PACMAN":
            ellipseMode(CORNER);
            stroke("#FFFF00");
            strokeWeight(5);
            fill("#FFFF33");
            ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
        break;
    }
};

/**
 * calculates movement for update funtion
 * return if it is valid move or not
 */
Tile.prototype.move = function(x, y, relative) {
    var destinationX, destinationY;

    if (relative) { //releative to tile
        destinationX = this.x + x;
        destinationY = this.y + y;
    } else {
        destinationX = x;
        destinationY = y;
    }

    if(this.moving) { // no update needed
        return false;
    }

    var destinationTile = getTile(destinationX, destinationY);
    var type = destinationTile.type;

    //only certain tiles can move 
    if ((type == "BARRIER" && this.type != "BARRIER") ||
        (type == "GHOST" && this.type == "GHOST")) {
        
            return false;
    }

    this.moving = true; // begin movement nxt update
    this.destination = createVector(destinationX, destinationY);

    return true;
};

/**
 * return's tiles coordinates 
 */
function getTile(x, y) {
    return field[y * DIMENSIONS + x];
}