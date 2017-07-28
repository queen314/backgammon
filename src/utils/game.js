/**
 * game
 * @author  YernSun<yernsun@gmail.com>
 * @file    game.js
 * @version 1.0
 */

const Board = require('./board');

class Game {
    get boardSize() {
        return 15;
    }
    get winSize() {
        return 5;
    }

    get activePlayer() {
        return this._players;
    }

    get hand() {
        return this._history.length;
    }

    get trace() {
        return this._history.map(item => {
            return item
        });
    }

    constructor(player, player2) {
        this._players = [player, player2];
        this._history = [];
        this._status = 0;
    }

    /**
     * add player to the game
     * @param {Player} players 
     */
    addPlayer(...players) {
        players.forEach((player) => {
            if (this._canJoin(player)) {
                this._players.push(player);
            }
        });

    }

    start(restart = false) {
        // if (!this._start) {
        //     if (restart) {
        //         this._start();
        //     }
        // }
        this._start();
    }

    _start() {
        this._status = 1;
        this.board = new Board(this.boardSize);
    }

    // 让棋
    pass() {

    }

    // 悔棋
    revoked() {
        let last = this._history.pop();
        this.board.put(last);
    }

    put(x, y, player) {
        let value = this.getPlayerValue(player);
        this._history.push({
            x,
            y,
            value: value
        });
        this.board.put({
            x,
            y
        }, this.getPlayerValue(player));
    }


    getPlayerValue(player) {
        return this._players.indexOf(player) + 1;
    }


    isFinish() {
        let last = this._history[this._history.length - 1];
        const fiveRow = new FiveRow(last, this.board);
        let list = [
            [ // top & bottom vertical  line
                [0, 1],
                [0, -1]
            ],
            [ // left & right Horizontal line
                [1, 0],
                [-1, 0]
            ],
            [ // leftTop & rightBottom
                [1, 1],
                [-1, -1]
            ],
            [ // leftBottom & rightTop
                [1, -1],
                [-1, 1]
            ]
        ];
        let win = list.some(line => {
            let current = last;
            let lineCounter = 0;
            // calc the sum of same color pieces in single line
            line.forEach(([mx, my]) => {
                let x = current.x,
                    y = current.y;
                let counter = -1;
                do {
                    x += mx;
                    y += my;
                    var value = this.board.get(x, y);
                    ++counter;
                }
                while (value === current.value && counter < this.winSize);
                lineCounter += counter;
            });
            return lineCounter == this.winSize - 1;
        });
        if (!win) {
            // draw
            if (Math.pow(this.boardSize) === this._history.length) {
                return ;
            }
        }
    }

    _canJoin(player) {
        return true;
    }

    render() {
        console.log(this.board + '');
    }
}


module.exports = Game;