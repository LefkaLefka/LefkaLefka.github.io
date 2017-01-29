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
        this.score = {
            player1: 0,
            player2: 0
        };
        this.startGame();
    }
    /**
     * Stat the game. Set default values.
     */
    Game.prototype.startGame = function () {
        // 1 - x, 0 - o, -1 - null.
        this.field = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
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
        this.endGame = false;
    };
    /**
     * Winning check.
     * @returns {boolean} Boolean : true - someone win, false - nobody win.
     */
    Game.prototype.check = function () {
        if (!this.endGame) {
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
                        if (temp !== 0) {
                            if (temp === this.sizeField) {
                                if (this.players.player1 === "x") {
                                    this.score = {
                                        player1: this.score.player1 + 1,
                                        player2: this.score.player2,
                                    };
                                }
                                else {
                                    this.score = {
                                        player1: this.score.player1,
                                        player2: this.score.player2 + 1,
                                    };
                                }
                            }
                            else {
                                if (this.players.player1 === "o") {
                                    this.score = {
                                        player1: this.score.player1 + 1,
                                        player2: this.score.player2,
                                    };
                                }
                                else {
                                    this.score = {
                                        player1: this.score.player1,
                                        player2: this.score.player2 + 1,
                                    };
                                }
                            }
                            this.endGame = true;
                            return true;
                        }
                    }
                }
                // если клеток на поле не осталось
                if (this.countOfMove === (this.sizeField * this.sizeField)) {
                    this.endGame = true;
                    return false;
                }
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
        if (!this.endGame) {
            if (this.field[i][j] === 0) {
                // Fill the array.
                this.field[i][j] = this.whoseMove === 0 ?
                    (this.players.player1 === "x" ? 1 : -1) :
                    (this.players.player2 === "x" ? 1 : -1); // Select "x" or "o" for set in array player2 moves
                // If we made move increasing counter.
                ++this.countOfMove;
                // Change next player.
                this.whoseMove ^= 1;
                // this.whoseMove === 1 - invert, because we change next player above.
                return this.whoseMove === 1 ? this.players.player1 : this.players.player2;
            }
            else {
                return false;
            }
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
        this.playersInfo(this);
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
                    callback(i, context);
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
    Movement.prototype.click = function (index, context) {
        // Find index in array.
        var i = Math.floor(index / context.game.sizeField), j = index - context.game.sizeField * i;
        context.put(i, j, context);
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
                    var i = Math.floor(context.index / context.game.sizeField), j = context.index - context.game.sizeField * i;
                    // Find result of a player's turn.
                    context.put(i, j, context);
                    // Set default value.
                    context.index = 4;
                }
                break;
            }
        }
    };
    /**
     * Make move(put "x" or "o").
     * @param i Coordinates x of array(gameField) in game.
     * @param j Coordinates y of array(gameField) in game.
     * @param context Context of "Movement".
     */
    Movement.prototype.put = function (i, j, context) {
        var result = context.game.move(i, j);
        if (result !== false) {
            $(context.elements.cells[i * context.game.sizeField + j]).text(result);
        }
        // If someone win or end the game.
        if (context.game.check() || context.game.endGame) {
            // Show who won in header.
            context.playersInfo(context);
            // Highlight for cell.
            context.illuminate(context);
            setTimeout(function () {
                context.clearTable(context);
                context.game.startGame();
                context.playersInfo(context);
            }, 1000);
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
    /**
     * Clear text in table cells.
     * @param context Context of "Movement".
     */
    Movement.prototype.clearTable = function (context) {
        context.elements.cells.each(function (i, el) {
            $(el).text("");
        });
    };
    /**
     * Show users score.
     * @param context Context of "Movement".
     */
    Movement.prototype.playersInfo = function (context) {
        // console.log(context.game.score);
        $("[data-player1]").text("Player 1(" + context.game.players.player1 + "): " + context.game.score.player1);
        $("[data-player2]").text("Player 2(" + context.game.players.player2 + "): " + context.game.score.player2);
    };
    /**
     * Illumination for the winning combination.
     * @param context Context of "Movement".
     */
    Movement.prototype.illuminate = function (context) {
        if ((context.game.field[0][0] !== 0) && (context.game.field[0][0] === context.game.field[0][1]) && (context.game.field[0][0] === context.game.field[0][2])) {
            context.selectLine(context, 0, 1, 2);
        }
        if ((context.game.field[1][0] !== 0) && (context.game.field[1][0] === context.game.field[1][1]) && (context.game.field[1][0] === context.game.field[1][2])) {
            context.selectLine(context, 3, 4, 5);
        }
        if ((context.game.field[2][0] !== 0) && (context.game.field[2][0] === context.game.field[2][1]) && (context.game.field[2][0] === context.game.field[2][2])) {
            context.selectLine(context, 5, 7, 8);
        }
        if ((context.game.field[0][0] !== 0) && (context.game.field[0][0] === context.game.field[1][0]) && (context.game.field[0][0] === context.game.field[2][0])) {
            context.selectLine(context, 0, 3, 6);
        }
        if ((context.game.field[0][1] !== 0) && (context.game.field[0][1] === context.game.field[1][1]) && (context.game.field[0][1] === context.game.field[2][1])) {
            context.selectLine(context, 1, 4, 7);
        }
        if ((context.game.field[0][2] !== 0) && (context.game.field[0][2] === context.game.field[1][2]) && (context.game.field[0][2] === context.game.field[2][2])) {
            context.selectLine(context, 2, 5, 8);
        }
        if ((context.game.field[0][0] !== 0) && (context.game.field[0][0] === context.game.field[1][1]) && (context.game.field[0][0] === context.game.field[2][2])) {
            context.selectLine(context, 0, 4, 8);
        }
        if ((context.game.field[0][2] !== 0) && (context.game.field[0][2] === context.game.field[1][1]) && (context.game.field[0][2] === context.game.field[2][0])) {
            context.selectLine(context, 2, 4, 6);
        }
    };
    /**
     * Illumination for three cells with auto of after 1 second.
     * @param context Context of "Movement".
     * @param i First cell.
     * @param j Second cell.
     * @param k Third cell.
     */
    Movement.prototype.selectLine = function (context, i, j, k) {
        context.render(i);
        context.render(j);
        context.render(k);
        setTimeout(function () {
            context.unRender(i);
            context.unRender(j);
            context.unRender(k);
        }, 1000);
    };
    return Movement;
}());
exports.Movement = Movement;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvbWFpbi50cyIsInNyYy90cy9tb2R1bGVzL2dhbWUudHMiLCJzcmMvdHMvbW9kdWxlcy9tb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxtREFBaUQ7QUFDakQsMkNBQXlDO0FBRXpDLElBQUksSUFBSSxHQUFVLElBQUksV0FBSSxFQUFFLENBQUM7QUFDN0IsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUNPbkI7SUFVSTs7T0FFRztJQUNIO1FBVkEsY0FBUyxHQUFZLENBQUMsQ0FBQztRQVduQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsT0FBTyxFQUFHLENBQUM7WUFDWCxPQUFPLEVBQUcsQ0FBQztTQUNkLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsd0JBQVMsR0FBVDtRQUNJLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLE9BQU8sRUFBRyxHQUFHO2dCQUNiLE9BQU8sRUFBRyxHQUFHO2FBQ2hCLENBQUM7WUFDRiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRztnQkFDWCxPQUFPLEVBQUcsR0FBRztn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SyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hKLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEosT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4SixPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hKLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEosT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4SixPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hKLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEosT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0wsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNLLDZCQUFVLEdBQWxCLFVBQW1CLE9BQVksRUFBRSxDQUFVLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEIsVUFBVSxDQUFDO1lBQ1AsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXJPQSxBQXFPQyxJQUFBO0FBck9ZLDRCQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IE1vdmVtZW50IH0gZnJvbSBcIi4uL3RzL21vZHVsZXMvbW92ZW1lbnRcIlxyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL3RzL21vZHVsZXMvZ2FtZVwiXHJcblxyXG5sZXQgZ2FtZSA6IEdhbWUgPSBuZXcgR2FtZSgpO1xyXG5uZXcgTW92ZW1lbnQoZ2FtZSk7IiwiLyoqXHJcbiAqIEludGVyZmFjZSBmb3Igc2V0IHBsYXllcnMgc2NvcmUuXHJcbiAqL1xyXG5pbnRlcmZhY2UgU2NvcmUge1xyXG4gICAgcGxheWVyMSA6IG51bWJlcjtcclxuICAgIHBsYXllcjIgOiBudW1iZXI7XHJcbn1cclxuaW50ZXJmYWNlIFBsYXllcnMge1xyXG4gICAgcGxheWVyMSA6IHN0cmluZztcclxuICAgIHBsYXllcjIgOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgLy8gMSAtIHgsIC0xIC0gbywgMCAtIG51bGwuXHJcbiAgICBmaWVsZCA6IG51bWJlcltdW107XHJcbiAgICBzaXplRmllbGQgOiBudW1iZXIgPSAzO1xyXG4gICAgc2NvcmUgOiBTY29yZTtcclxuICAgIHBsYXllcnMgOiBQbGF5ZXJzO1xyXG4gICAgLy8gcGxheWVyMSAtIDAsIHBsYXllcjIgLSAxLlxyXG4gICAgd2hvc2VNb3ZlIDogbnVtYmVyO1xyXG4gICAgY291bnRPZk1vdmUgOiBudW1iZXI7XHJcbiAgICBlbmRHYW1lIDogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igb2YgZ2FtZSwgd2hlcmUgc2V0IG1haW4gYXJyYXkgYW5kIHBsYXllcnMgc2NvcmUuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSB7XHJcbiAgICAgICAgICAgIHBsYXllcjEgOiAwLFxyXG4gICAgICAgICAgICBwbGF5ZXIyIDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RhdCB0aGUgZ2FtZS4gU2V0IGRlZmF1bHQgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgLy8gMSAtIHgsIDAgLSBvLCAtMSAtIG51bGwuXHJcbiAgICAgICAgdGhpcy5maWVsZCA9IFtbMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBbMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBbMCwgMCwgMF1dO1xyXG4gICAgICAgIGlmKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyMSA6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyMiA6IFwib1wiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBQbGF5ZXIxIHN0YXJ0IHRoZSBnYW1lLlxyXG4gICAgICAgICAgICB0aGlzLndob3NlTW92ZSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyMSA6IFwib1wiLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyMiA6IFwieFwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBQbGF5ZXIyIHN0YXJ0IHRoZSBnYW1lLlxyXG4gICAgICAgICAgICB0aGlzLndob3NlTW92ZSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnRPZk1vdmUgPSAwO1xyXG4gICAgICAgIHRoaXMuZW5kR2FtZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBXaW5uaW5nIGNoZWNrLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IEJvb2xlYW4gOiB0cnVlIC0gc29tZW9uZSB3aW4sIGZhbHNlIC0gbm9ib2R5IHdpbi5cclxuICAgICAqL1xyXG4gICAgY2hlY2soKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmKCF0aGlzLmVuZEdhbWUpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LXRgdGC0Ywg0LXRidC1INC60YPQtNCwINGF0L7QtNC40YLRjFxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudE9mTW92ZSA8PSAodGhpcy5zaXplRmllbGQgKiB0aGlzLnNpemVGaWVsZCkpIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INCx0L7Qu9GM0YjQtSA1INGF0L7QtNC+0LJcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50T2ZNb3ZlID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaG9yaXpvbnRhbCA6IG51bWJlciwgdmVydGljYWwgOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LTQuNCw0LPQvtC90LDQu9GMINCy0LjQtNCwIFxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpYWdvbmFsTCA6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAvLyDQtNC40LDQs9C+0L3QsNC70Ywg0LLQuNC00LAgL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFnb25hbFIgOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LAg0LLRi9C40LPRgNCw0YhcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZUZpZWxkOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxMID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxSID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemVGaWVsZDsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LPQvtGA0LjQt9C+0L3RgtCw0LvQuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbCArPSB0aGlzLmZpZWxkW2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INCy0LXRgNGC0LjQutCw0LvQuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWwgKz0gdGhpcy5maWVsZFtqXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC00LjQsNCz0L7QvdCw0LvRjCDQvdCw0L/RgNCw0LLQvlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhZ29uYWxMICs9IHRoaXMuZmllbGRbal1bal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQtNC40LDQs9C+0L3QsNC70Ywg0L3QsNC70LXQstC+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFnb25hbFIgKz0gdGhpcy5maWVsZFtqXVt0aGlzLnNpemVGaWVsZCAtIGogLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiDQs9C+0YDQuNC30L7QvdGC0LDQu9C1INC90LDRgdGH0LjRgtCw0LvQuCAzINC40LvQu9C4IC0zINCy0L7Qt9Cy0YDQsNGJ0LDQtdC8INCz0L7RgNC40LfQvtC90YLQsNC70YxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LIg0LPQvtGA0LjQt9C+0L3RgtCw0LvQtSDQvdC10YIg0L3QuNGH0LXQs9C+INC/0L7QtNC+0LHQvdC+0LPQviDQv9GA0L7QstC10YDRj9C10Lwg0LLQtdGA0YLQuNC60LDQu9GMINC/0L4g0YLQsNC60L7QvNGDINC20LUg0L/RgNC40L3RhtC40L/Rg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQvdC40YfQtdCz0L4g0L3QtSDQvdCw0YjQu9C4INC/0YDQvtCy0LXRgNGP0LXQvCDQtNC40LDQs9C+0L3QsNC70YwgXFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L3QuNGH0LXQs9C+INC90LUg0L3QsNGI0LvQuCDQv9GA0L7QstC10YDRj9C10Lwg0LTQuNCw0LPQvtC90LDQu9GMIC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LIg0LTRgNGD0LPQuNGFINGB0LvRg9GH0LDRj9GFKNC90LXRgiDQstGL0LjQs9GA0LDQstGI0LXQs9C+KSDQstC+0LfQstGA0YnQsNC10Lwg0L3QvtC70YxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBNYXRoLmFicyhob3Jpem9udGFsKSA9PT0gdGhpcy5zaXplRmllbGQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbCA6IE1hdGguYWJzKHZlcnRpY2FsKSA9PT0gdGhpcy5zaXplRmllbGQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWwgOiBNYXRoLmFicyhkaWFnb25hbEwpID09PSB0aGlzLnNpemVGaWVsZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFnb25hbEwgOiBNYXRoLmFicyhkaWFnb25hbFIpID09PSB0aGlzLnNpemVGaWVsZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFnb25hbFIgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQtdGB0YLRjCDQv9C+0LHQtdC00LjRgtC10LvRjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcCA9PT0gdGhpcy5zaXplRmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllcnMucGxheWVyMSA9PT0gXCJ4XCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIxIDogdGhpcy5zY29yZS5wbGF5ZXIxICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIgOiB0aGlzLnNjb3JlLnBsYXllcjIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjEgOiB0aGlzLnNjb3JlLnBsYXllcjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyIDogdGhpcy5zY29yZS5wbGF5ZXIyICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheWVycy5wbGF5ZXIxID09PSBcIm9cIiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjEgOiB0aGlzLnNjb3JlLnBsYXllcjEgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMiA6IHRoaXMuc2NvcmUucGxheWVyMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMSA6IHRoaXMuc2NvcmUucGxheWVyMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIgOiB0aGlzLnNjb3JlLnBsYXllcjIgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kR2FtZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC60LvQtdGC0L7QuiDQvdCwINC/0L7Qu9C1INC90LUg0L7RgdGC0LDQu9C+0YHRjFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnRPZk1vdmUgPT09ICh0aGlzLnNpemVGaWVsZCAqIHRoaXMuc2l6ZUZpZWxkKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZEdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBtb3ZlIHBsYXllci5cclxuICAgICAqIEBwYXJhbSBpIENvb3JkaW5hdGVzIGZvciB4LlxyXG4gICAgICogQHBhcmFtIGogQ29vcmRpbmF0ZXMgZm9yIHkuXHJcbiAgICAgKiBAcmV0dXJucyB7YW55fSBCb29sZWFuIDogZmFsc2UgLSB3aGVuIGNlbGwgaXMgYnVzeS4gU3RyaW5nIDogXCJvXCIgfCBcInhcIiAtIHdoZW4gY2VsbCBpcyBmcmVlLlxyXG4gICAgICovXHJcbiAgICBtb3ZlKGkgOiBudW1iZXIsIGogOiBudW1iZXIpIDogYm9vbGVhbiB8IHN0cmluZyB7XHJcbiAgICAgICAgaWYoIXRoaXMuZW5kR2FtZSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkW2ldW2pdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGaWxsIHRoZSBhcnJheS5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRbaV1bal0gPSB0aGlzLndob3NlTW92ZSA9PT0gMCA/IC8vIFNlbGVjdCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wbGF5ZXJzLnBsYXllcjEgPT09IFwieFwiID8gMSA6IC0xKSA6IC8vIFNlbGVjdCBcInhcIiBvciBcIm9cIiBmb3Igc2V0IGluIGFycmF5IHBsYXllcjEgbW92ZXNcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wbGF5ZXJzLnBsYXllcjIgPT09IFwieFwiID8gMSA6IC0xKTsgLy8gU2VsZWN0IFwieFwiIG9yIFwib1wiIGZvciBzZXQgaW4gYXJyYXkgcGxheWVyMiBtb3Zlc1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFkZSBtb3ZlIGluY3JlYXNpbmcgY291bnRlci5cclxuICAgICAgICAgICAgICAgICsrdGhpcy5jb3VudE9mTW92ZTtcclxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBuZXh0IHBsYXllci5cclxuICAgICAgICAgICAgICAgIHRoaXMud2hvc2VNb3ZlIF49IDE7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLndob3NlTW92ZSA9PT0gMSAtIGludmVydCwgYmVjYXVzZSB3ZSBjaGFuZ2UgbmV4dCBwbGF5ZXIgYWJvdmUuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aG9zZU1vdmUgPT09IDEgPyB0aGlzLnBsYXllcnMucGxheWVyMSA6IHRoaXMucGxheWVycy5wbGF5ZXIyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi9tb2R1bGVzL2dhbWVcIlxyXG5cclxuaW50ZXJmYWNlIEVsZW1lbnRzIHtcclxuICAgIGNlbGxzIDogSlF1ZXJ5O1xyXG4gICAgYm9keSA6IEpRdWVyeTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vdmVtZW50IHtcclxuICAgIGdhbWUgOiBHYW1lO1xyXG4gICAgZWxlbWVudHMgOiBFbGVtZW50cztcclxuICAgIC8vIHUgLSB1cCwgZCAtIGRvd24sIGwgLSBsZWZ0LCByIC0gcmlnaHQsIHMgLSBzZXRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdSAgIGQgICBsICAgciAgIHNcclxuICAgIGtleUNvZGVzIDogbnVtYmVyW10gPSBbODcsIDgzLCA2NSwgNjgsIDkwLCAvLyB3YXNkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDM4LCA0MCwgMzcsIDM5LCA0OCwgOTYsIDQ1XTsgLy8gYXJyb3dcclxuICAgIGluZGV4IDogbnVtYmVyID0gNDtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3IuXHJcbiAgICAgKiBAcGFyYW0gX2dhbWUgQ2xhc3Mgd2hlcmUgZGVmaW5lZCBcImdhbWUgcnVsZXNcIi5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoX2dhbWUgOiBHYW1lKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBfZ2FtZTtcclxuICAgICAgICB0aGlzLnBsYXllcnNJbmZvKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IGVsZW1lbnQgZm9yIHNldCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RWxlbWVudHMoKSB7XHJcbiAgICAgICAgLy8gSW5pdCBlbGVtZW50cy5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBjZWxscyA6ICQoXCJbZGF0YS1jZWxsXVwiKSxcclxuICAgICAgICAgICAgYm9keSA6ICQoXCJib2R5XCIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBTZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jZWxscy5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbkNsaWNrKGVsLCB0aGlzLmNsaWNrLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxpc3RlbktleVVwKHRoaXMuZWxlbWVudHMuYm9keSwgdGhpcy5tb3ZpbmcsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgY2xpY2sgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gZWwgRWxlbWVudCBmb3Igc2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuQ2xpY2soZWwgOiBPYmplY3QsIGNhbGxiYWNrIDogYW55LCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgJChlbCkub24oXCJjbGlja1wiLCAoZXZlbnRPYmplY3QgOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNlbGxzLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlbCA9PT0gZXZlbnRPYmplY3QudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQga2V5VXAgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gZWwgRWxlbWVudCBmb3Igc2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuS2V5VXAoZWwgOiBPYmplY3QsIGNhbGxiYWNrIDogYW55LCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgJChlbCkub24oXCJrZXl1cFwiLCAoZSA6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGUua2V5Q29kZSwgY29udGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gY2xpY2sgb24gZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGljayhpbmRleDogbnVtYmVyLCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgLy8gRmluZCBpbmRleCBpbiBhcnJheS5cclxuICAgICAgICBsZXQgaSA6IG51bWJlciA9IE1hdGguZmxvb3IoaW5kZXggLyBjb250ZXh0LmdhbWUuc2l6ZUZpZWxkKSxcclxuICAgICAgICAgICAgaiA6IG51bWJlciA9IGluZGV4IC0gY29udGV4dC5nYW1lLnNpemVGaWVsZCAqIGk7XHJcbiAgICAgICAgY29udGV4dC5wdXQoaSwgaiwgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gbW92ZSB0byBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGtleUNvZGUgS2V5IGNvZGUgb2YgcHJlc3NlZCBidXR0b24uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92aW5nKGtleUNvZGUgOiBudW1iZXIsIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICBmb3IobGV0IGNvZGUgb2YgY29udGV4dC5rZXlDb2Rlcykge1xyXG4gICAgICAgICAgICBpZihrZXlDb2RlID09PSBjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cFxyXG4gICAgICAgICAgICAgICAgaWYoKGtleUNvZGUgPT09IDg3KSB8fCAoa2V5Q29kZSA9PT0gMzgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jaGVja0luZGV4KC0zLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRvd25cclxuICAgICAgICAgICAgICAgIGlmKChrZXlDb2RlID09PSA4MykgfHwgKGtleUNvZGUgPT09IDQwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2hlY2tJbmRleCgzLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGxlZnRcclxuICAgICAgICAgICAgICAgIGlmKChrZXlDb2RlID09PSA2NSkgfHwgKGtleUNvZGUgPT09IDM3KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2hlY2tJbmRleCgtMSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyByaWdodFxyXG4gICAgICAgICAgICAgICAgaWYoKGtleUNvZGUgPT09IDY4KSB8fCAoa2V5Q29kZSA9PT0gMzkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jaGVja0luZGV4KDEsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc2V0XHJcbiAgICAgICAgICAgICAgICBpZigoa2V5Q29kZSA9PT0gOTApIHx8IChrZXlDb2RlID09PSA0OCkgfHwgKGtleUNvZGUgPT09IDk2KSB8fCAoa2V5Q29kZSA9PT0gNDUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJVblNob3dcIiBwcmV2aW91cyBlbGVtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5SZW5kZXIoY29udGV4dC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCBpbmRleCBpbiBhcnJheS5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA6IG51bWJlciA9IE1hdGguZmxvb3IoY29udGV4dC5pbmRleCAvIGNvbnRleHQuZ2FtZS5zaXplRmllbGQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqIDogbnVtYmVyID0gY29udGV4dC5pbmRleCAtIGNvbnRleHQuZ2FtZS5zaXplRmllbGQgKiBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHJlc3VsdCBvZiBhIHBsYXllcidzIHR1cm4uXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5wdXQoaSwgaiwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBkZWZhdWx0IHZhbHVlLlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5kZXggPSA0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE1ha2UgbW92ZShwdXQgXCJ4XCIgb3IgXCJvXCIpLlxyXG4gICAgICogQHBhcmFtIGkgQ29vcmRpbmF0ZXMgeCBvZiBhcnJheShnYW1lRmllbGQpIGluIGdhbWUuXHJcbiAgICAgKiBAcGFyYW0gaiBDb29yZGluYXRlcyB5IG9mIGFycmF5KGdhbWVGaWVsZCkgaW4gZ2FtZS5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IENvbnRleHQgb2YgXCJNb3ZlbWVudFwiLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHB1dChpLCBqLCBjb250ZXh0KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA6IGFueSA9IGNvbnRleHQuZ2FtZS5tb3ZlKGksIGopO1xyXG4gICAgICAgIGlmKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgJChjb250ZXh0LmVsZW1lbnRzLmNlbGxzW2kgKiBjb250ZXh0LmdhbWUuc2l6ZUZpZWxkICsgal0pLnRleHQocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSWYgc29tZW9uZSB3aW4gb3IgZW5kIHRoZSBnYW1lLlxyXG4gICAgICAgIGlmIChjb250ZXh0LmdhbWUuY2hlY2soKSB8fCBjb250ZXh0LmdhbWUuZW5kR2FtZSkge1xyXG4gICAgICAgICAgICAvLyBTaG93IHdobyB3b24gaW4gaGVhZGVyLlxyXG4gICAgICAgICAgICBjb250ZXh0LnBsYXllcnNJbmZvKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAvLyBIaWdobGlnaHQgZm9yIGNlbGwuXHJcbiAgICAgICAgICAgIGNvbnRleHQuaWxsdW1pbmF0ZShjb250ZXh0KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsZWFyVGFibGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmdhbWUuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnBsYXllcnNJbmZvKGNvbnRleHQpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGluZGV4XHJcbiAgICAgKiBAcGFyYW0gc2hpZnQgVGhlIG51bWJlciBvZiBzaGlmdHMuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0luZGV4KHNoaWZ0IDogbnVtYmVyLCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgLy8gSWYgaW5kZXggaXMgd2l0aGluIHRoZSBib3VuZHMgWzAuLjhdIC0gOSBlbGVtZW50cy5cclxuICAgICAgICBpZihjb250ZXh0LmluZGV4ICsgc2hpZnQgPCA5ICYmIGNvbnRleHQuaW5kZXggKyBzaGlmdCA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFwiVW5TaG93XCIgcHJldmlvdXMgc2VsZWN0ZWQgZWxlbWVudC5cclxuICAgICAgICAgICAgY29udGV4dC51blJlbmRlcihjb250ZXh0LmluZGV4KTtcclxuICAgICAgICAgICAgLy8gRmluZCBuZXcgaW5kZXguXHJcbiAgICAgICAgICAgIGNvbnRleHQuaW5kZXggKz0gc2hpZnQ7XHJcbiAgICAgICAgICAgIC8vIFNob3cgbmV3IGVsZW1lbnQuXHJcbiAgICAgICAgICAgIGNvbnRleHQucmVuZGVyKGNvbnRleHQuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBlbGVtZW50IHdpdGggaW5kZXguXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2Ygc2hvd2luZyBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlcihpbmRleCA6IG51bWJlcikge1xyXG4gICAgICAgICQodGhpcy5lbGVtZW50cy5jZWxsc1tpbmRleF0pLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFwiVW5TaG93XCIgZWxlbWVudCB3aXRoIGluZGV4LlxyXG4gICAgICogQHBhcmFtIGluZGV4IEluZGV4IG9mIHNob3dpbmcgZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1blJlbmRlcihpbmRleCA6IG51bWJlcikge1xyXG4gICAgICAgICQodGhpcy5lbGVtZW50cy5jZWxsc1tpbmRleF0pLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENsZWFyIHRleHQgaW4gdGFibGUgY2VsbHMuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhclRhYmxlKGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICBjb250ZXh0LmVsZW1lbnRzLmNlbGxzLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgICAgICQoZWwpLnRleHQoXCJcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdXNlcnMgc2NvcmUuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwbGF5ZXJzSW5mbyhjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29udGV4dC5nYW1lLnNjb3JlKTtcclxuICAgICAgICAkKFwiW2RhdGEtcGxheWVyMV1cIikudGV4dChcIlBsYXllciAxKFwiICsgY29udGV4dC5nYW1lLnBsYXllcnMucGxheWVyMSArIFwiKTogXCIgKyBjb250ZXh0LmdhbWUuc2NvcmUucGxheWVyMSk7XHJcbiAgICAgICAgJChcIltkYXRhLXBsYXllcjJdXCIpLnRleHQoXCJQbGF5ZXIgMihcIiArIGNvbnRleHQuZ2FtZS5wbGF5ZXJzLnBsYXllcjIgKyBcIik6IFwiICsgY29udGV4dC5nYW1lLnNjb3JlLnBsYXllcjIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbGx1bWluYXRpb24gZm9yIHRoZSB3aW5uaW5nIGNvbWJpbmF0aW9uLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaWxsdW1pbmF0ZShjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgaWYoKGNvbnRleHQuZ2FtZS5maWVsZFswXVswXSAhPT0gMCkgJiYgKGNvbnRleHQuZ2FtZS5maWVsZFswXVswXSA9PT0gY29udGV4dC5nYW1lLmZpZWxkWzBdWzFdKSAmJiAoY29udGV4dC5nYW1lLmZpZWxkWzBdWzBdID09PSBjb250ZXh0LmdhbWUuZmllbGRbMF1bMl0pKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc2VsZWN0TGluZShjb250ZXh0LCAwICwgMSwgMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKChjb250ZXh0LmdhbWUuZmllbGRbMV1bMF0gIT09IDApICYmIChjb250ZXh0LmdhbWUuZmllbGRbMV1bMF0gPT09IGNvbnRleHQuZ2FtZS5maWVsZFsxXVsxXSkgJiYgKGNvbnRleHQuZ2FtZS5maWVsZFsxXVswXSA9PT0gY29udGV4dC5nYW1lLmZpZWxkWzFdWzJdKSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LnNlbGVjdExpbmUoY29udGV4dCwgMywgNCwgNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKChjb250ZXh0LmdhbWUuZmllbGRbMl1bMF0gIT09IDApICYmIChjb250ZXh0LmdhbWUuZmllbGRbMl1bMF0gPT09IGNvbnRleHQuZ2FtZS5maWVsZFsyXVsxXSkgJiYgKGNvbnRleHQuZ2FtZS5maWVsZFsyXVswXSA9PT0gY29udGV4dC5nYW1lLmZpZWxkWzJdWzJdKSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LnNlbGVjdExpbmUoY29udGV4dCwgNSwgNywgOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigoY29udGV4dC5nYW1lLmZpZWxkWzBdWzBdICE9PSAwKSAmJiAoY29udGV4dC5nYW1lLmZpZWxkWzBdWzBdID09PSBjb250ZXh0LmdhbWUuZmllbGRbMV1bMF0pICYmIChjb250ZXh0LmdhbWUuZmllbGRbMF1bMF0gPT09IGNvbnRleHQuZ2FtZS5maWVsZFsyXVswXSkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5zZWxlY3RMaW5lKGNvbnRleHQsIDAsIDMsIDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigoY29udGV4dC5nYW1lLmZpZWxkWzBdWzFdICE9PSAwKSAmJiAoY29udGV4dC5nYW1lLmZpZWxkWzBdWzFdID09PSBjb250ZXh0LmdhbWUuZmllbGRbMV1bMV0pICYmIChjb250ZXh0LmdhbWUuZmllbGRbMF1bMV0gPT09IGNvbnRleHQuZ2FtZS5maWVsZFsyXVsxXSkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5zZWxlY3RMaW5lKGNvbnRleHQsIDEsIDQsIDcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigoY29udGV4dC5nYW1lLmZpZWxkWzBdWzJdICE9PSAwKSAmJiAoY29udGV4dC5nYW1lLmZpZWxkWzBdWzJdID09PSBjb250ZXh0LmdhbWUuZmllbGRbMV1bMl0pICYmIChjb250ZXh0LmdhbWUuZmllbGRbMF1bMl0gPT09IGNvbnRleHQuZ2FtZS5maWVsZFsyXVsyXSkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5zZWxlY3RMaW5lKGNvbnRleHQsIDIsIDUsIDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoKGNvbnRleHQuZ2FtZS5maWVsZFswXVswXSAhPT0gMCkgJiYgKGNvbnRleHQuZ2FtZS5maWVsZFswXVswXSA9PT0gY29udGV4dC5nYW1lLmZpZWxkWzFdWzFdKSAmJiAoY29udGV4dC5nYW1lLmZpZWxkWzBdWzBdID09PSBjb250ZXh0LmdhbWUuZmllbGRbMl1bMl0pKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc2VsZWN0TGluZShjb250ZXh0LCAwLCA0LCA4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKGNvbnRleHQuZ2FtZS5maWVsZFswXVsyXSAhPT0gMCkgJiYgKGNvbnRleHQuZ2FtZS5maWVsZFswXVsyXSA9PT0gY29udGV4dC5nYW1lLmZpZWxkWzFdWzFdKSAmJiAoY29udGV4dC5nYW1lLmZpZWxkWzBdWzJdID09PSBjb250ZXh0LmdhbWUuZmllbGRbMl1bMF0pKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc2VsZWN0TGluZShjb250ZXh0LCAyLCA0LCA2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIElsbHVtaW5hdGlvbiBmb3IgdGhyZWUgY2VsbHMgd2l0aCBhdXRvIG9mIGFmdGVyIDEgc2Vjb25kLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKiBAcGFyYW0gaSBGaXJzdCBjZWxsLlxyXG4gICAgICogQHBhcmFtIGogU2Vjb25kIGNlbGwuXHJcbiAgICAgKiBAcGFyYW0gayBUaGlyZCBjZWxsLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNlbGVjdExpbmUoY29udGV4dDogYW55LCBpIDogbnVtYmVyLCBqIDogbnVtYmVyLCBrIDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29udGV4dC5yZW5kZXIoaSk7XHJcbiAgICAgICAgY29udGV4dC5yZW5kZXIoaik7XHJcbiAgICAgICAgY29udGV4dC5yZW5kZXIoayk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250ZXh0LnVuUmVuZGVyKGkpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnVuUmVuZGVyKGopO1xyXG4gICAgICAgICAgICBjb250ZXh0LnVuUmVuZGVyKGspO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG59Il19
