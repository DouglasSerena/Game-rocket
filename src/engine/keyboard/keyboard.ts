import { snakeCase } from "lodash";
import { Engine } from "../engine";

export class Keyboard {
  public keysPress = new Map<string, boolean>();

  constructor(public engine: Engine) {
    engine.context.canvas.addEventListener("keyup", this.listenerUp);
    engine.context.canvas.addEventListener("keydown", this.listenerDown);
  }

  public press(verify?: string) {
    if (verify) {
      const keys = verify.split(".");
      for (let key of keys) {
        if (!this.keysPress.has(snakeCase(key))) {
          return false;
        }
      }
      return true;
    }
    return this.keysPress.keys();
  }

  private listenerUp = (event: KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.keysPress.delete(snakeCase(event.key));
    this.keysPress.delete(snakeCase(event.code));
  };
  private listenerDown = (event: KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.keysPress.set(snakeCase(event.key), true);
    this.keysPress.set(snakeCase(event.code), true);
  };
}
