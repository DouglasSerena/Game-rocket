import { GameObject, OBJECTS } from "../gameobjects/gameobject";

export const collision = (object: GameObject) => {
  function rectangleWithRectangle(object, object2) {
    return !(
      object.coord.y > object2.height + object2.coord.y ||
      object.width + object.coord.x < object2.coord.x ||
      object.height + object.coord.y < object2.coord.y ||
      object.coord.x > object2.width + object2.coord.x
    );
  }

  return {
    with: (object2: GameObject) => {
      if (object.type === OBJECTS.RECTANGLE) {
        if (object2.type === OBJECTS.RECTANGLE) {
          return rectangleWithRectangle(object, object2);
        }
      }
    },
  };
};
