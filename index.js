var fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
    this.robots = [];
    for (var i = 0; i < sizeX; i++) {
      this.grid.push([]);
      for (var j = 0; j < sizeY; j++) {
        this.grid[i][j] = 0;
      }
    }
  }
  addRobot(robot) {
    this.robots.push(robot);
  }
}

class Robot {
  constructor(iniPos = ["0", "0", "N"], instructions) {
    this.position = [parseInt(iniPos[0]), parseInt(iniPos[1])];
    this.orientation = iniPos[2];
    this.uuid = uuidv4();
  }
}

let coordinates = input[0].split(" ");
coordinates = coordinates.map((v) => parseInt(v));
const mars = new Planet(coordinates[0], coordinates[1]);
input.splice(0, 1);

const robotCount = input.length / 2;

for (var i = 0; i < input.length; i += 2) {
  mars.addRobot(new Robot(input[i].split(" "), input[i + 1]));
}

console.log(mars);
