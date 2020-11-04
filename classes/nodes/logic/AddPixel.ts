import { Pixel } from '../../../data/Pixel';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { ASTNode } from '../Node';

export default class AddPixel extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const lhs = this.node.canvasData.schema.inputs[0].value as Pixel;
    const rhs = this.node.canvasData.schema.inputs[1].value as Pixel;

    this.node.canvasData.schema.outputs[0].value = new Pixel(
      (lhs.r + rhs.r) % 255,
      (lhs.g + rhs.g) % 255,
      (lhs.b + rhs.b) % 255,
    );
  }
}
