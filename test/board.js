

/**
* unit test
* @author  YernSun<yernsun@gmail.com>
* @file    index.js
* @version 1.0
*/

const assert = require('assert');
const Board = require('../src/utils/board');

describe('board', function () {
    const board = new Board();
    const position = { x: 1, y: 1 };
    const positionValue = 2;
    // board
    describe('#get', function () {
        it(`should be 0 if the position of ${JSON.stringify(position)} is not put piece`, function () {
            assert.equal(0, board.get(position));
        });
    });
    // board
    describe('#put piece to an empty position', function () {
        it(`should be true if the position of ${JSON.stringify(position)} havn't been put any piece`, function () {
            assert.equal(true, board.putPiece(position, positionValue));
            assert.equal(positionValue, board.get(position));
        });
    });
    describe('#get putted piece', function () {
        it(`should be ${positionValue} if the position of ${JSON.stringify(position)} is not put piece`, function () {
            assert.equal(positionValue, board.get(position));
        });
    });

    describe('#put piece to same position', function () {
        it(`should be false if the position of ${JSON.stringify(position)} is not put piece`, function () {
            assert.equal(false, board.putPiece(position, positionValue));
        });
    });


    describe('#put piece out of range', function () {
        it(`should be false if the position is out of range`, function () {
            assert.equal(false, board.putPiece({ x: 1, y: 15 }, positionValue));
        });
    });
});

