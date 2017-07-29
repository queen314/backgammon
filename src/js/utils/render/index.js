/**
* Render for client
* @author  YernSun<yernsun@gmail.com>
* @file    index.js
* @version 1.0
*/

const prefix = 'axis';

const addEventListener = window.addEventListener ? 'addEventListener' : 'attachEvent';

const EventEmiter = require('events');

const piece = require('./image');

// 渲染引擎
class Render extends EventEmiter {

    static get size() {
        return this._board.size;
    }
    get size() {
        return this._board.size;
    }

    get prefix() {
        return;
    }
    constructor(container, board) {
        super();
        this._board = board;
        if (typeof container === 'string') {
            this.container = document.querySelector(container);
        }
        this._initEvent();
        this.clear();
    }

    clear() {

    }
    click(pos, type) {
        // 操作
        if (type) {

        }
        // 取消操作
        else {

        }
    }
}

class Dom extends Render {

    clear() {
        const size = this.size;
        const doms = [];
        for (let x = 0; x < size; x++) {
            let className = x === size - 1 ? `${prefix}-item-bottom` : '';
            for (let y = 0; y < size; y++) {
                className = y === size - 1 ? `${prefix}-item-right ${className}` : className;
                doms.push(`<div class="${prefix}-item ${className}" id="axis-${x}-${y}"></div>`);
            }
        }

        // let listContainer = document.createElement('div');
        // listContainer.innerHTML = doms.join('');

        this.container.innerHTML = `<div class="${prefix}-container">${doms.join('')}</div>`;

    }

    _initEvent() {
        let counter = 0;
        this.container[addEventListener]('click', e => {
            const el = e.target;
            if (el.getAttribute('player')) {
                return;
            }
            let match = String(e.target.id).match(new RegExp(`^${prefix}-(\\d+)-(\\d+)$`));
            if (match) {
                let [_, x, y] = match.map(item => Number(item));
                this.emit('pick', { x, y });
                el.setAttribute('player', counter++ % 2 + 1);
            }
        });
    }

}


class Canvas extends Render {
    clear() {
        this.container.classList.add('canvas-container');
        this.canvas = document.createElement('canvas');
        this.width = this.container.offsetWidth;
        const size = this.size;
        // scale 2.0 to avoid line vague
        const width = this.canvas.height = this.canvas.width = this.width * 2;
        // canvas.height = this.container.offsetHeight;
        const space = ~~(width / size);
        this.space = ~~(space / 2);
        this.container.appendChild(this.canvas);
        let ctx = this.canvas.getContext('2d');

        const margin = ~~(space / 2);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.square = "butt";
        for (let x = 0; x < size; x++) {
            // horizontal
            ctx.moveTo(margin, x * space + margin);
            ctx.lineTo(width - margin, x * space + margin);
            // Vertical
            ctx.moveTo(x * space + margin, margin);
            ctx.lineTo(x * space + margin, width - margin);
        }

        for (let x = 0; x < size; x++) {
            ctx.drawImage(piece.white, 100, 100);
        }

        ctx.stroke();
    }

    _initLayout() {

    }

    _initEvent() {
        this.container[addEventListener]('click', e => {
            if (e.target === this.canvas) {
                let offset = this._getOffset(e.layerX, e.layerY);
                this.emit('pick', offset);
            }
        });
    }

    _getOffset(x, y) {
        return {
            x: parseInt(x / this.space),
            y: parseInt(y / this.space)
        };
    }
}
module.exports = {
    Dom,
    // Render,
    Canvas
}