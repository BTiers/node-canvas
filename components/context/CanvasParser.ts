import { useCallback, useState } from "react";

import { Edge, Node, useStoreState } from "react-flow-renderer";
import { createContainer } from "unstated-next";

import { getLinkedASTNodesFromSource, getLinkedASTNodesFromTarget } from "../../utils/nodes";

import { ASTIteratorNode, ASTNode, ASTRootNode } from "../../classes/nodes/Node";
import NodeFactory from "../../classes/NodeFactory";

import { ASTFlow, CanvasAST } from "../../interfaces/CanvasAST";
import {
  isCanvasIteratorNode,
  isCanvasNode,
  isCanvasOutputNode,
  isCanvasRootNode,
} from "../../interfaces/CanvasNode";
import CanvasDisplay from "./CanvasDisplay";

function buildAST(root: ASTFlow, nodes: ASTNode[], edges: Edge[], excludedSourceId?: string[]) {
  if (!root) return;

  const links = root.node.node.canvasData.schema.outputs.map(({ id }) =>
    getLinkedASTNodesFromSource(id, edges, nodes)
  );

  root.links = links;

  links.forEach((link) => {
    link.targets.forEach((target) => {
      if (!excludedSourceId?.find((exludedId) => exludedId === target.through))
        buildAST(target, nodes, edges, excludedSourceId);
    });
  });
}

function ASTParser(nodes: Node[], edges: Edge[]): CanvasAST {
  const ASTNodes = transformToASTNodes(nodes);

  let iterator = ASTNodes.find((n) => isCanvasIteratorNode(n.node)) as ASTIteratorNode | undefined;
  let end = ASTNodes.find((n) => isCanvasOutputNode(n.node));

  if (!iterator || !end) throw new Error("no_it_or_out");

  const AST: CanvasAST = {
    type: "process",
    iteratorType: "linear",
    root: iterator,
    out: end,
  };

  const rootFlow: ASTFlow = { node: iterator, links: [], through: "" };

  buildAST(rootFlow, ASTNodes, edges);

  /**
   * Séparer les sous AST tant qu'il sont computable sans valeur dynamique,
   * stocker une output de l'AST certainement de la forme:
   * {
   *   output: Number | Pixel; <-- La valeur ?
   *   sourceEdgeId: string;
   * }
   *
   * Stocker ces output de sous arbres au root (Nouvelle clef dans CanvasAST ?)
   *
   * Si le noeud n'est pas isReadyToLaunch regarder si l'input manquante est présente dans l'un des sous arbres
   * Auquel cas le passe à valid = true et certianement un autre flag pour dire de quel arbre elle vient
   *
   * Pendant la computation prendre l'input de l'arbre désigné plus haut
   */

  const rootNodes = ASTNodes.filter((n) => isCanvasRootNode(n.node));

  const unlauchableNodesInputId = ASTNodes.filter((n) => !n.isReadyToLaunch()).flatMap((n) => {
    return n.node.canvasData.schema.inputs
      .filter((i) => i.valid === false)
      .map((inputSchema) => inputSchema.id);
  });

  const subFlows: ASTFlow[] = rootNodes.map((rootNode) => {
    const subFlow: ASTFlow = { node: rootNode, links: [], through: "" };

    buildAST(subFlow, ASTNodes, edges, unlauchableNodesInputId);
    return subFlow;
  });

  AST.flow = rootFlow;
  AST.subFlows = subFlows;

  if (!ASTNodes.find((n) => !n.isReadyToLaunch())) return AST;

  throw new Error("invalid process");
}

function transformToASTNodes(nodes: Node[]): ASTNode[] {
  const astNodes: ASTNode[] = [];

  nodes.forEach((n) => {
    if (isCanvasNode(n)) {
      const instanciatedNode = NodeFactory.getInstance().build(n);

      if (!!instanciatedNode) astNodes.push(instanciatedNode);
    }
  });

  return astNodes;
}

function useCanvasParser() {
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const { canvas, setCanvasImage } = CanvasDisplay.useContainer();

  const [AST, setAST] = useState<CanvasAST>();

  const generate = useCallback(() => setAST(ASTParser(nodes, edges)), [nodes]);
  const launch = useCallback(() => {
    if (!!AST) {
      AST.subFlows?.forEach((subFlow) => (subFlow.node as ASTRootNode)?.launch(subFlow));
      (AST.flow?.node as ASTIteratorNode)?.launch(AST, canvas, setCanvasImage);
    }
  }, [AST, canvas]);

  return { AST, generate, launch };
}

export default createContainer(useCanvasParser);
