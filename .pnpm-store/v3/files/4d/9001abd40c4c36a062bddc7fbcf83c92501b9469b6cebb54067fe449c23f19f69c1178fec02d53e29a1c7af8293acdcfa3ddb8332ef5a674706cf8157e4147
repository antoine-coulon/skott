"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pending = exports.done = exports.deferredVariance = exports.DeferredTypeId = void 0;
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/deferred"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const DeferredSymbolKey = "@effect/io/Deferred";
/** @internal */
const DeferredTypeId = /*#__PURE__*/Symbol.for(DeferredSymbolKey);
/** @internal */
exports.DeferredTypeId = DeferredTypeId;
const deferredVariance = {
  _E: _ => _,
  _A: _ => _
};
/** @internal */
exports.deferredVariance = deferredVariance;
const pending = joiners => {
  return {
    _tag: OpCodes.OP_STATE_PENDING,
    joiners
  };
};
/** @internal */
exports.pending = pending;
const done = effect => {
  return {
    _tag: OpCodes.OP_STATE_DONE,
    effect
  };
};
exports.done = done;
//# sourceMappingURL=deferred.js.map