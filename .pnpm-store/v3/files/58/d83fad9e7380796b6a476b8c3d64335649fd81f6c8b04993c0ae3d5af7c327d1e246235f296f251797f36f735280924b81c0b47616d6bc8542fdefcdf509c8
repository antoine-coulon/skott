import * as Option from "@effect/data/Option";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
export const getAndUpdateEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(value => core.map(restore(f)(value), result => [value, result])).traced(trace));
/** @internal */
export const getAndUpdateSomeEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modifyEffect(value => {
  const result = restore(pf)(value);
  switch (result._tag) {
    case "None":
      {
        return core.succeed([value, value]);
      }
    case "Some":
      {
        return core.map(result.value, newValue => [value, newValue]);
      }
  }
}).traced(trace));
/** @internal */
export const modify = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(restore(f)).traced(trace));
/** @internal */
export const modifyEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(restore(f)).traced(trace));
/** @internal */
export const modifySomeEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, fallback, pf) => self.modifyEffect(value => Option.getOrElse(() => core.succeed([fallback, value]))(restore(pf)(value))).traced(trace));
/** @internal */
export const updateEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(value => core.map(restore(f)(value), result => [undefined, result])).traced(trace));
/** @internal */
export const updateAndGetEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(value => core.map(restore(f)(value), result => [result, result])).traced(trace));
/** @internal */
export const updateSomeEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modifyEffect(value => {
  const result = restore(pf)(value);
  switch (result._tag) {
    case "None":
      {
        return core.succeed([void 0, value]);
      }
    case "Some":
      {
        return core.map(result.value, a => [void 0, a]);
      }
  }
}).traced(trace));
//# sourceMappingURL=synchronizedRef.mjs.map