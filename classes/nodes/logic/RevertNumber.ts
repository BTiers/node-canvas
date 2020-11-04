import { Number } from '../../../data/Number';
import { CanvasNode } from '../../../interfaces/CanvasNode';

import { ASTNode } from '../Node';

export default class RevertNumber extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error('cannot_compute');

    const nb = this.node.canvasData.schema.inputs[0].value as Number;

    this.node.canvasData.schema.outputs[0].value = new Number(255 - nb.value);
  }
}
