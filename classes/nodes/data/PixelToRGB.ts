import { Number } from '../../../data/Number';
import { Pixel } from '../../../data/Pixel';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { ASTNode } from '../Node';

export default class PixelToRGB extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const pixel = this.node.canvasData.schema.inputs[0].value as Pixel;

    this.node.canvasData.schema.outputs[0].value = new Number(pixel.r);
    this.node.canvasData.schema.outputs[1].value = new Number(pixel.g);
    this.node.canvasData.schema.outputs[2].value = new Number(pixel.b);
  }
}
