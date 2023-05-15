import * as Dual from "@effect/data/Function";
import * as D from "@effect/data/internal/Differ";
const TypeId = D.DifferTypeId;
/**
 * An empty patch that describes no changes.
 *
 * @since 1.0.0
 * @category patch
 */
export const empty = self => self.empty;
/**
 * An empty patch that describes no changes.
 *
 * @since 1.0.0
 * @category patch
 */
export const diff = /*#__PURE__*/Dual.dual(3, (self, oldValue, newValue) => self.diff(oldValue, newValue));
/**
 * Combines two patches to produce a new patch that describes the updates of
 * the first patch and then the updates of the second patch. The combine
 * operation should be associative. In addition, if the combine operation is
 * commutative then joining multiple fibers concurrently will result in
 * deterministic `FiberRef` values.
 *
 * @since 1.0.0
 * @category patch
 */
export const combine = /*#__PURE__*/Dual.dual(3, (self, first, second) => self.combine(first, second));
/**
 * Applies a patch to an old value to produce a new value that is equal to the
 * old value with the updates described by the patch.
 *
 * @since 1.0.0
 * @category patch
 */
export const patch = /*#__PURE__*/Dual.dual(3, (self, patch, oldValue) => self.patch(patch, oldValue));
/**
 * Constructs a new `Differ`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = D.make;
/**
 * Constructs a differ that knows how to diff `Env` values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const environment = D.environment;
/**
 * Constructs a differ that knows how to diff a `Chunk` of values given a
 * differ that knows how to diff the values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const chunk = D.chunk;
/**
 * Constructs a differ that knows how to diff a `HashMap` of keys and values given
 * a differ that knows how to diff the values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const hashMap = D.hashMap;
/**
 * Constructs a differ that knows how to diff a `HashSet` of values.
 *
 * @since 1.0.0
 * @category constructors
 */
export const hashSet = D.hashSet;
/**
 * Combines this differ and the specified differ to produce a differ that
 * knows how to diff the sum of their values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const orElseResult = D.orElseResult;
/**
 * Transforms the type of values that this differ knows how to differ using
 * the specified functions that map the new and old value types to each other.
 *
 * @since 1.0.0
 * @category mutations
 */
export const transform = D.transform;
/**
 * Constructs a differ that just diffs two values by returning a function that
 * sets the value to the new value. This differ does not support combining
 * multiple updates to the value compositionally and should only be used when
 * there is no compositional way to update them.
 *
 * @since 1.0.0
 * @category mutations
 */
export const update = D.update;
/**
 * A variant of `update` that allows specifying the function that will be used
 * to combine old values with new values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const updateWith = D.updateWith;
/**
 * Combines this differ and the specified differ to produce a new differ that
 * knows how to diff the product of their values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const zip = D.zip;
//# sourceMappingURL=Differ.mjs.map