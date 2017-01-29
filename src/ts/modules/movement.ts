import { Game } from "../modules/game"

interface Elements {
    cells : JQuery;
    body : JQuery;
}

export class Movement {
    game : Game;
    elements : Elements;
    // u - up, d - down, l - left, r - right, s - set
    //                     u   d   l   r   s
    keyCodes : number[] = [87, 83, 65, 68, 90, // wasd
                           38, 40, 37, 39, 48, 96, 45]; // arrow
    index : number = 4;
    /**
     * Constructor.
     * @param _game Class where defined "game rules".
     */
    constructor(_game : Game) {
        this.initElements();
        this.game = _game;
        this.playersInfo(this);
    }
    /**
     * Init element for set event listener.
     */
    private initElements() {
        // Init elements.
        this.elements = {
            cells : $("[data-cell]"),
            body : $("body")
        };
        // Set event listener.
        this.elements.cells.each((i, el) => {
            this.listenClick(el, this.click, this);
        });
        this.listenKeyUp(this.elements.body, this.moving, this);
    }
    /**
     * Set click event listener.
     * @param el Element for set event listener.
     * @param callback Function for processing.
     * @param context Context of "Movement".
     */
    private listenClick(el : Object, callback : any, context : any) {
        $(el).on("click", (eventObject : JQueryEventObject) => {
            this.elements.cells.each((i, el) => {
                if(el === eventObject.target) {
                    callback(i, context);
                }
            });
        });
    }
    /**
     * Set keyUp event listener.
     * @param el Element for set event listener.
     * @param callback Function for processing.
     * @param context Context of "Movement".
     */
    private listenKeyUp(el : Object, callback : any, context : any) {
        $(el).on("keyup", (e : JQueryEventObject) => {
            callback(e.keyCode, context);
        });
    }
    /**
     * When click on element.
     */
    private click(index: number, context : any) {
        // Find index in array.
        let i : number = Math.floor(index / context.game.sizeField),
            j : number = index - context.game.sizeField * i;
        context.put(i, j, context);
    }
    /**
     * When move to element.
     * @param keyCode Key code of pressed button.
     */
    private moving(keyCode : number, context : any) {
        for(let code of context.keyCodes) {
            if(keyCode === code) {
                // up
                if((keyCode === 87) || (keyCode === 38)) {
                    context.checkIndex(-3, context);
                }
                // down
                if((keyCode === 83) || (keyCode === 40)) {
                    context.checkIndex(3, context);
                }
                // left
                if((keyCode === 65) || (keyCode === 37)) {
                    context.checkIndex(-1, context);
                }
                // right
                if((keyCode === 68) || (keyCode === 39)) {
                    context.checkIndex(1, context);
                }
                // set
                if((keyCode === 90) || (keyCode === 48) || (keyCode === 96) || (keyCode === 45)) {
                    // "UnShow" previous element.
                    context.unRender(context.index);
                    // Find index in array.
                    let i : number = Math.floor(context.index / context.game.sizeField),
                        j : number = context.index - context.game.sizeField * i;
                        // Find result of a player's turn.
                    context.put(i, j, context);

                    // Set default value.
                    context.index = 4;
                }
                break;
            }
        }
    }
    /**
     *
     * @param i
     * @param j
     * @param context
     */
    private put(i, j, context) {
        let result : any = context.game.move(i, j);
        if(result !== false) {
            $(context.elements.cells[i * context.game.sizeField + j]).text(result);
        }
        if(context.game.check() || context.game.endGame) {
            // If someone win.
            context.playersInfo(context);

            // отобразить выигрыш - подсветка
            // установить задержку

            setTimeout(() => {
                context.clearTable(context);
                context.game.startGame();
                context.playersInfo(context);
            }, 1000);
        }
    }
    /**
     * Check index
     * @param shift The number of shifts.
     * @param context Context of "Movement".
     */
    private checkIndex(shift : number, context : any) {
        // If index is within the bounds [0..8] - 9 elements.
        if(context.index + shift < 9 && context.index + shift >= 0) {
            // "UnShow" previous selected element.
            context.unRender(context.index);
            // Find new index.
            context.index += shift;
            // Show new element.
            context.render(context.index);
        }
    }
    /**
     * Show element with index.
     * @param index Index of showing element.
     */
    private render(index : number) {
        $(this.elements.cells[index]).addClass("selected");
    }
    /**
     * "UnShow" element with index.
     * @param index Index of showing element.
     */
    private unRender(index : number) {
        $(this.elements.cells[index]).removeClass("selected");
    }
    /**
     * Clear text in table cells.
     * @param context Context of "Movement".
     */
    private clearTable(context : any) {
        context.elements.cells.each((i, el) => {
            $(el).text("");
        });
    }
    /**
     * Show users score.
     * @param context Context of "Movement".
     */
    private playersInfo(context : any) {
        // console.log(context.game.score);
        $("[data-player1]").text("Player 1(" + context.game.players.player1 + "): " + context.game.score.player1);
        $("[data-player2]").text("Player 2(" + context.game.players.player2 + "): " + context.game.score.player2);
    }
}