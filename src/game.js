"use strict";
exports.__esModule = true;
var Physics_1 = require("./app/Physics");
var Renderer_1 = require("./app/Renderer");
var App_1 = require("./app/App");
var physics = new Physics_1.Physics();
var renderer = new Renderer_1.Renderer();
var game = new App_1.Game();
game.start();
