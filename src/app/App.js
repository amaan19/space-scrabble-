"use strict";
exports.__esModule = true;
var Player_1 = require("./Player");
var Enemy_1 = require("./Enemy");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.started = false;
        this.start = function () {
            _this.entities = [];
            _this.enemies = [];
            _this.gameFieldRect = new Rectangle(0, 0, 300, 180);
            _this.addEntity(new Player_1.Player(new Vector2d(100, 175), 25, new Vector2d(0, -1)));
            _this.addEntity(new Enemy_1.Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
            _this.addEntity(new Enemy_1.Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
            _this.addEntity(new Enemy_1.Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
            _this.addEntity(new Enemy_1.Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
            _this.addEntity(new Enemy_1.Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));
            if (!_this.started) {
                window.requestAnimationFrame(_this.update);
                _this.started = true;
            }
        };
        this.removeEntities = function () {
            if (!_this.entities)
                return;
            var isNotInEntities = function (item) {
                return !_this.entities.includes(item);
            };
            _this.entities = _this.entities.filter(isNotInEntities);
            _this.enemies = _this.enemies.filter(isNotInEntities);
            if (_this.entities.includes(_this.player)) {
                _this.player = undefined;
            }
        };
        this.update = function () {
            var dt = 1 / 60;
            physics.update(dt);
            var i;
            for (i = _this.entities.length - 1; i >= 0; i--) {
                _this.entities[i].update(dt);
            }
            renderer.render(dt);
            window.requestAnimationFrame(_this.update);
        };
    }
    Game.prototype.addEntity = function (entity) {
        this.entities.push(entity);
        if (entity instanceof Player_1.Player) {
            this.player = entity;
        }
        if (entity instanceof Enemy_1.Enemy) {
            this.enemies.push(entity);
        }
    };
    return Game;
}());
var Entity = /** @class */ (function () {
    function Entity(position, speed, direction) {
        var _this = this;
        this.collisionRect = function () {
            return new Rectangle(_this.position.x - _this.width / 2, _this.position.y - _this.height / 2, _this.width, _this.height);
        };
        this.position = position;
        this.speed = speed;
        this.direction = direction;
        this.time = 0;
        this.width = 5;
        this.height = 5;
        this.hp = 1;
    }
    Entity.prototype.update = function (dt) {
        this.time += dt;
    };
    return Entity;
}());
exports.Entity = Entity;
