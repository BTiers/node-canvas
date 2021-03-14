import { Node } from 'react-flow-renderer';

import { CanvasIO, CanvasIOData } from './CanvasIO';

export type CanvasNodeType =
  | 'LinearIterator'
  | 'Constant'
  | 'PixelToRGB'
  | 'RGBToPixel'
  | 'AddNumber'
  | 'AddPixel'
  | 'SubstractNumber'
  | 'SubstractPixel'
  | 'MultiplyNumber'
  | 'MultiplyPixel'
  | 'DivideNumber'
  | 'DividePixel'
  | 'RevertNumber'
  | 'RevertPixel'
  | 'PixelOutput';

export type CanvasNodeInputSchema = {
  id: string;
  accept: CanvasIO[];
  /**
   * When set to true, an edge is connecting the input
   * and validation of the type has been done
   */
  valid: boolean;
  value: CanvasIOData;
};

export type CanvasNodeOutputsSchema = {
  id: string;
  send: CanvasIO;
  value: CanvasIOData;
};

export type CanvasNodeSchema = {
  inputs: CanvasNodeInputSchema[];
  outputs: CanvasNodeOutputsSchema[];
};

export type CanvasNode = Node & {
  canvasData: {
    type: CanvasNodeType;
    schema: CanvasNodeSchema;
  };
};

export function isCanvasNode(node: Node): node is CanvasNode {
  return 'canvasData' in node;
}

export type CanvasRootType = 'linear';

export type CanvasRootNode = CanvasNode & {
  canvasData: {
    isRoot: true;
  };
};

export function isCanvasRootNode(node: Node): node is CanvasRootNode {
  return isCanvasNode(node) && 'isRoot' in node.canvasData;
}

export type CanvasIteratorType = 'linear';

export type CanvasIteratorNode = CanvasNode & {
  canvasData: {
    iteratorType: CanvasIteratorType;
  };
};

export function isCanvasIteratorNode(node: Node): node is CanvasIteratorNode {
  return isCanvasNode(node) && 'iteratorType' in node.canvasData;
}

export type CanvasOutputType = 'pixel';

export type CanvasOutputNode = CanvasNode & {
  canvasData: {
    outputType: CanvasOutputType;
  };
};

export function isCanvasOutputNode(node: Node): node is CanvasOutputNode {
  return isCanvasNode(node) && 'outputType' in node.canvasData;
}
