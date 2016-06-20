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

game.circleCollision = function(entity1, entity2) {
    var hitArray1 = entity1.getHitArray();
    var pos1 = entity1.getPos();
    var hitArray2 = entity2.getHitArray();
    var pos2 = entity2.getPos();

    var x1, x2, y1, y2, distance;    

    for (var i=0; i<hitArray1.length; i++) {
        for (var j=0; j<hitArray2.length; j++) {
            x1 = hitArray1[i].offX + pos1.x;
            y1 = hitArray1[i].offY + pos1.y;
            x2 = hitArray2[j].offX + pos2.x;
            y2 = hitArray2[j].offY + pos2.y;

            distance = game.getDistance(x1, y1, x2, y2);

            // A collision occurs
            if (distance < (hitArray1[i].radius + hitArray2[j].radius)) {
                return true;
            }

        }
    }

    // If no collisions were detected
    return false;

}

// IIFE end
})();
