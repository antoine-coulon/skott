"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = exports.fromFiberRef = exports.Tag = exports.SizedTypeId = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const SizedTypeId = /*#__PURE__*/Symbol.for("@effect/test/Sized");
/** @internal */
exports.SizedTypeId = SizedTypeId;
const Tag = /*#__PURE__*/Context.Tag(SizedTypeId);
/** @internal */
exports.Tag = Tag;
class SizedImpl {
  constructor(fiberRef) {
    this.fiberRef = fiberRef;
    this[_a] = SizedTypeId;
  }
  size() {
    return Debug.bodyWithTrace(trace => core.fiberRefGet(this.fiberRef).traced(trace));
  }
  withSize(size) {
    return Debug.bodyWithTrace(trace => effect => Debug.untraced(() => core.fiberRefLocally(this.fiberRef, size)(effect).traced(trace)));
  }
}
_a = SizedTypeId;
/** @internal */
const make = size => new SizedImpl(core.fiberRefUnsafeMake(size));
/** @internal */
exports.make = make;
const fromFiberRef = fiberRef => new SizedImpl(fiberRef);
exports.fromFiberRef = fromFiberRef;
//# sourceMappingURL=sized.js.map