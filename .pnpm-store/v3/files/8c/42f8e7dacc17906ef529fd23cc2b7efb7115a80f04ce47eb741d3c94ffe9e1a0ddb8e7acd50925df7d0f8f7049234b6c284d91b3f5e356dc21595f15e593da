/**
 * @since 1.0.0
 */
import type { Chunk } from "@effect/data/Chunk";
import type { Equal } from "@effect/data/Equal";
import type { Option } from "@effect/data/Option";
import type { Order } from "@effect/data/typeclass/Order";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * @since 1.0.0
 * @category constants
 */
export declare const Direction: {
    readonly Forward: RedBlackTree.Direction;
    readonly Backward: RedBlackTree.Direction;
};
/**
 * A Red-Black Tree.
 *
 * @since 1.0.0
 * @category models
 */
export interface RedBlackTree<Key, Value> extends Iterable<readonly [Key, Value]>, Equal {
    readonly _id: TypeId;
}
/**
 * @since 1.0.0
 */
export declare namespace RedBlackTree {
    type Direction = number & {
        readonly Direction: unique symbol;
    };
}
/**
 * @since 1.0.0
 * @category refinements
 */
export declare const isRedBlackTree: {
    <K, V>(u: Iterable<readonly [K, V]>): u is RedBlackTree<K, V>;
    (u: unknown): u is RedBlackTree<unknown, unknown>;
};
/**
 * Creates an empty `RedBlackTree`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <K, V = never>(ord: Order<K>) => RedBlackTree<K, V>;
/**
 * Constructs a new tree from an iterable of key-value pairs.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromIterable: <K, V>(ord: Order<K>) => (entries: Iterable<readonly [K, V]>) => RedBlackTree<K, V>;
/**
 * Constructs a new `RedBlackTree` from the specified entries.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <K>(ord: Order<K>) => <Entries extends Array<readonly [K, any]>>(...entries: Entries) => RedBlackTree<K, Entries[number] extends readonly [any, infer V] ? V : never>;
/**
 * Returns an iterator that points to the element at the specified index of the
 * tree.
 *
 * **Note**: The iterator will run through elements in order.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const at: {
    (index: number): <K, V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, index: number): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that points to the element at the specified index of the
 * tree.
 *
 * **Note**: The iterator will run through elements in reverse order.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const atReversed: {
    (index: number): <K, V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, index: number): Iterable<readonly [K, V]>;
};
/**
 * Finds all values in the tree associated with the specified key.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const find: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Chunk<V>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Chunk<V>;
};
/**
 * Finds the value in the tree associated with the specified key, if it exists.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const findFirst: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Option<V>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Option<V>;
};
/**
 * Returns the first entry in the tree, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const first: <K, V>(self: RedBlackTree<K, V>) => Option<readonly [K, V]>;
/**
 * Returns the element at the specified index within the tree or `None` if the
 * specified index does not exist.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const getAt: {
    (index: number): <K, V>(self: RedBlackTree<K, V>) => Option<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, index: number): Option<readonly [K, V]>;
};
/**
 * Gets the `Order<K>` that the `RedBlackTree<K, V>` is using.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const getOrder: <K, V>(self: RedBlackTree<K, V>) => Order<K>;
/**
 * Returns an iterator that traverse entries in order with keys greater than the
 * specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const greaterThan: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that traverse entries in reverse order with keys greater
 * than the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const greaterThanReversed: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that traverse entries in order with keys greater than or
 * equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const greaterThanEqual: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that traverse entries in reverse order with keys greater
 * than or equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const greaterThanEqualReversed: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Finds the item with key, if it exists.
 *
 * @since 1.0.0
 * @category elements
 */
