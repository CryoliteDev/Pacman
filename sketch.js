//Variable Declarations
var SIZE = 25;
var DIMENSIONS = 20;

var field = [];

console.log("just testing SKETCH");

function setup() {
    createCanvas(500, 500);

    for (var i = 0; i < 400;i++) {
        field.push(new Tile(i % 20, Math.floor(i / 20), random(TYPES)));
    }
}

function draw() {
    background(51);

    for (var i = 0; i < field.length; i++) {
        field[i].draw();
    }

}