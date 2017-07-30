/**
* render interface
* @author  YernSun<yernsun@gmail.com>
* @file    base.js
* @version 1.0
*/

const prefix = 'axis';

const addEventListener = window.addEventListener ? 'addEventListener' : 'attachEvent';

const EventEmiter = require('events');

const piece = require('./image');

const History = require('../history');

// 渲染引擎
class Render extends EventEmiter {
    static get prefix() {
        return prefix;
    }
    static get size() {
        return this._board.size;
    }
    get size() {
        return this._board.size;
    }

    get prefix() {
        return;
    }

    get history() {
        return this._history;
    }

    get player() {
        return this._history.length % 2 + 1;
    }

    // set winLine(value){
    //     if (winLine) {

    //     }
    // }

    constructor(container, board) {
        super();
        this._board = board;
        this._history = new History;
        this._domEvents = [];
        if (typeof container === 'string') {
            this.container = document.querySelector(container);
        }
        else {
            this.container = container;
        }

        this.clear();
        this._initEvent();

        this._domEvents.forEach(([dom, event, listener]) => {
            dom.addEventListener(event, (...arg) => {
                if (!this._disableEvents) {
                    listener(...arg);
                }
            }, true);
        });
    }

    /**
     * interface
     */
    _clear() {

    }

    clear() {
        this._disableEvents = false;
        this._history.clear();
        this._clear();
    }


    /**
     * interface
     * @param {number} x 
     * @param {number} y 
     */
    _draw(x, y) {

    }

    draw(x, y) {
        this._draw(x, y);
    }

    disableEvents(status) {
        this._disableEvents = status;
    }
    /**
     * destory and release the event resource
     */
    destroy() {
        this._domEvents.forEach(([dom, ...args]) => {
            dom.removeEventListener && dom.removeEventListener(...args);
        })
    }
}

module.exports = Render;