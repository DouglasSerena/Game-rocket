import { Maps } from "../maps/map";
import { AnyVector, Vector2 } from "../math/vector2";
import { GameObject, SHAPES } from "./gameobject";

export class Rectangle extends GameObject {
  public type: SHAPES = SHAPES.RECTANGLE;

  constructor(
    coord: Required<AnyVector>,
    public width: number,
    public height: number,
    public fillColor: string = "#fff",
    public strokeColor: string = null
  ) {
    super(coord, new Vector2({ x: 0, y: 0 }));
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.fillColor) {
      context.fillStyle = this.isColliding ? "red" : this.fillColor;
      context.fillRect(this.coord.x, this.coord.y, this.width, this.height);
    }
    if (this.strokeColor) {
      context.strokeStyle = this.isColliding ? "red" : this.strokeColor;
      context.strokeRect(this.coord.x, this.coord.y, this.width, this.height);
    }
  }

  public collision(object: Rectangle) {
    // TOP - BOTTOM
    if (this.coord.y < object.height + object.coord.y) {
    }
    // LEFT - RIGHT
    if (this.width + this.coord.x > object.coord.x) {
    }
    // BOTTOM - TOP
    if (this.height + this.coord.y <= object.coord.y) {
      this.velocity.setY(0);
    }
    // RIGHT - LEFT
    if (this.coord.x < object.width + object.coord.x) {
    }
  }

  public detectCollisions(object: Rectangle) {
    switch (object.type) {
      case SHAPES.RECTANGLE:
        this.isColliding = !(
          this.coord.y > object.height + object.coord.y ||
          this.width + this.coord.x < object.coord.x ||
          this.height + this.coord.y < object.coord.y ||
          this.coord.x > object.width + object.coord.x
        );
        object.isColliding = this.isColliding;
        break;
    }
  }

  public detectEdgeCollisions(map: Maps) {
    if (this.coord.x < 0) {
      this.velocity.setX(Math.abs(this.velocity.x) * 0);
      this.coord.setX(0);
    } else if (this.coord.x + this.width > map.width) {
      this.velocity.setX(-Math.abs(this.velocity.x) * 0);
      this.coord.setX(map.width - this.width);
    }

    if (this.coord.y < 0) {
      this.velocity.setY(Math.abs(this.velocity.y) * 0);
      this.coord.setY(0);
    } else if (this.coord.y + this.height > map.height) {
      this.velocity.setY(-Math.abs(this.velocity.y) * 0);
      this.coord.setY(map.height - this.height);
    }
  }
}
