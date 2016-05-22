// Holds Miscelanneous common functions I don't want gumming up main

// IIFE start
(function() {
"use strict";

game.getDirection = function(x1, y1, x2, y2) {
    var y = y2 - y1;
    var x = x2 - x1;

    var direction = Math.atan2(-y,x);
    if (direction < 0) {
        direction += 2*Math.PI
    }

    return direction;
}

game.getDistance = function(x1, y1, x2, y2) {
    var y = y2 - y1;
    var x = x2 - x1;

    var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return dist;
}

// IIFE end
})();
