import { Pixel } from "../../../data/Pixel";
import { CanvasAST } from "../../../interfaces/CanvasAST";
import { CanvasNode } from "../../../interfaces/CanvasNode";
import { hexToRgb, rgbToHex } from "../../../utils/colors";

import { ASTIteratorNode } from "../Node";

export default class LinearIterator extends ASTIteratorNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  canCompute() {
    return true;
  }

  compute() {}

  launch(ast: CanvasAST, canvas: ImageData, setCanvas: (image: ImageData) => void) {
    const { data } = canvas;
    for (let idx = 0; idx < data.length; idx += 4) {
      this.node.canvasData.schema.outputs[0].value = new Pixel(
        data[idx],
        data[idx + 1],
        data[idx + 2]
      );

      if (ast.flow) {
        this.traverse(ast.flow);

        let { r, g, b } = ast.out.node.canvasData.schema.inputs[0].value as Pixel;

        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
      } else throw new Error("no_valid_flow");
    }

    setCanvas(canvas);
  }
}
