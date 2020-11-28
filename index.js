var fs = require("fs");
const { parse } = require("path");
const { exit } = require("process");
var input = null;
try {
  var data = fs.readFileSync("input.txt", "utf8");
  input = data.toString().split("\n");
  console.log(input);
} catch (e) {
  console.log("Invalid Input");
  exit();
}

class Planet {
  constructor(sizeX, sizeY) {
    this.grid = [];
    for (var i = 0; i < sizeX; i++) {
      this.grid.push([]);
      for (var j = 0; j < sizeY; j++) {
        this.grid[i][j] = 0;
      }
    }
  }
}

class Robot {}

let coordinates = input[0].split(" ");
coordinates = coordinates.map((v) => parseInt(v));
const mars = new Planet(coordinates[0], coordinates[1]);
console.log(mars);
const robotCount = (input.length - 1) / 2;
console.log();
