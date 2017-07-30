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

        const size = this.size;
        this.width = this.container.offsetWidth;
        // scale 2.0 to avoid line vague
        const width = this.width * 2;
        const space = ~~(width / size);
        this.space = ~~(space / 2);

        this.container.innerHTML = `<canvas width="${width}" height="${width}"></canvas><div class="pointer"></div>`;
        this.canvas = this.container.querySelector('canvas');

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


    draw(x, y) {
        const size = 2 * this.space;
        x = x * size;
        y = y * size;
        let undo = [this.canvasCtx.getImageData(x, y, size, size), x, y];
        let image = this.history.length % 2 ? piece.white : piece.black;
        this.canvasCtx.drawImage(image, x, y, size, size);
        this.history.push({ undo, redo: [this.canvasCtx.getImageData(x, y, size, size), x, y] });

    }

    undo() {
        let last = this.history.undo();
        this.canvasCtx.putImageData(...last.undo);
    }

    redo() {
        let last = this.history.redo();
        this.canvasCtx.putImageData(...last.redo);
    }

    _initEvent() {
        this._domEvents.push([
            this.container,
            'click',
            e => {
                if (e.target === this.canvas) {
                    let offset = this._getOffset(e.layerX, e.layerY);
                    if (this._board.get(offset) === 0) {
                        this.emit('pick', offset, this.player);
                        this.draw(offset.x, offset.y);
                    }

                }
            }
        ]);
        this._domEvents.push([
            this.container,
            'mousemove',
            e => {
                let offset = this._getOffset(e.layerX, e.layerY);
                if (this._board.get(offset) === 0) {
                    e.target.style.cursor = 'pointer';
                    // this.container.querySelector('.pointer').style.left = offset.x * this.space + 'px';
                    // this.container.querySelector('.pointer').style.top = offset.y * this.space + 'px';
                }
                else {
                    e.target.style.cursor = 'not-allowed';
                }
            }
        ]);

        // this.container.addEventListener('click', e => {
        //     if (e.target === this.canvas) {
        //         let offset = this._getOffset(e.layerX, e.layerY);
        //         if (this._board.get(offset) === 0) {
        //             this.emit('pick', offset, this.player);
        //             this.draw(offset.x, offset.y);
        //         }

        //     }
        // });
        // change mouse cursor type
        // this.container.addEventListener('mousemove', e => {
        //     let offset = this._getOffset(e.layerX, e.layerY);
        //     if (this._board.get(offset) === 0) {
        //         e.target.style.cursor = 'pointer';
        //         // this.container.querySelector('.pointer').style.left = offset.x * this.space + 'px';
        //         // this.container.querySelector('.pointer').style.top = offset.y * this.space + 'px';
        //     }
        //     else {
        //         e.target.style.cursor = 'not-allowed';
        //     }
        // });
    }

    _getOffset(x, y) {
        return {
            x: parseInt(x / this.space),
            y: parseInt(y / this.space)
        };
    }
}

module.exports = Canvas;