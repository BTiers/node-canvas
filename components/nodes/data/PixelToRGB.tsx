import React from 'react';

import { Handle, NodeProps, Position } from 'react-flow-renderer';

import useConnectionValidation from '../validation/useConnectionValidation';

const PixelToRGB: React.FC<NodeProps> = ({ id }) => {
  const outputValidation = useConnectionValidation(id, 'number');

  return (
    <>
      <Handle
        type='target'
        id='in-1'
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div className='flex items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded'>
        Pixel to RGB
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ left: '1rem', backgroundColor: '#f05252' }}
        isValidConnection={outputValidation}
        id='out-1'
      />
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ backgroundColor: '#0e9f6e' }}
        isValidConnection={outputValidation}
        id='out-2'
      />
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ left: 'calc(100% - 1rem)', backgroundColor: '#3f83f8' }}
        isValidConnection={outputValidation}
        id='out-3'
      />
    </>
  );
};

export default React.memo(PixelToRGB);
