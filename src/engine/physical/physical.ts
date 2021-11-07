import { AnyVector } from "../math/vector2";
import { Collision } from "./collision";

export abstract class Physical extends Collision {
  public gravity = false;

  constructor(coord: Required<AnyVector>, velocity: Required<AnyVector>) {
    super(coord, velocity);
  }

  public update(fps: number, context: CanvasRenderingContext2D) {
    if (!this.immobile) {
      if (this.gravity) {
        this.velocity.addY(9.81 * fps);
      }
      this.coord.addX(this.velocity.x * fps);
      this.coord.addY(this.velocity.y * fps);
    }
  }
}
