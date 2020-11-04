import React from 'react';

import { Handle, NodeProps, Position } from 'react-flow-renderer';

import useConnectionValidation from '../validation/useConnectionValidation';

const PixelToRGB: React.FC<NodeProps> = ({ id }) => {
  const outputValidation = useConnectionValidation(id, 'pixel');

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ left: '1rem', backgroundColor: '#f05252' }}
        id='in-1'
      />
      <Handle type='target' position={Position.Top} style={{ backgroundColor: '#0e9f6e' }} id='in-2' />
      <Handle
        type='target'
        position={Position.Top}
        style={{ left: 'calc(100% - 1rem)', backgroundColor: '#3f83f8' }}
        id='in-3'
      />
      <div className='flex items-center justify-center w-32 px-4 py-3 text-xs border border-gray-700 rounded'>
        RGB to Pixel
      </div>
      <Handle
        type='source'
        id='out-1'
        position={Position.Bottom}
        style={{ background: '#555' }}
        isValidConnection={outputValidation}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
    </>
  );
};

export default React.memo(PixelToRGB);