export declare const has: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => boolean;
    <K, V>(self: RedBlackTree<K, V>, key: K): boolean;
};
/**
 * Insert a new item into the tree.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const insert: {
    <K, V>(key: K, value: V): (self: RedBlackTree<K, V>) => RedBlackTree<K, V>;
    <K, V>(self: RedBlackTree<K, V>, key: K, value: V): RedBlackTree<K, V>;
};
/**
 * Get all the keys present in the tree in order.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const keys: <K, V>(self: RedBlackTree<K, V>) => IterableIterator<K>;
/**
 * Get all the keys present in the tree in reverse order.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const keysReversed: <K, V>(self: RedBlackTree<K, V>) => IterableIterator<K>;
/**
 * Returns the last entry in the tree, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const last: <K, V>(self: RedBlackTree<K, V>) => Option<readonly [K, V]>;
/**
 * Returns an iterator that traverse entries in order with keys less than the
 * specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const lessThan: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that traverse entries in reverse order with keys less
 * than the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const lessThanReversed: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that traverse entries in order with keys less than or
 * equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const lessThanEqual: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Returns an iterator that traverse entries in reverse order with keys less
 * than or equal to the specified key.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const lessThanEqualReversed: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
    <K, V>(self: RedBlackTree<K, V>, key: K): Iterable<readonly [K, V]>;
};
/**
 * Execute the specified function for each node of the tree, in order.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const forEach: {
    <K, V>(f: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
    <K, V>(self: RedBlackTree<K, V>, f: (key: K, value: V) => void): void;
};
/**
 * Visit each node of the tree in order with key greater then or equal to max.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const forEachGreaterThanEqual: {
    <K, V>(min: K, f: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
    <K, V>(self: RedBlackTree<K, V>, min: K, f: (key: K, value: V) => void): void;
};
/**
 * Visit each node of the tree in order with key lower then max.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const forEachLessThan: {
    <K, V>(max: K, f: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
    <K, V>(self: RedBlackTree<K, V>, max: K, f: (key: K, value: V) => void): void;
};
/**
 * Visit each node of the tree in order with key lower than max and greater
 * than or equal to min.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const forEachBetween: {
    <K, V>(min: K, max: K, f: (key: K, value: V) => void): (self: RedBlackTree<K, V>) => void;
    <K, V>(self: RedBlackTree<K, V>, min: K, max: K, f: (key: K, value: V) => void): void;
};
/**
 * Reduce a state over the map entries.
 *
 * @since 1.0.0
 * @category folding
 */
export declare const reduce: {
    <Z, V>(zero: Z, f: (accumulator: Z, value: V) => Z): <K>(self: RedBlackTree<K, V>) => Z;
    <Z, K, V>(self: RedBlackTree<K, V>, zero: Z, f: (accumulator: Z, value: V) => Z): Z;
};
/**
 * Reduce a state over the entries of the tree.
 *
 * @since 1.0.0
 * @category folding
 */
export declare const reduceWithIndex: {
    <Z, V, K>(zero: Z, f: (accumulator: Z, value: V, key: K) => Z): (self: RedBlackTree<K, V>) => Z;
    <Z, V, K>(self: RedBlackTree<K, V>, zero: Z, f: (accumulator: Z, value: V, key: K) => Z): Z;
};
/**
 * Removes the entry with the specified key, if it exists.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const removeFirst: {
    <K>(key: K): <V>(self: RedBlackTree<K, V>) => RedBlackTree<K, V>;
    <K, V>(self: RedBlackTree<K, V>, key: K): RedBlackTree<K, V>;
};
/**
 * Traverse the tree in reverse order.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const reversed: <K, V>(self: RedBlackTree<K, V>) => Iterable<readonly [K, V]>;
/**
 * Returns the size of the tree.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const size: <K, V>(self: RedBlackTree<K, V>) => number;
/**
 * Get all values present in the tree in order.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const values: <K, V>(self: RedBlackTree<K, V>) => IterableIterator<V>;
/**
 * Get all values present in the tree in reverse order.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const valuesReversed: <K, V>(self: RedBlackTree<K, V>) => IterableIterator<V>;
export {};
//# sourceMappingURL=RedBlackTree.d.ts.map