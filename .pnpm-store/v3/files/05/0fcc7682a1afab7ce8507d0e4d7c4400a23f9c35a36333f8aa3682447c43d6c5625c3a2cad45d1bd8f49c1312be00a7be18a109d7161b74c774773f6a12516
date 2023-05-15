/**
 * @since 1.0.0
 */
import type { Differ } from "@effect/data/Differ";
import type { Either } from "@effect/data/Either";
import type { Equal } from "@effect/data/Equal";
declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * A patch which describes updates to either one value or another.
 *
 * @since 1.0.0
 * @category models
 */
export interface OrPatch<Value, Value2, Patch, Patch2> extends Equal {
    readonly _id: TypeId;
    readonly _Value: (_: Value) => Value;
    readonly _Value2: (_: Value2) => Value2;
    readonly _Patch: (_: Patch) => Patch;
    readonly _Patch2: (_: Patch2) => Patch2;
}
/**
 * Constructs an empty `OrPatch`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <Value, Value2, Patch, Patch2>() => OrPatch<Value, Value2, Patch, Patch2>;
/**
 * Constructs an `OrPatch` from a new and old value and a differ for the
 * values.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const diff: <Value, Value2, Patch, Patch2>(oldValue: Either<Value, Value2>, newValue: Either<Value, Value2>, left: Differ<Value, Patch>, right: Differ<Value2, Patch2>) => OrPatch<Value, Value2, Patch, Patch2>;
/**
 * Combines two or patches to produce a new or patch that describes applying
 * their changes sequentially.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const combine: {
    <Value, Value2, Patch, Patch2>(that: OrPatch<Value, Value2, Patch, Patch2>): (self: OrPatch<Value, Value2, Patch, Patch2>) => OrPatch<Value, Value2, Patch, Patch2>;
    <Value, Value2, Patch, Patch2>(self: OrPatch<Value, Value2, Patch, Patch2>, that: OrPatch<Value, Value2, Patch, Patch2>): OrPatch<Value, Value2, Patch, Patch2>;
};
/**
 * Applies an `OrPatch` to a value to produce a new value which represents
 * the original value updated with the changes described by this patch.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const patch: {
    <Value, Value2, Patch, Patch2>(oldValue: Either<Value, Value2>, left: Differ<Value, Patch>, right: Differ<Value2, Patch2>): (self: OrPatch<Value, Value2, Patch, Patch2>) => Either<Value, Value2>;
    <Value, Value2, Patch, Patch2>(self: OrPatch<Value, Value2, Patch, Patch2>, oldValue: Either<Value, Value2>, left: Differ<Value, Patch>, right: Differ<Value2, Patch2>): Either<Value, Value2>;
};
export {};
//# sourceMappingURL=OrPatch.d.ts.map