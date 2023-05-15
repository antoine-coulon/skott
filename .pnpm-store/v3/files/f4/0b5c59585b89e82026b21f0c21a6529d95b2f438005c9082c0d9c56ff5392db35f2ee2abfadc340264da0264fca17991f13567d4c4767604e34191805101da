"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = exports.composeK = exports.andThen = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
const flatten = F => self => F.flatMap(self, _Function.identity);
/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @since 1.0.0
 */
exports.flatten = flatten;
const andThen = F => (0, _Function.dual)(2, (self, that) => F.flatMap(self, () => that));
/**
 * @since 1.0.0
 */
exports.andThen = andThen;
const composeK = F => (0, _Function.dual)(2, (afb, bfc) => a => F.flatMap(afb(a), bfc));
exports.composeK = composeK;
//# sourceMappingURL=FlatMap.js.map