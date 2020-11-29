var fs = require("fs");
const { parse } = require("path");
const { exit } = require("process");

const Planet = require("./src/Planet");
const Robot = require("./src/Robot");

function loadInput() {
  var input = null;
  try {
    var data = fs.readFileSync("input.txt", "utf8");
    input = data.toString().split("\n");
    // TODO: Validate input constrains
  } catch (e) {
    console.log("Invalid Input");
    exit();
  }
  return input;
}

function processOutput(input) {
  let coordinates = input[0].split(" ");
  coordinates = coordinates.map((v) => parseInt(v));
  const mars = new Planet(coordinates[0], coordinates[1]);
  input.splice(0, 1);
  const robotCount = input.length / 2;

  for (var i = 0; i < input.length; i += 2) {
    mars.addRobot(new Robot(input[i].split(" "), Array.from(input[i + 1])));
  }
  var output = "";

  for (var i = 0; i < robotCount; i++) {
    mars.robots[i].followInstructions();
    output +=
      mars.robots[i].position.x +
      " " +
      mars.robots[i].position.y +
      " " +
      mars.robots[i].orientation +
      " " +
      (mars.robots[i].lost ? "LOST" : "") +
      "\n";
  }
  return output;
}

//Program

var input = loadInput();
var output = processOutput(input);
console.log(output);
