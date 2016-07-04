// Contains spawn and init code for swarm objects.

// IIFE start
(function() {
"use strict";

game.bugInit = function(bugNum) {
    for (var i = 0; i < bugNum; i++) {
        var pos = {x:Math.random()*game.canvas.width,
                   y:Math.random()*game.canvas.height};
        game.bugSpawn(pos);
    }
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

game.pulseCircleBaddieSpawn = function(target) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    
    var randomX;
    var randomY;
    var baddieHolder = new Array;

    var numBads = 5;
    var radius = 5;

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: radius, color: 'red'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: radius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var moveSpeed = 1.2;
    var trackSpeed = 2;
    var health = 2;
    var angleFactor = 2 * Math.PI / numBads;

    var center = target.getPos();


    for (var i = 0; i<numBads; i++) {
        randomX = Math.cos(randomAngle + i*angleFactor)*game.canvas.height 
                  + center.x;
        randomY = -Math.sin(randomAngle + i*angleFactor)*game.canvas.height
                  + center.y;
        
        baddieHolder[i] = new game.PulseBaddie({x: randomX, y: randomY}, drawArray, hitArray,
                                       moveSpeed, trackSpeed, health);

        if (i > 0) {
            baddieHolder[i].setTarget(baddieHolder[i-1]);
        }


    }
    baddieHolder[0].setTarget(baddieHolder[numBads-1]);

    for (var i=0; i<numBads; i++)
        game.baddieArray.push(baddieHolder[i]);
}

game.circleBaddieSpawn = function(target) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    
    var randomX;
    var randomY;
    var baddieHolder = new Array;

    var radius = 5;
    var numBads = 5;

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


game.pulseBaddieSpawn = function(target) {
    
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

    var baddieHolder = new game.PulseBaddie({x: randomX, y: randomY}, drawArray, hitArray,
                                        moveSpeed, trackSpeed, health);
    baddieHolder.setTarget(target);
    game.baddieArray.push(baddieHolder);
}

game.miniBaddieSpawn = function(pos, target) {
    
    // Spawn in random place on circle around screen
    var radius = 5;

    var drawCircle = {type: 'circle', offX: 0, offY: 0, radius: radius, color: 'red'};
    var drawArray = new Array;
    drawArray.push(drawCircle);

    var hitCircle = {offX: 0, offY: 0, radius: radius};
    var hitArray = new Array;
    hitArray.push(hitCircle);

    var moveSpeed = 1.2;
    var trackSpeed = 3;
    var health = 1;

    var baddieHolder = new game.Baddie({x: pos.x, y: pos.y}, drawArray, hitArray,
                                        moveSpeed, trackSpeed, health);
    baddieHolder.setTarget(target);
    game.baddieArray.push(baddieHolder);
}

game.motherBaddieSpawn = function(target) {
    
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

    var moveSpeed = 0.5;
    var trackSpeed = 3;
    var health = 10;

    var baddieHolder = new game.MotherBaddie({x: randomX, y: randomY}, drawArray, hitArray,
                                        moveSpeed, trackSpeed, health);
    baddieHolder.setTarget(target);
    game.baddieArray.push(baddieHolder);
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


game.wigglyBaddieSpawn = function(target, numBads) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    
    var randomX;
    var randomY;
    var baddieHolder;

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
    var angleFactor = Math.PI / 18;
    var distFactor = 50;


    for (var i = 0; i<numBads; i++) {
        randomX = Math.cos(randomAngle + i*angleFactor)*(game.canvas.height + distFactor*i) 
                  + game.canvas.width/2;
        randomY = -Math.sin(randomAngle + i*angleFactor)*(game.canvas.height + distFactor*i)
                  + game.canvas.height/2;
        
        baddieHolder = new game.PulseBaddie({x: randomX, y: randomY}, drawArray, hitArray,
                                       moveSpeed, trackSpeed, health);

        baddieHolder.setTarget(target);
        baddieHolder.ticker = i*(-10);
        game.baddieArray.push(baddieHolder);
        

    }
}

game.spiralBaddieSpawn = function(target, numBads) {
    
    // Spawn in random place on circle around screen
    var randomAngle = Math.random()*2*Math.PI;
    
    var randomX;
    var randomY;
    var baddieHolder;

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
    var angleFactor = Math.PI / 18;
    var distFactor = 50;


    for (var i = 0; i<numBads; i++) {
        randomX = Math.cos(randomAngle + i*angleFactor)*(game.canvas.height + distFactor*i) 
                  + game.canvas.width/2;
        randomY = -Math.sin(randomAngle + i*angleFactor)*(game.canvas.height + distFactor*i)
                  + game.canvas.height/2;
        
        baddieHolder = new game.Baddie({x: randomX, y: randomY}, drawArray, hitArray,
                                       moveSpeed, trackSpeed, health);
        baddieHolder.setTarget(target);
        game.baddieArray.push(baddieHolder);
    }
}


// IIFE end
})();
