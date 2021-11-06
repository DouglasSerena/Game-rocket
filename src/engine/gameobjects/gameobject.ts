import { Engine } from "../engine";
import { Maps } from "../maps/map";
import { AnyVector, Vector2 } from "./../math/vector2";

export enum OBJECTS {
  RECTANGLE,
}

export abstract class GameObject {
  public abstract type: OBJECTS;
  public engine: Engine;
  public coord: Vector2;
  public velocity: Vector2;
  public isColliding: boolean = false;
  public speed: number = 1.2;

  constructor(coord: Required<AnyVector>, velocity: Required<AnyVector>) {
    this.coord = new Vector2(coord);
    this.velocity = new Vector2(velocity);
  }

  public init(): void {}
  public destroy() {}

  public abstract draw(context: CanvasRenderingContext2D): void;
  public update(fps: number, context: CanvasRenderingContext2D): void {
    this.coord.addX(this.velocity.x * fps);
    this.coord.addY(this.velocity.y * fps);
  }

  public abstract collision(gameObject: GameObject): void;
  public abstract detectEdgeCollisions(map: Maps): void;
  public physical(fps: number): void {
    this.velocity.addY(9.81 * fps);
    this.coord.addX(this.velocity.x * fps);
    this.coord.addY(this.velocity.y * fps);
  }

  public moveTo(coord: Vector2 | { x?: number; y?: number }) {
    if (coord.x < 0) coord.x = 0;
    if (coord.y < 0) coord.y = 0;
    if (coord.x > this.engine.maps.width) coord.x = this.engine.maps.width;
    if (coord.y > this.engine.maps.height) coord.y = this.engine.maps.height;

    this.coord.setFromObject(coord);
  }
}
