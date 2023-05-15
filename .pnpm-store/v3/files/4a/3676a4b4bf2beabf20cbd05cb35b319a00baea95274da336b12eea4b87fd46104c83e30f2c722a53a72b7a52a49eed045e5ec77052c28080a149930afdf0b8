"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reloadableTag = exports.reloadFork = exports.reload = exports.manual = exports.get = exports.autoFromConfig = exports.auto = exports.ReloadableTypeId = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var _Global = /*#__PURE__*/require("@effect/data/Global");
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var _layer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer"));
var _schedule = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule"));
var scopedRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/scopedRef"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ReloadableSymbolKey = "@effect/io/Reloadable";
/** @internal */
const ReloadableTypeId = /*#__PURE__*/Symbol.for(ReloadableSymbolKey);
/** @internal */
exports.ReloadableTypeId = ReloadableTypeId;
const reloadableVariance = {
  _A: _ => _
};
/** @internal */
const auto = (tag, layer, policy) => _layer.scoped(reloadableTag(tag), core.tap(reloadable => fiberRuntime.acquireRelease(fiberRuntime.forkDaemon(_schedule.schedule_Effect(policy)(effect.ignoreLogged(reloadable.reload()))), core.interruptFiber))(core.map(Context.unsafeGet(reloadableTag(tag)))(_layer.build(manual(tag, layer)))));
/** @internal */
exports.auto = auto;
const autoFromConfig = (tag, layer, scheduleFromConfig) => _layer.scoped(reloadableTag(tag), core.flatMap(env => core.map(Context.unsafeGet(reloadableTag(tag)))(_layer.build(auto(tag, layer, scheduleFromConfig(env)))))(core.context()));
/** @internal */
exports.autoFromConfig = autoFromConfig;
const get = /*#__PURE__*/Debug.methodWithTrace(trace => tag => core.serviceWithEffect(reloadableTag(tag), reloadable => scopedRef.get(reloadable.scopedRef)).traced(trace));
/** @internal */
exports.get = get;
const manual = (tag, layer) => _layer.scoped(reloadableTag(tag), core.flatMap(env => core.map(ref => ({
  [ReloadableTypeId]: reloadableVariance,
  scopedRef: ref,
  reload: () => Debug.bodyWithTrace(trace => core.provideContext(env)(scopedRef.set(ref, core.map(Context.unsafeGet(tag))(_layer.build(layer)))).traced(trace))
}))(scopedRef.fromAcquire(core.map(Context.unsafeGet(tag))(_layer.build(layer)))))(core.context()));
/** @internal */
exports.manual = manual;
const tagMap = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/io/Reloadable/tagMap"), () => new WeakMap([]));
/** @internal */
const reloadableTag = tag => {
  if (tagMap.has(tag)) {
    return tagMap.get(tag);
  }
  const newTag = Context.Tag();
  tagMap.set(tag, newTag);
  return newTag;
};
/** @internal */
exports.reloadableTag = reloadableTag;
const reload = /*#__PURE__*/Debug.methodWithTrace(trace => tag => core.serviceWithEffect(reloadableTag(tag), reloadable => reloadable.reload()).traced(trace));
/** @internal */
exports.reload = reload;
const reloadFork = /*#__PURE__*/Debug.methodWithTrace(trace => tag => core.serviceWithEffect(reloadableTag(tag), reloadable => core.asUnit(fiberRuntime.forkDaemon(effect.ignoreLogged(reloadable.reload()))).traced(trace)));
exports.reloadFork = reloadFork;
//# sourceMappingURL=reloadable.js.map