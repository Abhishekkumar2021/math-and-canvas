import { H, UNIT, W } from "./main";

export interface Point {
  x: number;
  y: number;
}

export class Line {
  constructor(public start: Point, public end: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.start.x * UNIT, this.start.y * UNIT);
    ctx.lineTo(this.end.x * UNIT, this.end.y * UNIT);
    ctx.stroke();
    ctx.restore();
  }

  get length() {
    return (
      Math.sqrt(
        Math.pow(this.end.x - this.start.x, 2) +
          Math.pow(this.end.y - this.start.y, 2)
      ) * UNIT
    );
  }

  get midpoint() {
    return {
      x: (this.start.x + this.end.x) / 2,
      y: (this.start.y + this.end.y) / 2,
    };
  }

  get slope() {
    return (this.end.y - this.start.y) / (this.end.x - this.start.x);
  }

  get equation() {
    const m = this.slope;
    const b = this.start.y - m * this.start.x;
    return `y = ${m}x + ${b}`;
  }

  get perpendicularBisector() {
    const m = -1 / this.slope;
    const midpoint = this.midpoint;
    const b = midpoint.y - m * midpoint.x;
    return new Line(
      { x: -W / (2 * UNIT), y: (m * -W) / (2 * UNIT) + b },
      { x: W / (2 * UNIT), y: (m * W) / (2 * UNIT) + b }
    );
  }
}

export class Circle {
  constructor(public center: Point, public radius: number) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.fillStyle) ctx.fillStyle = theme.fillStyle;
    ctx.beginPath();
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.arc(
      this.center.x * UNIT,
      this.center.y * UNIT,
      this.radius * UNIT,
      0,
      Math.PI * 2
    );
    if (theme?.fillStyle) ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  get circumference() {
    return 2 * Math.PI * this.radius * UNIT;
  }

  get area() {
    return Math.PI * Math.pow(this.radius * UNIT, 2);
  }

  get diameter() {
    return 2 * this.radius * UNIT;
  }

  get equation() {
    return `(x - ${this.center.x * UNIT})^2 + (y - ${
      this.center.y * UNIT
    })^2 = ${Math.pow(this.radius * UNIT, 2)}`;
  }

  get tangent() {
    const a = this.center.x;
    const b = this.center.y;
    const r = this.radius;
    return new Line({ x: a - r, y: b }, { x: a + r, y: b });
  }

  get normal() {
    const a = this.center.x;
    const b = this.center.y;
    const r = this.radius;
    return new Line({ x: a, y: b - r }, { x: a, y: b + r });
  }
}

export class Text {
  constructor(public text: string, public position: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { fillStyle?: string; strokeStyle?: string }
  ) {
    ctx.save();
    if (theme?.fillStyle) ctx.fillStyle = theme.fillStyle;
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    ctx.fillText(this.text, this.position.x * UNIT, this.position.y * UNIT);
    ctx.restore();
  }
}

export class Triangle {
  constructor(public a: Point, public b: Point, public c: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.fillStyle) ctx.fillStyle = theme.fillStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.a.x * UNIT, this.a.y * UNIT);
    ctx.lineTo(this.b.x * UNIT, this.b.y * UNIT);
    ctx.lineTo(this.c.x * UNIT, this.c.y * UNIT);
    ctx.closePath();
    if (theme?.fillStyle) ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  get perimeter() {
    return (
      (Math.sqrt(
        Math.pow(this.b.x - this.a.x, 2) + Math.pow(this.b.y - this.a.y, 2)
      ) +
        Math.sqrt(
          Math.pow(this.c.x - this.b.x, 2) + Math.pow(this.c.y - this.b.y, 2)
        ) +
        Math.sqrt(
          Math.pow(this.a.x - this.c.x, 2) + Math.pow(this.a.y - this.c.y, 2)
        )) *
      UNIT
    );
  }

  get area() {
    return (
      0.5 *
      Math.abs(
        this.a.x * (this.b.y - this.c.y) +
          this.b.x * (this.c.y - this.a.y) +
          this.c.x * (this.a.y - this.b.y)
      ) *
      UNIT *
      UNIT
    );
  }

  get centroid() {
    return {
      x: (this.a.x + this.b.x + this.c.x) / 3,
      y: (this.a.y + this.b.y + this.c.y) / 3,
    };
  }
}

