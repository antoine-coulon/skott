"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSomeEffect = exports.updateEffect = exports.updateAndGetEffect = exports.modifySomeEffect = exports.modifyEffect = exports.modify = exports.getAndUpdateSomeEffect = exports.getAndUpdateEffect = void 0;
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const getAndUpdateEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(value => core.map(restore(f)(value), result => [value, result])).traced(trace));
/** @internal */
exports.getAndUpdateEffect = getAndUpdateEffect;
const getAndUpdateSomeEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modifyEffect(value => {
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
exports.getAndUpdateSomeEffect = getAndUpdateSomeEffect;
const modify = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modify(restore(f)).traced(trace));
/** @internal */
exports.modify = modify;
const modifyEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(restore(f)).traced(trace));
/** @internal */
exports.modifyEffect = modifyEffect;
const modifySomeEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, fallback, pf) => self.modifyEffect(value => Option.getOrElse(() => core.succeed([fallback, value]))(restore(pf)(value))).traced(trace));
/** @internal */
exports.modifySomeEffect = modifySomeEffect;
const updateEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(value => core.map(restore(f)(value), result => [undefined, result])).traced(trace));
/** @internal */
exports.updateEffect = updateEffect;
const updateAndGetEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => self.modifyEffect(value => core.map(restore(f)(value), result => [result, result])).traced(trace));
/** @internal */
exports.updateAndGetEffect = updateAndGetEffect;
const updateSomeEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modifyEffect(value => {
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
exports.updateSomeEffect = updateSomeEffect;
//# sourceMappingURL=synchronizedRef.js.map