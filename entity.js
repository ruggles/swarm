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
    var circle1 = {offX: 0, offY: 0, radius: 25, color: 'green'};
    var circle2 = {offX: 20, offY: 0, radius: 25, color: 'cyan'};

    var circArray = new Array;
    circArray.push(circle1);
    circArray.push(circle2);

    game.testEntity = new game.Entity(position, circArray, null, null, null);
}

// Entity Class

game.Entity = function(pos, draw, hitDetect, AI, move) {

    this.x = pos.x;
    this.y = pos.y;

    this.drawObj = new game.draw(draw);
//    this.hitDetect = new game.hitDetect(hitDetect);
//    this.AI = new game.AI(AI);
//    this.move = new game.move(move);
}

game.Entity.prototype.draw = function() {
    this.drawObj.draw(this.x, this.y);
}

// Draw Class
// If there's an image, draw it
// Each circle is defined by a radius, offset, and color
// There's no need for absolute position, it's just fed to 
// draw by the entity class
game.draw = function(circArray) {
    this.circArray = circArray;
//    this.image = components.imageObj;
}

game.draw.prototype.draw = function(x, y) {

    if (this.circArray != null) { 
        for (var i=0; i<this.circArray.length; i++) {
            game.drawCircle(this.circArray[i].color, x + this.circArray[i].offX, 
                            y + this.circArray[i].offY, this.circArray[i].radius);
        }
    }

}

// hitDetect Class
// AI Class
// Draw Class

// IIFE end
})();
