import React, { useMemo } from 'react';

import CanvasParser from './context/CanvasParser';
import CanvasDisplay from './context/CanvasDisplay';

const Canvas = () => {
  let { generate, launch } = CanvasParser.useContainer();
  let { canvas, canvasRef, onImageChange } = CanvasDisplay.useContainer();

  return useMemo(
    () => (
      <div className='flex flex-col items-center justify-center h-full col-span-2 bg-white'>
        <div className='flex justify-center gap-8 mb-12'>
          <button
            className='px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:shadow-outline-blue'
            onClick={generate}>
            Parse 🖥
          </button>
          <button
            className='px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:shadow-outline-blue'
            onClick={launch}>
            Launch 🚀
          </button>
        </div>
        <div className='flex flex-wrap h-96 w-96'>
          <input type='file' onChange={onImageChange} />
          <canvas ref={canvasRef} />
          {/* {canvas.map((color, index) => (
            <div
              className='inline-flex w-4 h-4'
              style={{ backgroundColor: color }}
              key={`pixel_${index}`} />
          ))} */}
        </div>
      </div>
    ),
    [canvas, generate, launch],
  );
};

export default React.memo(Canvas);
