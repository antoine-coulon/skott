/** @internal */
export const Color = {
  Red: 0,
  Black: 1 << 0
};
/** @internal */
export class Node {
  constructor(color, key, value, left, right, count) {
    this.color = color;
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
    this.count = count;
  }
}
/** @internal */
export function clone(node) {
  return new Node(node.color, node.key, node.value, node.left, node.right, node.count);
}
/** @internal */
export function swap(n, v) {
  n.key = v.key;
  n.value = v.value;
  n.left = v.left;
  n.right = v.right;
  n.color = v.color;
  n.count = v.count;
}
/** @internal */
export function repaint(node, color) {
  return new Node(color, node.key, node.value, node.left, node.right, node.count);
}
/** @internal */
export function recount(node) {
  node.count = 1 + (node.left?.count ?? 0) + (node.right?.count ?? 0);
}
//# sourceMappingURL=node.mjs.map