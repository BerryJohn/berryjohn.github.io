class CanvasSnow {
  constructor(canvasID) {
    this.canvasBoard = document.querySelector(canvasID);
    this.ctx = this.canvasBoard.getContext('2d');
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    //---------------------//
    this.snowArr = [];
  }
  init() {
    // default canvas style and resize
    this.ctx.canvas.width = this.screenWidth;
    this.ctx.canvas.height = this.screenHeight;
    this.ctx.fillStyle = 'hsla(257, 39%, 9%, 1)';
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    this.ctx.fillStyle = 'hsla(257, 39%, 9%, 1)';
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
  }
  //generate sigle snow
  generateSnow() {
    const SnowClass = new Snow();
    this.snowArr.push(SnowClass);
  }
  drawSnow() {
    this.snowArr.forEach((el) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'white';
      this.ctx.arc(el.x, el.y, el.size - 0.5, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  gravityAndWind() {
    this.snowArr.forEach((e) => {
      // Biggers snows are closer to 'watching person' so they moves faster
      e.changeFallSpeed();
      e.y += e.fallSpeed + 0.1;
      e.changePeek();
      e.x += Math.sin(e.windPeek);
    });
    this.snowArr = this.snowArr.filter((e) => e.y < this.screenHeight); // remove snow below screen
  }
  draw() {
    this.clearCanvas();
    this.generateSnow();
    this.generateSnow();
    this.generateSnow();
    this.drawSnow();
    this.gravityAndWind();
    requestAnimationFrame(() => this.draw());
  }
}
