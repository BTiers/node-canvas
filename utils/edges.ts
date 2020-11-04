export function getNodeIdFromEdge(edgeId: string): string {
  return edgeId.replace(/(__[a-zA-Z0-9-]*)$/, '');
}
