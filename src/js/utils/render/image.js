/**
* image loader
* @author  YernSun<yernsun@gmail.com>
* @file    image.js
* @version 1.0
*/

let white = document.createElement('img');

let black = document.createElement('img');
white.src = require('../../../images/black.png');
black.src = require('../../../images/white.png');
module.exports = {
    white,
    black
};