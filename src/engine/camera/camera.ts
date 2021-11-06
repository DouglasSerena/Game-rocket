import { AnyVector, Vector2 } from "./../math/vector2";
import { Engine } from "../engine";
import { GameObject } from "../gameobjects/gameobject";

export class Camera {
  public follower?: GameObject;

  public aspectRatio: number = 0;
  public distance: number = 1000.0;
  public fieldOfView: number = Math.PI / 4.0;

  public view: Vector2;
  public velocity: Vector2;
  public viewport = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    scale: new Vector2({ x: 1, y: 1 }),
  };

  constructor(public engine: Engine, view?: AnyVector) {
    this.velocity = new Vector2({ x: 0, y: 0 });
    this.view = new Vector2(
      view || {
        x: this.engine.canvas.width / 2,
        y: this.engine.canvas.height / 2,
      }
    );
    this.updateViewport();
    this.addListeners();
  }

  public begin() {
    this.engine.context.save();
    this.applyScale();
    this.applyTranslation();
  }

  public end() {
    if (this.follower) {
      this.view.copy(this.follower.coord);
      this.updateViewport();
    }
    this.engine.context.restore();
  }

  public applyScale() {
    this.engine.context.scale(this.viewport.scale.x, this.viewport.scale.y);
  }

  public applyTranslation() {
    this.engine.context.translate(-this.viewport.left, -this.viewport.top);
  }

  public updateViewport() {
    this.aspectRatio = this.engine.canvas.width / this.engine.canvas.height;
    this.viewport.width = this.distance * Math.tan(this.fieldOfView);
    this.viewport.height = this.viewport.width / this.aspectRatio;
    this.viewport.left = this.view.x - this.viewport.width / 2.0;
    this.viewport.top = this.view.y - this.viewport.height / 2.0;
    this.viewport.right = this.viewport.left + this.viewport.width;
    this.viewport.bottom = this.viewport.top + this.viewport.height;
    this.viewport.scale.x =
      this.engine.context.canvas.width / this.viewport.width;
    this.viewport.scale.y =
      this.engine.context.canvas.height / this.viewport.height;
  }

  public zoomTo(z: number) {
    this.distance = z;
    this.updateViewport();
  }

  public moveTo(vector: AnyVector) {
    this.view.x = vector.x;
    this.view.y = vector.y;
    this.updateViewport();
  }

  public addListeners() {
    this.engine.canvas.addEventListener("wheel", (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.ctrlKey) {
        let { top, left, width, height } =
          this.engine.canvas.getBoundingClientRect();
        let zoomLevel = this.distance + event.deltaY / 1.5;
        if (zoomLevel <= 1) {
          zoomLevel = 1;
        }

        let offsetX = event.x - left;
        let offsetY = event.y - top;

        this.zoomTo(zoomLevel);
        this.moveTo({
          x: this.view.x - ((offsetX - width / 2) * event.deltaY) / 1000,
          y: this.view.y - ((offsetY - height / 2) * event.deltaY) / 1000,
        });
      } else if (event.shiftKey) {
        this.moveTo({
          x: this.view.x - event.deltaY / 2.5,
          y: this.view.y - event.deltaX / 2.5,
        });
      } else {
        this.moveTo({
          x: this.view.x + event.deltaX / 2.5,
          y: this.view.y + event.deltaY / 2.5,
        });
      }
    });

    this.engine.canvas.addEventListener("keydown", (event) => {
      if (event.key === "r") {
        this.zoomTo(1000);
      }
    });
  }
}
