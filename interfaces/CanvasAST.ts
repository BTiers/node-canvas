import { ASTNode } from '../classes/nodes/Node';
import { CanvasIteratorType } from './CanvasNode';

// type ASTLink = ASTFlow & {
//   node: ASTNode | undefined;
//   targetEdgeId: string;
// };

// export type ASTFlow = {
//   links: ASTLink[];
//   sourceEdgeId: string;
//   node: ASTNode;
//   next: ASTLink[];
// };

export type ASTType = 'process';

// export type ASTFlow = {
//   node: CanvasNode;
// };

// export type ASTFlowStep = ASTFlow & {
//   next?: ASTFlowStep;
// };

export type ASTLink = {
  sourceEdgeId: string;
  targets: ASTFlow[];
};

export type ASTFlow = {
  through: string;
  node: ASTNode;
  links: ASTLink[];
};

export type CanvasAST = {
  type: ASTType;
  iteratorType: CanvasIteratorType;
  root: ASTNode;
  out: ASTNode;
  flow?: ASTFlow;
};