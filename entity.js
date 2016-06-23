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

game.Entity = function(pos, drawArray, hitArray) {

    this.x = pos.x;
    this.y = pos.y;

    this.drawObj = new game.Draw(drawArray);

    this.hitObj = new game.HitCircle(hitArray);
//    this.AI = new game.AI(AI);
//    this.move = new game.move(move);
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

// AI Class
// Draw Class

// IIFE end
})();
