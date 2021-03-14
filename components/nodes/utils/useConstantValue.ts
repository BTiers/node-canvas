import { useCallback } from "react";
import { useStoreState } from "react-flow-renderer";

import { CanvasIOData } from "../../../interfaces/CanvasIO";
import { getNodeEdgeOwner } from "../../../utils/nodes";

export default function useConstantValue<IO extends CanvasIOData>(
  selfId: string,
  sourceEdgeId: string
) {
  const nodes = useStoreState((store) => store.nodes);

  return useCallback(
    (value: IO) => {
      const computedId = `${selfId}__${sourceEdgeId}`;
      const node = getNodeEdgeOwner(computedId, nodes);

      const output = node.canvasData.schema.outputs.find((out) => out.id === computedId);

      if (output) output.value = value;
      else throw new Error("unretrievable_output");
    },
    [nodes, selfId, sourceEdgeId]
  );
}
