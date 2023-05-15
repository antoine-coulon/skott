var _a, _b, _c, _d, _e;
import * as Chunk from "@effect/data/Chunk";
import * as MutableRef from "@effect/data/MutableRef";
import * as SortedSet from "@effect/data/SortedSet";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
const SupervisorSymbolKey = "@effect/io/Supervisor";
/** @internal */
export const SupervisorTypeId = /*#__PURE__*/Symbol.for(SupervisorSymbolKey);
/** @internal */
const supervisorVariance = {
  _T: _ => _
};
/** @internal */
export class ProxySupervisor {
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
_a = SupervisorTypeId;
/** @internal */
export class Zip {
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
_b = SupervisorTypeId;
export class Track {
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
_c = SupervisorTypeId;
export class Const {
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
export const unsafeTrack = () => {
  return new Track();
};
/** @internal */
export const track = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.sync(unsafeTrack).traced(trace));
/** @internal */
export const fromEffect = effect => {
  return new Const(effect);
};
/** @internal */
export const none = /*#__PURE__*/fromEffect( /*#__PURE__*/core.unit());
/** @internal */
export const fibersIn = /*#__PURE__*/Debug.methodWithTrace(trace => ref => core.sync(() => new FibersIn(ref)).traced(trace));
//# sourceMappingURL=supervisor.mjs.map