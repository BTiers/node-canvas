import React from 'react';

import { Handle, NodeProps, Position } from 'react-flow-renderer';

const PixelNode: React.FC<NodeProps> = ({}) => {
  return (
    <>
      <Handle type='target' position={Position.Top} id='in-1' />
      <div className='flex items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded'>
        Pixel
      </div>
    </>
  );
};

export default React.memo(PixelNode);
