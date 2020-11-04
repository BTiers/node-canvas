import { ASTNode } from '../Node';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { Number } from '../../../data/Number';
import { Pixel } from '../../../data/Pixel';


export default class RGBToPixel extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const r = this.node.canvasData.schema.inputs[0].value as Number;
    const g = this.node.canvasData.schema.inputs[1].value as Number;
    const b = this.node.canvasData.schema.inputs[2].value as Number;

    this.node.canvasData.schema.outputs[0].value = new Pixel(r.value, g.value, b.value);
  }
}
