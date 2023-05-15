import * as Context from "@effect/data/Context";
import * as Duration from "@effect/data/Duration";
import { dual } from "@effect/data/Function";
import * as Cause from "@effect/io/Cause";
import * as Clock from "@effect/io/Clock";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as circular from "@effect/io/internal_effect_untraced/effect/circular";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as EffectOpCodes from "@effect/io/internal_effect_untraced/opCodes/effect";
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/layer";
import * as ref from "@effect/io/internal_effect_untraced/ref";
import * as runtime from "@effect/io/internal_effect_untraced/runtime";
import * as synchronized from "@effect/io/internal_effect_untraced/synchronizedRef";
import * as ScheduleDecision from "@effect/io/Schedule/Decision";
import * as Intervals from "@effect/io/Schedule/Intervals";
import * as Scope from "@effect/io/Scope";
/** @internal */
const LayerSymbolKey = "@effect/io/Layer";
/** @internal */
export const LayerTypeId = /*#__PURE__*/Symbol.for(LayerSymbolKey);
/** @internal */
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
export const isLayer = u => {
  return typeof u === "object" && u != null && LayerTypeId in u;
};
/** @internal */
export const isFresh = self => {
  return self._tag === OpCodes.OP_FRESH;
};
// -----------------------------------------------------------------------------
// MemoMap
// -----------------------------------------------------------------------------
/** @internal */
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
export const build = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopeWith(scope => buildWithScope(scope)(self)).traced(trace));
/** @internal */
export const buildWithScope = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, scope) => core.flatMap(makeMemoMap(), memoMap => core.flatMap(withScope(self, scope), run => run(memoMap))).traced(trace));
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
export const catchAll = /*#__PURE__*/Debug.untracedDual(2, restore => (self, onError) => matchLayer(self, restore(onError), succeedContext));
/** @internal */
export const catchAllCause = /*#__PURE__*/Debug.untracedDual(2, restore => (self, onError) => matchCauseLayer(self, restore(onError), succeedContext));
/** @internal */
export const die = defect => failCause(Cause.die(defect));
/** @internal */
export const dieSync = evaluate => failCauseSync(() => Cause.die(evaluate()));
/** @internal */
export const discard = self => map(self, () => Context.empty());
/** @internal */
export const context = () => fromEffectContext(core.context());
/** @internal */
export const extendScope = self => {
  const extendScope = Object.create(proto);
  extendScope._tag = OpCodes.OP_EXTEND_SCOPE;
  extendScope.layer = self;
  return extendScope;
};
/** @internal */
export const fail = error => failCause(Cause.fail(error));
/** @internal */
export const failSync = evaluate => failCauseSync(() => Cause.fail(evaluate()));
/** @internal */
export const failCause = cause => fromEffectContext(core.failCause(cause));
/** @internal */
export const failCauseSync = evaluate => fromEffectContext(core.failCauseSync(evaluate));
/** @internal */
export const flatMap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => matchLayer(self, fail, restore(f)));
/** @internal */
export const flatten = /*#__PURE__*/dual(2, (self, tag) => flatMap(self, Context.get(tag)));
/** @internal */
export const fresh = self => {
  const fresh = Object.create(proto);
  fresh._tag = OpCodes.OP_FRESH;
  fresh.layer = self;
  return fresh;
};
/** @internal */
export const fromEffect = (tag, effect) => fromEffectContext(core.map(effect, service => Context.make(tag, service)));
/** @internal */
export const fromEffectDiscard = effect => fromEffectContext(core.map(effect, () => Context.empty()));
/** @internal */
export function fromEffectContext(effect) {
  const fromEffect = Object.create(proto);
  fromEffect._tag = OpCodes.OP_FROM_EFFECT;
  fromEffect.effect = effect;
  return fromEffect;
}
/** @internal */
export const fromFunction = (tagA, tagB, f) => fromEffectContext(core.serviceWith(tagA, a => Context.make(tagB, f(a))));
/** @internal */
export const launch = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopedEffect(core.zipRight(fiberRuntime.scopeWith(scope => buildWithScope(scope)(self)), core.never())).traced(trace));
/** @internal */
export const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => flatMap(self, context => succeedContext(restore(f)(context))));
/** @internal */
export const mapError = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => catchAll(self, error => failSync(() => restore(f)(error))));
/** @internal */
export const matchCauseLayer = /*#__PURE__*/Debug.untracedDual(3, restore => (self, onFailure, onSuccess) => {
  const fold = Object.create(proto);
  fold._tag = OpCodes.OP_FOLD;
  fold.layer = self;
  fold.failureK = restore(onFailure);
  fold.successK = restore(onSuccess);
  return fold;
});
/** @internal */
export const matchLayer = /*#__PURE__*/Debug.untracedDual(3, restore => (self, onFailure, onSuccess) => matchCauseLayer(self, cause => {
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
export const memoize = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopeWith(scope => core.map(fromEffectContext)(effect.memoize(buildWithScope(self, scope)))).traced(trace));
/** @internal */
export const merge = /*#__PURE__*/dual(2, (self, that) => zipWithPar(self, that, (a, b) => Context.merge(b)(a)));
/** @internal */
export const mergeAll = (...layers) => {
  let final = layers[0];
  for (let i = 1; i < layers.length; i++) {
    final = merge(layers[i])(final);
  }
  return final;
};
/** @internal */
export const orDie = self => catchAll(self, defect => die(defect));
/** @internal */
export const orElse = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => catchAll(self, restore(that)));
/** @internal */
export const passthrough = self => merge(context(), self);
/** @internal */
export const project = /*#__PURE__*/Debug.untracedDual(4, restore => (self, tagA, tagB, f) => map(self, context => Context.make(tagB, restore(f)(Context.unsafeGet(context, tagA)))));
/** @internal */
export const provide = /*#__PURE__*/dual(2, (self, that) => suspend(() => {
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
export const provideMerge = /*#__PURE__*/dual(2, (self, that) => {
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
export const retry = /*#__PURE__*/dual(2, (self, schedule) => suspend(() => {
  const stateTag = Context.Tag();
  return flatMap(env => retryLoop(self, schedule, stateTag, Context.get(stateTag)(env).state))(succeed(stateTag, {
    state: schedule.initial
  }));
}));
/** @internal */
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
export const scope = () => {
  return scopedContext(core.map(scope => Context.make(Scope.Tag, scope))(fiberRuntime.acquireRelease(fiberRuntime.scopeMake(), (scope, exit) => scope.close(exit))));
};
/** @internal */
export const scoped = (tag, effect) => {
  return scopedContext(core.map(effect, service => Context.make(tag, service)));
};
/** @internal */
export const scopedDiscard = effect => {
  return scopedContext(core.as(Context.empty())(effect));
};
/** @internal */
export const scopedContext = effect => {
  const scoped = Object.create(proto);
  scoped._tag = OpCodes.OP_SCOPED;
  scoped.effect = effect;
  return scoped;
};
/** @internal */
export const service = tag => {
  return fromEffect(tag, core.service(tag));
};
/** @internal */
export const succeed = (tag, resource) => {
  return fromEffectContext(core.succeed(Context.make(tag, resource)));
};
/** @internal */
export const succeedContext = context => {
  return fromEffectContext(core.succeed(context));
};
/** @internal */
export const suspend = evaluate => {
  const suspend = Object.create(proto);
  suspend._tag = OpCodes.OP_SUSPEND;
  suspend.evaluate = evaluate;
  return suspend;
};
/** @internal */
export const sync = (tag, evaluate) => {
  return fromEffectContext(core.sync(() => Context.make(tag, evaluate())));
};
/** @internal */
export const syncContext = evaluate => {
  return fromEffectContext(core.sync(evaluate));
};
/** @internal */
export const tap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => flatMap(self, context => fromEffectContext(core.as(restore(f)(context), context))));
/** @internal */
export const tapError = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => catchAll(self, e => fromEffectContext(core.flatMap(restore(f)(e), () => core.fail(e)))));
/** @internal */
export const tapErrorCause = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => catchAllCause(self, cause => fromEffectContext(core.flatMap(restore(f)(cause), () => core.failCause(cause)))));
/** @internal */
export const toRuntime = self => {
  return core.flatMap(context => core.provideContext(context)(runtime.runtime()))(fiberRuntime.scopeWith(scope => buildWithScope(scope)(self)));
};
/** @internal */
export const use = /*#__PURE__*/dual(2, (that, self) => suspend(() => {
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
export const useMerge = /*#__PURE__*/dual(2, (that, self) => {
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
export const zipWithPar = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => suspend(() => {
  const zipWithPar = Object.create(proto);
  zipWithPar._tag = OpCodes.OP_ZIP_WITH_PAR;
  zipWithPar.first = self;
  zipWithPar.second = that;
  zipWithPar.zipK = restore(f);
  return zipWithPar;
}));
// circular with Effect
/** @internal */
export const provideLayer = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, layer) => core.acquireUseRelease(fiberRuntime.scopeMake(), scope => core.flatMap(buildWithScope(layer, scope), context => core.provideContext(self, context)), (scope, exit) => core.scopeClose(scope, exit)).traced(trace));
/** @internal */
export const provideSomeLayer = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, layer) => provideLayer(self, merge(layer)(context())).traced(trace));
/** @internal */
export const toLayer = /*#__PURE__*/dual(2, (self, tag) => fromEffect(tag, self));
/** @internal */
export const toLayerScoped = /*#__PURE__*/dual(2, (self, tag) => scoped(tag, self));
//# sourceMappingURL=layer.mjs.map