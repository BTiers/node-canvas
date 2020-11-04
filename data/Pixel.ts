import { CanvasIO, ICanvasIOData } from '../interfaces/CanvasIO';

export class Pixel implements ICanvasIOData {
  type: CanvasIO = 'pixel';

  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export function isPixel(data: ICanvasIOData): data is Pixel {
  return data.type === 'pixel';
}
