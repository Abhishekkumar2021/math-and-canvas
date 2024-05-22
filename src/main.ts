import "./style.css";
import { NumberPlane, Vector } from "./utils";

const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export const W = (canvas.width = 5 * window.innerWidth);
export const H = (canvas.height = 5 * window.innerHeight);
export const UNIT = 400;

// translate the context to the center of the canvas
ctx.translate(W / 2, H / 2);

// context settings
ctx.lineWidth = UNIT / 10;
ctx.font = `${UNIT / 2}px Arial`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.lineJoin = "round";
ctx.lineCap = "round";


// Usage
const a = new Vector({ x: 3, y: 4 });
a.draw(ctx, { strokeStyle: "blue", lineWidth: UNIT / 20 });

// draw the number plane
const plane = new NumberPlane();
plane.draw(ctx, { strokeStyle: "black", lineWidth: UNIT / 50 });