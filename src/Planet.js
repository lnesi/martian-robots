module.exports = class Planet {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.grid = [];
    this.robots = [];
    for (var i = 0; i <= sizeX; i++) {
      this.grid.push([]);
      for (var j = 0; j <= sizeY; j++) {
        this.grid[i][j] = 0;
      }
    }
  }
  addRobot(robot) {
    this.robots.push(robot);
    robot.planet = this;
  }
};
