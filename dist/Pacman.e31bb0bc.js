// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"basics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GAMEBOARD = exports.CLASS_LIST = exports.OBJECT_TYPE = exports.DIRECTIONS = exports.CELL_SIZE = exports.GRID_SIZE = void 0;
//the amount of columns in the grid
var GRID_SIZE = 20; //size of the cells in the grid in pixels

exports.GRID_SIZE = GRID_SIZE;
var CELL_SIZE = 20; //directions corresponding to arrow keys, code is the key entered in, movement is the direction we move in, and rotation is how much pacman should rotate when key is pressed, pacman starts off facing right

exports.CELL_SIZE = CELL_SIZE;
var DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90
  }
}; //array to cover the various kinds of objects, used to set different classes for the divs in the game

exports.DIRECTIONS = DIRECTIONS;
var OBJECT_TYPE = {
  BLANK: "blank",
  WALL: "wall",
  DOT: "dot",
  BLINKY: "blinky",
  PINKY: "pinky",
  INKY: "inky",
  CLYDE: "clyde",
  PILL: "pill",
  PACMAN: "pacman",
  GHOST: "ghost",
  SCARED: "scared",
  GHOSTLAIR: "lair"
}; // Lookup array for classes, only used when we create the grid

exports.OBJECT_TYPE = OBJECT_TYPE;
var CLASS_LIST = [OBJECT_TYPE.BLANK, OBJECT_TYPE.WALL, OBJECT_TYPE.DOT, OBJECT_TYPE.BLINKY, OBJECT_TYPE.PINKY, OBJECT_TYPE.INKY, OBJECT_TYPE.CLYDE, OBJECT_TYPE.PILL, OBJECT_TYPE.PACMAN, OBJECT_TYPE.GHOSTLAIR]; //array that represents the gameboard/grid, the numbers correspond with the kind of object they are
// prettier-ignore

exports.CLASS_LIST = CLASS_LIST;
var GAMEBOARD = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
exports.GAMEBOARD = GAMEBOARD;
},{}],"node_modules/@babel/runtime/helpers/arrayLikeToArray.js":[function(require,module,exports) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
},{"./arrayLikeToArray":"node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"./arrayLikeToArray":"node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
},{}],"node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray":"node_modules/@babel/runtime/helpers/iterableToArray.js","./unsupportedIterableToArray":"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js","./nonIterableSpread":"node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],"node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],"Ghosts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomMovement = randomMovement;
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _basics = require("./basics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ghost = /*#__PURE__*/function () {
  //movement is a move function we can give class, potential for multiple move algorithms per ghost, and name for each ghost
  function Ghost() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    var startPos = arguments.length > 1 ? arguments[1] : undefined;
    var movement = arguments.length > 2 ? arguments[2] : undefined;
    var name = arguments.length > 3 ? arguments[3] : undefined;
    (0, _classCallCheck2.default)(this, Ghost);
    this.name = name;
    this.movement = movement;
    this.startPos = startPos; //send ghosts back here after pacman eats them

    this.pos = startPos;
    this.dir = _basics.DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  } //methods are mostly the same as those of the pacman class


  (0, _createClass2.default)(Ghost, [{
    key: "shouldMove",
    value: function shouldMove() {
      //counts from the timer to the speed passed, if the timer equals the speed passed in then the timer resets and pacman can move. This controls how fast the ghosts will be rendered/move
      if (this.timer === this.speed) {
        this.timer = 0;
        return true;
      }

      this.timer++;
    } //object exist from gameboard passed in

  }, {
    key: "getNextMove",
    value: function getNextMove(objectExist) {
      // Call movement function here and get pos and dir from the move function. Doesn't matter what the move function is as long as it returns nextMovePos and direction
      var _this$movement = this.movement(this.pos, this.dir, objectExist),
          nextMovePos = _this$movement.nextMovePos,
          direction = _this$movement.direction;

      return {
        nextMovePos: nextMovePos,
        direction: direction
      };
    }
  }, {
    key: "makeMove",
    value: function makeMove() {
      //remove ghost from current positon and add him to the new postion, we want to remove the ghost itself, its scared state and the name because name is it's identifier
      var classesToRemove = [_basics.OBJECT_TYPE.GHOST, _basics.OBJECT_TYPE.SCARED, this.name];
      var classesToAdd = [_basics.OBJECT_TYPE.GHOST, this.name]; //if the ghost is scared then we also add in the scared property

      if (this.isScared) classesToAdd = [].concat((0, _toConsumableArray2.default)(classesToAdd), [_basics.OBJECT_TYPE.SCARED]);
      return {
        classesToRemove: classesToRemove,
        classesToAdd: classesToAdd
      };
    } //set new positon of ghosts with the next move position and direction it's going in

  }, {
    key: "setNewPos",
    value: function setNewPos(nextMovePos, direction) {
      this.pos = nextMovePos;
      this.dir = direction;
    }
  }]);
  return Ghost;
}();

