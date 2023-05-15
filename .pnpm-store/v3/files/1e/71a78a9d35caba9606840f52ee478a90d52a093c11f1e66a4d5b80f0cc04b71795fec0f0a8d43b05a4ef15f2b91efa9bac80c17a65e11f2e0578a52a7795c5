/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Either from "@effect/data/Either";
import type * as Option from "@effect/data/Option";
import type { Predicate } from "@effect/data/Predicate";
import type * as Cause from "@effect/io/Cause";
import type * as Effect from "@effect/io/Effect";
import type * as FiberId from "@effect/io/Fiber/Id";
/**
 * An `Exit<E, A>` describes the result of a executing an `Effect` workflow.
 *
 * There are two possible values for an `Exit<E, A>`:
 *   - `Exit.Success` contain a success value of type `A`
 *   - `Exit.Failure` contains a failure `Cause` of type `E`
 *
 * @since 1.0.0
 * @category models
 */
export type Exit<E, A> = Failure<E> | Success<A>;
/**
 * Represents a failed `Effect` workflow containing the `Cause` of the failure
 * of type `E`.
 *
 * @since 1.0.0
 * @category models
 */
export interface Failure<E> extends Effect.Effect<never, E, never> {
    readonly _tag: "Failure";
    readonly cause: Cause.Cause<E>;
}
/**
 * Represents a successful `Effect` workflow and containing the returned value
 * of type `A`.
 *
 * @since 1.0.0
 * @category models
 */
export interface Success<A> extends Effect.Effect<never, never, A> {
    readonly _tag: "Success";
    readonly value: A;
}
/**
 * Returns `true` if the specified value is an `Exit`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isExit: (u: unknown) => u is Exit<unknown, unknown>;
/**
 * Returns `true` if the specified `Exit` is a `Failure`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isFailure: <E, A>(self: Exit<E, A>) => self is Failure<E>;
/**
 * Returns `true` if the specified `Exit` is a `Success`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isSuccess: <E, A>(self: Exit<E, A>) => self is Success<A>;
/**
 * Returns `true` if the specified exit is a `Failure` **and** the `Cause` of
 * the failure was due to interruption, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const isInterrupted: <E, A>(self: Exit<E, A>) => boolean;
/**
 * Maps the `Success` value of the specified exit to the provided constant
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const as: {
    <A2>(value: A2): <E, A>(self: Exit<E, A>) => Exit<E, A2>;
    <E, A, A2>(self: Exit<E, A>, value: A2): Exit<E, A2>;
};
/**
 * Maps the `Success` value of the specified exit to a void.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const asUnit: <E, A>(self: Exit<E, A>) => Exit<E, void>;
/**
 * Returns a `Some<Cause<E>>` if the specified exit is a `Failure`, `None`
 * otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const causeOption: <E, A>(self: Exit<E, A>) => Option.Option<Cause.Cause<E>>;
/**
 * Collects all of the specified exit values into a `Some<Exit<E, List<A>>>`. If
 * the provided iterable contains no elements, `None` will be returned.
 *
 * **Note**: `Exit.collectAll` combines `Cause` values sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const collectAll: <E, A>(exits: Iterable<Exit<E, A>>) => Option.Option<Exit<E, Chunk.Chunk<A>>>;
/**
 * Collects all of the specified exit values into a `Some<Exit<E, List<A>>>`. If
 * the provided iterable contains no elements, `None` will be returned.
 *
 * **Note**: `Exit.collectAll` combines `Cause` values in parallel.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const collectAllPar: <E, A>(exits: Iterable<Exit<E, A>>) => Option.Option<Exit<E, Chunk.Chunk<A>>>;
/**
 * Constructs a new `Exit.Failure` from the specified unrecoverable defect.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const die: (defect: unknown) => Exit<never, never>;
/**
 * Executes the predicate on the value of the specified exit if it is a
 * `Success`, otherwise returns `false`.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const exists: {
    <A>(predicate: Predicate<A>): <E>(self: Exit<E, A>) => boolean;
    <E, A>(self: Exit<E, A>, predicate: Predicate<A>): boolean;
};
/**
 * Constructs a new `Exit.Failure` from the specified recoverable error of type
 * `E`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fail: <E>(error: E) => Exit<E, never>;
/**
 * Constructs a new `Exit.Failure` from the specified `Cause` of type `E`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const failCause: <E>(cause: Cause.Cause<E>) => Exit<E, never>;
/**
 * @since 1.0.0
 * @category sequencing
 */
