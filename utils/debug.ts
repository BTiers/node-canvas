import { CanvasNode } from '../interfaces/CanvasNode';
import { CanvasIO } from '../interfaces/CanvasIO';

export function __nodeValidation__DEBUG(node?: CanvasNode, io?: CanvasIO, valid?: boolean) {
  console.group('Node Validation');
  console.log('Start attempting connection');
  console.log('Retrieved node: %o', node);
  console.log(
    'Validation %c%s %csearching for %s',
    `color: ${valid ? 'green' : 'red'}; font-weight: bold`,
    valid ? 'successfull' : 'failed',
    'color: black; font-weight: base',
    io,
  );
  console.groupEnd();
}
