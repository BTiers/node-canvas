import { ASTFlow } from "../../../interfaces/CanvasAST";
import { CanvasNode } from "../../../interfaces/CanvasNode";

import { ASTRootNode } from "../Node";

export default class Constant extends ASTRootNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  canCompute() {
    return true;
  }

  compute() {}

  launch(flow: ASTFlow) {
    if (flow) {
      this.traverse(flow);
    } else throw new Error("no_valid_flow");
  }
}
