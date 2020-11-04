import { useCallback } from 'react';
import { Connection, useStoreState } from 'react-flow-renderer';

import { CanvasIO } from '../../../interfaces/CanvasIO';
import { __nodeValidation__DEBUG } from '../../../utils/debug';
import { getNodeEdgeOwner } from '../../../utils/nodes';

export default function useConnectionValidation(
  selfId: string,
  io: CanvasIO,
  debug: boolean = false,
) {
  const nodes = useStoreState((store) => store.nodes);

  return useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target && connection.target !== selfId) {
        const node = getNodeEdgeOwner(connection.target, nodes);
        const relatedEdge = node?.canvasData.schema.inputs.find((i) => i.id === connection.target);
        const valid = !!relatedEdge && relatedEdge.accept.includes(io);

        if (debug) __nodeValidation__DEBUG(node, io, valid);
        return valid;
      }
      return false;
    },
    [nodes, debug],
  );
}
