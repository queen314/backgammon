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
}).switchRender().switchRender().switchRender().switchRender().on('finish', info => {
    if (info) {
        toast({ 1: '黑', 2: '白' }[info.player] + '棋赢')
    }
    else {
        toast('平局');
    }
}).on('pick',({x,y,player,hand})=>{
      console.log(`${hand} hand ${{ 1: 'black', 2: 'white' }[player]} put on `, x, y);
      document.querySelector('.hand-info').innerHTML = 
      `第${hand}手 ${{ 1: '黑', 2: '白' }[player]} ${x}-${y}`;
}).on('redo',()=>{
    document.querySelector('.hand-info').innerHTML = 
      `取消悔棋`;
}).on('undo',()=>{
    document.querySelector('.hand-info').innerHTML = 
      `悔棋`;
});