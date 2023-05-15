"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArrayMap = exports.toArray = exports.reduceKind = exports.reduceComposition = exports.coproductMapKind = exports.combineMap = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * Returns a default ternary `reduce` composition.
 *
 * @since 1.0.0
 */
const reduceComposition = (F, G) => (self, b, f) => F.reduce(self, b, (b, ga) => G.reduce(ga, b, f));
/**
 * @since 1.0.0
 */
exports.reduceComposition = reduceComposition;
const toArrayMap = F => (0, _Function.dual)(2, (self, f) => F.reduce(self, [], (out, a) => [...out, f(a)]));
/**
 * @since 1.0.0
 */
exports.toArrayMap = toArrayMap;
const toArray = F => toArrayMap(F)(_Function.identity);
/**
 * @since 1.0.0
 */
exports.toArray = toArray;
const combineMap = F => M => (0, _Function.dual)(2, (self, f) => F.reduce(self, M.empty, (m, a) => M.combine(m, f(a))));
/**
 * @since 1.0.0
 */
exports.combineMap = combineMap;
const reduceKind = F => G => (0, _Function.dual)(3, (self, b, f) => F.reduce(self, G.of(b), (gb, a) => G.flatMap(gb, b => f(b, a))));
/**
 * @since 1.0.0
 */
exports.reduceKind = reduceKind;
const coproductMapKind = F => G => (0, _Function.dual)(2, (self, f) => F.reduce(self, G.zero(), (gb, a) => G.coproduct(gb, f(a))));
exports.coproductMapKind = coproductMapKind;
//# sourceMappingURL=Foldable.js.map