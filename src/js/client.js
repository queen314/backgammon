/**
* client of game
* @author  YernSun<yernsun@gmail.com>
* @file    client.js
* @version 1.0
*/

require('normalize.css');
require('../css/style.styl');


const ChessGame = require('./utils/game');

const Player = require('./utils/player');

const { Dom, Canvas } = require('./utils/render');


class Client {

    async connect(server) {
        let gameList = await server.list();

    }

    async join(game) {
        if (!game instanceof ChessGame) {
            this.game = new ChessGame();
            this.game.load(game);
        }
        else {
            this.game = game;
        }
        Promise.resolve(this.game);
    }

    async put() {
        if (await this.canPick()) {

        }
    }

    /**
     * check that if it can pick piece,
     * it would be async method on future to support online game
     */
    canPick() {
        return Promise.resolve(true);
    }
}

class Online extends Client {
}

class Offline extends Client {

}



const player1 = new Player();
const player2 = new Player();
const game = new ChessGame(player1, player2);


game.start();

// domRender = new Dom('#playboard', game.board);
domRender = new Canvas('#playboard', game.board)
console.log(domRender);
domRender.on('pick', axis => {
    console.log(axis);
});
console.log(domRender);

// // console.log(ChessGame.prototype);
// game.put(1, 2, player1);
// game.put(2, 3, player1);
// game.put(5, 6, player1);
// game.put(3, 4, player1);
// game.put(4, 5, player1);
// // game.put(6, 7, 1);

// // game.render();
// // game.revoked();
// game.render();

// game.isFinish();
// // d();d();

// // function *list(){
// //     let l= ['2','3','4'];
// //     let size = l.length;
// //     do {
// //         console.log('----');
// //         yield l.pop();
// //     }
// //     while (l.length);
// //     return size;
// // }
// // let l = list();
// // for(let i of l){
// //     console.log(i);
// // }
// // console.log(l.next(),l.next(),l.next(),l.next(),l.next());
// // console.log(game .trace);

