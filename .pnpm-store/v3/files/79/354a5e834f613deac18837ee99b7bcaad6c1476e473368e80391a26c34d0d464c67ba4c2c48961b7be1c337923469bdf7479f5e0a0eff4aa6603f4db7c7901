"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapLeft = exports.map = exports.bimapComposition = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * Returns a default ternary `bimap` composition.
 *
 * @since 1.0.0
 */
const bimapComposition = (CovariantF, BicovariantG) => (self, f, g) => CovariantF.map(self, BicovariantG.bimap(f, g));
/**
 * Returns a default `mapLeft` implementation.
 *
 * @since 1.0.0
 */
exports.bimapComposition = bimapComposition;
const mapLeft = F => (0, _Function.dual)(2, (self, f) => F.bimap(self, f, _Function.identity));
/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
exports.mapLeft = mapLeft;
const map = F => (0, _Function.dual)(2, (self, f) => F.bimap(self, _Function.identity, f));
exports.map = map;
//# sourceMappingURL=Bicovariant.js.map