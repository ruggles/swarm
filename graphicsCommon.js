// Common graphical functions
// Not game specific

// IIFE start
(function() {
"use strict";

game.drawRect = function(color, x, y, width, height) {
    game.canvasContext.fillStyle = color;
    game.canvasContext.fillRect(x, y, width, height);
}

game.drawBackground = function(color) {
    game.drawRect(color, 0, 0, game.canvas.width, game.canvas.height);
}

game.drawMousePos = function() {
    game.canvasContext.font = "12px Arial";
    game.canvasContext.fillStyle = 'purple';
    game.canvasContext.fillText("(" + Math.floor(game.mouseX) + ", " + Math.floor(game.mouseY) + ")", game.mouseX, game.mouseY);
}

game.resizeCanvas = function() {
    game.canvas.width = window.innerWidth*9/10;
    game.canvas.height = window.innerHeight*7/10;
}

// IIFE end
})();
