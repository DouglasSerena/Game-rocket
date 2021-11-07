import { Engine } from "./engine/engine";
import { Player } from "./player/player";
import { Rectangle } from "./engine/gameobjects/rectangle";

window.onload = () => {
  const container = document.querySelector("#game");
  const engine = new Engine(container.clientWidth, container.clientHeight);

  container.appendChild(engine.canvas);

  const player = engine.factory.create(Player, { x: 20, y: 20 });
  const base = engine.factory.create(
    Rectangle,
    { x: 30, y: 100 },
    engine.canvas.width - 100,
    20
  );
  player.velocity.setY(10);

  base.immobile = true;

  engine.objects.add(player);
  engine.objects.add(base);

  engine.camera.follower = player;

  engine.start();
};
