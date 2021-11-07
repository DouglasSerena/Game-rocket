import { Maps } from "../engine/maps/map";
import { AnyVector, Vector2 } from "../engine/math/vector2";
import { GameObject } from "../engine/gameobjects/gameobject";
import { Rectangle } from "./../engine/gameobjects/rectangle";

export class Player extends Rectangle {
  public speed = 1.1;

  constructor(coord: Required<AnyVector>) {
    super(coord, 20, 20);
    this.gravity = false;
  }

  public draw(context: CanvasRenderingContext2D) {
    super.draw(context);

    const center = new Vector2({ x: this.width / 2, y: this.height / 2 });

    context.beginPath();
    context.strokeStyle = "#fff";
    context.moveTo(this.coord.x + center.x, this.coord.y + center.y);
    context.lineTo(
      this.coord.x + this.velocity.x + center.x,
      this.coord.y + this.velocity.y + center.y
    );
    context.stroke();

    context.fillStyle = "#fff";
    context.moveTo(
      this.coord.x + this.velocity.x + center.x,
      this.coord.y + this.velocity.y + center.y
    );
    context.arc(
      this.coord.x + this.velocity.x + center.x,
      this.coord.y + this.velocity.y + center.y,
      4,
      0,
      2 * Math.PI
    );
    context.fill();
  }

  public update(fps: number, context: CanvasRenderingContext2D) {
    super.update(fps, context);
    if (this.engine.keyboard.press("w")) {
      this.velocity.addY(-this.speed);
    }
    if (this.engine.keyboard.press("d")) {
      this.velocity.addX(this.speed);
    }
    if (this.engine.keyboard.press("s")) {
      this.velocity.addY(this.speed);
    }
    if (this.engine.keyboard.press("a")) {
      this.velocity.addX(-this.speed);
    }
  }

  public detectCollisions(object: GameObject) {
    super.detectCollisions(object);
    if (this.isColliding) {
      this.collision(object);
    }
  }
}
