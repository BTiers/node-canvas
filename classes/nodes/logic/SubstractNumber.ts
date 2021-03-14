import { Number } from "../../../data/Number";
import { CanvasNode } from "../../../interfaces/CanvasNode";

import { ASTNode } from "../Node";

export default class SubstractNumber extends ASTNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  compute() {
    if (!this.canCompute()) throw new Error("cannot_compute");

    const lhs = this.node.canvasData.schema.inputs[0].value as Number;
    const rhs = this.node.canvasData.schema.inputs[1].value as Number;

    const result = Math.min(lhs.value - rhs.value, 255);

    this.node.canvasData.schema.outputs[0].value = new Number(result > 0 ? result : 0);
  }
}
