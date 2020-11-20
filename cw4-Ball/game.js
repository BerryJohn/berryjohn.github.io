class BallGame {
  constructor() {
    this.ballDirection = {
      x: 0, // alpha
      y: 0, // beta
    };
    this.ballPosition = {
      x: 50, // alpha
      y: 50, // beta
    };
    this.ballCanvas = new BallCanvas('#balls');
    this.timer = new Timer();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.allHoles = [];
    this.teleportHoles = [];
    this.playerRadius = 30;
    this.holeRadius = 50;
    this.isGameOver = false;
    this.time = 0;
  }
  sensorsInit() {
    window.addEventListener('deviceorientation', (e) => {
      const maxMove = 10;
      const minMove = -10;
      const moveX =
        Math.round(e.gamma) > 0
          ? Math.round(e.gamma) > maxMove
            ? maxMove
            : Math.round(e.gamma)
          : Math.round(e.gamma) < minMove
          ? minMove
          : Math.round(e.gamma);
      const moveY =
        Math.round(e.beta) - 90 > 0
          ? Math.round(e.beta) - 90 > maxMove
            ? maxMove
            : Math.round(e.beta - 90)
          : Math.round(e.beta) - 90 < minMove
          ? minMove
          : Math.round(e.beta - 90);

      this.ballDirection.x = moveX;
      this.ballDirection.y = moveY;
    });
  }
  createMap() {
    this.ballCanvas.createCanvas();
  }
  drawPlayer() {
    this.ballCanvas.clearMap();

    this.ballPosition.x += this.ballDirection.x;
    this.ballPosition.y += this.ballDirection.y;

    this.checkBorders(this.ballPosition.x, this.ballPosition.y);

    this.ballCanvas.drawPlayer(
      this.ballPosition.x,
      this.ballPosition.y,
      this.playerRadius
    );
  }
  checkBorders(x, y) {
    if (x < this.playerRadius)
      // too much on left
      this.ballPosition.x = this.playerRadius;
    if (y < this.playerRadius)
      // too much on top
      this.ballPosition.y = this.playerRadius;
    if (x > this.screenWidth - this.playerRadius)
      // too much on right
      this.ballPosition.x = this.screenWidth - this.playerRadius;
    if (y > this.screenHeight - this.playerRadius)
      // too much on down
      this.ballPosition.y = this.screenHeight - this.playerRadius;
  }
  drawHole() {
    this.allHoles.forEach((hole, index) => {
      this.ballCanvas.drawHole(hole.x, hole.y, this.holeRadius, index);
    });
  }
  drawTeleportHole() {
    this.teleportHoles.forEach((hole) => {
      const firstHole = hole.one;
      const secondHole = hole.two;
      this.ballCanvas.drawTeleportHole(
        firstHole.x,
        firstHole.y,
        this.holeRadius
      );
      this.ballCanvas.drawTeleportHole(
        secondHole.x,
        secondHole.y,
        this.holeRadius
      );
    });
  }

  randomPoint() {
    const maxWidth = this.screenWidth - this.holeRadius;
    const maxHeight = this.screenHeight - this.holeRadius;
    const randomX =
      Math.floor(Math.random() * (maxWidth - this.holeRadius)) +
      this.holeRadius;
    const randomY =
      Math.floor(Math.random() * (maxHeight - this.holeRadius)) +
      this.holeRadius;
    return {
      x: randomX,
      y: randomY,
    };
  }

  generateHoles(amount, radius = 50) {
    for (let i = 0; i < amount; i++) {
      const positions = this.randomPoint(radius);
      const hole = {
        x: positions.x,
        y: positions.y,
      };
      this.allHoles.push(hole);
    }
  }

  checkDistance(
    objcetive // HE HAS TO CONTAIN x and y !!!
  ) {
    const tri = {
      // triangle
      a: {
        x: this.ballPosition.x, // always reference to player postion
        y: this.ballPosition.y,
      },
      b: {
        x: objcetive.x,
        y: objcetive.y,
      },
      c: {
        x: Math.abs(objcetive.x - this.ballPosition.x),
        y: objcetive.y,
      },
    };
    const firstSidePow = Math.pow(Math.abs(tri.c.y - tri.a.y), 2);
    const secondSidePow = Math.pow(
      Math.abs(objcetive.x - this.ballPosition.x),
      2
    );
    const hypotenuseSqrt = Math.sqrt(firstSidePow + secondSidePow);

    return hypotenuseSqrt; // distance
  }
  checkHoles() {
    this.allHoles.forEach((hole, index) => {
      if (index == 0) {
        // check if player was in hole before
        const distance = this.checkDistance(hole);
        if (distance < this.holeRadius - this.playerRadius && index == 0)
          //  full player has to be in hole
          this.allHoles.shift();
      }
    });
  }

  generateTeleportHoles() {
    const positionOne = this.randomPoint(this.holeRadius);
    const positionTwo = this.randomPoint(this.holeRadius);
    const holes = {
      time: Date.now(),
      one: {
        x: positionOne.x,
        y: positionOne.y,
      },
      two: {
        x: positionTwo.x,
        y: positionTwo.y,
      },
    };
    this.teleportHoles.push(holes);
  }
  checkTime(timeOne, timeTwo, diff) {
    // for teleports
    if (diff < timeTwo - timeOne) return true;
    return false;
  }
  checkTeleports() {
    this.teleportHoles.forEach((telHole) => {
      const distanceOne = this.checkDistance(telHole.one);
      if (distanceOne < this.holeRadius - this.playerRadius) {
        const currTime = Date.now();
        if (this.checkTime(telHole.time, currTime, 5000)) {
          this.ballPosition.x = telHole.two.x;
          this.ballPosition.y = telHole.two.y;
          telHole.time = Date.now();
        }
      }
      const distanceTwo = this.checkDistance(telHole.two);
      if (distanceTwo < this.holeRadius - this.playerRadius) {
        const currTime = Date.now();
        if (this.checkTime(telHole.time, currTime, 5000)) {
          this.ballPosition.x = telHole.one.x;
          this.ballPosition.y = telHole.one.y;
          telHole.time = Date.now();
        }
      }
    });
  }
  displayTimer() {
    this.time = this.timer.count(Date.now());
    this.ballCanvas.drawTime(this.time);
  }

  checkWin() {
    if (this.allHoles.length == 0) this.isGameOver = true;
  }

  drawGame() {
    this.checkWin();
    this.drawPlayer();
    this.drawHole();
    this.drawTeleportHole();
    this.checkHoles();
    this.checkTeleports();
    this.displayTimer();
    if (!this.isGameOver) requestAnimationFrame(() => this.drawGame());
    else {
      this.ballCanvas.wonWindow(this.time);
      //display won menu
    }
  }
}