export declare const flatMap: {
    <A, E2, A2>(f: (a: A) => Exit<E2, A2>): <E>(self: Exit<E, A>) => Exit<E2 | E, A2>;
    <E, A, E2, A2>(self: Exit<E, A>, f: (a: A) => Exit<E2, A2>): Exit<E | E2, A2>;
};
/**
 * @since 1.0.0
 * @category sequencing
 */
export declare const flatMapEffect: {
    <E, A, R, E2, A2>(f: (a: A) => Effect.Effect<R, E2, Exit<E, A2>>): (self: Exit<E, A>) => Effect.Effect<R, E2, Exit<E, A2>>;
    <E, A, R, E2, A2>(self: Exit<E, A>, f: (a: A) => Effect.Effect<R, E2, Exit<E, A2>>): Effect.Effect<R, E2, Exit<E, A2>>;
};
/**
 * @since 1.0.0
 * @category sequencing
 */
export declare const flatten: <E, E1, A>(self: Exit<E, Exit<E1, A>>) => Exit<E | E1, A>;
/**
 * @since 1.0.0
 * @category traversing
 */
export declare const forEachEffect: {
    <A, R, E2, B>(f: (a: A) => Effect.Effect<R, E2, B>): <E>(self: Exit<E, A>) => Effect.Effect<R, never, Exit<E2 | E, B>>;
    <E, A, R, E2, B>(self: Exit<E, A>, f: (a: A) => Effect.Effect<R, E2, B>): Effect.Effect<R, never, Exit<E | E2, B>>;
};
/**
 * Converts an `Either<E, A>` into an `Exit<E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
export declare const fromEither: <E, A>(either: Either.Either<E, A>) => Exit<E, A>;
/**
 * Converts an `Option<A>` into an `Exit<void, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
export declare const fromOption: <A>(option: Option.Option<A>) => Exit<void, A>;
/**
 * Returns the `A` if specified exit is a `Success`, otherwise returns the
 * alternate `A` value computed from the specified function which receives the
 * `Cause<E>` of the exit `Failure`.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const getOrElse: {
    <E, A>(orElse: (cause: Cause.Cause<E>) => A): (self: Exit<E, A>) => A;
    <E, A>(self: Exit<E, A>, orElse: (cause: Cause.Cause<E>) => A): A;
};
/**
 * Constructs a new `Exit.Failure` from the specified `FiberId` indicating that
 * the `Fiber` running an `Effect` workflow was terminated due to interruption.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const interrupt: (fiberId: FiberId.FiberId) => Exit<never, never>;
/**
 * Maps over the `Success` value of the specified exit using the provided
 * function.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const map: {
    <A, B>(f: (a: A) => B): <E>(self: Exit<E, A>) => Exit<E, B>;
    <E, A, B>(self: Exit<E, A>, f: (a: A) => B): Exit<E, B>;
};
/**
 * Maps over the `Success` and `Failure` cases of the specified exit using the
 * provided functions.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const mapBoth: {
    <E, A, E2, A2>(onFailure: (e: E) => E2, onSuccess: (a: A) => A2): (self: Exit<E, A>) => Exit<E2, A2>;
    <E, A, E2, A2>(self: Exit<E, A>, onFailure: (e: E) => E2, onSuccess: (a: A) => A2): Exit<E2, A2>;
};
/**
 * Maps over the error contained in the `Failure` of the specified exit using
 * the provided function.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const mapError: {
    <E, E2>(f: (e: E) => E2): <A>(self: Exit<E, A>) => Exit<E2, A>;
    <E, A, E2>(self: Exit<E, A>, f: (e: E) => E2): Exit<E2, A>;
};
/**
 * Maps over the `Cause` contained in the `Failure` of the specified exit using
 * the provided function.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const mapErrorCause: {
    <E, E2>(f: (cause: Cause.Cause<E>) => Cause.Cause<E2>): <A>(self: Exit<E, A>) => Exit<E2, A>;
    <E, A, E2>(self: Exit<E, A>, f: (cause: Cause.Cause<E>) => Cause.Cause<E2>): Exit<E2, A>;
};
/**
 * @since 1.0.0
 * @category folding
 */
