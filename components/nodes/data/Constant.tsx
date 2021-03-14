import React from "react";

import { Handle, NodeProps, Position } from "react-flow-renderer";
import { Number } from "../../../data/Number";

import useConstantValue from "../utils/useConstantValue";
import useConnectionValidation from "../validation/useConnectionValidation";

const ConstantNode: React.FC<NodeProps> = ({ id }) => {
  const outputValidation = useConnectionValidation(id, "number");
  const setValue = useConstantValue<Number>(id, "out-1");

  return (
    <>
      <div className="flex flex-col items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded">
        Constant
        <input
          type="number"
          name={`${id}-number-input`}
          max={255}
          min={0}
          defaultValue={1}
          onChange={(e) => setValue(new Number(e.target.valueAsNumber))}
          id={`${id}-input`}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
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

export default React.memo(ConstantNode);
