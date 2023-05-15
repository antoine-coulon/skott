import * as Option from "@effect/data/Option";
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
export interface MutableHashMap<K, V> extends Iterable<readonly [K, V]> {
    readonly _id: TypeId;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <K = never, V = never>() => MutableHashMap<K, V>;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <Entries extends Array<readonly [any, any]>>(...entries: Entries) => MutableHashMap<Entries[number] extends readonly [infer K, any] ? K : never, Entries[number] extends readonly [any, infer V] ? V : never>;
/**
 * @since 1.0.0
 * @category conversions
 */
export declare const fromIterable: <K, V>(entries: Iterable<readonly [K, V]>) => MutableHashMap<K, V>;
/**
 * @since 1.0.0
 * @category elements
 */
export declare const get: {
    <K>(key: K): <V>(self: MutableHashMap<K, V>) => Option.Option<V>;
    <K, V>(self: MutableHashMap<K, V>, key: K): Option.Option<V>;
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const has: {
    <K>(key: K): <V>(self: MutableHashMap<K, V>) => boolean;
    <K, V>(self: MutableHashMap<K, V>, key: K): boolean;
};
/**
 * Updates the value of the specified key within the `MutableHashMap` if it exists.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const modify: {
    <K, V>(key: K, f: (v: V) => V): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>;
    <K, V>(self: MutableHashMap<K, V>, key: K, f: (v: V) => V): MutableHashMap<K, V>;
};
/**
 * Set or remove the specified key in the `MutableHashMap` using the specified
 * update function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const modifyAt: {
    <K, V>(key: K, f: (value: Option.Option<V>) => Option.Option<V>): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>;
    <K, V>(self: MutableHashMap<K, V>, key: K, f: (value: Option.Option<V>) => Option.Option<V>): MutableHashMap<K, V>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const remove: {
    <K>(key: K): <V>(self: MutableHashMap<K, V>) => MutableHashMap<K, V>;
    <K, V>(self: MutableHashMap<K, V>, key: K): MutableHashMap<K, V>;
};
/**
 * @since 1.0.0
 * @category mutations
 */
export declare const set: {
    <K, V>(key: K, value: V): (self: MutableHashMap<K, V>) => MutableHashMap<K, V>;
    <K, V>(self: MutableHashMap<K, V>, key: K, value: V): MutableHashMap<K, V>;
};
/**
 * @since 1.0.0
 * @category elements
 */
export declare const size: <K, V>(self: MutableHashMap<K, V>) => number;
export {};
//# sourceMappingURL=MutableHashMap.d.ts.map