import { Pixel } from '../../../data/Pixel';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { ASTNode } from '../Node';

export default class RevertPixel extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const pixel = this.node.canvasData.schema.inputs[0].value as Pixel;

    this.node.canvasData.schema.outputs[0].value = new Pixel(
      255 - pixel.r,
      255 - pixel.g,
      255 - pixel.b,
    );
  }
}
