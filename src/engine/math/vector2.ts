export type AnyVector = Vector2 | { x: number; y: number };

export class Vector2 {
  public x = 0;
  public y = 0;

  constructor(vector2: Vector2);
  constructor(vector: { x: number; y: number });
  constructor(vector: AnyVector) {
    this.x = vector.x || 0;
    this.y = vector.y || 0;
  }

  public clone() {
    return new Vector2({ x: this.x, y: this.y });
  }

  public copy(vector2: Vector2) {
    this.x = vector2.x ? vector2.x : this.x;
    this.y = vector2.y ? vector2.y : this.y;

    return this;
  }

  public equals(vector2: Vector2) {
    return this.x === vector2.x && this.y === vector2.y;
  }

  public setFromObject(obj: Partial<AnyVector>) {
    this.x = obj.x ? obj.x : this.x;
    this.y = obj.y ? obj.y : this.y;

    return this;
  }

  public setX(x: number) {
    this.x = x;
    return this;
  }
  public setY(y: number) {
    this.y = y;
    return this;
  }

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  public addX(x: number) {
    this.x += x || 0;
    return this;
  }
  public addY(y: number) {
    this.y += y || 0;
    return this;
  }
  public add(value: number): Vector2;
  public add(vector: AnyVector): Vector2;
  public add(x: number, y: number): Vector2;
  public add(vectorOrX: AnyVector | number, y: number = null) {
    if (typeof vectorOrX === "number") {
      this.x += vectorOrX;
      this.y += y !== null ? y : vectorOrX;
    } else {
      this.x += vectorOrX.x;
      this.y += vectorOrX.y;
    }
    return this;
  }

  public subtractX(x: number) {
    this.x -= x || 0;
    return this;
  }
  public subtractY(y: number) {
    this.y -= y || 0;
    return this;
  }
  public subtract(value: number): Vector2;
  public subtract(vector: AnyVector): Vector2;
  public subtract(x: number, y: number): Vector2;
  public subtract(vectorOrX: AnyVector | number, y: number = null) {
    if (typeof vectorOrX === "number") {
      this.x -= vectorOrX;
      this.y -= y !== null ? y : vectorOrX;
    } else {
      this.x -= vectorOrX.x;
      this.y -= vectorOrX.y;
    }
    return this;
  }

  public multiplyX(x: number) {
    this.x *= x || 0;
    return this;
  }
  public multiplyY(y: number) {
    this.y *= y || 0;
    return this;
  }
  public multiply(value: number): Vector2;
  public multiply(vector: AnyVector): Vector2;
  public multiply(x: number, y: number): Vector2;
  public multiply(vectorOrX: AnyVector | number, y: number = null) {
    if (typeof vectorOrX === "number") {
      this.x *= vectorOrX;
      this.y *= y !== null ? y : vectorOrX;
    } else {
      this.x *= vectorOrX.x;
      this.y *= vectorOrX.y;
    }
    return this;
  }

  public divideX(x: number) {
    this.x /= x || 0;
    return this;
  }
  public divideY(y: number) {
    this.y /= y || 0;
    return this;
  }
  public divide(value: number): Vector2;
  public divide(vector: AnyVector): Vector2;
  public divide(x: number, y: number): Vector2;
  public divide(vectorOrX: AnyVector | number, y?: number) {
    if (typeof vectorOrX === "number") {
      this.x /= vectorOrX;
      this.y /= y === undefined ? vectorOrX : y;
    } else {
      this.x /= vectorOrX.x;
      this.y /= vectorOrX.y;
    }
    return this;
  }

  public scale(value: number) {
    if (isFinite(value)) {
      this.x *= value;
      this.y *= value;
    } else {
      this.x = 0;
      this.y = 0;
    }

    return this;
  }

  public negate() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  public distance(vector: Vector2 | { x: number; y: number }) {
    const dx = this.x - (vector.x || 0);
    const dy = this.y - (vector.y || 0);

    return Math.sqrt(dx * dx + dy * dy);
  }

  public length() {
    const x = this.x;
    const y = this.y;

    return Math.sqrt(x * x + y * y);
  }

  public setLength(length: number) {
    return this.normalize().scale(length);
  }

  public lengthSq() {
    const x = this.x;
    const y = this.y;

    return x * x + y * y;
  }

  public normalize() {
    const x = this.x;
    const y = this.y;
    let len = x * x + y * y;

    if (len > 0) {
      len = 1 / Math.sqrt(len);

      this.x = x * len;
      this.y = y * len;
    }

    return this;
  }

  public dot(vector: Vector2 | { x: number; y: number }) {
    return this.x * vector.x + this.y * vector.y;
  }

  public cross(vector: Vector2 | { x: number; y: number }) {
    return this.x * vector.y - this.y * vector.x;
  }

  public reset() {
    this.x = 0;
    this.y = 0;

    return this;
  }

  public reflect(normal: AnyVector) {
    const _normal = new Vector2(normal).clone().normalize();

    return this.subtract(_normal.scale(2 * this.dot(normal)));
  }

  public mirror(axis: AnyVector) {
    return this.reflect(axis).negate();
  }
}
