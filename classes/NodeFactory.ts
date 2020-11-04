import { CanvasNode } from '../interfaces/CanvasNode';
import { ASTNode } from './nodes/Node';

import LinearIterator from './nodes/iterators/LinearIterator';

import PixelToRGB from './nodes/data/PixelToRGB';
import RGBToPixel from './nodes/data/RGBToPixel';

import AddNumber from './nodes/logic/AddNumber';
import AddPixel from './nodes/logic/AddPixel';

import SubstractNumber from './nodes/logic/SubstractNumber';
import SubstractPixel from './nodes/logic/SubstractPixel';

import MultiplyNumber from './nodes/logic/MultiplyNumber';
import MultiplyPixel from './nodes/logic/MultiplyPixel';

import DivideNumber from './nodes/logic/DivideNumber';
import DividePixel from './nodes/logic/DividePixel';

import RevertNumber from './nodes/logic/RevertNumber';
import RevertPixel from './nodes/logic/RevertPixel';

import PixelOutput from './nodes/output/PixelOutput';

export default class NodeFactory {
  private static instance: NodeFactory;

  private constructor() {}

  public static getInstance(): NodeFactory {
    if (!NodeFactory.instance) {
      NodeFactory.instance = new NodeFactory();
    }

    return NodeFactory.instance;
  }

  public build(node: CanvasNode): ASTNode | undefined {
    switch (node.canvasData.type) {
      case 'LinearIterator':
        return new LinearIterator(node);

      case 'PixelToRGB':
        return new PixelToRGB(node);
      case 'RGBToPixel':
        return new RGBToPixel(node);

      case 'AddNumber':
        return new AddNumber(node);
      case 'AddPixel':
        return new AddPixel(node);

      case 'SubstractNumber':
        return new SubstractNumber(node);
      case 'SubstractPixel':
        return new SubstractPixel(node);

      case 'MultiplyNumber':
        return new MultiplyNumber(node);
      case 'MultiplyPixel':
        return new MultiplyPixel(node);

      case 'DivideNumber':
        return new DivideNumber(node);
      case 'DividePixel':
        return new DividePixel(node);

      case 'RevertNumber':
        return new RevertNumber(node);
      case 'RevertPixel':
        return new RevertPixel(node);

      case 'PixelOutput':
        return new PixelOutput(node);
    }
  }
}
