/** 2D map of the field;
 * 0 = BARRIER
 * 1 = BISCUIT
 * 3 = CHERRY
 * 4 = GHOST
 * 5 = PACMAN
 * Needs to be replaced by
 * https://codepen.io/GabbeV/pen/viAec
 */
const FIELD = [
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
    "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
    "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
    "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
    "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
    "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
    "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
    "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
    "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
    "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
    "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
    "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
    "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];

//Variable Declarations
var field = [];
var ghosts = [];
var pacman;
var score;
var endScore;

function setup() {
    createCanvas(500, 535);

    score = 0;
    field = generateField();
}

function draw() {
    background(51);
    drawHUD();

    //draw and update ghosts
    for (var j = 0; j < ghosts.length; j++) {
        ghosts[j].update();
        ghosts[j].draw();
    }

    //update pacman
    pacman.update();
    pacman.draw();

    handleInput(); //keyboard input
}

/**
 * handles user input
 */
function handleInput() {
    if (keyIsDown(UP_ARROW)) {
        pacman.move(0, -1, true);
    } else if(keyIsDown(DOWN_ARROW)) {
        pacman.move(0, 1, true);
    } else if(keyIsDown(LEFT_ARROW)) {
        pacman.move(-1, 0, true);
    } else if(keyIsDown(RIGHT_ARROW)) {
        pacman.move(1, 0, true);
    }
}

/**
 * Draws tiles 
 * Doesn't draw any ghosts or the pacman
 * Displays the score
 */
function drawHUD() {
    //field
    for (var i = 0; i < field.length; i++) {
        if (field[i].intact) {
            if (field[i].type != "GHOST" && field[i].type != "PACMAN") {
                field[i].draw();
            }
        }
    } // END FOR LOOP

    //score
    noStroke();
    fill(255);
    textSize(30);
    textAlign(LEFT);
    text(score, 5, height - 5);
}

/**
 * Displays if the user won the game or not
 * Displays option to restart the game
 * @param won -  boolean 
 */
function endGame(won) {
    textSize(60);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(5);

    if (won) {
        text("You WON!!!", width / 2, height / 2);
    } else {
        text("You Lost!", width / 2, height / 2);        
    }

    textSize(35);
    text("Press F5 to restart the Game", width / 2, height / 2 + 50);
    noLoop();
}

function generateField() {
    var f = []; //f -> field 

    var ghostID = 0; //handles the ghosts
    for (var i = 0; i < FIELD.length; i++) { // loops through the string
        
        var row = FIELD[i].split(",");
        for (var j = 0; j < row.length; j++) { //loops through numbers 
            
            var type = TYPES[row[j]];
            var tile = new Tile(j, i, type, -1);

            switch (type) {
                case "PACMAN":
                    pacman = tile;
                    f.push(new Tile(j, i, "OPEN"));
                    break;
            
                case "GHOST":
                    var behavior = (ghostID % 2); //every other ghost will be agressive 
                    ghosts.push(new Tile(j, i , type, behavior));
                    f.push(new Tile(j, i, "OPEN"));
                    ghostID++;
                    break;
                
                case "BARRIER":
                    f.push(tile);
                    break;

                case "CHERRY":
                    endScore += 10; //worth ten points
                    f.push(tile);
                    break;

                case "BISCUIT":
                    endScore++; //worth 1 point 
                    f.push(tile);
                    break;

            } //END SWITCH STATEMENT 
            
        } // END INNER FOR LOOP
        
    } // END OUTER FOR LOOP
    return f;
}