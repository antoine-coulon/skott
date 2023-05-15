/**
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
/**
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
export const mapComposition = (F, G) => (self, f) => F.map(self, G.map(f));
/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export const imap = map => dual(3, (self, to, _) => map(self, to));
/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = F => dual(2, (a, self) => F.map(self, f => f(a)));
/**
 * @category mapping
 * @since 1.0.0
 */
export const as = F => dual(2, (self, b) => F.map(self, () => b));
/**
 * @category mapping
 * @since 1.0.0
 */
export const asUnit = F => as(F)(undefined);
const let_ = F => dual(3, (self, name, f) => F.map(self, a => Object.assign({}, a, {
  [name]: f(a)
})));
export {
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
//# sourceMappingURL=Covariant.mjs.map