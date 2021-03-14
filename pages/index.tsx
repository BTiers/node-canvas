import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Elements,
  ReactFlowProvider,
} from "react-flow-renderer";

import Layout from "../components/Layout";
import Canvas from "../components/Canvas";

import CanvasParser from "../components/context/CanvasParser";
import CanvasDisplay from "../components/context/CanvasDisplay";

import LinearIteratorNode from "../components/nodes/iterators/LinearIterator";

import PixelToRGBNode from "../components/nodes/data/PixelToRGB";
import RGBToPixelNode from "../components/nodes/data/RGBToPixel";
import ConstantNode from "../components/nodes/data/Constant";

import AddNumberNode from "../components/nodes/logic/AddNumber";
import AddPixelNode from "../components/nodes/logic/AddPixel";
import SubstractNumberNode from "../components/nodes/logic/SubstractNumber";
import SubstractPixelNode from "../components/nodes/logic/SubstractPixel";
import MultiplyNumberNode from "../components/nodes/logic/MultiplyNumber";
import MultiplyPixelNode from "../components/nodes/logic/MultiplyPixel";
import DivideNumberNode from "../components/nodes/logic/DivideNumber";
import DividePixelNode from "../components/nodes/logic/DividePixel";
import RevertNumberNode from "../components/nodes/logic/RevertNumber";
import RevertPixelNode from "../components/nodes/logic/RevertPixel";

import PixelNode from "../components/nodes/output/Pixel";

const initialElements = [
  {
    id: "process_it",
    type: "linearIterator",
    position: { x: 150, y: 5 },
    canvasData: {
      type: "LinearIterator",
      schema: {
        inputs: [],
        outputs: [
          {
            id: "process_it__out-1",
            send: "pixel",
          },
        ],
      },
      iteratorType: "linear",
    },
  },
  {
    id: "process_out",
    type: "pixel",
    position: { x: 150, y: 400 },
    canvasData: {
      type: "PixelOutput",
      outputType: "pixel",
      schema: {
        inputs: [
          {
            id: "process_out__in-1",
            accept: ["pixel"],
          },
        ],
        outputs: [],
      },
    },
  },
];

let dataNodeID = 0;
let logicNodeID = 0;

