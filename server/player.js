const Constants = require('../shared/constants')
const SpriteClass = require('./sprite')

class Player extends SpriteClass {
    constructor(id, x, y) {
        super(id, x, y)
        this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        this.size = Constants.SHIP_SIZE / 2;
        this.a =  Math.PI /2;
        this.thrusting = false;
        this.xv = 0;
        this.yv = -3;
        this.explodeTime = 0;
        this.backLine = [];
        this.backLineNumber = 0;
        this.colision = false;
        this.rotation = false;
    };

};  

module.exports = Player;
               
