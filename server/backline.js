const Constants = require('../shared/constants')

class BackLine {
    constructor(id, minePlayer, color, x, y, xSize, ySize){
        this.id = id;
        this.minePLayer = minePlayer,
        this.color = color;
        this.x = x,
        this.y = y,
        this.xSize = xSize,
        this.ySize = ySize
    }
}
        

module.exports = BackLine;