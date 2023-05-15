/**
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
export const andThenDiscard = F => dual(2, (self, that) => tap(F)(self, () => that));
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap = F => dual(2, (self, f) => F.flatMap(self, a => F.map(f(a), () => a)));
/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = F => dual(3, (self, name, f) => F.flatMap(self, a => F.map(f(a), b => Object.assign({}, a, {
  [name]: b
}))));
//# sourceMappingURL=Chainable.mjs.map