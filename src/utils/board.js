
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
        this._layout = [];
        this._history = [];
        this._players = [];
        for (let i = 0; i < chessboardSize; i++) {
            this._layout[i] = [];
            for (let j = 0; j < chessboardSize; j++) {
                this._layout[i][j] = 0;
            }
        }
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

    set({ x, y }, player) {
        let playerIndex = this._players.indexOf(player);
    }

    _initLayout() {

    }
    // 复盘
    load() {

    }
    // 结束算法
    isFinish() {


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