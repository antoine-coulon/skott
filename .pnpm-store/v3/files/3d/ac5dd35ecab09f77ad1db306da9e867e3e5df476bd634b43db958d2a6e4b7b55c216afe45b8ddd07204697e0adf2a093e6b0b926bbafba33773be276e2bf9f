var _a;
import * as Context from "@effect/data/Context";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
export const SizedTypeId = /*#__PURE__*/Symbol.for("@effect/test/Sized");
/** @internal */
export const Tag = /*#__PURE__*/Context.Tag(SizedTypeId);
/** @internal */
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
export const make = size => new SizedImpl(core.fiberRefUnsafeMake(size));
/** @internal */
export const fromFiberRef = fiberRef => new SizedImpl(fiberRef);
//# sourceMappingURL=sized.mjs.map