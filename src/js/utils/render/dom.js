/**
* Dom render
* @author  YernSun<yernsun@gmail.com>
* @file    dom.js
* @version 1.0
*/
const Render = require('./base')
const prefix = Render.prefix;
class Dom extends Render {


    set winLine(value) {
        const className = 'win-line';
        if (value && value.length) {

            value.forEach(({ x, y }) => {
                this._getElement(x, y).classList.add(className);
            });
        }
        else {
            document.querySelectorAll(`.${className}`).forEach(el => {
                el.classList.remove(className);
            })
        }
    }

    _clear() {
        const size = this.size;
        const doms = [];
        for (let y = 0; y < size; y++) {
            let className = y === size - 1 ? `${prefix}-item-bottom` : '';
            for (let x = 0; x < size; x++) {
                className = x === size - 1 ? `${prefix}-item-right ${className}` : className;
                doms.push(`<div class="${prefix}-item ${className}" id="axis-${x}-${y}"><i></i></div>`);
            }
        }
        this.container.className = '';
        // let listContainer = document.createElement('div');
        // listContainer.innerHTML = doms.join('');

        this.container.innerHTML = `<div class="${prefix}-container">${doms.join('')}</div>`;


    }

    _draw(x, y) {
        const el = this._getElement(x, y);
        el.setAttribute('player', this.player);
        this._setLastHand(x, y);
        this.history.push({ x, y, value: this.player });
    }

    _setLastHand(x, y) {
        const lastHand = 'last-hand';
        let last = this.container.querySelector(`.${lastHand}`);
        if (last) {
            last.classList.remove(lastHand);
        }
        this._getElement(x, y).classList.add(lastHand);
    }

    _getElement(x, y) {
        return document.getElementById(`${prefix}-${x}-${y}`);
    }

    undo() {
        let last = this.history.undo();
        this._getElement(last.x, last.y).removeAttribute('player');
        let current = this.history.last;
        if (current) {
            this._setLastHand(current.x, current.y);
        }
        this.winLine = [];
    }

    redo() {
        let last = this.history.redo();
        this._getElement(last.x, last.y).setAttribute('player', last.value);
        this._setLastHand(last.x, last.y);
    }

    _initEvent() {
        this._addDomEvent(
            this.container,
            'click', e => {
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
            }
        );
    }

}

module.exports = Dom;