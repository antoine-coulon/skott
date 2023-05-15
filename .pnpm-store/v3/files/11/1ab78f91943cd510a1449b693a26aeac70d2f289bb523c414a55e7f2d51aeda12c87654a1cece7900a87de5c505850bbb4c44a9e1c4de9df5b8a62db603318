"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeTrack = exports.track = exports.none = exports.fromEffect = exports.fibersIn = exports.Zip = exports.Track = exports.SupervisorTypeId = exports.ProxySupervisor = exports.Const = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var SortedSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/SortedSet"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c, _d, _e;
/** @internal */
const SupervisorSymbolKey = "@effect/io/Supervisor";
/** @internal */
const SupervisorTypeId = /*#__PURE__*/Symbol.for(SupervisorSymbolKey);
/** @internal */
exports.SupervisorTypeId = SupervisorTypeId;
const supervisorVariance = {
  _T: _ => _
};
/** @internal */
class ProxySupervisor {
  constructor(underlying, value0) {
    this.underlying = underlying;
    this.value0 = value0;
    this[_a] = supervisorVariance;
  }
  value() {
    return Debug.bodyWithTrace(trace => this.value0().traced(trace));
  }
  onStart(context, effect, parent, fiber) {
    this.underlying.onStart(context, effect, parent, fiber);
  }
  onEnd(value, fiber) {
    this.underlying.onEnd(value, fiber);
  }
  onEffect(fiber, effect) {
    this.underlying.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.underlying.onSuspend(fiber);
  }
  onResume(fiber) {
    this.underlying.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, () => core.map(f)(this.value()));
  }
  zip(right) {
    return new Zip(this, right);
  }
}
exports.ProxySupervisor = ProxySupervisor;
_a = SupervisorTypeId;
/** @internal */
class Zip {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this[_b] = supervisorVariance;
  }
  value() {
    return Debug.bodyWithTrace(trace => core.zip(this.left.value(), this.right.value()).traced(trace));
  }
  onStart(context, effect, parent, fiber) {
    this.left.onStart(context, effect, parent, fiber);
    this.right.onStart(context, effect, parent, fiber);
  }
  onEnd(value, fiber) {
    this.left.onEnd(value, fiber);
    this.right.onEnd(value, fiber);
  }
  onEffect(fiber, effect) {
    this.left.onEffect(fiber, effect);
    this.right.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.left.onSuspend(fiber);
    this.right.onSuspend(fiber);
  }
  onResume(fiber) {
    this.left.onResume(fiber);
    this.right.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, () => core.map(f)(this.value()));
  }
  zip(right) {
    return new Zip(this, right);
  }
}
exports.Zip = Zip;
_b = SupervisorTypeId;
class Track {
  constructor() {
    this[_c] = supervisorVariance;
    this.fibers = new Set();
  }
  value() {
    return Debug.bodyWithTrace(trace => core.sync(() => Chunk.fromIterable(this.fibers)).traced(trace));
  }
  onStart(_context, _effect, _parent, fiber) {
    this.fibers.add(fiber);
  }
  onEnd(_value, fiber) {
    this.fibers.delete(fiber);
  }
  onEffect(_fiber, _effect) {
    //
  }
  onSuspend(_fiber) {
    //
  }
  onResume(_fiber) {
    //
  }
  map(f) {
    return new ProxySupervisor(this, () => core.map(f)(this.value()));
  }
  zip(right) {
    return new Zip(this, right);
  }
}
exports.Track = Track;
_c = SupervisorTypeId;
class Const {
  constructor(effect) {
    this.effect = effect;
    this[_d] = supervisorVariance;
  }
  value() {
    return Debug.bodyWithTrace(trace => this.effect.traced(trace));
  }
  onStart(_context, _effect, _parent, _fiber) {
    //
  }
  onEnd(_value, _fiber) {
    //
  }
  onEffect(_fiber, _effect) {
    //
  }
  onSuspend(_fiber) {
    //
  }
  onResume(_fiber) {
    //
  }
  map(f) {
    return new ProxySupervisor(this, () => core.map(f)(this.value()));
  }
  zip(right) {
    return new Zip(this, right);
  }
}
exports.Const = Const;
_d = SupervisorTypeId;
class FibersIn {
  constructor(ref) {
    this.ref = ref;
    this[_e] = supervisorVariance;
  }
  value() {
    return Debug.bodyWithTrace(trace => core.sync(() => MutableRef.get(this.ref)).traced(trace));
  }
  onStart(_context, _effect, _parent, fiber) {
    MutableRef.set(SortedSet.add(fiber)(MutableRef.get(this.ref)))(this.ref);
  }
  onEnd(_value, fiber) {
    MutableRef.set(SortedSet.remove(fiber)(MutableRef.get(this.ref)))(this.ref);
  }
  onEffect(_fiber, _effect) {
    //
  }
  onSuspend(_fiber) {
    //
  }
  onResume(_fiber) {
    //
  }
  map(f) {
    return new ProxySupervisor(this, () => core.map(f)(this.value()));
  }
  zip(right) {
    return new Zip(this, right);
  }
}
_e = SupervisorTypeId;
/** @internal */
const unsafeTrack = () => {
  return new Track();
};
/** @internal */
exports.unsafeTrack = unsafeTrack;
const track = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.sync(unsafeTrack).traced(trace));
/** @internal */
exports.track = track;
const fromEffect = effect => {
  return new Const(effect);
};
/** @internal */
exports.fromEffect = fromEffect;
const none = /*#__PURE__*/fromEffect( /*#__PURE__*/core.unit());
/** @internal */
exports.none = none;
const fibersIn = /*#__PURE__*/Debug.methodWithTrace(trace => ref => core.sync(() => new FibersIn(ref)).traced(trace));
exports.fibersIn = fibersIn;
//# sourceMappingURL=supervisor.js.map