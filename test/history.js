/**
* test for history
* @author  YernSun<yernsun@gmail.com>
* @file    history.js
* @version 1.0
*/

const assert = require('assert');

const History = require('../src/js/utils/history');


describe('History', function () {

    // board
    describe('#push', function () {
        it(`push to the stack`, function () {
            const history = new History();
            const item = [1, 2, 3];
            history.push(item);
            assert.equal(item, history.last);
            // assert.equal(0, board.get(position));
        });
    });

    describe('#undo', function () {
        it(`undo `, function () {
            const history = new History();
            const item = [1, 2, 3];
            history.push(item);
            let undo = history.undo();
            assert.equal(item, undo);
        });
    });


    describe('#redo', function () {
        it(`undo `, function () {
            const history = new History();
            const item = [1, 2, 3];
            history.push(item);
            history.undo();
            let undo = history.redo();
            assert.equal(item, undo);
        });
    });
});

