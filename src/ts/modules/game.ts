/**
 * Interface for set players score.
 */
interface Score {
    player1 : number;
    player2 : number;
}

export class Game {
    field : number[][];
    sizeField : number = 3;
    score : Score;
    /**
     * Constructor of game, where set main array and players score.
     */
    constructor() {
        this.field = [[-1, -1, -1],
                      [-1, -1, -1],
                      [-1, -1, -1]];
        this.score = {
            player1 : 0,
            player2 : 0
        };
    }
    /**
     * Function to handle the move player.
     * @param i Coordinates for x.
     * @param j Coordinates for y.
     * @returns {any} Boolean : false - when cell is busy. String : "o" | "x" - when cell is free.
     */
    move(i : number, j : number) : boolean | string {
        if(this.field[i][j] === -1) {
            // Выбор игрока
            this.field[i][j] = 1;
            return "x";
        } else {
            return false;
        }
    }
}