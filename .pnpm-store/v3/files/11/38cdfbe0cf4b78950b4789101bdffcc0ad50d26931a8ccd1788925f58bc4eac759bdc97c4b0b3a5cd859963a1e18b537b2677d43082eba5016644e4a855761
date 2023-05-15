/**
 * @since 1.0.0
 */
import { dual, identity } from "@effect/data/Function";
/**
 * @since 1.0.0
 */
export const flatten = F => self => F.flatMap(self, identity);
/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @since 1.0.0
 */
export const andThen = F => dual(2, (self, that) => F.flatMap(self, () => that));
/**
 * @since 1.0.0
 */
export const composeK = F => dual(2, (afb, bfc) => a => F.flatMap(afb(a), bfc));
//# sourceMappingURL=FlatMap.mjs.map