var _default = Ghost; // random movement function for the ghosts, can define more move functions with other traits if wanted

exports.default = _default;

function randomMovement(position, direction, objectExist) {
  var dir = direction;
  var nextMovePos = position + dir.movement; // Create an array of all possible directions

  var keys = Object.keys(_basics.DIRECTIONS); //ghost keeps moving unless it runs into a wall or a ghost, in which case it randomly changes its direction

  while (objectExist(nextMovePos, _basics.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _basics.OBJECT_TYPE.GHOST)) {
    // Get a random direction from that array
    var key = keys[Math.floor(Math.random() * keys.length)]; // Set that as the new direction

    dir = _basics.DIRECTIONS[key]; // Set the next move position

    nextMovePos = position + dir.movement;
  }

  return {
    nextMovePos: nextMovePos,
    direction: dir
  };
}
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","./basics":"basics.js"}],"node_modules/@babel/runtime/helpers/defineProperty.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],"GameBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _basics = require("./basics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameBoard = /*#__PURE__*/function () {
  function GameBoard(DOMGrid) {
    var _this = this;

    (0, _classCallCheck2.default)(this, GameBoard);
    (0, _defineProperty2.default)(this, "objectExist", function (pos, object) {
      return _this.grid[pos].classList.contains(object);
    });
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }

  (0, _createClass2.default)(GameBoard, [{
    key: "showGameStatus",
    value: function showGameStatus(gameWon) {
      // Create and show game win or game over
      var div = document.createElement("div");
      div.classList.add("game-status");
      div.innerHTML = "".concat(gameWon ? "WIN!" : "GAME OVER!");
      this.DOMGrid.appendChild(div);
    } //method to create grid, called every time game starts. grid is the array of objects and the value at that index is the object at that index

  }, {
    key: "createGrid",
    value: function createGrid(gamegrid) {
      var _this2 = this;

      this.dotCount = 0;
      this.grid = [];
      this.DOMGrid.innerHTML = ""; // First set correct amount of columns based on Grid Size and the size of each cell is based on Cell Size

      this.DOMGrid.style.cssText = "grid-template-columns: repeat(".concat(_basics.GRID_SIZE, ", ").concat(_basics.CELL_SIZE, "px);"); //loop through the gaemboard array, and create each element in the array

      gamegrid.forEach(function (square) {
        var div = document.createElement("div"); //check value of current element and match it to classlist to get what object it's supposed to be

        div.classList.add("square", _basics.CLASS_LIST[square]);
        div.style.cssText = "width: ".concat(_basics.CELL_SIZE, "px; height: ").concat(_basics.CELL_SIZE, "px;");

        _this2.DOMGrid.appendChild(div);

        _this2.grid.push(div); // Add dots, keep track of the number of dots


        if (_basics.CLASS_LIST[square] === _basics.OBJECT_TYPE.DOT) _this2.dotCount++;
      });
    } //takes the position and classes.

  }, {
    key: "addObject",
    value: function addObject(pos, classes) {
      var _this$grid$pos$classL;

      //where in the grid we want to apply/add these classes/objects
      (_this$grid$pos$classL = this.grid[pos].classList).add.apply(_this$grid$pos$classL, (0, _toConsumableArray2.default)(classes));
    }
  }, {
    key: "removeObject",
    value: function removeObject(pos, classes) {
      var _this$grid$pos$classL2;

      //where in the grid we want to remove these classes/objects
      (_this$grid$pos$classL2 = this.grid[pos].classList).remove.apply(_this$grid$pos$classL2, (0, _toConsumableArray2.default)(classes));
    } // checks to make sure an object exists at that current position
    // Can have an arrow function here cause of this binding

  }, {
    key: "rotateDiv",
    //used to rotate pacman on the grid, rotates at postion by the specified amount of degrees
    value: function rotateDiv(pos, deg) {
      this.grid[pos].style.transform = "rotate(".concat(deg, "deg)");
    } //method to move characters

  }, {
    key: "moveCharacter",
    value: function moveCharacter(character) {
      //make sure the character is ready to move, using the characters should move method
      if (character.shouldMove()) {
        //from this gameboard class we pass in the objectexist method so it can be used in the pacman class. That method in the pacman/character class then returns the nextmovePos and direction. So the nextmovepos and direction here are gotten from using the return values of the character's getNextMove method.
        var _character$getNextMov = character.getNextMove(this.objectExist),
            nextMovePos = _character$getNextMov.nextMovePos,
            direction = _character$getNextMov.direction; //do the same thing here with the characters makeMove method and classesToRemove and classesToAdd


        var _character$makeMove = character.makeMove(),
            classesToRemove = _character$makeMove.classesToRemove,
            classesToAdd = _character$makeMove.classesToAdd; //now we can use those values after having grabbed them from running the characters methods
        //if the character has to be rotated and we want to change position


        if (character.rotation && nextMovePos !== character.pos) {
          // Rotate the character's current location
          this.rotateDiv(nextMovePos, character.dir.rotation); // Rotate the previous div back to normal, reset it basically

          this.rotateDiv(character.pos, 0);
        } //move the character on the grid visually, first by removing it from its current spot and then adding it to where it is supposed to be


        this.removeObject(character.pos, classesToRemove);
        this.addObject(nextMovePos, classesToAdd); //set the characters new position

        character.setNewPos(nextMovePos, direction);
      }
    } //used to initialize class itself, can be called wihtout instantiating the class itself. we create an instance of the class and create the grid and then return the instance.

  }], [{
    key: "createGameBoard",
    value: function createGameBoard(DOMGrid, gamegrid) {
      //creating the empty gameboard using the previously defined constructor
      var board = new this(DOMGrid); //populate gameboard with the hardcoded array passed in from basics

      board.createGrid(gamegrid);
      return board;
    }
  }]);
  return GameBoard;
}();

