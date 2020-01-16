import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Rectangle, Vector2d } from "./Physics";

export class Game {
  entities: Entity[];
  enemies: Enemy[];
  player: Player;
  gameFieldRect: Rectangle;
  started = false;

  start = () => {
    this.entities = [];
    this.enemies = [];
    this.gameFieldRect = new Rectangle(0, 0, 300, 180);

    this.addEntity(new Player(new Vector2d(100, 175), 25, new Vector2d(0, -1)));
    this.addEntity(new Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
    this.addEntity(new Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
    this.addEntity(new Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
    this.addEntity(new Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
    this.addEntity(new Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));

    if (!this.started) {
      window.requestAnimationFrame(this.update);
      this.started = true;
    }
  };

  addEntity = (entity: Entity) => {
    this.entities.push(entity);

    if (entity instanceof Player) {
      this.player = entity;
    }

    if (entity instanceof Enemy) {
      this.enemies.push(entity);
    }
  }

  removeEntities = () => {
    if (!this.entities) return;

    let isNotInEntities = (item:Entity) => {
      return !this.entities.includes(item);
    };

    this.entities = this.entities.filter(isNotInEntities);
    this.enemies = this.enemies.filter(isNotInEntities);

    if (this.entities.includes(this.player)) {
      this.player = undefined;
    }
  };

  update = () => {
    let dt = 1 / 60;
    physics.update(dt);

    let i;
    for (i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].update(dt);
    }
    renderer.render(dt);

    window.requestAnimationFrame(this.update);
  };
}

export class Entity {
  position: Vector2d;
  speed: any;
  direction: Vector2d;
  time: number;
  width: number;
  height: number;
  hp: number;
  constructor(position: Vector2d, speed: number, direction: Vector2d) {
    this.position = position;
    this.speed = speed;
    this.direction = direction;
    this.time = 0;
    this.width = 5;
    this.height = 5;
    this.hp = 1;
  }

  update(dt: number) {
    this.time += dt;
  }

  collisionRect = () => {
    return new Rectangle(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );
  };
}
