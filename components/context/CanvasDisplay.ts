import { useState } from "react";

import { createContainer } from "unstated-next";

import { getRandomColor } from "../../utils/colors";

// import home from "./canvas/home";

function useCanvasDisplay() {
  const [canvas, setCanvas] = useState(new Array(600).fill(0).map(() => getRandomColor()));

  return { canvas, setCanvas };
}

export default createContainer(useCanvasDisplay);
