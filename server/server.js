const socketio = require('socket.io');
const Constants = require('../shared/constants')
const Game = require('./game')



game = new Game();
module.exports = function (server) {
  const io = socketio(server);

  io.on('connection', function (socket) {
    game.newPlayer(socket.id);
    let player = game.players[socket.id];
    
    socket.on('disconnect', function () {
      delete game.players[socket.id];  //POURQUOI MARCHE PAS AVEC del player;
      game.playersArray.splice(-1, 1);

      
    });

    socket.on('move left', function () {
      player.a += Math.PI / 2
      player.xv = [player.yv, player.yv = -player.xv ][0];
      if (player.thrusting && (!player.colision)) {
        player.backLineNumber +=1
        game.newBackLine(player)
        
      }
    });

    socket.on('thrust forward', function () {
      player.thrusting = true;
    });

    socket.on('move right', function () {
      player.a -= Math.PI / 2
      player.xv = [- player.yv, player.yv = player.xv ][0];
      if (player.thrusting && (!player.colision)) {
        player.backLineNumber +=1
        game.newBackLine(player)
      }
      
    });

  });


  function gameloop() {
    io.volatile.emit('objects', game)
    for (var playerIndex in game.players) {
    let player = game.players[playerIndex];
      for (var backLineIndex in game.walls) { 
        var backLine = game.walls[backLineIndex];
        player.cocolision(backLine);
      }

      player.borderReach();

      if (player.explodeTime == 0) {
          if (player.colision) {
            explodePlayer(player);
          }
 
        if (player.colision != true) {
          if (player.thrusting) {
            player.x += player.xv;
            player.y += player.yv;
            player.backLine[player.backLine.length -1].xSize += player.xv;
            player.backLine[player.backLine.length -1].ySize += player.yv;

            
            
          }   
        }
      }
    };
    
  }
  setInterval(gameloop, 1000 / 60);
};

function explodePlayer(player) {
  player.explodeTime = Math.ceil(Constants.SHIP_EXPLODE_DUR * Constants.FPS);
  return player.explodeTime;(backLine.id === player.backLineNumber)
};















