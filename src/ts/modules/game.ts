/**
 * Interface for set players score.
 */
interface Score {
    player1 : number;
    player2 : number;
}
interface Players {
    player1 : string;
    player2 : string;
}
export class Game {
    // 1 - x, -1 - o, 0 - null.
    field : number[][];
    sizeField : number = 3;
    score : Score;
    players : Players;
    // player1 - 0, player2 - 1.
    whoseMove : number;
    countOfMove : number;
    /**
     * Constructor of game, where set main array and players score.
     */
    constructor() {
        // 1 - x, 0 - o, -1 - null.
        this.field = [[0, 0, 0],
                      [0, 0, 0],
                      [0, 0, 0]];
        this.score = {
            player1 : 0,
            player2 : 0
        };
        this.startGame();
    }
    private startGame() {
        if(Math.random() > 0.5) {
            this.players = {
                player1 : "x",
                player2 : "o",
            };
            // Player1 start the game.
            this.whoseMove = 0;
        } else {
            this.players = {
                player1 : "o",
                player2 : "x",
            };
            // Player2 start the game.
            this.whoseMove = 1;
        }
        this.countOfMove = 0;
    }
    private check() : boolean | string {
        // если есть еще куда ходить
        if (this.countOfMove <= (this.sizeField * this.sizeField)) {
            // если больше 5 ходов
            if (this.countOfMove >= 5) {
                let horizontal : number, vertical : number,
                    // диагональ вида \
                    diagonalL : number,
                    // диагональ вида /
                    diagonalR : number;
                // проверяем на выиграш
                for (let i = 0; i < this.sizeField; ++i) {
                    horizontal = 0;
                    vertical = 0;
                    diagonalL = 0;
                    diagonalR = 0;
                    for (let j = 0; j < this.sizeField; ++j) {
                        // проверяем горизонтали
                        horizontal += this.field[i][j];
                        // проверяем вертикали
                        vertical += this.field[j][i];
                        // диагональ направо
                        diagonalL += this.field[j][j];
                        // диагональ налево
                        diagonalR += this.field[j][this.sizeField - j - 1];

                    }
                    // если в горизонтале насчитали 3 илли -3 возвращаем горизонталь
                    // если в горизонтале нет ничего подобного проверяем вертикаль по такому же принципу
                    // если ничего не нашли проверяем диагональ \
                    // если ничего не нашли проверяем диагональ /
                    // в других случаях(нет выигравшего) возврщаем ноль
                    let temp = Math.abs(horizontal) === this.sizeField ?
                        horizontal : Math.abs(vertical) === this.sizeField ?
                        vertical : Math.abs(diagonalL) === this.sizeField ?
                        diagonalL : Math.abs(diagonalR) === this.sizeField ?
                        diagonalR : 0;
                    // если есть победитель
                    if (temp != 0) {
                        console.log("win");
                        // temp === this.sizeField ? setTimeout(windowEndGame, 800, "you won", "rgba(0, 255, 0, 0.5)") : setTimeout(windowEndGame, 800, "toe win", "rgba(255, 0, 0, 0.5)");
                        break;
                    }
                }
            }
            // если все походили(клеток на поле не осталось)
            if (this.countOfMove === this.sizeField)
            {
                console.log("no");
                // заканчиваем игру
                // setTimeout(windowEndGame, 800, "draw", "rgba(0, 0, 0, 0.5)");
            }
        }
    }
    /**
     * Function to handle the move player.
     * @param i Coordinates for x.
     * @param j Coordinates for y.
     * @returns {any} Boolean : false - when cell is busy. String : "o" | "x" - when cell is free.
     */
    move(i : number, j : number) : boolean | string {
        if(this.field[i][j] === 0) {
            // Fill the array.
            this.field[i][j] = this.whoseMove === 0 ? // Select player
                (this.players.player1 === "x" ? 1 : -1) : // Select "x" or "o" for set in array player1 moves
                (this.players.player2 === "x" ? 1 : -1); // Select "x" or "o" for set in array player2 moves
            // Change next player.
            this.whoseMove ^= 1;
            // If we made move increasing counter
            ++this.countOfMove;
            this.check();
            // this.whoseMove === 1 - invert, because we change next player above.
            return this.whoseMove === 1 ? this.players.player1 : this.players.player2;
        } else {
            return false;
        }
    }
}