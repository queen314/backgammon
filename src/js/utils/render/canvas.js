/**
* Canvas render
* @author  YernSun<yernsun@gmail.com>
* @file    canvas.js
* @version 1.0
*/


const piece = require('./image');

class Canvas extends require('./base') {

    _clear() {
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
        ctx.save();
        ctx.stroke();
        this.canvasCtx = ctx;

    }


    _draw(x, y) {
        const size = 2 * this.space;

        x = x * size;
        y = y * size;

        let undo = [this.canvasCtx.getImageData(x, y, size, size), x, y];
        let image = this.history.length % 2 ? piece.white : piece.black;
        this.canvasCtx.drawImage(image, x, y, size, size);
        let redo = [this.canvasCtx.getImageData(x, y, size, size), x, y];

        this.history.push({ undo, redo });
        this._setLastHand(x, y);
    }

    _setLastHand() {
        let last = this.history.get(this.history.length - 2);
        let ctx = this.canvasCtx;
        const current = this.history.last;

        const fillSize = 10;
        if (last) {
            ctx.putImageData(...last.redo);
            // console.log(last.redo[1] / this.space / 2, last.redo[2] / this.space / 2);
        }
        if (current) {
            const [_, x, y] = current.redo;
            ctx.fillStyle = 'red';
            ctx.fillRect(x + this.space - fillSize / 2, y + this.space - fillSize / 2, fillSize, fillSize);

        }

    }

    undo() {
        let last = this.history.undo();
        this.canvasCtx.putImageData(...last.undo);
        this._setLastHand();

    }

    redo() {
        let last = this.history.last;
        let current = this.history.redo();
        this.canvasCtx.putImageData(...current.redo);
        // let [_, x, y] = current.undo;
        this._setLastHand();

    }

    _initEvent() {
        this._addDomEvent(
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
        );
        this._addDomEvent(
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
        );

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