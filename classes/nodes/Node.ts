import { ASTFlow, CanvasAST } from '../../interfaces/CanvasAST';
import { CanvasIOData } from '../../interfaces/CanvasIO';
import { CanvasNode } from '../../interfaces/CanvasNode';

export abstract class ASTNode {
  constructor(public node: CanvasNode) {
    this.node.canvasData.schema.inputs.forEach((i) => (i.valid = false));
  }

  getInput(id: string) {
    return this.node.canvasData.schema.inputs.find((i) => i.id === id);
  }

  isReadyToLaunch(): boolean {
    return !this.node.canvasData.schema.inputs.find((i) => i.valid === false);
  }

  canCompute(): boolean {
    return !this.node.canvasData.schema.inputs.find((i) => !i.value);
  }

  isDeadEnd(): boolean {
    return !this.isReadyToLaunch();
  }

  getOutput(id: string): CanvasIOData {
    const output =  this.node.canvasData.schema.outputs.find(o => o.id === id);

    if (output && output?.value) return output.value;
    throw new Error('no_output_set');
  }

  setInputValid(id: string): void {
    let input = this.getInput(id);

    if (input) input.valid = true;
  }

  setInputValue(id: string, value: CanvasIOData): void {
    const input = this.getInput(id);

    if (!input) return;

    if (input.accept.includes(value.type)) {
      input.value = value;
      input.valid = true;
    }
  }

  abstract compute(): void;
}

export abstract class ASTRootNode extends ASTNode {
  constructor(public node: CanvasNode) { super(node); }

  traverse(flow: ASTFlow) {
    flow.links.forEach((link) => {
      const value = flow.node.getOutput(link.sourceEdgeId);

      link.targets.forEach((target) => {
        target.node.setInputValue(target.through, value);
        if (target.node.canCompute()) {
          target.node.compute();
          this.traverse(target);
        }
        return;
      });
    });
  }

  abstract launch(flow: ASTFlow): void;
}

export abstract class ASTIteratorNode extends ASTNode {
  constructor(public node: CanvasNode) { super(node); }

  traverse(flow: ASTFlow) {
    flow.links.forEach((link) => {
      const value = flow.node.getOutput(link.sourceEdgeId);

      link.targets.forEach((target) => {
        target.node.setInputValue(target.through, value);
        if (target.node.canCompute()) {
          target.node.compute();
          this.traverse(target);
        }
        return;
      });
    });
  }

  abstract launch(ast: CanvasAST, canvas: string[], setCanvas: (c: string[]) => any): void;
}