/**
 * @since 1.0.0
 */
/**
 * This file is ported from
 *
 * Scala (https://www.scala-lang.org)
 *
 * Copyright EPFL and Lightbend, Inc.
 *
 * Licensed under Apache License 2.0
 * (http://www.apache.org/licenses/LICENSE-2.0).
 */
import * as Chunk from "@effect/data/Chunk";
import * as Either from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import * as Option from "@effect/data/Option";
import type { Predicate, Refinement } from "@effect/data/Predicate";
/**
 * @since 1.0.0
 * @category symbol
 */
export declare const ListTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type ListTypeId = typeof ListTypeId;
/**
 * Represents an immutable linked list of elements of type `A`.
 *
 * A `List` is optimal for last-in-first-out (LIFO), stack-like access patterns.
 * If you need another access pattern, for example, random access or FIFO,
 * consider using a collection more suited for that other than `List`.
 *
 * @since 1.0.0
 * @category models
 */
export type List<A> = Cons<A> | Nil<A>;
/**
 * @since 1.0.0
 * @category models
 */
export interface Cons<A> extends List.Variance<A>, Iterable<A>, Equal.Equal {
    readonly _tag: "Cons";
    readonly head: A;
    readonly tail: List<A>;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface Nil<A> extends List.Variance<A>, Iterable<A>, Equal.Equal {
    readonly _tag: "Nil";
}
type ConsNS<A> = Cons<A>;
type NilNS<A> = Nil<A>;
/**
 * @since 1.0.0
 */
export declare namespace List {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<A> {
        readonly [ListTypeId]: {
            readonly _A: (_: never) => A;
        };
    }
    /**
     * @since 1.0.0
     * @category models
     */
    type Cons<A> = ConsNS<A>;
    /**
     * @since 1.0.0
     * @category models
     */
    type Nil<A> = NilNS<A>;
}
/**
 * Returns `true` if the specified value is a `List`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isList: {
    <A>(u: Iterable<A>): u is List<A>;
    (u: unknown): u is List<unknown>;
};
/**
 * Returns `true` if the specified value is a `List.Nil<A>`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isNil: <A>(self: List<A>) => self is Nil<A>;
/**
 * Returns `true` if the specified value is a `List.Cons<A>`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export declare const isCons: <A>(self: List<A>) => self is Cons<A>;
/**
 * Returns the number of elements contained in the specified `List`
 *
 * @since 1.0.0
 * @category getters
 */
export declare const length: <A>(self: List<A>) => number;
/**
 * Returns `true` if the two lists are equal according to the provided function,
 * `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const equalsWith: {
    <A, B>(that: List<B>, f: (a: A, b: B) => boolean): (self: List<A>) => boolean;
    <A, B>(self: List<A>, that: List<B>, f: (a: A, b: B) => boolean): boolean;
};
/**
 * Constructs a new `List.Nil<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const nil: <A = never>() => List.Nil<A>;
/**
 * Constructs a new `List.Cons<A>` from the specified `head` and `tail` values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const cons: <A>(head: A, tail: List<A>) => List.Cons<A>;
/**
 * Constructs a new empty `List<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <A = never>() => List<A>;
/**
 * Constructs a new `List<A>` from the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const of: <A>(value: A) => List<A>;
/**
 * Constructs a new `List<A>` from the specified `Iterable<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromIterable: <A>(prefix: Iterable<A>) => List<A>;
/**
 * Constructs a new `List<A>` from the specified values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <Elements extends readonly [any, ...any[]]>(...elements: Elements) => List<Elements[number]>;
/**
 * Removes all `None` values from the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const compact: <A>(self: Iterable<Option.Option<A>>) => List<A>;
/**
 * Concatentates the specified lists together.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const concat: {
    <B>(that: List<B>): <A>(self: List<A>) => List<A | B>;
    <A, B>(self: List<A>, that: List<B>): List<A | B>;
};
/**
 * Drops the first `n` elements from the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const drop: {
    (n: number): <A>(self: List<A>) => List<A>;
    <A>(self: List<A>, n: number): List<A>;
};
/**
 * Returns `true` if all elements of the specified list satisfy the specified
 * predicate, `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const every: {
    <A>(predicate: Predicate<A>): (self: List<A>) => boolean;
    <A>(self: List<A>, predicate: Predicate<A>): boolean;
};
/**
 * Filters a list using the specified predicate.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: List<A>) => List<B>;
    <A>(predicate: Predicate<A>): (self: List<A>) => List<A>;
    <A, B extends A>(self: List<A>, refinement: Refinement<A, B>): List<B>;
    <A>(self: List<A>, predicate: Predicate<A>): List<A>;
};
/**
 * Filters and maps a list using the specified partial function. The resulting
 * list may be smaller than the input list due to the possibility of the partial
 * function not being defined for some elements.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const filterMap: {
    <A, B>(pf: (a: A) => Option.Option<B>): (self: Iterable<A>) => List<B>;
    <A, B>(self: Iterable<A>, pf: (a: A) => Option.Option<B>): List<B>;
};
/**
 * Returns the first element of the specified list that satisfies the specified
 * predicate, or `None` if no such element exists.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const findFirst: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: List<A>) => Option.Option<B>;
    <A>(predicate: Predicate<A>): (self: List<A>) => Option.Option<A>;
    <A, B extends A>(self: List<A>, refinement: Refinement<A, B>): Option.Option<B>;
    <A>(self: List<A>, predicate: Predicate<A>): Option.Option<A>;
};
/**
 * Flat maps a list using the specified function.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const flatMap: {
    <A, B>(f: (a: A) => List<B>): (self: List<A>) => List<B>;
    <A, B>(self: List<A>, f: (a: A) => List<B>): List<B>;
};
/**
 * Applies the specified function to each element of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const forEach: {
    <A, B>(f: (a: A) => B): (self: List<A>) => void;
    <A, B>(self: List<A>, f: (a: A) => B): void;
};
/**
 * Returns the first element of the specified list, or `None` if the list is
 * empty.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const head: <A>(self: List<A>) => Option.Option<A>;
/**
 * Returns the last element of the specified list, or `None` if the list is
 * empty.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const last: <A>(self: List<A>) => Option.Option<A>;
/**
 * Applies the specified mapping function to each element of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const map: {
    <A, B>(f: (a: A) => B): (self: List<A>) => List<B>;
    <A, B>(self: List<A>, f: (a: A) => B): List<B>;
};
/**
 * Partition a list into two lists, where the first list contains all elements
 * that did not satisfy the specified predicate, and the second list contains
 * all elements that did satisfy the specified predicate.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const partition: {
    <A>(predicate: Predicate<A>): (self: List<A>) => readonly [List<A>, List<A>];
    <A>(self: List<A>, predicate: Predicate<A>): readonly [List<A>, List<A>];
};
/**
 * Partition a list into two lists, where the first list contains all elements
 * for which the specified function returned a `Left`, and the second list
 * contains all elements for which the specified function returned a `Right`.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const partitionMap: {
    <A, B, C>(f: (a: A) => Either.Either<B, C>): (self: List<A>) => readonly [List<B>, List<C>];
    <A, B, C>(self: List<A>, f: (a: A) => Either.Either<B, C>): readonly [List<B>, List<C>];
};
/**
 * Prepends the specified element to the beginning of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const prepend: {
    <B>(element: B): <A>(self: List<A>) => Cons<A | B>;
    <A, B>(self: List<A>, element: B): Cons<A | B>;
};
/**
 * Prepends the specified prefix list to the beginning of the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const prependAll: {
    <B>(prefix: List<B>): <A>(self: List<A>) => List<A | B>;
    <A, B>(self: List<A>, prefix: List<B>): List<A | B>;
};
/**
 * Prepends the specified prefix list (in reverse order) to the beginning of the
 * specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const prependAllReversed: {
    <B>(prefix: List<B>): <A>(self: List<A>) => List<A | B>;
    <A, B>(self: List<A>, prefix: List<B>): List<A | B>;
};
/**
 * Folds over the elements of the list using the specified function, using the
 * specified initial value.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const reduce: {
    <Z, A>(zero: Z, f: (b: Z, a: A) => Z): (self: List<A>) => Z;
    <A, Z>(self: List<A>, zero: Z, f: (b: Z, a: A) => Z): Z;
};
/**
 * Folds over the elements of the list using the specified function, beginning
 * with the last element of the list, using the specified initial value.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const reduceRight: {
    <Z, A>(zero: Z, f: (accumulator: Z, value: A) => Z): (self: List<A>) => Z;
    <Z, A>(self: List<A>, zero: Z, f: (accumulator: Z, value: A) => Z): Z;
};
/**
 * Returns a new list with the elements of the specified list in reverse order.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const reverse: <A>(self: List<A>) => List<A>;
/**
 * Returns `true` if any element of the specified list satisfies the specified
 * predicate, `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const some: {
    <A>(predicate: Predicate<A>): (self: List<A>) => boolean;
    <A>(self: List<A>, predicate: Predicate<A>): boolean;
};
/**
 * Splits the specified list into two lists at the specified index.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const splitAt: {
    (n: number): <A>(self: List<A>) => readonly [List<A>, List<A>];
    <A>(self: List<A>, n: number): readonly [List<A>, List<A>];
};
/**
 * Returns the tail of the specified list, or `None` if the list is empty.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const tail: <A>(self: List<A>) => Option.Option<List<A>>;
/**
 * Takes the specified number of elements from the beginning of the specified
 * list.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const take: {
    (n: number): <A>(self: List<A>) => List<A>;
    <A>(self: List<A>, n: number): List<A>;
};
/**
 * Converts the specified list to a `Chunk`.
 *
 * @since 1.0.0
 * @category conversions
 */
export declare const toChunk: <A>(self: List<A>) => Chunk.Chunk<A>;
/**
 * Converts the specified list to a `ReadonlyArray`.
 *
 * @since 1.0.0
 * @category conversions
 */
export declare const toReadonlyArray: <A>(self: List<A>) => readonly A[];
/**
 * Unsafely returns the first element of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeHead: <A>(self: List<A>) => A;
/**
 * Unsafely returns the last element of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeLast: <A>(self: List<A>) => A;
/**
 * Unsafely returns the tail of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
export declare const unsafeTail: <A>(self: List<A>) => List<A>;
export {};
//# sourceMappingURL=List.d.ts.map