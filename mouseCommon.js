// Template for basic code files
// Use JS strict
// Set in IIFE (Immediately-Invoked Function Expression
// for containment

// IIFE start
(function() {
"use strict";

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

// IIFE end
})();
