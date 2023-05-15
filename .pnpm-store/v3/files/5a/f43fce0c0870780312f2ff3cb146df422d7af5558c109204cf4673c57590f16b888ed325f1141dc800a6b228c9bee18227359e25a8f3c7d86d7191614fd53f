"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSymbol = exports.Equivalence = void 0;
var predicate = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Predicate"));
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * Tests if a value is a `symbol`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isSymbol } from "@effect/data/Predicate"
 *
 * assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)
 * assert.deepStrictEqual(isSymbol("a"), false)
 *
 * @category guards
 * @since 1.0.0
 */
const isSymbol = predicate.isSymbol;
/**
 * @category instances
 * @since 1.0.0
 */
exports.isSymbol = isSymbol;
const Equivalence = equivalence.symbol;
exports.Equivalence = Equivalence;
//# sourceMappingURL=Symbol.js.map