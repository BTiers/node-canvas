import { useCallback, useRef, useState } from "react";

import { createContainer } from "unstated-next";

import { getRandomColor } from "../../utils/colors";

// import home from "./canvas/home";

function useCanvasDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<ImageData>();

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        let reader = new FileReader();

        reader.onload = function (event) {
          let image = new Image();

          image.onload = function () {
            createImageBitmap(image, {
              resizeWidth: 384,
              resizeHeight: 384,
              resizeQuality: "high",
            }).then((imageBitmap) => {
              if (canvasRef.current && context) {
                canvasRef.current.width = imageBitmap.width;
                canvasRef.current.height = imageBitmap.width;
                context.drawImage(imageBitmap, 0, 0);
                setCanvas(context.getImageData(0, 0, imageBitmap.width, imageBitmap.width));
              }
            });
          };

          image.src = event?.target?.result?.toString() || "";
        };
        if (e?.target?.files) reader.readAsDataURL(e?.target?.files[0]);
      }
    },
    [canvasRef]
  );

  const setCanvasImage = useCallback(
    (image: ImageData) => {
      if (canvasRef?.current) {
        const context = canvasRef.current.getContext("2d");

        if (context) context.putImageData(image, 0, 0);
      }
    },
    [canvasRef]
  );

  return { canvas, onImageChange, setCanvasImage, canvasRef };
}

export default createContainer(useCanvasDisplay);
