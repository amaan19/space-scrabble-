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
    function Entity(x, y) {
        this.x = x;
        this.y = y;
    }
    return Entity;
}());
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.update = function () {
            if (_this.y <= 0 || _this.y + _this.height >= game.gameFieldHeight) {
                _this.direction *= -1;
            }
        };
        _this.width = 20;
        _this.height = 20;
        _this.direction = -1;
        return _this;
    }
    return Player;
}(Entity));
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.update = function () {
            if (_this.y <= 0 || _this.y + _this.height >= game.gameFieldHeight) {
                _this.direction *= -1;
            }
        };
        _this.width = 10;
        _this.height = 10;
        _this.direction = 1;
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
// let renderer = (function() {
//   function _drawEnemy(context, enemy) {
//     context.fillStyle = "red";
//     context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
//   }
//   function _drawPlayer(context, player) {
//     context.fillStyle = "blue";
//     context.fillRect(player.x, player.y, player.width, player.height);
//   }
//   function _render() {
//     let canvas = document.querySelector("#game-layer");
//     let context = canvas.getContext("2d");
//     context.fillStyle = "gray";
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     let i;
//     let entity;
//     let entities = game.entities();
//     for (i = 0; i < entities.length; i++) {
//       entity = entities[i];
//       if (entity instanceof Enemy) {
//         _drawEnemy(context, entity);
//       } else if (entity instanceof Player) {
//         _drawPlayer(context, entity);
//       }
//     }
//   }
//   return {
//     render: _render
//   };
// })();
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
// let physics = (function() {
//   function _update() {
//     let i;
//     let entities = game.entities();
//     for (i = 0; i < entities.length; i++) {
//       entities[i].y += entities[i].direction;
//     }
//   }
//   return {
//     update: _update
//   };
// })();
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
var game = new Game();
var physics = new Physics();
var renderer = new Renderer();
game.start();
// let game = (function() {
//   let _gameFieldHeight = 200;
//   let _entities = [];
//   function _start() {
//     _entities.push(new Player(100, 175, 0));
//     _entities.push(new Enemy(20, 25));
//     _entities.push(new Enemy(80, 25));
//     _entities.push(new Enemy(160, 25));
//     window.requestAnimationFrame(this.update.bind(this));
//   }
//   update() {
//     physics.update();
//     let i;
//     for (i = 0; i < _entities.length; i++) {
//       _entities[i].update();
//     }
//     renderer.render();
//     window.requestAnimationFrame(this.update.bind(this));
//   }
// }
//   function _update() {
//     physics.update();
//     let i;
//     for (i = 0; i < _entities.length; i++) {
//       _entities[i].update();
//     }
//     renderer.render();
//     window.requestAnimationFrame(this.update.bind(this));
//   }
//   return {
//     start: _start,
//     update: _update,
//     entities: function() {
//       return _entities;
//     },
//     gameFieldHeight: function() {
//       return _gameFieldHeight;
//     }
//   };
// })();
