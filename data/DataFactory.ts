import { CanvasIOData, CanvasIO } from '../interfaces/CanvasIO';

import { Number } from './Number';
import { Pixel } from './Pixel';

export default class DataFactory {
  private static instance: DataFactory;

  private constructor() {}

  public static getInstance(): DataFactory {
    if (!DataFactory.instance) {
      DataFactory.instance = new DataFactory();
    }

    return DataFactory.instance;
  }

  public build(io: CanvasIO, value: any): CanvasIOData | undefined {
    switch (io) {
      case 'pixel':
        return new Pixel(value, value, value);
      case 'number':
        return new Number(value);
    }
  }
}