var _default = GameBoard;
exports.default = _default;
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","./basics":"basics.js"}],"Pacman.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _basics = require("./basics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pacman = /*#__PURE__*/function () {
  //timer is after how long pacman is rendered and controls the speed of pacman
  function Pacman(speed, startPos) {
    (0, _classCallCheck2.default)(this, Pacman);
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  } //check if  pacman is ready to move or not


  (0, _createClass2.default)(Pacman, [{
    key: "shouldMove",
    value: function shouldMove() {
      // Don't move before a key is pressed
      if (!this.dir) {
        return false;
      } //counts from the timer to the speed passed, if the timer equals the speed passed in then the timer resets and pacman can move. This controls how fast pacman will be rendered


      if (this.timer === this.speed) {
        this.timer = 0;
        return true;
      }

      this.timer++;
    } //object exist from gameboard passed in

  }, {
    key: "getNextMove",
    value: function getNextMove(objectExist) {
      //define next position as being current position of pacman plus the movement value of the key pressed
      var nextMovePos = this.pos + this.dir.movement; // Do we collide with a wall or the ghost lair?

      if (objectExist(nextMovePos, _basics.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _basics.OBJECT_TYPE.WALL)) {
        //then we don't move
        nextMovePos = this.pos;
      } //otherwise we move, return next move position


      return {
        nextMovePos: nextMovePos,
        direction: this.dir
      };
    }
  }, {
    key: "makeMove",
    value: function makeMove() {
      //remove pacman from current positon and add him to the new postion
      var classesToRemove = [_basics.OBJECT_TYPE.PACMAN];
      var classesToAdd = [_basics.OBJECT_TYPE.PACMAN];
      return {
        classesToAdd: classesToAdd,
        classesToRemove: classesToRemove
      };
    } //set new positon of pacman with the next move position

  }, {
    key: "setNewPos",
    value: function setNewPos(nextMovePos) {
      this.pos = nextMovePos;
    } //take in event and object exists

  }, {
    key: "handleKeyInput",
    value: function handleKeyInput(e, objectExist) {
      var dir; //check what keys are pressed, if keys are up down left right

      if (e.keyCode >= 37 && e.keyCode <= 40) {
        //set direction as the key entered
        dir = _basics.DIRECTIONS[e.key];
      } else {
        //otherwise nothing
        return;
      } //make pacman keep moving in the direction selected unless he runs into a wall or ghost lair


      var nextMovePos = this.pos + dir.movement; //if he does, we return nothing and he stops

      if (objectExist(nextMovePos, _basics.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _basics.OBJECT_TYPE.GHOSTLAIR)) {
        return;
      }

      this.dir = dir;
    }
  }]);
  return Pacman;
}();

