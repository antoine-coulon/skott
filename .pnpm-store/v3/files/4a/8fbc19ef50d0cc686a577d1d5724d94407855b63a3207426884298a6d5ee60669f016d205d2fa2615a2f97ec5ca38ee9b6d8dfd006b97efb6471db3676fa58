var _a;
import * as Chunk from "@effect/data/Chunk";
import * as Context from "@effect/data/Context";
import * as Duration from "@effect/data/Duration";
import * as Equal from "@effect/data/Equal";
import { constVoid, identity } from "@effect/data/Function";
import * as HashMap from "@effect/data/HashMap";
import * as number from "@effect/data/Number";
import * as Option from "@effect/data/Option";
import * as Order from "@effect/data/typeclass/Order";
import * as Debug from "@effect/io/Debug";
import * as FiberStatus from "@effect/io/Fiber/Status";
import * as clock from "@effect/io/internal_effect_untraced/clock";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as circular from "@effect/io/internal_effect_untraced/effect/circular";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as layer from "@effect/io/internal_effect_untraced/layer";
import * as ref from "@effect/io/internal_effect_untraced/ref";
import * as synchronized from "@effect/io/internal_effect_untraced/synchronizedRef";
import * as Annotations from "@effect/io/internal_effect_untraced/testing/annotations";
import * as Live from "@effect/io/internal_effect_untraced/testing/live";
import * as Data from "@effect/io/internal_effect_untraced/testing/testClock/data";
import * as SuspendedWarningData from "@effect/io/internal_effect_untraced/testing/testClock/suspendedWarningData";
import * as WarningData from "@effect/io/internal_effect_untraced/testing/testClock/warningData";
/** @internal */
export const Tag = /*#__PURE__*/Context.Tag();
/**
 * The warning message that will be displayed if a test is using time but is
 * not advancing the `TestClock`.
 *
 * @internal
 */
const warning = "Warning: A test is using time, but is not advancing " + "the test clock, which may result in the test hanging. Use TestClock.adjust to " + "manually advance the time.";
/**
 * The warning message that will be displayed if a test is advancing the clock
 * but a fiber is still running.
 *
 * @internal
 */
