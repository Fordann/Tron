//const Constants = require('../shared/constants')   => il faut trouver solution pour importer constantes en mettant game.js côté serveur
const socket = io();

const SHIP_SIZE = 30; // ship height in pixels

ctx = canvas.getContext('2d');
mapSize = 1000;

function drawPlayers(game) {
    ctx.clearRect(0, 0, mapSize, mapSize);
    me = game.players[socket.id]
    ctx.save();
    ctx.translate(- me.x + canvas.width / 2, - me.y + canvas.height/ 2);
    for (var playerID in game.players) {
        var player = game.players[playerID];

        ctx.strokeStyle = 'black';
        ctx.strokeRect(0,0, mapSize, mapSize)

        var exploding = player.explodeTime > 0;
        if (!exploding) {
            ctx.lineWidth = SHIP_SIZE / 20;
            ctx.beginPath();
            ctx.moveTo( // nose of the ship
                player.x + 4 / 3 * player.size * Math.cos(player.a),
                player.y - 4 / 3 * player.size * Math.sin(player.a)
            );
            ctx.lineTo( // rear left
                player.x - player.size * (2 / 3 * Math.cos(player.a) + Math.sin(player.a)),
                player.y + player.size * (2 / 3 * Math.sin(player.a) - Math.cos(player.a))
            );
            ctx.lineTo( // rear right
                player.x - player.size * (2 / 3 * Math.cos(player.a) - Math.sin(player.a)),
                player.y + player.size * (2 / 3 * Math.sin(player.a) + Math.cos(player.a))
            );
            ctx.closePath();
            ctx.fillStyle = player.color;
            ctx.fill();
            
            for (var i = 0; i < game.walls.length; i++) {
                backLine = game.walls[i]
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(backLine.x, backLine.y)
                ctx.lineTo(backLine.xSize, backLine.ySize)
                ctx.strokeStyle = backLine.color;
                ctx.stroke();    
            }
        }
        else {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size * 1.5, 0, 2 * Math.PI)
            ctx.fill();
            ctx.fillStyle = 'orange';
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size * 1.2, 0, 2 * Math.PI)
            ctx.fill();
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size * 0.9, 0, 2 * Math.PI)
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size * 0.6, 0, 2 * Math.PI)
            ctx.fill();
        }      
    }
    ctx.restore();  
}   

socket.on('objects', function (game) {
    drawPlayers(game)
    console.log(game.players)
    var numberPlayer = `<h2>Nombre d'obstacles : ${game.walls.length}</h2>`;
    document.getElementById('Leaderboard').innerHTML=`<b>${numberPlayer}</b>`;
});

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(ev) {
    switch (ev.keyCode) {
        case 37: // left arrow 
            socket.emit('move left');
            break;

        case 38: // up arrow 
            socket.emit('thrust forward');
            break;

        case 39: // right arrow 
            socket.emit('move right');
            break;
    }
};

function keyUp(ev) {
    switch (ev.keyCode) {
        case 37:
        case 39: // left arrow and right 
            socket.emit('stop rotation');
            break;

        case 38: // up arrow (stop thrusting)
            socket.emit('stop forward');
            break;

    }
};

