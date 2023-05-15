"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapComposition = exports.let = exports.imap = exports.flap = exports.asUnit = exports.as = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
const mapComposition = (F, G) => (self, f) => F.map(self, G.map(f));
/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
exports.mapComposition = mapComposition;
const imap = map => (0, _Function.dual)(3, (self, to, _) => map(self, to));
/**
 * @category mapping
 * @since 1.0.0
 */
exports.imap = imap;
const flap = F => (0, _Function.dual)(2, (a, self) => F.map(self, f => f(a)));
/**
 * @category mapping
 * @since 1.0.0
 */
exports.flap = flap;
const as = F => (0, _Function.dual)(2, (self, b) => F.map(self, () => b));
/**
 * @category mapping
 * @since 1.0.0
 */
exports.as = as;
const asUnit = F => as(F)(undefined);
exports.asUnit = asUnit;
const let_ = F => (0, _Function.dual)(3, (self, name, f) => F.map(self, a => Object.assign({}, a, {
  [name]: f(a)
})));
exports.let = let_;
//# sourceMappingURL=Covariant.js.map