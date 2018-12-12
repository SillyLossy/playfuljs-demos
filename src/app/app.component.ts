import { Component, OnInit } from "@angular/core";
import { Player, Controls, Map, Camera, Globals, GameLoop } from "./game";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  display: HTMLCanvasElement;
  player: Player;
  map: Map;
  controls: Controls;
  camera: Camera;
  loop: GameLoop;

  constructor() {}

  ngOnInit(): void {
    this.display = document.getElementById("display") as HTMLCanvasElement;
    this.player = new Player(15.3, -1.2, Math.PI * 0.3);
    this.map = new Map(32);
    this.controls = new Controls();
    this.camera = new Camera(this.display, Globals.MOBILE ? 160 : 320, 0.8);
    this.loop = new GameLoop();

    this.map.randomize();

    this.loop.start(seconds => {
      this.map.update(seconds);
      this.player.update(this.controls.states, this.map, seconds);
      this.camera.render(this.player, this.map);
    });
  }
}
