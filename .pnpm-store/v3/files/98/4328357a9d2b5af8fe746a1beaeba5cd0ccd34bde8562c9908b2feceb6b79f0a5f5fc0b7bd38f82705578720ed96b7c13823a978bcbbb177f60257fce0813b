/**
 * @since 1.0.0
 */
import type { Differ } from "@effect/data/Differ";
import type { Equal } from "@effect/data/Equal";
import type { HashMap } from "@effect/data/HashMap";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * A patch which describes updates to a map of keys and values.
 *
 * @since 1.0.0
 * @category models
 */
export interface HashMapPatch<Key, Value, Patch> extends Equal {
    readonly _id: TypeId;
    readonly _Key: (_: Key) => Key;
    readonly _Value: (_: Value) => Value;
    readonly _Patch: (_: Patch) => Patch;
}
/**
 * Constructs an empty map patch.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <Key, Value, Patch>() => HashMapPatch<Key, Value, Patch>;
/**
 * Constructs a map patch from a new and old map of keys and values and a
 * differ for the values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const diff: <Key, Value, Patch>(oldValue: HashMap<Key, Value>, newValue: HashMap<Key, Value>, differ: Differ<Value, Patch>) => HashMapPatch<Key, Value, Patch>;
/**
 * Combines two map patches to produce a new map patch that describes
 * applying their changes sequentially.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const combine: {
    <Key, Value, Patch>(that: HashMapPatch<Key, Value, Patch>): (self: HashMapPatch<Key, Value, Patch>) => HashMapPatch<Key, Value, Patch>;
    <Key, Value, Patch>(self: HashMapPatch<Key, Value, Patch>, that: HashMapPatch<Key, Value, Patch>): HashMapPatch<Key, Value, Patch>;
};
/**
 * Applies a map patch to a map of keys and values to produce a new map of
 * keys and values values which represents the original map of keys and
 * values updated with the changes described by this patch.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const patch: {
    <Key, Value, Patch>(oldValue: HashMap<Key, Value>, differ: Differ<Value, Patch>): (self: HashMapPatch<Key, Value, Patch>) => HashMap<Key, Value>;
    <Key, Value, Patch>(self: HashMapPatch<Key, Value, Patch>, oldValue: HashMap<Key, Value>, differ: Differ<Value, Patch>): HashMap<Key, Value>;
};
export {};
//# sourceMappingURL=HashMapPatch.d.ts.map