const suspendedWarning = "Warning: A test is advancing the test clock, " + "but a fiber is not suspending, which may result in the test hanging. Use " + "TestAspect.diagnose to identity the fiber that is not suspending.";
/** @internal */
export class TestClockImpl {
  constructor(clockState, live, annotations, warningState, suspendedWarningState) {
    this.clockState = clockState;
    this.live = live;
    this.annotations = annotations;
    this.warningState = warningState;
    this.suspendedWarningState = suspendedWarningState;
    this[_a] = clock.ClockTypeId;
  }
  /**
   * Unsafely returns the current time in milliseconds.
   */
  unsafeCurrentTimeMillis() {
    return ref.unsafeGet(this.clockState).instant;
  }
  /**
   * Returns the current clock time in milliseconds.
   */
  currentTimeMillis() {
    return Debug.bodyWithTrace(trace => core.map(ref.get(this.clockState), data => data.instant).traced(trace));
  }
  /**
   * Saves the `TestClock`'s current state in an effect which, when run, will
   * restore the `TestClock` state to the saved state.
   */
  save() {
    return Debug.bodyWithTrace(trace => core.map(ref.get(this.clockState), data => ref.set(this.clockState, data)).traced(trace));
  }
  /**
   * Sets the current clock time to the specified instant. Any effects that
   * were scheduled to occur on or before the new time will be run in order.
   */
  setTime(instant) {
    return Debug.bodyWithTrace(trace => core.zipRight(this.warningDone(), this.run(() => instant)).traced(trace));
  }
  /**
   * Semantically blocks the current fiber until the clock time is equal to or
   * greater than the specified duration. Once the clock time is adjusted to
   * on or after the duration, the fiber will automatically be resumed.
   */
  sleep(duration) {
    return Debug.bodyWithTrace(trace => core.flatMap(deferred => core.flatMap(shouldAwait => shouldAwait ? core.zipRight(core.deferredAwait(deferred))(this.warningStart()) : core.asUnit(core.deferredSucceed(deferred, void 0)))(ref.modify(this.clockState, data => {
      const end = data.instant + duration.millis;
      if (end > data.instant) {
        return [true, Data.make(data.instant, Chunk.prepend([end, deferred])(data.sleeps))];
      }
      return [false, data];
    })))(core.deferredMake()).traced(trace));
  }
  /**
   * Returns a list of the times at which all queued effects are scheduled to
   * resume.
   */
  sleeps() {
    return Debug.bodyWithTrace(trace => core.map(data => Chunk.map(_ => _[0])(data.sleeps))(ref.get(this.clockState)).traced(trace));
  }
  /**
   * Increments the current clock time by the specified duration. Any effects
   * that were scheduled to occur on or before the new time will be run in
   * order.
   */
  adjust(duration) {
    return Debug.bodyWithTrace(trace => core.zipRight(this.run(n => n + duration.millis))(this.warningDone()).traced(trace));
  }
  /**
   * Increments the current clock time by the specified duration. Any effects
   * that were scheduled to occur on or before the new time will be run in
   * order.
   */
  adjustWith(duration) {
    return Debug.bodyWithTrace(trace => effect => Debug.untraced(() => circular.zipParLeft(effect, this.adjust(duration)).traced(trace)));
  }
  /**
   * Returns a set of all fibers in this test.
   */
  supervisedFibers() {
    return Debug.bodyWithTrace(trace => this.annotations.supervisedFibers().traced(trace));
  }
  /**
   * Captures a "snapshot" of the identifier and status of all fibers in this
   * test other than the current fiber. Fails with the `Unit` value if any of
   * these fibers are not done or suspended. Note that because we cannot
   * synchronize on the status of multiple fibers at the same time this
   * snapshot may not be fully consistent.
   */
  freeze() {
    return Debug.bodyWithTrace(trace => core.flatMap(fibers => effect.reduce(HashMap.empty(), (map, fiber) => core.flatMap(status => {
      if (FiberStatus.isDone(status)) {
        return core.succeed(HashMap.set(fiber.id(), status)(map));
      }
      if (FiberStatus.isSuspended(status)) {
        return core.succeed(HashMap.set(fiber.id(), status)(map));
      }
      return core.fail(void 0);
    })(fiber.status()))(fibers))(this.supervisedFibers()).traced(trace));
  }
  /**
   * Forks a fiber that will display a warning message if a test is using time
   * but is not advancing the `TestClock`.
   */
  warningStart() {
    return Debug.bodyWithTrace(trace => synchronized.updateSomeEffect(this.warningState, data => WarningData.isStart(data) ? Option.some(core.map(fiber => WarningData.pending(fiber))(fiberRuntime.fork(core.interruptible(this.live.provide(effect.delay(Duration.seconds(5))(effect.logWarning(warning))))))) : Option.none()).traced(trace));
  }
  /**
   * Cancels the warning message that is displayed if a test is using time but
   * is not advancing the `TestClock`.
   */
  warningDone() {
    return Debug.bodyWithTrace(trace => synchronized.updateSomeEffect(this.warningState, warningData => {
      if (WarningData.isStart(warningData)) {
        return Option.some(core.succeed(WarningData.done));
      }
      if (WarningData.isPending(warningData)) {
        return Option.some(core.as(WarningData.done)(core.interruptFiber(warningData.fiber)));
      }
      return Option.none();
    }).traced(trace));
  }
  /**
   * Returns whether all descendants of this fiber are done or suspended.
   */
  suspended() {
    return Debug.bodyWithTrace(trace => core.flatMap(([first, last]) => Equal.equals(first, last) ? core.succeed(first) : core.fail(void 0))(core.zip(this.live.provide(core.zipRight(this.freeze())(effect.sleep(Duration.millis(5)))))(this.freeze())).traced(trace));
  }
  /**
   * Polls until all descendants of this fiber are done or suspended.
   */
  awaitSuspended() {
    return Debug.bodyWithTrace(trace => core.zipRight(this.suspendedWarningDone())(core.zipRight(effect.eventually(effect.filterOrFail(identity, constVoid)(core.zipWith(core.zipRight(this.suspended())(this.live.provide(effect.sleep(Duration.millis(10)))), Equal.equals)(this.suspended()))))(this.suspendedWarningStart())).traced(trace));
  }
  /**
   * Forks a fiber that will display a warning message if a test is advancing
   * the `TestClock` but a fiber is not suspending.
   */
  suspendedWarningStart() {
    return Debug.bodyWithTrace(trace => synchronized.updateSomeEffect(this.suspendedWarningState, suspendedWarningData => {
      if (SuspendedWarningData.isStart(suspendedWarningData)) {
        return Option.some(core.map(fiber => SuspendedWarningData.pending(fiber))(fiberRuntime.fork(core.interruptible(this.live.provide(effect.delay(Duration.seconds(5))(core.zipRight(ref.set(this.suspendedWarningState, SuspendedWarningData.done))(effect.logWarning(suspendedWarning))))))));
      }
      return Option.none();
    }).traced(trace));
  }
  /**
   * Cancels the warning message that is displayed if a test is advancing the
   * `TestClock` but a fiber is not suspending.
   */
  suspendedWarningDone() {
    return Debug.bodyWithTrace(trace => synchronized.updateSomeEffect(this.suspendedWarningState, suspendedWarningData => {
      if (SuspendedWarningData.isPending(suspendedWarningData)) {
        return Option.some(core.as(SuspendedWarningData.start)(core.interruptFiber(suspendedWarningData.fiber)));
      }
      return Option.none();
    }).traced(trace));
  }
  /**
   * Runs all effects scheduled to occur on or before the specified instant,
   * which may depend on the current time, in order.
   */
  run(f) {
    return Debug.bodyWithTrace((trace, restore) => core.zipRight(core.flatMap(option => {
      switch (option._tag) {
        case "None":
          {
            return core.unit();
          }
        case "Some":
          {
            const [end, deferred] = option.value;
            return core.zipRight(this.run(() => end))(core.zipRight(core.yieldNow())(core.deferredSucceed(deferred, void 0)));
          }
      }
    })(ref.modify(this.clockState, data => {
      const end = restore(f)(data.instant);
      const sorted = Chunk.sort(Order.contramap(_ => _[0])(number.Order))(data.sleeps);
      if (Chunk.isNonEmpty(sorted)) {
        const [instant, deferred] = Chunk.headNonEmpty(sorted);
        if (instant <= end) {
          return [Option.some([end, deferred]), Data.make(instant, Chunk.tailNonEmpty(sorted))];
        }
      }
      return [Option.none(), Data.make(end, data.sleeps)];
    })))(this.awaitSuspended()).traced(trace));
  }
}
_a = clock.ClockTypeId;
/** @internal */
export const live = /*#__PURE__*/Debug.untracedMethod(() => data => layer.scoped(Tag, effect.gen(function* ($) {
  const live = yield* $(core.service(Live.Tag));
  const annotations = yield* $(core.service(Annotations.Tag));
  const clockState = yield* $(core.sync(() => ref.unsafeMake(data)));
  const warningState = yield* $(circular.makeSynchronized(WarningData.start));
  const suspendedWarningState = yield* $(circular.makeSynchronized(SuspendedWarningData.start));
  const testClock = new TestClockImpl(clockState, live, annotations, warningState, suspendedWarningState);
  yield* $(fiberRuntime.withClockScoped(testClock));
  yield* $(fiberRuntime.addFinalizer(() => core.zipRight(testClock.suspendedWarningDone())(testClock.warningDone())));
  return testClock;
})));
/** @internal */
export const defaultTestClock = /*#__PURE__*/live( /*#__PURE__*/Data.make( /*#__PURE__*/new Date(0).getTime(), /*#__PURE__*/Chunk.empty()));
/**
 * Accesses a `TestClock` instance in the context and increments the time
 * by the specified duration, running any actions scheduled for on or before
 * the new time in order.
 *
 * @internal
 */
