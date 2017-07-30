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
        return this._history.slice(-1)[0];
    }

    get trace() {
        return this._history.map(item => item);
    }

    get length() {
        return this._history.length;
    }

    get cancelLength(){
        return this._cancelHistory.length;
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
        let item = this._cancelHistory.pop();
        if (item !== undefined) {
            this._history.push(item);
        }
        return item;
    }

    clear() {
        this._history = [];
        this._cancelHistory = [];
    }

    get(index){
        return this._history[index];
    }
}

module.exports = History;