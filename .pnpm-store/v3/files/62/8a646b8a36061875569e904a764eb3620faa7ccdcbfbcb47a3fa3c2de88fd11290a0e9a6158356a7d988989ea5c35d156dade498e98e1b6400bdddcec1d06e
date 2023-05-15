"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imap = exports.contramapComposition = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * Composing two contravariant functors yields a Covariant functor.
 *
 * Returns a default binary `map` composition.
 *
 * @since 1.0.0
 */
const contramapComposition = (F, G) => (self, f) => F.contramap(self, G.contramap(f));
/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
exports.contramapComposition = contramapComposition;
const imap = contramap => (0, _Function.dual)(3, (self, _, from) => contramap(self, from));
exports.imap = imap;
//# sourceMappingURL=Contravariant.js.map