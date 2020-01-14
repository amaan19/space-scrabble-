// // Game Entities
// // Player Object
// class Entity {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   direction: number;
//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//     this.width = 20;
//     this.height = 20;
//     this.direction = -1;
//   }
//   update() {
//     if (this.y <= 0 || this.y + this.height >= game.gameFieldHeight()) {
//       this.direction *= -1;
//     }
//   }
// }
// class Player extends Entity {
//   score: number;
//   constructor(x, y, score: number) {
//     super(x, y);
//     this.score = score;
//   }
// }
// class Enemy extends Entity {}
// //Renderer Object
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
// //Physics object
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
// //Game object
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
// game.start();
