import { useState } from 'react';

import { createContainer } from 'unstated-next';

import { getRandomColor } from '../../utils/colors';

import home from './canvas/home';

function useCanvasDisplay() {
  const [canvas, setCanvas] = useState(
    Array(24 * 24)
      .fill('#ffffff')
      .map(() => getRandomColor()),
  );

  return { canvas, setCanvas };
}

export default createContainer(useCanvasDisplay);
