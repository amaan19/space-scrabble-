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
        this.canvas = document.querySelector("#game-layer");
        this.context = canvas.getContext("2d");
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
//Physics object
var Physics = /** @class */ (function () {
    function Physics() {
        this.update = function (dt) {
            var i;
            var e;
            var velocity;
            var entities = game.entities;
            for (i = entities.length - 1; i >= 0; i--) {
                e = entities[i];
                velocity = Vector2d.vectorScalarMultiply(e.direction, e.speed);
                e.position = Vector2d.vectorAdd(e.position, Vector2d.vectorScalarMultiply(velocity, dt));
            }
        };
    }
    return Physics;
}());
//Game object
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.started = false;
        this.start = function () {
            _this.entities = [];
            _this.enemies = [];
            _this.gameFieldRect = new Rectangle(0, 0, 300, 180);
            _this.addEntity(new Player(new Vector2d(100, 175), 25, new Vector2d(0, -1)));
            _this.addEntity(new Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
            _this.addEntity(new Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
            _this.addEntity(new Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
            _this.addEntity(new Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
            _this.addEntity(new Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));
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
        this.entities.push;
        if (entity instanceof Player) {
            this.player = entity;
        }
        if (entity instanceof Enemy) {
            this.enemies.push(entity);
        }
    };
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
        var reciprocal = 1.0 / (Vector2d.vectorLength(v) + 1.0e-037);
        return Vector2d.vectorScalarMultiply(v, reciprocal);
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
