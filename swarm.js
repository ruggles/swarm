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
    var bugRadius = 4;
    
    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: bugRadius, color: 'purple'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: bugRadius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var bugSpeed = 4;
    var trackSpeed = 5;

    var bug = new game.Bug(pos, drawArray, hitArray, bugSpeed, trackSpeed);
    game.bugArray.push(bug);
}

game.queenInit = function() {
    var pos = {x: -200, y: -200};

    var queenRadius = 20

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: queenRadius, color: 'blue'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: queenRadius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var queen = new game.Queen(pos, drawArray, hitArray, 10, 10);

    return queen;
}


// Badguy spawn functions! should be many!
// Assumes baddieArray exists
game.boringBaddieSpawn = function(target) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    var randomX = Math.cos(randomAngle) * game.canvas.height + game.canvas.width/2;
    var randomY = -Math.sin(randomAngle) * game.canvas.height + game.canvas.height/2;
    var radius = 15;

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: radius, color: 'red'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: radius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var moveSpeed = 1.2;
    var trackSpeed = 3;
    var health = 10;

    var baddieHolder = new game.Baddie({x: randomX, y: randomY}, drawArray, hitArray,
                                        moveSpeed, trackSpeed, health);
    baddieHolder.setTarget(target);
    game.baddieArray.push(baddieHolder);
}

// patterned baddies
game.spiralBaddieSpawn = function(target, numBads) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    
    var randomX;
    var randomY;
    var baddieHolder = new Array;

    var radius = 5;

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: radius, color: 'red'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: radius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var moveSpeed = 0.8;
    var trackSpeed = 2;
    var health = 2;
    var angleFactor = 2 * Math.PI / numBads;

    var center = target.getPos();


    for (var i = 0; i<numBads; i++) {
        randomX = Math.cos(randomAngle + i*angleFactor)*game.canvas.height 
                  + center.x;
        randomY = -Math.sin(randomAngle + i*angleFactor)*game.canvas.height
                  + center.y;
        
        baddieHolder[i] = new game.Baddie({x: randomX, y: randomY}, drawArray, hitArray,
                                       moveSpeed, trackSpeed, health);

        if (i > 0) {
            baddieHolder[i].setTarget(baddieHolder[i-1]);
        }


    }
    baddieHolder[0].setTarget(baddieHolder[numBads-1]);

    for (var i=0; i<numBads; i++)
        game.baddieArray.push(baddieHolder[i]);
}

game.curveBaddieSpawn = function(target, numBads) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    
    var randomX;
    var randomY;
    var baddieHolder = new Array;

    var radius = 5;

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: radius, color: 'red'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: radius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var moveSpeed = 1.5;
    var trackSpeed = 2;
    var health = 2;
    var angleFactor = Math.PI / 9;


    for (var i = 0; i<numBads; i++) {
        randomX = Math.cos(randomAngle + i*angleFactor)*game.canvas.height 
                  + game.canvas.width/2;
        randomY = -Math.sin(randomAngle + i*angleFactor)*game.canvas.height
                  + game.canvas.height/2;
        
        baddieHolder[i] = new game.Baddie({x: randomX, y: randomY}, drawArray, hitArray,
                                       moveSpeed, trackSpeed, health);

        if (i > 0) {
            baddieHolder[i].setTarget(baddieHolder[i-1]);
        }


    }
    baddieHolder[0].setTarget(target);

    for (var i=0; i<numBads; i++)
        game.baddieArray.push(baddieHolder[i]);
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
        game.hiveSpawn({x: 400+Math.cos(game.hiveAngle)*90, 
                        y: 300-Math.sin(game.hiveAngle)*90});
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

// Bug Object! - Child of entity
game.Bug = function(pos, drawArray, hitArray, moveSpeed, trackSpeed) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);
}

game.Bug.prototype = Object.create(game.Entity.prototype);
game.Bug.prototype.constructor = game.Bug;

// Baddie! - Child of Entity
game.Baddie = function(pos, drawArray, hitArray, moveSpeed, trackSpeed, health) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

    // Quickie placeholders
    this.health = health;
}

game.Baddie.prototype = Object.create(game.Entity.prototype);
game.Baddie.prototype.constructor = game.Baddie;


// IIFE end
})();
