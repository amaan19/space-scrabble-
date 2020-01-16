export class Physics {
    update = (dt: number) => {
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

export class Vector2d {
    x: number;
    y: number; 

    constructor(x: number, y:number) {
        this.x = x
        this.y = y 
    }

    static vectorAdd = (v1: Vector2d, v2: Vector2d) => {
        return new Vector2d(v1.x + v2.x, v1.y + v2.y);
    }

    static vectorSubtract = (v1: Vector2d, v2: Vector2d) => {
        return new Vector2d(v1.x - v2.x, v1.y - v2.y);
    }

    static vectorScalarMultiply = (v: Vector2d, s: number) => {
        return new Vector2d(v.x * s, v.y * s)
    }

    static vectorLength = (v: Vector2d) => {
        return Math.sqrt(v.x * v.x + v.y * v.y)
    }

    static vectorNormalise = (v: Vector2d) =>  {
        let reciprocal = 1.0 / (Vector2d.vectorLength(v) + 1.0e-037);
        return Vector2d.vectorScalarMultiply(v, reciprocal)
    }

}

export class Rectangle {
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
        return this.y + this.height 
    }

    intersects = (rectangle: Rectangle) => {
        return this.right() >= rectangle.left() && this.left() <= rectangle.right() && this.top() <= rectangle.bottom() && this.bottom() >= rectangle.top();
    }

    static rectUnion = (r1: Rectangle, r2: Rectangle) => {
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