/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal";
import type { Predicate, Refinement } from "@effect/data/Predicate";
import type { Order } from "@effect/data/typeclass/Order";
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
export interface SortedSet<A> extends Iterable<A>, Equal.Equal {
    readonly _id: TypeId;
}
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isSortedSet: {
    <A>(u: Iterable<A>): u is SortedSet<A>;
    (u: unknown): u is SortedSet<unknown>;
};
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <A>(O: Order<A>) => SortedSet<A>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const fromIterable: <K>(ord: Order<K>) => (iterable: Iterable<K>) => SortedSet<K>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <K>(ord: Order<K>) => <Entries extends readonly K[]>(...entries: Entries) => SortedSet<Entries[number]>;
/**
 * @since 1.0.0
 * @category elements
 */
export declare const add: {
    <A>(value: A): (self: SortedSet<A>) => SortedSet<A>;
    <A>(self: SortedSet<A>, value: A): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const difference: {
    <A, B extends A>(that: Iterable<B>): (self: SortedSet<A>) => SortedSet<A>;
    <A, B extends A>(self: SortedSet<A>, that: Iterable<B>): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const every: {
    <A>(predicate: Predicate<A>): (self: SortedSet<A>) => boolean;
    <A>(self: SortedSet<A>, predicate: Predicate<A>): boolean;
};
/**
 * @since 1.0.0
 * @category filtering
 */
export declare const filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: SortedSet<A>) => SortedSet<B>;
    <A>(predicate: Predicate<A>): (self: SortedSet<A>) => SortedSet<A>;
    <A, B extends A>(self: SortedSet<A>, refinement: Refinement<A, B>): SortedSet<B>;
    <A>(self: SortedSet<A>, predicate: Predicate<A>): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category sequencing
 */
export declare const flatMap: {
    <B, A>(O: Order<B>, f: (a: A) => Iterable<B>): (self: SortedSet<A>) => SortedSet<B>;
    <A, B>(self: SortedSet<A>, O: Order<B>, f: (a: A) => Iterable<B>): SortedSet<B>;
};
/**
 * @since 1.0.0
 * @category traversing
 */
export declare const forEach: {
    <A>(f: (a: A) => void): (self: SortedSet<A>) => void;
    <A>(self: SortedSet<A>, f: (a: A) => void): void;
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const has: {
    <A>(value: A): (self: SortedSet<A>) => boolean;
    <A>(self: SortedSet<A>, value: A): boolean;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const intersection: {
    <A>(that: Iterable<A>): (self: SortedSet<A>) => SortedSet<A>;
    <A>(self: SortedSet<A>, that: Iterable<A>): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const isSubset: {
    <A>(that: SortedSet<A>): (self: SortedSet<A>) => boolean;
    <A>(self: SortedSet<A>, that: SortedSet<A>): boolean;
};
/**
 * @since 1.0.0
 * @category mapping
 */
export declare const map: {
    <B, A>(O: Order<B>, f: (a: A) => B): (self: SortedSet<A>) => SortedSet<B>;
    <B, A>(self: SortedSet<A>, O: Order<B>, f: (a: A) => B): SortedSet<B>;
};
/**
 * @since 1.0.0
 * @category filtering
 */
export declare const partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (self: SortedSet<A>) => readonly [SortedSet<A>, SortedSet<B>];
    <A>(predicate: Predicate<A>): (self: SortedSet<A>) => readonly [SortedSet<A>, SortedSet<A>];
    <A, B extends A>(self: SortedSet<A>, refinement: Refinement<A, B>): readonly [SortedSet<A>, SortedSet<B>];
    <A>(self: SortedSet<A>, predicate: Predicate<A>): readonly [SortedSet<A>, SortedSet<A>];
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const remove: {
    <A>(value: A): (self: SortedSet<A>) => SortedSet<A>;
    <A>(self: SortedSet<A>, value: A): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category getters
 */
export declare const size: <A>(self: SortedSet<A>) => number;
/**
 * @since 1.0.0
 * @category elements
 */
export declare const some: {
    <A>(predicate: Predicate<A>): (self: SortedSet<A>) => boolean;
    <A>(self: SortedSet<A>, predicate: Predicate<A>): boolean;
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const toggle: {
    <A>(value: A): (self: SortedSet<A>) => SortedSet<A>;
    <A>(self: SortedSet<A>, value: A): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const union: {
    <A>(that: Iterable<A>): (self: SortedSet<A>) => SortedSet<A>;
    <A>(self: SortedSet<A>, that: Iterable<A>): SortedSet<A>;
};
/**
 * @since 1.0.0
 * @category getters
 */
export declare const values: <A>(self: SortedSet<A>) => IterableIterator<A>;
export {};
//# sourceMappingURL=SortedSet.d.ts.map