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
        //console.log(game.myQueen.isHit(game.clickedX, game.clickedY));
        console.log("Mouse Clicked");
    }

    // Run hive routines
    game.myHive.update();

    // Collision Code
    // If queen touches bug, bug becomes attracted to it
    for (var i=0; i<game.bugArray.length; i++){
        var x = game.bugArray[i].x;
        var y = game.bugArray[i].y;
        if (game.myQueen.isHit(x, y)) {
            game.bugArray[i].setTarget(game.myQueen);
        }
    }
    

    // Movement Code
    game.myQueen.move(game.mouseX, game.mouseY);

    for (var i=0; i<game.bugArray.length; i++) {
        game.bugArray[i].move();
        game.bugArray[i].AI();
    }

}

// Drawing Functions
game.render = function(){
    game.drawBackground(game.BG_COLOR);
    //game.myBug.draw();

    game.myHive.draw();
    game.myQueen.draw();

    for (var i=0; i<game.bugArray.length; i++)
        game.bugArray[i].draw();

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
game.bugSpeed = 3;
game.bugRad = 4;

// Game Canvas
game.canvas = document.getElementById('gameCanvas');
game.canvasContext = game.canvas.getContext('2d');
//game.resizeCanvas();

// Initialize Objects
game.bugArray = new Array();
game.bugInit(50);

game.myQueen = new game.Queen(0, 0, 25, 'blue');
game.myHive = new game.Hive(400, 300);
game.hiveImageLoad();

/*for (var i = 0; i < game.bugArray.length; i++){
    game.bugArray[i].setTarget(game.myQueen)
}*/


//game.myBug = new game.Bug(400, 300, 0, game.bugSpeed, 10, 'purple');

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

