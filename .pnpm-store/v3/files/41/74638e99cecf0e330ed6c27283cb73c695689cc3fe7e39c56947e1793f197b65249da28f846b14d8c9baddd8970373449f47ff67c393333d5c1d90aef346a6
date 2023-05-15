var _a, _b;
import { globalValue } from "@effect/data/Global";
import * as FiberId from "@effect/io/Fiber/Id";
import * as FiberMessage from "@effect/io/internal_effect_untraced/fiberMessage";
/** @internal */
const FiberScopeSymbolKey = "@effect/io/Fiber/Scope";
/** @internal */
export const FiberScopeTypeId = /*#__PURE__*/Symbol.for(FiberScopeSymbolKey);
/** @internal */
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
export const unsafeMake = fiber => {
  return new Local(fiber.id(), fiber);
};
/** @internal */
export const globalScope = /*#__PURE__*/globalValue( /*#__PURE__*/Symbol.for("@effect/io/FiberScope/Global"), () => new Global());
//# sourceMappingURL=fiberScope.mjs.map