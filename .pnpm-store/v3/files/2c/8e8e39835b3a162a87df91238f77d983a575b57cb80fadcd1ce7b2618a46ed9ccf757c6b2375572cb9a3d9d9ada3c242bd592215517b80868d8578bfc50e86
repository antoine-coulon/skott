var _a;
import * as Context from "@effect/data/Context";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices";
/** @internal */
export const LiveTypeId = /*#__PURE__*/Symbol.for("@effect/test/Live");
/** @internal */
export const Tag = /*#__PURE__*/Context.Tag();
/** @internal */
class LiveImpl {
  constructor(services) {
    this.services = services;
    this[_a] = LiveTypeId;
  }
  provide(effect) {
    return Debug.bodyWithTrace(trace => core.fiberRefLocallyWith(defaultServices.currentServices, Context.merge(this.services))(effect).traced(trace));
  }
}
_a = LiveTypeId;
/** @internal */
export const make = services => new LiveImpl(services);
//# sourceMappingURL=live.mjs.map