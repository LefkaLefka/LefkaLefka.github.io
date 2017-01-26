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
        // 1 - x, 0 - o, -1 - null.
        this.field = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
        this.score = {
            player1: 0,
            player2: 0
        };
        this.startGame();
    }
    Game.prototype.startGame = function () {
        if (Math.random() > 0.5) {
            this.players = {
                player1: "x",
                player2: "o",
            };
            // Player1 start the game.
            this.whoseMove = 0;
        }
        else {
            this.players = {
                player1: "o",
                player2: "x",
            };
            // Player2 start the game.
            this.whoseMove = 1;
        }
        this.countOfMove = 0;
    };
    Game.prototype.check = function () {
        // если есть еще куда ходить
        if (this.countOfMove <= (this.sizeField * this.sizeField)) {
            // если больше 5 ходов
            if (this.countOfMove >= 5) {
                var horizontal = void 0, vertical = void 0, 
                // диагональ вида \
                diagonalL = void 0, 
                // диагональ вида /
                diagonalR = void 0;
                // проверяем на выиграш
                for (var i = 0; i < this.sizeField; ++i) {
                    horizontal = 0;
                    vertical = 0;
                    diagonalL = 0;
                    diagonalR = 0;
                    for (var j = 0; j < this.sizeField; ++j) {
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
                    var temp = Math.abs(horizontal) === this.sizeField ?
                        horizontal : Math.abs(vertical) === this.sizeField ?
                        vertical : Math.abs(diagonalL) === this.sizeField ?
                        diagonalL : Math.abs(diagonalR) === this.sizeField ?
                        diagonalR : 0;
                    // если есть победитель
                    if (temp != 0) {
                        console.log("win");
                        return "sd";
                    }
                }
            }
            // если все походили(клеток на поле не осталось)
            if (this.countOfMove === this.sizeField) {
                console.log("no");
                return false;
            }
        }
    };
    /**
     * Function to handle the move player.
     * @param i Coordinates for x.
     * @param j Coordinates for y.
     * @returns {any} Boolean : false - when cell is busy. String : "o" | "x" - when cell is free.
     */
    Game.prototype.move = function (i, j) {
        if (this.field[i][j] === 0) {
            // Fill the array.
            this.field[i][j] = this.whoseMove === 0 ?
                (this.players.player1 === "x" ? 1 : -1) :
                (this.players.player2 === "x" ? 1 : -1); // Select "x" or "o" for set in array player2 moves
            // Change next player.
            this.whoseMove ^= 1;
            // If we made move increasing counter
            ++this.countOfMove;
            this.check();
            // this.whoseMove === 1 - invert, because we change next player above.
            return this.whoseMove === 1 ? this.players.player1 : this.players.player2;
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
        // Find index in array.
        var i = Math.floor(index / context.game.sizeField), j = index - context.game.sizeField * i, 
        // Find result of a player's turn.
        result = context.game.move(i, j);
        // If result correct - show.
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
                    // "UnShow" previous element.
                    context.unRender(context.index);
                    // Find index in array.
                    var i = Math.floor(context.index / context.game.sizeField), j = context.index - context.game.sizeField * i, 
                    // Find result of a player's turn.
                    result = context.game.move(i, j);
                    // If result correct - show.
                    if (result !== false) {
                        $(context.elements.cells[context.index]).text(result);
                    }
                    // Set default value.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvbWFpbi50cyIsInNyYy90cy9tb2R1bGVzL2dhbWUudHMiLCJzcmMvdHMvbW9kdWxlcy9tb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxtREFBaUQ7QUFDakQsMkNBQXlDO0FBRXpDLElBQUksSUFBSSxHQUFVLElBQUksV0FBSSxFQUFFLENBQUM7QUFDN0IsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUNPbkI7SUFTSTs7T0FFRztJQUNIO1FBVEEsY0FBUyxHQUFZLENBQUMsQ0FBQztRQVVuQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRyxDQUFDO1lBQ1gsT0FBTyxFQUFHLENBQUM7U0FDZCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDTyx3QkFBUyxHQUFqQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUc7Z0JBQ1gsT0FBTyxFQUFHLEdBQUc7Z0JBQ2IsT0FBTyxFQUFHLEdBQUc7YUFDaEIsQ0FBQztZQUNGLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLE9BQU8sRUFBRyxHQUFHO2dCQUNiLE9BQU8sRUFBRyxHQUFHO2FBQ2hCLENBQUM7WUFDRiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTyxvQkFBSyxHQUFiO1FBQ0ksNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsc0JBQXNCO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxVQUFVLFNBQVMsRUFBRSxRQUFRLFNBQVM7Z0JBQ3RDLG1CQUFtQjtnQkFDbkIsU0FBUyxTQUFTO2dCQUNsQixtQkFBbUI7Z0JBQ25CLFNBQVMsU0FBUyxDQUFDO2dCQUN2Qix1QkFBdUI7Z0JBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUN0QyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNmLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ2IsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDZCxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN0Qyx3QkFBd0I7d0JBQ3hCLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixzQkFBc0I7d0JBQ3RCLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixvQkFBb0I7d0JBQ3BCLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixtQkFBbUI7d0JBQ25CLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUV2RCxDQUFDO29CQUNELGdFQUFnRTtvQkFDaEUsb0ZBQW9GO29CQUNwRiw2Q0FBNkM7b0JBQzdDLDZDQUE2QztvQkFDN0MsbURBQW1EO29CQUNuRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTO3dCQUM5QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUzt3QkFDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVM7d0JBQ2pELFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTO3dCQUNsRCxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNsQix1QkFBdUI7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBR2hCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxnREFBZ0Q7WUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ3hDLENBQUM7Z0JBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUdqQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILG1CQUFJLEdBQUosVUFBSyxDQUFVLEVBQUUsQ0FBVTtRQUN2QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDO2dCQUNuQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbURBQW1EO1lBQ2hHLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUNwQixxQ0FBcUM7WUFDckMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLHNFQUFzRTtZQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDOUUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQXhIQSxBQXdIQyxJQUFBO0FBeEhZLG9CQUFJOzs7QUNKakI7SUFRSTs7O09BR0c7SUFDSCxrQkFBWSxLQUFZO1FBVHhCLGlEQUFpRDtRQUNqRCx3Q0FBd0M7UUFDeEMsYUFBUSxHQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDbEIsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQzVELFVBQUssR0FBWSxDQUFDLENBQUM7UUFNZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNEOztPQUVHO0lBQ0ssK0JBQVksR0FBcEI7UUFBQSxpQkFXQztRQVZHLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osS0FBSyxFQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDeEIsSUFBSSxFQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDbkIsQ0FBQztRQUNGLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsRUFBRTtZQUMzQixLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDRDs7Ozs7T0FLRztJQUNLLDhCQUFXLEdBQW5CLFVBQW9CLEVBQVcsRUFBRSxRQUFjLEVBQUUsT0FBYTtRQUE5RCxpQkFRQztRQVBHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsV0FBK0I7WUFDOUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLEVBQUUsQ0FBQSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNLLDhCQUFXLEdBQW5CLFVBQW9CLEVBQVcsRUFBRSxRQUFjLEVBQUUsT0FBYTtRQUMxRCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQXFCO1lBQ3BDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNEOztPQUVHO0lBQ0ssd0JBQUssR0FBYixVQUFjLEtBQWEsRUFBRSxPQUFhLEVBQUUsRUFBVztRQUNuRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDdkQsQ0FBQyxHQUFZLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO1FBQy9DLGtDQUFrQztRQUNsQyxNQUFNLEdBQVMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLDRCQUE0QjtRQUM1QixFQUFFLENBQUEsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0sseUJBQU0sR0FBZCxVQUFlLE9BQWdCLEVBQUUsT0FBYTtRQUMxQyxHQUFHLENBQUEsQ0FBYSxVQUFnQixFQUFoQixLQUFBLE9BQU8sQ0FBQyxRQUFRLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCO1lBQTVCLElBQUksSUFBSSxTQUFBO1lBQ1IsRUFBRSxDQUFBLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUs7Z0JBQ0wsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUNELE9BQU87Z0JBQ1AsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxPQUFPO2dCQUNQLEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFDRCxRQUFRO2dCQUNSLEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsTUFBTTtnQkFDTixFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlFLDZCQUE2QjtvQkFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hDLHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQy9ELENBQUMsR0FBWSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUM7b0JBQ3ZELGtDQUFrQztvQkFDbEMsTUFBTSxHQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0MsNEJBQTRCO29CQUM1QixFQUFFLENBQUEsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUQsQ0FBQztvQkFDRCxxQkFBcUI7b0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLENBQUM7U0FDSjtJQUNMLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ssNkJBQVUsR0FBbEIsVUFBbUIsS0FBYyxFQUFFLE9BQWE7UUFDNUMscURBQXFEO1FBQ3JELEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELHNDQUFzQztZQUN0QyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7WUFDdkIsb0JBQW9CO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0sseUJBQU0sR0FBZCxVQUFlLEtBQWM7UUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRDs7O09BR0c7SUFDSywyQkFBUSxHQUFoQixVQUFpQixLQUFjO1FBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0wsZUFBQztBQUFELENBaEpBLEFBZ0pDLElBQUE7QUFoSlksNEJBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgTW92ZW1lbnQgfSBmcm9tIFwiLi4vdHMvbW9kdWxlcy9tb3ZlbWVudFwiXHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vdHMvbW9kdWxlcy9nYW1lXCJcclxuXHJcbmxldCBnYW1lIDogR2FtZSA9IG5ldyBHYW1lKCk7XHJcbm5ldyBNb3ZlbWVudChnYW1lKTsiLCIvKipcclxuICogSW50ZXJmYWNlIGZvciBzZXQgcGxheWVycyBzY29yZS5cclxuICovXHJcbmludGVyZmFjZSBTY29yZSB7XHJcbiAgICBwbGF5ZXIxIDogbnVtYmVyO1xyXG4gICAgcGxheWVyMiA6IG51bWJlcjtcclxufVxyXG5pbnRlcmZhY2UgUGxheWVycyB7XHJcbiAgICBwbGF5ZXIxIDogc3RyaW5nO1xyXG4gICAgcGxheWVyMiA6IHN0cmluZztcclxufVxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICAvLyAxIC0geCwgLTEgLSBvLCAwIC0gbnVsbC5cclxuICAgIGZpZWxkIDogbnVtYmVyW11bXTtcclxuICAgIHNpemVGaWVsZCA6IG51bWJlciA9IDM7XHJcbiAgICBzY29yZSA6IFNjb3JlO1xyXG4gICAgcGxheWVycyA6IFBsYXllcnM7XHJcbiAgICAvLyBwbGF5ZXIxIC0gMCwgcGxheWVyMiAtIDEuXHJcbiAgICB3aG9zZU1vdmUgOiBudW1iZXI7XHJcbiAgICBjb3VudE9mTW92ZSA6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igb2YgZ2FtZSwgd2hlcmUgc2V0IG1haW4gYXJyYXkgYW5kIHBsYXllcnMgc2NvcmUuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIDEgLSB4LCAwIC0gbywgLTEgLSBudWxsLlxyXG4gICAgICAgIHRoaXMuZmllbGQgPSBbWzAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgWzAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgWzAsIDAsIDBdXTtcclxuICAgICAgICB0aGlzLnNjb3JlID0ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxIDogMCxcclxuICAgICAgICAgICAgcGxheWVyMiA6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXJ0R2FtZSgpIHtcclxuICAgICAgICBpZihNYXRoLnJhbmRvbSgpID4gMC41KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVycyA9IHtcclxuICAgICAgICAgICAgICAgIHBsYXllcjEgOiBcInhcIixcclxuICAgICAgICAgICAgICAgIHBsYXllcjIgOiBcIm9cIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gUGxheWVyMSBzdGFydCB0aGUgZ2FtZS5cclxuICAgICAgICAgICAgdGhpcy53aG9zZU1vdmUgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVycyA9IHtcclxuICAgICAgICAgICAgICAgIHBsYXllcjEgOiBcIm9cIixcclxuICAgICAgICAgICAgICAgIHBsYXllcjIgOiBcInhcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gUGxheWVyMiBzdGFydCB0aGUgZ2FtZS5cclxuICAgICAgICAgICAgdGhpcy53aG9zZU1vdmUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50T2ZNb3ZlID0gMDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2soKSA6IGJvb2xlYW4gfCBzdHJpbmcge1xyXG4gICAgICAgIC8vINC10YHQu9C4INC10YHRgtGMINC10YnQtSDQutGD0LTQsCDRhdC+0LTQuNGC0YxcclxuICAgICAgICBpZiAodGhpcy5jb3VudE9mTW92ZSA8PSAodGhpcy5zaXplRmllbGQgKiB0aGlzLnNpemVGaWVsZCkpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LHQvtC70YzRiNC1IDUg0YXQvtC00L7QslxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudE9mTW92ZSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9yaXpvbnRhbCA6IG51bWJlciwgdmVydGljYWwgOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LTQuNCw0LPQvtC90LDQu9GMINCy0LjQtNCwIFxcXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxMIDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vINC00LjQsNCz0L7QvdCw0LvRjCDQstC40LTQsCAvXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxSIDogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LAg0LLRi9C40LPRgNCw0YhcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplRmllbGQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBkaWFnb25hbEwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWdvbmFsUiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemVGaWVsZDsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQs9C+0YDQuNC30L7QvdGC0LDQu9C4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWwgKz0gdGhpcy5maWVsZFtpXVtqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INCy0LXRgNGC0LjQutCw0LvQuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbCArPSB0aGlzLmZpZWxkW2pdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtNC40LDQs9C+0L3QsNC70Ywg0L3QsNC/0YDQsNCy0L5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxMICs9IHRoaXMuZmllbGRbal1bal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC00LjQsNCz0L7QvdCw0LvRjCDQvdCw0LvQtdCy0L5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxSICs9IHRoaXMuZmllbGRbal1bdGhpcy5zaXplRmllbGQgLSBqIC0gMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiDQs9C+0YDQuNC30L7QvdGC0LDQu9C1INC90LDRgdGH0LjRgtCw0LvQuCAzINC40LvQu9C4IC0zINCy0L7Qt9Cy0YDQsNGJ0LDQtdC8INCz0L7RgNC40LfQvtC90YLQsNC70YxcclxuICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiDQs9C+0YDQuNC30L7QvdGC0LDQu9C1INC90LXRgiDQvdC40YfQtdCz0L4g0L/QvtC00L7QsdC90L7Qs9C+INC/0YDQvtCy0LXRgNGP0LXQvCDQstC10YDRgtC40LrQsNC70Ywg0L/QviDRgtCw0LrQvtC80YMg0LbQtSDQv9GA0LjQvdGG0LjQv9GDXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L3QuNGH0LXQs9C+INC90LUg0L3QsNGI0LvQuCDQv9GA0L7QstC10YDRj9C10Lwg0LTQuNCw0LPQvtC90LDQu9GMIFxcXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L3QuNGH0LXQs9C+INC90LUg0L3QsNGI0LvQuCDQv9GA0L7QstC10YDRj9C10Lwg0LTQuNCw0LPQvtC90LDQu9GMIC9cclxuICAgICAgICAgICAgICAgICAgICAvLyDQsiDQtNGA0YPQs9C40YUg0YHQu9GD0YfQsNGP0YUo0L3QtdGCINCy0YvQuNCz0YDQsNCy0YjQtdCz0L4pINCy0L7Qt9Cy0YDRidCw0LXQvCDQvdC+0LvRjFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gTWF0aC5hYnMoaG9yaXpvbnRhbCkgPT09IHRoaXMuc2l6ZUZpZWxkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbCA6IE1hdGguYWJzKHZlcnRpY2FsKSA9PT0gdGhpcy5zaXplRmllbGQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbCA6IE1hdGguYWJzKGRpYWdvbmFsTCkgPT09IHRoaXMuc2l6ZUZpZWxkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxMIDogTWF0aC5hYnMoZGlhZ29uYWxSKSA9PT0gdGhpcy5zaXplRmllbGQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFnb25hbFIgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC10YHRgtGMINC/0L7QsdC10LTQuNGC0LXQu9GMXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXAgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic2RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVtcCA9PT0gdGhpcy5zaXplRmllbGQgPyBzZXRUaW1lb3V0KHdpbmRvd0VuZEdhbWUsIDgwMCwgXCJ5b3Ugd29uXCIsIFwicmdiYSgwLCAyNTUsIDAsIDAuNSlcIikgOiBzZXRUaW1lb3V0KHdpbmRvd0VuZEdhbWUsIDgwMCwgXCJ0b2Ugd2luXCIsIFwicmdiYSgyNTUsIDAsIDAsIDAuNSlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQstGB0LUg0L/QvtGF0L7QtNC40LvQuCjQutC70LXRgtC+0Log0L3QsCDQv9C+0LvQtSDQvdC1INC+0YHRgtCw0LvQvtGB0YwpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdW50T2ZNb3ZlID09PSB0aGlzLnNpemVGaWVsZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vINC30LDQutCw0L3Rh9C40LLQsNC10Lwg0LjQs9GA0YNcclxuICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQod2luZG93RW5kR2FtZSwgODAwLCBcImRyYXdcIiwgXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgbW92ZSBwbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gaSBDb29yZGluYXRlcyBmb3IgeC5cclxuICAgICAqIEBwYXJhbSBqIENvb3JkaW5hdGVzIGZvciB5LlxyXG4gICAgICogQHJldHVybnMge2FueX0gQm9vbGVhbiA6IGZhbHNlIC0gd2hlbiBjZWxsIGlzIGJ1c3kuIFN0cmluZyA6IFwib1wiIHwgXCJ4XCIgLSB3aGVuIGNlbGwgaXMgZnJlZS5cclxuICAgICAqL1xyXG4gICAgbW92ZShpIDogbnVtYmVyLCBqIDogbnVtYmVyKSA6IGJvb2xlYW4gfCBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuZmllbGRbaV1bal0gPT09IDApIHtcclxuICAgICAgICAgICAgLy8gRmlsbCB0aGUgYXJyYXkuXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRbaV1bal0gPSB0aGlzLndob3NlTW92ZSA9PT0gMCA/IC8vIFNlbGVjdCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICh0aGlzLnBsYXllcnMucGxheWVyMSA9PT0gXCJ4XCIgPyAxIDogLTEpIDogLy8gU2VsZWN0IFwieFwiIG9yIFwib1wiIGZvciBzZXQgaW4gYXJyYXkgcGxheWVyMSBtb3Zlc1xyXG4gICAgICAgICAgICAgICAgKHRoaXMucGxheWVycy5wbGF5ZXIyID09PSBcInhcIiA/IDEgOiAtMSk7IC8vIFNlbGVjdCBcInhcIiBvciBcIm9cIiBmb3Igc2V0IGluIGFycmF5IHBsYXllcjIgbW92ZXNcclxuICAgICAgICAgICAgLy8gQ2hhbmdlIG5leHQgcGxheWVyLlxyXG4gICAgICAgICAgICB0aGlzLndob3NlTW92ZSBePSAxO1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBtYWRlIG1vdmUgaW5jcmVhc2luZyBjb3VudGVyXHJcbiAgICAgICAgICAgICsrdGhpcy5jb3VudE9mTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5jaGVjaygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLndob3NlTW92ZSA9PT0gMSAtIGludmVydCwgYmVjYXVzZSB3ZSBjaGFuZ2UgbmV4dCBwbGF5ZXIgYWJvdmUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndob3NlTW92ZSA9PT0gMSA/IHRoaXMucGxheWVycy5wbGF5ZXIxIDogdGhpcy5wbGF5ZXJzLnBsYXllcjI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vbW9kdWxlcy9nYW1lXCJcclxuXHJcbmludGVyZmFjZSBFbGVtZW50cyB7XHJcbiAgICBjZWxscyA6IEpRdWVyeTtcclxuICAgIGJvZHkgOiBKUXVlcnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb3ZlbWVudCB7XHJcbiAgICBnYW1lIDogR2FtZTtcclxuICAgIGVsZW1lbnRzIDogRWxlbWVudHM7XHJcbiAgICAvLyB1IC0gdXAsIGQgLSBkb3duLCBsIC0gbGVmdCwgciAtIHJpZ2h0LCBzIC0gc2V0XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHUgICBkICAgbCAgIHIgICBzXHJcbiAgICBrZXlDb2RlcyA6IG51bWJlcltdID0gWzg3LCA4MywgNjUsIDY4LCA5MCwgLy8gd2FzZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAzOCwgNDAsIDM3LCAzOSwgNDgsIDk2LCA0NV07IC8vIGFycm93XHJcbiAgICBpbmRleCA6IG51bWJlciA9IDQ7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yLlxyXG4gICAgICogQHBhcmFtIF9nYW1lIENsYXNzIHdoZXJlIGRlZmluZWQgXCJnYW1lIHJ1bGVzXCIuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKF9nYW1lIDogR2FtZSkge1xyXG4gICAgICAgIHRoaXMuaW5pdEVsZW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gX2dhbWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluaXQgZWxlbWVudCBmb3Igc2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRFbGVtZW50cygpIHtcclxuICAgICAgICAvLyBJbml0IGVsZW1lbnRzLlxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgIGNlbGxzIDogJChcIltkYXRhLWNlbGxdXCIpLFxyXG4gICAgICAgICAgICBib2R5IDogJChcImJvZHlcIilcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFNldCBldmVudCBsaXN0ZW5lci5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmNlbGxzLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuQ2xpY2soZWwsIHRoaXMuY2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGlzdGVuS2V5VXAodGhpcy5lbGVtZW50cy5ib2R5LCB0aGlzLm1vdmluZywgdGhpcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNldCBjbGljayBldmVudCBsaXN0ZW5lci5cclxuICAgICAqIEBwYXJhbSBlbCBFbGVtZW50IGZvciBzZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24gZm9yIHByb2Nlc3NpbmcuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5DbGljayhlbCA6IE9iamVjdCwgY2FsbGJhY2sgOiBhbnksIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICAkKGVsKS5vbihcImNsaWNrXCIsIChldmVudE9iamVjdCA6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY2VsbHMuZWFjaCgoaSwgZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVsID09PSBldmVudE9iamVjdC50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBjb250ZXh0LCBldmVudE9iamVjdC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGtleVVwIGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGVsIEVsZW1lbnQgZm9yIHNldCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbiBmb3IgcHJvY2Vzc2luZy5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IENvbnRleHQgb2YgXCJNb3ZlbWVudFwiLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxpc3RlbktleVVwKGVsIDogT2JqZWN0LCBjYWxsYmFjayA6IGFueSwgY29udGV4dCA6IGFueSkge1xyXG4gICAgICAgICQoZWwpLm9uKFwia2V5dXBcIiwgKGUgOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhlLmtleUNvZGUsIGNvbnRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIGNsaWNrIG9uIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xpY2soaW5kZXg6IG51bWJlciwgY29udGV4dCA6IGFueSwgZWwgOiBPYmplY3QpIHtcclxuICAgICAgICAvLyBGaW5kIGluZGV4IGluIGFycmF5LlxyXG4gICAgICAgIGxldCBpIDogbnVtYmVyID0gTWF0aC5mbG9vcihpbmRleCAvIGNvbnRleHQuZ2FtZS5zaXplRmllbGQpLFxyXG4gICAgICAgICAgICBqIDogbnVtYmVyID0gaW5kZXggLSBjb250ZXh0LmdhbWUuc2l6ZUZpZWxkICogaSxcclxuICAgICAgICAgICAgLy8gRmluZCByZXN1bHQgb2YgYSBwbGF5ZXIncyB0dXJuLlxyXG4gICAgICAgICAgICByZXN1bHQgOiBhbnkgPSBjb250ZXh0LmdhbWUubW92ZShpLCBqKTtcclxuICAgICAgICAvLyBJZiByZXN1bHQgY29ycmVjdCAtIHNob3cuXHJcbiAgICAgICAgaWYocmVzdWx0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAkKGVsKS50ZXh0KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIG1vdmUgdG8gZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSBrZXlDb2RlIEtleSBjb2RlIG9mIHByZXNzZWQgYnV0dG9uLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdmluZyhrZXlDb2RlIDogbnVtYmVyLCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgZm9yKGxldCBjb2RlIG9mIGNvbnRleHQua2V5Q29kZXMpIHtcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PT0gY29kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBcclxuICAgICAgICAgICAgICAgIGlmKChrZXlDb2RlID09PSA4NykgfHwgKGtleUNvZGUgPT09IDM4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2hlY2tJbmRleCgtMywgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBkb3duXHJcbiAgICAgICAgICAgICAgICBpZigoa2V5Q29kZSA9PT0gODMpIHx8IChrZXlDb2RlID09PSA0MCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmNoZWNrSW5kZXgoMywgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0XHJcbiAgICAgICAgICAgICAgICBpZigoa2V5Q29kZSA9PT0gNjUpIHx8IChrZXlDb2RlID09PSAzNykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmNoZWNrSW5kZXgoLTEsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gcmlnaHRcclxuICAgICAgICAgICAgICAgIGlmKChrZXlDb2RlID09PSA2OCkgfHwgKGtleUNvZGUgPT09IDM5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2hlY2tJbmRleCgxLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHNldFxyXG4gICAgICAgICAgICAgICAgaWYoKGtleUNvZGUgPT09IDkwKSB8fCAoa2V5Q29kZSA9PT0gNDgpIHx8IChrZXlDb2RlID09PSA5NikgfHwgKGtleUNvZGUgPT09IDQ1KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFwiVW5TaG93XCIgcHJldmlvdXMgZWxlbWVudC5cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuUmVuZGVyKGNvbnRleHQuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgaW5kZXggaW4gYXJyYXkuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgOiBudW1iZXIgPSBNYXRoLmZsb29yKGNvbnRleHQuaW5kZXggLyBjb250ZXh0LmdhbWUuc2l6ZUZpZWxkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA6IG51bWJlciA9IGNvbnRleHQuaW5kZXggLSBjb250ZXh0LmdhbWUuc2l6ZUZpZWxkICogaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmluZCByZXN1bHQgb2YgYSBwbGF5ZXIncyB0dXJuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgOiBhbnkgPSBjb250ZXh0LmdhbWUubW92ZShpLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiByZXN1bHQgY29ycmVjdCAtIHNob3cuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGNvbnRleHQuZWxlbWVudHMuY2VsbHNbY29udGV4dC5pbmRleF0pLnRleHQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGRlZmF1bHQgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbmRleCA9IDQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaW5kZXhcclxuICAgICAqIEBwYXJhbSBzaGlmdCBUaGUgbnVtYmVyIG9mIHNoaWZ0cy5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IENvbnRleHQgb2YgXCJNb3ZlbWVudFwiLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrSW5kZXgoc2hpZnQgOiBudW1iZXIsIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICAvLyBJZiBpbmRleCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBbMC4uOF0gLSA5IGVsZW1lbnRzLlxyXG4gICAgICAgIGlmKGNvbnRleHQuaW5kZXggKyBzaGlmdCA8IDkgJiYgY29udGV4dC5pbmRleCArIHNoaWZ0ID49IDApIHtcclxuICAgICAgICAgICAgLy8gXCJVblNob3dcIiBwcmV2aW91cyBzZWxlY3RlZCBlbGVtZW50LlxyXG4gICAgICAgICAgICBjb250ZXh0LnVuUmVuZGVyKGNvbnRleHQuaW5kZXgpO1xyXG4gICAgICAgICAgICAvLyBGaW5kIG5ldyBpbmRleC5cclxuICAgICAgICAgICAgY29udGV4dC5pbmRleCArPSBzaGlmdDtcclxuICAgICAgICAgICAgLy8gU2hvdyBuZXcgZWxlbWVudC5cclxuICAgICAgICAgICAgY29udGV4dC5yZW5kZXIoY29udGV4dC5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGVsZW1lbnQgd2l0aCBpbmRleC5cclxuICAgICAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiBzaG93aW5nIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyKGluZGV4IDogbnVtYmVyKSB7XHJcbiAgICAgICAgJCh0aGlzLmVsZW1lbnRzLmNlbGxzW2luZGV4XSkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXCJVblNob3dcIiBlbGVtZW50IHdpdGggaW5kZXguXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2Ygc2hvd2luZyBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVuUmVuZGVyKGluZGV4IDogbnVtYmVyKSB7XHJcbiAgICAgICAgJCh0aGlzLmVsZW1lbnRzLmNlbGxzW2luZGV4XSkucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgIH1cclxufSJdfQ==
