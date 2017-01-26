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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvbWFpbi50cyIsInNyYy90cy9tb2R1bGVzL2dhbWUudHMiLCJzcmMvdHMvbW9kdWxlcy9tb3ZlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxtREFBaUQ7QUFDakQsMkNBQXlDO0FBRXpDLElBQUksSUFBSSxHQUFVLElBQUksV0FBSSxFQUFFLENBQUM7QUFDN0IsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUNKbkI7SUFJSTtRQUZBLGNBQVMsR0FBWSxDQUFDLENBQUM7UUFHbkIsSUFBSSxLQUFLLEdBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsbUJBQUksR0FBSixVQUFLLENBQVUsRUFBRSxDQUFVO1FBQ3ZCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLGVBQWU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLG9C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S0FBQSxPQUFPLENBQUMsUUFBUSxFQUFoQixjQUFnQixFQUFoQixJQUFnQjtZQUE1QixJQUFJLElBQUksU0FBQTtZQUNSLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixLQUFLLENBQUM7WUFDVixDQUFDO1NBQ0o7UUFDRCw2QkFBNkI7SUFDakMsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQTlFQSxBQThFQyxJQUFBO0FBOUVZLDRCQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IE1vdmVtZW50IH0gZnJvbSBcIi4uL3RzL21vZHVsZXMvbW92ZW1lbnRcIlxyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL3RzL21vZHVsZXMvZ2FtZVwiXHJcblxyXG5sZXQgZ2FtZSA6IEdhbWUgPSBuZXcgR2FtZSgpO1xyXG5uZXcgTW92ZW1lbnQoZ2FtZSk7IiwiZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgZmllbGQgOiBudW1iZXJbXVtdO1xyXG4gICAgc2l6ZUZpZWxkIDogbnVtYmVyID0gMztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgZmllbGQgOiBudW1iZXJbXVtdID0gW1stMSwgLTEsIC0xXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFstMSwgLTEsIC0xXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFstMSwgLTEsIC0xXV07XHJcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xyXG4gICAgfVxyXG4gICAgbW92ZShpIDogbnVtYmVyLCBqIDogbnVtYmVyKSA6IGJvb2xlYW4gfCBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuZmllbGRbaV1bal0gPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vINCS0YvQsdC+0YAg0LjQs9GA0L7QutCwXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRbaV1bal0gPSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ4XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi4vbW9kdWxlcy9nYW1lXCJcclxuXHJcbmludGVyZmFjZSBFbGVtZW50cyB7XHJcbiAgICBjZWxscyA6IEpRdWVyeTtcclxuICAgIGJvZHkgOiBKUXVlcnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb3ZlbWVudCB7XHJcbiAgICBnYW1lIDogR2FtZTtcclxuICAgIGVsZW1lbnRzIDogRWxlbWVudHM7XHJcbiAgICBrZXlDb2RlcyA6IG51bWJlcltdID0gWzg3LCAxMTksIDY1LCA5NywgODMsIDExNSwgNjgsIDEwMCwgMzcsIDM4LCAzOSwgNDBdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3Rvci5cclxuICAgICAqIEBwYXJhbSBfZ2FtZSBDbGFzcyB3aGVyZSBkZWZpbmVkIFwiZ2FtZSBydWxlc1wiLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihfZ2FtZSA6IEdhbWUpIHtcclxuICAgICAgICB0aGlzLmluaXRFbGVtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IF9nYW1lO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IGVsZW1lbnQgZm9yIHNldCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RWxlbWVudHMoKSB7XHJcbiAgICAgICAgLy8gSW5pdCBlbGVtZW50cy5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge1xyXG4gICAgICAgICAgICBjZWxscyA6ICQoXCJbZGF0YS1jZWxsXVwiKSxcclxuICAgICAgICAgICAgYm9keSA6ICQoXCJib2R5XCIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBTZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jZWxscy5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbkNsaWNrKGVsLCB0aGlzLmNsaWNrLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxpc3RlbktleVVwKHRoaXMuZWxlbWVudHMuYm9keSwgdGhpcy5tb3ZpbmcsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgY2xpY2sgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gZWwgRWxlbWVudCBmb3Igc2V0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBvZiBcIk1vdmVtZW50XCIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuQ2xpY2soZWwgOiBPYmplY3QsIGNhbGxiYWNrIDogYW55LCBjb250ZXh0IDogYW55KSB7XHJcbiAgICAgICAgJChlbCkub24oXCJjbGlja1wiLCAoZXZlbnRPYmplY3QgOiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNlbGxzLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlbCA9PT0gZXZlbnRPYmplY3QudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgY29udGV4dCwgZXZlbnRPYmplY3QudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNldCBrZXlVcCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqIEBwYXJhbSBlbCBFbGVtZW50IGZvciBzZXQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24gZm9yIHByb2Nlc3NpbmcuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBDb250ZXh0IG9mIFwiTW92ZW1lbnRcIi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5LZXlVcChlbCA6IE9iamVjdCwgY2FsbGJhY2sgOiBhbnksIGNvbnRleHQgOiBhbnkpIHtcclxuICAgICAgICAkKGVsKS5vbihcImtleXVwXCIsIChlIDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZS5rZXlDb2RlLCBjb250ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiBjbGljayBvbiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsaWNrKGluZGV4OiBudW1iZXIsIGNvbnRleHQgOiBhbnksIGVsIDogT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IGkgOiBudW1iZXIgPSBNYXRoLmZsb29yKGluZGV4IC8gY29udGV4dC5nYW1lLnNpemVGaWVsZCk7XHJcbiAgICAgICAgbGV0IGogOiBudW1iZXIgPSBpbmRleCAtIGNvbnRleHQuZ2FtZS5zaXplRmllbGQgKiBpO1xyXG4gICAgICAgIGxldCByZXN1bHQgOiBhbnkgPSBjb250ZXh0LmdhbWUubW92ZShpLCBqKTtcclxuICAgICAgICBpZihyZXN1bHQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVsKTtcclxuICAgICAgICAgICAgJChlbCkudGV4dChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiBtb3ZlIHRvIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0ga2V5Q29kZSBLZXkgY29kZSBvZiBwcmVzc2VkIGJ1dHRvbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3Zpbmcoa2V5Q29kZSA6IG51bWJlciwgY29udGV4dCA6IGFueSkge1xyXG4gICAgICAgIGZvcihsZXQgY29kZSBvZiBjb250ZXh0LmtleUNvZGVzKSB7XHJcbiAgICAgICAgICAgIGlmKGtleUNvZGUgPT09IGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29udGV4dC5nYW1lKTtcclxuICAgIH1cclxufSJdfQ==
