(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var movement_1 = require("../ts/modules/movement");
var game_1 = require("../ts/modules/game");
var game = new game_1.Game();
new movement_1.Movement(game);
},{"../ts/modules/game":2,"../ts/modules/movement":3}],2:[function(require,module,exports){
"use strict";
var Game = (function () {
    /**
     * Constructor of game, where set main array and players score.
     */
    function Game() {
        this.sizeField = 3;
        this.field = [[-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]];
        this.score = {
            player1: 0,
            player2: 0
        };
    }
    /**
     * Function to handle the move player.
     * @param i Coordinates for x.
     * @param j Coordinates for y.
     * @returns {any} Boolean : false - when cell is busy. String : "o" | "x" - when cell is free.
     */
    Game.prototype.move = function (i, j) {
        if (this.field[i][j] === -1) {
            // Выбор игрока
            this.field[i][j] = 1;
            return "x";
        }
        else {
            return false;
        }
    };
    return Game;
}());
exports.Game = Game;
},{}],3:[function(require,module,exports){
"use strict";
var Movement = (function () {
    /**
     * Constructor.
     * @param _game Class where defined "game rules".
     */
    function Movement(_game) {
        // u - up, d - down, l - left, r - right, s - set
        //                     u   d   l   r   s
        this.keyCodes = [87, 83, 65, 68, 90,
            38, 40, 37, 39, 48, 96, 45]; // arrow
        this.index = 4;
        this.initElements();
        this.game = _game;
    }
    /**
     * Init element for set event listener.
     */
    Movement.prototype.initElements = function () {
        var _this = this;
        // Init elements.
        this.elements = {
            cells: $("[data-cell]"),
            body: $("body")
        };
        // Set event listener.
        this.elements.cells.each(function (i, el) {
            _this.listenClick(el, _this.click, _this);
        });
        this.listenKeyUp(this.elements.body, this.moving, this);
    };
    /**
     * Set click event listener.
     * @param el Element for set event listener.
     * @param callback Function for processing.
     * @param context Context of "Movement".
     */
    Movement.prototype.listenClick = function (el, callback, context) {
        var _this = this;
        $(el).on("click", function (eventObject) {
            _this.elements.cells.each(function (i, el) {
                if (el === eventObject.target) {
                    callback(i, context, eventObject.target);
                }
            });
        });
    };
    /**
     * Set keyUp event listener.
     * @param el Element for set event listener.
     * @param callback Function for processing.
     * @param context Context of "Movement".
     */
    Movement.prototype.listenKeyUp = function (el, callback, context) {
        $(el).on("keyup", function (e) {
            callback(e.keyCode, context);
        });
    };
    /**
     * When click on element.
     */
    Movement.prototype.click = function (index, context, el) {
        var i = Math.floor(index / context.game.sizeField);
        var j = index - context.game.sizeField * i;
        var result = context.game.move(i, j);
        if (result !== false) {
            $(el).text(result);
        }
    };
    /**
     * When move to element.
     * @param keyCode Key code of pressed button.
     */
    Movement.prototype.moving = function (keyCode, context) {
        for (var _i = 0, _a = context.keyCodes; _i < _a.length; _i++) {
            var code = _a[_i];
            if (keyCode === code) {
                // up
                if ((keyCode === 87) || (keyCode === 38)) {
                    context.checkIndex(-3, context);
                }
                // down
                if ((keyCode === 83) || (keyCode === 40)) {
                    context.checkIndex(3, context);
                }
                // left
                if ((keyCode === 65) || (keyCode === 37)) {
                    context.checkIndex(-1, context);
                }
                // right
                if ((keyCode === 68) || (keyCode === 39)) {
                    context.checkIndex(1, context);
                }
                // set
                if ((keyCode === 90) || (keyCode === 48) || (keyCode === 96) || (keyCode === 45)) {
                    context.unRender(context.index);
                    $(context.elements.cells[context.index]).text("x");
                    context.index = 4;
                }
                break;
            }
        }
    };
    /**
     * Check index
     * @param shift The number of shifts.
     * @param context Context of "Movement".
     */
    Movement.prototype.checkIndex = function (shift, context) {
        // If index is within the bounds [0..8] - 9 elements.
        if (context.index + shift < 9 && context.index + shift >= 0) {
            // "UnShow" previous selected element.
            context.unRender(context.index);
            // Find new index.
            context.index += shift;
            // Show new element.
            context.render(context.index);
        }
    };
    /**
     * Show element with index.
     * @param index Index of showing element.
     */
    Movement.prototype.render = function (index) {
        $(this.elements.cells[index]).addClass("selected");
    };
    /**
     * "UnShow" element with index.
     * @param index Index of showing element.
     */
    Movement.prototype.unRender = function (index) {
        $(this.elements.cells[index]).removeClass("selected");
    };
    return Movement;
}());
exports.Movement = Movement;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvbWFpbi50cyIsInNyYy90cy9tb2R1bGVzL2dhbWUudHMiLCJzcmMvdHMvbW9kdWxlcy9tb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxtREFBaUQ7QUFDakQsMkNBQXlDO0FBRXpDLElBQUksSUFBSSxHQUFVLElBQUksV0FBSSxFQUFFLENBQUM7QUFDN0IsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUNJbkI7SUFJSTs7T0FFRztJQUNIO1FBTEEsY0FBUyxHQUFZLENBQUMsQ0FBQztRQU1uQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsT0FBTyxFQUFHLENBQUM7WUFDWCxPQUFPLEVBQUcsQ0FBQztTQUNkLENBQUM7SUFDTixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxtQkFBSSxHQUFKLFVBQUssQ0FBVSxFQUFFLENBQVU7UUFDdkIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsZUFBZTtZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FB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VUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNEOzs7T0FHRztJQUNLLDJCQUFRLEdBQWhCLFVBQWlCLEtBQWM7UUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FuSUEsQUFtSUMsSUFBQTtBQW5JWSw0QkFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBNb3ZlbWVudCB9IGZyb20gXCIuLi90cy9tb2R1bGVzL21vdmVtZW50XCJcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi90cy9tb2R1bGVzL2dhbWVcIlxyXG5cclxubGV0IGdhbWUgOiBHYW1lID0gbmV3IEdhbWUoKTtcclxubmV3IE1vdmVtZW50KGdhbWUpOyIsIi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIHNldCBwbGF5ZXJzIHNjb3JlLlxyXG4gKi9cclxuaW50ZXJmYWNlIFNjb3JlIHtcclxuICAgIHBsYXllcjEgOiBudW1iZXI7XHJcbiAgICBwbGF5ZXIyIDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICBmaWVsZCA6IG51bWJlcltdW107XHJcbiAgICBzaXplRmllbGQgOiBudW1iZXIgPSAzO1xyXG4gICAgc2NvcmUgOiBTY29yZTtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igb2YgZ2FtZSwgd2hlcmUgc2V0IG1haW4gYXJyYXkgYW5kIHBsYXllcnMgc2NvcmUuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZmllbGQgPSBbWy0xLCAtMSwgLTFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgWy0xLCAtMSwgLTFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgWy0xLCAtMSwgLTFdXTtcclxuICAgICAgICB0aGlzLnNjb3JlID0ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxIDogMCxcclxuICAgICAgICAgICAgcGxheWVyMiA6IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBoYW5kbGUgdGhlIG1vdmUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIGkgQ29vcmRpbmF0ZXMgZm9yIHguXHJcbiAgICAgKiBAcGFyYW0gaiBDb29yZGluYXRlcyBmb3IgeS5cclxuICAgICAqIEByZXR1cm5zIHthbnl9IEJvb2xlYW4gOiBmYWxzZSAtIHdoZW4gY2VsbCBpcyBidXN5LiBTdHJpbmcgOiBcIm9cIiB8IFwieFwiIC0gd2hlbiBjZWxsIGlzIGZyZWUuXHJcbiAgICAgKi9cclxuICAgIG1vdmUoaSA6IG51bWJlciwgaiA6IG51bWJlcikgOiBib29sZWFuIHwgc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLmZpZWxkW2ldW2pdID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyDQktGL0LHQvtGAINC40LPRgNC+0LrQsFxyXG4gICAgICAgICAgICB0aGlzLmZpZWxkW2ldW2pdID0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIFwieFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL21vZHVsZXMvZ2FtZVwiXHJcblxyXG5pbnRlcmZhY2UgRWxlbWVudHMge1xyXG4gICAgY2VsbHMgOiBKUXVlcnk7XHJcbiAgICBib2R5IDogSlF1ZXJ5O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW92ZW1lbnQge1xyXG4gICAgZ2FtZSA6IEdhbWU7XHJcbiAgICBlbGVtZW50cyA6IEVsZW1lbnRzO1xyXG4gICAgLy8gdSAtIHVwLCBkIC0gZG93biwgbCAtIGxlZnQsIHIgLSByaWdodCwgcyAtIHNldFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1ICAgZCAgIGwgICByICAgc1xyXG4gICAga2V5Q29kZXMgOiBudW1iZXJbXSA9IFs4NywgODMsIDY1LCA2OCwgOTAsIC8vIHdhc2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMzgsIDQwLCAzNywgMzksIDQ4LCA5NiwgNDVdOyAvLyBhcnJvd1xyXG4gICAgaW5kZXggOiBudW1iZXIgPSA0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3Rvci5cclxuICAgICAqIEBwYXJhbSBfZ2FtZSBDbGFzcyB3aGVyZSBkZWZpbmVkIFwiZ2FtZSBydWxlc1wiLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihfZ2FtZSA6IEdhbWUpIHtcclxuICAgICAgICB0aGlzLmluaXRFbGVtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IF9nYW1lO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IGVsZW1lbnQgZm9yIHNldCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RWxlbWVudHMoKSB7XHJcbiAgICAgICAgLy8gSW5pdCBlbGVtZW50cy5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBjZWxscyA6ICQoXCJbZGF0YS1jZWxsXVwiKSxcclxuICAgICAgICAgICAgYm9keSA6ICQoXCJib2R5XCIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBTZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jZWxscy5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbkNsaWNrKGVsLCB0aGlzLmNsaWNrLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxpc3RlbktleVVwKHRoaXMuZWxlbWVudHMuYm9keSwgdGhpcy5tb3ZpbmcsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgY2xpY2sgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gZWwgRWxlbWVudCBmb3Igc2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuQ2xpY2soZWwgOiBPYmplY3QsIGNhbGxiYWNrIDogYW55LCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgJChlbCkub24oXCJjbGlja1wiLCAoZXZlbnRPYmplY3QgOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNlbGxzLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlbCA9PT0gZXZlbnRPYmplY3QudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgY29udGV4dCwgZXZlbnRPYmplY3QudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNldCBrZXlVcCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqIEBwYXJhbSBlbCBFbGVtZW50IGZvciBzZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24gZm9yIHByb2Nlc3NpbmcuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5LZXlVcChlbCA6IE9iamVjdCwgY2FsbGJhY2sgOiBhbnksIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICAkKGVsKS5vbihcImtleXVwXCIsIChlIDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZS5rZXlDb2RlLCBjb250ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiBjbGljayBvbiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsaWNrKGluZGV4OiBudW1iZXIsIGNvbnRleHQgOiBhbnksIGVsIDogT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IGkgOiBudW1iZXIgPSBNYXRoLmZsb29yKGluZGV4IC8gY29udGV4dC5nYW1lLnNpemVGaWVsZCk7XHJcbiAgICAgICAgbGV0IGogOiBudW1iZXIgPSBpbmRleCAtIGNvbnRleHQuZ2FtZS5zaXplRmllbGQgKiBpO1xyXG4gICAgICAgIGxldCByZXN1bHQgOiBhbnkgPSBjb250ZXh0LmdhbWUubW92ZShpLCBqKTtcclxuICAgICAgICBpZihyZXN1bHQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICQoZWwpLnRleHQocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gbW92ZSB0byBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGtleUNvZGUgS2V5IGNvZGUgb2YgcHJlc3NlZCBidXR0b24uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92aW5nKGtleUNvZGUgOiBudW1iZXIsIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICBmb3IobGV0IGNvZGUgb2YgY29udGV4dC5rZXlDb2Rlcykge1xyXG4gICAgICAgICAgICBpZihrZXlDb2RlID09PSBjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cFxyXG4gICAgICAgICAgICAgICAgaWYoKGtleUNvZGUgPT09IDg3KSB8fCAoa2V5Q29kZSA9PT0gMzgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jaGVja0luZGV4KC0zLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRvd25cclxuICAgICAgICAgICAgICAgIGlmKChrZXlDb2RlID09PSA4MykgfHwgKGtleUNvZGUgPT09IDQwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2hlY2tJbmRleCgzLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGxlZnRcclxuICAgICAgICAgICAgICAgIGlmKChrZXlDb2RlID09PSA2NSkgfHwgKGtleUNvZGUgPT09IDM3KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2hlY2tJbmRleCgtMSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICAgICAgaWYoKGtleUNvZGUgPT09IDY4KSB8fCAoa2V5Q29kZSA9PT0gMzkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jaGVja0luZGV4KDEsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc2V0XHJcbiAgICAgICAgICAgICAgICBpZigoa2V5Q29kZSA9PT0gOTApIHx8IChrZXlDb2RlID09PSA0OCkgfHwgKGtleUNvZGUgPT09IDk2KSB8fCAoa2V5Q29kZSA9PT0gNDUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC51blJlbmRlcihjb250ZXh0LmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbnRleHQuZWxlbWVudHMuY2VsbHNbY29udGV4dC5pbmRleF0pLnRleHQoXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5kZXggPSA0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGluZGV4XHJcbiAgICAgKiBAcGFyYW0gc2hpZnQgVGhlIG51bWJlciBvZiBzaGlmdHMuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0luZGV4KHNoaWZ0IDogbnVtYmVyLCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgLy8gSWYgaW5kZXggaXMgd2l0aGluIHRoZSBib3VuZHMgWzAuLjhdIC0gOSBlbGVtZW50cy5cclxuICAgICAgICBpZihjb250ZXh0LmluZGV4ICsgc2hpZnQgPCA5ICYmIGNvbnRleHQuaW5kZXggKyBzaGlmdCA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFwiVW5TaG93XCIgcHJldmlvdXMgc2VsZWN0ZWQgZWxlbWVudC5cclxuICAgICAgICAgICAgY29udGV4dC51blJlbmRlcihjb250ZXh0LmluZGV4KTtcclxuICAgICAgICAgICAgLy8gRmluZCBuZXcgaW5kZXguXHJcbiAgICAgICAgICAgIGNvbnRleHQuaW5kZXggKz0gc2hpZnQ7XHJcbiAgICAgICAgICAgIC8vIFNob3cgbmV3IGVsZW1lbnQuXHJcbiAgICAgICAgICAgIGNvbnRleHQucmVuZGVyKGNvbnRleHQuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBlbGVtZW50IHdpdGggaW5kZXguXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2Ygc2hvd2luZyBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlcihpbmRleCA6IG51bWJlcikge1xyXG4gICAgICAgICQodGhpcy5lbGVtZW50cy5jZWxsc1tpbmRleF0pLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFwiVW5TaG93XCIgZWxlbWVudCB3aXRoIGluZGV4LlxyXG4gICAgICogQHBhcmFtIGluZGV4IEluZGV4IG9mIHNob3dpbmcgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1blJlbmRlcihpbmRleCA6IG51bWJlcikge1xyXG4gICAgICAgICQodGhpcy5lbGVtZW50cy5jZWxsc1tpbmRleF0pLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbn0iXX0=