export class Rectangle {
  constructor(public a: Point, public b: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.fillStyle) ctx.fillStyle = theme.fillStyle;
    ctx.beginPath();
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.moveTo(this.a.x * UNIT, this.a.y * UNIT);
    ctx.lineTo(this.b.x * UNIT, this.a.y * UNIT);
    ctx.lineTo(this.b.x * UNIT, this.b.y * UNIT);
    ctx.lineTo(this.a.x * UNIT, this.b.y * UNIT);
    ctx.closePath();
    if (theme?.fillStyle) ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  get perimeter() {
    return 2 * (this.b.x - this.a.x + (this.b.y - this.a.y)) * UNIT;
  }

  get area() {
    return (this.b.x - this.a.x) * (this.b.y - this.a.y) * UNIT * UNIT;
  }

  get diagonal() {
    return new Line(this.a, this.b);
  }

  get center() {
    return {
      x: (this.a.x + this.b.x) / 2,
      y: (this.a.y + this.b.y) / 2,
    };
  }
}

export class Square extends Rectangle {
  constructor(public a: Point, public side: number) {
    super(a, { x: a.x + side, y: a.y + side });
  }

  get perimeter() {
    return 4 * this.side * UNIT;
  }

  get area() {
    return Math.pow(this.side * UNIT, 2);
  }

  get diagonal() {
    return new Line(this.a, {
      x: this.a.x + this.side,
      y: this.a.y + this.side,
    });
  }

  get center() {
    return {
      x: this.a.x + this.side / 2,
      y: this.a.y + this.side / 2,
    };
  }
}

export class Polygon {
  constructor(public points: Point[]) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.fillStyle) ctx.fillStyle = theme.fillStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.beginPath();
    this.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x * UNIT, point.y * UNIT);
      } else {
        ctx.lineTo(point.x * UNIT, point.y * UNIT);
      }
    });
    ctx.closePath();
    if (theme?.fillStyle) ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  get perimeter() {
    let perimeter = 0;
    for (let i = 0; i < this.points.length - 1; i++) {
      perimeter += Math.sqrt(
        Math.pow(this.points[i + 1].x - this.points[i].x, 2) +
          Math.pow(this.points[i + 1].y - this.points[i].y, 2)
      );
    }
    perimeter += Math.sqrt(
      Math.pow(this.points[0].x - this.points[this.points.length - 1].x, 2) +
        Math.pow(this.points[0].y - this.points[this.points.length - 1].y, 2)
    );
    return perimeter * UNIT;
  }

  get area() {
    let area = 0;
    for (let i = 0; i < this.points.length - 1; i++) {
      area +=
        (this.points[i].x * this.points[i + 1].y -
          this.points[i + 1].x * this.points[i].y) /
        2;
    }
    area +=
      (this.points[this.points.length - 1].x * this.points[0].y -
        this.points[0].x * this.points[this.points.length - 1].y) /
      2;
    return Math.abs(area) * UNIT * UNIT;
  }
}

export class NumberPlane {
  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.beginPath();
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    for (let x = UNIT; x <= W / 2; x += UNIT) {
      ctx.moveTo(x, -H / 2);
      ctx.lineTo(x, H / 2);

      ctx.moveTo(-x, -H / 2);
      ctx.lineTo(-x, H / 2);
    }

    for (let y = UNIT; y <= H / 2; y += UNIT) {
      ctx.moveTo(-W / 2, y);
      ctx.lineTo(W / 2, y);

      ctx.moveTo(-W / 2, -y);
      ctx.lineTo(W / 2, -y);
    }

