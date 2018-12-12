export class Controls {
  static readonly codes = {
    37: "left",
    39: "right",
    38: "forward",
    40: "backward"
  };

  static readonly defaultStates = {
    left: false,
    right: false,
    forward: false,
    backward: false
  };

  states = Controls.defaultStates;

  constructor() {
    document.addEventListener("keydown", this.onKey.bind(this, true), false);
    document.addEventListener("keyup", this.onKey.bind(this, false), false);
    document.addEventListener("touchstart", this.onTouch.bind(this), false);
    document.addEventListener("touchmove", this.onTouch.bind(this), false);
    document.addEventListener("touchend", this.onTouchEnd.bind(this), false);
  }

  onTouch(e) {
    var t = e.touches[0];
    this.onTouchEnd(e);
    if (t.pageY < window.innerHeight * 0.5)
      this.onKey(true, {
        keyCode: 38
      });
    else if (t.pageX < window.innerWidth * 0.5)
      this.onKey(true, {
        keyCode: 37
      });
    else if (t.pageY > window.innerWidth * 0.5)
      this.onKey(true, {
        keyCode: 39
      });
  }

  onTouchEnd(e) {
    this.states = {
      left: false,
      right: false,
      forward: false,
      backward: false
    };
    e.preventDefault();
    e.stopPropagation();
  }

  onKey(val, e) {
    const state = Controls.codes[e.keyCode];
    if (typeof state === "undefined") return;
    this.states[state] = val;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }
}
