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
                    callback(i, context, eventObject.target);
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
    private click(index: number, context : any, el : Object) {
        // Find index in array.
        let i : number = Math.floor(index / context.game.sizeField),
            j : number = index - context.game.sizeField * i,
            // Find result of a player's turn.
            result : any = context.game.move(i, j);
        // If result correct - show.
        if(result !== false) {
            $(el).text(result);
        }
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
                        j : number = context.index - context.game.sizeField * i,
                        // Find result of a player's turn.
                        result : any = context.game.move(i, j);
                    // If result correct - show.
                    if(result !== false) {
                        $(context.elements.cells[context.index]).text(result);
                    }
                    // Set default value.
                    context.index = 4;
                }
                break;
            }
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
}