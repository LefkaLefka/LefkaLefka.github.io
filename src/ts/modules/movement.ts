import { Game } from "../modules/game"

interface Elements {
    cells : JQuery;
    body : JQuery;
}

export class Movement {
    game : Game;
    elements : Elements;
    keyCodes : number[] = [87, 119, 65, 97, 83, 115, 68, 100, 37, 38, 39, 40];
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
        let i : number = Math.floor(index / context.game.sizeField);
        let j : number = index - context.game.sizeField * i;
        let result : any = context.game.move(i, j);
        if(result !== false) {
            // console.log(el);
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
                console.log(keyCode);
                break;
            }
        }
        // console.log(context.game);
    }
}