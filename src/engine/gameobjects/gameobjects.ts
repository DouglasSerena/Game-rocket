import { Engine } from "../engine";
import { GameObject } from "./gameobject";

export class GameObjects {
  public objects: GameObject[] = [];

  constructor(public engine: Engine) {}

  public add(object: GameObject) {
    this.objects.push(object);
  }
  public remove(object: GameObject) {
    object.destroy();
    delete this.objects[this.objects.indexOf(object)];
  }

  public draw(context: CanvasRenderingContext2D) {
    for (const object of this.objects) {
      context.save();
      object.draw(context);
      context.restore();
    }
  }

  public update(fps: number, context: CanvasRenderingContext2D) {
    this.detectCollisions();

    for (const object of this.objects) {
      object.update(fps, context);
    }
  }

  public detectCollisions() {
    for (const object of this.objects) {
      object.isColliding = false;
    }

    for (let current = 0; current < this.objects.length; current++) {
      this.objects.at(current).detectEdgeCollisions(this.engine.maps);
      for (let next = current + 1; next < this.objects.length; next++) {
        this.objects.at(current).collision(this.objects.at(next));
      }
    }
  }
}
