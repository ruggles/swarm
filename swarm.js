// Holds swarm specific objects & functions

// IIFE start
(function() {
"use strict";

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

// Motherbad - Child of Entity
game.MotherBaddie = function(pos, drawArray, hitArray, moveSpeed, trackSpeed, health) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

    // Quickie placeholders
    this.health = health;
    this.ticker = 0;
}

game.MotherBaddie.prototype = Object.create(game.Entity.prototype);
game.MotherBaddie.prototype.constructor = game.Baddie;

game.MotherBaddie.prototype.move = function() {

    var delta = this.moveObj.move({x: this.x, y: this.y});

    this.x += delta.x;
    this.y += delta.y;

    var pos = this.getRandPoint();
    
    var targetNum = Math.floor(Math.random()*game.bugArray.length);

    if (this.ticker%(60*2) == 0) {
        game.miniBaddieSpawn({x: this.x + pos.x, y: this.y + pos.y}, game.bugArray[targetNum]);
    }

    this.ticker += 1;
}

// Motherbad - Child of Entity
game.PulseBaddie = function(pos, drawArray, hitArray, moveSpeed, trackSpeed, health) {

    game.Entity.call(this, pos, drawArray, hitArray, moveSpeed, trackSpeed);

    // Quickie placeholders
    this.health = health;
    this.ticker = 0;
    this.absoluteSpeed = moveSpeed;
}

game.PulseBaddie.prototype = Object.create(game.Entity.prototype);
game.PulseBaddie.prototype.constructor = game.Baddie;

game.PulseBaddie.prototype.move = function() {

    var delta = this.moveObj.move({x: this.x, y: this.y});

    this.x += delta.x;
    this.y += delta.y;

    this.moveObj.speed = this.absoluteSpeed*(Math.sin(this.ticker*Math.PI/60) + 0.5);

    this.ticker += 1;
}


// IIFE end
})();
