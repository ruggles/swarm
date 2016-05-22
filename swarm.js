// Holds swarm specific objects & functions

// IIFE start
(function() {
"use strict";

// --- Functions ---

game.bugInit = function(bugNum) {
    var bugHolder;
    for (var i = 0; i < bugNum; i++) {
        bugHolder = new game.Bug(Math.random()*game.canvas.width, 
                                 Math.random()*game.canvas.height,
                                 0, game.bugSpeed, game.bugRad, 'purple')
        game.bugArray.push(bugHolder);
    }
}

// --- Objects ---

// The hive

// Load hive image into memory
game.hivePic = document.createElement("img");
game.hivePicLoaded = false;

game.hiveImageLoad = function() {
    game.hivePic.onload = function() {
        game.hivePicLoaded = true;
    }
    game.hivePic.src = "resources/Hive.png";
}

game.Hive = function(x, y) {
    this.x = x;
    this.y = y;
}

game.Hive.prototype.draw = function() {
    if (game.hivePicLoaded) {
        game.drawBitmap(this.x, this.y, game.hivePic);
    }
}

// The queen
game.Queen = function(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

game.Queen.prototype.draw = function() {
    game.drawCircle(this.color, this.x, this.y, this.radius);
}

game.Queen.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
}

game.Queen.prototype.isHit = function(x, y) {
    // Note, this is in board coordinates
    if (game.getDistance(this.x, this.y, x, y) < this.radius) {
        return true;
    }

    return false;
}

game.Queen.prototype.getRandPoint = function() {
    // This is relative to queen
    var randAngle = Math.random() * 2*Math.PI;
    var randRadius = Math.random() * this.radius;

    var randX = Math.cos(randAngle) * randRadius;
    var randY = Math.sin(randAngle) * randRadius;

    var coords = {x: randX, y: randY};
    return coords; 
}



// Bug Object!
game.Bug = function(x, y, direction, speed, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.direction = direction;
    this.speed = speed;

    this.offsetX = 0;
    this.offsetY = 0;

    this.i = 0;

    this.trackX = 0;
    this.trackY = 0;
    this.trackDir = 0;
    this.trackSpeed = 4;

    this.target = null
}

game.Bug.prototype.draw = function() {
    game.drawCircle(this.color, this.x, this.y, this.radius);
}

game.Bug.prototype.move = function() {
    if (this.target == null)
        return;

    this.x += Math.cos(this.direction) * this.speed;
    this.y -= Math.sin(this.direction) * this.speed;

}

game.Bug.prototype.track = function(target) {
    this.i += 1;
    
    // Replace this w/ random point on hitbox
    if (this.i%60 == 0) {
        var coords = target.getRandPoint();
        this.offsetX = coords.x;
        this.offsetY = coords.y;
    }

    var toDir = game.getDirection(this.trackX, this.trackY, target.x + this.offsetX, target.y + this.offsetY);

    this.trackDir = toDir;

    this.trackX += Math.cos(this.trackDir) * this.trackSpeed;
    this.trackY -= Math.sin(this.trackDir) * this.trackSpeed;
}

game.Bug.prototype.AI = function() {
    
    if (this.target == null) {
        return;
    }

    this.track(this.target);
    
    var toDir = game.getDirection(this.x, this.y, this.trackX, this.trackY);
    this.direction = toDir;
}

game.Bug.prototype.setTarget = function(target) {
    // In order for an object to be a target, it much have
    // target.x, target.y, target.getRandPoint()
    if (this.target == target)
        return;


    this.target = target;
    this.trackX = target.x;
    this.trackY = target.y;
    var coords = target.getRandPoint();
    this.offsetX = coords.x;
    this.offsetY = coords.y;
}

// IIFE end
})();
