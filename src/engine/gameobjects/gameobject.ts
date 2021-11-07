import { Engine } from "../engine";
import { AnyVector, Vector2 } from "./../math/vector2";
import { Physical } from "../physical/physical";

export enum SHAPES {
  RECTANGLE,
}

export abstract class GameObject extends Physical {
  public abstract type: SHAPES;
  public engine: Engine;
  public speed: number = 1.2;

  constructor(coord: Required<AnyVector>, velocity: Required<AnyVector>) {
    super(coord, velocity);
  }

  public init(): void {}
  public destroy() {}

  public abstract draw(context: CanvasRenderingContext2D): void;
  public update(fps: number, context: CanvasRenderingContext2D): void {
    super.update(fps, context);

    this.coord.addX(this.velocity.x * fps);
    this.coord.addY(this.velocity.y * fps);
  }
}
