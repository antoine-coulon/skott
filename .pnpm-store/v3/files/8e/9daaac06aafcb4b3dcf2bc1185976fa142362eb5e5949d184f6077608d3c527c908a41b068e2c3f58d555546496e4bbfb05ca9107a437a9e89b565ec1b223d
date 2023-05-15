"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverseTap = exports.traverseComposition = exports.sequence = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * Returns a default binary `traverse` composition.
 *
 * @since 1.0.0
 */
const traverseComposition = (T, G) => F => (self, f) => T.traverse(F)(self, G.traverse(F)(f));
/**
 * Returns a default `sequence` implementation.
 *
 * @since 1.0.0
 */
exports.traverseComposition = traverseComposition;
const sequence = T => F => self => T.traverse(F)(self, _Function.identity);
/**
 * Given a function which returns a `F` effect, thread this effect
 * through the running of this function on all the values in `T`,
 * returning an `T<A>` in a `F` context, ignoring the values
 * returned by the provided function.
 *
 * @since 1.0.0
 */
exports.sequence = sequence;
const traverseTap = T => F => (0, _Function.dual)(2, (self, f) => T.traverse(F)(self, a => F.map(f(a), () => a)));
exports.traverseTap = traverseTap;
//# sourceMappingURL=Traversable.js.map