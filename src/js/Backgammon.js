const chessboardSize = 15;

const time = 100;

class Chessman {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return [this.x, this.y].join(',');
    }
}

class ChessGame {

    constructor(player) {
        this._layout = [];
        for (let i = 0; i++; i < chessboardSize) {

        }
        // this._layout
    }
    _initLayout() {

    }
    // 复盘
    load() {

    }
    // 结束算法
    isFinish() {

    }
    isWin() {

    }
}

class FiveChessGame extends ChessGame {

    isWin() {

    }
}

// 渲染引擎
class Render {

    initPlayboard() {

    }
    click(pos, type) {
        // 操作
        if (type) {

        }
        // 取消操作
        else {

        }
    }
}

// dom渲染引擎
class DomRender {

}

// Canvas渲染引擎
class CanvasRender {

}

// class
class Player {

    constructor(userInfo) {
        this.userInfo = userInfo;
    }
    action() {

    }
    toString() {

    }
}