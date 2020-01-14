// Game Entities
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
// Player Object
var Entity = /** @class */ (function () {
    function Entity(position, speed, direction) {
        var _this = this;
        this.update = function (dt) {
            _this.time += dt;
        };
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
    return Entity;
}());
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(position, speed, direction) {
        var _this = _super.call(this, position, speed, direction) || this;
        _this.update = function (dt) {
            _super.prototype.update.call(_this, dt);
            if (_this.collisionRect().top() <= 0 ||
                _this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
                _this.direction.y *= -1;
            }
        };
        _this.width = 20;
        _this.height = 10;
        return _this;
    }
    return Player;
}(Entity));
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(position, speed, direction, rank) {
        var _this = _super.call(this, position, speed, direction) || this;
        _this.update = function (dt) {
            _super.prototype.update.call(_this, dt);
            if (_this.collisionRect().top() <= 0 ||
                _this.collisionRect().bottom() >= game.gameFieldRect().bottom()) {
                _this.direction.y *= -1;
            }
        };
        _this.width = 13;
        _this.height = 10;
        _this.rank = rank;
        return _this;
    }
    return Enemy;
}(Entity));
//Renderer Object
var Renderer = /** @class */ (function () {
    function Renderer() {
        var _this = this;
        this.drawEnemy = function (context, enemy) {
            context.fillStyle = "red";
            context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        };
        this.drawPlayer = function (context, player) {
            context.fillStyle = "blue";
            context.fillRect(player.x, player.y, player.width, player.height);
        };
        this.render = function () {
            var canvas = document.querySelector("#game-layer");
            var context = canvas.getContext("2d");
            context.fillStyle = "gray";
            context.fillRect(0, 0, canvas.width, canvas.height);
            var i;
            var entity;
            var entities = game.entities;
            for (i = 0; i < entities.length; i++) {
                entity = entities[i];
                if (entity instanceof Enemy) {
                    _this.drawEnemy(context, entity);
                }
                else if (entity instanceof Player) {
                    _this.drawPlayer(context, entity);
                }
            }
        };
    }
    return Renderer;
}());
//Physics object
var Physics = /** @class */ (function () {
    function Physics() {
        this.update = function () {
            var i;
            var entities = game.entities;
            for (i = 0; i < entities.length; i++) {
                entities[i].y += entities[i].direction;
            }
        };
    }
    return Physics;
}());
//Game object
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.gameFieldHeight = 200;
        this.entities = [];
        this.start = function () {
            _this.entities.push(new Player(100, 175));
            _this.entities.push(new Enemy(20, 25));
            _this.entities.push(new Enemy(80, 25));
            _this.entities.push(new Enemy(160, 25));
            window.requestAnimationFrame(_this.update);
            // debugger;
        };
        this.update = function () {
            physics.update();
            var i;
            for (i = 0; i < _this.entities.length; i++) {
                _this.entities[i].update();
            }
            renderer.render();
            window.requestAnimationFrame(_this.update);
        };
    }
    return Game;
}());
// let game = new Game();
// let physics = new Physics();
// let renderer = new Renderer();
// game.start();
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2d.vectorAdd = function (v1, v2) {
        return new Vector2d(v1.x + v2.x, v1.y + v2.y);
    };
    Vector2d.vectorSubtract = function (v1, v2) {
        return new Vector2d(v1.x - v2.x, v1.y - v2.y);
    };
    Vector2d.vectorScalarMultiply = function (v, s) {
        return new Vector2d(v.x * s, v.y * s);
    };
    Vector2d.vectorLength = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    Vector2d.vectorNormalise = function (v) {
        var reciprocal = 1.0 / (_this.vectorLength(v) + 1.0e-037);
        return _this.vectorScalarMultiply(v, reciprocal);
    };
    return Vector2d;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        var _this = this;
        this.left = function () {
            return _this.x;
        };
        this.right = function () {
            return _this.x + _this.width;
        };
        this.top = function () {
            return _this.y;
        };
        this.bottom = function () {
            _this.y + _this.height;
        };
        this.intersects = function (rectangle) {
            return _this.right() >= rectangle.left() && _this.left() <= rectangle.right() && _this.top() <= rectangle.botom() && _this.bottom() >= rectangle.top();
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rectangle.rectUnion = function (r1, r2) {
        if (r1 === undefined) {
            return r2;
        }
        if (r2 === undefined) {
            return r1;
        }
        var x = Math.min(r1.x, r2.x);
        var y = Math.min(r1.y, r2.y);
        var width = Math.max(r1.right(), r2.right()) - Math.min(r1.left(), r2.left());
        var height = Math.max(r1.bottom(), r2.bottom()) - Math.min(r1.top(), r2.top());
        return new Rectangle(x, y, width, height);
    };
    return Rectangle;
}());
//Random Number generator 
var randomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};
