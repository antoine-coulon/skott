"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unbounded = exports.pollUpTo = exports.poll = exports.offerAll = exports.offer = exports.length = exports.isFull = exports.isEmpty = exports.capacity = exports.bounded = exports.EmptyMutableQueue = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var MutableList = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableList"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/MutableQueue");
/**
 * @since 1.0.0
 * @category symbol
 */
const EmptyMutableQueue = /*#__PURE__*/Symbol.for("@effect/data/mutable/MutableQueue/Empty");
/** @internal */
exports.EmptyMutableQueue = EmptyMutableQueue;
class MutableQueueImpl {
  constructor(capacity = undefined) {
    this.capacity = capacity;
    this._tag = "Bounded";
    this._id = TypeId;
    this.queue = MutableList.empty();
  }
  [Symbol.iterator]() {
    return Array.from(this.queue)[Symbol.iterator]();
  }
  toString() {
    return `MutableQueue(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableQueue",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
/**
 * Creates a new bounded `MutableQueue`.
 *
 * @since 1.0.0
 * @category constructors
 */
const bounded = capacity => new MutableQueueImpl(capacity);
/**
 * Creates a new unbounded `MutableQueue`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.bounded = bounded;
const unbounded = () => new MutableQueueImpl();
/**
 * Returns the current number of elements in the queue.
 *
 * @since 1.0.0
 * @category getters
 */
exports.unbounded = unbounded;
const length = self => MutableList.length(self.queue);
/**
 * Returns `true` if the queue is empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.length = length;
const isEmpty = self => MutableList.isEmpty(self.queue);
/**
 * Returns `true` if the queue is full, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isEmpty = isEmpty;
const isFull = self => self.capacity === undefined ? false : MutableList.length(self.queue) === self.capacity;
/**
 * The **maximum** number of elements that a queue can hold.
 *
 * **Note**: unbounded queues can still implement this interface with
 * `capacity = Infinity`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isFull = isFull;
const capacity = self => self.capacity === undefined ? Infinity : self.capacity;
/**
 * Offers an element to the queue.
 *
 * Returns whether the enqueue was successful or not.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.capacity = capacity;
const offer = /*#__PURE__*/Dual.dual(2, (self, value) => {
  const queueLength = MutableList.length(self.queue);
  if (self.capacity !== undefined && queueLength === self.capacity) {
    return false;
  }
  MutableList.append(value)(self.queue);
  return true;
});
/**
 * Enqueues a collection of values into the queue.
 *
 * Returns a `List` of the values that were **not** able to be enqueued.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.offer = offer;
const offerAll = /*#__PURE__*/Dual.dual(2, (self, values) => {
  const iterator = values[Symbol.iterator]();
  let next;
  let remainder = Chunk.empty();
  let offering = true;
  while (offering && (next = iterator.next()) && !next.done) {
    offering = offer(next.value)(self);
  }
  while (next != null && !next.done) {
    remainder = Chunk.prepend(next.value)(remainder);
    next = iterator.next();
  }
  return Chunk.reverse(remainder);
});
/**
 * Dequeues an element from the queue.
 *
 * Returns either an element from the queue, or the `def` param.
 *
 * **Note**: if there is no meaningful default for your type, you can always
 * use `poll(MutableQueue.EmptyMutableQueue)`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.offerAll = offerAll;
const poll = /*#__PURE__*/Dual.dual(2, (self, def) => {
  if (MutableList.isEmpty(self.queue)) {
    return def;
  }
  return MutableList.shift(self.queue);
});
/**
 * Dequeues up to `n` elements from the queue.
 *
 * Returns a `List` of up to `n` elements.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.poll = poll;
const pollUpTo = /*#__PURE__*/Dual.dual(2, (self, n) => {
  let result = Chunk.empty();
  let count = 0;
  while (count < n) {
    const element = poll(EmptyMutableQueue)(self);
    if (element === EmptyMutableQueue) {
      break;
    }
    result = Chunk.prepend(element)(result);
    count += 1;
  }
  return Chunk.reverse(result);
});
exports.pollUpTo = pollUpTo;
//# sourceMappingURL=MutableQueue.js.map