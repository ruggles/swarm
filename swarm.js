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

game.bugAdd = function(x, y) { 
    var bug;
    bug = new game.Bug(x, y, 0, game.bugSpeed, game.bugRad, 'purple');
    game.bugArray.push(bug);
}

// Assumes baddieArray exists
game.baddieSpawn = function(target) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    var randomX = Math.cos(randomAngle) * game.canvas.height + game.canvas.width/2;
    var randomY = -Math.sin(randomAngle) * game.canvas.height + game.canvas.height/2;

    var baddieHolder = new game.Baddie(randomX, randomY, 20, 'red');
    baddieHolder.setTarget(target);
    game.baddieArray.push(baddieHolder);
}

game.hiveSpawn = function(x, y) {
    var hive = new game.Hive(x, y);
    game.hiveArray.push(hive);
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
    this.width = 100;
    this.height = 100;
    this.frameTicker = 0;
    this.bugTicker = 0;
}

game.Hive.prototype.draw = function() {
    if (game.hivePicLoaded) {
        game.drawBitmap(game.hivePic, this.x, this.y, this.width, this.height);
    }
}

game.Hive.prototype.update = function() {
    this.frameTicker += 1;
    
    if (this.frameTicker%60 == 0) {
        var spawnX;
        var spawnY;
        var spawnAngle;
        
        if (this.bugTicker == 0) {
            spawnX = this.x;
            spawnY = this.y;
            game.bugAdd(spawnX, spawnY);
        }
        else if (this.bugTicker>0 && this.bugTicker<7) {
            spawnAngle = (this.bugTicker%7)*Math.PI/3;
            spawnX = this.x + Math.cos(spawnAngle) * 0.12 * this.width;
            spawnY = this.y - Math.sin(spawnAngle) * 0.12 * this.height;
            game.bugAdd(spawnX, spawnY);
        }

        this.bugTicker += 1;
    }
}

game.Hive.prototype.resetBugSpawn = function() {
    this.bugTicker = 0;
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

game.Baddie = function(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    // Quickie placeholders
    this.speed = 1;
    this.health = 10;

    this.target = null;
}

game.Baddie.prototype.draw = function() {
    game.drawCircle(this.color, this.x, this.y, this.radius);
}

game.Baddie.prototype.setTarget = function(target) {
    // All targets should have target.x & target.y
    this.target = target;
}

game.Baddie.prototype.move = function() {
    if (this.target != null) {
        var angle = game.getDirection(this.x, this.y, this.target.x, this.target.y);
        this.x += Math.cos(angle) * this.speed;
        this.y -= Math.sin(angle) * this.speed;
    }
    else {
        this.setTarget(game.hiveArray[0]);
    }

}

game.Baddie.prototype.isHit = function(x, y) {
    // Note, this is in board coordinates
    if (game.getDistance(this.x, this.y, x, y) < this.radius) {
        return true;
    }

    return false;
}

// IIFE end
})();
