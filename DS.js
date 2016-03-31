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

// Drawing Functions
game.render = function(){

    game.drawBackground(game.BG_COLOR);
    game.drawMouseRect();

}

game.drawMouseRect = function() {
    game.drawRect('blue', game.mouseX, game.mouseY, 50, 50);
}

// Testing & Debug Functions
game.testDraw = function() {
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

