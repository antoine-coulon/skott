import * as E from "@effect/data/Either";
import { dual } from "@effect/data/Function";
import * as O from "@effect/data/Option";
import * as filterable from "@effect/data/typeclass/Filterable";
/**
 * Returns a default binary `traversePartitionMap` implementation.
 *
 * @since 1.0.0
 */
export const traversePartitionMap = T => F => (self, f) => F.map(T.traverse(F)(self, f), filterable.separate(T));
/**
 * Returns a default binary `traverseFilterMap` implementation.
 *
 * @since 1.0.0
 */
export const traverseFilterMap = T => F => (self, f) => F.map(T.traverse(F)(self, f), filterable.compact(T));
/**
 * @since 1.0.0
 */
export const traverseFilter = T => F => dual(2, (self, predicate) => T.traverseFilterMap(F)(self, b => F.map(predicate(b), keep => keep ? O.some(b) : O.none())));
/**
 * @since 1.0.0
 */
export const traversePartition = T => F => dual(2, (self, predicate) => T.traversePartitionMap(F)(self, b => F.map(predicate(b), keep => keep ? E.right(b) : E.left(b))));
//# sourceMappingURL=TraversableFilterable.mjs.map