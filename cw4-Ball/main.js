const game = new BallGame();

game.createMap();
game.sensorsInit();
game.generateHoles(6);
game.generateTeleportHoles();
game.drawGame();
