var fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { parse } = require("path");
const { exit } = require("process");
var input = null;
try {
  var data = fs.readFileSync("input.txt", "utf8");
  input = data.toString().split("\n");
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
    robot.planet = this;
  }
}

class Robot {
  constructor(iniPos = ["0", "0", "N"], instructions) {
    this.lost = false;
    this.planet = null;
    this.position = { x: parseInt(iniPos[0]), y: parseInt(iniPos[1]) };
    this.orientation = iniPos[2];
    this.uuid = this.uuid = uuidv4();
    this.instructions = instructions;
  }

  followInstructions() {
    //console.log(this.instructions, this.position, this.orientation);

    for (var i = 0; i < this.instructions.length; i++) {
      switch (this.instructions[i]) {
        case "L":
        case "R":
          this.rotate(this.instructions[i]);
          break;
        case "F":
          if (this.canMove(this.orientation)) {
            switch (this.orientation) {
              case "N":
                this.position.y += 1;
                break;
              case "S":
                this.position.y -= 1;
                break;
              case "E":
                this.position.x += 1;
                break;
              case "W":
                this.position.x -= 1;
                break;
            }
          }
          break;
      }
      this.isLost();
    }
    console.log(this);
  }
  canMove() {
    return true;
  }
  isLost() {
    this.lost =
      this.position.x >= this.planet.grid.length ||
      this.position.x < 0 ||
      this.position.y < 0 ||
      this.position.y >= this.planet.grid[0].length;
  }
  rotate(direction) {
    switch (direction) {
      case "L":
        switch (this.orientation) {
          case "N":
            this.orientation = "E";
            break;
          case "S":
            this.orientation = "W";
            break;
          case "E":
            this.orientation = "S";
            break;
          case "W":
            this.orientation = "N";
            break;
        }
        break;
      case "R":
        switch (this.orientation) {
          case "N":
            this.orientation = "W";
            break;
          case "S":
            this.orientation = "E";
            break;
          case "E":
            this.orientation = "N";
            break;
          case "W":
            this.orientation = "S";
            break;
        }
        break;
    }
  }
}

let coordinates = input[0].split(" ");
coordinates = coordinates.map((v) => parseInt(v));
const mars = new Planet(coordinates[0], coordinates[1]);
input.splice(0, 1);
const robotCount = input.length / 2;

for (var i = 0; i < input.length; i += 2) {
  mars.addRobot(new Robot(input[i].split(" "), Array.from(input[i + 1])));
}

//console.log(mars);

for (var i = 0; i < robotCount; i++) {
  mars.robots[i].followInstructions();
}
