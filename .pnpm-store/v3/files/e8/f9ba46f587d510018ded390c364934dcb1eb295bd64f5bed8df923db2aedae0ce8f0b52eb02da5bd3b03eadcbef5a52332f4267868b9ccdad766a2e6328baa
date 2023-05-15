"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.right = exports.left = exports.isRight = exports.isLeft = exports.getRight = exports.getLeft = exports.fromOption = void 0;
var Data = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Data"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Option"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/** @internal */
const isLeft = ma => ma._tag === "Left";
/** @internal */
exports.isLeft = isLeft;
const isRight = ma => ma._tag === "Right";
/** @internal */
exports.isRight = isRight;
const left = e => Data.struct({
  _tag: "Left",
  left: e
});
/** @internal */
exports.left = left;
const right = a => Data.struct({
  _tag: "Right",
  right: a
});
/** @internal */
exports.right = right;
const getLeft = self => isRight(self) ? option.none : option.some(self.left);
/** @internal */
exports.getLeft = getLeft;
const getRight = self => isLeft(self) ? option.none : option.some(self.right);
/** @internal */
exports.getRight = getRight;
const fromOption = /*#__PURE__*/(0, _Function.dual)(2, (self, onNone) => option.isNone(self) ? left(onNone()) : right(self.value));
exports.fromOption = fromOption;
//# sourceMappingURL=Either.js.map