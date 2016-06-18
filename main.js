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
    for (var i=0; i<game.hiveArray.length; i++) {
        game.hiveArray[i].update();
    }
    
    // spawn badguy every few seconds
    if (game.numFrames%(60*4 - game.difficulty) == 0) {
        game.baddieSpawn(game.hiveArray[0]);
        game.difficulty += 1
        //console.log("Badguy Spawned");
    }

    // Movement Code
    game.myQueen.move({x: game.mouseX, y: game.mouseY});

    for (var i=0; i<game.bugArray.length; i++) {
        game.bugArray[i].move();
        game.bugArray[i].AI();
    }

    for (var i=0; i<game.baddieArray.length; i++)
        game.baddieArray[i].move();

    game.numFrames += 1;

    // --- Collision Code ---

    // Bug collision checks
    for (var i=0; i<game.bugArray.length; i++){
        var x = game.bugArray[i].x;
        var y = game.bugArray[i].y;

        // If queen touches bug, bug becomes attracted to it
        if (game.myQueen.isHit(x, y)) {
            game.bugArray[i].setTarget(game.myQueen);
        }

        for (var j=0; j<game.baddieArray.length; j++) {
            // If baddie touches bug, bug dies, baddie gets hurt
            if (game.baddieArray[j].isHit(x, y)) {
                game.bugArray.splice(i, 1);
                game.baddieArray[j].health -= 1;
            }

            // If baddie has 0 less health, it's dead
            if (game.baddieArray[j].health <= 0) {
                game.baddieArray.splice(j, 1);
            }

        }

    }

    // If baddie hits hive, hive gets dead
    for (var i=0; i<game.baddieArray.length; i++) {
        
        for (var j=0; j<game.hiveArray.length; j++) {
            var hiveX = game.hiveArray[j].x;
            var hiveY = game.hiveArray[j].y;
            if (game.baddieArray[i].isHit(hiveX, hiveY)) {
                game.hiveArray.splice(j, 1);
            }
        }
    }

    // If queen touches hive, reset bug spawning
    for (var i=0; i<game.hiveArray.length; i++) {
        if (game.myQueen.isHit(game.hiveArray[i].x, game.hiveArray[i].y)) {
            game.hiveArray[i].resetBugSpawn();
        }
    }


}

// Drawing Functions
game.render = function(){
    game.drawBackground(game.BG_COLOR);
    //game.myBug.draw();

    for (var i=0; i<game.hiveArray.length; i++) {
        game.hiveArray[i].draw();
    }

    game.myQueen.draw();

    for (var i=0; i<game.baddieArray.length; i++)    
        game.baddieArray[i].draw();

    for (var i=0; i<game.bugArray.length; i++)
        game.bugArray[i].draw();

    //game.testEntity.draw();

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
game.numFrames = 0;
game.difficulty = 0;

// Game Canvas
game.canvas = document.getElementById('gameCanvas');
game.canvasContext = game.canvas.getContext('2d');
//game.resizeCanvas();

// Initialize Objects
game.bugArray = new Array();
game.bugInit(50);

game.myQueen = game.queenInit();
 
game.hiveArray = new Array;
game.hiveInit();

game.hiveImageLoad();

game.baddieArray = new Array;

// Entity test Code
//game.entityInit();

// Grab & update mouse movement

// Assume mouse is offscreen before it touches screen
game.mouseX = -200;
game.mouseY = -200;
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

