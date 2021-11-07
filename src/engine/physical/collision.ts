import { GameObject } from "../gameobjects/gameobject";
import { Maps } from "../maps/map";
import { AnyVector, Vector2 } from "../math/vector2";

export abstract class Collision {
  public mass: number = 1;
  public restitution = 0.2;

  public isColliding: boolean = false;
  public immobile = false;

  public velocity: Vector2;
  public coord: Vector2;

  constructor(coord: Required<AnyVector>, velocity: Required<AnyVector>) {
    this.coord = new Vector2(coord);
    this.velocity = new Vector2(velocity);
  }

  public collision(object: GameObject): void {
    this.isColliding = true;
    const velocity = new Vector2({
      x: object.coord.x - this.coord.x,
      y: object.coord.y - this.coord.y,
    });
    const distance = this.coord.distance(object.coord);
    const vNormalized = velocity.divide(distance);
    const vRelative = this.velocity.clone().subtract(object.velocity);
    let speed = vRelative.dot(vNormalized);
    // speed *= Math.min(this.restitution, object.restitution);

    if (speed > 0) {
      const impulse = (2 * speed) / (this.mass + object.mass);

      if (!this.immobile) {
        this.velocity.subtractX(impulse * object.mass * vNormalized.x);
        this.velocity.subtractY(impulse * object.mass * vNormalized.y);
      }
      if (!object.immobile) {
        object.velocity.subtractX(impulse * this.mass * vNormalized.x);
        object.velocity.subtractY(impulse * this.mass * vNormalized.y);
      }
    }
  }

  public detectCollisions(gameObject: GameObject): void {}
  public detectEdgeCollisions(map: Maps): void {}
}
