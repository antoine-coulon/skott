"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tap = exports.bind = exports.andThenDiscard = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
const andThenDiscard = F => (0, _Function.dual)(2, (self, that) => tap(F)(self, () => that));
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
exports.andThenDiscard = andThenDiscard;
const tap = F => (0, _Function.dual)(2, (self, f) => F.flatMap(self, a => F.map(f(a), () => a)));
/**
 * @category do notation
 * @since 1.0.0
 */
exports.tap = tap;
const bind = F => (0, _Function.dual)(3, (self, name, f) => F.flatMap(self, a => F.map(f(a), b => Object.assign({}, a, {
  [name]: b
}))));
exports.bind = bind;
//# sourceMappingURL=Chainable.js.map