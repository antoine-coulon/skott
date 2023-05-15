"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeMake = exports.globalScope = exports.FiberScopeTypeId = void 0;
var _Global = /*#__PURE__*/require("@effect/data/Global");
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var FiberMessage = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberMessage"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b;
/** @internal */
const FiberScopeSymbolKey = "@effect/io/Fiber/Scope";
/** @internal */
const FiberScopeTypeId = /*#__PURE__*/Symbol.for(FiberScopeSymbolKey);
/** @internal */
exports.FiberScopeTypeId = FiberScopeTypeId;
class Global {
  constructor() {
    this[_a] = FiberScopeTypeId;
    this.fiberId = FiberId.none;
    this.roots = new Set();
  }
  add(_runtimeFlags, child) {
    this.roots.add(child);
    child.unsafeAddObserver(() => {
      this.roots.delete(child);
    });
  }
}
_a = FiberScopeTypeId;
/** @internal */
class Local {
  constructor(fiberId, parent) {
    this.fiberId = fiberId;
    this.parent = parent;
    this[_b] = FiberScopeTypeId;
  }
  add(_runtimeFlags, child) {
    this.parent.tell(FiberMessage.stateful(parentFiber => {
      parentFiber.addChild(child);
      child.unsafeAddObserver(() => {
        parentFiber.removeChild(child);
      });
    }));
  }
}
_b = FiberScopeTypeId;
/** @internal */
const unsafeMake = fiber => {
  return new Local(fiber.id(), fiber);
};
/** @internal */
exports.unsafeMake = unsafeMake;
const globalScope = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/io/FiberScope/Global"), () => new Global());
exports.globalScope = globalScope;
//# sourceMappingURL=fiberScope.js.map