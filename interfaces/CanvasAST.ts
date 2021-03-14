import { ASTNode } from "../classes/nodes/Node";
import { CanvasIteratorType } from "./CanvasNode";

export type ASTType = "process";

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
  subFlows?: ASTFlow[];
};
