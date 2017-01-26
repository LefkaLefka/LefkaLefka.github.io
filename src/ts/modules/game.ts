export class Game {
    field : number[][];
    sizeField : number = 3;
    score = {
        player1 : number = 0,
        player2 : number = 0
    };
    constructor() {
        let field : number[][] = [[-1, -1, -1],
                                  [-1, -1, -1],
                                  [-1, -1, -1]];
        this.field = field;
    }
    move(i : number, j : number) : boolean | string {
        // this.score.player1++;
        if(this.field[i][j] === -1) {
            // Выбор игрока
            this.field[i][j] = 1;
            return "x";
        } else {
            return false;
        }
    }
}