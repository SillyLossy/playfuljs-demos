export class GameLoop {
  lastTime: number;
  callback: Function;

  constructor() {
    this.lastTime = 0;
    this.callback = function() {};
    this.frame = this.frame.bind(this);
  }

  start(callback): void {
    this.callback = callback;
    requestAnimationFrame(this.frame);
  }

  frame(time: number): void {
    let seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2) {
      this.callback(seconds);
    }
    requestAnimationFrame(this.frame);
  }
}
