// The Director: determines when enemies should spawn

// IIFE start
(function() {
"use strict";

game.initialPoints = 50;

game.Director = function() {

    this.ticker = 0;
    this.points = game.initialPoints;
    this.wave = 1;

    this.coolDown = 20*60;

    this.attackArray = new Array;
    this.attackArray.push(game.boringAttack);
    this.attackArray.push(game.pulseCircleAttack);
    this.attackArray.push(game.circleAttack);
    this.attackArray.push(game.pulseAttack);
    this.attackArray.push(game.motherAttack);
    this.attackArray.push(game.curveAttack);
    this.attackArray.push(game.wigglyAttack);
    this.attackArray.push(game.spiralAttack);

}

game.Director.prototype.update = function() {

    // If director is out of points, give points, add delay
    if (this.points <= 0) {
        this.points = game.initialPoints*Math.pow(1.1, this.wave);
        this.wave++;
        this.ticker += this.coolDown;
    }
    // Spawn a baddie
    else if (this.ticker <= 0) {
        var attackNum = Math.floor(Math.random()*this.attackArray.length);
        var attack = this.attackArray[attackNum];
        this.points -= attack.points;
        this.ticker += attack.coolDown;
        attack.spawn(game.hiveArray[0]);
    }


    this.ticker--;
}

// Attack list

game.boringAttack = {spawn: game.boringBaddieSpawn, points: 10, coolDown: 0.5*60};
game.pulseCircleAttack = {spawn: game.pulseCircleBaddieSpawn, points: 30, 
                          coolDown: 0.5*60};
game.circleAttack = {spawn: game.circleBaddieSpawn, points: 20, 
                     coolDown: 0.5*60};
game.pulseAttack = {spawn: game.pulseBaddieSpawn, points: 10, 
                     coolDown: 0};
game.motherAttack = {spawn: game.motherBaddieSpawn, points: 30, 
                     coolDown: 0.5*60};
game.curveAttack = {spawn: game.curveBaddieSpawn, points: 30, 
                     coolDown: 2*60};
game.wigglyAttack = {spawn: game.wigglyBaddieSpawn, points: 25, 
                     coolDown: 1.5*60};
game.spiralAttack = {spawn: game.spiralBaddieSpawn, points: 30, 
                     coolDown: 2*60};



// IIFE end
})();
