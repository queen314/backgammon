
// const 

const ChessGame = require('./utils/board');

const Player = require('./utils/player');


const player1 = new Player();
const player2 = new Player();
const game = new ChessGame(player1,player2);


game.load();
console.log(game+'');