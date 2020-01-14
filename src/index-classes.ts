// Game Entities

// Player Object

class Entity {
    position: any;
    speed: any;
    direction: any;
    time: number;
    width: number;
    height: number;
    hp: number;
  constructor(position, speed, direction) {
    this.position = position
    this.speed = speed
    this.direction = direction
    this.time = 0
    this.width = 5
    this.height = 5
    this.hp = 1
  }

  update(dt) {
      this.time += dt;
  }

  collisionRect = () => {
      return new Rectangle(this.position.x - this.width/2,
                            this.position.y - this.height/2,
                            this.width, 
                            this.height);
      
  }
}

class Player extends Entity {
  width: number;
  height: number;

    constructor(position, speed, direction) {
        super(position, speed, direction);
        this.width = 20;
        this.height = 10;
      }

  update = (dt) => {
      super.update(dt)
    if (this.collisionRect().top() <= 0 || 
    this.collisionRect().bottom() >= game.gameFieldRect.bottom()) {
        this.direction.y *= -1;
    }
}

class Enemy extends Entity {
 
    rank: number;

  constructor(position, speed, direction, rank) {
    super(position, speed, direction);
    this.width = 13;
    this.height = 10;
    this.rank = rank;
  }

  update = (dt) => {
      super.update(dt)
      if (this.collisionRect().top() <= 0 || 
          this.collisionRect().bottom() >= game.gameFieldRect.bottom()) {
              this.direction.y *= -1 
          }
    }
}

//Renderer Object

class Renderer {
    canvas = document.querySelector("#game-layer");
    context = this.canvas.getContext("2d")
    enemyColors = ["rgb(150, 7, 7)",
                        "rgb(150, 89, 7)",
                        "rgb(56, 150, 7)",
                        "rgb(7, 150, 122)",
                        "rgb(46, 7, 150)"];

    drawRectangle = (colour, entity) => {
        this.context.fillStyle = colour;
        this.context.fillRect(entity.position.x - entity.width/2, entity.position.y - entity.height/2, entity.width, entity.height);
    }

    render = dt => {
        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let i;
        let entity;
        let entities = game.entities

        for (i = 0; i < entities.length; i++) {
            entity = entities[i];
            if (entity instanceof Enemy) {
                this.drawRectangle(this.enemyColors[entity.rank], entity);
              } else if (entity instanceof Player) {
                this.drawRectangle("rgb(255, 255, 0)", entity);
              }
    }
    }
}

//Physics object

class Physics {
  
    update = dt => {
    let i;
    let e;
    let velocity;
    let entities = game.entities;

    for (i = entities.length - 1; i >=0; i--) {
        e = entities[i];
        velocity = Vector2d.vectorScalarMultiply( e.direction, e.speed)
        e.position = Vector2d.vectorAdd(e.position, Vector2d.vectorScalarMultiply(velocity, dt))
    }
  };
}


//Game object

class Game {
     entities;
     enemies;
     player;
     gameFieldRect;
     started = false
     
     start = () => {
    this.entities = [];
    this.enemies = [];
    this.gameFieldRect = new Rectangle(0, 0, 300, 180);

    this.addEntity(new Player( new Vector2d(100, 175), 25, new Vector2d(0, -1)));
    this.addEntity(new Enemy(new Vector2d(20, 25), 20, new Vector2d(0, 1), 0));
    this.addEntity(new Enemy(new Vector2d(50, 25), 10, new Vector2d(0, 1), 1));
    this.addEntity(new Enemy(new Vector2d(80, 25), 15, new Vector2d(0, 1), 2));
    this.addEntity(new Enemy(new Vector2d(120, 25), 25, new Vector2d(0, 1), 3));
    this.addEntity(new Enemy(new Vector2d(140, 25), 30, new Vector2d(0, 1), 4));
    
    if(!this.started) {
        window.requestAnimationFrame(this.update);
        this.started = true;
    }
  };

  addEntity(entity) {
      this.entities.push(entity)

      if( entity instanceof Player ) {
        this.player = entity;
    }

    if( entity instanceof Enemy ) {
        this.enemies.push(entity);
    }
  }

  removeEntities = () => {
      if (!this.entities) return; 

      let isNotInEntities = (item) => {
          return !this.entities.includes(item)
      }

      this.entities = this.entities.filter(isNotInEntities);
      this.enemies = this.enemies.filter(isNotInEntities);

      if(this.entities.includes(this.player)) {
          this.player = undefined 
      }
  }

  update = () => {
    let dt = 1/60
    physics.update(dt);

    let i;
    for( i= this.entities.length-1; i>=0; i-- ) {
        this.entities[i].update(dt);
    }
    renderer.render(dt);

    window.requestAnimationFrame(this.update);
  };
}

// let game = new Game();
// let physics = new Physics();
// let renderer = new Renderer();
// game.start();

class Vector2d {
    x: number;
    y: number; 

    constructor(x: number, y:number) {
        this.x = x
        this.y = y 
    }

    static vectorAdd = (v1, v2) => {
        return new Vector2d(v1.x + v2.x, v1.y + v2.y);
    }

    static vectorSubtract = (v1, v2) => {
        return new Vector2d(v1.x - v2.x, v1.y - v2.y);
    }

    static vectorScalarMultiply = (v, s: number) => {
        return new Vector2d(v.x * s, v.y * s)
    }

    static vectorLength = v => {
        return Math.sqrt(v.x * v.x + v.y * v.y)
    }

    static vectorNormalise = v =>  {
        let reciprocal = 1.0 / (Vector2d.vectorLength(v) + 1.0e-037);
        return Vector2d.vectorScalarMultiply(v, reciprocal)
    }

}

class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    left = () => {
        return this.x 
    }

    right = () => {
        return this.x + this.width 
    }

    top = () => {
        return this.y
    }

    bottom = () => {
        this.y + this.height 
    }

    intersects = rectangle => {
        return this.right() >= rectangle.left() && this.left() <= rectangle.right() && this.top() <= rectangle.botom() && this.bottom() >= rectangle.top();
    }

    static rectUnion = (r1, r2) => {
        if (r1 === undefined) {
            return r2; 
        }
        if (r2 === undefined) {
            return r1 
        }

        let x = Math.min(r1.x, r2.x);
        let y = Math.min(r1.y, r2.y);
        let width = Math.max(r1.right(), r2.right()) - Math.min(r1.left(), r2.left());
        let height = Math.max(r1.bottom(), r2.bottom()) - Math.min(r1.top(), r2.top()); 

        return new Rectangle(x, y, width, height);
    }
}
//Random Number generator 

const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const physics = new Physics() 
const renderer = new Renderer()
const game = new Game() 
game.start()


