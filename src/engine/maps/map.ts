import { Engine } from "../engine";
import { Vector2 } from "../math/vector2";

export class Maps {
  public image = null;

  private _width: number = 0;
  private _height: number = 0;

  public get width() {
    return this._width;
  }
  public set width(width: number) {
    this._width = width;
    this.generate();
  }

  public set height(height: number) {
    this._height = height;
    this.generate();
  }
  public get height() {
    return this._height;
  }

  constructor(public engine: Engine, width: number, height: number) {
    this._width = width || engine.context.canvas.width;
    this._height = height || engine.context.canvas.height;

    this.generate();
  }

  public draw(context: CanvasRenderingContext2D) {
    let width = this.image.width;
    let height = this.image.height;

    context.drawImage(this.image, 0, 0, width, height, 0, 0, width, height);
  }

  private generate() {
    let context = document.createElement("canvas").getContext("2d");
    context.canvas.width = this._width;
    context.canvas.height = this._height;

    const rows = ~~(this._width / 40) + 1;
    const columns = ~~(this._height / 40) + 1;

    context.save();
    for (let row = 0, index = 0; index < rows; row += 40, index++) {
      for (let col = 0, index2 = 0; index2 < columns; col += 40, index2++) {
        if (index % 2 === 0) {
          context.fillStyle = index2 % 2 === 1 ? "#202124" : "#303134";
        } else {
          context.fillStyle = index2 % 2 === 0 ? "#202124" : "#303134";
        }
        context.fillRect(row, col, 40, 40);
      }
    }
    context.restore();

    this.image = new Image();
    this.image.src = context.canvas.toDataURL("image/png");

    context = null;
  }
}
