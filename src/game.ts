import { Engine } from "./engine/engine";
import { Player } from "./player/player";

window.onload = () => {
  const container = document.querySelector("#game");
  const engine = new Engine(container.clientWidth, container.clientHeight);

  container.appendChild(engine.canvas);

  const player = engine.factory.create(Player, { x: 20, y: 20 });
  engine.objects.add(player);
  engine.camera.follower = player;
  // engine.objects.add(
  //   engine.factory.create(
  //     Rectangle,
  //     { x: 50, y: engine.canvas.height - 50 },
  //     engine.canvas.width - 100,
  //     20
  //   )
  // );

  engine.start();
};
