class BallCanvas {
  constructor(canvasID) {
    this.canvasID = canvasID;
    this.canvasLoc = document.querySelector(canvasID);
    this.ctx = this.canvasLoc.getContext('2d');
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.randomHSLColor = 0;
    this.holeColor = `black`;
    this.playerColor = `hsl(326, 90%, 68%)`;
    this.teleportHoleColor = 'hsl(176, 97%, 37%)';
  }
  createCanvas() {
    this.ctx.canvas.width = this.screenWidth;
    this.ctx.canvas.height = this.screenHeight;
  }
  drawPlayer(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.shadowColor = this.playerColor;
    this.ctx.shadowBlur = 10;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.playerColor;
    this.ctx.fill();
  }
  clearMap() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    this.ctx.fillStyle = 'hsl(176, 97%, 57%)';
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
  }
  changeColor() {
    this.randomHSLColor++;
    if (this.randomHSLColor > 1000) this.randomHSLColor = 0;
  }
  drawHole(x, y, radius = 50, index) {
    this.ctx.beginPath();
    if (index != 0) {
      this.ctx.shadowColor = this.holeColor;
      this.ctx.fillStyle = this.holeColor;
    } else {
      this.ctx.shadowColor = `hsl(${this.randomHSLColor}, 68%, 50%)`;
      this.ctx.fillStyle = `hsl(${this.randomHSLColor}, 68%, 50%)`;
    }
    this.ctx.shadowBlur = 15;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.changeColor();
  }
  drawTeleportHole(x, y, radius = 50) {
    this.ctx.beginPath();
    this.ctx.shadowColor = this.teleportHoleColor;
    this.ctx.fillStyle = this.teleportHoleColor;
    this.ctx.shadowBlur = 15;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  drawTime(time) {
    this.ctx.fillStyle = 'black';
    this.ctx.shadowColor = `hsl(${this.randomHSLColor}, 68%, 50%)`;
    this.ctx.font = '30px Arial';
    const textWidth = Math.floor(this.ctx.measureText(time).width);
    const perfectCenter = this.screenWidth / 2 - textWidth / 2; // prob perfect lol
    this.ctx.fillText(time, perfectCenter, 50);
  }
  wonWindow(time) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.playerColor;
    const xBox = this.screenWidth / 2 - 150;
    const yBox = this.screenHeight / 2 - 75; // 150 is half of block size
    this.ctx.rect(xBox, yBox, 300, 150);
    this.ctx.fill();
    this.ctx.fillStyle = 'hsl(284,70%,50%)';
    const text = 'You Won!';
    const textWidth = Math.floor(this.ctx.measureText(text).width);
    const xText = this.screenWidth / 2 - textWidth / 2;
    const yText = yBox;
    this.ctx.fillText(text, xText, yText + 50);
    const timeText = `Your time: ${time}`;
    const timeWidth = Math.floor(this.ctx.measureText(timeText).width);
    const xTime = this.screenWidth / 2 - timeWidth / 2;
    this.ctx.fillText(timeText, xTime, yText + 100);
  }
}
