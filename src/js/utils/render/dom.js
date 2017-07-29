/**
* Dom render
* @author  YernSun<yernsun@gmail.com>
* @file    dom.js
* @version 1.0
*/
const Render =  require('./base') 
const prefix = Render.prefix;
class Dom extends Render{
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
        this.container.addEventListener('click', e => {
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

module.exports = Dom;