import React from 'react';

import { Handle, NodeProps, Position } from 'react-flow-renderer';

import useConnectionValidation from '../validation/useConnectionValidation';

const RevertPixel: React.FC<NodeProps> = ({ id }) => {
  const outputValidation = useConnectionValidation(id, 'pixel');

  return (
    <>
      <Handle type='target' position={Position.Top} id='in-1' />
      <div className='flex items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded'>
        Revert Pixel
      </div>
      <Handle
        type='source'
        id='out-1'
        position={Position.Bottom}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isValidConnection={outputValidation}
      />
    </>
  );
};

export default React.memo(RevertPixel);
