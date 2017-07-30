/**
* client of game
* @author  YernSun<yernsun@gmail.com>
* @file    client.js
* @version 1.0
*/

require('normalize.css');
require('../css/style.styl');


const ChessGame = require('./utils/offlineGame');



new ChessGame().config({
    playboard:'#playboard',
    gameinfo: '#gameinfo'
}).on('finish',e=>{
    console.log(e);
});