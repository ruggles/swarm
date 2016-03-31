// Dodge Stuff
// By Nicholas Ruggles

// Start main IIFE
(function () {

"use strict";

// game is our global namespace
window.game = {};

// --- Functions ---

// Update functions
game.update = function() {

    if (game.clicked) {
        game.clicked = false;
        console.log("Mouse Clicked");
    }

}

game.printClick = function() {
    console.log("("+game.clickedX+", "+game.clickedY+")");
}

game.getMouseCoords = function(evt) {
    var rect = game.canvas.getBoundingClientRect();
    //var root = document.documentElement;

    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    var mousePos = {x: mouseX, y: mouseY};

    //console.log("event coords: ("+evt.clientX+", "+evt.clientY+")");
    //console.log("window coords: ("+rect.left+", "+rect.top+")");
    //console.log("scroll offset: ("+root.scrollLeft+", "+root.scrollTop+")");

    return mousePos
}

game.updateMouse = function(evt) {
    var mousePos = game.getMouseCoords(evt);
    game.mouseX = mousePos.x
    game.mouseY = mousePos.y
}

game.mouseClick = function(evt) {
    var mousePos = game.getMouseCoords(evt);
    game.clickedX = mousePos.x;
    game.clickedY = mousePos.y;
    game.clicked = true;
}

// Drawing Functions
game.render = function(){

    game.drawBackground(game.BG_COLOR);
}

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

game.drawMouseRect = function() {
    game.drawRect('blue', game.mouseX, game.mouseY, 50, 50);
}

game.resizeCanvas = function() {
    game.canvas.width = window.innerWidth*9/10;
    game.canvas.height = window.innerHeight*7/10;
}

// Testing & Debug Functions
game.testDraw = function() {

//    game.testBoard.draw(50, 50);
    game.drawMouseRect();
    game.drawMousePos();
}

// --- Main Loop ---

game.gameLoop = function() {
    // --- Call Frame ---
    window.requestAnimationFrame( game.gameLoop );
    //console.log("I am the main loop");
    
    // --- Update ---
    game.update();


    // --- Render ---
    //game.resizeCanvas();
    game.render();


    // Testing
    game.testDraw();
}

// --- Objects ---

//  --- window.onload ---
window.onload = function() {

// --- Initialize Variables ---
game.BG_COLOR = 'black';

// Game Canvas
game.canvas = document.getElementById('gameCanvas');
game.canvasContext = game.canvas.getContext('2d');
//game.resizeCanvas();

// Initialize Objects

// Grab & update mouse movement
game.mouseX = 0;
game.mouseY = 0;
game.canvas.onmousemove = function(evt) {game.updateMouse(evt)};

game.clicked = false;
game.clickedX = 0;
game.clickedY = 0;
game.canvas.onclick = function(evt) {game.mouseClick(evt)}; 

// --- Run Main Loop ---

game.gameLoop();

// End window.onload
};

// End IIFE
})();

