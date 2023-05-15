"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valuesReversed = exports.values = exports.size = exports.reversed = exports.removeFirst = exports.reduceWithIndex = exports.reduce = exports.make = exports.lessThanReversed = exports.lessThanEqualReversed = exports.lessThanEqual = exports.lessThan = exports.last = exports.keysReversed = exports.keys = exports.isRedBlackTree = exports.insert = exports.has = exports.greaterThanReversed = exports.greaterThanEqualReversed = exports.greaterThanEqual = exports.greaterThan = exports.getOrder = exports.getAt = exports.fromIterable = exports.forEachLessThan = exports.forEachGreaterThanEqual = exports.forEachBetween = exports.forEach = exports.first = exports.findFirst = exports.find = exports.empty = exports.atReversed = exports.at = exports.Direction = void 0;
var RBT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/RedBlackTree"));
var RBTI = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/RedBlackTree/iterator"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TypeId = RBT.RedBlackTreeTypeId;
/**
 * @since 1.0.0
 * @category constants
 */
const Direction = RBTI.Direction;
/**
 * @since 1.0.0
 * @category refinements
 */
exports.Direction = Direction;
const isRedBlackTree = RBT.isRedBlackTree;
/**
 * Creates an empty `RedBlackTree`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.isRedBlackTree = isRedBlackTree;
const empty = RBT.empty;
/**
 * Constructs a new tree from an iterable of key-value pairs.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fromIterable = RBT.fromIterable;
/**
 * Constructs a new `RedBlackTree` from the specified entries.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromIterable = fromIterable;
const make = RBT.make;
/**
 * Returns an iterator that points to the element at the specified index of the
 * tree.
 *
 * **Note**: The iterator will run through elements in order.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.make = make;
const at = RBT.atForwards;
/**
 * Returns an iterator that points to the element at the specified index of the
 * tree.
 *
 * **Note**: The iterator will run through elements in reverse order.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.at = at;
const atReversed = RBT.atBackwards;
/**
 * Finds all values in the tree associated with the specified key.
 *
 * @since 1.0.0
 * @category elements
 */
exports.atReversed = atReversed;
const find = RBT.find;
/**
 * Finds the value in the tree associated with the specified key, if it exists.
 *
 * @since 1.0.0
 * @category elements
 */
exports.find = find;
const findFirst = RBT.findFirst;
/**
 * Returns the first entry in the tree, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.findFirst = findFirst;
const first = RBT.first;
/**
 * Returns the element at the specified index within the tree or `None` if the
 * specified index does not exist.
 *
 * @since 1.0.0
 * @category elements
 */
exports.first = first;
const getAt = RBT.getAt;
/**
 * Gets the `Order<K>` that the `RedBlackTree<K, V>` is using.
 *
 * @since 1.0.0
 * @category getters
 */
exports.getAt = getAt;
const getOrder = RBT.getOrder;
/**
 * Returns an iterator that traverse entries in order with keys greater than the
 * specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.getOrder = getOrder;
const greaterThan = RBT.greaterThanForwards;
/**
 * Returns an iterator that traverse entries in reverse order with keys greater
 * than the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.greaterThan = greaterThan;
const greaterThanReversed = RBT.greaterThanBackwards;
/**
 * Returns an iterator that traverse entries in order with keys greater than or
 * equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.greaterThanReversed = greaterThanReversed;
const greaterThanEqual = RBT.greaterThanEqualForwards;
/**
 * Returns an iterator that traverse entries in reverse order with keys greater
 * than or equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.greaterThanEqual = greaterThanEqual;
const greaterThanEqualReversed = RBT.greaterThanEqualBackwards;
/**
 * Finds the item with key, if it exists.
 *
 * @since 1.0.0
 * @category elements
 */
exports.greaterThanEqualReversed = greaterThanEqualReversed;
const has = RBT.has;
/**
 * Insert a new item into the tree.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.has = has;
const insert = RBT.insert;
/**
 * Get all the keys present in the tree in order.
 *
 * @since 1.0.0
 * @category getters
 */
exports.insert = insert;
const keys = RBT.keysForward;
/**
 * Get all the keys present in the tree in reverse order.
 *
 * @since 1.0.0
 * @category getters
 */
exports.keys = keys;
const keysReversed = RBT.keysBackward;
/**
 * Returns the last entry in the tree, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.keysReversed = keysReversed;
const last = RBT.last;
/**
 * Returns an iterator that traverse entries in order with keys less than the
 * specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.last = last;
const lessThan = RBT.lessThanForwards;
/**
 * Returns an iterator that traverse entries in reverse order with keys less
 * than the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.lessThan = lessThan;
const lessThanReversed = RBT.lessThanBackwards;
/**
 * Returns an iterator that traverse entries in order with keys less than or
 * equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.lessThanReversed = lessThanReversed;
const lessThanEqual = RBT.lessThanEqualForwards;
/**
 * Returns an iterator that traverse entries in reverse order with keys less
 * than or equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.lessThanEqual = lessThanEqual;
const lessThanEqualReversed = RBT.lessThanEqualBackwards;
/**
 * Execute the specified function for each node of the tree, in order.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.lessThanEqualReversed = lessThanEqualReversed;
const forEach = RBT.forEach;
/**
 * Visit each node of the tree in order with key greater then or equal to max.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.forEach = forEach;
const forEachGreaterThanEqual = RBT.forEachGreaterThanEqual;
/**
 * Visit each node of the tree in order with key lower then max.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.forEachGreaterThanEqual = forEachGreaterThanEqual;
const forEachLessThan = RBT.forEachLessThan;
/**
 * Visit each node of the tree in order with key lower than max and greater
 * than or equal to min.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.forEachLessThan = forEachLessThan;
const forEachBetween = RBT.forEachBetween;
/**
 * Reduce a state over the map entries.
 *
 * @since 1.0.0
 * @category folding
 */
exports.forEachBetween = forEachBetween;
const reduce = RBT.reduce;
/**
 * Reduce a state over the entries of the tree.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduce = reduce;
const reduceWithIndex = RBT.reduceWithIndex;
/**
 * Removes the entry with the specified key, if it exists.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.reduceWithIndex = reduceWithIndex;
const removeFirst = RBT.removeFirst;
/**
 * Traverse the tree in reverse order.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.removeFirst = removeFirst;
const reversed = RBT.reversed;
/**
 * Returns the size of the tree.
 *
 * @since 1.0.0
 * @category getters
 */
exports.reversed = reversed;
const size = RBT.size;
/**
 * Get all values present in the tree in order.
 *
 * @since 1.0.0
 * @category getters
 */
exports.size = size;
const values = RBT.valuesForward;
/**
 * Get all values present in the tree in reverse order.
 *
 * @since 1.0.0
 * @category getters
 */
exports.values = values;
const valuesReversed = RBT.valuesBackward;
exports.valuesReversed = valuesReversed;
//# sourceMappingURL=RedBlackTree.js.map