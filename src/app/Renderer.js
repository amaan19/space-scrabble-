"use strict";
exports.__esModule = true;
var Renderer = /** @class */ (function () {
    function Renderer() {
        var _this = this;
        this.canvas = document.querySelector("#game-layer");
        this.context = this.canvas.getContext("2d");
        this.enemyColors = ["rgb(150, 7, 7)",
            "rgb(150, 89, 7)",
            "rgb(56, 150, 7)",
            "rgb(7, 150, 122)",
            "rgb(46, 7, 150)"];
        this.drawRectangle = function (colour, entity) {
            _this.context.fillStyle = colour;
            _this.context.fillRect(entity.position.x - entity.width / 2, entity.position.y - entity.height / 2, entity.width, entity.height);
        };
        this.render = function (dt) {
            _this.context.fillStyle = "black";
            _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
            var i;
            var entity;
            var entities = game.entities;
            for (i = 0; i < entities.length; i++) {
                entity = entities[i];
                if (entity instanceof Enemy) {
                    _this.drawRectangle(_this.enemyColors[entity.rank], entity);
                }
                else if (entity instanceof Player) {
                    _this.drawRectangle("rgb(255, 255, 0)", entity);
                }
            }
        };
    }
    return Renderer;
}());
exports.Renderer = Renderer;
