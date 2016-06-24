// Template for basic code files
// Use JS strict
// Set in IIFE (Immediately-Invoked Function Expression
// for containment

// IIFE start
(function() {
"use strict";

// This defines the entity objects which should include every interactable thing
// in the game. Also includes basic components to compose the entity, more complex
// components should find their own file.
// For the moment, everything is under the 'game' namespaces

game.entityInit = function() {
    var position = {x: 100, y: 100};
    var position2 = {x: 60, y: 55};

    var circle1 = {type: 'circle', offX: 0, offY: 0, radius: 25, color: 'green'};
    var circle2 = {type: 'circle', offX: 20, offY: 0, radius: 25, color: 'cyan'};
    var drawArray = new Array;
    drawArray.push(circle1);
    drawArray.push(circle2);

    var hitCirc1 = {offX: 0, offY: 0, radius:25};
    var hitCirc2 = {offX: 20, offY: 0, radius:25};
    var hitArray = new Array;
    hitArray.push(hitCirc1);
    hitArray.push(hitCirc2);

    game.testEntity1 = new game.Entity(position, drawArray, hitArray, null, null);
    game.testEntity2 = new game.Entity(position2, drawArray, hitArray, null, null);
}

// Entity Class

game.Entity = function(pos, drawArray, hitArray, moveSpeed, trackSpeed) {

    this.x = pos.x;
    this.y = pos.y;

    this.drawObj = new game.Draw(drawArray);
    this.hitObj = new game.HitCircle(hitArray);
    this.moveObj = new game.Move(moveSpeed, trackSpeed);

//    this.AI = new game.AI(AI);
}

game.Entity.prototype.getPos = function() {
    return {x: this.x, y: this.y};
}

game.Entity.prototype.draw = function() {
    this.drawObj.draw(this.x, this.y);
}

game.Entity.prototype.getHitArray = function() {
    return this.hitObj.getArray();
}

game.Entity.prototype.getRandPoint = function() {
    return this.hitObj.getRandPoint();
}

game.Entity.prototype.move = function() { 
    var delta = this.moveObj.move({x: this.x, y: this.y});

    this.x += delta.x;
    this.y += delta.y;
}

game.Entity.prototype.setTarget = function(target) {
    this.moveObj.setTarget(target);
}

// Draw Class
// If there's an image, draw it
// Each circle is defined by a radius, offset, and color
// There's no need for absolute position, it's just fed to 
// draw by the entity class
game.Draw = function(drawArray) {
    this.drawArray = drawArray;
//    this.image = components.imageObj;
}

game.Draw.prototype.draw = function(x, y) {

    for (var i=0; i<this.drawArray.length; i++) {
        if (this.drawArray[i].type == 'circle') {
            game.drawCircle(this.drawArray[i].color, x + this.drawArray[i].offX, 
                            y + this.drawArray[i].offY, this.drawArray[i].radius);
        }

        if (this.drawArray[i].type == 'image' &&
            game.isImageLoaded(this.drawArray[i].bitmap)) {
 
            game.drawBitmap(this.drawArray[i].bitmap, x + this.drawArray[i].offX,
                            y + this.drawArray[i].offY, this.drawArray[i].width,
                            this.drawArray[i].height); 

        }
    }
}

// hitDetect Class - Currently only holds array of hitCircle objects
game.HitCircle = function(circleArray) {
    this.circleArray = circleArray;
}

game.HitCircle.prototype.getArray = function() {
    return this.circleArray;
}

game.HitCircle.prototype.getRandPoint = function() {
    var randomCircle = Math.floor(Math.random()*this.circleArray.length);
    
    var radius = this.circleArray[randomCircle].radius;
    var randAngle = Math.random() * 2*Math.PI;
    var randRadius = Math.random() * radius;

    var randX = Math.cos(randAngle) * randRadius + this.circleArray[randomCircle].offX;
    var randY = -Math.sin(randAngle) * randRadius + this.circleArray[randomCircle].offY;

    var coords = {x: randX, y: randY};
    return coords;
}

// Move Class
game.Move = function(moveSpeed, trackSpeed) {
    // Need to plan this out

    this.speed = moveSpeed;
    this.trackSpeed = trackSpeed;    

    this.direction = 0;

    // These determine where on the object to target
    this.offsetX = 0;
    this.offsetY = 0;

    this.ticker = 0;

    this.trackX = 0;
    this.trackY = 0;
    this.trackDir = 0;
    this.target = null;
}

// Takes in current object position, returns delta
game.Move.prototype.move = function(pos) {
    if (this.target == null) {
        return {x: 0, y: 0};
    }

    this.track();

    var toDir = game.getDirection(pos.x, pos.y, this.trackX, this.trackY);
    this.direction = toDir; 

    var deltaX = Math.cos(this.direction) * this.speed;
    var deltaY = -Math.sin(this.direction) * this.speed;

    return {x: deltaX, y: deltaY};
}

game.Move.prototype.track = function() {

    this.ticker += 1;

    // Replace this w/ random point on hitbox
    if (this.ticker%60 == 0) {
        var coords = this.target.getRandPoint();
        this.offsetX = coords.x;
        this.offsetY = coords.y;
    }

    var toDir = game.getDirection(this.trackX, this.trackY, 
                this.target.x + this.offsetX, this.target.y + this.offsetY);

    this.trackDir = toDir;

    this.trackX += Math.cos(this.trackDir) * this.trackSpeed;
    this.trackY -= Math.sin(this.trackDir) * this.trackSpeed;
}

game.Move.prototype.setTarget = function(target) {
    if (this.target == target) {
        return;
    }

    this.target = target;
    this.trackX = target.x;
    this.trackY = target.y;

    var coords = target.getRandPoint();
    this.offsetX = coords.x;
    this.offsetY = coords.y;
}


// AI Class

// IIFE end
})();
