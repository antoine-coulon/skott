/**
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
/**
 * Composing two contravariant functors yields a Covariant functor.
 *
 * Returns a default binary `map` composition.
 *
 * @since 1.0.0
 */
export const contramapComposition = (F, G) => (self, f) => F.contramap(self, G.contramap(f));
/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export const imap = contramap => dual(3, (self, _, from) => contramap(self, from));
//# sourceMappingURL=Contravariant.mjs.map