import { Entity } from "./App";
import { Vector2d } from "./Physics";

export class Enemy extends Entity {
  rank: number;
  width: number;
  height: number;

  constructor(
    position: Vector2d,
    speed: number,
    direction: Vector2d,
    rank: number
  ) {
    super(position, speed, direction);
    this.width = 13;
    this.height = 10;
    this.rank = rank;
  }

  update = (dt: any) => {
    super.update(dt);
    if (
      this.collisionRect().top() <= 0 ||
      this.collisionRect().bottom() >= game.gameFieldRect.bottom()
    ) {
      this.direction.y *= -1;
    }
  };
}