    // Add axes
    ctx.moveTo(0, -H / 2);
    ctx.lineTo(0, H / 2);
    ctx.moveTo(-W / 2, 0);
    ctx.lineTo(W / 2, 0);
    ctx.stroke();
    ctx.restore();
  }
}

export class Graph {
  constructor(
    public f: (x: number) => number,
    public domain: [number, number] = [-W / (2 * UNIT), W / (2 * UNIT)]
  ) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.beginPath();
    const [a, b] = this.domain;
    for (let x = a; x < b; x += 0.1) {
      const y = this.f(x);
      ctx.lineTo(x * UNIT, y * UNIT);
    }
    ctx.stroke();
    ctx.restore();
  }

  showRiemannRectangles(
    ctx: CanvasRenderingContext2D,
    theme?: { fillStyle?: string; strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.fillStyle) ctx.fillStyle = theme.fillStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    const [a, b] = this.domain;
    let [h, s, l] = [0, 100, 50];
    for (let x = a; x < b; x += 0.1) {
      const y = this.f(x);
      const height = y;
      ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
      ctx.fillRect(x * UNIT, 0, 0.1 * UNIT, height * UNIT);
      h = (h + 1) % 360;
    }
    ctx.restore();
  }

  get derivative() {
    return new Graph((x) => {
      return (this.f(x + 0.1) - this.f(x)) / 0.1;
    });
  }

  get integral() {
    return new Graph((x) => {
      const a = this.domain[0];
      let sum = 0;
      for (let i = a; i < x; i += 0.1) {
        sum += this.f(i) * 0.1;
      }
      return sum;
    });
  }

  get area() {
    const [a, b] = this.domain;
    let sum = 0;
    for (let x = a; x < b; x += 0.1) {
      sum += this.f(x) * 0.1;
    }
    return sum * UNIT * UNIT;
  }
}

export class Vector {
  constructor(public point: Point = { x: 1, y: 0 }) {}

  draw(
    ctx: CanvasRenderingContext2D,
    theme?: { strokeStyle?: string; lineWidth?: number }
  ) {
    ctx.save();
    if (theme?.strokeStyle) ctx.strokeStyle = theme.strokeStyle;
    if (theme?.lineWidth) ctx.lineWidth = theme.lineWidth ?? ctx.lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.point.x * UNIT, this.point.y * UNIT);
    ctx.stroke();

    // Draw arrowhead
    ctx.save();
    ctx.translate(this.point.x * UNIT, this.point.y * UNIT);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-UNIT / 5, UNIT / 10);
    ctx.lineTo(-UNIT / 5, -UNIT / 10);
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
  }

  add(v: Vector) {
    return new Vector({
      x: this.point.x + v.point.x,
      y: this.point.y + v.point.y,
    });
  }

  subtract(v: Vector) {
    return new Vector({
      x: this.point.x - v.point.x,
      y: this.point.y - v.point.y,
    });
  }

  scale(s: number) {
    return new Vector({
      x: this.point.x * s,
      y: this.point.y * s,
    });
  }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  get unit() {
    return new Vector({
      x: this.x / this.magnitude,
      y: this.y / this.magnitude,
    });
  }

  get normal() {
    return new Vector({
      x: -this.y,
      y: this.x,
    });
  }

  get dot() {
    return (v: Vector) => this.x * v.x + this.y * v.y;
  }

  get cross() {
    return (v: Vector) => this.x * v.y - this.y * v.x;
  }

  get angleBetween() {
    return (v: Vector) =>
      Math.acos(this.dot(v) / (this.magnitude * v.magnitude));
  }

  get project() {
    return (v: Vector) => v.unit.scale(this.dot(v.unit));
  }
}

// Basic animation function
export function animate(
  draw: (progress: number) => void,
  duration: number = 1000
) {
  const start = performance.now();

  function frame(time: number) {
    const progress = (time - start) / duration;
    if (progress < 1) {
      draw(progress);
      requestAnimationFrame(frame);
    } else {
      draw(1);
    }
  }

  requestAnimationFrame(frame);
}
