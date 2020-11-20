class HolCanvas {
    constructor(canvasID) {
        this.canvasID = canvasID;
        this.canvasLoc = document.querySelector(canvasID);
        this.ctx = this.canvasLoc.getContext('2d');
        this.screenWidth = window.innerWidth - 200;
        this.screenHeight = window.innerHeight - 100;
    }
    createCanvas() {
        this.ctx.canvas.width = this.screenWidth;
        this.ctx.canvas.height = this.screenHeight;
    }
    drawPlayer(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    clearMap() {
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    }

}