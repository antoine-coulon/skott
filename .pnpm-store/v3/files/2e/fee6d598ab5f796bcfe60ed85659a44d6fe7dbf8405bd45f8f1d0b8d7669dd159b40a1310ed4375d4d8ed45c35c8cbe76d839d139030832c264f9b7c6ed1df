/**
 * The `Invariant` typeclass is a higher-order abstraction over types that allow mapping the contents of a type in both directions.
 * It is similar to the `Covariant` typeclass but provides an `imap` opration, which allows transforming a value in both directions.
 * This typeclass is useful when dealing with data types that can be converted to and from some other types.
 * The `imap` operation provides a way to convert such data types to other types that they can interact with while preserving their invariants.
 *
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function";
/**
 * Returns a default ternary `imap` composition.
 *
 * @since 1.0.0
 */
export const imapComposition = (F, G) => (self, to, from) => F.imap(self, G.imap(to, from), G.imap(from, to));
/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo = F => dual(2, (self, name) => F.imap(self, a => ({
  [name]: a
}), ({
  [name]: a
}) => a));
/**
 * Convert a value in a singleton array in a given effect.
 *
 * @since 1.0.0
 */
export const tupled = F => F.imap(a => [a], ([a]) => a);
//# sourceMappingURL=Invariant.mjs.map