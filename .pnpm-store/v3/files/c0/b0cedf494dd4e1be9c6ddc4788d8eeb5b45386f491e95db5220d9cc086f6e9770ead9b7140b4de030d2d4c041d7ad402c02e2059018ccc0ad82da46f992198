/**
 * @since 1.0.0
 */
import { dual, identity } from "@effect/data/Function";
/**
 * Returns a default ternary `reduce` composition.
 *
 * @since 1.0.0
 */
export const reduceComposition = (F, G) => (self, b, f) => F.reduce(self, b, (b, ga) => G.reduce(ga, b, f));
/**
 * @since 1.0.0
 */
export const toArrayMap = F => dual(2, (self, f) => F.reduce(self, [], (out, a) => [...out, f(a)]));
/**
 * @since 1.0.0
 */
export const toArray = F => toArrayMap(F)(identity);
/**
 * @since 1.0.0
 */
export const combineMap = F => M => dual(2, (self, f) => F.reduce(self, M.empty, (m, a) => M.combine(m, f(a))));
/**
 * @since 1.0.0
 */
export const reduceKind = F => G => dual(3, (self, b, f) => F.reduce(self, G.of(b), (gb, a) => G.flatMap(gb, b => f(b, a))));
/**
 * @since 1.0.0
 */
export const coproductMapKind = F => G => dual(2, (self, f) => F.reduce(self, G.zero(), (gb, a) => G.coproduct(gb, f(a))));
//# sourceMappingURL=Foldable.mjs.map