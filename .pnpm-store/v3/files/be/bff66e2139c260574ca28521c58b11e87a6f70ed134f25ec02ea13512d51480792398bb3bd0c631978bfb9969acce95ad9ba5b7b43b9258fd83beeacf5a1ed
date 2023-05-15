"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = exports.zipRight = exports.zipParRight = exports.zipParLeft = exports.zipPar = exports.zipLeft = exports.zip = exports.unit = exports.unannotate = exports.succeed = exports.matchEffect = exports.match = exports.mapErrorCause = exports.mapError = exports.mapBoth = exports.map = exports.isSuccess = exports.isInterrupted = exports.isFailure = exports.isExit = exports.interrupt = exports.getOrElse = exports.fromOption = exports.fromEither = exports.forEachEffect = exports.flatten = exports.flatMapEffect = exports.flatMap = exports.failCause = exports.fail = exports.exists = exports.die = exports.collectAllPar = exports.collectAll = exports.causeOption = exports.asUnit = exports.as = void 0;
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Returns `true` if the specified value is an `Exit`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
const isExit = core.exitIsExit;
/**
 * Returns `true` if the specified `Exit` is a `Failure`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isExit = isExit;
const isFailure = core.exitIsFailure;
/**
 * Returns `true` if the specified `Exit` is a `Success`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isFailure = isFailure;
const isSuccess = core.exitIsSuccess;
/**
 * Returns `true` if the specified exit is a `Failure` **and** the `Cause` of
 * the failure was due to interruption, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isSuccess = isSuccess;
const isInterrupted = core.exitIsInterrupted;
/**
 * Maps the `Success` value of the specified exit to the provided constant
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.isInterrupted = isInterrupted;
const as = core.exitAs;
/**
 * Maps the `Success` value of the specified exit to a void.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.as = as;
const asUnit = core.exitAsUnit;
/**
 * Returns a `Some<Cause<E>>` if the specified exit is a `Failure`, `None`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.asUnit = asUnit;
const causeOption = core.exitCauseOption;
/**
 * Collects all of the specified exit values into a `Some<Exit<E, List<A>>>`. If
 * the provided iterable contains no elements, `None` will be returned.
 *
 * **Note**: `Exit.collectAll` combines `Cause` values sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.causeOption = causeOption;
const collectAll = core.exitCollectAll;
/**
 * Collects all of the specified exit values into a `Some<Exit<E, List<A>>>`. If
 * the provided iterable contains no elements, `None` will be returned.
 *
 * **Note**: `Exit.collectAll` combines `Cause` values in parallel.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAll = collectAll;
const collectAllPar = core.exitCollectAllPar;
/**
 * Constructs a new `Exit.Failure` from the specified unrecoverable defect.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllPar = collectAllPar;
const die = core.exitDie;
/**
 * Executes the predicate on the value of the specified exit if it is a
 * `Success`, otherwise returns `false`.
 *
 * @since 1.0.0
 * @category elements
 */
exports.die = die;
const exists = core.exitExists;
/**
 * Constructs a new `Exit.Failure` from the specified recoverable error of type
 * `E`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.exists = exists;
const fail = core.exitFail;
/**
 * Constructs a new `Exit.Failure` from the specified `Cause` of type `E`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fail = fail;
const failCause = core.exitFailCause;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.failCause = failCause;
const flatMap = core.exitFlatMap;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.flatMap = flatMap;
const flatMapEffect = core.exitFlatMapEffect;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.flatMapEffect = flatMapEffect;
const flatten = core.exitFlatten;
/**
 * @since 1.0.0
 * @category traversing
 */
exports.flatten = flatten;
const forEachEffect = core.exitForEachEffect;
/**
 * Converts an `Either<E, A>` into an `Exit<E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.forEachEffect = forEachEffect;
const fromEither = core.exitFromEither;
/**
 * Converts an `Option<A>` into an `Exit<void, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.fromEither = fromEither;
const fromOption = core.exitFromOption;
/**
 * Returns the `A` if specified exit is a `Success`, otherwise returns the
 * alternate `A` value computed from the specified function which receives the
 * `Cause<E>` of the exit `Failure`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.fromOption = fromOption;
const getOrElse = core.exitGetOrElse;
/**
 * Constructs a new `Exit.Failure` from the specified `FiberId` indicating that
 * the `Fiber` running an `Effect` workflow was terminated due to interruption.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.getOrElse = getOrElse;
const interrupt = core.exitInterrupt;
/**
 * Maps over the `Success` value of the specified exit using the provided
 * function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.interrupt = interrupt;
const map = core.exitMap;
/**
 * Maps over the `Success` and `Failure` cases of the specified exit using the
 * provided functions.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapBoth = core.exitMapBoth;
/**
 * Maps over the error contained in the `Failure` of the specified exit using
 * the provided function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapBoth = mapBoth;
const mapError = core.exitMapError;
/**
 * Maps over the `Cause` contained in the `Failure` of the specified exit using
 * the provided function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapError = mapError;
const mapErrorCause = core.exitMapErrorCause;
/**
 * @since 1.0.0
 * @category folding
 */
exports.mapErrorCause = mapErrorCause;
const match = core.exitMatch;
/**
 * @since 1.0.0
 * @category folding
 */
exports.match = match;
const matchEffect = core.exitMatchEffect;
/**
 * Constructs a new `Exit.Success` containing the specified value of type `A`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.matchEffect = matchEffect;
const succeed = core.exitSucceed;
/**
 * Removes any annotation from the failure cause
 *
 * @since 1.0.0
 * @category filtering
 */
exports.succeed = succeed;
const unannotate = core.exitUnannotate;
/**
 * Represents an `Exit` which succeeds with `undefined`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.unannotate = unannotate;
const unit = core.exitUnit;
/**
 * Sequentially zips the this result with the specified result or else returns
 * the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.unit = unit;
const zip = core.exitZip;
/**
 * Sequentially zips the this result with the specified result discarding the
 * second element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zip = zip;
const zipLeft = core.exitZipLeft;
/**
 * Sequentially zips the this result with the specified result discarding the
 * first element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipLeft = zipLeft;
const zipRight = core.exitZipRight;
/**
 * Parallelly zips the this result with the specified result or else returns
 * the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipRight = zipRight;
const zipPar = core.exitZipPar;
/**
 * Parallelly zips the this result with the specified result discarding the
 * second element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipPar = zipPar;
const zipParLeft = core.exitZipParLeft;
/**
 * Parallelly zips the this result with the specified result discarding the
 * first element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipParLeft = zipParLeft;
const zipParRight = core.exitZipParRight;
/**
 * Zips this exit together with that exit using the specified combination
 * functions.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipParRight = zipParRight;
const zipWith = core.exitZipWith;
exports.zipWith = zipWith;
//# sourceMappingURL=Exit.js.map