export declare const match: {
    <E, A, Z>(onFailure: (cause: Cause.Cause<E>) => Z, onSuccess: (a: A) => Z): (self: Exit<E, A>) => Z;
    <E, A, Z>(self: Exit<E, A>, onFailure: (cause: Cause.Cause<E>) => Z, onSuccess: (a: A) => Z): Z;
};
/**
 * @since 1.0.0
 * @category folding
 */
export declare const matchEffect: {
    <E, A, R, E2, A2, R2, E3, A3>(onFailure: (cause: Cause.Cause<E>) => Effect.Effect<R, E2, A2>, onSuccess: (a: A) => Effect.Effect<R2, E3, A3>): (self: Exit<E, A>) => Effect.Effect<R | R2, E3, A3>;
    <E, A, R, E2, A2, R2, E3, A3>(self: Exit<E, A>, onFailure: (cause: Cause.Cause<E>) => Effect.Effect<R, E2, A2>, onSuccess: (a: A) => Effect.Effect<R2, E3, A3>): Effect.Effect<R | R2, E2 | E3, A2 | A3>;
};
/**
 * Constructs a new `Exit.Success` containing the specified value of type `A`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const succeed: <A>(value: A) => Exit<never, A>;
/**
 * Removes any annotation from the failure cause
 *
 * @since 1.0.0
 * @category filtering
 */
export declare const unannotate: <E, A>(exit: Exit<E, A>) => Exit<E, A>;
/**
 * Represents an `Exit` which succeeds with `undefined`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const unit: (_: void) => Exit<never, void>;
/**
 * Sequentially zips the this result with the specified result or else returns
 * the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zip: {
    <E2, A2>(that: Exit<E2, A2>): <E, A>(self: Exit<E, A>) => Exit<E2 | E, readonly [A, A2]>;
    <E, A, E2, A2>(self: Exit<E, A>, that: Exit<E2, A2>): Exit<E | E2, readonly [A, A2]>;
};
/**
 * Sequentially zips the this result with the specified result discarding the
 * second element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipLeft: {
    <E2, A2>(that: Exit<E2, A2>): <E, A>(self: Exit<E, A>) => Exit<E2 | E, A>;
    <E, A, E2, A2>(self: Exit<E, A>, that: Exit<E2, A2>): Exit<E | E2, A>;
};
/**
 * Sequentially zips the this result with the specified result discarding the
 * first element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipRight: {
    <E2, A2>(that: Exit<E2, A2>): <E, A>(self: Exit<E, A>) => Exit<E2 | E, A2>;
    <E, A, E2, A2>(self: Exit<E, A>, that: Exit<E2, A2>): Exit<E | E2, A2>;
};
/**
 * Parallelly zips the this result with the specified result or else returns
 * the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipPar: {
    <E2, A2>(that: Exit<E2, A2>): <E, A>(self: Exit<E, A>) => Exit<E2 | E, readonly [A, A2]>;
    <E, A, E2, A2>(self: Exit<E, A>, that: Exit<E2, A2>): Exit<E | E2, readonly [A, A2]>;
};
/**
 * Parallelly zips the this result with the specified result discarding the
 * second element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipParLeft: {
    <E2, A2>(that: Exit<E2, A2>): <E, A>(self: Exit<E, A>) => Exit<E2 | E, A>;
    <E, A, E2, A2>(self: Exit<E, A>, that: Exit<E2, A2>): Exit<E | E2, A>;
};
/**
 * Parallelly zips the this result with the specified result discarding the
 * first element of the tuple or else returns the failed `Cause<E | E2>`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipParRight: {
    <E2, A2>(that: Exit<E2, A2>): <E, A>(self: Exit<E, A>) => Exit<E2 | E, A2>;
    <E, A, E2, A2>(self: Exit<E, A>, that: Exit<E2, A2>): Exit<E | E2, A2>;
};
/**
 * Zips this exit together with that exit using the specified combination
 * functions.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipWith: {
    <E, E2, A, B, C>(that: Exit<E2, B>, f: (a: A, b: B) => C, g: (cause: Cause.Cause<E>, cause2: Cause.Cause<E2>) => Cause.Cause<E | E2>): (self: Exit<E, A>) => Exit<E | E2, C>;
    <E, E2, A, B, C>(self: Exit<E, A>, that: Exit<E2, B>, f: (a: A, b: B) => C, g: (cause: Cause.Cause<E>, cause2: Cause.Cause<E2>) => Cause.Cause<E | E2>): Exit<E | E2, C>;
};
//# sourceMappingURL=Exit.d.ts.map