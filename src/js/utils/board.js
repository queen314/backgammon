/**
 * 
 * @author  YernSun<yernsun@gmail.com>
 * @file    board.js
 * @version 1.0
 */

const size = 15;


class Board {
    get size() {
        return size;
    }
    constructor() {
        this._initLayout();
    }

    putPiece({ x, y }, value = 0) {
        // 已经落子，且非悔棋撤销
        if (this.get(x, y) !== 0 && notEmpty(value) && value !== 0) {
            return false;
        } else {
            this._layout[x][y] = value;
            return true;
        }
    }

    get(x, y) {
        if (typeof x === 'object') {
            y = x.y;
            x = x.x;
        }
        if (this._layout[x] && notEmpty(this._layout[x][y])) {
            return this._layout[x][y];
        }
        else {
            return;
        }
    }

    _initLayout() {
        this._layout = [];
        const size = this.size;
        for (let i = 0; i < size; i++) {
            this._layout[i] = [];
            for (let j = 0; j < size; j++) {
                this._layout[i][j] = 0;
            }
        }
    }

    // toString() {
    //     let rs = [];
    //     for (let i = 0; i < this.size; i++) {
    //         let line = [];
    //         for (let j = 0; j < this.size; j++) {
    //             line.push(map[this._layout[i][j]]);
    //         }
    //         rs.push(line.join(' '));
    //     }
    //     return rs.join('\n');
    // }
};

function notEmpty(value) {
    return value !== null && value !== undefined;
}

module.exports = Board;