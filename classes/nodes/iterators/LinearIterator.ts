import { Pixel } from '../../../data/Pixel';
import { CanvasAST } from '../../../interfaces/CanvasAST';
import { CanvasNode } from '../../../interfaces/CanvasNode';
import { hexToRgb, rgbToHex } from '../../../utils/colors';

import { ASTIteratorNode } from '../Node';

export default class LinearIterator extends ASTIteratorNode {
  constructor(node: CanvasNode) {
    super(node);
  }

  canCompute() {
    return true;
  }

  compute() {}

  launch(ast: CanvasAST, canvas: string[], setCanvas: (c: string[]) => any) {
    canvas.forEach((color, index) => {
      const canvasColor = hexToRgb(color);

      if (!canvasColor) throw new Error('invalid_canvas');

      this.node.canvasData.schema.outputs[0].value = new Pixel(
        canvasColor[0],
        canvasColor[1],
        canvasColor[2],
      );

      if (ast.flow) {
        this.traverse(ast.flow);

        let { r, g, b } = ast.out.node.canvasData.schema.inputs[0].value as Pixel;

        canvas.splice(index, 1, rgbToHex(r, g, b));

        setCanvas([...canvas]);
      } else throw new Error('no_valid_flow');
    });
  }
}