var _default = Pacman;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","./basics":"basics.js"}],"sounds/munch.wav":[function(require,module,exports) {
module.exports = "/munch.50161df6.wav";
},{}],"sounds/pill.wav":[function(require,module,exports) {
module.exports = "/pill.d5173a33.wav";
},{}],"sounds/game_start.wav":[function(require,module,exports) {
module.exports = "/game_start.09b402f7.wav";
},{}],"sounds/death.wav":[function(require,module,exports) {
module.exports = "/death.1b6386ba.wav";
},{}],"sounds/eat_ghost.wav":[function(require,module,exports) {
module.exports = "/eat_ghost.09613325.wav";
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _basics = require("./basics");

var _Ghosts = _interopRequireWildcard(require("./Ghosts"));

var _GameBoard = _interopRequireDefault(require("./GameBoard"));

var _Pacman = _interopRequireDefault(require("./Pacman"));

var _munch = _interopRequireDefault(require("./sounds/munch.wav"));

var _pill = _interopRequireDefault(require("./sounds/pill.wav"));

var _game_start = _interopRequireDefault(require("./sounds/game_start.wav"));

var _death = _interopRequireDefault(require("./sounds/death.wav"));

var _eat_ghost = _interopRequireDefault(require("./sounds/eat_ghost.wav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Classes
// Sounds
//Dom elements
var gameGrid = document.querySelector("#game");
var scoreTable = document.querySelector("#score");
var startButton = document.querySelector("#start-button");
var instructionButton = document.querySelector("#instructions-button"); //Game constants

var POWER_PILL_TIME = 10000; //ms

var GLOBAL_SPEED = 80; // speed for the gameloop, in ms

var gameBoard = _GameBoard.default.createGameBoard(gameGrid, _basics.GAMEBOARD); //Initial setup


var score = 0;
var timer = null;
var gameWon = false;
var powerPillActive = false;
var powerPillTimer = null; //function to play sound effects

function playAudio(audio) {
  var soundEffect = new Audio(audio);
  soundEffect.play();
} //function for when pacman dies


function gameOver(pacman) {
  playAudio(_death.default); //remove the event listener we created for controlling pacman

  document.removeEventListener("keydown", function (e) {
    return pacman.handleKeyInput(e, gameBoard.objectExist);
  }); //show the game win screen

  gameBoard.showGameStatus(gameWon); //stop the game loops

  clearInterval(timer); //show the buttons again

  startButton.classList.remove("hide");
  instructionButton.classList.remove("hide");
} //function for when pacman and a ghost run into each other


function checkCollision(pacman, ghosts) {
  //get the ghost pacman collided with
  var collidedGhost = ghosts.find(function (ghost) {
    return pacman.pos === ghost.pos;
  }); //if collided

  if (collidedGhost) {
    //if pacman has eaten a power pill he will eat the ghost
    if (pacman.powerPill) {
      playAudio(_eat_ghost.default); //so we remove the ghost from that position along with it's scared property so it resets, and remove the name

      gameBoard.removeObject(collidedGhost.pos, [_basics.OBJECT_TYPE.GHOST, _basics.OBJECT_TYPE.SCARED, collidedGhost.name]); //reset the position so the ghost goes back to the lair

      collidedGhost.pos = collidedGhost.startPos; //give 100 points for eating the ghost

      score += 100;
    } else {
      //otherwise if the ghost isn't scared pacman dies and we remove him
      gameBoard.removeObject(pacman.pos, [_basics.OBJECT_TYPE.PACMAN]); //rotate the specific div back to neutral so it doesn't rotate any ghost that moves to that position

      gameBoard.rotateDiv(pacman.pos, 0); //call game over function

      gameOver(pacman, gameGrid);
    }
  }
} //game loop handles the movement of characters, it executes everytime it completes it's interval


function gameLoop(pacman, ghosts) {
  //move pacman
  gameBoard.moveCharacter(pacman); //check and see if there is a collission after pacman moves

  checkCollision(pacman, ghosts); //move ghosts

  ghosts.forEach(function (ghost) {
    gameBoard.moveCharacter(ghost);
  }); //check if there's a collission after a ghost moves, checked twice because ghosts and pacman don't move in sync

  checkCollision(pacman, ghosts); //let pacman eat dots. first check to see if where pacman moves, there is a dot

  if (gameBoard.objectExist(pacman.pos, _basics.OBJECT_TYPE.DOT)) {
    playAudio(_munch.default);
    gameBoard.removeObject(pacman.pos, [_basics.OBJECT_TYPE.DOT]);
    gameBoard.dotCount--; //give 10 points for eating a dot

    score += 10;
  } //check if pacman eats a powerPill, if a powerpill exists at pacmans position


  if (gameBoard.objectExist(pacman.pos, _basics.OBJECT_TYPE.PILL)) {
    playAudio(_pill.default); //remove the powerpill

    gameBoard.removeObject(pacman.pos, [_basics.OBJECT_TYPE.PILL]); //set pacmans powerpill status as true and award him 50 points

    pacman.powerPill = true;
    score += 50; //clear the powerpill effect after ten seconds, first we clear out the old timer if we already have a powerpill active then set the timer

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(function () {
      return pacman.powerPill = false;
    }, POWER_PILL_TIME);
  } // Change ghosts into scared mode if powerpill eaten
  //if one is true the other is false


  if (pacman.powerPill !== powerPillActive) {
    //then we have powerpillactive status be what it's supposed to be, if powerpill is true then it's true etc
    powerPillActive = pacman.powerPill; //make each ghost scared depending on whether the powerpill is active or not

    ghosts.forEach(function (ghost) {
      return ghost.isScared = pacman.powerPill;
    });
  } //Check if all dots have been eaten, if they have then the game is won and game over is called


  if (gameBoard.dotCount === 0) {
    gameWon = true;
    gameOver(pacman, ghosts);
  } //show score on scoreboard


  scoreTable.innerHTML = score;
}

function getInstructions() {
  // Get the modal
  var modal = document.getElementById("myModal"); // Get the button that opens the modal

  var btn = document.getElementById("instructions-button"); // Get the <span> element that closes the modal

  var span = document.getElementsByClassName("close")[0]; // When the user clicks on the button, open the modal

  btn.onclick = function () {
    modal.style.display = "block";
  }; // When the user clicks on <span> (x), close the modal


  span.onclick = function () {
    modal.style.display = "none";
  }; // When the user clicks anywhere outside of the modal, close it


  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
} //function is ran when start button is pressed


function startGame() {
  playAudio(_game_start.default); //hide start and instructions button at start of game and reset previous values

  gameWon = false;
  powerPillActive = false;
  score = 0;
  startButton.classList.add("hide");
  instructionButton.classList.add("hide"); //create the new game grid from the game board each time we start a new game

  gameBoard.createGrid(_basics.GAMEBOARD); //create pacman with a speed of two and put on the grid

  var pacman = new _Pacman.default(2, 287);
  gameBoard.addObject(287, [_basics.OBJECT_TYPE.PACMAN]); //add event listener for pacman so we can move him with our keyboard

  document.addEventListener("keydown", function (e) {
    return pacman.handleKeyInput(e, gameBoard.objectExist);
  }); //create ghosts at different positions and different speeds

  var ghosts = [new _Ghosts.default(5, 188, _Ghosts.randomMovement, _basics.OBJECT_TYPE.BLINKY), new _Ghosts.default(4, 189, _Ghosts.randomMovement, _basics.OBJECT_TYPE.INKY), new _Ghosts.default(3, 190, _Ghosts.randomMovement, _basics.OBJECT_TYPE.CLYDE), new _Ghosts.default(2, 191, _Ghosts.randomMovement, _basics.OBJECT_TYPE.PINKY)]; // Gameloop, start the interval that will run the game loop function, run gameLoop every 80ms

  timer = setInterval(function () {
    return gameLoop(pacman, ghosts);
  }, GLOBAL_SPEED);
} //Initialize game when button is pressed


startButton.addEventListener("click", startGame); //display instructions when instructions button is pressed

instructionButton.addEventListener("click", getInstructions);
},{"./basics":"basics.js","./Ghosts":"Ghosts.js","./GameBoard":"GameBoard.js","./Pacman":"Pacman.js","./sounds/munch.wav":"sounds/munch.wav","./sounds/pill.wav":"sounds/pill.wav","./sounds/game_start.wav":"sounds/game_start.wav","./sounds/death.wav":"sounds/death.wav","./sounds/eat_ghost.wav":"sounds/eat_ghost.wav"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50387" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Pacman.e31bb0bc.js.map