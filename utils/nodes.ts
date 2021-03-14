import { Edge, Node } from "react-flow-renderer";
import { ASTNode } from "../classes/nodes/Node";
import { ASTFlow, ASTLink } from "../interfaces/CanvasAST";

import { CanvasNode, isCanvasNode } from "../interfaces/CanvasNode";
import { getNodeIdFromEdge } from "./edges";

export function getNodeEdgeOwner(edgeId: string, nodes: Node[]): CanvasNode {
  const nodeId = getNodeIdFromEdge(edgeId);
  const node = nodes.find((n) => n.id === nodeId);

  if (node && isCanvasNode(node)) return node;

  throw new Error("Cannot find node");
}

export function getASTNodeEdgeOwner(edgeId: string, nodes: ASTNode[]): ASTNode {
  const nodeId = getNodeIdFromEdge(edgeId);
  const node = nodes.find((n) => n.node.id === nodeId);

  if (node && isCanvasNode(node.node)) return node;

  throw new Error("Cannot find node");
}

export function getLinkedEdgesIdsFromSource(sourceEdge: string, edges: Edge[]): string[] {
  return edges?.flatMap((e) => (e.source === sourceEdge ? [e.target] : []));
}

export function getLinkedEdgesIdsFromTarget(targetEdge: string, edges: Edge[]): string[] {
  return edges?.flatMap((e) => (e.target === targetEdge ? [e.source] : []));
}

export function getLinkedASTNodesFromSource(
  sourceEdgeId: string,
  edges: Edge[],
  nodes: ASTNode[]
): ASTLink {
  const linkedEdgesIds = getLinkedEdgesIdsFromSource(sourceEdgeId, edges);

  const linkedNodes: ASTFlow[] = linkedEdgesIds.map((eId) => {
    let linkedNode = getASTNodeEdgeOwner(eId, nodes);

    linkedNode.setInputValid(eId);

    return {
      through: eId,
      node: linkedNode,
      links: [] as ASTLink[],
    };
  });

  return { sourceEdgeId, targets: linkedNodes };
}

export function getLinkedASTNodesFromTarget(
  targetEdgeId: string,
  edges: Edge[],
  nodes: ASTNode[]
): ASTLink {
  const linkedEdgesIds = getLinkedEdgesIdsFromTarget(targetEdgeId, edges);

  const linkedNodes: ASTFlow[] = linkedEdgesIds.map((eId) => {
    let linkedNode = getASTNodeEdgeOwner(eId, nodes);

    linkedNode.setInputValid(eId);

    return {
      through: eId,
      node: linkedNode,
      links: [] as ASTLink[],
    };
  });

  return { sourceEdgeId: targetEdgeId, targets: linkedNodes };
}