const IndexPage = () => {
  const [elements, setElements] = useState<Elements>(initialElements);

  const onConnect = useCallback((params: Edge | Connection) => {
    setElements((els) => addEdge(params, els));
  }, []);

  const createPixelToRGBNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_data_${dataNodeID}`,
          type: "pixelToRgb",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "PixelToRGB",
            schema: {
              inputs: [
                {
                  id: `process_data_${dataNodeID}__in-1`,
                  accept: ["pixel"],
                },
              ],
              outputs: [
                {
                  id: `process_data_${dataNodeID}__out-1`,
                  send: "number",
                },
                {
                  id: `process_data_${dataNodeID}__out-2`,
                  send: "number",
                },
                {
                  id: `process_data_${dataNodeID++}__out-3`,
                  send: "number",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  const createConstantNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_data_${dataNodeID}`,
          type: "constant",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "Constant",
            schema: {
              inputs: [],
              outputs: [
                {
                  id: `process_data_${dataNodeID++}__out-1`,
                  send: "number",
                },
              ],
            },
            isRoot: true,
          },
        },
      ]),
    []
  );

  const createRGBToPixelNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_data_${dataNodeID}`,
          type: "rgbToPixel",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "RGBToPixel",
            schema: {
              inputs: [
                {
                  id: `process_data_${dataNodeID}__in-1`,
                  accept: ["number"],
                },
                {
                  id: `process_data_${dataNodeID}__in-2`,
                  accept: ["number"],
                },
                {
                  id: `process_data_${dataNodeID}__in-3`,
                  accept: ["number"],
                },
              ],
              outputs: [
                {
                  id: `process_data_${dataNodeID++}__out-1`,
                  send: "pixel",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  const createAddNumberNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "addNumber",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "AddNumber",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["number"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["number"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "number",
                },
              ],
            },
          },
        },
      ]),
    []
  );
  const createAddPixelNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "addPixel",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "AddPixel",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["pixel"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["pixel"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "pixel",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  const createSubstractNumberNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "substractNumber",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "SubstractNumber",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["number"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["number"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "number",
                },
              ],
            },
          },
        },
      ]),
    []
  );
  const createSubstractPixelNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "substractPixel",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "SubstractPixel",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["pixel"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["pixel"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "pixel",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  const createMultiplyNumberNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "multiplyNumber",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "MultiplyNumber",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["number"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["number"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "number",
                },
              ],
            },
          },
        },
      ]),
    []
  );
  const createMultiplyPixelNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "multiplyPixel",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "MultiplyPixel",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["pixel"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["pixel"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "pixel",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  const createDivideNumberNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "divideNumber",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "DivideNumber",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["number"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["number"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "number",
                },
              ],
            },
          },
        },
      ]),
    []
  );
  const createDividePixelNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "DividePixel",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "DividePixel",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["pixel"],
                },
                {
                  id: `process_logic_${logicNodeID}__in-2`,
                  accept: ["pixel"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "pixel",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  const createRevertNumberNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "revertNumber",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "RevertNumber",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["number"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "number",
                },
              ],
            },
          },
        },
      ]),
    []
  );
  const createRevertPixelNode = useCallback(
    () =>
      setElements((elements) => [
        ...elements,
        {
          id: `process_logic_${logicNodeID}`,
          type: "revertPixel",
          position: { x: 150, y: 200 },
          canvasData: {
            type: "RevertPixel",
            schema: {
              inputs: [
                {
                  id: `process_logic_${logicNodeID}__in-1`,
                  accept: ["pixel"],
                },
              ],
              outputs: [
                {
                  id: `process_logic_${logicNodeID++}__out-1`,
                  send: "pixel",
                },
              ],
            },
          },
        },
      ]),
    []
  );

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ReactFlowProvider>
        <CanvasDisplay.Provider>
          <CanvasParser.Provider>
            <div className="grid w-screen h-screen grid-cols-2 gap-2 px-2">
              <div className="col-span-1 bg-white">
                <div className="flex flex-wrap justify-between gap-2 m-2">
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createPixelToRGBNode}
                  >
                    Pixel to RGB
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createRGBToPixelNode}
                  >
                    RGB to Pixel
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createConstantNode}
                  >
                    Constant
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createAddNumberNode}
                  >
                    Add number
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createAddPixelNode}
                  >
                    Add pixel
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createSubstractNumberNode}
                  >
                    Substract number
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createSubstractPixelNode}
                  >
                    Substract pixel
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createMultiplyNumberNode}
                  >
                    Multiply number
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createMultiplyPixelNode}
                  >
                    Multiply pixel
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createDivideNumberNode}
                  >
                    Divide number
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createDividePixelNode}
                  >
                    Divide pixel
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createRevertNumberNode}
                  >
                    Revert number
                  </button>
                  <button
                    className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-md"
                    onClick={createRevertPixelNode}
                  >
                    Revert pixel
                  </button>
                </div>
                <ReactFlow
                  elements={elements}
                  onConnect={onConnect}
                  nodeTypes={{
                    linearIterator: LinearIteratorNode,
                    pixel: PixelNode,
                    pixelToRgb: PixelToRGBNode,
                    rgbToPixel: RGBToPixelNode,
                    constant: ConstantNode,
                    addNumber: AddNumberNode,
                    addPixel: AddPixelNode,
                    substractNumber: SubstractNumberNode,
                    substractPixel: SubstractPixelNode,
                    multiplyNumber: MultiplyNumberNode,
                    multiplyPixel: MultiplyPixelNode,
                    divideNumber: DivideNumberNode,
                    dividePixel: DividePixelNode,
                    revertNumber: RevertNumberNode,
                    revertPixel: RevertPixelNode,
                  }}
                />
              </div>
              <div className="col-span-1 bg-white">
                <Canvas />
              </div>
            </div>
          </CanvasParser.Provider>
        </CanvasDisplay.Provider>
      </ReactFlowProvider>
    </Layout>
  );
};

export default IndexPage;
