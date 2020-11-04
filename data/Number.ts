import { CanvasIO, ICanvasIOData } from '../interfaces/CanvasIO';

export class Number implements ICanvasIOData {
  type: CanvasIO = 'number';

  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

export function isPixel(data: ICanvasIOData): data is Number {
  return data.type === 'number';
}
