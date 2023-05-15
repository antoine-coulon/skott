import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/deferred";
/** @internal */
const DeferredSymbolKey = "@effect/io/Deferred";
/** @internal */
export const DeferredTypeId = /*#__PURE__*/Symbol.for(DeferredSymbolKey);
/** @internal */
export const deferredVariance = {
  _E: _ => _,
  _A: _ => _
};
/** @internal */
export const pending = joiners => {
  return {
    _tag: OpCodes.OP_STATE_PENDING,
    joiners
  };
};
/** @internal */
export const done = effect => {
  return {
    _tag: OpCodes.OP_STATE_DONE,
    effect
  };
};
//# sourceMappingURL=deferred.mjs.map