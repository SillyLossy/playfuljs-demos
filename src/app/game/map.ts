import { Bitmap } from "./bitmap";

export class Map {
  size: number;
  wallGrid: Uint8Array;
  skybox: Bitmap;
  wallTexture: Bitmap;
  light: number;

  constructor(size: number) {
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
    this.skybox = new Bitmap("assets/deathvalley_panorama.jpg", 2000, 750);
    this.wallTexture = new Bitmap("assets/wall_texture.jpg", 1024, 1024);
    this.light = 0;
  }

  get(x: number, y: number): number {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
      return -1;
    }
    return this.wallGrid[y * this.size + x];
  }

  randomize() {
    for (var i = 0; i < this.size * this.size; i++) {
      this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
    }
  }

  update(seconds: number) {
    if (this.light > 0) {
      this.light = Math.max(this.light - 10 * seconds, 0);
    } else if (Math.random() * 5 < seconds) {
      this.light = 2;
    }
  }
}
