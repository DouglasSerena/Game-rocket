import { Vector2 } from "../math/vector2";
import { GameObject, OBJECTS } from "./gameobject";

export class Rectangle extends GameObject {
  public type: OBJECTS = OBJECTS.RECTANGLE;

  public get top() {
    return this.coord.y;
  }
  public get right() {
    return this.coord.x + this.width;
  }
  public get bottom() {
    return this.coord.y + this.height;
  }
  public get left() {
    return this.coord.x;
  }

  constructor(
    coord: Vector2 | { x: number; y: number },
    public width: number,
    public height: number,
    public fillColor: string = "#fff",
    public strokeColor: string = null
  ) {
    super(coord, new Vector2({ x: 0, y: 0 }));
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.fillColor) {
      context.fillStyle = this.fillColor;
      context.fillRect(this.coord.x, this.coord.y, this.width, this.height);
    }
    if (this.strokeColor) {
      context.strokeStyle = this.strokeColor;
      context.strokeRect(this.coord.x, this.coord.y, this.width, this.height);
    }
  }
  public update(fps: number): void {}
}
