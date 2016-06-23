// Holds swarm specific objects & functions

// IIFE start
(function() {
"use strict";

// --- Functions ---

// Init and spawn functions

game.bugInit = function(bugNum) {
    for (var i = 0; i < bugNum; i++) {
        var pos = {x:Math.random()*game.canvas.width,
                   y:Math.random()*game.canvas.height};
        game.bugSpawn(pos);
    }
}

// Assumes bugArray exists
game.bugSpawn = function(pos) { 
    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: game.bugRad, color: 'purple'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: game.bugRad};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var trackSpeed = 4

    var bug = new game.Bug(pos, drawArray, hitArray, game.bugSpeed, trackSpeed);
    game.bugArray.push(bug);
}

game.queenInit = function() {
    var pos = {x: -200, y: -200};

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: 25, color: 'blue'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: 25};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var queen = new game.Queen(pos, drawArray, hitArray, 10, 10);

    return queen;
}

// Assumes baddieArray exists
game.baddieSpawn = function(target) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    var randomX = Math.cos(randomAngle) * game.canvas.height + game.canvas.width/2;
    var randomY = -Math.sin(randomAngle) * game.canvas.height + game.canvas.height/2;
    var radius = 20;

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: radius, color: 'red'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: radius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var baddieHolder = new game.Baddie({x: randomX, y: randomY}, drawArray, hitArray,
                                        1, 5);
    baddieHolder.setTarget(target);
    game.baddieArray.push(baddieHolder);
}

game.hiveSpawn = function(pos) {

    var drawImage = {type: 'image', bitmap: game.hivePic, offX: 0, offY: 0, 
                     width: 100, height: 100};
    var drawArray = new Array;
    drawArray.push(drawImage);

    var hitCircle = {offX: 0, offY: 0, radius: 10};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var hive = new game.Hive(pos, drawArray, hitArray, 0, 0);
    game.hiveArray.push(hive);

}

// assumes hiveArray exists
game.hiveInit = function() {
    for (var i=0; i<3; i++) {
        game.hiveAngle = Math.PI*(i*(2/3) + 1/2);
        game.hiveSpawn({x: 400+Math.cos(game.hiveAngle)*100, 
                        y: 300-Math.sin(game.hiveAngle)*100});
    }
}

// --- Objects ---

// The hive - Child of Entity

// Load hive image into memory
game.hivePic = document.createElement("img");

game.hiveImageLoad = function() {
    game.hivePic.src = "resources/Hive.png";
}

game.Hive = function(pos, drawArray, hitArray, moveSpeed, trackSpeed) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

    this.width = 100;
    this.height = 100;
    this.frameTicker = 0;
    this.bugTicker = 0;
}

game.Hive.prototype = Object.create(game.Entity.prototype);
game.Hive.prototype.constructor = game.Hive;

game.Hive.prototype.update = function() {
    this.frameTicker += 1;
    
    if (this.frameTicker%60 == 0) {
        var spawnPos;
        var spawnAngle;
        
        if (this.bugTicker == 0) {
            spawnPos = {x: this.x, y: this.y};
            game.bugSpawn(spawnPos);
        }
        else if (this.bugTicker>0 && this.bugTicker<7) {
            spawnAngle = (this.bugTicker%7)*Math.PI/3;
            spawnPos = {x:this.x + Math.cos(spawnAngle) * 0.12 * this.width,
                        y:this.y - Math.sin(spawnAngle) * 0.12 * this.height}
            game.bugSpawn(spawnPos);
        }

        this.bugTicker += 1;
    }
}

game.Hive.prototype.resetBugSpawn = function() {
    this.bugTicker = 0;
}

// The queen - Child of entity
game.Queen = function(pos, drawArray, hitArray, moveSpeed, trackSpeed) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

}

game.Queen.prototype = Object.create(game.Entity.prototype);
game.Queen.prototype.constructor = game.Queen;

game.Queen.prototype.move = function(pos) {
    this.x = pos.x;
    this.y = pos.y;
}

game.Queen.prototype.getRandPoint = function() {
    // This is relative to queen
    var radius = this.getHitArray()[0].radius;

    var randAngle = Math.random() * 2*Math.PI;
    var randRadius = Math.random() * radius;

    var randX = Math.cos(randAngle) * randRadius;
    var randY = Math.sin(randAngle) * randRadius;

    var coords = {x: randX, y: randY};
    return coords; 
}



// Bug Object! - Child of entity
game.Bug = function(pos, drawArray, hitArray, moveSpeed, trackSpeed) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

    this.speed = moveSpeed;

    this.direction = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.i = 0;

    this.trackX = 0;
    this.trackY = 0;
    this.trackDir = 0;
    this.trackSpeed = trackSpeed;

    this.target = null
}

game.Bug.prototype = Object.create(game.Entity.prototype);
game.Bug.prototype.constructor = game.Bug;

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


// Baddie! - Child of Entity
game.Baddie = function(pos, drawArray, hitArray, moveSpeed, trackSpeed) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

    // Quickie placeholders
    this.speed = 1;
    this.health = 10;

    this.target = null;
}

game.Baddie.prototype = Object.create(game.Entity.prototype);
game.Baddie.prototype.constructor = game.Baddie;


// IIFE end
})();
