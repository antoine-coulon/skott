"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unbounded = exports.subscribe = exports.sliding = exports.size = exports.shutdown = exports.publishAll = exports.publish = exports.isShutdown = exports.isFull = exports.isEmpty = exports.dropping = exports.capacity = exports.bounded = exports.awaitShutdown = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/hub"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Creates a bounded hub with the back pressure strategy. The hub will retain
 * messages until they have been taken by all subscribers, applying back
 * pressure to publishers if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 *
 * @since 1.0.0
 * @category constructors
 */
const bounded = internal.bounded;
/**
 * Creates a bounded hub with the dropping strategy. The hub will drop new
 * messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.bounded = bounded;
const dropping = internal.dropping;
/**
 * Creates a bounded hub with the sliding strategy. The hub will add new
 * messages and drop old messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.dropping = dropping;
const sliding = internal.sliding;
/**
 * Creates an unbounded hub.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.sliding = sliding;
const unbounded = internal.unbounded;
/**
 *  Returns the number of elements the queue can hold.
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
 * Returns `true` if the `Queue` contains at least one element, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.size = size;
const isFull = internal.isFull;
/**
 * Returns `true` if the `Queue` contains zero elements, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isFull = isFull;
const isEmpty = internal.isEmpty;
/**
 * Interrupts any fibers that are suspended on `offer` or `take`. Future calls
 * to `offer*` and `take*` will be interrupted immediately.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.isEmpty = isEmpty;
const shutdown = internal.shutdown;
/**
 * Returns `true` if `shutdown` has been called, otherwise returns `false`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.shutdown = shutdown;
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
 * Publishes a message to the hub, returning whether the message was published
 * to the hub.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.awaitShutdown = awaitShutdown;
const publish = internal.publish;
/**
 * Publishes all of the specified messages to the hub, returning whether they
 * were published to the hub.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.publish = publish;
const publishAll = internal.publishAll;
/**
 * Subscribes to receive messages from the hub. The resulting subscription can
 * be evaluated multiple times within the scope to take a message from the hub
 * each time.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.publishAll = publishAll;
const subscribe = internal.subscribe;
exports.subscribe = subscribe;
//# sourceMappingURL=Hub.js.map