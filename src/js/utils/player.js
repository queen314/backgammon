/**
* 
* @author  YernSun<yernsun@gmail.com>
* @file    player.js
* @version 1.0
*/


class Player {

    constructor(userInfo) {
        this.userInfo = userInfo;
    }
    
    click(x, y) {
        this._game.set({ x, y }, this);
    }

    join(game) {
        this._game = game;
    }

    toString() {

    }
    valueOf() {

    }
}

module.exports = Player;