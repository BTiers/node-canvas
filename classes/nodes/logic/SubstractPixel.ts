import { Pixel } from '../../../data/Pixel';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { ASTNode } from '../Node';

export default class SubstractPixel extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const lhs = this.node.canvasData.schema.inputs[0].value as Pixel;
    const rhs = this.node.canvasData.schema.inputs[1].value as Pixel;

    const r = (lhs.r + rhs.r) % 255;
    const g = (lhs.g + rhs.g) % 255;
    const b = (lhs.b + rhs.b) % 255;

    this.node.canvasData.schema.outputs[0].value = new Pixel(
      r > 0 ? r : 0,
      g > 0 ? g : 0,
      b > 0 ? b : 0,
    );
  }
}
