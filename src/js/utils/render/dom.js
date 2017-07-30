/**
* Dom render
* @author  YernSun<yernsun@gmail.com>
* @file    dom.js
* @version 1.0
*/
const Render = require('./base')
const prefix = Render.prefix;
class Dom extends Render {
    clear() {
        this._history.clear();
        const size = this.size;
        const doms = [];
        for (let y = 0; y < size; y++) {
            let className = y === size - 1 ? `${prefix}-item-bottom` : '';
            for (let x = 0; x < size; x++) {
                className = x === size - 1 ? `${prefix}-item-right ${className}` : className;
                doms.push(`<div class="${prefix}-item ${className}" id="axis-${x}-${y}"></div>`);
            }
        }
        this.container.className = '';
        // let listContainer = document.createElement('div');
        // listContainer.innerHTML = doms.join('');

        this.container.innerHTML = `<div class="${prefix}-container">${doms.join('')}</div>`;
    }

    draw(x, y) {
        this._getElement(x,y).setAttribute('player', this.player);
        this.history.push({ x, y ,value: this.player});
    }

    _getElement(x, y) {
        return document.getElementById(`${prefix}-${x}-${y}`);
    }
    undo() {
        let last = this.history.undo();
        this._getElement(last.x,last.y).removeAttribute('player');

    }

    redo() {
        let last = this.history.redo();
        this._getElement(last.x,last.y).setAttribute('player',last.value);
    }

    _initEvent() {
        this.container.querySelector('.axis-container').addEventListener('click', e => {
            let currentPlayer = this.player;
            const el = e.target;
            if (el.getAttribute('player')) {
                return;
            }
            let match = String(e.target.id).match(new RegExp(`^${prefix}-(\\d+)-(\\d+)$`));
            if (match) {
                let [_, x, y] = match.map(item => Number(item));

                this.emit('pick', { x, y }, this.player);
                this.draw(x, y);
                
                
            }
        });
    }

}

module.exports = Dom;