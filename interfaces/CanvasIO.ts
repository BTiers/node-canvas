import { Number } from '../data/Number';
import { Pixel } from '../data/Pixel';

export const canvasIO = ['number', 'pixel'] as const;
export type CanvasIO = typeof canvasIO[number];

export type CanvasDataMap = {
  number: Number;
  pixel: Pixel;
};

export interface ICanvasIOData {
  type: CanvasIO;
}
export type CanvasIOData = Number | Pixel;

export type CanvasInputType = CanvasIO;

export interface CanvasInput {
  type: CanvasInputType;
  id: string;
}

export type CanvasOutputType = CanvasIO;

export interface CanvasOutput {
  type: CanvasOutputType;
  id: string;
}
