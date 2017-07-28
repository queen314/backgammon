/**
* unit test
* @author  YernSun<yernsun@gmail.com>
* @file    index.js
* @version 1.0
*/

var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

