/**
* client of game
* @author  YernSun<yernsun@gmail.com>
* @file    client.js
* @version 1.0
*/

require('normalize.css');
require('../css/style.styl');

const toast = require('./utils/toast');

const ChessGame = require('./utils/offlineGame');





new ChessGame().config({
    playboard: '#playboard',
    gameinfo: '#gameinfo'
}).switchRender().on('finish', info => {
    if (info) {
        toast({ 1: '黑', 2: '白' }[info.player] + '棋赢')
    }
    else {
        toast('平局');
    }
});