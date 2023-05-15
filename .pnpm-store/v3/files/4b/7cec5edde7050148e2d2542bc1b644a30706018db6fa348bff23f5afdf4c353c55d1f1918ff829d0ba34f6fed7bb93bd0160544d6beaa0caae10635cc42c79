"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEffect = exports.fresh = exports.flatten = exports.flatMap = exports.failSync = exports.failCauseSync = exports.failCause = exports.fail = exports.extendScope = exports.discard = exports.dieSync = exports.die = exports.context = exports.catchAllCause = exports.catchAll = exports.buildWithScope = exports.build = exports.LayerTypeId = void 0;
exports.fromEffectContext = fromEffectContext;
exports.zipWithPar = exports.useMerge = exports.use = exports.toRuntime = exports.toLayerScoped = exports.toLayer = exports.tapErrorCause = exports.tapError = exports.tap = exports.syncContext = exports.sync = exports.suspend = exports.succeedContext = exports.succeed = exports.service = exports.scopedDiscard = exports.scopedContext = exports.scoped = exports.scope = exports.retry = exports.provideSomeLayer = exports.provideMerge = exports.provideLayer = exports.provide = exports.project = exports.passthrough = exports.orElse = exports.orDie = exports.mergeAll = exports.merge = exports.memoize = exports.matchLayer = exports.matchCauseLayer = exports.mapError = exports.map = exports.launch = exports.isLayer = exports.isFresh = exports.fromFunction = exports.fromEffectDiscard = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Duration = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Duration"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Cause"));
var Clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Clock"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect/circular"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var EffectOpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/effect"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/layer"));
var ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/ref"));
var runtime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtime"));
var synchronized = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/synchronizedRef"));
var ScheduleDecision = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Decision"));
var Intervals = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Intervals"));
var Scope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Scope"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const LayerSymbolKey = "@effect/io/Layer";
/** @internal */
const LayerTypeId = /*#__PURE__*/Symbol.for(LayerSymbolKey);
/** @internal */
exports.LayerTypeId = LayerTypeId;
const layerVariance = {
  _RIn: _ => _,
  _E: _ => _,
  _ROut: _ => _
};
/** @internal */
const proto = {
  [LayerTypeId]: layerVariance
};
/** @internal */
const isLayer = u => {
  return typeof u === "object" && u != null && LayerTypeId in u;
};
/** @internal */
exports.isLayer = isLayer;
const isFresh = self => {
  return self._tag === OpCodes.OP_FRESH;
};
// -----------------------------------------------------------------------------
// MemoMap
// -----------------------------------------------------------------------------
/** @internal */
exports.isFresh = isFresh;
class MemoMap {
  constructor(ref) {
    this.ref = ref;
  }
  /**
   * Checks the memo map to see if a layer exists. If it is, immediately
   * returns it. Otherwise, obtains the layer, stores it in the memo map,
   * and adds a finalizer to the `Scope`.
   */
  getOrElseMemoize(layer, scope) {
    return core.flatten(synchronized.modifyEffect(this.ref, map => {
      const inMap = map.get(layer);
      if (inMap !== undefined) {
        const [acquire, release] = inMap;
        const cached = core.onExit(core.exitMatch(() => core.unit(), () => core.scopeAddFinalizerExit(scope, release)))(core.flatMap(([patch, b]) => core.as(b)(effect.patchFiberRefs(patch)))(acquire));
        return core.succeed([cached, map]);
      }
      return core.flatMap(observers => core.flatMap(deferred => core.map(finalizerRef => {
        const resource = core.uninterruptibleMask(restore => core.flatMap(innerScope => core.flatMap(exit => {
          switch (exit._tag) {
            case EffectOpCodes.OP_FAILURE:
              {
                return core.zipRight(core.failCause(exit.i0))(core.zipRight(core.scopeClose(innerScope, exit))(core.deferredFailCause(deferred, exit.i0)));
              }
            case EffectOpCodes.OP_SUCCESS:
              {
                return core.as(exit.i0[1])(core.zipRight(core.deferredSucceed(deferred, exit.i0))(core.zipRight(core.scopeAddFinalizerExit(scope, exit => core.flatMap(finalizer => finalizer(exit))(ref.get(finalizerRef))))(core.zipRight(ref.update(observers, n => n + 1))(ref.set(finalizerRef, exit => core.asUnit(core.whenEffect(ref.modify(observers, n => [n === 1, n - 1]))(core.scopeClose(innerScope, exit))))))));
              }
          }
        })(core.exit(restore(core.flatMap(withScope(layer, innerScope), f => effect.diffFiberRefs(f(this)))))))(fiberRuntime.scopeMake()));
        const memoized = [core.onExit(core.exitMatchEffect(() => core.unit(), () => ref.update(observers, n => n + 1)))(core.deferredAwait(deferred)), exit => core.flatMap(finalizer => finalizer(exit))(ref.get(finalizerRef))];
        return [resource, isFresh(layer) ? map : map.set(layer, memoized)];
      })(ref.make(() => core.unit())))(core.deferredMake()))(ref.make(0));
    }));
  }
}
const makeMemoMap = () => {
  return core.map(ref => new MemoMap(ref))(circular.makeSynchronized(new Map()));
};
/** @internal */
const build = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopeWith(scope => buildWithScope(scope)(self)).traced(trace));
/** @internal */
exports.build = build;
const buildWithScope = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, scope) => core.flatMap(makeMemoMap(), memoMap => core.flatMap(withScope(self, scope), run => run(memoMap))).traced(trace));
exports.buildWithScope = buildWithScope;
const withScope = (self, scope) => {
  const op = self;
  switch (op._tag) {
    case OpCodes.OP_EXTEND_SCOPE:
      {
        return core.sync(() => memoMap => fiberRuntime.scopeWith(scope => memoMap.getOrElseMemoize(op.layer, scope)));
      }
    case OpCodes.OP_FOLD:
      {
        return core.sync(() => memoMap => core.matchCauseEffect(cause => memoMap.getOrElseMemoize(op.failureK(cause), scope), value => memoMap.getOrElseMemoize(op.successK(value), scope))(memoMap.getOrElseMemoize(op.layer, scope)));
      }
    case OpCodes.OP_FRESH:
      {
        return core.sync(() => _ => buildWithScope(scope)(op.layer));
      }
    case OpCodes.OP_FROM_EFFECT:
      {
        return core.sync(() => _ => op.effect);
      }
    case OpCodes.OP_PROVIDE_TO:
      {
        return core.sync(() => memoMap => core.flatMap(env => core.provideContext(env)(memoMap.getOrElseMemoize(op.second, scope)))(memoMap.getOrElseMemoize(op.first, scope)));
      }
    case OpCodes.OP_SCOPED:
      {
        return core.sync(() => _ => fiberRuntime.scopeExtend(op.effect, scope));
      }
    case OpCodes.OP_SUSPEND:
      {
        return core.sync(() => memoMap => memoMap.getOrElseMemoize(op.evaluate(), scope));
      }
    case OpCodes.OP_ZIP_WITH:
      {
        return core.sync(() => memoMap => core.zipWith(memoMap.getOrElseMemoize(op.second, scope), op.zipK)(memoMap.getOrElseMemoize(op.first, scope)));
      }
    case OpCodes.OP_ZIP_WITH_PAR:
      {
        return core.sync(() => memoMap => circular.zipWithPar(memoMap.getOrElseMemoize(op.second, scope), op.zipK)(memoMap.getOrElseMemoize(op.first, scope)));
      }
  }
};
// -----------------------------------------------------------------------------
// Layer
// -----------------------------------------------------------------------------
/** @internal */
const catchAll = /*#__PURE__*/Debug.untracedDual(2, restore => (self, onError) => matchLayer(self, restore(onError), succeedContext));
/** @internal */
exports.catchAll = catchAll;
const catchAllCause = /*#__PURE__*/Debug.untracedDual(2, restore => (self, onError) => matchCauseLayer(self, restore(onError), succeedContext));
/** @internal */
exports.catchAllCause = catchAllCause;
const die = defect => failCause(Cause.die(defect));
/** @internal */
exports.die = die;
const dieSync = evaluate => failCauseSync(() => Cause.die(evaluate()));
/** @internal */
exports.dieSync = dieSync;
const discard = self => map(self, () => Context.empty());
/** @internal */
exports.discard = discard;
const context = () => fromEffectContext(core.context());
/** @internal */
exports.context = context;
const extendScope = self => {
  const extendScope = Object.create(proto);
  extendScope._tag = OpCodes.OP_EXTEND_SCOPE;
  extendScope.layer = self;
  return extendScope;
};
/** @internal */
exports.extendScope = extendScope;
const fail = error => failCause(Cause.fail(error));
/** @internal */
exports.fail = fail;
const failSync = evaluate => failCauseSync(() => Cause.fail(evaluate()));
/** @internal */
exports.failSync = failSync;
const failCause = cause => fromEffectContext(core.failCause(cause));
/** @internal */
exports.failCause = failCause;
const failCauseSync = evaluate => fromEffectContext(core.failCauseSync(evaluate));
/** @internal */
exports.failCauseSync = failCauseSync;
const flatMap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => matchLayer(self, fail, restore(f)));
/** @internal */
exports.flatMap = flatMap;
const flatten = /*#__PURE__*/(0, _Function.dual)(2, (self, tag) => flatMap(self, Context.get(tag)));
/** @internal */
exports.flatten = flatten;
const fresh = self => {
  const fresh = Object.create(proto);
  fresh._tag = OpCodes.OP_FRESH;
  fresh.layer = self;
  return fresh;
};
/** @internal */
exports.fresh = fresh;
const fromEffect = (tag, effect) => fromEffectContext(core.map(effect, service => Context.make(tag, service)));
/** @internal */
exports.fromEffect = fromEffect;
const fromEffectDiscard = effect => fromEffectContext(core.map(effect, () => Context.empty()));
/** @internal */
exports.fromEffectDiscard = fromEffectDiscard;
function fromEffectContext(effect) {
  const fromEffect = Object.create(proto);
  fromEffect._tag = OpCodes.OP_FROM_EFFECT;
  fromEffect.effect = effect;
  return fromEffect;
}
/** @internal */
const fromFunction = (tagA, tagB, f) => fromEffectContext(core.serviceWith(tagA, a => Context.make(tagB, f(a))));
/** @internal */
exports.fromFunction = fromFunction;
const launch = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopedEffect(core.zipRight(fiberRuntime.scopeWith(scope => buildWithScope(scope)(self)), core.never())).traced(trace));
/** @internal */
exports.launch = launch;
const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => flatMap(self, context => succeedContext(restore(f)(context))));
/** @internal */
exports.map = map;
const mapError = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => catchAll(self, error => failSync(() => restore(f)(error))));
/** @internal */
exports.mapError = mapError;
const matchCauseLayer = /*#__PURE__*/Debug.untracedDual(3, restore => (self, onFailure, onSuccess) => {
  const fold = Object.create(proto);
  fold._tag = OpCodes.OP_FOLD;
  fold.layer = self;
  fold.failureK = restore(onFailure);
  fold.successK = restore(onSuccess);
  return fold;
});
/** @internal */
exports.matchCauseLayer = matchCauseLayer;
const matchLayer = /*#__PURE__*/Debug.untracedDual(3, restore => (self, onFailure, onSuccess) => matchCauseLayer(self, cause => {
  const failureOrCause = Cause.failureOrCause(cause);
  switch (failureOrCause._tag) {
    case "Left":
      {
        return restore(onFailure)(failureOrCause.left);
      }
    case "Right":
      {
        return failCause(failureOrCause.right);
      }
  }
}, restore(onSuccess)));
/** @internal */
exports.matchLayer = matchLayer;
const memoize = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopeWith(scope => core.map(fromEffectContext)(effect.memoize(buildWithScope(self, scope)))).traced(trace));
/** @internal */
exports.memoize = memoize;
const merge = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => zipWithPar(self, that, (a, b) => Context.merge(b)(a)));
/** @internal */
exports.merge = merge;
const mergeAll = (...layers) => {
  let final = layers[0];
  for (let i = 1; i < layers.length; i++) {
    final = merge(layers[i])(final);
  }
  return final;
};
/** @internal */
exports.mergeAll = mergeAll;
const orDie = self => catchAll(self, defect => die(defect));
/** @internal */
exports.orDie = orDie;
const orElse = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => catchAll(self, restore(that)));
/** @internal */
exports.orElse = orElse;
const passthrough = self => merge(context(), self);
/** @internal */
exports.passthrough = passthrough;
const project = /*#__PURE__*/Debug.untracedDual(4, restore => (self, tagA, tagB, f) => map(self, context => Context.make(tagB, restore(f)(Context.unsafeGet(context, tagA)))));
/** @internal */
exports.project = project;
const provide = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => suspend(() => {
  const provideTo = Object.create(proto);
  provideTo._tag = OpCodes.OP_PROVIDE_TO;
  provideTo.first = Object.create(proto, {
    _tag: {
      value: OpCodes.OP_ZIP_WITH,
      enumerable: true
    },
    first: {
      value: context(),
      enumerable: true
    },
    second: {
      value: self
    },
    zipK: {
      value: (a, b) => Context.merge(b)(a)
    }
  });
  provideTo.second = that;
  return provideTo;
}));
/** @internal */
exports.provide = provide;
const provideMerge = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  const zipWith = Object.create(proto);
  zipWith._tag = OpCodes.OP_ZIP_WITH;
  zipWith.first = self;
  zipWith.second = provide(that)(self);
  zipWith.zipK = (a, b) => {
    return Context.merge(b)(a);
  };
  return zipWith;
});
/** @internal */
exports.provideMerge = provideMerge;
const retry = /*#__PURE__*/(0, _Function.dual)(2, (self, schedule) => suspend(() => {
  const stateTag = Context.Tag();
  return flatMap(env => retryLoop(self, schedule, stateTag, Context.get(stateTag)(env).state))(succeed(stateTag, {
    state: schedule.initial
  }));
}));
/** @internal */
exports.retry = retry;
const retryLoop = (self, schedule, stateTag, state) => {
  return catchAll(error => flatMap(env => fresh(retryLoop(self, schedule, stateTag, Context.get(stateTag)(env).state)))(retryUpdate(schedule, stateTag, error, state)))(self);
};
/** @internal */
const retryUpdate = (schedule, stateTag, error, state) => {
  return fromEffect(stateTag, core.flatMap(now => core.flatMap(([state, _, decision]) => ScheduleDecision.isDone(decision) ? core.fail(error) : core.as({
    state
  })(Clock.sleep(Duration.millis(Intervals.start(decision.intervals) - now))))(schedule.step(now, error, state)))(Clock.currentTimeMillis()));
};
/** @internal */
const scope = () => {
  return scopedContext(core.map(scope => Context.make(Scope.Tag, scope))(fiberRuntime.acquireRelease(fiberRuntime.scopeMake(), (scope, exit) => scope.close(exit))));
};
/** @internal */
exports.scope = scope;
const scoped = (tag, effect) => {
  return scopedContext(core.map(effect, service => Context.make(tag, service)));
};
/** @internal */
exports.scoped = scoped;
const scopedDiscard = effect => {
  return scopedContext(core.as(Context.empty())(effect));
};
/** @internal */
exports.scopedDiscard = scopedDiscard;
const scopedContext = effect => {
  const scoped = Object.create(proto);
  scoped._tag = OpCodes.OP_SCOPED;
  scoped.effect = effect;
  return scoped;
};
/** @internal */
exports.scopedContext = scopedContext;
const service = tag => {
  return fromEffect(tag, core.service(tag));
};
/** @internal */
exports.service = service;
const succeed = (tag, resource) => {
  return fromEffectContext(core.succeed(Context.make(tag, resource)));
};
/** @internal */
exports.succeed = succeed;
const succeedContext = context => {
  return fromEffectContext(core.succeed(context));
};
/** @internal */
exports.succeedContext = succeedContext;
const suspend = evaluate => {
  const suspend = Object.create(proto);
  suspend._tag = OpCodes.OP_SUSPEND;
  suspend.evaluate = evaluate;
  return suspend;
};
/** @internal */
exports.suspend = suspend;
const sync = (tag, evaluate) => {
  return fromEffectContext(core.sync(() => Context.make(tag, evaluate())));
};
/** @internal */
exports.sync = sync;
const syncContext = evaluate => {
  return fromEffectContext(core.sync(evaluate));
};
/** @internal */
exports.syncContext = syncContext;
const tap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => flatMap(self, context => fromEffectContext(core.as(restore(f)(context), context))));
/** @internal */
exports.tap = tap;
const tapError = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => catchAll(self, e => fromEffectContext(core.flatMap(restore(f)(e), () => core.fail(e)))));
/** @internal */
exports.tapError = tapError;
const tapErrorCause = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => catchAllCause(self, cause => fromEffectContext(core.flatMap(restore(f)(cause), () => core.failCause(cause)))));
/** @internal */
exports.tapErrorCause = tapErrorCause;
const toRuntime = self => {
  return core.flatMap(context => core.provideContext(context)(runtime.runtime()))(fiberRuntime.scopeWith(scope => buildWithScope(scope)(self)));
};
/** @internal */
exports.toRuntime = toRuntime;
const use = /*#__PURE__*/(0, _Function.dual)(2, (that, self) => suspend(() => {
  const provideTo = Object.create(proto);
  provideTo._tag = OpCodes.OP_PROVIDE_TO;
  provideTo.first = Object.create(proto, {
    _tag: {
      value: OpCodes.OP_ZIP_WITH,
      enumerable: true
    },
    first: {
      value: context(),
      enumerable: true
    },
    second: {
      value: self
    },
    zipK: {
      value: (a, b) => Context.merge(b)(a)
    }
  });
  provideTo.second = that;
  return provideTo;
}));
/** @internal */
exports.use = use;
const useMerge = /*#__PURE__*/(0, _Function.dual)(2, (that, self) => {
  const zipWith = Object.create(proto);
  zipWith._tag = OpCodes.OP_ZIP_WITH;
  zipWith.first = self;
  zipWith.second = provide(that)(self);
  zipWith.zipK = (a, b) => {
    return Context.merge(b)(a);
  };
  return zipWith;
});
/** @internal */
exports.useMerge = useMerge;
const zipWithPar = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => suspend(() => {
  const zipWithPar = Object.create(proto);
  zipWithPar._tag = OpCodes.OP_ZIP_WITH_PAR;
  zipWithPar.first = self;
  zipWithPar.second = that;
  zipWithPar.zipK = restore(f);
  return zipWithPar;
}));
// circular with Effect
/** @internal */
exports.zipWithPar = zipWithPar;
const provideLayer = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, layer) => core.acquireUseRelease(fiberRuntime.scopeMake(), scope => core.flatMap(buildWithScope(layer, scope), context => core.provideContext(self, context)), (scope, exit) => core.scopeClose(scope, exit)).traced(trace));
/** @internal */
exports.provideLayer = provideLayer;
const provideSomeLayer = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, layer) => provideLayer(self, merge(layer)(context())).traced(trace));
/** @internal */
exports.provideSomeLayer = provideSomeLayer;
const toLayer = /*#__PURE__*/(0, _Function.dual)(2, (self, tag) => fromEffect(tag, self));
/** @internal */
exports.toLayer = toLayer;
const toLayerScoped = /*#__PURE__*/(0, _Function.dual)(2, (self, tag) => scoped(tag, self));
exports.toLayerScoped = toLayerScoped;
//# sourceMappingURL=layer.js.map