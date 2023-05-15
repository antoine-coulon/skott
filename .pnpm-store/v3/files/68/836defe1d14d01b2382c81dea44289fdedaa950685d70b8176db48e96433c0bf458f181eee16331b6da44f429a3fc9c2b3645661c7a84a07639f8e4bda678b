"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tupled = exports.imapComposition = exports.bindTo = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * The `Invariant` typeclass is a higher-order abstraction over types that allow mapping the contents of a type in both directions.
 * It is similar to the `Covariant` typeclass but provides an `imap` opration, which allows transforming a value in both directions.
 * This typeclass is useful when dealing with data types that can be converted to and from some other types.
 * The `imap` operation provides a way to convert such data types to other types that they can interact with while preserving their invariants.
 *
 * @since 1.0.0
 */

/**
 * Returns a default ternary `imap` composition.
 *
 * @since 1.0.0
 */
const imapComposition = (F, G) => (self, to, from) => F.imap(self, G.imap(to, from), G.imap(from, to));
/**
 * @category do notation
 * @since 1.0.0
 */
exports.imapComposition = imapComposition;
const bindTo = F => (0, _Function.dual)(2, (self, name) => F.imap(self, a => ({
  [name]: a
}), ({
  [name]: a
}) => a));
/**
 * Convert a value in a singleton array in a given effect.
 *
 * @since 1.0.0
 */
exports.bindTo = bindTo;
const tupled = F => F.imap(a => [a], ([a]) => a);
exports.tupled = tupled;
//# sourceMappingURL=Invariant.js.map