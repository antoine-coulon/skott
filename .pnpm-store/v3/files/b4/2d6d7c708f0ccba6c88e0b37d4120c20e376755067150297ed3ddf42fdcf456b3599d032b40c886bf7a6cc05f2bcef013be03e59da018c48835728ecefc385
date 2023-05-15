import { dual, identity } from "@effect/data/Function";
import * as either from "@effect/data/internal/Either";
import * as option from "@effect/data/internal/Option";
/**
 * Returns a default binary `partitionMap` composition.
 *
 * @since 1.0.0
 */
export const partitionMapComposition = (F, G) => (self, f) => {
  const filterMap = filterMapComposition(F, G);
  return [filterMap(self, a => either.getLeft(f(a))), filterMap(self, a => either.getRight(f(a)))];
};
/**
 * Returns a default binary `filterMap` composition.
 *
 * @since 1.0.0
 */
export const filterMapComposition = (F, G) => (self, f) => F.map(self, G.filterMap(f));
/**
 * @since 1.0.0
 */
export const compact = F => F.filterMap(identity);
/**
 * @since 1.0.0
 */
export const separate = F => F.partitionMap(identity);
/**
 * @since 1.0.0
 */
export const filter = Filterable => dual(2, (self, predicate) => Filterable.filterMap(self, b => predicate(b) ? option.some(b) : option.none));
/**
 * @since 1.0.0
 */
export const partition = F => dual(2, (self, predicate) => F.partitionMap(self, b => predicate(b) ? either.right(b) : either.left(b)));
//# sourceMappingURL=Filterable.mjs.map