/**
 * @since 1.0.0
 */
import { dual, identity } from "@effect/data/Function";
/**
 * Returns a default ternary `bimap` composition.
 *
 * @since 1.0.0
 */
export const bimapComposition = (CovariantF, BicovariantG) => (self, f, g) => CovariantF.map(self, BicovariantG.bimap(f, g));
/**
 * Returns a default `mapLeft` implementation.
 *
 * @since 1.0.0
 */
export const mapLeft = F => dual(2, (self, f) => F.bimap(self, f, identity));
/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export const map = F => dual(2, (self, f) => F.bimap(self, identity, f));
//# sourceMappingURL=Bicovariant.mjs.map