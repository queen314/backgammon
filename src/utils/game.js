

class Game {
    constructor() {
        this._players = [];
    }
    /**
     * add player to the game
     * @param {Player} players 
     */
    addPlayer(...players) {
        players.forEach((player) => {
            if (this._canJoin(player)) {
                this._players.push(player);
            }
        });

    }

    put({ x, y }) {
        
    }

    isFinish() {

    }

    _canJoin(player) {
        return true;
    }
}