import { Keyboard } from "./keyboard/keyboard";
import { GameObjects } from "./gameobjects/gameobjects";
import { GameObjectFactory } from "./gameobjects/gameobject-factory";
import { Maps } from "./maps/map";
import { Camera } from "./camera/camera";

export class Engine {
  public canvas = document.createElement("canvas");
  public context = this.canvas.getContext("2d");
  public cancelable: null | number = null;
  public fps = 60;

  public maps: Maps;
  public camera: Camera;
  public keyboard: Keyboard;
  public objects: GameObjects;
  public factory: GameObjectFactory;

  private lastTime = 0;

  constructor(width: number, height: number) {
    this.canvas.tabIndex = 1;
    this.canvas.width = width;
    this.canvas.height = height;

    this.maps = new Maps(this, 5000, 5000);
    this.keyboard = new Keyboard(this);
    this.objects = new GameObjects(this);
    this.factory = new GameObjectFactory(this);
    this.camera = new Camera(this);
  }

  public draw() {
    this.clear();

    this.camera.begin();
    this.maps.draw(this.context);

    this.objects.draw(this.context);
    this.camera.end();

    this.drawFPS();
  }

  public update(time = 0) {
    this.fps = (time - this.lastTime) / 1000;
    this.lastTime = time;

    // this.camera.moveTo();

    this.objects.update(this.fps, this.context);

    this.draw();

    this.cancelable = requestAnimationFrame(this.update.bind(this));
  }

  public start() {
    if (this.cancelable === null) {
      this.update(0);
    }
  }

  public stop() {
    if (this.cancelable !== null) {
      this.cancelable = null;
      cancelAnimationFrame(this.cancelable);
    }
  }

  private clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawFPS() {
    this.context.save();
    this.context.fillStyle = "#fff";
    this.context.font = "bold 12px";
    const widthText = this.context.measureText(
      `FPS: ${Math.round(1 / this.fps)}`
    );
    this.context.fillText(
      `FPS: ${Math.round(1 / this.fps)}`,
      this.canvas.width - widthText.width - 15,
      20
    );
    this.context.restore();
  }
}
