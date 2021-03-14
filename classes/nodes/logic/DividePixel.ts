import { Pixel } from '../../../data/Pixel';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { ASTNode } from '../Node';

export default class DividePixel extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const lhs = this.node.canvasData.schema.inputs[0].value as Pixel;
    const rhs = this.node.canvasData.schema.inputs[1].value as Pixel;

    this.node.canvasData.schema.outputs[0].value = new Pixel(
      Math.min((lhs.r / (rhs.r || 1)), 255),
      Math.min((lhs.g / (rhs.g || 1)), 255),
      Math.min((lhs.b / (rhs.b || 1)), 255),
    );
  }
}
