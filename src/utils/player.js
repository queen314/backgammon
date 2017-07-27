/**
 * 
 * @authors  YernSun(yernsun@gmail.com)
 * @date    2017-07-27 23:36:26
 * @version 
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