import { Entity } from "./App";
import { Vector2d } from "./Physics";

export class Player extends Entity {
  width: number;
  height: number;

  constructor(position: Vector2d, speed: number, direction: Vector2d) {
    super(position, speed, direction);
    this.width = 20;
    this.height = 10;
  }

  update = (dt: number) => {
    super.update(dt);
    if (
      this.collisionRect().top() <= 0 ||
      this.collisionRect().bottom() >= game.gameFieldRect.bottom()
    ) {
      this.direction.y *= -1;
    }
  };
}
