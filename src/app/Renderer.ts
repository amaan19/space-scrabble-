import { Entity, Game } from "./App";
import { Player } from "./Player";
import { Enemy } from "./Enemy";

export class Renderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: any;
  height: any;

  //Change to number and show to Sam

  constructor() {
    this.canvas = document.querySelector("#game-layer") as unknown as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  enemyColors = [
    "rgb(150, 7, 7)",
    "rgb(150, 89, 7)",
    "rgb(56, 150, 7)",
    "rgb(7, 150, 122)",
    "rgb(46, 7, 150)"
  ];

  drawRectangle = (colour: string, entity: Entity) => {
    this.context.fillStyle = colour;
    this.context.fillRect(
      entity.position.x - entity.width / 2,
      entity.position.y - entity.height / 2,
      entity.width,
      entity.height
    );
  };

  render = (dt: number, entities: Entity[]) => {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height);

    let i;
    let entity;

    for (i = 0; i < entities.length; i++) {
      entity = entities[i];
      if (entity instanceof Enemy) {
        this.drawRectangle(this.enemyColors[entity.rank], entity);
      } else if (entity instanceof Player) {
        this.drawRectangle("rgb(255, 255, 0)", entity);
      }
    }
  };
}
