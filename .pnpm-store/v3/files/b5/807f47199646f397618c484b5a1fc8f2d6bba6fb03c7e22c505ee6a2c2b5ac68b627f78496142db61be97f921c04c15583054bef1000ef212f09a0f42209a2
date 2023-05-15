"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unannotate = exports.stripSomeDefects = exports.stripFailures = exports.squashWith = exports.squash = exports.size = exports.sequential = exports.reduceWithContext = exports.reduce = exports.pretty = exports.parallel = exports.match = exports.map = exports.linearize = exports.keepDefects = exports.isStackAnnotation = exports.isSequentialType = exports.isRuntimeException = exports.isParallelType = exports.isNoSuchElementException = exports.isInterruptedOnly = exports.isInterruptedException = exports.isInterrupted = exports.isInterruptType = exports.isIllegalArgumentException = exports.isFailure = exports.isFailType = exports.isEmptyType = exports.isEmpty = exports.isDieType = exports.isDie = exports.isCause = exports.isAnnotatedType = exports.interruptors = exports.interruptOption = exports.interrupt = exports.globalErrorSeq = exports.flipCauseOption = exports.flatten = exports.flatMap = exports.find = exports.filter = exports.failures = exports.failureOrCause = exports.failureOption = exports.fail = exports.empty = exports.dieOption = exports.die = exports.defects = exports.contains = exports.as = exports.annotated = exports.StackAnnotationTypeId = exports.StackAnnotation = exports.RuntimeExceptionTypeId = exports.RuntimeException = exports.NoSuchElementExceptionTypeId = exports.NoSuchElementException = exports.InvalidHubCapacityExceptionTypeId = exports.InterruptedExceptionTypeId = exports.InterruptedException = exports.IllegalArgumentExceptionTypeId = exports.IllegalArgumentException = exports.CauseTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var _pretty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause-pretty"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const CauseTypeId = internal.CauseTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.CauseTypeId = CauseTypeId;
const RuntimeExceptionTypeId = internal.RuntimeExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.RuntimeExceptionTypeId = RuntimeExceptionTypeId;
const InterruptedExceptionTypeId = internal.InterruptedExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.InterruptedExceptionTypeId = InterruptedExceptionTypeId;
const IllegalArgumentExceptionTypeId = internal.IllegalArgumentExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.IllegalArgumentExceptionTypeId = IllegalArgumentExceptionTypeId;
const NoSuchElementExceptionTypeId = internal.NoSuchElementExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.NoSuchElementExceptionTypeId = NoSuchElementExceptionTypeId;
const InvalidHubCapacityExceptionTypeId = internal.InvalidHubCapacityExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.InvalidHubCapacityExceptionTypeId = InvalidHubCapacityExceptionTypeId;
const StackAnnotationTypeId = internal.StackAnnotationTypeId;
/**
 * @since 1.0.0
 * @category stack
 */
exports.StackAnnotationTypeId = StackAnnotationTypeId;
const StackAnnotation = internal.StackAnnotation;
/**
 * @since 1.0.0
 * @category stack
 */
