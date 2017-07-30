/**
* offline game 
* @author  YernSun<yernsun@gmail.com>
* @file    offlineGame.js
* @version 1.0
*/

const History = require('./history');

const Board = require('./board');

const render = require('./render');

const toast = require('./toast');

class OfflineGame extends require('events') {

    get boardSize() {
        return Board.boardSize;
    }
    get winSize() {
        return 5;
    }

    get history() {
        return this._history;
    }


    get hand() {
        return this._history.length + 1;
    }

    get render() {
        return this._render;
    }

    get renderEngine() {
        return {
            true: 'Dom',
            false: 'Canvas'
        }[this._render instanceof render.Dom]
    }

    constructor() {
        super();
        this.board = new Board;
        // this.container = document.querySelector(container);
        this._history = new History();

    }

    config({ gameinfo, playboard }) {
        this.$gameinfo = document.querySelector(gameinfo);
        this.$playboard = document.querySelector(playboard);
        this._initEvent();
        this.switchRender();
        return this;
    }

    switchRender() {
        const Render = this._render instanceof render.Dom ? render.Canvas : render.Dom;
        this._render && this._render.destroy();
        this._render = new Render(this.$playboard, this.board);

        document.querySelector('[event="switchRender"]').setAttribute('render', this.renderEngine);

        this._render.on('pick', ({ x, y }, player) => {
            console.log(`${this.history.length + 1} hand ${{ 1: 'black', 2: 'white' }[player]} put on `, x, y);
            this.history.push({ x, y, value: player });
            this.board.putPiece(this.history.last, player);
            this._finishCheck();
        });
        this.history.trace.forEach(({ x, y }) => {
            this._render.draw(x, y);
        });
        return this;
    }

    _finishCheck() {
        const last = this.history.last;
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

        let winLine;
        let win = list.some(line => {
            let current = last;
            let lineCounter = 0;
            winLine = [];
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
                while (value === current.value && counter < this.winSize && winLine.push({ x, y }));
                lineCounter += counter;
            });
            return lineCounter == this.winSize - 1;
        });
        this.render.disableEvents(win);
        if (!win) {
            // draw
            if (Math.pow(this.boardSize) === this._history.length) {
                this.emit('finish');
            }
        }
        else {
            this.emit('finish', {
                winLine,
                player: last.value,
                last
            });
        }

    }

    _initEvent() {
        this.$gameinfo.addEventListener('click', e => {
            let event = e.target.getAttribute('event');
            if (event) {
                this.emit(event);
            }
        });
        this.on('start', () => {
            this._render.clear();
            this._history.clear();
            this.board.clear();
        }).on('redo', () => {
            if (this.history.cancelLength) {
                let last = this.history.redo();
                this.board.putPiece(last, last.value);
                this.render.redo();
                // redo should check the status
                this._finishCheck();
            }

        }).on('undo', () => {
            if (this.history.length) {
                let last = this.history.undo();
                this.board.putPiece(last, 0);
                this.render.undo();
                // undo means that the game is not finish
                this.render.disableEvents(false);
            }
        }).on('switchRender', () => {
            this.switchRender();
        }).on('finish', info => {
            // this.$gameinfo
            if (info) {
                this.render.winLine = info.winLine;
                toast({ 1: '黑', 2: '白' }[info.player] + '棋赢')
            }
            else {
                toast('平局');
            }

        });
    }
    // clear() {
    //     this._render.clear();
    //     this._history.clear();
    // }
}

module.exports = OfflineGame;