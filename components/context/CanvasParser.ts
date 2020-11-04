import { useCallback, useState } from 'react';

import { Edge, Node, useStoreState } from 'react-flow-renderer';
import { createContainer } from 'unstated-next';

import { getLinkedASTNodes } from '../../utils/nodes';

import { ASTIteratorNode, ASTNode } from '../../classes/nodes/Node';
import NodeFactory from '../../classes/NodeFactory';

import { ASTFlow, CanvasAST } from '../../interfaces/CanvasAST';
import {
  isCanvasIteratorNode,
  isCanvasNode,
  isCanvasOutputNode,
} from '../../interfaces/CanvasNode';
import CanvasDisplay from './CanvasDisplay';

function buildAST(root: ASTFlow, nodes: ASTNode[], edges: Edge[]) {
  if (!root) return;

  const links = root.node.node.canvasData.schema.outputs.map(({ id }) =>
    getLinkedASTNodes(id, edges, nodes),
  );

  root.links = links;

  links.forEach((link) => {
    link.targets.forEach((target) => buildAST(target, nodes, edges));
  });
}

function ASTParser(nodes: Node[], edges: Edge[]): CanvasAST {
  const ASTNodes = transformToASTNodes(nodes);

  let iterator = ASTNodes.find((n) => isCanvasIteratorNode(n.node)) as ASTIteratorNode | undefined;
  let end = ASTNodes.find((n) => isCanvasOutputNode(n.node));

  if (!iterator || !end) throw new Error('no_it_or_out');

  const AST: CanvasAST = {
    type: 'process',
    iteratorType: 'linear',
    root: iterator,
    out: end,
  };

  const rootFlow: ASTFlow = { node: iterator, links: [], through: '' };

  buildAST(rootFlow, ASTNodes, edges);
  AST.flow = rootFlow;

  if (!ASTNodes.find((n) => !n.isReadyToLaunch())) return AST;

  throw new Error('invalid process');
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
  const { canvas, setCanvas } = CanvasDisplay.useContainer();

  const [AST, setAST] = useState<CanvasAST>();

  const generate = useCallback(() => setAST(ASTParser(nodes, edges)), [nodes]);
  const launch = useCallback(() => {
    if (!!AST) (AST.flow?.node as ASTIteratorNode)?.launch(AST, canvas, setCanvas);
  }, [AST, canvas]);

  return { AST, generate, launch };
}

export default createContainer(useCanvasParser);
