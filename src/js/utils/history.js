/**
* history  
* @author  YernSun<yernsun@gmail.com>
* @file    history.js
* @version 1.0
*/

class History {
    /**
     * last item of history
     */
    get last() {
        return this._history.slice(-1);
    }

    get trace() {
        return this._history.map(item => item);
    }

    get length(){
        return this._history.length;
    }

    constructor() {
        this._history = [];
        this._cancelHistory = [];
    }

    push(...item) {
        this._history.push(...item);
        this._cancelHistory = [];
    }

    undo() {
        let item = this._history.pop();
        if (item !== undefined) {
            this._cancelHistory.push(item);
        }
        return item;
    }

    redo() {
        if (this._cancelHistory.length) {
            let item = this._cancelHistory.pop();
            this._cancelHistory.push(item);
        }
    }

    clear(){
        this._history = [];
        this._cancelHistory = [];
    }
}

module.exports = History;