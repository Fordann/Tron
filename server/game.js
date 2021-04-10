const Constants = require('../shared/constants')
const Player = require('./player')
const BackLine = require('./backline')

class Game {
    constructor() {
        this.players = {};
        this.walls= [];
        this.playersArray = [];
        this.objects = [];
        
    }
    newPlayer(playerID) {
      var coord = this.findUnoccupiedCoord()
      const player = new Player(playerID, coord[0], coord[1])
      this.newBackLine(player)
      this.players[player.id] = player; 
      this.playersArray.push(player);
    }
    newBackLine(player) {
      const backLine = new BackLine(player.backLineNumber, player.id, player.color, player.x /* - 10 * Math.cos(player.a) */,player.y /* + 10* Math.sin(player.a) */, player.x /* - 10 * Math.cos(player.a) */ , player.y /* + 10* Math.sin(player.a) */ )
      this.walls.push(backLine)
      player.backLine.push(backLine)
    }
    
    distWith(object, x, y) {
      return Math.sqrt(Math.pow(object.x - x, 2) + Math.pow(object.y - y, 2));
    }
    findUnoccupiedCoord() {
      this.objects = game.playersArray.concat(game.walls);
      do {
        var x = Math.floor(Math.random() * 640);
        var y = Math.floor(Math.random() * 480);
      } while (this.loopOverSomething(x, y, this.objects) == false);
      var coord = [x,y]
      return coord
 
    }
    loopOverSomething(x, y, objects) {
      for (var i = 0; i < objects.length; i++) {
        if (this.distWith(objects[i], x, y) < 2 * Constants.ROID_SIZE + 5) {
          return false;
        }
      }
      return true;
    };



};
        


module.exports = Game;