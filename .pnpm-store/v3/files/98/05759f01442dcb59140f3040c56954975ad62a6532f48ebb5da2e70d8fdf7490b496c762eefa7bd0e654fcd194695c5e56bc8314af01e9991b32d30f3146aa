/**
 * @since 1.0.0
 */
import type { Equal } from "@effect/data/Equal";
import type { Predicate, Refinement } from "@effect/data/Predicate";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface HashSet<A> extends Iterable<A>, Equal {
    readonly _id: TypeId;
}
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isHashSet: {
    <A>(u: Iterable<A>): u is HashSet<A>;
    (u: unknown): u is HashSet<unknown>;
};
/**
 * Creates an empty `HashSet`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <A = never>() => HashSet<A>;
/**
 * Construct a new `HashSet` from a `Collection` of values
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromIterable: <A>(elements: Iterable<A>) => HashSet<A>;
/**
 * Construct a new `HashSet` from a variable number of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <As extends ReadonlyArray<any>>(...elements: As) => HashSet<As[number]>;
/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const has: {
    <A>(value: A): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, value: A): boolean;
};
/**
 * Returns `true` if any value in the `HashSet` matches the specified predicate.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const some: {
    <A>(f: Predicate<A>): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, f: Predicate<A>): boolean;
};
/**
 * Returns `true` only if all values in the `HashSet` match the specified
 * predicate.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const every: {
    <A>(f: Predicate<A>): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, f: Predicate<A>): boolean;
};
/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const isSubset: {
    <A>(that: HashSet<A>): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, that: HashSet<A>): boolean;
};
/**
 * Returns an `IterableIterator` of the values in the `HashSet`.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const values: <A>(self: HashSet<A>) => IterableIterator<A>;
/**
 * Calculates the number of values in the `HashSet`.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const size: <A>(self: HashSet<A>) => number;
/**
 * Marks the `HashSet` as mutable.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const beginMutation: <A>(self: HashSet<A>) => HashSet<A>;
/**
 * Marks the `HashSet` as immutable.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const endMutation: <A>(self: HashSet<A>) => HashSet<A>;
/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const mutate: {
    <A>(f: (set: HashSet<A>) => void): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, f: (set: HashSet<A>) => void): HashSet<A>;
};
/**
 * Adds a value to the `HashSet`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const add: {
    <A>(value: A): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, value: A): HashSet<A>;
};
/**
 * Removes a value from the `HashSet`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const remove: {
    <A>(value: A): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, value: A): HashSet<A>;
};
/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const difference: {
    <A>(that: Iterable<A>): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, that: Iterable<A>): HashSet<A>;
};
/**
 * Returns a `HashSet` of values which are present in both this set and that
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const intersection: {
    <A>(that: Iterable<A>): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, that: Iterable<A>): HashSet<A>;
};
/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const union: {
    <A>(that: Iterable<A>): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, that: Iterable<A>): HashSet<A>;
};
/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const toggle: {
    <A>(value: A): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, value: A): HashSet<A>;
};
/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const map: {
    <A, B>(f: (a: A) => B): (self: HashSet<A>) => HashSet<B>;
    <A, B>(self: HashSet<A>, f: (a: A) => B): HashSet<B>;
};
/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @since 1.0.0
 * @category sequencing
 */
export declare const flatMap: {
    <A, B>(f: (a: A) => Iterable<B>): (self: HashSet<A>) => HashSet<B>;
    <A, B>(self: HashSet<A>, f: (a: A) => Iterable<B>): HashSet<B>;
};
/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const forEach: {
    <A>(f: (value: A) => void): (self: HashSet<A>) => void;
    <A>(self: HashSet<A>, f: (value: A) => void): void;
};
/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @since 1.0.0
 * @category folding
 */
export declare const reduce: {
    <A, Z>(zero: Z, f: (accumulator: Z, value: A) => Z): (self: HashSet<A>) => Z;
    <A, Z>(self: HashSet<A>, zero: Z, f: (accumulator: Z, value: A) => Z): Z;
};
/**
 * Filters values out of a `HashSet` using the specified predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export declare const filter: {
    <A, B extends A>(f: Refinement<A, B>): (self: HashSet<A>) => HashSet<B>;
    <A>(f: Predicate<A>): (self: HashSet<A>) => HashSet<A>;
    <A, B extends A>(self: HashSet<A>, f: Refinement<A, B>): HashSet<B>;
    <A>(self: HashSet<A>, f: Predicate<A>): HashSet<A>;
};
/**
 * Partition the values of a `HashSet` using the specified predicate.
 *
 * If a value matches the predicate, it will be placed into the `HashSet` on the
 * right side of the resulting `Tuple`, otherwise the value will be placed into
 * the left side.
 *
 * @since 1.0.0
 * @category partitioning
 */
export declare const partition: {
    <A, B extends A>(f: Refinement<A, B>): (self: HashSet<A>) => readonly [HashSet<A>, HashSet<B>];
    <A>(f: Predicate<A>): (self: HashSet<A>) => readonly [HashSet<A>, HashSet<A>];
    <A, B extends A>(self: HashSet<A>, f: Refinement<A, B>): readonly [HashSet<A>, HashSet<B>];
    <A>(self: HashSet<A>, f: Predicate<A>): readonly [HashSet<A>, HashSet<A>];
};
export {};
//# sourceMappingURL=HashSet.d.ts.map