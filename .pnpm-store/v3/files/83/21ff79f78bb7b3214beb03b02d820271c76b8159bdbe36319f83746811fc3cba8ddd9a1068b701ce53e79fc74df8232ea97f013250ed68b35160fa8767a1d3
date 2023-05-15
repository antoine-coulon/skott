"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unbounded = exports.takeUpTo = exports.takeN = exports.takeBetween = exports.takeAll = exports.take = exports.slidingStrategy = exports.sliding = exports.size = exports.shutdown = exports.poll = exports.offerAll = exports.offer = exports.isShutdown = exports.isQueue = exports.isFull = exports.isEnqueue = exports.isEmpty = exports.isDequeue = exports.droppingStrategy = exports.dropping = exports.capacity = exports.bounded = exports.backPressureStrategy = exports.awaitShutdown = exports.QueueStrategyTypeId = exports.EnqueueTypeId = exports.DequeueTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/queue"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const EnqueueTypeId = internal.EnqueueTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.EnqueueTypeId = EnqueueTypeId;
const DequeueTypeId = internal.DequeueTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.DequeueTypeId = DequeueTypeId;
const QueueStrategyTypeId = internal.QueueStrategyTypeId;
/**
 * Returns `true` if the specified value is a `Queue`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.QueueStrategyTypeId = QueueStrategyTypeId;
const isQueue = internal.isQueue;
/**
 * Returns `true` if the specified value is a `Dequeue`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isQueue = isQueue;
const isDequeue = internal.isDequeue;
/**
 * Returns `true` if the specified value is a `Enqueue`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isDequeue = isDequeue;
const isEnqueue = internal.isEnqueue;
/**
 * @since 1.0.0
 * @category strategies
 */
exports.isEnqueue = isEnqueue;
const backPressureStrategy = internal.backPressureStrategy;
/**
 * @since 1.0.0
 * @category strategies
 */
exports.backPressureStrategy = backPressureStrategy;
const droppingStrategy = internal.droppingStrategy;
/**
 * @since 1.0.0
 * @category strategies
 */
exports.droppingStrategy = droppingStrategy;
const slidingStrategy = internal.slidingStrategy;
/**
 * Makes a new bounded `Queue`. When the capacity of the queue is reached, any
 * additional calls to `offer` will be suspended until there is more room in
 * the queue.
 *
 * **Note**: When possible use only power of 2 capacities; this will provide
 * better performance by utilising an optimised version of the underlying
 * `RingBuffer`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.slidingStrategy = slidingStrategy;
const bounded = internal.bounded;
/**
 * Makes a new bounded `Queue` with the dropping strategy.
 *
 * When the capacity of the queue is reached, new elements will be added and the
 * old elements will be dropped.
 *
 * **Note**: When possible use only power of 2 capacities; this will provide
 * better performance by utilising an optimised version of the underlying
 * `RingBuffer`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.bounded = bounded;
const dropping = internal.dropping;
/**
 * Makes a new bounded `Queue` with the sliding strategy.
 *
 * When the capacity of the queue is reached, new elements will be added and the
 * old elements will be dropped.
 *
 * **Note**: When possible use only power of 2 capacities; this will provide
 * better performance by utilising an optimised version of the underlying
 * `RingBuffer`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.dropping = dropping;
const sliding = internal.sliding;
/**
 * Creates a new unbounded `Queue`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.sliding = sliding;
const unbounded = internal.unbounded;
/**
 * Returns the number of elements the queue can hold.
 *
 * @since 1.0.0
 * @category getters
 */
exports.unbounded = unbounded;
const capacity = internal.capacity;
/**
 * Retrieves the size of the queue, which is equal to the number of elements
 * in the queue. This may be negative if fibers are suspended waiting for
 * elements to be added to the queue.
 *
 * @since 1.0.0
 * @category getters
 */
exports.capacity = capacity;
const size = internal.size;
/**
 * Returns `true` if the `Queue` contains zero elements, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.size = size;
const isEmpty = internal.isEmpty;
/**
 * Returns `true` if the `Queue` contains at least one element, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isEmpty = isEmpty;
const isFull = internal.isFull;
/**
 * Returns `true` if `shutdown` has been called, otherwise returns `false`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isFull = isFull;
const isShutdown = internal.isShutdown;
/**
 * Waits until the queue is shutdown. The `Effect` returned by this method will
 * not resume until the queue has been shutdown. If the queue is already
 * shutdown, the `Effect` will resume right away.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.isShutdown = isShutdown;
const awaitShutdown = internal.awaitShutdown;
/**
 * Interrupts any fibers that are suspended on `offer` or `take`. Future calls
 * to `offer*` and `take*` will be interrupted immediately.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.awaitShutdown = awaitShutdown;
const shutdown = internal.shutdown;
/**
 * Places one value in the queue.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.shutdown = shutdown;
const offer = internal.offer;
/**
 * For Bounded Queue: uses the `BackPressure` Strategy, places the values in
 * the queue and always returns true. If the queue has reached capacity, then
 * the fiber performing the `offerAll` will be suspended until there is room
 * in the queue.
 *
 * For Unbounded Queue: Places all values in the queue and returns true.
 *
 * For Sliding Queue: uses `Sliding` Strategy If there is room in the queue,
 * it places the values otherwise it removes the old elements and enqueues the
 * new ones. Always returns true.
 *
 * For Dropping Queue: uses `Dropping` Strategy, It places the values in the
 * queue but if there is no room it will not enqueue them and return false.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.offer = offer;
const offerAll = internal.offerAll;
/**
 * Returns the first value in the `Queue` as a `Some<A>`, or `None` if the queue
 * is empty.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.offerAll = offerAll;
const poll = internal.poll;
/**
 * Takes the oldest value in the queue. If the queue is empty, this will return
 * a computation that resumes when an item has been added to the queue.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.poll = poll;
const take = internal.take;
/**
 * Takes all the values in the queue and returns the values. If the queue is
 * empty returns an empty collection.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.take = take;
const takeAll = internal.takeAll;
/**
 * Takes up to max number of values from the queue.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.takeAll = takeAll;
const takeUpTo = internal.takeUpTo;
/**
 * Takes a number of elements from the queue between the specified minimum and
 * maximum. If there are fewer than the minimum number of elements available,
 * suspends until at least the minimum number of elements have been collected.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.takeUpTo = takeUpTo;
const takeBetween = internal.takeBetween;
/**
 * Takes the specified number of elements from the queue. If there are fewer
 * than the specified number of elements available, it suspends until they
 * become available.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.takeBetween = takeBetween;
const takeN = internal.takeN;
exports.takeN = takeN;
//# sourceMappingURL=Queue.js.map