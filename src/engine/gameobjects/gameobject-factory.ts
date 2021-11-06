import { Engine } from "../engine";
import { GameObject } from "./gameobject";
import { GetConstructorArgs } from "./../types/get-constructor-args";

export class GameObjectFactory {
  constructor(public engine: Engine) {}
  create<T = GameObject>(object: T, ...params: GetConstructorArgs<T>) {
    const instance = new (object as any)(...params);
    instance.engine = this.engine;
    instance.init();
    return instance;
  }
}
