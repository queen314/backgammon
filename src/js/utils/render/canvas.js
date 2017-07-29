/**
* Canvas render
* @author  YernSun<yernsun@gmail.com>
* @file    canvas.js
* @version 1.0
*/


const piece = require('./image');

class Canvas extends require('./base') {
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

        ctx.stroke();
        this.canvasCtx = ctx;
        this.history.clear();
    }

    _initLayout() {

    }

    set(x, y) {
        const size = 2 * this.space;
        x = x * size;
        y = y * size;
        this.history.push([this.canvasCtx.getImageData(x, y, size, size),x,y]);
        let image = this.history.length % 2 ? piece.black : piece.white;
        this.canvasCtx.drawImage(image, x, y, size, size);
    }



    _initEvent() {
        let counter = 0;
        this.container.addEventListener('click', e => {
            if (e.target === this.canvas) {
                let offset = this._getOffset(e.layerX, e.layerY);
                this.emit('pick', offset);
                this.set(offset.x, offset.y);
            }
        });
        this.container.addEventListener('mousemove', e => {
            e.target.style.cursor = 'pointer';
        });
    }



    _getOffset(x, y) {
        return {
            x: parseInt(x / this.space),
            y: parseInt(y / this.space)
        };
    }
}

module.exports = Canvas;