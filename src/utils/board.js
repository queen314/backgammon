/**
 * 
 * @author  YernSun<yernsun@gmail.com>
 * @file    board.js
 * @version 1.0
 */


const config = require('../config')();

const chessboardSize = config.chessboardSize;
const map = {
    '0': ' ',
    '1': '○',
    '2': '●'
};
class Board {
    // get map() {
    //     return map;
    // }
    constructor() {

        this._history = [];
        this._players = [];
        this._initLayout();
    }


    // /**
    //  * 
    //  * @param {Player} players 
    //  */
    // addPlayer(players) {
    //     if (this.canJoin(players)) {
    //         return this._players.indexOf(players) === -1 && this._players.push(players);
    //     }

    // }

    // _canJoin() {
    //     return true;
    // }

    put({
        x,
        y
    }, value = 0) {
        // 已经落子，且非悔棋撤销
        if (this._layout[x][y] && value !== 0) {
            return false;
        } else {
            this._layout[x][y] = value;
            return true;
        }
    }

    get(x, y) {
        if (typeof x === 'object' ) {
            y = x.y;
            x = x.x;
        }
        return this._layout[x][y];
    }
    // set({ x, y }, player) {
    //     let playerIndex = this._players.indexOf(player);
    // }

    _initLayout() {
        this._layout = [];
        for (let i = 0; i < chessboardSize; i++) {
            this._layout[i] = [];
            for (let j = 0; j < chessboardSize; j++) {
                this._layout[i][j] = 0;
            }
        }
    }

    toString() {
        let rs = [];
        for (let i = 0; i < chessboardSize; i++) {
            let line = [];
            for (let j = 0; j < chessboardSize; j++) {
                line.push(map[this._layout[i][j]]);
            }
            rs.push(line.join(' '));
        }
        return rs.join('\n');
    }
};

module.exports = Board;