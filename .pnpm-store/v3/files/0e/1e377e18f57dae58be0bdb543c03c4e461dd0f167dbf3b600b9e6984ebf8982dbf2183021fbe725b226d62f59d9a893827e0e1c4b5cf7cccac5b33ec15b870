import * as internal from "@effect/io/internal_effect_untraced/cause";
import * as _pretty from "@effect/io/internal_effect_untraced/cause-pretty";
/**
 * @since 1.0.0
 * @category symbols
 */
export const CauseTypeId = internal.CauseTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const RuntimeExceptionTypeId = internal.RuntimeExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const InterruptedExceptionTypeId = internal.InterruptedExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const IllegalArgumentExceptionTypeId = internal.IllegalArgumentExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const NoSuchElementExceptionTypeId = internal.NoSuchElementExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const InvalidHubCapacityExceptionTypeId = internal.InvalidHubCapacityExceptionTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const StackAnnotationTypeId = internal.StackAnnotationTypeId;
/**
 * @since 1.0.0
 * @category stack
 */
export const StackAnnotation = internal.StackAnnotation;
/**
 * @since 1.0.0
 * @category stack
 */
export const globalErrorSeq = internal.globalErrorSeq;
/**
 * Constructs a new `Empty` cause.
 *
 * @since 1.0.0
 * @category constructors
 */
export const empty = internal.empty;
/**
 * Constructs a new `Fail` cause from the specified `error`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fail = internal.fail;
/**
 * Constructs a new `Die` cause from the specified `defect`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const die = internal.die;
/**
 * Constructs a new `Interrupt` cause from the specified `fiberId`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const interrupt = internal.interrupt;
/**
 * Constructs a new `Annotated` cause from the specified `annotation`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const annotated = internal.annotated;
/**
 * Constructs a new `Parallel` cause from the specified `left` and `right`
 * causes.
 *
 * @since 1.0.0
 * @category constructors
 */
export const parallel = internal.parallel;
/**
 * Constructs a new `Sequential` cause from the specified pecified `left` and
 * `right` causes.
 *
 * @since 1.0.0
 * @category constructors
 */
export const sequential = internal.sequential;
/**
 * Returns `true` if the specified value is a `Cause`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isCause = internal.isCause;
/**
 * Returns `true` if the specified `Cause` is an `Empty` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isEmptyType = internal.isEmptyType;
/**
 * Returns `true` if the specified `Cause` is a `Fail` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isFailType = internal.isFailType;
/**
 * Returns `true` if the specified `Cause` is a `Die` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isDieType = internal.isDieType;
/**
 * Returns `true` if the specified `Cause` is an `Interrupt` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isInterruptType = internal.isInterruptType;
/**
 * Returns `true` if the specified `Cause` is an `Annotated` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isAnnotatedType = internal.isAnnotatedType;
/**
 * Returns `true` if the specified `Cause` is a `Sequential` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isSequentialType = internal.isSequentialType;
/**
 * Returns `true` if the specified `Cause` is a `Parallel` type, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isParallelType = internal.isParallelType;
/**
 * Returns the size of the cause, calculated as the number of individual `Cause`
 * nodes found in the `Cause` semiring structure.
 *
 * @since 1.0.0
 * @category getters
 */
export const size = internal.size;
/**
 * Returns `true` if the specified cause is empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isEmpty = internal.isEmpty;
/**
 * Returns `true` if the specified cause contains a failure, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isFailure = internal.isFailure;
/**
 * Returns `true` if the specified cause contains a defect, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isDie = internal.isDie;
/**
 * Returns `true` if the specified cause contains an interruption, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isInterrupted = internal.isInterrupted;
/**
 * Returns `true` if the specified cause contains only interruptions (without
 * any `Die` or `Fail` causes), `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isInterruptedOnly = internal.isInterruptedOnly;
/**
 * Returns a `List` of all recoverable errors of type `E` in the specified
 * cause.
 *
 * @since 1.0.0
 * @category getters
 */
export const failures = internal.failures;
/**
 * Returns a `List` of all unrecoverable defects in the specified cause.
 *
 * @since 1.0.0
 * @category getters
 */
export const defects = internal.defects;
/**
 * Returns a `HashSet` of `FiberId`s for all fibers that interrupted the fiber
 * described by the specified cause.
 *
 * @since 1.0.0
 * @category getters
 */
export const interruptors = internal.interruptors;
/**
 * Returns the `E` associated with the first `Fail` in this `Cause`, if one
 * exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const failureOption = internal.failureOption;
/**
 * Returns the first checked error on the `Left` if available, if there are
 * no checked errors return the rest of the `Cause` that is known to contain
 * only `Die` or `Interrupt` causes.
 *
 * @since 1.0.0
 * @category getters
 */
export const failureOrCause = internal.failureOrCause;
/**
 * Converts the specified `Cause<Option<E>>` to an `Option<Cause<E>>` by
 * recursively stripping out any failures with the error `None`.
 *
 * @since 1.0.0
 * @category getters
 */
