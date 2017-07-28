
const prefix = 'axis';
// 渲染引擎
class Render {

    get size() {
        return this._board.size;
    }

    get prefix() {
        return;
    }
    constructor(container, board) {
        this._board = board;
        if (typeof container === 'string' ){
            this.container = document.querySelector(container);
        }
        this.initLayout();
    }
    initLayout() {

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

class Dom extends Render{

    initLayout() {
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
    toString() {

    }
}

class Canvas {

}

module.exports = {
    Dom,
    // Render,
    Canvas
}