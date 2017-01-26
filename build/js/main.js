(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var movement_1 = require("../ts/modules/movement");
var game_1 = require("../ts/modules/game");
var game = new game_1.Game();
new movement_1.Movement(game);
},{"../ts/modules/game":2,"../ts/modules/movement":3}],2:[function(require,module,exports){
"use strict";
var Game = (function () {
    function Game() {
        this.sizeField = 3;
        var field = [[-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]];
        this.field = field;
        this.score = { player1: 0, player2: 0 };
    }
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
        this.keyCodes = [87, 119, 65, 97, 83, 115, 68, 100, 37, 38, 39, 40];
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
            // console.log(el);
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
                console.log(keyCode);
                break;
            }
        }
        // console.log(context.game);
    };
    return Movement;
}());
exports.Movement = Movement;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvbWFpbi50cyIsInNyYy90cy9tb2R1bGVzL2dhbWUudHMiLCJzcmMvdHMvbW9kdWxlcy9tb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxtREFBaUQ7QUFDakQsMkNBQXlDO0FBRXpDLElBQUksSUFBSSxHQUFVLElBQUksV0FBSSxFQUFFLENBQUM7QUFDN0IsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUNDbkI7SUFJSTtRQUZBLGNBQVMsR0FBWSxDQUFDLENBQUM7UUFHbkIsSUFBSSxLQUFLLEdBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsT0FBTyxFQUFHLENBQUMsRUFBRSxPQUFPLEVBQUcsQ0FBQyxFQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELG1CQUFJLEdBQUosVUFBSyxDQUFVLEVBQUUsQ0FBVTtRQUN2QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixlQUFlO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0s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O09BR0c7SUFDSyx5QkFBTSxHQUFkLFVBQWUsT0FBZ0IsRUFBRSxPQUFhO1FBQzFDLEdBQUcsQ0FBQSxDQUFhLFVBQWdCLEVBQWhCLEtBQUEsT0FBTyxDQUFDLFFBQVEsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0I7WUFBNUIsSUFBSSxJQUFJLFNBQUE7WUFDUixFQUFFLENBQUEsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDO1lBQ1YsQ0FBQztTQUNKO1FBQ0QsNkJBQTZCO0lBQ2pDLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0E5RUEsQUE4RUMsSUFBQTtBQTlFWSw0QkFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBNb3ZlbWVudCB9IGZyb20gXCIuLi90cy9tb2R1bGVzL21vdmVtZW50XCJcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi90cy9tb2R1bGVzL2dhbWVcIlxyXG5cclxubGV0IGdhbWUgOiBHYW1lID0gbmV3IEdhbWUoKTtcclxubmV3IE1vdmVtZW50KGdhbWUpOyIsImludGVyZmFjZSBTY29yZSB7XHJcbiAgICBwbGF5ZXIxIDogbnVtYmVyO1xyXG4gICAgcGxheWVyMiA6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgZmllbGQgOiBudW1iZXJbXVtdO1xyXG4gICAgc2l6ZUZpZWxkIDogbnVtYmVyID0gMztcclxuICAgIHNjb3JlIDogU2NvcmU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgZmllbGQgOiBudW1iZXJbXVtdID0gW1stMSwgLTEsIC0xXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFstMSwgLTEsIC0xXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFstMSwgLTEsIC0xXV07XHJcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSB7cGxheWVyMSA6IDAsIHBsYXllcjIgOiAwfTtcclxuICAgIH1cclxuICAgIG1vdmUoaSA6IG51bWJlciwgaiA6IG51bWJlcikgOiBib29sZWFuIHwgc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLmZpZWxkW2ldW2pdID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyDQktGL0LHQvtGAINC40LPRgNC+0LrQsFxyXG4gICAgICAgICAgICB0aGlzLmZpZWxkW2ldW2pdID0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIFwieFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL21vZHVsZXMvZ2FtZVwiXHJcblxyXG5pbnRlcmZhY2UgRWxlbWVudHMge1xyXG4gICAgY2VsbHMgOiBKUXVlcnk7XHJcbiAgICBib2R5IDogSlF1ZXJ5O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW92ZW1lbnQge1xyXG4gICAgZ2FtZSA6IEdhbWU7XHJcbiAgICBlbGVtZW50cyA6IEVsZW1lbnRzO1xyXG4gICAga2V5Q29kZXMgOiBudW1iZXJbXSA9IFs4NywgMTE5LCA2NSwgOTcsIDgzLCAxMTUsIDY4LCAxMDAsIDM3LCAzOCwgMzksIDQwXTtcclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3IuXHJcbiAgICAgKiBAcGFyYW0gX2dhbWUgQ2xhc3Mgd2hlcmUgZGVmaW5lZCBcImdhbWUgcnVsZXNcIi5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoX2dhbWUgOiBHYW1lKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmdhbWUgPSBfZ2FtZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCBlbGVtZW50IGZvciBzZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEVsZW1lbnRzKCkge1xyXG4gICAgICAgIC8vIEluaXQgZWxlbWVudHMuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgY2VsbHMgOiAkKFwiW2RhdGEtY2VsbF1cIiksXHJcbiAgICAgICAgICAgIGJvZHkgOiAkKFwiYm9keVwiKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gU2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuY2VsbHMuZWFjaCgoaSwgZWwpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5DbGljayhlbCwgdGhpcy5jbGljaywgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5LZXlVcCh0aGlzLmVsZW1lbnRzLmJvZHksIHRoaXMubW92aW5nLCB0aGlzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGNsaWNrIGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGVsIEVsZW1lbnQgZm9yIHNldCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBGdW5jdGlvbiBmb3IgcHJvY2Vzc2luZy5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IENvbnRleHQgb2YgXCJNb3ZlbWVudFwiLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxpc3RlbkNsaWNrKGVsIDogT2JqZWN0LCBjYWxsYmFjayA6IGFueSwgY29udGV4dCA6IGFueSkge1xyXG4gICAgICAgICQoZWwpLm9uKFwiY2xpY2tcIiwgKGV2ZW50T2JqZWN0IDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jZWxscy5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZWwgPT09IGV2ZW50T2JqZWN0LnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGNvbnRleHQsIGV2ZW50T2JqZWN0LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQga2V5VXAgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gZWwgRWxlbWVudCBmb3Igc2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuS2V5VXAoZWwgOiBPYmplY3QsIGNhbGxiYWNrIDogYW55LCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgJChlbCkub24oXCJrZXl1cFwiLCAoZSA6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGUua2V5Q29kZSwgY29udGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gY2xpY2sgb24gZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGljayhpbmRleDogbnVtYmVyLCBjb250ZXh0IDogYW55LCBlbCA6IE9iamVjdCkge1xyXG4gICAgICAgIGxldCBpIDogbnVtYmVyID0gTWF0aC5mbG9vcihpbmRleCAvIGNvbnRleHQuZ2FtZS5zaXplRmllbGQpO1xyXG4gICAgICAgIGxldCBqIDogbnVtYmVyID0gaW5kZXggLSBjb250ZXh0LmdhbWUuc2l6ZUZpZWxkICogaTtcclxuICAgICAgICBsZXQgcmVzdWx0IDogYW55ID0gY29udGV4dC5nYW1lLm1vdmUoaSwgaik7XHJcbiAgICAgICAgaWYocmVzdWx0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbCk7XHJcbiAgICAgICAgICAgICQoZWwpLnRleHQocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gbW92ZSB0byBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGtleUNvZGUgS2V5IGNvZGUgb2YgcHJlc3NlZCBidXR0b24uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92aW5nKGtleUNvZGUgOiBudW1iZXIsIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICBmb3IobGV0IGNvZGUgb2YgY29udGV4dC5rZXlDb2Rlcykge1xyXG4gICAgICAgICAgICBpZihrZXlDb2RlID09PSBjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRleHQuZ2FtZSk7XHJcbiAgICB9XHJcbn0iXX0=
