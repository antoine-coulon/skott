/**
 * @since 1.0.0
 */
import { dual, identity } from "@effect/data/Function";
/**
 * Returns a default binary `traverse` composition.
 *
 * @since 1.0.0
 */
export const traverseComposition = (T, G) => F => (self, f) => T.traverse(F)(self, G.traverse(F)(f));
/**
 * Returns a default `sequence` implementation.
 *
 * @since 1.0.0
 */
export const sequence = T => F => self => T.traverse(F)(self, identity);
/**
 * Given a function which returns a `F` effect, thread this effect
 * through the running of this function on all the values in `T`,
 * returning an `T<A>` in a `F` context, ignoring the values
 * returned by the provided function.
 *
 * @since 1.0.0
 */
export const traverseTap = T => F => dual(2, (self, f) => T.traverse(F)(self, a => F.map(f(a), () => a)));
//# sourceMappingURL=Traversable.mjs.map