exports.StackAnnotation = StackAnnotation;
const globalErrorSeq = internal.globalErrorSeq;
/**
 * Constructs a new `Empty` cause.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.globalErrorSeq = globalErrorSeq;
const empty = internal.empty;
/**
 * Constructs a new `Fail` cause from the specified `error`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fail = internal.fail;
/**
 * Constructs a new `Die` cause from the specified `defect`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fail = fail;
const die = internal.die;
/**
 * Constructs a new `Interrupt` cause from the specified `fiberId`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.die = die;
const interrupt = internal.interrupt;
/**
 * Constructs a new `Annotated` cause from the specified `annotation`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.interrupt = interrupt;
const annotated = internal.annotated;
/**
 * Constructs a new `Parallel` cause from the specified `left` and `right`
 * causes.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.annotated = annotated;
const parallel = internal.parallel;
/**
 * Constructs a new `Sequential` cause from the specified pecified `left` and
 * `right` causes.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.parallel = parallel;
const sequential = internal.sequential;
/**
 * Returns `true` if the specified value is a `Cause`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.sequential = sequential;
const isCause = internal.isCause;
/**
 * Returns `true` if the specified `Cause` is an `Empty` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isCause = isCause;
const isEmptyType = internal.isEmptyType;
/**
 * Returns `true` if the specified `Cause` is a `Fail` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isEmptyType = isEmptyType;
const isFailType = internal.isFailType;
/**
 * Returns `true` if the specified `Cause` is a `Die` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isFailType = isFailType;
const isDieType = internal.isDieType;
/**
 * Returns `true` if the specified `Cause` is an `Interrupt` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isDieType = isDieType;
const isInterruptType = internal.isInterruptType;
/**
 * Returns `true` if the specified `Cause` is an `Annotated` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isInterruptType = isInterruptType;
const isAnnotatedType = internal.isAnnotatedType;
/**
 * Returns `true` if the specified `Cause` is a `Sequential` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isAnnotatedType = isAnnotatedType;
const isSequentialType = internal.isSequentialType;
/**
 * Returns `true` if the specified `Cause` is a `Parallel` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isSequentialType = isSequentialType;
const isParallelType = internal.isParallelType;
/**
 * Returns the size of the cause, calculated as the number of individual `Cause`
 * nodes found in the `Cause` semiring structure.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isParallelType = isParallelType;
const size = internal.size;
/**
 * Returns `true` if the specified cause is empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.size = size;
const isEmpty = internal.isEmpty;
/**
 * Returns `true` if the specified cause contains a failure, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isEmpty = isEmpty;
const isFailure = internal.isFailure;
/**
 * Returns `true` if the specified cause contains a defect, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isFailure = isFailure;
const isDie = internal.isDie;
/**
 * Returns `true` if the specified cause contains an interruption, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isDie = isDie;
const isInterrupted = internal.isInterrupted;
/**
 * Returns `true` if the specified cause contains only interruptions (without
 * any `Die` or `Fail` causes), `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isInterrupted = isInterrupted;
const isInterruptedOnly = internal.isInterruptedOnly;
/**
 * Returns a `List` of all recoverable errors of type `E` in the specified
 * cause.
 *
 * @since 1.0.0
 * @category getters
 */
exports.isInterruptedOnly = isInterruptedOnly;
const failures = internal.failures;
/**
 * Returns a `List` of all unrecoverable defects in the specified cause.
 *
 * @since 1.0.0
 * @category getters
 */
exports.failures = failures;
const defects = internal.defects;
/**
 * Returns a `HashSet` of `FiberId`s for all fibers that interrupted the fiber
 * described by the specified cause.
 *
 * @since 1.0.0
 * @category getters
 */
exports.defects = defects;
const interruptors = internal.interruptors;
/**
 * Returns the `E` associated with the first `Fail` in this `Cause`, if one
 * exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.interruptors = interruptors;
const failureOption = internal.failureOption;
/**
 * Returns the first checked error on the `Left` if available, if there are
 * no checked errors return the rest of the `Cause` that is known to contain
 * only `Die` or `Interrupt` causes.
 *
 * @since 1.0.0
 * @category getters
 */
exports.failureOption = failureOption;
const failureOrCause = internal.failureOrCause;
/**
 * Converts the specified `Cause<Option<E>>` to an `Option<Cause<E>>` by
 * recursively stripping out any failures with the error `None`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.failureOrCause = failureOrCause;
const flipCauseOption = internal.flipCauseOption;
/**
 * Returns the defect associated with the first `Die` in this `Cause`, if one
 * exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.flipCauseOption = flipCauseOption;
const dieOption = internal.dieOption;
/**
 * Returns the `FiberId` associated with the first `Interrupt` in the specified
 * cause, if one exists.
 *
 * @since 1.0.0
 * @category getters
 */
exports.dieOption = dieOption;
const interruptOption = internal.interruptOption;
/**
 * Remove all `Fail` and `Interrupt` nodes from the specified cause, and return
 * a cause containing only `Die` cause/finalizer defects.
 *
 * @since 1.0.0
 * @category getters
 */
exports.interruptOption = interruptOption;
const keepDefects = internal.keepDefects;
/**
 * Linearizes the specified cause into a `HashSet` of parallel causes where each
 * parallel cause contains a linear sequence of failures.
 *
 * @since 1.0.0
 * @category getters
 */
exports.keepDefects = keepDefects;
const linearize = internal.linearize;
/**
 * Remove all `Fail` and `Interrupt` nodes from the specified cause, and return
 * a cause containing only `Die` cause/finalizer defects.
 *
 * @since 1.0.0
 * @category getters
 */
exports.linearize = linearize;
const stripFailures = internal.stripFailures;
/**
 * Remove all `Die` causes that the specified partial function is defined at,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 *
 * @since 1.0.0
 * @category getters
 */
exports.stripFailures = stripFailures;
const stripSomeDefects = internal.stripSomeDefects;
/**
 * @since 1.0.0
 * @category mapping
 */
