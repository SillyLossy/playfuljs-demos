import { Map } from "./map";
import { Point } from "./point";
import { Ray } from "./ray";

export class RayCaster {
  map: Map;
  sin: number;
  cos: number;
  point: Point;
  range: number;

  static noWall: Ray = {
    length2: Infinity
  };

  constructor(map: Map, point: Point, angle: number, range: number) {
    this.map = map;
    this.sin = Math.sin(angle);
    this.cos = Math.cos(angle);
    this.point = point;
    this.range = range;
  }

  cast(): Ray[] {
    return this.ray({
      x: this.point.x,
      y: this.point.y,
      height: 0,
      distance: 0
    });
  }

  ray(origin: Ray): Ray[] {
    const stepX = this.step(this.sin, this.cos, origin.x, origin.y, false);
    const stepY = this.step(this.cos, this.sin, origin.y, origin.x, true);
    const nextStep =
      stepX.length2 < stepY.length2
        ? this.inspect(stepX, 1, 0, origin.distance, stepX.y)
        : this.inspect(stepY, 0, 1, origin.distance, stepY.x);

    if (nextStep.distance > this.range) {
      return [origin];
    }
    return [origin].concat(this.ray(nextStep));
  }

  step(
    rise: number,
    run: number,
    x: number,
    y: number,
    inverted: boolean
  ): Ray {
    if (run === 0) {
      return RayCaster.noWall;
    }
    const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * (rise / run);
    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      length2: dx * dx + dy * dy
    };
  }

  inspect(
    step: Ray,
    shiftX: number,
    shiftY: number,
    distance: number,
    offset: number
  ): Ray {
    const dx = this.cos < 0 ? shiftX : 0;
    const dy = this.sin < 0 ? shiftY : 0;
    step.height = this.map.get(step.x - dx, step.y - dy);
    step.distance = distance + Math.sqrt(step.length2);
    if (shiftX) {
      step.shading = this.cos < 0 ? 2 : 0;
    } else {
      step.shading = this.sin < 0 ? 2 : 1;
    }
    step.offset = offset - Math.floor(offset);
    return step;
  }
}
