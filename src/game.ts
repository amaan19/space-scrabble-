import { Physics } from "./app/Physics";
import { Renderer } from "./app/Renderer";
import { Game } from "./app/App";

const physics = new Physics();
const renderer = new Renderer();
const game = new Game();
game.start();