export const flipCauseOption = internal.flipCauseOption;
/**
 * Returns the defect associated with the first `Die` in this `Cause`, if one
 * exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const dieOption = internal.dieOption;
/**
 * Returns the `FiberId` associated with the first `Interrupt` in the specified
 * cause, if one exists.
 *
 * @since 1.0.0
 * @category getters
 */
export const interruptOption = internal.interruptOption;
/**
 * Remove all `Fail` and `Interrupt` nodes from the specified cause, and return
 * a cause containing only `Die` cause/finalizer defects.
 *
 * @since 1.0.0
 * @category getters
 */
export const keepDefects = internal.keepDefects;
/**
 * Linearizes the specified cause into a `HashSet` of parallel causes where each
 * parallel cause contains a linear sequence of failures.
 *
 * @since 1.0.0
 * @category getters
 */
export const linearize = internal.linearize;
/**
 * Remove all `Fail` and `Interrupt` nodes from the specified cause, and return
 * a cause containing only `Die` cause/finalizer defects.
 *
 * @since 1.0.0
 * @category getters
 */
export const stripFailures = internal.stripFailures;
/**
 * Remove all `Die` causes that the specified partial function is defined at,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 *
 * @since 1.0.0
 * @category getters
 */
export const stripSomeDefects = internal.stripSomeDefects;
/**
 * @since 1.0.0
 * @category mapping
 */
export const as = internal.as;
/**
 * @since 1.0.0
 * @category mapping
 */
export const map = internal.map;
/**
 * @since 1.0.0
 * @category sequencing
 */
export const flatMap = internal.flatMap;
/**
 * @since 1.0.0
 * @category sequencing
 */
export const flatten = internal.flatten;
/**
 * Returns `true` if the `self` cause contains or is equal to `that` cause,
 * `false` otherwise.
 *
 * @since 1.0.0
 * @category elements
 */
export const contains = internal.contains;
/**
 * Squashes a `Cause` down to a single defect, chosen to be the "most important"
 * defect.
 *
 * @since 1.0.0
 * @category destructors
 */
export const squash = internal.squash;
/**
 * Squashes a `Cause` down to a single defect, chosen to be the "most important"
 * defect. If a recoverable error is found, the provided function will be used
 * to map the error a defect, and the resulting value will be returned.
 *
 * @since 1.0.0
 * @category destructors
 */
export const squashWith = internal.squashWith;
/**
 * Uses the provided partial function to search the specified cause and attempt
 * to extract information from it.
 *
 * @since 1.0.0
 * @category elements
 */
export const find = internal.find;
/**
 * Filters causes which match the provided predicate out of the specified cause.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filter = internal.filter;
/**
 * Folds the specified cause into a value of type `Z`.
 *
 * @since 1.0.0
 * @category folding
 */
export const match = internal.match;
/**
 * Reduces the specified cause into a value of type `Z`, beginning with the
 * provided `zero` value.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduce = internal.reduce;
/**
 * Reduces the specified cause into a value of type `Z` using a `Cause.Reducer`.
 * Also allows for accessing the provided context during reduction.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceWithContext = internal.reduceWithContext;
/**
 * Represents a checked exception which occurs when a `Fiber` is interrupted.
 *
 * @since 1.0.0
 * @category errors
 */
export const InterruptedException = internal.InterruptedException;
/**
 * Returns `true` if the specified value is an `InterruptedException`, `false`
 * otherwise.

 * @since 1.0.0
 * @category refinements
 */
export const isInterruptedException = internal.isInterruptedException;
/**
 * Represents a checked exception which occurs when an invalid argument is
 * provided to a method.
 *
 * @since 1.0.0
 * @category errors
 */
export const IllegalArgumentException = internal.IllegalArgumentException;
/**
 * Returns `true` if the specified value is an `IllegalArgumentException`, `false`
 * otherwise.

 * @since 1.0.0
 * @category refinements
 */
export const isIllegalArgumentException = internal.isIllegalArgumentException;
/**
 * Represents a checked exception which occurs when an expected element was
 * unable to be found.
 *
 * @since 1.0.0
 * @category errors
 */
export const NoSuchElementException = internal.NoSuchElementException;
/**
  * Returns `true` if the specified value is an `IllegalArgumentException`, `false`
  * otherwise.

  * @since 1.0.0
  * @category refinements
  */
export const isNoSuchElementException = internal.isNoSuchElementException;
/**
 * Represents a generic checked exception which occurs at runtime.
 *
 * @since 1.0.0
 * @category errors
 */
export const RuntimeException = internal.RuntimeException;
/**
  * Returns `true` if the specified value is an `RuntimeException`, `false`
  * otherwise.

  * @since 1.0.0
  * @category refinements
  */
export const isRuntimeException = internal.isRuntimeException;
/**
 * Returns the specified `Cause` as a pretty-printed string.
 *
 * @since 1.0.0
 * @category rendering
 */
export const pretty = _pretty.pretty;
/**
 * Checks if an annotation is a StackAnnotation
 *
 * @since 1.0.0
 * @category guards
 */
export const isStackAnnotation = internal.isStackAnnotation;
/**
 * Removes any annotation from the cause
 *
 * @since 1.0.0
 * @category filtering
 */
export const unannotate = internal.unannotate;
//# sourceMappingURL=Cause.mjs.map