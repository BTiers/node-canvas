import React from 'react';

import { Handle, NodeProps, Position } from 'react-flow-renderer';

import useConnectionValidation from '../validation/useConnectionValidation';

const SubstractNumber: React.FC<NodeProps> = ({ id }) => {
  const inputValidation = useConnectionValidation(id, 'number');

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ left: '30%' }}
        id='in-1'
      />
      <Handle
        type='target'
        position={Position.Top}
        style={{ left: '70%' }}
        id='in-2'
      />
      <div className='flex items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded'>
      Substract Number
      </div>
      <Handle
        type='source'
        id='out-1'
        position={Position.Bottom}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isValidConnection={inputValidation}
      />
    </>
  );
};

export default React.memo(SubstractNumber);
