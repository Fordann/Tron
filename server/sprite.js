const Constants = require('../shared/constants')

class Sprite {
    constructor(id, x, y, size, xv, yv) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.xv = xv;
        this.yv = yv;
    }
    
    distWith(object) {
        return Math.sqrt(Math.pow(object.x - this.x, 2) + Math.pow(object.y - this.y, 2));
      }

    cocolision(object) {
      
      let x = object.x;
      let x1 = object.xSize;
      let y = object.y;
      let y1 = object.ySize;
      if (object.x > object.xSize) {
        
        x  = [x1, x1 = x][0];
      }
      if (object.y > object.ySize) {
        
        y  = [y1, y1 = y][0];
      }
      let aheadX = Constants.PLAYER_NOSE * Math.cos(this.a)
      let aheadY = - Constants.PLAYER_NOSE * Math.sin(this.a)
      if (this.x + aheadX >= x-1 && this.x + aheadX <= x1+1 && this.y + aheadY >= y-1 && this.y + aheadY <= y1+1) {
        this.colision = true;
        } 
        
      }  
    borderReach() {
      if (this.x < 0 + this.size) { this.colision = true }
      if (this.x > Constants.MAP_SIZE - this.size) { this.colision = true }
      if (this.y < 0 + this.size) { this.colision = true }
      if (this.y > Constants.MAP_SIZE - this.size) { this.colision = true }
    }

};


module.exports = Sprite;