exports.stripSomeDefects = stripSomeDefects;
const as = internal.as;
/**
 * @since 1.0.0
 * @category mapping
 */
exports.as = as;
const map = internal.map;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.map = map;
const flatMap = internal.flatMap;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.flatMap = flatMap;
const flatten = internal.flatten;
/**
 * Returns `true` if the `self` cause contains or is equal to `that` cause,
 * `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
exports.flatten = flatten;
const contains = internal.contains;
/**
 * Squashes a `Cause` down to a single defect, chosen to be the "most important"
 * defect.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.contains = contains;
const squash = internal.squash;
/**
 * Squashes a `Cause` down to a single defect, chosen to be the "most important"
 * defect. If a recoverable error is found, the provided function will be used
 * to map the error a defect, and the resulting value will be returned.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.squash = squash;
const squashWith = internal.squashWith;
/**
 * Uses the provided partial function to search the specified cause and attempt
 * to extract information from it.
 *
 * @since 1.0.0
 * @category elements
 */
exports.squashWith = squashWith;
const find = internal.find;
/**
 * Filters causes which match the provided predicate out of the specified cause.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.find = find;
const filter = internal.filter;
/**
 * Folds the specified cause into a value of type `Z`.
 *
 * @since 1.0.0
 * @category folding
 */
exports.filter = filter;
const match = internal.match;
/**
 * Reduces the specified cause into a value of type `Z`, beginning with the
 * provided `zero` value.
 *
 * @since 1.0.0
 * @category folding
 */
exports.match = match;
const reduce = internal.reduce;
/**
 * Reduces the specified cause into a value of type `Z` using a `Cause.Reducer`.
 * Also allows for accessing the provided context during reduction.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduce = reduce;
const reduceWithContext = internal.reduceWithContext;
/**
 * Represents a checked exception which occurs when a `Fiber` is interrupted.
 *
 * @since 1.0.0
 * @category errors
 */
exports.reduceWithContext = reduceWithContext;
const InterruptedException = internal.InterruptedException;
/**
 * Returns `true` if the specified value is an `InterruptedException`, `false`
 * otherwise.

 * @since 1.0.0
 * @category refinements
 */
exports.InterruptedException = InterruptedException;
const isInterruptedException = internal.isInterruptedException;
/**
 * Represents a checked exception which occurs when an invalid argument is
 * provided to a method.
 *
 * @since 1.0.0
 * @category errors
 */
exports.isInterruptedException = isInterruptedException;
const IllegalArgumentException = internal.IllegalArgumentException;
/**
 * Returns `true` if the specified value is an `IllegalArgumentException`, `false`
 * otherwise.

 * @since 1.0.0
 * @category refinements
 */
exports.IllegalArgumentException = IllegalArgumentException;
const isIllegalArgumentException = internal.isIllegalArgumentException;
/**
 * Represents a checked exception which occurs when an expected element was
 * unable to be found.
 *
 * @since 1.0.0
 * @category errors
 */
exports.isIllegalArgumentException = isIllegalArgumentException;
const NoSuchElementException = internal.NoSuchElementException;
/**
  * Returns `true` if the specified value is an `IllegalArgumentException`, `false`
  * otherwise.

  * @since 1.0.0
  * @category refinements
  */
exports.NoSuchElementException = NoSuchElementException;
const isNoSuchElementException = internal.isNoSuchElementException;
/**
 * Represents a generic checked exception which occurs at runtime.
 *
 * @since 1.0.0
 * @category errors
 */
exports.isNoSuchElementException = isNoSuchElementException;
const RuntimeException = internal.RuntimeException;
/**
  * Returns `true` if the specified value is an `RuntimeException`, `false`
  * otherwise.

  * @since 1.0.0
  * @category refinements
  */
exports.RuntimeException = RuntimeException;
const isRuntimeException = internal.isRuntimeException;
/**
 * Returns the specified `Cause` as a pretty-printed string.
 *
 * @since 1.0.0
 * @category rendering
 */
exports.isRuntimeException = isRuntimeException;
const pretty = _pretty.pretty;
/**
 * Checks if an annotation is a StackAnnotation
 *
 * @since 1.0.0
 * @category guards
 */
exports.pretty = pretty;
const isStackAnnotation = internal.isStackAnnotation;
/**
 * Removes any annotation from the cause
 *
 * @since 1.0.0
 * @category filtering
 */
exports.isStackAnnotation = isStackAnnotation;
const unannotate = internal.unannotate;
exports.unannotate = unannotate;
//# sourceMappingURL=Cause.js.map