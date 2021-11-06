import { collision } from "../engine/collision/collision";
import { GameObject, OBJECTS } from "../engine/gameobjects/gameobject";
import { Maps } from "../engine/maps/map";
import { AnyVector, Vector2 } from "../engine/math/vector2";

export class Player extends GameObject {
  public type: OBJECTS = OBJECTS.RECTANGLE;

  public speed = 1.1;
  public width = 20;
  public height = 20;

  constructor(coord: AnyVector) {
    super(coord, new Vector2({ x: 0, y: 0 }));
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "red";
    context.fillRect(this.coord.x, this.coord.y, this.width, this.height);
  }

  public update(fps: number, context: CanvasRenderingContext2D) {
    if (this.engine.keyboard.press("arrow_up")) {
      this.velocity.addY(-this.speed);
    }
    if (this.engine.keyboard.press("arrow_right")) {
      this.velocity.addX(this.speed);
    }
    if (this.engine.keyboard.press("arrow_down")) {
      this.velocity.addY(this.speed);
    }
    if (this.engine.keyboard.press("arrow_left")) {
      this.velocity.addX(-this.speed);
    }
    super.update(fps, context);
    super.physical(fps);
  }

  public collision(gameObject: GameObject) {
    this.isColliding = collision(this).with(gameObject);
  }

  public detectEdgeCollisions(map: Maps) {
    if (this.coord.x < 0) {
      this.velocity.setX(Math.abs(this.velocity.x) * 0.9);
      this.coord.setX(0);
    } else if (this.coord.x + this.width > map.width) {
      this.velocity.setX(-Math.abs(this.velocity.x) * 0.9);
      this.coord.setX(map.width - this.width);
    }

    if (this.coord.y < 0) {
      this.velocity.setY(Math.abs(this.velocity.y) * 0.9);
      this.coord.setY(0);
    } else if (this.coord.y + this.height > map.height) {
      this.velocity.setY(-Math.abs(this.velocity.y) * 0.9);
      this.coord.setY(map.height - this.height);
    }
  }
}