export const adjust = /*#__PURE__*/Debug.methodWithTrace(trace => duration => testClockWith(testClock => testClock.adjust(duration)).traced(trace));
/** @internal */
export const adjustWith = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, duration) => testClockWith(testClock => testClock.adjustWith(duration)(effect)).traced(trace));
/**
 * Accesses the current time of a `TestClock` instance in the context in
 * milliseconds.
 *
 * @internal
 */
export const currentTimeMillis = /*#__PURE__*/Debug.methodWithTrace(trace => () => testClockWith(testClock => testClock.currentTimeMillis()).traced(trace));
/**
 * Accesses a `TestClock` instance in the context and saves the clock
 * state in an effect which, when run, will restore the `TestClock` to the
 * saved state.
 *
 * @internal
 */
export const save = /*#__PURE__*/Debug.methodWithTrace(trace => () => testClockWith(testClock => testClock.save()).traced(trace));
/**
 * Accesses a `TestClock` instance in the context and sets the clock time
 * to the specified `Instant`, running any actions scheduled for on or before
 * the new time in order.
 *
 * @internal
 */
export const setTime = /*#__PURE__*/Debug.methodWithTrace(trace => instant => testClockWith(testClock => testClock.setTime(instant)).traced(trace));
/**
 * Semantically blocks the current fiber until the clock time is equal to or
 * greater than the specified duration. Once the clock time is adjusted to
 * on or after the duration, the fiber will automatically be resumed.
 *
 * @internal
 */
export const sleep = /*#__PURE__*/Debug.methodWithTrace(trace => duration => testClockWith(testClock => testClock.sleep(duration)).traced(trace));
/**
 * Accesses a `TestClock` instance in the context and returns a list of
 * times that effects are scheduled to run.
 *
 * @internal
 */
export const sleeps = /*#__PURE__*/Debug.methodWithTrace(trace => () => testClockWith(testClock => testClock.sleeps()).traced(trace));
/**
 * Retrieves the `TestClock` service for this test.
 *
 * @internal
 */
export const testClock = /*#__PURE__*/Debug.methodWithTrace(trace => () => testClockWith(core.succeed).traced(trace));
/**
 * Retrieves the `TestClock` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const testClockWith = /*#__PURE__*/Debug.methodWithTrace(trace => f => core.fiberRefGetWith(defaultServices.currentServices, services => f(Context.get(clock.clockTag)(services))).traced(trace));
//# sourceMappingURL=testClock.mjs.map