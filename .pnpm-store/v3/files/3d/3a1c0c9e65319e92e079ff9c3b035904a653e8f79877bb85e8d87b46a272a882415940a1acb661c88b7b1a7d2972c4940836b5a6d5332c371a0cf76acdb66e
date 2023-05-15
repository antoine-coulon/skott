/**
 * @since 1.0.0
 */
import type { Equal } from "@effect/data/Equal";
import type { HashSet } from "@effect/data/HashSet";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * A patch which describes updates to a set of values.
 *
 * @since 1.0.0
 * @category models
 */
export interface HashSetPatch<Value> extends Equal {
    readonly _id: TypeId;
    readonly _Value: (_: Value) => Value;
}
/**
 * Constructs an empty set patch.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <Value>() => HashSetPatch<Value>;
/**
 * Constructs a set patch from a new set of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const diff: <Value>(oldValue: HashSet<Value>, newValue: HashSet<Value>) => HashSetPatch<Value>;
/**
 * Combines two set patches to produce a new set patch that describes
 * applying their changes sequentially.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const combine: {
    <Value>(that: HashSetPatch<Value>): (self: HashSetPatch<Value>) => HashSetPatch<Value>;
    <Value>(self: HashSetPatch<Value>, that: HashSetPatch<Value>): HashSetPatch<Value>;
};
/**
 * Applies a set patch to a set of values to produce a new set of values
 * which represents the original set of values updated with the changes
 * described by this patch.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const patch: {
    <Value>(oldValue: HashSet<Value>): (self: HashSetPatch<Value>) => HashSet<Value>;
    <Value>(self: HashSetPatch<Value>, oldValue: HashSet<Value>): HashSet<Value>;
};
export {};
//# sourceMappingURL=HashSetPatch.d.ts.map