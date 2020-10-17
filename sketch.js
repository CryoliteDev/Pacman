/** 2D map of the field;
 * 0 = BARRIER
 * 1 = BISCUIT
 * 3 = CHERRY
 * 4 = GHOST
 * 5 = PAC-MAN
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

console.log("just testing SKETCH");

function setup() {
    createCanvas(500, 500);

    field = generateField();
}

function draw() {
    background(51);

    drawHUD();
}


/**
 * Draws tiles 
 * Doesn't draw any ghosts or the pacman
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
}


function generateField() {
    var f = []; //f -> field 

    for (var i = 0; i < FIELD.length; i++) { // loops through the string
        var row = FIELD[i].split(",");
        
        for (var j = 0; j < row.length; j++) { //loops through numbers 
            
            var type = TYPES[row[j]];
            var tile = new Tile(j, i, type);

            switch (type) {
                case "PACMAN":
                    break;
            
                case "GHOST":
                    break;
                
                case "BARRIER":
                    f.push(tile);
                    break;

                case "CHERRY":
                    f.push(tile);
                    break;

                case "BISCUIT":
                    endScore++; //worth 1 point 
                    f.push(tile);
                    break;

                default:
                    break;
            } //END SWITCH STATEMENT 
            
        } // END INNER FOR LOOP
        
    } // END OUTER FOR LOOP
    return f;
}