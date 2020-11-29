const { v4: uuidv4 } = require("uuid");
module.exports = class Robot {
  constructor(iniPos = ["0", "0", "N"], instructions) {
    this.lost = false;
    this.planet = null;
    this.position = { x: parseInt(iniPos[0]), y: parseInt(iniPos[1]) };
    this.orientation = iniPos[2];
    this.uuid = this.uuid = uuidv4();
    this.instructions = instructions;
  }

  followInstructions() {
    for (var i = 0; i < this.instructions.length; i++) {
      switch (this.instructions[i]) {
        case "L":
        case "R":
          this.rotate(this.instructions[i]);
          break;
        case "F":
          if (this.canMove()) {
            var fromX = this.position.x;
            var fromY = this.position.y;
            switch (this.orientation) {
              case "N":
                this.position.y++;
                break;
              case "S":
                this.position.y--;

                break;
              case "E":
                this.position.x++;

                break;
              case "W":
                this.position.x--;
                break;
            }
            this.isLost(fromX, fromY);
          }
          break;
      }
    }
  }
  canMove() {
    if (this.lost) return false;
    if (!this.planet.grid[this.position.x][this.position.y]) {
      // no spect
      return true;
    } else {
      //yes spect
      if (this.position.x === 0 && this.orientation === "W") return false; // no w
      if (this.position.x === this.planet.sizeX && this.orientation === "E")
        return false; //no
      if (this.position.y === 0 && this.orientation === "S") return false; // no S
      if (this.position.y === this.planet.sizeY && this.orientation === "N")
        return false; //no N
      return true;
    }
  }
  isLost(fromX, fromY) {
    if (
      this.position.x >= this.planet.grid.length ||
      this.position.x < 0 ||
      this.position.y < 0 ||
      this.position.y >= this.planet.grid[0].length
    ) {
      this.lost = true;
      this.planet.grid[fromX][fromY] = this.uuid;
      // set last known position
      this.position.x = fromX;
      this.position.y = fromY;
    }
  }
  rotate(direction) {
    switch (direction) {
      case "L":
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
      case "R":
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
    }
  }
};
