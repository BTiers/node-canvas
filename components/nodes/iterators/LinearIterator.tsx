import React from "react";

import { Handle, NodeProps, Position } from "react-flow-renderer";

import useConnectionValidation from "../validation/useConnectionValidation";

const LinearIteratorNode: React.FC<NodeProps> = ({ id }) => {
  const outputValidation = useConnectionValidation(id, "pixel");

  return (
    <>
      <div className="flex items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded">
        Linear Iterator
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-1"
        isValidConnection={outputValidation}
      />
    </>
  );
};

export default React.memo(LinearIteratorNode);
